package com.bu.coursebuilderchatbotms.config;

import com.bu.coursebuilderchatbotms.utils.JwtRequestFilter;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@AutoConfigureMockMvc
class SecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JwtRequestFilter jwtRequestFilter;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @Test
    void securityFilterChainShouldBeConfigured() {
        // Just check that the MockMvc is created, indicating the security config is loaded
        assertNotNull(mockMvc, "MockMvc should be created and configured with security settings");
    }

    @Test
    void authenticationManagerBeanShouldBeCreated(@Autowired AuthenticationManager authenticationManager) {
        assertNotNull(authenticationManager, "AuthenticationManager should be configured");
    }

    @Test
    void passwordEncoderBeanShouldBeCreated(@Autowired PasswordEncoder passwordEncoder) {
        assertNotNull(passwordEncoder, "PasswordEncoder should be configured");
    }
}
