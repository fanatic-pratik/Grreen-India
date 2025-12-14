package com.green_india.dto;

import lombok.Data;

@Data // Provides getters and setters
public class LoginRequest {
    private String email;
    private String password;
}