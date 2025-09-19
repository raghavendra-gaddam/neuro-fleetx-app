package com.example.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        System.out.println("Received registration request: " + (user != null ? user : "null"));
        try {
            User savedUser = userRepository.save(user);
            System.out.println("User registered successfully: " + savedUser);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            System.out.println("Registration failed: " + e.getMessage());
            return ResponseEntity.status(500).body("Server error: " + e.getMessage());
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity<User> getUser(@PathVariable String email) {
        System.out.println("Fetching user: " + email);
        User user = userRepository.findByEmail(email);
        if (user != null){
            System.out.println("Found user: " + user);
                    return ResponseEntity.ok(user);
        }
        else{
            System.out.println("Found user: " + user);
            return ResponseEntity.ok(user);
        }
    }



    @GetMapping("/all")
    public List<User> getAllUsers() {
        System.out.println("hello from users");
        List<User> users = userRepository.findAll();
        System.out.println("Returning all users: " + users);
        return users;
    }
}