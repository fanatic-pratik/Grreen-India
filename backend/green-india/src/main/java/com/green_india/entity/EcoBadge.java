package com.green_india.entity;

public enum EcoBadge {
    SEEDLING(0),        // 0+
    SAPLING(200),       // 200+
    GREEN_WARRIOR(500), // 500+
    ECO_CHAMPION(1000); // 1000+

    private final int minPoints;

    EcoBadge(int minPoints){
        this.minPoints = minPoints;
    }

    public static EcoBadge fromPoints(int points){
        EcoBadge current = SEEDLING;
        for(EcoBadge badge: values()){
            if(points >= badge.minPoints){
                current = badge;
            }
        }

        return current;
    }

}
