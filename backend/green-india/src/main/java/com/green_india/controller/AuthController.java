package com.green_india.controller;

import com.green_india.dto.LoginRequest;
import com.green_india.dto.RegisterRequest;
import com.green_india.entity.User;
import com.green_india.service.AuthService;
import com.green_india.security.JwtService; // <-- CHECK IMPORT
import com.green_india.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager; // <-- CHECK IMPORT
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService; // To create the token

    @Autowired
    private AuthenticationManager authenticationManager; // To validate the credentials

    @Autowired
    private UserRepository userRepository; // To retrieve the full User object

    // ... (Your existing register endpoint remains here) ...
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        // ... (Registration logic here) ...
        try {
            User registeredUser = authService.registerUser(request);

            // OPTIONAL: Generate token immediately after registration for convenience
            String jwtToken = jwtService.generateToken(registeredUser);

            return ResponseEntity.ok(Map.of(
                    "message", "User registered successfully.",
                    "token", jwtToken
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }


    /**
     * POST /api/auth/login
     * Authenticates the user and returns a JWT token.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // 1. Authenticate the user credentials using the AuthenticationManager
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            // 2. If authentication succeeds, retrieve the UserDetails (which is your User entity)
            UserDetails userDetails = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found after successful authentication."));

            // 3. Generate the JWT token
            String jwtToken = jwtService.generateToken(userDetails);

            // 4. Return the token
            return ResponseEntity.ok(Map.of("token", jwtToken));

        } catch (Exception e) {
            // Catches authentication exceptions (e.g., BadCredentialsException, DisabledException)
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password."));
        }
    }
}