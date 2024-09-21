# Course Builder Chatbot Microservice

This microservice is part of the Course Builder application, designed to handle chatbot functionality for course creation and management.

## Features

- Retrieves posts from the Flask API
- Processes and modifies the retrieved data
- Provides endpoints for the main application to interact with the chatbot service

## Prerequisites

- Java 17
- Maven
- Spring Boot

## Setup and Installation

1. Navigate to the project directory:
   ```
   cd course-builder-chatbot-ms
   ```

2. Build the project:
   ```
   mvn clean install
   ```

3. Run the application:
   ```
   mvn spring-boot:run
   ```

The application will start and be available at `http://localhost:8080`.

## API Endpoints

- `GET /hello`: A simple hello world endpoint for testing
- `GET /posts`: Retrieves all posts from the Flask API
- `GET /posts/{id}`: Retrieves a specific post by ID

## Configuration

The application is configured to communicate with a Flask API running at `http://localhost:9080`. You can modify this in the `CourseBuilderChatbotController` class if needed.