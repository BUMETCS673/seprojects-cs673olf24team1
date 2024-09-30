package tests.ui-test;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

public class BaseTest {

    protected WebDriver driver;

    @BeforeMethod
    public void setup() {
        // Set the path to chromedriver executable
        System.setProperty("webdriver.chrome.driver", "path_to_chromedriver");

        // Initialize the ChromeDriver
        driver = new ChromeDriver();

        // Maximize the window
        driver.manage().window().maximize();
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
