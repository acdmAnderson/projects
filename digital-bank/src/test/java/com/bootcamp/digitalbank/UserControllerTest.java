package com.bootcamp.digitalbank;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.hamcrest.Matchers.hasSize;

import java.time.LocalDate;
import java.util.List;

import com.bootcamp.digitalbank.DAO.entities.*;
import com.bootcamp.digitalbank.services.UserService;
import com.bootcamp.digitalbank.util.UserMock;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@WebMvcTest
@ExtendWith(SpringExtension.class)
public class UserControllerTest {

        @Autowired
        MockMvc mvc;

        @MockBean
        private UserService userService;

        private List<User> users;

        private final String USERS_ENDPOINT = "/users";

        private String parseToJSONStringfy(User user) throws JsonProcessingException {
                ObjectMapper objectMapper = new ObjectMapper();
                return objectMapper.writeValueAsString(user);
        }

        @AfterEach
        void tearDown() {
                userService.deleteAll();
        }

        @BeforeEach
        void setUsers(){
             this.users = UserMock.getMockedUsers();   
        }

        @Test
        void getAllUsers() throws Exception {                
                when(userService.findAll()).thenReturn(this.users);
                mvc.perform(MockMvcRequestBuilders.get(this.USERS_ENDPOINT).contentType(MediaType.APPLICATION_JSON))
                                .andExpect(jsonPath("$", hasSize(2))).andDo(print());
        }

        @Test
        void successfullyCreateAUser() throws Exception {
                User user = users.get(0);
                when(userService.save(any(User.class))).thenReturn(user);
                ResultActions result = mvc.perform(MockMvcRequestBuilders.post(this.USERS_ENDPOINT)
                                .contentType(MediaType.APPLICATION_JSON).content(parseToJSONStringfy(user)));
                result.andExpect(status().isCreated()).andExpect(header().exists("location"))
                                .andExpect(jsonPath("$.name").value("Pedro"))
                                .andExpect(jsonPath("$.email").value("pedro@mail.com"))
                                .andExpect(jsonPath("$.lastName").value("Augusto"))
                                .andExpect(jsonPath("$.birthday").value("1990-03-17"))
                                .andExpect(jsonPath("$.cpf").value("122.896.250-27"));
        }

        @Test
        void unsuccessfullyCreateAUserWithoutName() throws Exception {
                User user = users.get(0).name(null);
                ResultActions result = mvc.perform(MockMvcRequestBuilders.post(this.USERS_ENDPOINT)
                                .contentType(MediaType.APPLICATION_JSON).content(parseToJSONStringfy(user)));
                result.andExpect(status().isBadRequest())
                                .andExpect(jsonPath("$.errors.name").value("Name is mandatory"));
        }

        @Test
        void unsuccessfullyCreateAUserWithoutLastname() throws Exception {
                User user = users.get(0).lastName(null);
                ResultActions result = mvc.perform(MockMvcRequestBuilders.post(this.USERS_ENDPOINT)
                                .contentType(MediaType.APPLICATION_JSON).content(parseToJSONStringfy(user)));
                result.andExpect(status().isBadRequest())
                                .andExpect(jsonPath("$.errors.lastName").value("lastName is mandatory"));
        }

        @Test
        void unsuccessfullyCreateAUserWithoutEmail() throws Exception {
                User user = users.get(0).email(null);
                ResultActions result = mvc.perform(MockMvcRequestBuilders.post(this.USERS_ENDPOINT)
                                .contentType(MediaType.APPLICATION_JSON).content(parseToJSONStringfy(user)));
                result.andExpect(status().isBadRequest())
                                .andExpect(jsonPath("$.errors.email").value("email is mandatory"));
        }

        @Test
        void unsuccessfullyCreateAUserWithEmailNotValid() throws Exception {
                User user = users.get(0).email("dasdhuahsdhiahsduahdih.com");                                
                ResultActions result = mvc.perform(MockMvcRequestBuilders.post(this.USERS_ENDPOINT)
                                .contentType(MediaType.APPLICATION_JSON).content(parseToJSONStringfy(user)));
                result.andExpect(status().isBadRequest()).andExpect(jsonPath("$.errors.email")
                                .value("'" + user.getEmail() + "'" + " it is not a valid email"));
        }

        @Test
        void unsuccessfullyCreateAUserWithoutBirthday() throws Exception {
                User user = users.get(0).birthday(null);
                ResultActions result = mvc.perform(MockMvcRequestBuilders.post(this.USERS_ENDPOINT)
                                .contentType(MediaType.APPLICATION_JSON).content(parseToJSONStringfy(user)));
                result.andExpect(status().isBadRequest()).andExpect(jsonPath("$.errors.birthday").value("Invalid Age"));
        }

        @Test
        void unsuccessfullyCreateAUserWithBirthdayNotValid() throws Exception {
                User user = users.get(0).birthday(LocalDate.now());
                ResultActions result = mvc.perform(MockMvcRequestBuilders.post(this.USERS_ENDPOINT)
                                .contentType(MediaType.APPLICATION_JSON).content(parseToJSONStringfy(user)));
                result.andExpect(status().isBadRequest()).andExpect(jsonPath("$.errors.birthday").value("Invalid Age"));
        }

        @Test
        void unsuccessfullyCreateAUserWithoutCpf() throws Exception {
                User user = users.get(0).cpf(null);
                ResultActions result = mvc.perform(MockMvcRequestBuilders.post(this.USERS_ENDPOINT)
                                .contentType(MediaType.APPLICATION_JSON).content(parseToJSONStringfy(user)));
                result.andExpect(status().isBadRequest()).andExpect(jsonPath("$.errors.cpf").value("cpf is mandatory"));
        }

        @Test
        void unsuccessfullyCreateAUserWithCpfNotValid() throws Exception {
                User user = users.get(0).cpf("abcdaefdod-55");
                ResultActions result = mvc.perform(MockMvcRequestBuilders.post(this.USERS_ENDPOINT)
                                .contentType(MediaType.APPLICATION_JSON).content(parseToJSONStringfy(user)));
                result.andExpect(status().isBadRequest()).andExpect(
                                jsonPath("$.errors.cpf").value("'" + user.getCpf() + "'" + " it is not a valid cpf"));
        }

}
