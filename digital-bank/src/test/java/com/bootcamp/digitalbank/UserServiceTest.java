package com.bootcamp.digitalbank;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.List;

import com.bootcamp.digitalbank.DAO.entities.User;
import com.bootcamp.digitalbank.DAO.repository.UserRepository;
import com.bootcamp.digitalbank.services.UserService;
import com.bootcamp.digitalbank.util.UserMock;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserRepository userRepository;

    private List<User> users;

    @BeforeEach
    void setUsers(){
        this.users = UserMock.getMockedUsers();
    }

    @AfterEach
    void tearDown() {
        userRepository.deleteAll();
    }

    @Test
    void getAllUsers() {
        User user = this.users.get(0);
        userRepository.save(user);
        UserService userService = new UserService(userRepository);
        List<User> userList = userService.findAll();
        User lastUser = userList.get(0);
        assertEquals(user.getId(), lastUser.getId());
        assertEquals(user.getName(), lastUser.getName());
        assertEquals(user.getLastName(), lastUser.getLastName());
        assertEquals(user.getEmail(), lastUser.getEmail());
        assertEquals(user.getBirthday(), lastUser.getBirthday());
        assertEquals(user.getCpf(), lastUser.getCpf());
    }

    @Test
    void saveUser() {
        UserService userService = new UserService(userRepository);
        User user = this.users.get(0);
        userService.save(user);
        assertEquals(1.0, userRepository.count());
    }
}
