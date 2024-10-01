package tests.api-test;

import io.restassured.RestAssured;
import org.testng.annotations.BeforeMethod;

public class BaseApiTest {

    @BeforeMethod
    public void setup() {
        RestAssured.baseURI = "http://localhost:8080"; // Your API's base URL
    }
}
