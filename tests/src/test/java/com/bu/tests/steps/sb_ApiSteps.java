package com.bu.tests.steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;

import org.json.JSONArray;
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

        // Step 1: Create the user if not already created
        String createUserUrl = "http://localhost:8080/api/v1/users/user";
        JSONObject userData = new JSONObject();
        userData.put("authId", "bu1234rerer");
        userData.put("email", "bu1234erer@example.com");
        userData.put("password", "password123");
        userData.put("fName", "bu1234");
        userData.put("lName", "bu1234");
        userData.put("programCode", "CS105");
        userData.put("courseTaken", new String[]{"521"});
        userData.put("pathInterest", "ai/ml");
        userData.put("courseToTake", 3);

        HttpRequest createUserRequest = HttpRequest.newBuilder()
                .uri(URI.create(createUserUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(userData.toString()))
                .build();

        HttpResponse<String> createUserResponse = client.send(createUserRequest, HttpResponse.BodyHandlers.ofString());

        if (createUserResponse.statusCode() != 200 && createUserResponse.statusCode() != 201) {
            throw new RuntimeException("Failed to create user: " + createUserResponse.body());
        }

        // Step 2: Authenticate the user
        String authUrl = "http://localhost:8080/api/v1/auth/login";

        JSONObject credentials = new JSONObject();
        credentials.put("username", "bu1234rerer"); // Use the same authId as the username
        credentials.put("password", "password123");

        HttpRequest authRequest = HttpRequest.newBuilder()
                .uri(URI.create(authUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(credentials.toString()))
                .build();

        HttpResponse<String> authResponse = client.send(authRequest, HttpResponse.BodyHandlers.ofString());

        // Print the actual response body to understand the format
        System.out.println("Authentication response body: " + authResponse.body());

        if (authResponse.statusCode() == 200) {
            JSONObject responseBody = new JSONObject(authResponse.body());

            // Check if "token" exists and adjust the key based on the actual response format
            if (responseBody.has("jwt")) {
                jwtToken = responseBody.getString("jwt");
            } else {
                throw new RuntimeException("Token not found in the response: " + authResponse.body());
            }
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
        userData.put("email", "newuser@example.com");
        userData.put("password", "hashed_password"); // Password should be plain text if you're encoding it on the server
        userData.put("fName", "New");
        userData.put("lName", "User");
        userData.put("programCode", "CS105");
        userData.put("courseTaken", new String[]{"521"});
        userData.put("pathInterest", "ai/ml");
        userData.put("courseToTake", 3);
    }

    @When("I send a POST request to {string} with the user data")
    public void i_send_a_post_request_to_with_the_user_data(String endpoint) throws Exception {
        apiUrl = "http://localhost:8080" + endpoint;

        // Ensure we're authenticated
        assertNotNull("JWT token is missing, make sure you are authenticated", jwtToken);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + jwtToken) // Add the JWT token to the request
                .POST(HttpRequest.BodyPublishers.ofString(userData.toString()))
                .build();

        response = client.send(request, HttpResponse.BodyHandlers.ofString());
    }

    @Then("the user is created in the system")
    public void the_user_is_created_in_the_system() {
        // Expect a 201 Created or 200 OK depending on your API
        assertEquals(200, response.statusCode()); // Adjust this status code depending on what your API returns on successful creation
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

    @Then("the response is successful but the body is null")
    public void the_response_is_successful_but_the_body_is_null() {
        // Ensure the response status code is 200 OK
        assertNotNull("Expected a response, but got null", response);
        assertEquals("Expected HTTP status code 200", 200, response.statusCode());

        // Check if the response body is null or empty
        String responseBody = response.body();
        assertTrue("Expected the response body to be null or empty", responseBody == null || responseBody.isEmpty());
    }

    @Given("this is just a logger")
    public void this_is_just_a_logger() {
        System.out.println("HTTP response body" + response.body());
    }

    @Then("I successfully receive session data")
    public void i_successfully_receive_session_data() {
        // Ensure the response is not null
        assertNotNull("Expected a response, but got null", response);

        // Ensure the response status code is 200 OK
        assertEquals("Expected HTTP status code 200", 200, response.statusCode());

        // Get the response body
        String responseBody = response.body();
        assertNotNull("Expected the response body to contain session data, but got null", responseBody);

        // Parse the response body as a JSON array
        JSONArray sessions = new JSONArray(responseBody);

        // Ensure we received at least one session
        assertTrue("Expected to receive at least one session", sessions.length() > 0);

        // Check specific fields for the first session as an example
        JSONObject firstSession = sessions.getJSONObject(0);
        assertEquals(1, firstSession.getInt("sessionId")); // Example: sessionId should be 1
        assertEquals(2, firstSession.getInt("userId"));    // Example: userId should be 2
        assertNotNull(firstSession.getString("createdAt")); // Ensure the createdAt field is not null
        assertEquals("[{\"user\":\"Hello\",\"chatbot\":\"Hi there! How can I help you today?\"}]",
                firstSession.getString("conversation")); // Check conversation field
    }

}