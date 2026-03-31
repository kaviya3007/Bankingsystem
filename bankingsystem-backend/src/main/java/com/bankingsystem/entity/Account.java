package com.bankingsystem.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
public class Account {
    @Id @GeneratedValue
    private Long id;

    private String accountNumber;
    private Double balance;

    @ManyToOne
    private User user;
}