package tests.utils;

import io.restassured.RestAssured;
import io.restassured.response.Response;

public class ApiHelper {

    public static Response createCourse(String courseName) {
        return RestAssured
                .given()
                .contentType("application/json")
                .body("{ \"courseName\": \"" + courseName + "\" }")
                .post("/courses");
    }
}
