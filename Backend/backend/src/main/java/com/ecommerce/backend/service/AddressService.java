package com.ecommerce.backend.service;



import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.ecommerce.backend.Repository.AddressRepository;
import com.ecommerce.backend.entity.Address;
import com.ecommerce.backend.entity.User;

@Service
public class AddressService {

	@Autowired
	AddressRepository addressRepository;

	public void createAddress(Address address, User user) {
		 
		Address address2 = new Address();
		
		address2.setUser(user);
		address2.setAddressLine1(address.getAddressLine1());
		address2.setCity(address.getCity());
		address2.setState(address.getState());
		address2.setPincode(address.getPincode());
		addressRepository.save(address2);
			
	}
}
