from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.chat_history import BaseChatMessageHistory, InMemoryChatMessageHistory
from langchain_community.document_loaders import CSVLoader
from langchain_openai import ChatOpenAI
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from fastapi import FastAPI, APIRouter, Request
from entities import MessageInfo
from os import environ as env

# Define the API Router for organizing routes
router = APIRouter()

openai_key = env['OPENAI_API_KEY']
loader = CSVLoader(file_path="courses.csv", encoding="utf-8-sig")
documents = loader.load()
vectorstore = Chroma.from_documents(documents, OpenAIEmbeddings(api_key=openai_key))
retriever = vectorstore.as_retriever(search_kwargs={'k': 12})

llm = ChatOpenAI(
    temperature=0,
    model="gpt-4o",
    max_tokens=None,
    timeout=None,
    max_retries=2,
    api_key=openai_key
)

system_prompt = """
You are a student advisor

You will give the class information based on the question that a student asks.
Be aware, students usually call the course as department+course_id such as CS546.

The workload score (1-5) is how much work the sudent can put in.
The difficulty score (1-5) is the difficulty of the class.
You don't need to tell the exact number of these scores but just explain how difficult or how much work to the student.

Context:
"{context}"
"""

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}"),
    ]
)

parser = StrOutputParser()

rag_chain = prompt | llm | parser


@router.post("/model/invoke")
async def response_message(request: Request, message_info: MessageInfo):
    user_input = message_info.message
    session_id = message_info.user_id

    def get_session_history(session_id: str) -> BaseChatMessageHistory:
        store = request.app.state.chat_history
        if session_id not in store:
            store[session_id] = InMemoryChatMessageHistory()
        return store[session_id]

    chat_with_history = RunnableWithMessageHistory(rag_chain,
                                                   get_session_history,
                                                   input_messages_key="input"
                                                   )

    config = {"configurable": {"session_id": session_id}}
    context = retriever.invoke(user_input)

    response = chat_with_history.invoke(
        {"input": user_input, "context": context},
        config=config,)

    return {"response" : response}
