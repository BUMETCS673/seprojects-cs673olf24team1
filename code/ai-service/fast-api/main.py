from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from langchain_core.chat_history import InMemoryChatMessageHistory

from model import router as model_router

from typing import Dict, List, cast
# Initialize FastAPI app
app = FastAPI(
    title="BUAN-LLM Server",
    version="0.1.1",
    description="First, use /course_tree to input student data and get course shedule. After that, use model/invoke to continue the conversation.",
)

# Initialize the state variables
app.state.chat_history = {}

# Register routes
@app.get("/")
def docs():
    return RedirectResponse(url="/docs")

app.include_router(model_router)
