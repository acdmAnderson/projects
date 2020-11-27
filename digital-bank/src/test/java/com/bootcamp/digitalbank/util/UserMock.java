package com.bootcamp.digitalbank.util;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.bootcamp.digitalbank.DAO.entities.User;

public class UserMock {

    public static List<User> getMockedUsers() {
        List<User> users = new ArrayList<>();
        users.add(new User("Pedro", "Augusto", "pedro@mail.com", LocalDate.of(1990, 3, 17), "122.896.250-27"));
        users.add(new User("Maria", "Lucia Mota", "maria@mail.com", LocalDate.of(1978, 8, 4), "648.721.650-04"));
        return users;
    }
}
