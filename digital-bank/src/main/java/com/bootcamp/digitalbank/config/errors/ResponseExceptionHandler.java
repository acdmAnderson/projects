package com.bootcamp.digitalbank.config.errors;


import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.*;
import org.springframework.validation.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice()
public class ResponseExceptionHandler extends ResponseEntityExceptionHandler {

    private final String FIELD_EXCEPTION_REGEX = "\\((.*?)\\)";

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
            HttpHeaders headers, HttpStatus status, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), errors);
        return handleExceptionInternal(ex, errorResponse, headers, errorResponse.getStatus(), request);
    }

    @ExceptionHandler({ ConstraintViolationException.class })
    public ResponseEntity<Object> handleConstraintViolation(ConstraintViolationException ex, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            errors.put(violation.getRootBeanClass().getName() + " " + violation.getPropertyPath(),
                    violation.getMessage());
        }
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), errors);
        return new ResponseEntity<Object>(errorResponse, new HttpHeaders(), errorResponse.getStatus());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Object> handleConstraintViolationExceptions(DataIntegrityViolationException ex) {
        Map<String, String> errors = new HashMap<>();
        String fullExceptionMessage = ex.getMostSpecificCause().getMessage();
        Pattern pattern = Pattern.compile(this.FIELD_EXCEPTION_REGEX);
        Matcher matcher = pattern.matcher(fullExceptionMessage);
        String fieldName = matcher.find() ? matcher.group().substring(1, matcher.group().length() - 1).toLowerCase()
                : null;
        String errorMessage = fullExceptionMessage.split(":")[0];
        errors.put(fieldName, errorMessage);
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), errors);
        return new ResponseEntity<Object>(errorResponse, new HttpHeaders(), errorResponse.getStatus());
    }
}
