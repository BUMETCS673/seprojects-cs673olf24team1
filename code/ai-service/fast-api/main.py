from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from langchain_core.chat_history import InMemoryChatMessageHistory

from tree_route import router as tree_router
from llm_route import router as llm_router

from typing import Dict, List, cast
from entities import StudentInfo

# Initialize FastAPI app
app = FastAPI(
    title="BUAN-LLM Server",
    version="0.1.1",
    description="First, use /course_tree to input student data and get course shedule. After that, use model/invoke to continue the conversation.",
)

# # Initialize app data
app.state.student_data = cast(Dict[str, StudentInfo], {})
app.state.chat_history = cast(Dict[str, InMemoryChatMessageHistory], {})

# Register routes
@app.get("/")
def docs():
    return RedirectResponse(url="/docs")

app.include_router(tree_router)
app.include_router(llm_router)
