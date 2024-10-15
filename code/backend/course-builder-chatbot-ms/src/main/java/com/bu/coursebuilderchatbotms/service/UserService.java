package com.bu.coursebuilderchatbotms.service;

import com.bu.coursebuilderchatbotms.dao.UserDAO;
import com.bu.coursebuilderchatbotms.domain.User;
import com.bu.coursebuilderchatbotms.dto.UserCreationDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserService implements UserDetailsService {

    private final UserDAO userDAO;
    private final ObjectMapper objectMapper;

    @Autowired
    public UserService(UserDAO userDAO, ObjectMapper objectMapper) {
        this.userDAO = userDAO;
        this.objectMapper = objectMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDAO.getUserByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getAuthId())
                .password(user.getPasswordHash())
                .authorities(Collections.emptyList())
                .build();
    }

    public int createUser(UserCreationDTO userDTO) {
        User user = new User();
        user.setAuthId(userDTO.getAuthId());
        user.setEmail(userDTO.getEmail());
        user.setPasswordHash(userDTO.getPasswordHash());
        user.setFName(userDTO.getFirstName());
        user.setLName(userDTO.getLastName());
        user.setProgramCode(userDTO.getProgramCode());

        try {
            if(userDTO.getCourseTaken() != null) {
                String courseTakenJson = objectMapper.writeValueAsString(userDTO.getCourseTaken());
                user.setCourse_taken(courseTakenJson);
            } else if (userDTO.getCourseTaken().isEmpty()) {
                user.setCourse_taken("[]");
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error serializing courseTaken", e);
        }

        user.setPathInterest(userDTO.getPathInterest());
        user.setCourseToTake(userDTO.getCourseToTake());
        userDAO.createUser(user);
        return userDAO.getUserByUsername(user.getAuthId()).getUserId();
    }

    public User getUserByUsername(String username) {
        return userDAO.getUserByUsername(username);
    }
}
