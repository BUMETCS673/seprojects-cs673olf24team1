
---

# 🌟 Model API Service

Welcome to the **Model API Service**! This directory encompasses the core functionalities of the project, designed to deliver a seamless experience.

## 🔍 Core Features

1. **Model Implementation**:  
   - Utilizes **GPT-4o** with **Retrieval-Augmented Generation (RAG)** via LangChain.  
   - Code is organized into two primary modules: 
     - **`llm_route.py`**: Manages responses from the language model.
     - **`tree_route.py`**: Provides course recommendations using a decision tree algorithm.

2. **API Service Creation**:  
   - Built on **Langserve/FastAPI** for efficient API service.  
   - Main service code can be found in **`main.py`**.

3. **Deployment**:  
   - Currently hosted locally for development purposes.

---

## 🚧 Development Progress

### Ongoing Tasks:

1. **Chat History** & **Session ID**: Implementing support for tracking conversation history. [✔️]
2. **Vector Storage Integration**: Enhancing data retrieval efficiency with vector storage. [✔️]
3. **PostgreSQL Integration**: Storing chat history and session IDs for persistence.

---

## 📖 API Service Documentation

To get the API up and running, execute the following command:

```bash
docker-compose up --build
```

---

### 🚀 API Call Examples

#### **Endpoint**:  
```http
POST /course_tree
```

**Description**:  
Submit student data to retrieve a personalized course schedule. This should be done at the beginning of the conversation, returning a simple string message.

**Request Body**:
```json
{
  "user_id": "buid_or_whatever_1234",
  "student_name": "John Doe",
  "course_taken": [521],
  "path_interest": "secure software development",
  "course_to_take": 4
}
```

**Response Example**:
```json
{"message": "Your course schedule has been generated."}
```

---

#### **Endpoint**:  
```http
POST /model/invoke
```

**Description**:  
Send the user's input message along with the session ID (which corresponds to the user ID) to receive a response from the model.

**Request Body**:
```json
{
  "session_id": "same_as_student_id",
  "content": "Hello! This is user input message"
}
```

**Response Example**:
```json
{"response": "model's response here."}
```

---