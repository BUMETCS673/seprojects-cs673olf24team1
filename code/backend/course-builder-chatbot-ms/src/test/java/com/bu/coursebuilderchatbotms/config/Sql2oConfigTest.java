package com.bu.coursebuilderchatbotms.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.sql2o.Sql2o;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:postgresql://localhost:5432/mydb",
        "spring.datasource.username=myuser",
        "spring.datasource.password=mypassword"
})
class Sql2oConfigTest {

    @Autowired
    private Sql2oConfig sql2oConfig;

    @Test
    void sql2oBeanShouldBeCreatedSuccessfully() {
        // Call the method to create the Sql2o bean
        Sql2o sql2o = sql2oConfig.sql2o();

        // Verify that the Sql2o bean is not null
        assertNotNull(sql2o, "Sql2o bean should not be null");
    }
}
