
# Testing Automation Project

This README outlines how to run Selenium Grid both locally using bash and with Docker Compose, as well as how to execute Maven Cucumber BDD tests.

## Project Structure

The project directory is structured as follows:

- `src/test/java`: Contains test code with Cucumber step definitions.
  - `com.bu.tests.steps`: Includes `LoginStepDefinitions` and other test classes.
- `src/test/resources`: Contains resources for tests, including feature files.
  - `features`: Contains Cucumber feature files like `ui_tests.feature` and `api_tests.feature`.
- `docker-compose.yml`: Docker Compose file to set up Selenium Grid.
- `Dockerfile`: Dockerfile for building the Docker image.
- `pom.xml`: Maven configuration file.

## Running Selenium Grid

### Using Docker Compose

1. **Start Grid**: Navigate to your project root directory and run:
   ```bash
   docker-compose up -d
   ```
   This will start the Selenium Hub and browser nodes as configured in `docker-compose.yml`.

2. **Stop Grid**: To stop the Selenium Grid and remove containers, run:
   ```bash
   docker-compose down
   ```

### Locally Using Bash

1. **Create a Docker Network**:
   This network will facilitate communication between the hub and nodes.
   ```bash
   docker network create selenium-grid
   ```

2. **Start the Selenium Hub**:
   Start the hub within the created network.
   ```bash
   docker run -d -p 4444:4444 --name selenium-hub --network selenium-grid selenium/hub:4.0.0
   ```

3. **Start Chrome Node**:
   Start the Chrome node and configure it to connect to the hub.
   ```bash
   docker run -d --name chrome --network selenium-grid -p 5900:5900 -e SE_EVENT_BUS_HOST=selenium-hub -e SE_EVENT_BUS_PUBLISH_PORT=4442 -e SE_EVENT_BUS_SUBSCRIBE_PORT=4443 selenium/node-chrome:4.0.0
   ```

4. **Start Firefox Node**:
   Start the Firefox node similarly, ensuring it knows where to register.
   ```bash
   docker run -d --name firefox --network selenium-grid -p 5901:5901 -e SE_EVENT_BUS_HOST=selenium-hub -e SE_EVENT_BUS_PUBLISH_PORT=4442 -e SE_EVENT_BUS_SUBSCRIBE_PORT=4443 selenium/node-firefox:4.0.0
   ```

5. **Access the Grid Console**:
   Visit `http://localhost:4444/ui/index.html#` to see the nodes registered on the grid.

## Running Cucumber BDD Tests with Maven

Execute the Maven Cucumber tests using the command below from the root of your project:

```bash
mvn clean test
```

This command compiles your tests and runs them as configured in your `pom.xml` and Cucumber setup.

## Troubleshooting

- **Selenium Grid**: Ensure all Docker commands are executed without errors and the nodes show up in the grid console.
- **Maven Tests**: Check the console output for errors, and ensure your feature files are correctly linked to the step definitions.

## Conclusion

This setup guides you through using Docker to manage Selenium Grid environments and how to run Cucumber BDD tests with Maven for UI testing automation.
