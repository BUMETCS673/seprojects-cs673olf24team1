from fastapi import APIRouter, Request
from langchain_openai import ChatOpenAI
from langchain.schema import AIMessage, HumanMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_core.chat_history import BaseChatMessageHistory, InMemoryChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables.history import RunnableWithMessageHistory
from entities import StudentInfo, APIInfo
from coursebuilder import recommend_courses
from vectorstore import create_course_storage, create_prompt_storage


# Define the API Router for organizing routes
router = APIRouter()

# Create data retrivers
course_retriever = create_course_storage().as_retriever(search_kwargs={'k': 80})  # Need to be optimized
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

system_prompt1 = """
You are a student advisor

You will give the class information based on the question that a student asks.
Be aware, students usually call the course as department+course_id such as CS546.

The workload score (1-5) is how much work the sudent can put in.
The difficulty score (1-5) is the difficulty of the class.
Do not tell the specific number of these scores but just explain how difficult or how much work to the student.
Please make the response short.

Context:
Best practice to answer the question:
"{prompt_context}"

Course description data:
"{course_context}"

"""

advisor_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt1),
        ("human", "{input}"),
    ]
)

system_prompt2 = """
Your job is to format and summarize an input text to be like a response chat message
The output should be in one paragraph and plain text without any formatting and markdown. 
Please make the sentenses more concise and in a more friendly response from a friend.
"""

format_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt2),
        ("human", "{input}"),
    ]
)

parser = StrOutputParser()

rag_chain = advisor_prompt | smart_llm | format_prompt | fast_llm | parser

@router.post("/api/v1/chatbot")
async def response_message(request: Request, info: APIInfo):
    state = request.app.state
    chat_storage = state.chat_history

    user_input = info.message
    session_id = info.user_id

    # If user start conersation the first time
    if session_id not in chat_storage:

        # Get the course recommendation
        course_list = recommend_courses(courses_taken=info.course_taken,
                                        path_interest=info.path_interest,
                                        num_courses_to_take=info.course_to_take,
                                        )

        prefixed_courses = [f'CS{course}' for course in course_list]
        courses_string = ', '.join(prefixed_courses)
        response = f"""Hello {info.student_name}, based on the details on the courses you've taken, your program, and selected number of courses to take this semester, these are the recommended courses for your to take: {
            courses_string}. Would you like more information about your recommended courses, or would you like to learn about other courses in the program."""
        chat_storage[session_id] = InMemoryChatMessageHistory()
        message = AIMessage(content=response)
        chat_storage[session_id].add_message(message)

    else:
        def get_session_history(session_id: str) -> BaseChatMessageHistory:
            store = state.chat_history
            if session_id not in store:
                store[session_id] = InMemoryChatMessageHistory()
            return store[session_id]

        chat_with_history = RunnableWithMessageHistory(rag_chain,
                                                       get_session_history,
                                                       input_messages_key="input",
                                                       )
        # Retrieve the course info
        course_context = course_retriever.invoke(user_input)
        prompt_context = prompt_retriever.invoke(user_input)

        # Invoke the model
        config = {"configurable": {"session_id": session_id}}
        response = chat_with_history.invoke(
            {
                "input": user_input,
                "prompt_context": prompt_context,
                "course_context": course_context,
            },
            config=config,
        )

    return {"response": response}
