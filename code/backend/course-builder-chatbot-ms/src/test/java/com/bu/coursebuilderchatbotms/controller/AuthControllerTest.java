package com.bu.coursebuilderchatbotms.controller;
import com.bu.coursebuilderchatbotms.controller.AuthController;
import com.bu.coursebuilderchatbotms.dto.LoginRequest;
import com.bu.coursebuilderchatbotms.dto.LoginResponse;
import com.bu.coursebuilderchatbotms.service.UserService;
import com.bu.coursebuilderchatbotms.utils.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthControllerTest {

    @InjectMocks
    private AuthController authController;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserService userService;

    @Mock
    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoginSuccess() {
        LoginRequest loginRequest = new LoginRequest("testuser", "password");
        UserDetails userDetails = new User("testuser", "password", new ArrayList<>());
        String token = "dummy_token";

        when(userService.loadUserByUsername("testuser")).thenReturn(userDetails);
        when(jwtUtil.generateToken("testuser")).thenReturn(token);

        ResponseEntity<?> response = authController.login(loginRequest);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    void testLoginFailure() {
        LoginRequest loginRequest = new LoginRequest("testuser", "wrongpassword");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Invalid username or password"));

        ResponseEntity<?> response = authController.login(loginRequest);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Invalid username or password", response.getBody());
    }
}
