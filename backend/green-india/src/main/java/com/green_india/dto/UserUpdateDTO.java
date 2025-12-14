package com.green_india.dto;

import lombok.Data;

@Data
public class UserUpdateDTO {
    // Fields the user is allowed to update directly
    private String name;
    private String prefs;
}