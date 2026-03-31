package com.bankingsystem.repository;

import com.bankingsystem.entity.Beneficiary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {}
