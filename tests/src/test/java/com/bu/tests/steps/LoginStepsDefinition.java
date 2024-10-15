package com.bu.tests.steps;

import io.cucumber.java.After;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.Alert;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.JavascriptExecutor;


import java.net.URL;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class LoginStepsDefinition {

    private WebDriver driver;

    // Test Case 1: Verify Valid Login
    @Given("I am on the login page")
    public void navigateToLoginPage() throws Exception {
        ChromeOptions options = new ChromeOptions();
        driver = new RemoteWebDriver(new URL("http://localhost:4444/wd/hub"), options);
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
        driver.get("http://54.159.232.88:3000/");

        // Pause to allow you to observe the login page in Selenium Grid UI
        Thread.sleep(5000); // Wait 2 seconds (adjust this as needed)
    }

    @When("I enter username {string} and password {string}")
    public void enterCredentials(String username, String password) throws InterruptedException {
        WebElement userField = driver.findElement(By.id("authId"));
        WebElement passField = driver.findElement(By.id("password"));

        // Send username and password
        userField.sendKeys(username);
        passField.sendKeys(password);

        // Pause to allow you to observe the form input
        Thread.sleep(3000); // Wait 2 seconds

        driver.findElement(By.xpath("//*[@id='root']/main/div/div[2]/form/button")).click();

        // Pause after clicking the login button
        Thread.sleep(3000); // Wait 2 seconds
    }

    @Then("I should see the homepage")
    public void verifyHomepage() throws InterruptedException {
        String expectedText = "BUAN CHATBOT";

        // Locate the element containing the text "BUAN CHATBOT"
        WebElement buanChatbotText = driver.findElement(By.xpath("//p[text()='BUAN CHATBOT']"));

        // Highlight the text by changing its background color using JavaScript
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].style.backgroundColor = 'yellow'", buanChatbotText);

        // Pause to allow you to observe the highlight
        Thread.sleep(3000); // Wait 2 seconds

        // Verify the text is as expected
        String actualText = buanChatbotText.getText();
        assertEquals(expectedText, actualText);

        // Pause to allow you to observe the verification
        Thread.sleep(3000); // Wait 2 seconds

        // Optionally, remove the highlight (reset the background color)
        js.executeScript("arguments[0].style.backgroundColor = ''", buanChatbotText);
    }


    // New Step Definition: Login with username and password
    @Given("I am logged in with username {string} and password {string}")
    public void loggedInWithUsernameAndPassword(String username, String password) throws Exception {
        // Reuse existing steps to log in
        navigateToLoginPage();
        enterCredentials(username, password);
        verifyHomepage();
    }
    // Test Case 2: Logout Scenario
    @When("I click on the logout button")
    public void clickOnLogoutButton() throws InterruptedException {
        // Locate the logout button using the given XPath
        WebElement logoutButton = driver.findElement(By.xpath("//*[@id='root']/div[1]/div[2]/div[3]/span"));

        // Highlight the logout button
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].style.backgroundColor = 'yellow'", logoutButton);

        // Pause to observe the highlight
        Thread.sleep(2000);

        // Click the logout button
        logoutButton.click();

        // Pause after clicking logout
        Thread.sleep(2000);
    }

    @Then("I should be redirected to the login page")
    public void verifyRedirectToLoginPage() throws InterruptedException {
        // Wait for the login button to appear using the provided XPath
        WebElement loginButton = driver.findElement(By.xpath("//*[@id='root']/main/div/div[2]/form/button"));

        // Highlight the login button to confirm the redirection
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].style.backgroundColor = 'yellow'", loginButton);

        // Pause to observe the highlight
        Thread.sleep(2000);

        // Verify that the login button is displayed
        assertTrue(loginButton.isDisplayed());

        // Optionally, remove the highlight
        js.executeScript("arguments[0].style.backgroundColor = ''", loginButton);
    }


    // This hook ensures that the browser is closed after each scenario
    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
