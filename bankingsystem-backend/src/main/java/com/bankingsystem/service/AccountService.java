package com.bankingsystem.service;

import com.bankingsystem.entity.Account;
import com.bankingsystem.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository repo;

    public Account create(Account acc) {
        return repo.save(acc);
    }

    public Double getBalance(String accNo) {
        return repo.findByAccountNumber(accNo).orElseThrow().getBalance();
    }
}