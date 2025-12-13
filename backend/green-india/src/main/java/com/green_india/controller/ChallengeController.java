package com.green_india.controller;

import com.green_india.entity.Challenge;
import com.green_india.service.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/challenges")
public class ChallengeController {

    @Autowired
    private ChallengeService challengeService;

    // DANGER: Hardcoding ID for hackathon. Replace with Spring Security principal.
    private final Long TEST_USER_ID = 1L;

    /**
     * GET /api/challenges/daily
     * Retrieves the current daily challenge for the user.
     * Endpoint to be called by the frontend (UI/UX)
     */
    @GetMapping("/daily")
    public ResponseEntity<Challenge> getDailyChallenge() {
        try {
            Challenge dailyChallenge = challengeService.getOrCreateDailyChallenge(TEST_USER_ID);
            return ResponseEntity.ok(dailyChallenge);
        } catch (IllegalStateException e) {
            // Handles case where no daily challenges are defined in the DB
            return ResponseEntity.status(500).body(null);
        }
    }

    /**
     * POST /api/challenges/{challengeId}/complete
     * Marks a challenge as complete for the user.
     */
    @PostMapping("/{challengeId}/complete")
    public ResponseEntity<String> completeChallenge(@PathVariable Long challengeId) {
        try {
            challengeService.completeChallenge(TEST_USER_ID, challengeId);
            return ResponseEntity.ok("Challenge completed! You earned the reward.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}
