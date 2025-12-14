package com.green_india.service;

import com.green_india.entity.EcoBadge;
import com.green_india.entity.EcoPointTransaction;
import com.green_india.entity.User;
import com.green_india.repository.EcoPointTransactionRepository;
import com.green_india.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime; // <-- ADD THIS IMPORT

@Service
public class EcoPointsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EcoPointTransactionRepository transcationRepository;

    public void awardPoints(Integer userId, String actionType, int points){
        User user = userRepository.findById(userId).orElseThrow(() ->  new RuntimeException("User not found"));

        if(actionType.equals("Daily Challenge")){

            // 1. Calculate start and end of the current day
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime startOfDay = now.with(LocalTime.MIN); // 00:00:00
            LocalDateTime endOfDay = now.with(LocalTime.MAX);   // 23:59:59.999...

            // 2. Call the repository method with the required 4 arguments
            boolean alreadyOne = transcationRepository.
                    existsByUserIdAndActionTypeAndCreatedAtBetween(
                            userId,
                            actionType,
                            startOfDay, // Start Time (Required for BETWEEN)
                            endOfDay    // End Time (Required for BETWEEN)
                    );

            if(alreadyOne) return;
        }

        // ... (Rest of the logic remains the same) ...
        user.setTotalPoints(user.getTotalPoints() + points);

        EcoBadge newBadge = EcoBadge.fromPoints(user.getTotalPoints());
        user.setBadge(newBadge);

        userRepository.save(user);

        EcoPointTransaction txn = new EcoPointTransaction();
        txn.setUser(user);
        txn.setActionType(actionType);
        txn.setPoints(points);
        txn.setCreatedAt(LocalDateTime.now());

        transcationRepository.save(txn);
    }
}