package com.bankingsystem.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
public class Beneficiary {
    @Id @GeneratedValue
    private Long id;

    private String name;
    private String accountNumber;
}