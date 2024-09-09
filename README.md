
# **Course Building Chatbot Web Application**

**Team: BU MET CS Course Building Chatbot (Group 1)**

---

## **Project Overview**

This project is a web application built using **React**, **Java**, and **Python**, integrated with the **Llama 2 Chatbot** for enhancing the course selection process. It offers students personalized course recommendations based on the data stored in our **MongoDB** database and a decision tree algorithm. The application includes various features such as chat history sharing, emailing, caching, and user authentication for a secure and seamless experience.

Due to the unavailability of the BU Registration MS database, the team has implemented its own database using **MongoDB** to store course and program data.

---

## **Technologies Used**

- **Frontend:** React (JavaScript)
- **Backend:** Java (Spring Boot)
- **AI Model & Services:** Python (integrated with Llama 2 via Hugging Face API)
- **Databases:**
    - **MongoDB:** Used to store course and program data and AI model recommendations.
    - **PostgreSQL:** Used for storing chat history.
- **Authentication:** Okta Authentication for user security.

---

## **Features**

- **Llama 2 Chatbot Integration:** Provides interactive chatbot assistance for course selection.
- **Decision Tree Algorithm:** Recommends courses based on program data and user inputs.
- **MongoDB Database:** Stores course/program data for recommendations.
- **Chat History Storage:** Stores chat history in PostgreSQL for easy access.
- **Email, Print, and Share Chat History:** Allows users to email, print, or share their chat history with others.
- **Caching:** Stores recent chat history for quick retrieval.
- **Security:** Includes authentication via Okta to ensure secure access to the application.

---

## **Installation and Setup**

### **Requirements:**
- **Node.js** (for React frontend)
- **Java (JDK 17)** (for Spring Boot backend)
- **Python 3.9** (for AI services)
- **MongoDB and PostgreSQL** databases

### **Steps:**

1. **Clone the Repository:**
   ```bash
   git clone git@github.com:BUMETCS673/seprojects-cs673olf24team1.git
   cd seprojects-cs673olf24team1
   ```

2. **Frontend (React):**
    - Navigate to the frontend directory:
      ```bash
      cd frontend
      npm install
      npm start
      ```

3. **Backend (Spring Boot):**
    - Navigate to the backend directory:
      ```bash
      cd backend
      ./mvnw spring-boot:run
      ```

4. **Python AI Service:**
    - Navigate to the AI service directory:
      ```bash
      cd ai-service
      python -m venv venv
      source venv/bin/activate
      pip install -r requirements.txt
      python app.py
      ```

5. **Set Up Databases:**
    - Ensure MongoDB and PostgreSQL are running locally or via cloud services.

6. **Run the Application:**
    - Frontend (React): Accessible via `http://localhost:3000`
    - Backend (Spring Boot): Accessible via `http://localhost:8080`
    - Python AI Service: Accessible via API endpoints integrated with backend.

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
