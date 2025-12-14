package com.green_india.controller;

import com.green_india.service.EcoPointsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/eco")
public class EcoChallengeController {

    @Autowired
    private EcoPointsService ecoPointsService;



    @PostMapping("/daily-challenge/complete")
    public ResponseEntity<?> completeChallenge(@RequestParam Integer userId){
//        ecoPointsService.awardPoints(userId, "Daily challenge" , 30);

        return ResponseEntity.ok("Challenge completed. Points awarded");
    }
}
