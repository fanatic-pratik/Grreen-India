package com.green_india.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

// ADD IMPORTS FOR SPRING SECURITY
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;


@Entity
@Table(name = "users")
// IMPLEMENT THE USERDETAILS INTERFACE
public class User implements UserDetails {
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

    // Default role for Spring Security
    private String role = "USER";


    // --- UserDetails Interface Implementation ---

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Simple fixed role for the application's base user
        //return List.of(() -> role);
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        return email; // Use email as the identifier for Spring Security
    }

    @Override
    public String getPassword() {
        return passwordHash; // Returns the hashed password for comparison
    }

    // Standard flags for active users
    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }


    // --- Existing Getters / Setters ---
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

    // New getter/setter for the role field
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}