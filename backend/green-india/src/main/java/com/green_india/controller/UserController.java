package com.green_india.controller;

import com.green_india.dto.UserProfileDTO;
import com.green_india.dto.UserUpdateDTO;
import com.green_india.entity.EcoBadge;
import com.green_india.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users") // Use /api/users for resource-based naming
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * GET /api/users/{id}
     * Retrieves a user's profile information by ID.
     * REQUIRES: JWT
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable Integer id) {
        // NOTE: In a real app, you would verify the JWT user ID matches the {id} path variable, 
        // unless they are an admin. For simplicity, we just fetch the data.
        UserProfileDTO profile = userService.getUserProfile(id);
        return ResponseEntity.ok(profile);
    }

    /**
     * PUT/PATCH /api/users/{id}
     * Updates a user's profile details (name, prefs).
     * REQUIRES: JWT
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserProfileDTO> updateUserProfile(@PathVariable Integer id, @RequestBody UserUpdateDTO updateDTO) {
        // Again, verify the request is from the authenticated user before allowing update
        UserProfileDTO updatedProfile = userService.updateUserProfile(id, updateDTO);
        return ResponseEntity.ok(updatedProfile);
    }

    /**
     * GET /api/users/{id}/badge
     * Retrieves only the EcoBadge (retaining your original simple endpoint logic).
     * REQUIRES: JWT
     */
    @GetMapping("/{id}/badge")
    public EcoBadge getUserBadge(@PathVariable Integer id){
        // Fetch the full DTO and return just the badge
        return userService.getUserProfile(id).getBadge();
    }
}