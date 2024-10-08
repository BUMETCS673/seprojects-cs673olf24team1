package com.bu.coursebuilderchatbotms.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(classes = JacksonConfig.class)
class JacksonConfigTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void objectMapperBeanShouldBeCreated() {
        // Verify that the ObjectMapper bean is created and not null
        assertNotNull(objectMapper, "ObjectMapper bean should be created by JacksonConfig");
    }
}
