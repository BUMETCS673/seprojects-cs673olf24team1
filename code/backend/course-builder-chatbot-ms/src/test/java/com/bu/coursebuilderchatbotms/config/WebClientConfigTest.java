package com.bu.coursebuilderchatbotms.config;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.web.reactive.function.client.WebClient;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@TestPropertySource(properties = {"ai.service.url=http://54.159.232.88:9080/docs#/"})
class WebClientConfigTest {

    @InjectMocks
    private WebClientConfig webClientConfig;

    @Value("${ai.service.url}")
    private String aiServiceUrl;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void webClientBeanShouldBeCreatedWithBaseUrl() {
        // Call the method to create the WebClient bean
        WebClient webClient = webClientConfig.webClient();

        // Verify that the WebClient bean is not null
        assertNotNull(webClient, "WebClient bean should not be null");

        // Verify that the base URL is set correctly to the provided URL
        assertEquals(aiServiceUrl, "http://54.159.232.88:9080/docs#/");
    }
}
