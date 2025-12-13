package com.green_india.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_challenge_logs")
@Data
public class UserChallengeLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // In a real app, this should be a ManyToOne relationship to a User Entity
    // For a quick hackathon demo, using Long is simpler.
    private Long userId;

    // Link to the specific challenge
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "challenge_id", nullable = false)
    private Challenge challenge;

    private boolean completed = false;

    @CreationTimestamp
    private LocalDateTime completedDate;

    // You'll need no-args and all-args constructors if not using Lombok
}
