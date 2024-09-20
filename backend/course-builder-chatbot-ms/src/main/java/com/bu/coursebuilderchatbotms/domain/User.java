package com.bu.coursebuilderchatbotms.domain;

import lombok.Data;

@Data
public class User {
    private int userId;
    private String username;
    private String email;
    private String passwordHash;
    private String createdAt;
    private String lastLogin;
    private String userPreferences;
}