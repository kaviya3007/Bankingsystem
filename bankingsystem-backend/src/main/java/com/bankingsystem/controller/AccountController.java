package com.bankingsystem.controller;

import com.bankingsystem.entity.Account;
import com.bankingsystem.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AccountController {

    private final AccountService service;

    @PostMapping
    public Account create(@RequestBody Account acc) {
        return service.create(acc);
    }

    @GetMapping("/{accNo}")
    public Double balance(@PathVariable String accNo) {
        return service.getBalance(accNo);
    }
}