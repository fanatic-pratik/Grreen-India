package com.green_india.entity;



import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String passwordHash;

    @Column(columnDefinition = "json")
    private String prefs;

    private LocalDateTime createdAt = LocalDateTime.now();

    private int totalPoints;

    private int ecoLevel;

    @Enumerated(EnumType.STRING)
    private EcoBadge badge;


    // getters / setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public String getPrefs() { return prefs; }
    public void setPrefs(String prefs) { this.prefs = prefs; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public int getTotalPoints() {return totalPoints; }
    public void setTotalPoints(int totalPoints){ this.totalPoints = totalPoints; }

    public int getEcoLevel(){return ecoLevel; }
    public void setEcoLevel(int ecoLevel){ this.ecoLevel = ecoLevel; }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public EcoBadge getBadge() { return badge;}
    public void setBadge(EcoBadge badge) { this.badge = badge;}
}
