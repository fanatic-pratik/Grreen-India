package com.green_india.repository;

import com.green_india.entity.Challenge;
import com.green_india.entity.ChallengeCategory;
import com.green_india.entity.EcoPointTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface EcoPointTransactionRepository extends JpaRepository<EcoPointTransaction, Integer> {
    boolean existsByUserIdAndChallengeIdAndDate(
        Long userId,
        Long ChallengeId,
        LocalDateTime createdAt
    );
}
