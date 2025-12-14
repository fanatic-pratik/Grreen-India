package com.green_india.dto;

import com.green_india.entity.EcoBadge;
import lombok.Data;

@Data
public class UserProfileDTO {
    private Long id;
    private String name;
    private String email;
    private String prefs;

    // Gamification fields (read-only for user updates, but included in GET)
    private int totalPoints;
    private int ecoLevel;
    private EcoBadge badge;
}