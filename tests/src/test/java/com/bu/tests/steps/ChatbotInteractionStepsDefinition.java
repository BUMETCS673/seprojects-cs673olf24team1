package com.bu.tests.steps;

import io.cucumber.java.After;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import org.junit.AfterClass;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.net.URL;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class ChatbotInteractionStepsDefinition {

    private static WebDriver driver;

    // Reusable method to highlight an element
    public void highlightElement(WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].style.backgroundColor = 'yellow'", element);
    }

    // Refactored login method to avoid conflicts
    @Given("I log in to the chatbot with username {string} and password {string}")
    public void loginToChatbot(String username, String password) throws Exception {
        ChromeOptions options = new ChromeOptions();
        driver = new RemoteWebDriver(new URL("http://localhost:4444/wd/hub"), options);
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
        driver.get("http://54.159.232.88:3000/");

        // Enter username and password to log in
        WebElement userField = driver.findElement(By.id("authId"));
        WebElement passField = driver.findElement(By.id("password"));
        userField.sendKeys(username);
        passField.sendKeys(password);
        Thread.sleep(3000); // Observe the inputs

        driver.findElement(By.xpath("//*[@id='root']/main/div/div[2]/form/button")).click();
        Thread.sleep(3000); // Pause after clicking the login button

        // Verify login by checking the homepage
        String expectedText = "BUAN CHATBOT";
        WebElement buanChatbotText = driver.findElement(By.xpath("//p[text()='BUAN CHATBOT']"));
        highlightElement(buanChatbotText); // Highlight the element
        assertEquals(expectedText, buanChatbotText.getText());
    }

    @Given("I am logged in and have an active chat session")
    public void loggedInAndHaveActiveChatSession() throws Exception {
        loginToChatbot("testuser123", "TestPassword123!");
        WebElement chatBox = driver.findElement(By.xpath("//*[@id='root']/div[2]/div[2]/div[2]/input"));
        highlightElement(chatBox); // Highlight the element
        assertTrue(chatBox.isDisplayed());
    }

    @Given("I am logged in and viewing the chatbot homepage")
    public void loggedInAndViewingChatbotHomepage() throws Exception {
        loginToChatbot("testuser123", "TestPassword123!");
        WebElement homepageElement = driver.findElement(By.xpath("//p[text()='BUAN CHATBOT']"));
        highlightElement(homepageElement); // Highlight the element
        assertTrue(homepageElement.isDisplayed());
    }

    @When("I type {string} in the message box and send it")
    public void typeInMessageBoxAndSendIt(String message) throws InterruptedException {
        WebElement messageBox = driver.findElement(By.xpath("//*[@id='root']/div[2]/div[2]/div[2]/input"));
        highlightElement(messageBox); // Highlight the element
        messageBox.sendKeys(message);
        messageBox.sendKeys(Keys.ENTER);

        // No send button is required here, as the message is sent via pressing Enter.
    }

    @Then("I should see the response on the screen")
    public void verifyResponseVisible() throws InterruptedException {
        WebElement responseElement = driver.findElement(By.xpath("//p[contains(text(), 'CS521')]"));
        highlightElement(responseElement); // Highlight the element
        assertTrue(responseElement.isDisplayed());
        Thread.sleep(2000); // Pause to observe the highlight
    }

    @Then("the message box should be highlighted")
    public void verifyMessageBoxHighlighted() throws InterruptedException {
        WebElement messageBox = driver.findElement(By.xpath("//*[@id='root']/div[2]/div[2]/div[2]/input"));

        // Highlight the message box
        highlightElement(messageBox); // Call the highlight function

        // Wait a bit to let the highlight take effect
        Thread.sleep(2000);

        // Get the actual background color after applying JavaScript highlight
        String backgroundColor = messageBox.getCssValue("background-color");

        // Print the background color to the console for debugging
        System.out.println("Background color: " + backgroundColor);

        // Check for the correct yellow color code (RGB value)
        // Yellow in RGB is usually "rgba(255, 255, 0, 1)" or "rgb(255, 255, 0)" depending on the browser
        assertTrue("The message box is not highlighted as expected.",
                backgroundColor.contains("rgba(255, 255, 0, 1)") ||
                        backgroundColor.contains("rgb(255, 255, 0)"));
    }

    @When("I click on the Save to History")
    public void clickSaveToHistory() throws InterruptedException {
        WebElement saveHistoryButton = driver.findElement(By.xpath("//*[@id='root']/div[1]/div[2]/div[1]/p"));
        highlightElement(saveHistoryButton); // Highlight the element
        Thread.sleep(2000); // Pause to observe the highlight

        saveHistoryButton.click();
        Thread.sleep(2000); // Pause after action
    }

    @Then("the Save to History should be highlighted")
    public void verifySaveToHistoryHighlighted() throws InterruptedException {
        WebElement saveHistoryButton = driver.findElement(By.xpath("//*[@id='root']/div[1]/div[2]/div[1]/p"));
        highlightElement(saveHistoryButton);

    }



    @Then("the New Chat should be highlighted")
    public void verifyNewChatHighlighted() throws InterruptedException {
        WebElement newChatButton = driver.findElement(By.xpath("//*[@id='root']/div[1]/div[1]/div[1]"));
        highlightElement(newChatButton);
        driver.quit();
    }

    @AfterClass
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
