package com.backend.backend.Exceptions;

public class ArticleNotFoundException extends RuntimeException {
    public ArticleNotFoundException(String message) {
        super(message);
    }
}