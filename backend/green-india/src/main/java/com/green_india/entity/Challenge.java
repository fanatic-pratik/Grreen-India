package com.green_india.entity;

import jakarta.persistence.*;
import lombok.Data; // Use Lombok for cleaner code (assuming you have it)

@Entity
@Table(name = "challenges")
@Data // Lombok: Generates getters, setters, toString, equals, and hashCode
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title; // e.g., "Use a reusable coffee cup today."

    @Column(length = 500) // Increase length for detailed instructions
    private String description;

    private int pointsReward; // e.g., 50

    // Limits the selection of daily tasks to predefined types
    @Enumerated(EnumType.STRING)
    private ChallengeCategory category;

    // Boolean to check if it's a "Daily" challenge (as opposed to a long-term goal)
    private boolean daily;

    // You'll need no-args and all-args constructors if not using Lombok
}
