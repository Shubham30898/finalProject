package com.ecommerce.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.backend.entity.Payment;

@Repository
public interface PaymentRepository extends  JpaRepository<Payment, Integer> {

}
