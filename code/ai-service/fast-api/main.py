# Created by Poom, Annotated by Tash

from dotenv import load_dotenv
load_dotenv()  # Load environment variables from a .env file

from fastapi import FastAPI, HTTPException  # Import FastAPI and HTTPException for API creation and error handling
from fastapi.responses import RedirectResponse  # Import RedirectResponse to redirect users
from langchain_core.chat_history import InMemoryChatMessageHistory  # Import chat history handling

from model import router as model_router  # Import model router for additional routes

from typing import Dict, List, cast  # Import typing utilities for type hints

# Initialize FastAPI app
app = FastAPI(
    title="BUAN-LLM Server",  # Title of the API
    version="0.1.1",  # Current version of the API
    description="First, use /course_tree to input student data and get course schedule. After that, use model/invoke to continue the conversation.",  # Description of API functionality
)

# Initialize the state variables
app.state.chat_history = {}  # Store chat history in application state

# Register routes
@app.get("/")
def docs():
    """
    Redirects users to the API documentation page.

    This route serves as the landing page for the API.
    It redirects users to the automatically generated FastAPI docs.
    
    Returns:
        RedirectResponse: Redirects to the /docs endpoint.
    """
    return RedirectResponse(url="/docs")  # Redirect to FastAPI documentation

app.include_router(model_router)  # Include additional routes from the model router
