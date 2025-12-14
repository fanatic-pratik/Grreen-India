package com.green_india.repository;

import com.green_india.entity.EcoPointTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface EcoPointTransactionRepository extends JpaRepository<EcoPointTransaction, Integer> {
    boolean existsByUserIdAndActionTypeAndCreatedAtBetween(
        Integer userId,
        String actionType,
        LocalDateTime startTime, // <-- Start of the range
        LocalDateTime endTime      // <-- End of the range
    );
}
