package stepdefinitions;

import io.cucumber.java.en.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.testng.Assert;
import utils.SeleniumDriver;

public class LoginSteps {

    WebDriver driver = SeleniumDriver.getDriver();

    @Given("^I am on the login page$")
    public void i_am_on_the_login_page() {
        driver.get("http://localhost:3000/login");
    }

    @When("^I enter valid credentials$")
    public void i_enter_valid_credentials() {
        driver.findElement(By.id("username")).sendKeys("testuser");
        driver.findElement(By.id("password")).sendKeys("password123");
    }

    @When("^I enter invalid credentials$")
    public void i_enter_invalid_credentials() {
        driver.findElement(By.id("username")).sendKeys("wronguser");
        driver.findElement(By.id("password")).sendKeys("wrongpassword");
    }

    @When("^I click the login button$")
    public void i_click_the_login_button() {
        driver.findElement(By.id("loginButton")).click();
    }

    @Then("^I should see the welcome message$")
    public void i_should_see_the_welcome_message() {
        String message = driver.findElement(By.id("welcomeMessage")).getText();
        Assert.assertEquals(message, "Welcome, Test User");
    }

    @Then("^I should see an error message$")
    public void i_should_see_an_error_message() {
        String message = driver.findElement(By.id("errorMessage")).getText();
        Assert.assertEquals(message, "Invalid credentials");
    }
}
