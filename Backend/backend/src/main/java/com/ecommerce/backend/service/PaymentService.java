package com.ecommerce.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.backend.Repository.PaymentRepository;
import com.ecommerce.backend.dto.PaymentDto;
import com.ecommerce.backend.entity.Cart;
import com.ecommerce.backend.entity.Payment;
import com.ecommerce.backend.entity.User;

@Service
public class PaymentService {
	
	@Autowired
	PaymentRepository paymetRepository;

	public void doPayment(Payment payment, User user) {
		Payment payment2 = new Payment();
		payment2.setUser(user);
		payment2.setStatus(payment.isStatus());
		
		paymetRepository.save(payment2);
		
	}

}
