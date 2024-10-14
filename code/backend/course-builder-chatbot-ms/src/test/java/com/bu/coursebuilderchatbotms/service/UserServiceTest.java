package com.bu.coursebuilderchatbotms.service;

import com.bu.coursebuilderchatbotms.dao.UserDAO;
import com.bu.coursebuilderchatbotms.domain.User;
import com.bu.coursebuilderchatbotms.dto.UserCreationDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserDAO userDAO;

    @Mock
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void loadUserByUsername_Success() {
        String username = "testuser";
        User user = new User();
        user.setAuthId(username);
        user.setPasswordHash("hashedpassword");

        when(userDAO.getUserByUsername(username)).thenReturn(user);

        UserDetails userDetails = userService.loadUserByUsername(username);

        assertNotNull(userDetails);
        assertEquals(username, userDetails.getUsername());
        assertEquals("hashedpassword", userDetails.getPassword());
        assertTrue(userDetails.getAuthorities().isEmpty());
    }

    @Test
    void loadUserByUsername_UserNotFound() {
        String username = "nonexistentuser";

        when(userDAO.getUserByUsername(username)).thenReturn(null);

        assertThrows(UsernameNotFoundException.class, () -> userService.loadUserByUsername(username));
    }

    @Test
    void createUser_Success() throws JsonProcessingException {
        UserCreationDTO userDTO = new UserCreationDTO();
        userDTO.setAuthId("newuser");
        userDTO.setEmail("newuser@example.com");
        userDTO.setPasswordHash("hashedpassword");
        userDTO.setFirstName("John");
        userDTO.setLastName("Doe");
        userDTO.setProgramCode("CS");
        userDTO.setCourseTaken(Arrays.asList("CS101", "CS102"));
        userDTO.setPathInterest("Software Engineering");
        userDTO.setCourseToTake(2);

        User createdUser = new User();
        createdUser.setUserId(1);
        createdUser.setAuthId("newuser");

        when(objectMapper.writeValueAsString(any())).thenReturn("[\"CS101\",\"CS102\"]");
        when(userDAO.getUserByUsername("newuser")).thenReturn(createdUser);

        int userId = userService.createUser(userDTO);

        assertEquals(1, userId);
        verify(userDAO).createUser(any(User.class));
        verify(userDAO).getUserByUsername("newuser");
    }

    @Test
    void getUserByUsername_Success() {
        String username = "existinguser";
        User user = new User();
        user.setAuthId(username);

        when(userDAO.getUserByUsername(username)).thenReturn(user);

        User result = userService.getUserByUsername(username);

        assertNotNull(result);
        assertEquals(username, result.getAuthId());
    }
}