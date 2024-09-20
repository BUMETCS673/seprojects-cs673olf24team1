---

# 🌟 Model API Service

This directory handles the core functionalities of the project:

1. **Model Implementation**:  
   - Implements GPT-3.5 Turbo with RAG (Retrieval-Augmented Generation) using LangChain.  
   - Code is found in `app.py`.

2. **API Service Creation**:  
   - API service built using Langserve/FastAPI.  
   - Code is found in `api.py`.

3. **Deployment**:  
   - Hosted on **Vercel** using Serverless Functions.  

---

## 🚧 Development Progress

### Currently in Progress:

1. Adding **chat history** and **session ID** support to the model.
2. Integrating **vector storage** for efficient embedding data retrieval.
3. Integrating **PostgreSQL** to store chat history and session IDs.

---

## 📖 API Service Documentation

- **API Endpoint**: [https://buan.vercel.app](https://buan.vercel.app)
- **Full API Documentation**: [https://buan.vercel.app/docs](https://buan.vercel.app/docs)

> **Note**: Vercel does not support response streaming yet!  
> Please use one-time retrieval via `/invoke` instead.

---

### 🚀 API Call Example

#### **Endpoint**:  
```http
POST /model/invoke
```

#### **Description**:  
Pass in the user input message and session ID (currently, use `123`) to get the model's response.

#### **Request Body**:
```json
{
  "input": {
    "human_input": "string"
  },
  "config": {
    "configurable": {
      "session_id": "123"
    }
  },
  "kwargs": {}
}
```

#### **Response Example**:
```json
{
  "output": {},
  "metadata": {
    "run_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "feedback_tokens": [
      {
        "key": "string",
        "token_url": "string",
        "expires_at": "2024-09-17T00:59:53.729Z"
      }
    ]
  }
}
```

---