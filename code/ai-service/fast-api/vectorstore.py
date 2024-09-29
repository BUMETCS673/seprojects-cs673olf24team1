from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.schema import Document
from pathlib import Path
import json

def create_prompt_storage(path="data/filtered_promptlib.json"):
    data = json.loads(Path(path).read_text())
    documents = []
    
    for item in data['prompts']:
        text = f"Prompt: {item['prompt']} Response: {item['response']}"

        document = Document(
            page_content=text,
            metadata={
                "timestamp": item["metadata"]["timestamp"],
                "source": item["metadata"]["source"],
                "tags": item["metadata"]["tags"]
            }
        )

        documents.append(document)

    return FAISS.from_documents(documents, embedding=OpenAIEmbeddings())