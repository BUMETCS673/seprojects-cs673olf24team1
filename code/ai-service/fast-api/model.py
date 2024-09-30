from fastapi import APIRouter, Request
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables.history import RunnableWithMessageHistory
from entities import StudentInfo, APIInfo, RouteQuery
from coursebuilder import recommend_courses
from vectorstore import create_course_storage, create_prompt_storage


# Define the API Router for organizing routes
router = APIRouter()

# Create data retrivers
course_retriever = create_course_storage().as_retriever(
    search_kwargs={'k': 80})  # Need to be optimized
prompt_retriever = create_prompt_storage().as_retriever(search_kwargs={'k': 4})


# Define language models
smart_llm = ChatOpenAI(
    temperature=0,
    model="gpt-4o",
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

fast_llm = ChatOpenAI(
    temperature=0,
    model="gpt-3.5-turbo",
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

structured_llm_router = fast_llm.with_structured_output(RouteQuery)

system_promt1 = """You are an expert at routing a user question to a course builder tool or an academic advising agent.
The course builder is related to a special class schdule recommendation algorithm to generate a plan for next semesters.
Use the course builder tool when the student wants a class schudle. Otherwise, route to a general academic advising agent."""

route_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_promt1),
        ("human", "{question}"),
    ]
)

system_prompt2 = """
You are a student advisor

You will give the class information based on the question that a student asks.
Be aware, students usually call the course as department+course_id such as CS546.

You may use the following context to help as needed to form your answer.
Please make the response short.

Context:
Best practice to answer the question:
These are the most frequently asked questions with the recommended response.
"{prompt_context}"

Course description data:
The workload score (1-5) is how much work the sudent can put in.
The difficulty score (1-5) is the difficulty of the class.
Do not tell the specific number of these scores but just explain how difficult or how much work to the student.
"{course_context}"

"""

advisor_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt2),
        ("human", "{input}"),
    ]
)

system_prompt3 = """
You are a student advisor on an online course builder platform
You will recommend a class schedule for a student to take in the next semester

In case the student asks you to change or update their information 
such as the path of interest, course taken, or the number of courses to take,
please advise them to update their information in the profile setting page.
Only advise them when they ask for it.

The following context are the recommended courses to take by a special algorithm.
Use it to help you form your answer.
Please provide the student both the course number and description.
For example, CS521: Information Structure with Java.
Please also make the response short in a paragraph.

Context:

Recommended class schedule for the next semester:
This may be blank if the student question is unrelated.
"{schedule_context}"

Course description data:
Please use the course description to elaborate the course number. Ignore all other course details.
"{course_context}"

"""

schedule_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt3),
        ("human", "{input}"),
    ]
)

system_prompt4 = """
Your job is to format and summarize an input text to be like a response chat message
The output should be in one paragraph and plain text without any formattings, symbols, or markdowns. 
Please make the sentenses more concise and in a more friendly response from a friend.
ps. do not remove any course number (ie. CS521, CS673).
"""

format_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt4),
        ("human", "{input}"),
    ]
)

parser = StrOutputParser()

# Create all chains
question_router = route_prompt | structured_llm_router
general_chain = advisor_prompt | smart_llm | format_prompt | fast_llm | parser
schedule_chain = schedule_prompt | smart_llm | format_prompt | fast_llm | parser


@router.post("/api/v1/chatbot")
async def response_message(request: Request, info: APIInfo):
    state = request.app.state
    chat_storage = state.chat_history

    user_input = info.message
    session_id = info.user_id
    config = {"configurable": {"session_id": session_id}}
    first_conversation = session_id not in chat_storage

    if first_conversation:
        # Create a new session history
        chat_storage[session_id] = InMemoryChatMessageHistory()
        course_taken = [f'CS{course}' for course in info.course_taken]
        user_input = f"""Hello, my name is {info.student_name}, My program is MS in Computer Science concentrating in {info.path_interest} at Boston University. I have already taken {
            ', '.join(course_taken)} and I would like to take {info.course_to_take} classes in the next semester. Could you recommend me a class schedule?"""

    question_type = question_router.invoke(user_input).type
    if question_type == 'course_builder':
        # Retrieve the recommended schedule
        course_list = recommend_courses(courses_taken=info.course_taken,
                                        path_interest=info.path_interest,
                                        num_courses_to_take=info.course_to_take,)
        prefixed_courses = [f'CS{course}' for course in course_list]
        schedule_context = ', '.join(prefixed_courses)
        course_context = course_retriever.invoke(user_input)

        model = RunnableWithMessageHistory(schedule_chain,
                                           lambda: chat_storage[session_id],
                                           input_messages_key="input",)

        response = model.invoke(
            {
                "input": user_input,
                "course_context": course_context,
                "schedule_context": schedule_context,
            },
            config=config,
        )
    elif question_type == 'general_questions':
        # Retrieve the course info
        course_context = course_retriever.invoke(user_input)
        prompt_context = prompt_retriever.invoke(user_input)
        model = RunnableWithMessageHistory(general_chain,
                                           lambda: chat_storage[session_id],
                                           input_messages_key="input",)

        response = model.invoke(
            {
                "input": user_input,
                "course_context": course_context,
                "prompt_context": prompt_context,
            },
            config=config,)
    else:
        response = "I'm sorry. I cannot help you with this kind of question. Please ask again."

    return {"response": response}
