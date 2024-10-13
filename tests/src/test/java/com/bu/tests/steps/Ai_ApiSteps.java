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

public class Ai_ApiSteps {

    private HttpResponse<String> response;
    private final String apiUrl = "http://localhost:9080/api/v1/chatbot";
    private HttpClient client;

    @Given("I set POST to chatbot AI API endpoint")
    public void setPost() {
        // Initialize HttpClient
        client = HttpClient.newHttpClient();
    }

    @When("I send a POST HTTP request with a valid course number {string}")
    public void sendPostWithValidCourseNumber(String courseNumber) throws Exception {
        JSONObject json = new JSONObject();
        json.put("user_id", "123");
        json.put("student_name", "bcevik");
        json.put("course_taken", new int[]{521});
        json.put("path_interest", "Web development");
        json.put("course_to_take", 1);
        json.put("message", "Can you provide details for " + courseNumber);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json.toString()))
                .build();

        response = client.send(request, HttpResponse.BodyHandlers.ofString());
    }

    @When("I send a POST HTTP request with multiple course numbers {string} and {string}")
    public void sendPostWithMultipleCourseNumbers(String course1, String course2) throws Exception {
        JSONObject json = new JSONObject();
        json.put("user_id", "123");
        json.put("student_name", "bcevik");
        json.put("course_taken", new int[]{521});
        json.put("path_interest", "Web development");
        json.put("course_to_take", 1);
        json.put("message", "Can you provide details for " + course1 + " and " + course2);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json.toString()))
                .build();

        response = client.send(request, HttpResponse.BodyHandlers.ofString());
    }

    @Then("the system should display the course description including prerequisites")
    public void validateCourseDescription() throws Exception {
        String responseBody = response.body();
        assertTrue(responseBody.contains("prerequisites"));
    }

    @Then("the system should display the descriptions for both courses")
    public void validateMultipleCourseDescriptions() throws Exception {
        String responseBody = response.body();
        assertTrue(responseBody.contains("CS101") && responseBody.contains("CS102"));
    }


    @When("I send a POST HTTP request with my completed courses")
    public void sendPostWithCompletedCourses() throws Exception {
        JSONObject json = new JSONObject();
        json.put("user_id", "123");
        json.put("student_name", "bcevik");
        json.put("course_taken", new int[]{101, 102, 103});
        json.put("path_interest", "Web development");
        json.put("course_to_take", 3);
        json.put("message", "Generate my class schedule");

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json.toString()))
                .build();

        response = client.send(request, HttpResponse.BodyHandlers.ofString());
    }

    @Then("the system should generate and display the schedule")
    public void validateGeneratedSchedule() throws Exception {
        String responseBody = response.body();
        assertTrue(responseBody.contains("class schedule"));
    }

    @When("I request schedule modifications")
    public void requestScheduleModifications() throws Exception {
        JSONObject json = new JSONObject();
        json.put("user_id", "123");
        json.put("message", "Modify my class schedule");

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json.toString()))
                .build();

        response = client.send(request, HttpResponse.BodyHandlers.ofString());
    }

    @Then("the system should update the schedule")
    public void validateUpdatedSchedule() throws Exception {
        String responseBody = response.body();
        assertTrue(responseBody.contains("schedule updated"));
    }

    @When("I request an unavailable course {string}")
    public void requestUnavailableCourse(String courseName) throws Exception {
        JSONObject json = new JSONObject();
        json.put("user_id", "123");
        json.put("message", "I want to take " + courseName);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json.toString()))
                .build();

        response = client.send(request, HttpResponse.BodyHandlers.ofString());
    }

    @Then("the system should notify that the course is unavailable")
    public void validateUnavailableCourseResponse() throws Exception {
        String responseBody = response.body();
        assertTrue(responseBody.contains("course is unavailable"));
    }

    @When("I export the schedule")
    public void exportSchedule() throws Exception {
        JSONObject json = new JSONObject();
        json.put("user_id", "123");
        json.put("message", "Export my class schedule");

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json.toString()))
                .build();

        response = client.send(request, HttpResponse.BodyHandlers.ofString());
    }

    @Then("the system should export it successfully to a calendar format")
    public void validateExportedSchedule() throws Exception {
        String responseBody = response.body();
        assertTrue(responseBody.contains("export successful"));
    }

    @Then("the response is successful for ai but the body is null")
    public void the_response_is_successful_ai_but_the_body_is_null() {
        // Ensure the response status code is 200 OK
        assertNotNull("Expected a response, but got null", response);
        assertEquals("Expected HTTP status code 200", 200, response.statusCode());

        // Check if the response body is null or empty
        String responseBody = response.body();
        assertTrue("Expected the response body to be null or empty", responseBody == null || responseBody.isEmpty());
    }

    @Then("I receive a valid HTTP response code {int} from ai")
    public void i_receive_a_valid_http_response_code_ai(int expectedStatusCode) {
        // Check if the response is null
        if (response == null) {
            fail("Expected an HTTP response, but got null");
        }

        // Check the status code if the response is not null
        assertEquals("Unexpected HTTP response status code", expectedStatusCode, response.statusCode());
    }
}
