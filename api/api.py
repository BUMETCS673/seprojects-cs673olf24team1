from fastapi import FastAPI, HTTPException
from langserve import add_routes
from app import chain_with_history

app = FastAPI(
    title="LangChain Server",
    version="0.1.0",
    description="Spin up a simple api server using Langchain's Runnable interfaces",
)

add_routes(
    app,
    chain_with_history,
    path="/model"
)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8000)