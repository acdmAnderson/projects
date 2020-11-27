package com.bootcamp.digitalbank.services;

import java.util.List;

import com.bootcamp.digitalbank.DAO.entities.*;
import com.bootcamp.digitalbank.DAO.repository.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class UserService {

	private UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public List<User> findAll() {
		return userRepository.findAll();
	}

	public User save(User user) {
		return userRepository.save(user);
	}

	public void deleteAll(){
		userRepository.deleteAll();
	}
    
}
