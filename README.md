
# 🦅 Academic Navigator Chatbot

This project provides a web application designed to enhance BU MET students' experience in getting information on their CS program and courses, with additional features such as: selecting courses based on their career interests and preferences using our custom-made recommendation algorithm and answering questions from visa-related issues as an International Student to other student life queries. By creating this product, we can help the student advising team scale their accessibility to enrich their service to assist the students within the BU MET CS department. Our application integrates a chatbot built with ChatGPT-4o via Langchain API service and the Langchain tooling services for RAG retrieval from our courses.csv, programs.csv, and promptlib.json files to enhance users' scope of query capability.

# Access to our deployed website
http://54.159.232.88:3000/

## Core Features
- **AI-Driven Recommendations**: AI model integrated with Python, Langchain, and GPT-4o for personalized course suggestions.
- **Spring Boot Backend**: Java-based backend handling application logic and communication between components.
- **Frontend**: React-based UI for seamless interaction with users.
- **Databases**:
    - FAISS's Vector Storage for storing course, program, and prompt library data.
    - PostgreSQL for user and chat session history.

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
- **AI Models**: Custom Course Builder Algorithm, OpenAI's GPT-4o, LangChain
- **Databases**:
    - FAISS's Vector Storage: For course and program data.
    - PostgreSQL: For storing user and chat session history.
- **Authentication**: JWT Authentication
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
3. Replace http://54.159.232.88/ in our code with http:localhost/ to run dev environment locally

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

### Step 5: Create Database Tables
- Use your database manager of choice, ex. DBeaver
- Connect it to the running Postgres container `http://localhost:5432`
- Run the db_init.sql script that is under code/db to create the tables (run all the create tables script before stored procedures section)

### Step 6: Verify the Services
- Open your browser and go to `http://localhost:3000` to access the frontend application.
- You can also use API testing tools like `curl` or Postman to verify the AI service (`http://localhost:9080`) and backend (`http://localhost:8080`) are running correctly.
- You can use DBeaver to also test the DB connection to the database as well.

### Step 7: Shutting Down the Services
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
- **Language Model Route**: Handles requests to the ChatGPT4o via Langchain API-based chatbot.
- **Course Recommendation Route**: Returns course suggestions using a custom algorithm.

---

## Deployment

The project is containerized for easy deployment. Docker Compose handles multi-service orchestration. Make sure the required environment variables are set before deploying to production. While deploying, please make sure that the Postgres DB script is running locally and that the user and session tables are not empty.

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
- **Save Chat Feature**: Ability to save chat sessions into the Postgres DB.
- **Integration with Backend**: Frontend is officially connected to the SB Backend and Python AI service.
- **Sign up New User**: Users are now able to create a new user.
- **Login with JWT Authentication**: Users are now logged in using the JWT Auth mechanism rather than manually as it was in Iteration 1.
- **Chatbot connected to Python AI Service**: Users are now able to use the Chatbot feature, which is now connected with the Python AI Service rather than having to use Postman for the UI.

### 3. **SB Backend**
- **Data Handling**: Improved data processing for increased robustness and efficiency.
- **Authentication**: Added an authentication feature with **JWT (JSON Web Token)** to strengthen security measures.
- **Security**: Having password hashed to increase user authentication security layer.

### 4. **AI-Service**
- **Prompt Library**: Built a 600+ entry prompt library using **Retrieval-Augmented Generation (RAG)** to improve the scope of query and response quality. This increased the scope of query from being limited to the cs department programs and courses to other topics including but not limited to Immigration status, Student work-life balance, Communication with Instructors and other students, and many more topics.
- **Chatbox Enhancements**: Enhanced chatbox response handling to ensure accurate and contextually relevant interactions.

### 5. **Postgres Database**
- **Storedproc**: Adding stored procedure for easy future use, functions created for easy table insertion, update, and retrieval.
- **Working DB for future iteration**: Functional database ready for future use to integrate with the Python AI service, to replace the current courses.csv and programs.csv files usage as RAG sources. This change allows easy scalability for expanding the coverage of the chatbot service for new programs and courses added, or the expansion of service for the other departments within BU MET College.
  

---

## 🚀 Plans for Iteration 3

### 1. **Testing**
- **Functional Testing**: Expand the functional testing framework to cover additional user flows.
- **Unit Testing**: Introduce more comprehensive unit tests for higher code quality and reliability.

### 2. **Frontend**
- **Backend Integration**: Complete the full integration with the backend services to facilitate seamless data exchange.
- **UI/UX Enhancements**: Apply further UI/UX refinements based on user feedback to enhance the overall usability.
- **Download Feature**: Introduced a new button to download content as a **PDF**, providing more utility for users.

### 3. **SB Backend**
- **Security**: Continue to enhance our security features to protect sensitive user data, possibly the introduction of Captcha.
- **End-to-end Integration**: Establish robust end-to-end integration for real-time data interactions with the frontend service.

### 4. **AI-Service**
- **No Additional Implementations**: The current functionality of the AI service is sufficient for this iteration.

### 5. **Code Quality**
- **Linting**: Implement linting checks and custom lint rules tailored to our codebase to ensure code consistency and maintainability.
- **Formatting**: Reformatting and cleaning up files and irrelevant code.

### 6. **Continuous Integration (CI)**
- **CI Process**: Enhance the CI process to streamline development, testing, and deployment workflows.

---

## 📅 Summary
With each iteration, we continue to improve the project's performance, security, and user experience. 
Iteration 2 focuses on enhancing integration and testing, while Iteration 3 will expand on these improvements to provide a fully integrated, secure, and tested application.

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
