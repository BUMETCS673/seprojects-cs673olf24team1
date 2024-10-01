package tests.ui-test;

import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.Test;

public class CourseBuilderTest extends BaseTest {

    @Test
    public void testCreateCourse() {
        driver.get("http://localhost:3000/course-builder");

        driver.findElement(By.id("courseName")).sendKeys("New Course");
        driver.findElement(By.id("createCourseButton")).click();

        String successMessage = driver.findElement(By.id("successMessage")).getText();
        Assert.assertEquals(successMessage, "Course created successfully!");
    }
}
