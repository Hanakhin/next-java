package com.backend.backend.Exceptions;

public class ArticleOutOfStockException extends RuntimeException {
    public ArticleOutOfStockException(String message) {
        super(message);
    }
}
