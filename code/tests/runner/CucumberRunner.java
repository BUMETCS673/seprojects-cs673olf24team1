package runner;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;

@CucumberOptions(
    features = "src/test/java/features",
    glue = {"stepdefinitions"},
    plugin = {"pretty", "html:target/cucumber-reports/cucumber.html"},
    monochrome = true
)

public class CucumberRunner extends AbstractTestNGCucumberTests {
}
