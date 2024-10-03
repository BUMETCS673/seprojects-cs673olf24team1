package com.bu.tests.steps;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;

@CucumberOptions(
        features = "src/test/resources/features", // Path to feature files
        glue = "com.bu.tests.steps", // Package containing step definitions
        plugin = {"pretty", "html:target/cucumber-reports"}, // Reporting options
        monochrome = true
)
public class CucumberTest extends AbstractTestNGCucumberTests {
}
