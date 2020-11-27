package com.bootcamp.digitalbank.config.errors;

import java.util.Map;
import java.util.Objects;

import org.springframework.http.HttpStatus;

public class ErrorResponse {
    private HttpStatus status;
    private String message;
    private Map<String, String> errors;

    public ErrorResponse() {

    }

    public ErrorResponse(HttpStatus status, String message, Map<String, String> errors) {
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    public HttpStatus getStatus() {
        return this.status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, String> getErrors() {
        return this.errors;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }

    public ErrorResponse status(HttpStatus status) {
        this.status = status;
        return this;
    }

    public ErrorResponse message(String message) {
        this.message = message;
        return this;
    }

    public ErrorResponse errors(Map<String, String> errors) {
        this.errors = errors;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof ErrorResponse)) {
            return false;
        }
        ErrorResponse errorResponse = (ErrorResponse) o;
        return Objects.equals(status, errorResponse.status) && Objects.equals(message, errorResponse.message)
                && Objects.equals(errors, errorResponse.errors);
    }

    @Override
    public int hashCode() {
        return Objects.hash(status, message, errors);
    }

    @Override
    public String toString() {
        return "{" + " status='" + getStatus() + "'" + ", message='" + getMessage() + "'" + ", errors='" + getErrors()
                + "'" + "}";
    }

}
