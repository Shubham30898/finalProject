package com.ecommerce.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.Repository.CartRepository;
import com.ecommerce.backend.common.ApiResponse;
import com.ecommerce.backend.dto.AddToCartDto;
import com.ecommerce.backend.dto.PaymentDto;
import com.ecommerce.backend.entity.Cart;
import com.ecommerce.backend.entity.Payment;
import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.service.AuthenticationService;
import com.ecommerce.backend.service.PaymentService;


@RestController
@RequestMapping("/payment")
@CrossOrigin
public class PaymentController {
	
	@Autowired
	PaymentService paymentService;
	
	 @Autowired
	 AuthenticationService authenticationService;
	
    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addPayment(@RequestBody Payment payment,  @RequestParam("token") String token) {
    	User user = authenticationService.getUser(token);
    	paymentService.doPayment(payment, user);
        return new ResponseEntity<>(new ApiResponse(true, "Payment has been done"), HttpStatus.CREATED);
    }

}
