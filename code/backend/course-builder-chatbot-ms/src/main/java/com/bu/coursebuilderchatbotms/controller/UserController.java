package com.bu.coursebuilderchatbotms.controller;

import com.bu.coursebuilderchatbotms.domain.User;
import com.bu.coursebuilderchatbotms.dto.UserCreationDTO;
import com.bu.coursebuilderchatbotms.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/user/{authid}")
    public User getUserById(@PathVariable String authid) {
        return userService.getUserByUsername(authid);
    }

    @PostMapping("/user")
    public int createUser(@RequestBody UserCreationDTO userDTO) {
        userDTO.setPasswordHash(passwordEncoder.encode(userDTO.getPassword()));
        return userService.createUser(userDTO);
    }
}