package com.bankingsystem.service;

import com.bankingsystem.dto.TransferRequest;
import com.bankingsystem.entity.Account;
import com.bankingsystem.entity.Transaction;
import com.bankingsystem.repository.AccountRepository;
import com.bankingsystem.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final AccountRepository accountRepo;
    private final TransactionRepository txnRepo;

    @Transactional
    public String transfer(TransferRequest req) {

        Account from = accountRepo.findByAccountNumber(req.getFromAccount()).orElseThrow();
        Account to = accountRepo.findByAccountNumber(req.getToAccount()).orElseThrow();

        if (from.getBalance() < req.getAmount()) {
            return "Insufficient balance";
        }

        from.setBalance(from.getBalance() - req.getAmount());
        to.setBalance(to.getBalance() + req.getAmount());

        accountRepo.save(from);
        accountRepo.save(to);

        Transaction txn = new Transaction();
        txn.setFromAccount(req.getFromAccount());
        txn.setToAccount(req.getToAccount());
        txn.setAmount(req.getAmount());
        txn.setStatus("SUCCESS");

        txnRepo.save(txn);

        return "Transfer Successful";
    }

    public java.util.List<Transaction> getTransactions(String accNo) {
        return txnRepo.findByFromAccountOrToAccount(accNo, accNo);
    }
}