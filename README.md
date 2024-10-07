
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

### Prerequisites
- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

### Step 1: Set Up Project Directory
1. Clone the project repository to your local machine.
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the root directory of the project:
   ```bash
   cd path/to/project/root
   ```

### Step 2: Create Environment Files
1. In the `./code/ai-service/fast-api` directory, create a `.env` file for the AI service.
   ```bash
   cd ./code/ai-service/fast-api
   touch .env
   ```
2. Add the following content to the `.env` file:
   ```
   API_KEY=YOUR_API_KEY
   ```

### Step 3: Set Up Docker Volumes and Network
- Docker Compose automatically creates volumes (`postgres_data`) and network (`seprojects-cs673olf24team1_default`). No manual steps are needed here.

### Step 4: Build and Run the Services with Docker Compose
1. Navigate to the root directory of the project (if not already there):
   ```bash
   cd path/to/project/root
   ```
2. Use Docker Compose to build and start the services:
   ```bash
   docker-compose up --build
   ```
    - This command will:
        - **Build** the Docker images for the AI service, backend, and frontend using the respective Dockerfiles.
        - **Start** all services (PostgreSQL, AI service, Spring Boot backend, and React frontend).
    - The services will be accessible on the following ports:
        - **PostgreSQL**: Port `5432`
        - **AI Service (FastAPI)**: `http://localhost:9080`
        - **Backend (Spring Boot)**: `http://localhost:8080`
        - **Frontend (React + Vite)**: `http://localhost:3000`

### Step 5: Verify the Services
- Open your browser and go to `http://localhost:3000` to access the frontend application.
- You can also use API testing tools like `curl` or Postman to verify the AI service (`http://localhost:9080`) and backend (`http://localhost:8080`) are running correctly.

### Step 6: Shutting Down the Services
- To stop the services, use:
  ```bash
  docker-compose down
  ```
    - This command will stop and remove the containers while preserving the volume data.

### Troubleshooting
- **Port Conflicts**: Ensure that the ports (`5432`, `9080`, `8080`, `3000`) are not being used by other applications.
- **Environment Variables**: Double-check that the `.env` file for the AI service is set up correctly with your API key.
- **Volume Data**: If you need to reset the database, remove the volume by adding the `-v` flag:
  ```bash
  docker-compose down -v
  ```

This section provides a simple way to set up and run the project locally using Docker, ensuring all services are built and started efficiently.

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

---

# Project Update Summary

## 📌 Overview
This section outlines the completed updates from Iteration 2, the planned implementations for Iteration 3

---

## ✅ Updates from Iteration 2

### 1. **Testing**
- **Framework Integration**: Introduced a functional testing framework.
- **Test Coverage**: Implemented basic functional tests for each major application section, enhancing core reliability.

### 2. **Frontend**
- **UI/UX Improvements**: Enhanced the overall UI design to improve the user experience.
- **New Pages**: Added **Profile** and **Settings** pages to increase user interaction options.
- **Download Feature**: Introduced a new button to download content as a **PDF**, providing more utility for users.

### 3. **Backend**
- **Data Handling**: Improved data processing for increased robustness and efficiency.
- **Authentication**: Added an authentication feature with **JWT (JSON Web Token)** to strengthen security measures.

### 4. **AI-Service**
- **Prompt Library**: Built a prompt library using **Retrieval-Augmented Generation (RAG)** to improve the response quality.
- **Chatbox Enhancements**: Enhanced chatbox response handling to ensure accurate and contextually relevant interactions.

---

## 🚀 Plans for Iteration 3

### 1. **Testing**
- **Functional Testing**: Expand the functional testing framework to cover additional user flows.
- **Unit Testing**: Introduce more comprehensive unit tests for higher code quality and reliability.

### 2. **Frontend**
- **Backend Integration**: Complete the integration with the backend services to facilitate seamless data exchange.
- **UI/UX Enhancements**: Apply further UI/UX refinements based on user feedback to enhance the overall usability.

### 3. **Backend**
- **Security**: Continue to enhance security features to protect sensitive user data.
- **End-to-End Integration**: Establish robust end-to-end integration with the frontend for real-time data interactions.

### 4. **AI-Service**
- **No Additional Implementations**: The current functionality of the AI service is sufficient for this iteration.

### 5. **Code Quality**
- **Linting**: Implement linting checks and custom lint rules tailored to our codebase to ensure code consistency and maintainability.

### 6. **Continuous Integration (CI)**
- **CI Process**: Enhance the CI process to streamline development, testing, and deployment workflows.

---

## 📅 Summary
With each iteration, we continue to improve the project's performance, security, and user experience. 
Iteration 2 focuses on enhancing integration and testing, while Iteration 3 will expand on these improvements to provide a fully integrated and secure application.

--- 

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
