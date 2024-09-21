
# 🦅 Course Builder Chatbot

This project provides a web application designed to help students select courses based on their preferences and the AI-driven recommendations. It integrates a chatbot built with Llama 2 and GPT-4 to enhance user interactions. The app leverages AI to recommend courses and store the data in MongoDB and PostgreSQL for efficient tracking.

## Core Features
- **AI-Driven Recommendations**: AI model integrated with FastAPI, Llama 2, and GPT-4 for personalized course suggestions.
- **Spring Boot Backend**: Java-based backend handling application logic and communication between components.
- **Frontend**: React-based UI for seamless interaction with users.
- **Databases**: 
  - MongoDB for storing course and program data.
  - PostgreSQL for chat history.

## Project Structure
```
├── code/
│   ├── ai-service/                # AI model service (FastAPI + LangChain)
│   ├── backend/                   # Java Spring Boot backend
│   ├── frontend/                  # React frontend
│   └── ...other components...
├── .github/                       # GitHub Actions workflows
├── .idea/                         # IDE settings (JetBrains)
├── docker-compose.yml              # Docker Compose for service orchestration
└── README.md                      # Project documentation
```

### Technologies Used:
- **Frontend**: React + Vite
- **Backend**: Java (Spring Boot)
- **AI Models**: Llama 2, GPT-4, LangChain (via FastAPI)
- **Databases**: 
  - MongoDB: For course and program data.
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
