package com.bankingsystem.controller;

import com.bankingsystem.entity.Account;
import com.bankingsystem.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AccountController {

    private final AccountService service;

    @PostMapping
    public Account create(@RequestBody Account acc, Principal principal) {
        return service.create(acc, principal.getName());
    }

    @GetMapping("/{accNo}")
    public Double balance(@PathVariable String accNo) {
        return service.getBalance(accNo);
    }

    @GetMapping("/my-account")
    public Account myAccount(Principal principal) {
        return service.getAccountByEmail(principal.getName());
    }
}