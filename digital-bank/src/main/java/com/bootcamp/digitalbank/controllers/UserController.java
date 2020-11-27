package com.bootcamp.digitalbank.controllers;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import com.bootcamp.digitalbank.DAO.entities.User;
import com.bootcamp.digitalbank.config.errors.ErrorResponse;
import com.bootcamp.digitalbank.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;    

    @ApiResponses(value = {        
        @ApiResponse(code = 200, message = "Ok", response = User.class),  
        @ApiResponse(code = 500, message = "Internal Server Error", response = ErrorResponse.class)
    })
    @GetMapping()
    ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }

    @ApiResponses(value = {        
        @ApiResponse(code = 201, message = "Created", response = User.class),  
        @ApiResponse(code = 400, message = "Bad Request", response = ErrorResponse.class),        
    })
    @PostMapping()
    ResponseEntity<User> create(@Valid @RequestBody User user) {
        User newUser = userService.save(user);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/address/{id}")
                .buildAndExpand(newUser.getId()).toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Location", location.getPath());
        return new ResponseEntity<>(newUser, headers, HttpStatus.CREATED);
    }
}
