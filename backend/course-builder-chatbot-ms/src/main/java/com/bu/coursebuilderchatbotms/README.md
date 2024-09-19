# Course Builder Chatbot Microservice

## Project Overview
This project is a Spring Boot-based microservice that manages project information and interacts with a PostgreSQL database. It exposes a RESTful API for creating, reading, updating, and deleting (CRUD) project data.

## Prerequisites
- Java 17
- Maven
- PostgreSQL 13 or higher

## How to Run

1. **Configure PostgreSQL:**
    - Ensure you have PostgreSQL installed and running.
    - Create a new PostgreSQL database named `course_builder_db` (or use any name you prefer).
    - You can create the database using the following command:

      ```sql
      CREATE DATABASE course_builder_db;
      ```

2. **Set PostgreSQL Credentials:**
    - Configure the database credentials in the `src/main/resources/application.properties` file:

      ```properties
      spring.datasource.url=jdbc:postgresql://localhost:5432/course_builder_db
      spring.datasource.username=your_db_username
      spring.datasource.password=your_db_password
      ```

3. **Run the Application:**
    - Build the application using Maven:

      ```bash
      mvn clean install
      ```
    - Run the Spring Boot application:

      ```bash
      mvn spring-boot:run
      ```

4. **Database Setup:**
    - On startup, Spring Boot will automatically execute the `schema.sql` and `data.sql` scripts located in `src/main/resources/`.
    - These scripts will create the necessary tables and insert some initial data into the `projects` table.

## API Endpoints

- **GET** `/api/projects`: Retrieves all projects.
- **POST** `/api/projects`: Creates a new project.
- **DELETE** `/api/projects/{id}`: Deletes a project by ID.

## Docker Support
If you need a Dockerfile for containerization, add the necessary Docker configuration (Dockerfile and any relevant scripts) to the project.

## SQL Scripts
The SQL scripts for table creation and data insertion are located in:
- `src/main/resources/schema.sql`
- `src/main/resources/data.sql`

These scripts are automatically executed when the application starts.