package com.bu.tests.steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.util.concurrent.TimeUnit;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.net.URL;

public class LoginStepDefinitions {

    private WebDriver driver;

    @Given("I am on the login page")
    public void navigateToLoginPage() throws Exception {
        ChromeOptions options = new ChromeOptions();

        driver = new RemoteWebDriver(new URL("http://localhost:4444/wd/hub"), options);

        // Set timeouts
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);

        driver.get("http://localhost:3000/");
    }

    @When("I enter username {string} and password {string}")
    public void enterCredentials(String username, String password) {
        WebElement userField = driver.findElement(By.id("email")); // Corrected from username to email
        WebElement passField = driver.findElement(By.id("password")); // Correct ID usage
        userField.sendKeys(username);
        passField.sendKeys(password);
        driver.findElement(By.cssSelector(".login-btn.form-input-btn")).click();
    }

    @Then("I should see the homepage")
    public void verifyHomepage() {
        // Define the expected text to verify the homepage.
        String expectedText = "BUAN CHATBOT";
        // Find the element containing the expected text and retrieve its actual text.
        String actualText = driver.findElement(By.xpath("//p[text()='BUAN CHATBOT']")).getText();
        assertEquals(expectedText, actualText, "BUAN CHATBOT");
        // Quit the driver after the test completes.
        driver.quit();
    }

}