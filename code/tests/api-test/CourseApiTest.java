package tests.api-test;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Test;

public class CourseApiTest extends BaseApiTest {

    @Test
    public void testCreateCourse() {
        String requestBody = "{ \"courseName\": \"New Course\" }";

        Response response = RestAssured
                .given()
                .contentType(ContentType.JSON)
                .body(requestBody)
                .post("/courses");

        Assert.assertEquals(response.getStatusCode(), 201);
        String courseId = response.jsonPath().getString("id");
        Assert.assertNotNull(courseId);
    }
}
