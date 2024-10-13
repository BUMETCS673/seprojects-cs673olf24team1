# Created by Poom, Updated and Annotated by Tash

from langchain_openai import OpenAIEmbeddings  # Import OpenAI's embedding model for vector representation
from langchain_community.vectorstores import FAISS  # Import FAISS for vector storage and retrieval
from langchain_community.document_loaders import CSVLoader  # Import CSVLoader for loading documents from CSV files
from langchain.schema import Document  # Import Document schema for structuring data
from pathlib import Path  # Import Path for handling file system paths
import json  # Import JSON for parsing JSON files


def create_prompt_storage(path="data/filtered_promptlib.json"):
    """
    Create a storage of prompts from a JSON file.

    This function reads a JSON file containing prompts and their responses,
    constructs Document objects, and stores them in a vector store.

    Args:
        path (str): Path to the JSON file containing prompts.

    Returns:
        FAISS: A FAISS vector store containing the documents.
    
    Raises:
        FileNotFoundError: If the specified JSON file does not exist.
        json.JSONDecodeError: If the JSON file is not properly formatted.
    """
    try:
        # Requirement Condition: Check if the file exists and can be read
        data = json.loads(Path(path).read_text())  # Load and parse the JSON data
    except FileNotFoundError:
        raise FileNotFoundError(f"Error: The file at {path} does not exist.")  # Error message for file not found
    except json.JSONDecodeError:
        raise ValueError(f"Error: The file at {path} is not a valid JSON.")  # Error message for invalid JSON format

    documents = []  # Initialize an empty list to hold Document objects

    # Iterate through each prompt in the loaded data
    for item in data['prompts']:
        text = f"Prompt: {item['prompt']} Response: {item['response']}"

        # Create a Document object for each prompt and response
        document = Document(
            page_content=text,
            metadata={
                "timestamp": item["metadata"]["timestamp"],
                "source": item["metadata"]["source"],
                "tags": item["metadata"]["tags"]
            }
        )

        documents.append(document)  # Add the Document to the list

    # Return the FAISS vector store containing the created documents
    return FAISS.from_documents(documents, embedding=OpenAIEmbeddings())  # Success message implied by successful return


def create_course_storage(path="data/courses.csv"):
    """
    Create a storage of course documents from a CSV file.

    This function loads course data from a specified CSV file and constructs
    Document objects for storage in a vector store.

    Args:
        path (str): Path to the CSV file containing courses.

    Returns:
        FAISS: A FAISS vector store containing the loaded documents.
    
    Raises:
        FileNotFoundError: If the specified CSV file does not exist.
        Exception: If there is an error during loading the CSV file.
    """
    try:
        loader = CSVLoader(path, encoding="utf-8-sig")  # Initialize the CSVLoader with the specified path
        documents = loader.load()  # Load documents from the CSV file
    except FileNotFoundError:
        raise FileNotFoundError(f"Error: The file at {path} does not exist.")  # Error message for file not found
    except Exception as e:
        raise Exception(f"Error: Failed to load the CSV file at {path}. {str(e)}")  # General error message for loading failure

    # Return the FAISS vector store containing the loaded documents
    return FAISS.from_documents(documents, embedding=OpenAIEmbeddings())  # Success message implied by successful return
