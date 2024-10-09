package com.bu.tests.steps;

//import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.hamcrest.Matcher;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import io.cucumber.java.en.*;
import static io.restassured.RestAssured.*;
//import static org.apache.commons.lang3.ArrayUtils.isSorted;
import static org.hamcrest.Matchers.*;

//import java.net.URL;

public class ChatHistoryCachingSteps {

    private WebDriver driver;
    private Response response;

    /**
     * Step to establish an existing session with the BUAN chatbot.
     * Uses RestAssured for API login and Selenium WebDriver to open the chat UI.
     */
    @Given("I have an existing session with the BUAN chatbot")
    public void i_have_an_existing_session_with_the_buan_chatbot() {
        // Set up API base URI for RestAssured (update to your API server)
        baseURI = "http://localhost:8080";  // Replace with actual base URL

        // Simulate login or initialization of an existing session using RestAssured API
        given()
                .auth().basic("student", "password")
                .when()
                .post("/login")  // API endpoint for login (adjust as needed)
                .then()
                .statusCode(200);  // Ensure login is successful

        // Initialize Selenium WebDriver to interact with the chat UI
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");  // Adjust the ChromeDriver path
        driver = new ChromeDriver();
        driver.get("http://localhost:3000/chatbot");  // Assuming chatbot UI runs on localhost:3000
    }

    /**
     * Step to request chat history from the previous session.
     * This sends a GET request to retrieve the chat history and simulates a UI interaction using Selenium.
     */
    @When("I request the chat history from my previous session")
    public void i_request_the_chat_history_from_my_previous_session() {
        // Send an API request to retrieve the chat history (adjust endpoint)
        response = when().get("/chatbot/chat_history");

        // Simulate the request for chat history through UI using Selenium
        WebElement chatHistoryButton = driver.findElement(By.id("chat-history-btn"));  // Assume chat history button has this ID
        chatHistoryButton.click();  // Click to load the chat history
    }

    /**
     * Step to verify that chat history is displayed in chronological order.
     * Checks both the API response and the UI to ensure the chat is displayed correctly.
     */
    @Then("the chatbot should display my previous interactions in chronological order")
    public void the_chatbot_should_display_my_previous_interactions_in_chronological_order() {
        // Assert that the API response contains chat history in chronological order
        response.then()
                .statusCode(200)  // Ensure response is OK
                .body("history.timestamp", isSorted());  // Check if history is sorted by timestamp (implement sorting validation)

        // Simulate checking chat history on the UI
        WebElement chatBox = driver.findElement(By.id("chat-history"));  // Assuming chat history has an element with this ID
        String chatHistory = chatBox.getText();

        // Check if chat history is populated and shown correctly (simplified check)
        if (chatHistory.isEmpty()) {
            throw new AssertionError("Chat history is not displayed as expected.");
        }
    }

    private Matcher<?> isSorted() {
        return null;
    }

    /**
     * Step to validate that the chat history is cached and loads quickly.
     * Uses response time to confirm caching effectiveness.
     */
    @And("the chat history should load quickly from the cache")
    public void the_chat_history_should_load_quickly_from_the_cache() {
        // Validate that chat history is cached (response time should be low)
        response.then().time(lessThan(1000L));  // Ensure response time is less than 1 second (adjust threshold as needed)

        // Additional logging or cache validation can be added here if applicable.
    }

    /**
     * Step to simulate deletion of chat history using API and UI.
     */
    @Given("I have deleted my chat history")
    public void i_have_deleted_my_chat_history() {
        // Send API request to delete the chat history (adjust endpoint)
        when().delete("/chatbot/chat_history")
                .then().statusCode(200);  // Ensure deletion is successful

        // Simulate the deletion of chat history via the UI
        WebElement deleteButton = driver.findElement(By.id("delete-history-btn"));  // Assuming a delete button is available
        deleteButton.click();  // Click to delete chat history
    }

    /**
     * Step to attempt accessing chat history after deletion.
     */
    @When("I attempt to access my previous chat history")
    public void i_attempt_to_access_my_previous_chat_history() {
        // Attempt to retrieve deleted chat history using API
        response = when().get("/chatbot/chat_history");
    }

    /**
     * Step to verify that no chat history is found after deletion.
     * Checks both API and UI responses for correctness.
     */
    @Then("the chatbot should return a \"no result found\" message")
    public void the_chatbot_should_return_a_no_result_found_message() {
        // Assert that the API returns a 404 and "no result found" message
        response.then()
                .statusCode(404)
                .body("message", equalTo("No result found"));

        // Simulate checking for the "no result found" message on the UI
        WebElement chatBox = driver.findElement(By.id("chat-history"));  // Locate chat history UI element
        String chatHistory = chatBox.getText();

        // Ensure the correct "no result found" message is displayed
        if (!chatHistory.contains("no result found")) {
            throw new AssertionError("Expected 'no result found' message is not displayed.");
        }

        // Close the WebDriver session after the test completes
        driver.quit();
    }

}
