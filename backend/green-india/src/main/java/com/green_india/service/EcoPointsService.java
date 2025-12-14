package com.green_india.service;

import com.green_india.entity.*;
import com.green_india.repository.EcoPointTransactionRepository;
import com.green_india.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime; // <-- ADD THIS IMPORT

@Service
public class EcoPointsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EcoPointTransactionRepository transcationRepository;

    public void awardPoints(Long userId, Challenge challenge){
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);
        boolean alreadyRewarded = transcationRepository.existsByUserIdAndCategoryAndCreatedAtBetween(userId, challenge.getCategory(), startOfDay, endOfDay);
        if(alreadyRewarded) return;


        User user = userRepository.findById(userId).orElseThrow(() ->  new RuntimeException("User not found"));


        int points = challenge.getPointsReward();

        // ... (Rest of the logic remains the same) ...
        user.setTotalPoints(user.getTotalPoints() + points);
        user.setBadge(EcoBadge.fromPoints(user.getTotalPoints()));

        userRepository.save(user);


        EcoPointTransaction txn = new EcoPointTransaction();
        txn.setUser(user);
        txn.setCategory(challenge.getCategory());
        txn.setPoints(points);
        txn.setCreatedAt(LocalDateTime.now());

        transcationRepository.save(txn);
    }
}