package com.bootcamp.digitalbank.config.validations;

import java.time.LocalDate;
import java.time.Period;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class AgeValidator implements ConstraintValidator<AgeConstraint, LocalDate> {

    private final Integer MAX_AGE = 18;

    private Integer calculateAge(LocalDate birthDate) {
        return Period.between(birthDate, LocalDate.now()).getYears();
    }

    @Override
    public void initialize(AgeConstraint ageConstraint) {
    }

    @Override
    public boolean isValid(LocalDate birthday, ConstraintValidatorContext context) {
        return birthday != null && calculateAge(birthday) >= MAX_AGE;
    }

}
