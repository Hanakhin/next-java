package com.backend.backend.Exceptions;

import java.util.UUID;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(UUID message) {
        super(message.toString());
    }
}