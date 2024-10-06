package com.bu.coursebuilderchatbotms.dto;

import lombok.Getter;

@Getter
public class LoginResponse {
    private final String jwt;

    public LoginResponse(String jwt) {
        this.jwt = jwt;
    }
}