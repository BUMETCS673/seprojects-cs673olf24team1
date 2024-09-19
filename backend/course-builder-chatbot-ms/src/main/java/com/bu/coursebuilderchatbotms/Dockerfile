# Use an official OpenJDK image as the base image
FROM openjdk:17-jdk-slim

# Add a volume pointing to /tmp
VOLUME /tmp

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file to the Docker container
COPY target/course-builder-chatbot-ms-0.0.1-SNAPSHOT.jar app.jar

# Expose the port Spring Boot runs on
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]