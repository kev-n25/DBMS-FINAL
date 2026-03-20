package com.jobseeker.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jobseeker.backend.model.User;
import com.jobseeker.backend.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // SIGNUP
    public String signup(String username, String email, String password) {
        // Check if username already exists
        if (userRepository.existsByUsername(username)) {
            return "Username already taken!";
        }

        // Check if email already exists
        if (userRepository.existsByEmail(email)) {
            return "Email already registered!";
        }

        // Create new user
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(password));

        // Save to database
        userRepository.save(user);
        return "Signup successful!";
    }

    // LOGIN
    public String login(String username, String password) {
        // Find user by username
        User user = userRepository.findByUsername(username)
                .orElse(null);

        // If user not found
        if (user == null) {
            return "User not found!";
        }

        // Check password
        if (passwordEncoder.matches(password, user.getPasswordHash())) {
            return "Login successful!";
        } else {
            return "Wrong password!";
        }
    }
}