package com.backend.backend.Exceptions;

import java.util.UUID;

public class PanierNotFoundException extends RuntimeException {
    public PanierNotFoundException(UUID message) {
        super(message.toString());
    }
}
