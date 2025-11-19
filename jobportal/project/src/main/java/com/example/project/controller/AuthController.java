package com.example.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.project.model.User;
import com.example.project.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // ✅ SIGNUP API
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        User existing = userRepository.findByUsername(user.getUsername());
        if (existing != null) {
            return "Username already taken";
        }

        userRepository.save(user);
        return "Signup successful";
    }

    // ✅ LOGIN API
    @PostMapping("/login")
    public String loginUser(@RequestBody User loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        User user = userRepository.findByUsername(username);

        if (user == null) {
            return "Invalid username";
        }

        if (!user.getPassword().equals(password)) {
            return "Invalid password";
        }

        return "Login successful";
    }
}

