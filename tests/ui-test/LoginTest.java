package tests.ui-test;

import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.Test;

public class LoginTest extends BaseTest {

    @Test
    public void testLogin() {
        // Navigate to your app's login page
        driver.get("http://localhost:3000/login");

        // Locate elements and perform actions
        driver.findElement(By.id("username")).sendKeys("testuser");
        driver.findElement(By.id("password")).sendKeys("password123");
        driver.findElement(By.id("loginButton")).click();

        // Validate login success
        String welcomeMessage = driver.findElement(By.id("welcomeMessage")).getText();
        Assert.assertEquals(welcomeMessage, "Welcome, Test User");
    }
}
