
# 🦅 Course Builder Chatbot

This project provides a web application designed to help students select courses based on their preferences and the AI-driven recommendations. It integrates a chatbot built with Llama 2 and GPT-4 to enhance user interactions. The app leverages AI to recommend courses and store the data in MongoDB and PostgreSQL for efficient tracking.

## Core Features
- **AI-Driven Recommendations**: AI model integrated with Python, Langchain, and GPT-4o for personalized course suggestions.
- **Spring Boot Backend**: Java-based backend handling application logic and communication between components.
- **Frontend**: React-based UI for seamless interaction with users.
- **Databases**: 
  - Pinecone's Vector Storage for storing course and program data.
  - PostgreSQL for chat history.

## Project Structure
```
SEPROJECTS-CS673OLF24TEAM1
├── .github
├── .idea
├── code
│   │
│   ├── ai-service
│   │   │ 
│   │   ├── fast-api
│   │   │   ├── .dockerignore
│   │   │   ├── coursebuilder.py
│   │   │   ├── courses.csv
│   │   │   ├── Dockerfile
│   │   │   ├── entities.py
│   │   │   ├── ilm_route.py
│   │   │   ├── main.py
│   │   │   ├── README.md
│   │   │   ├── requirements.txt
│   │   │   ├── tree_route.py
│   │   │   └── unittest_coursebuilder.py
│   │   │ 
│   │   └── flask-api
│   │       ├── .idea
│   │       ├── Dockerfile
│   │       ├── main.py
│   │       └── requirements.txt
│   │
│   ├── backend
│   │   ├── .idea
│   │   └── course-builder-chatbot-ms
│   │       ├── .gitignore
│   │       ├── .mvn
│   │       ├── Dockerfile
│   │       ├── mvnw
│   │       ├── mvnw.cmd
│   │       ├── pom.xml
│   │       ├── README.md
│   │       ├── src
│   │       └── target
│   │
│   └── frontend
│       ├── .env
│       ├── .gitignore
│       ├── Dockerfile
│       ├── dist
│       ├── index.html
│       ├── node_modules
│       ├── package.json
│       ├── package-lock.json
│       ├── public
│       ├── README.md
│       ├── src
│       └── vite.config.js
│
├── db
│   ├── Readme.md
│
├── demo
├── doc
├── docker-compose.yml
├── misc
├── README.md
└── team.md
                     # Project documentation
```

### Technologies Used:
- **Frontend**: React + Vite
- **Backend**: Java (Spring Boot)
- **AI Models**: Tree Algorithm, OpenAI's GPT-4o, LangChain
- **Databases**: 
  - Pinecode's Vector Storage: For course and program data.
  - PostgreSQL: For storing chat history.
- **Authentication**: Okta Authentication
- **Deployment**: Docker (containerized for local and cloud development)

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Docker
- Docker Compose
- Node.js (for React frontend)
- Java 17+ (for backend)
- Python 3.8+ (for AI Service)

### Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo-url.git
   cd your-repo-directory
   ```

2. **Build and Start the Services**:
   Use Docker Compose to set up the PostgreSQL database, AI service, and backend:
   ```bash
   docker-compose up --build
   ```

   To stop containers you need to follow below command:
      ```bash
   docker-compose down
   ```

3. **Access the Services**:
   - **Frontend**: `http://localhost:3000`
   - **Backend (Spring Boot)**: `http://localhost:8080`
   - **AI Service (FastAPI)**: `http://localhost:9080`

## Development Notes

- All source code for AI-related APIs and models is found in the `code/ai-service/` folder.
- Java backend is located in `code/backend/`, with entry point in `CourseBuilderApplication.java`.
- React frontend is in `code/frontend/`.

### AI Model Service Details
The AI model service exposes two main API endpoints:
- **Language Model Route**: Handles requests to the Llama 2-based chatbot.
- **Course Recommendation Route**: Returns course suggestions using a decision tree algorithm.

---

## Deployment

The project is containerized for easy deployment. Docker Compose handles multi-service orchestration. Make sure the required environment variables are set before deploying to production.


## **Team Members**

- **Natasya Liew** - Team Leader
- **Natthaphon Foithong**
- **Ananya Singh**
- **Battal Cevik**
- **Poom Chantarapornrat**
- **Yujun Liu**

---

## **Contact Information**

For any questions regarding the project, feel free to reach out to the team leader:

- **Natasya Liew** (Team Leader): nliew@bu.edu

---

## **License**

This project is licensed under the MIT License - see the LICENSE file for details.

---
