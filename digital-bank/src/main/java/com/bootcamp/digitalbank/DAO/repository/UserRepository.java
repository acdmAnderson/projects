package com.bootcamp.digitalbank.DAO.repository;

import com.bootcamp.digitalbank.DAO.entities.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("userRepository")
public interface UserRepository extends JpaRepository<User, Long> {
    
}
