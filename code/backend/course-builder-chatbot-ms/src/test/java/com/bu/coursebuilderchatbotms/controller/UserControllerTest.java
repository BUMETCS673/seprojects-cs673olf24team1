package com.bu.coursebuilderchatbotms.controller;

import com.bu.coursebuilderchatbotms.domain.User;
import com.bu.coursebuilderchatbotms.dto.UserCreationDTO;
import com.bu.coursebuilderchatbotms.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class UserControllerTest {

    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserController userController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void testGetUserById_Success() throws Exception {
        // Arrange
        User user = new User();
        user.setUserId(2);
        user.setAuthId("auth_002");
        user.setEmail("user2@example.com");
        user.setPasswordHash("hashed_password2");

        when(userService.getUserByUsername("auth_002")).thenReturn(user);

        // Act & Assert
        mockMvc.perform(get("/api/v1/users/user/auth_002")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(2))
                .andExpect(jsonPath("$.authId").value("auth_002"))
                .andExpect(jsonPath("$.email").value("user2@example.com"))
                .andExpect(jsonPath("$.passwordHash").value("hashed_password2"));

        verify(userService, times(1)).getUserByUsername("auth_002");
    }

    @Test
    void testGetUserById_UserNotFound() throws Exception {
        // Arrange
        when(userService.getUserByUsername("auth_002")).thenReturn(null);

        // Act & Assert
        mockMvc.perform(get("/api/v1/users/user/auth_002")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is2xxSuccessful());

        verify(userService, times(1)).getUserByUsername("auth_002");
    }

    @Test
    void testCreateUser_Success() throws Exception {
        // Arrange
        UserCreationDTO userDTO = new UserCreationDTO();
        userDTO.setAuthId("bu1234rerer");
        userDTO.setEmail("bu1234erer@example.com");
        userDTO.setPassword("hashed_password5");
        userDTO.setFirstName("bu1234");
        userDTO.setLastName("bu1234");
        userDTO.setProgramCode("CS105");
        userDTO.setCourseTaken(List.of(new String[]{"521"}));
        userDTO.setPathInterest("ai/ml");
        userDTO.setCourseToTake(3);

        String encodedPassword = "encoded_password5";
        when(passwordEncoder.encode(userDTO.getPassword())).thenReturn(encodedPassword);
        when(userService.createUser(any(UserCreationDTO.class))).thenReturn(1);

        String requestBody = objectMapper.writeValueAsString(userDTO);

        // Act & Assert
        mockMvc.perform(post("/api/v1/users/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk());

        verify(passwordEncoder, times(1)).encode(userDTO.getPassword());
        verify(userService, times(1)).createUser(any(UserCreationDTO.class));
    }
}