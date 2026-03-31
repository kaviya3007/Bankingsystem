package com.bankingsystem.controller;

import com.bankingsystem.dto.TransferRequest;
import com.bankingsystem.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@CrossOrigin("*")
public class TransactionController {

    private final TransactionService service;

    @PostMapping("/transfer")
    public String transfer(@RequestBody TransferRequest req) {
        return service.transfer(req);
    }
}