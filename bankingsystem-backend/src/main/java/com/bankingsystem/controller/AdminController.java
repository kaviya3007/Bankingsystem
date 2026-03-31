package com.bankingsystem.controller;

import com.bankingsystem.entity.Beneficiary;
import com.bankingsystem.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdminController {

    private final AdminService service;

    @PostMapping("/beneficiary")
    public Beneficiary add(@RequestBody Beneficiary b) {
        return service.add(b);
    }

    @GetMapping("/beneficiary")
    public List<Beneficiary> all() {
        return service.all();
    }
}

