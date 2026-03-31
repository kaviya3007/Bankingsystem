package com.bankingsystem.service;

import com.bankingsystem.entity.Beneficiary;
import com.bankingsystem.repository.BeneficiaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final BeneficiaryRepository repo;

    public Beneficiary add(Beneficiary b) {
        return repo.save(b);
    }

    public List<Beneficiary> all() {
        return repo.findAll();
    }
}
