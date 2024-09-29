from typing import List
from os import environ as env
from pydantic import BaseModel
from fastapi import FastAPI, APIRouter, Request
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_chroma import Chroma
from langchain_openai import ChatOpenAI
from langchain_community.document_loaders import CSVLoader, JSONLoader
from langchain_core.chat_history import BaseChatMessageHistory, InMemoryChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from coursebuilder import recommend_courses
from langchain.schema import AIMessage, HumanMessage


# Define the API Router for organizing routes
router = APIRouter()

loader = CSVLoader(file_path="courses.csv", encoding="utf-8-sig")
documents = loader.load()
course_storage = Chroma.from_documents(documents, OpenAIEmbeddings())


# This needs to be optimized
course_retriever = course_storage.as_retriever(search_kwargs={'k': len(documents)})

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
"{context}"
"""

prompt1 = ChatPromptTemplate.from_messages(
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

prompt2 = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt2),
        ("human", "{input}"),
    ]
)

parser = StrOutputParser()

rag_chain = prompt1 | smart_llm | prompt2 | fast_llm | parser


class StudentInfo(BaseModel):
    user_id: str
    student_name: str
    course_taken: List[int]
    path_interest: str
    course_to_take: int

class APIInfo(StudentInfo):
    message: str


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

        response = f"""
        Hello {info.student_name}, based on the details on the courses you've taken, your program, and selected number of courses to take this semester, these are the recommended courses for your to take: {courses_string}. Would you like more information about your recommended courses, or would you like to learn about other courses in the program.
        """
        
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
        context = course_retriever.invoke(user_input)

        # Invoke the model
        config = {"configurable": {"session_id": session_id}}
        response = chat_with_history.invoke(
            {"input": user_input, "context": context},
            config=config,)

    return {"response": response}
