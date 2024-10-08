# Use Amazon Corretto 17 with Maven pre-installed
FROM maven:3.8.7-amazoncorretto-17

# Set the working directory in the container
WORKDIR /app

# Copy the local code to the container
COPY . .

# Build the application with Maven
# Skipping tests during the build process to speed up
RUN mvn clean install -DskipTests

# Expose the port that your web app runs on (change if needed)
EXPOSE 8080

# Start the application and then run your API tests
ENTRYPOINT ["sh", "-c", "mvn spring-boot:run & sleep 10 && mvn clean test"]
