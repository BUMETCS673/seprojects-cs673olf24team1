package com.bu.tests.steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.json.JSONObject;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import static org.junit.Assert.*;

public class ApiSteps {

    private HttpResponse<String> response;
    private final String apiUrl = "http://54.159.232.88:9080/api/v1/chatbot";
    private HttpClient client;

    @Given("I set POST chatbot API endpoint")
    public void setPost() {
        // Initialize HttpClient
        client = HttpClient.newHttpClient();
    }

    // Generic method for sending POST requests with custom messages
    private void sendPostWithMessage(String message) throws Exception {
        JSONObject json = new JSONObject();
        json.put("user_id", "123");
        json.put("student_name", "bcevik");
        json.put("course_taken", new int[]{521});
        json.put("path_interest", "Web development");
        json.put("course_to_take", 1);
        json.put("message", message);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json.toString()))
                .build();

        // Send the request and store the response
        response = client.send(request, HttpResponse.BodyHandlers.ofString());
    }

    // Default test case
    @When("I send a POST HTTP request")
    public void sendPost() throws Exception {
        sendPostWithMessage("I need to take this class");
    }

    // Handling dynamic message input for various tests
    @When("I send a POST HTTP request with the message {string}")
    public void sendPostWithDynamicMessage(String message) throws Exception {
        sendPostWithMessage(message);
    }

    @When("I send a POST HTTP request with an empty message")
    public void sendPostWithEmptyMessage() throws Exception {
        // Send an invalid request with only the "message" field as empty
        JSONObject json = new JSONObject();
        json.put("message", "");  // Empty message field

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json.toString()))
                .build();

        response = client.send(request, HttpResponse.BodyHandlers.ofString());
    }

    // Response assertion for valid response code
    @Then("I receive a valid HTTP response code {int}")
    public void i_receive_a_valid_http_response_code(int expectedStatusCode) {
        assertEquals(expectedStatusCode, response.statusCode());
    }

    // Response assertion for invalid response code
    @Then("I receive an invalid HTTP response code {int}")
    public void i_receive_an_invalid_http_response_code(int expectedStatusCode) {
        assertEquals(expectedStatusCode, response.statusCode());
    }

    // Error code assertion for empty message
    @Then("I should receive an error code {int} for empty message")
    public void i_should_receive_an_error_code_for_empty_message(int expectedErrorCode) {
        assertEquals(expectedErrorCode, response.statusCode());
    }
}
