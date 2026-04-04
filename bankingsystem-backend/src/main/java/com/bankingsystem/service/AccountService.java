package com.bankingsystem.service;

import com.bankingsystem.entity.Account;
import com.bankingsystem.repository.AccountRepository;
import com.bankingsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository repo;
    private final UserRepository userRepo;

    public Account create(Account acc, String email) {
        acc.setUser(userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found")));
        return repo.save(acc);
    }

    public Double getBalance(String accNo) {
        return repo.findByAccountNumber(accNo).orElseThrow(() -> new RuntimeException("Account not found")).getBalance();
    }

    public Account getAccountByEmail(String email) {
        return repo.findByUserEmail(email).orElse(null);
    }
}