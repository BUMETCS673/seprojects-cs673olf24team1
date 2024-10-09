package com.bu.tests.steps;

import io.restassured.RestAssured;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class Chathistoryapi {

    @Test
    public void testChatHistoryRetrieval() {
        RestAssured.baseURI = "https://api.example.com";

        given()
                .header("Authorization", "Bearer token")
                .when()
                .get("/chathistory/{userId}", "12345") // Replace with your API path and user ID
                .then()
                .statusCode(200) // Check status code is 200
                .body("messages", not(empty())) // Verify chat history contains messages
                .body("messages[0].timestamp", lessThan("messages[1].timestamp")); // Ensure correct chronological order
    }

    @Test
    public void testChatHistoryDeletion() {
        RestAssured.baseURI = "https://api.example.com";

        given()
                .header("Authorization", "Bearer token")
                .when()
                .delete("/chathistory/{userId}", "12345") // Replace with your API path and user ID
                .then()
                .statusCode(204); // Expecting no content after deletion

        // Verify retrieval after deletion
        given()
                .header("Authorization", "Bearer token")
                .when()
                .get("/chathistory/{userId}", "12345")
                .then()
                .statusCode(404) // Verify that chat history is no longer available
                .body("message", equalTo("No chat history found"));
    }
}
