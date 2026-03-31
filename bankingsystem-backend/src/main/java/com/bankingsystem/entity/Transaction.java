package com.bankingsystem.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
public class Transaction {
    @Id @GeneratedValue
    private Long id;

    private String fromAccount;
    private String toAccount;
    private Double amount;
    private String status;
}