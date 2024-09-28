package com.bu.coursebuilderchatbotms.service;

import com.bu.coursebuilderchatbotms.dao.UserDAO;
import com.bu.coursebuilderchatbotms.domain.User;
import com.bu.coursebuilderchatbotms.dto.UserCreationDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserDAO userDAO;
    private final ObjectMapper objectMapper;

    @Autowired
    public UserService(UserDAO userDAO, ObjectMapper objectMapper) {
        this.userDAO = userDAO;
        this.objectMapper = objectMapper;
    }

    public User getUserById(int userId) {
        User user = userDAO.getUserById(userId);
        if (user != null) {
            cleanUserCourseTaken(user);
        }
        return user;
    }

    public User createUser(UserCreationDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPasswordHash(userDTO.getPasswordHash());

        // Parse and clean the course_taken string
        String courseTaken = parseAndCleanCourseTaken(userDTO.getCourse_taken());
        user.setCourse_taken(courseTaken);

        user.setPath_interest(userDTO.getPath_interest());
        user.setCourse_to_take(userDTO.getCourse_to_take());

        User createdUser = userDAO.createUser(user);
        cleanUserCourseTaken(createdUser);
        return createdUser;
    }

    public User getUserByUsername(String username) {
        User user = userDAO.getUserByUsername(username);
        if (user != null) {
            cleanUserCourseTaken(user);
        }
        return user;
    }

    private String parseAndCleanCourseTaken(String courseTaken) {
        if (courseTaken == null || courseTaken.isEmpty()) {
            return "[]";
        }
        // Remove single quotes and backslashes
        courseTaken = courseTaken.replaceAll("'", "\"").replaceAll("\\\\", "");
        // Ensure it's a valid JSON array
        if (!courseTaken.startsWith("[")) {
            courseTaken = "[" + courseTaken + "]";
        }
        return courseTaken;
    }

    private void cleanUserCourseTaken(User user) {
        if (user.getCourse_taken() != null) {
            user.setCourse_taken(cleanCourseTakenString(user.getCourse_taken()));
        }
    }

    private String cleanCourseTakenString(String courseTaken) {
        if (courseTaken == null || courseTaken.isEmpty()) {
            return "[]";
        }
        return courseTaken.replaceAll("\\\\", "").replaceAll("\"", "'");
    }
}