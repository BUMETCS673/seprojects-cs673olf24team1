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

    @When("I send a POST HTTP request")
    public void sendPost() throws Exception {
        // Create JSON body
        JSONObject json = new JSONObject();
        json.put("user_id", "123");
        json.put("student_name", "bcevik");
        json.put("course_taken", new int[]{521});
        json.put("path_interest", "Web development");
        json.put("course_to_take", 1);
        json.put("message", "I need to take this class");

        // Build the request
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json.toString()))
                .build();

        // Send the request and store the response
        response = client.send(request, HttpResponse.BodyHandlers.ofString());
    }

    @Then("I receive a valid HTTP response code {int}")
    public void i_receive_a_valid_http_response_code(int expectedStatusCode) {
        // Assert the status code
        assertEquals(expectedStatusCode, response.statusCode());
    }

    @When("I send a POST HTTP request with an empty message")
    public void sendPostWithEmptyMessage() throws Exception {
        JSONObject json = new JSONObject();
        json.put("message", "");

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json.toString()))
                .build();

        response = client.send(request, HttpResponse.BodyHandlers.ofString());
    }

    @Then("I should receive an error code {int} for empty message")
    public void i_should_receive_an_error_code_for_empty_message(int expectedErrorCode) {
        assertEquals(expectedErrorCode, response.statusCode());
    }

    @When("I send a POST HTTP request without credentials")
    public void sendPostWithoutCredentials() throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString("{}"))
                .build();

        response = client.send(request, HttpResponse.BodyHandlers.ofString());
    }

    @Then("I should receive an unauthorized code {int} for no credentials")
    public void i_should_receive_an_unauthorized_code_for_no_credentials(int expectedStatusCode) {
        assertEquals(expectedStatusCode, response.statusCode());
    }
}