package com.backend.backend.Exceptions;

import java.util.UUID;

public class ArticleNotFoundException extends RuntimeException {
    public ArticleNotFoundException(UUID message) {
        super(message.toString());
    }
}