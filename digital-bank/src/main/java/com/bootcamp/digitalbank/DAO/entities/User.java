package com.bootcamp.digitalbank.DAO.entities;

import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.bootcamp.digitalbank.config.validations.AgeConstraint;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;

import org.hibernate.validator.constraints.br.CPF;

@Entity
public class User {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank(message = "Name is mandatory")
    @NotNull(message = "Name is mandatory")
    private String name;

    @NotBlank(message = "lastName is mandatory")
    @NotNull(message = "lastName is mandatory")
    private String lastName;

    @NotBlank(message = "email is mandatory")
    @NotNull(message = "email is mandatory")
    @Email(message = "'${validatedValue}' it is not a valid email")
    @Column(unique = true)
    private String email;

    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    @AgeConstraint
    private LocalDate birthday;

    @NotBlank(message = "cpf is mandatory")
    @NotNull(message = "cpf is mandatory")
    @CPF(message = "'${validatedValue}' it is not a valid cpf")
    @Column(unique = true)
    private String cpf;

    public User() {

    }

    public User(String name, String lastName, String email, LocalDate birthday, String cpf) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.birthday = birthday;
        this.cpf = cpf;
    }

    public User(Long id, String name, String lastName, String email, LocalDate birthday, String cpf) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.birthday = birthday;
        this.cpf = cpf;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getBirthday() {
        return this.birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getCpf() {
        return this.cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public User id(Long id) {
        this.id = id;
        return this;
    }

    public User name(String name) {
        this.name = name;
        return this;
    }

    public User lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public User email(String email) {
        this.email = email;
        return this;
    }

    public User birthday(LocalDate birthday) {
        this.birthday = birthday;
        return this;
    }

    public User cpf(String cpf) {
        this.cpf = cpf;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof User)) {
            return false;
        }
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(name, user.name) && Objects.equals(lastName, user.lastName)
                && Objects.equals(email, user.email) && Objects.equals(birthday, user.birthday)
                && Objects.equals(cpf, user.cpf);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, lastName, email, birthday, cpf);
    }

    @Override
    public String toString() {
        return "{" + " id='" + getId() + "'" + ", name='" + getName() + "'" + ", lastName='" + getLastName() + "'"
                + ", birthday='" + getBirthday() + "'" + ", email='" + getEmail() + "'" + ", cpf='" + getCpf() + "'"
                + "}";
    }
}
