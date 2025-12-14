package com.green_india.entity;

public enum ChallengeCategory {
    PLASTIC(30),
    WATER(20),
    ENERGY(20),
    WASTE(50),
    RECYCLE(50),
    COMMUNITY(10);

    private final int minPoints;

    ChallengeCategory(int minPoints){
        this.minPoints = minPoints;
    }
}
