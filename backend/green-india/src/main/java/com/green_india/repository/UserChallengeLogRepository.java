package com.green_india.repository;

import com.green_india.entity.UserChallengeLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserChallengeLogRepository extends JpaRepository<UserChallengeLog, Long> {

    // Crucial Query: Checks if a user has completed a SPECIFIC challenge today.
    @Query(value = "SELECT l FROM UserChallengeLog l WHERE l.userId = :userId AND l.challenge.id = :challengeId AND DATE(l.completedDate) = CURRENT_DATE AND l.completed = true")
    Optional<UserChallengeLog> findCompletedToday(@Param("userId") Long userId, @Param("challengeId") Long challengeId);

    // Query to find the challenge log for TODAY for a given user (regardless of completion status)
    @Query(value = "SELECT l FROM UserChallengeLog l WHERE l.userId = :userId AND DATE(l.completedDate) = CURRENT_DATE")
    Optional<UserChallengeLog> findTodaysChallengeLog(@Param("userId") Long userId);
}
