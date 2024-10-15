package com.bu.tests.steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import org.junit.After;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.util.concurrent.TimeUnit;
import static org.junit.Assert.assertTrue;
import java.net.URL;

public class SignUpStepsDefinition {

    private WebDriver driver;

    @Given("I launch the login page")
    public void navigateToLoginPage() throws Exception {
        ChromeOptions options = new ChromeOptions();
        driver = new RemoteWebDriver(new URL("http://localhost:4444/wd/hub"), options);
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
        driver.get("http://54.159.232.88:3000/"); // Launch the login page
    }

    @When("I click on the Sign Up link")
    public void clickOnSignUpLink() {
        // Click on the "Sign Up" link to navigate to the signup page
        WebElement signUpLink = driver.findElement(By.xpath("//*[@id=\"root\"]/main/div/div[2]/form/span[1]/a"));

        signUpLink.click();
    }

    @When("I enter username {string}")
    public void enterUsername(String username) {
        WebElement usernameField = driver.findElement(By.xpath("//*[@id=\"authId\"]"));

        usernameField.sendKeys(username);
    }

    @When("I enter email {string}")
    public void enterEmail(String email) {
        WebElement emailField = driver.findElement(By.xpath("//*[@id=\"email\"]"));
        emailField.sendKeys(email);
    }

    @When("I enter password {string}")
    public void enterPassword(String password) {
        WebElement passwordField = driver.findElement(By.xpath("//*[@id=\"password\"]"));
        passwordField.sendKeys(password);
    }

    @When("I confirm the password {string}")
    public void confirmPassword(String confirmPassword) {
        WebElement confirmPasswordField = driver.findElement(By.xpath("//*[@id=\"confirmPassword\"]"));
        confirmPasswordField.sendKeys(confirmPassword);
    }

    @When("I enter first name {string}")
    public void enterFirstName(String firstName) {
        WebElement firstNameField = driver.findElement(By.xpath("//*[@id=\"root\"]/main/div/div[2]/form/div[5]/input"));
        firstNameField.sendKeys(firstName);
    }

    @When("I enter last name {string}")
    public void enterLastName(String lastName) {
        WebElement lastNameField = driver.findElement(By.xpath("//*[@id=\"root\"]/main/div/div[2]/form/div[6]/input"));
        lastNameField.sendKeys(lastName);
    }

    @When("I enter BU ID {string}")
    public void enterBUId(String buId) {
        WebElement buIdField = driver.findElement(By.xpath("//*[@id=\"root\"]/main/div/div[2]/form/div[7]/input"));
        buIdField.sendKeys(buId);
    }

    @When("I select program type {string}")
    public void selectProgramType(String programType) {
        WebElement programTypeDropdown = driver.findElement(By.xpath("//*[@id=\"root\"]/main/div/div[2]/form/div[8]/select"));
        programTypeDropdown.sendKeys(programType);
    }

    @When("I select program name {string}")
    public void selectProgramName(String programName) {
        WebElement programNameDropdown = driver.findElement(By.xpath("//*[@id=\"root\"]/main/div/div[2]/form/div[9]/select"));
        programNameDropdown.sendKeys(programName);
    }

    @When("I select path of interest {string}")
    public void selectPathOfInterest(String pathOfInterest) {
        WebElement pathOfInterestDropdown = driver.findElement(By.xpath("//*[@id=\"root\"]/main/div/div[2]/form/div[10]/select"));
        pathOfInterestDropdown.sendKeys(pathOfInterest);
    }

    @When("I click on the Sign Up button")
    public void clickSignUpButton() {
        WebElement signUpButton = driver.findElement(By.xpath("//*[@id=\"root\"]/main/div/div[2]/form/button"));
        signUpButton.click();
        driver.quit();
    }

    // This hook runs after each scenario, whether it passes or fails
    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

}
