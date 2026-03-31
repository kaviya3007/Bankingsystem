package com.bankingsystem.service;

import com.bankingsystem.dto.*;
import com.bankingsystem.entity.*;
import com.bankingsystem.repository.UserRepository;
import com.bankingsystem.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public String register(RegisterRequest req) {
        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setRole(Role.USER);
        repo.save(user);
        return "User Registered";
    }

    public String login(LoginRequest req) {
        User user = repo.findByEmail(req.getEmail()).orElseThrow();
        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        return jwtUtil.generateToken(user.getEmail());
    }
}