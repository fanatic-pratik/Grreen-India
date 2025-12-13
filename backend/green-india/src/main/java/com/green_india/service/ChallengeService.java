package com.green_india.service;

import com.green_india.entity.Challenge;
import com.green_india.entity.UserChallengeLog;
import com.green_india.repository.ChallengeRepository;
import com.green_india.repository.UserChallengeLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class ChallengeService {

    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private UserChallengeLogRepository userChallengeLogRepository;

    // Assuming a separate service to update user points for the Leaderboard feature
    // @Autowired
    // private UserService userService; 

    /**
     * Finds the user's current daily challenge, or assigns a new one if necessary.
     */
    public Challenge getOrCreateDailyChallenge(Long userId) {
        // 1. Check if the user already has a challenge assigned for today
        Optional<UserChallengeLog> todaysLog = userChallengeLogRepository.findTodaysChallengeLog(userId);

        if (todaysLog.isPresent()) {
            // Found today's challenge, return the existing one
            return todaysLog.get().getChallenge();
        } else {
            // 2. Assign a new challenge for today

            // Get all challenges marked as daily
            List<Challenge> dailyChallenges = challengeRepository.findByDaily(true);

            if (dailyChallenges.isEmpty()) {
                throw new IllegalStateException("No daily challenges defined in the database.");
            }

            // Pick a random challenge from the available list
            Challenge newChallenge = dailyChallenges.get(new Random().nextInt(dailyChallenges.size()));

            // 3. Log the new challenge assignment
            UserChallengeLog newLog = new UserChallengeLog();
            newLog.setUserId(userId);
            newLog.setChallenge(newChallenge);
            // Completion is false by default
            userChallengeLogRepository.save(newLog);

            return newChallenge;
        }
    }

    /**
     * Marks a specific challenge as complete and awards points.
     */
    public void completeChallenge(Long userId, Long challengeId) {

        // 1. Verify the challenge exists
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new IllegalArgumentException("Challenge not found."));

        // 2. Check if the user has ALREADY completed this specific challenge today.
        Optional<UserChallengeLog> alreadyCompleted = userChallengeLogRepository.findCompletedToday(userId, challengeId);

        if (alreadyCompleted.isPresent()) {
            throw new IllegalStateException("Challenge already completed today. Try again tomorrow!");
        }

        // 3. Find or create the log entry for today
        UserChallengeLog log = userChallengeLogRepository.findTodaysChallengeLog(userId)
                .orElseThrow(() -> new IllegalStateException("No challenge assigned for today. Please fetch the daily challenge first."));

        // 4. Update the log and save
        if (log.getChallenge().getId().equals(challengeId)) {
            log.setCompleted(true);
            log.setCompletedDate(LocalDateTime.now());
            userChallengeLogRepository.save(log);

            // 5. Award points (for Feature 1: Leaderboard)
            // userService.addPoints(userId, challenge.getPointsReward());

        } else {
            throw new IllegalArgumentException("The provided challengeId does not match the challenge assigned for today.");
        }
    }
}