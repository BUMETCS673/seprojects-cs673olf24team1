package com.bu.coursebuilderchatbotms.service;

import com.bu.coursebuilderchatbotms.dao.UserDAO;
import com.bu.coursebuilderchatbotms.domain.User;
import com.bu.coursebuilderchatbotms.dto.UserCreationDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @MockBean
    private UserDAO userDAO;

    @MockBean
    private ObjectMapper objectMapper;

    @Test
    public void getUserByIdTest() {
        User user = new User();
        when(userDAO.getUserById(1)).thenReturn(user);
        User result = userService.getUserById(1);
        assertEquals(user, result);
        verify(userDAO).getUserById(1);
    }

    @Test
    public void createUserTest() throws Exception {
        UserCreationDTO dto = new UserCreationDTO(); // Populate DTO as required
        when(objectMapper.writeValueAsString(any())).thenReturn("serializedJson");
        userService.createUser(dto);
        verify(userDAO).createUser(any(User.class));
    }

    @Test
    public void getUserByUsernameTest() {
        User user = new User();
        when(userDAO.getUserByUsername("username")).thenReturn(user);
        User result = userService.getUserByUsername("username");
        assertEquals(user, result);
        verify(userDAO).getUserByUsername("username");
    }
}