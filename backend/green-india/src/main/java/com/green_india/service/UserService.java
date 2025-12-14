package com.green_india.service;

import com.green_india.dto.UserProfileDTO;
import com.green_india.dto.UserUpdateDTO;
import com.green_india.entity.User;
import com.green_india.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserProfileDTO getUserProfile(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        // Map User entity to DTO for response
        UserProfileDTO dto = new UserProfileDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPrefs(user.getPrefs());
        dto.setTotalPoints(user.getTotalPoints());
        dto.setEcoLevel(user.getEcoLevel());
        dto.setBadge(user.getBadge());

        return dto;
    }

    public UserProfileDTO updateUserProfile(Integer userId, UserUpdateDTO updateDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        // Apply updates from DTO
        if (updateDTO.getName() != null) {
            user.setName(updateDTO.getName());
        }
        if (updateDTO.getPrefs() != null) {
            user.setPrefs(updateDTO.getPrefs());
        }

        User updatedUser = userRepository.save(user);

        // Map and return the updated DTO
        return getUserProfile(updatedUser.getId());
    }
}