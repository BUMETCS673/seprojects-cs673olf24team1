package com.bu.tests.steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;

import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import static org.junit.Assert.*;

public class sb_ApiSteps {

    private String userId;
    private String studentName;
    private String message;
    private JSONObject conversationData;
    private JSONObject userData;
    private HttpClient client;
    private HttpResponse<String> response;
    private String apiUrl;
    private String jwtToken;
    private String username = "bu1234";
    private String password = "password123";
    private Exception requestException;

    @Given("I am an authenticated user")
    public void i_am_an_authenticated_user() throws Exception {
        client = HttpClient.newHttpClient();
        String authUrl = "http://localhost:8080/api/v1/auth/login"; // Updated authentication endpoint

        JSONObject credentials = new JSONObject();
        credentials.put("username", username);
        credentials.put("password", password);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(authUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(credentials.toString()))
                .build();

        HttpResponse<String> authResponse = client.send(request, HttpResponse.BodyHandlers.ofString());

        if (authResponse.statusCode() == 200) {
            JSONObject responseBody = new JSONObject(authResponse.body());
            jwtToken = responseBody.getString("token"); // Adjust based on your API's response format
        } else {
            throw new RuntimeException("Failed to authenticate: " + authResponse.body());
        }
    }

    @Given("I am an unauthenticated user")
    public void i_am_an_unauthenticated_user() {
        client = HttpClient.newHttpClient();
        jwtToken = null;
    }

    @Given("I have a valid user id {string}")
    public void i_have_a_valid_user_id(String userId) {
        this.userId = userId;
    }

    @When("I send a GET request to {string}")
    public void i_send_a_get_request_to(String endpoint) {
        try {
            apiUrl = "http://localhost:8080" + endpoint;
            HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .GET();

            if (jwtToken != null) {
                requestBuilder.header("Authorization", "Bearer " + jwtToken);
            }

            HttpRequest request = requestBuilder.build();

            System.out.println("Sending GET request to: " + apiUrl);

            response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("Received response with status code: " + response.statusCode());

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            requestException = e; // Store the exception for later
            response = null; // Ensure response is null
        }
    }

    @Then("the response contains a list of sessions for user {string}")
    public void the_response_contains_a_list_of_sessions_for_user(String userId) {
        String responseBody = response.body();
        assertTrue(responseBody.contains("\"userId\":" + userId));
    }

    @Given("I have a conversation to save")
    public void i_have_a_conversation_to_save() {
        conversationData = new JSONObject();
        conversationData.put("conversation", "[{\"user\": \"Hello\", \"chatbot\": \"Hi there! How can I help you today?\"}]");
    }

    @When("I send a POST request to {string} with the conversation data")
    public void i_send_a_post_request_to_with_the_conversation_data(String endpoint) {
        try {
            apiUrl = "http://localhost:8080" + endpoint;
            HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(conversationData.toString()));

            if (jwtToken != null) {
                requestBuilder.header("Authorization", "Bearer " + jwtToken);
            }

            HttpRequest request = requestBuilder.build();

            System.out.println("Sending POST request to: " + apiUrl);

            response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("Received response with status code: " + response.statusCode());

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            requestException = e;
            response = null;
        }
    }

    @Then("the conversation is saved for user {string}")
    public void the_conversation_is_saved_for_user(String userId) {
        // Assuming a 200 OK response means success
        assertEquals(200, response.statusCode());
    }

    @Then("the response contains the user information for user {string}")
    public void the_response_contains_the_user_information_for_user(String userId) {
        String responseBody = response.body();
        assertTrue(responseBody.contains("\"userId\":" + userId));
    }

    @Given("I have new user data")
    public void i_have_new_user_data() {
        userData = new JSONObject();
        userData.put("authId", "auth_005"); // Ensure unique authId
        userData.put("email", "bu1234@example.com");
        userData.put("passwordHash", "hashed_password");
        userData.put("fName", "bu1234");
        userData.put("lName", "bu1234");
        userData.put("programCode", "CS105");
        userData.put("courseTaken", new String[]{"521"});
        userData.put("pathInterest", "ai/ml");
        userData.put("courseToTake", 3);
    }

    @When("I send a POST request to {string} with the user data")
    public void i_send_a_post_request_to_with_the_user_data(String endpoint) throws Exception {
        apiUrl = "http://localhost:8080" + endpoint;
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Content-Type", "application/json")
                // Depending on your security configuration, you may or may not need the token for user creation
                .header("Authorization", "Bearer " + jwtToken)
                .POST(HttpRequest.BodyPublishers.ofString(userData.toString()))
                .build();
        response = client.send(request, HttpResponse.BodyHandlers.ofString());
    }

    @Then("the user is created in the system")
    public void the_user_is_created_in_the_system() {
        // Assuming a successful response means the user is created
        assertEquals(200, response.statusCode());
    }

    @Given("I have user id {string} and student name {string}")
    public void i_have_user_id_and_student_name(String userId, String studentName) {
        this.userId = userId;
        this.studentName = studentName;
    }

    @Given("I have a message {string}")
    public void i_have_a_message(String message) {
        this.message = message;
    }

    @When("I send a POST request to {string} with the message data")
    public void i_send_a_post_request_to_with_the_message_data(String endpoint) throws Exception {
        apiUrl = "http://localhost:8080" + endpoint;
        JSONObject json = new JSONObject();
        json.put("user_id", userId);
        json.put("student_name", studentName);
        json.put("message", message);

        HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json.toString()));

        if (jwtToken != null) {
            requestBuilder.header("Authorization", "Bearer " + jwtToken);
        }

        HttpRequest request = requestBuilder.build();
        response = client.send(request, HttpResponse.BodyHandlers.ofString());
    }

    @Then("the response contains a chatbot reply")
    public void the_response_contains_a_chatbot_reply() {
        String responseBody = response.body();
        assertTrue(responseBody.contains("\"response\":"));
    }

    @Then("I receive no response because I am unauthenticated")
    public void i_receive_no_response_because_i_am_unauthenticated() {
        assertNull("Expected response to be null for unauthenticated user", response);
    }

    @Then("I receive an authentication failure with status code {int}")
    public void i_receive_an_authentication_failure_with_status_code(int expectedStatusCode) {
        assertNotNull("Expected a response but received null", response);
        int actualStatusCode = response.statusCode();
        System.out.println("HTTP Status Code: " + actualStatusCode);
        assertEquals("Expected HTTP status code " + expectedStatusCode + " but received " + actualStatusCode,
                expectedStatusCode, actualStatusCode);
    }
}