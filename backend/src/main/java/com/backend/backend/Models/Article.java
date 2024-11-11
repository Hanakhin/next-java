package com.backend.backend.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "L'article doit avoir un label")
    @Column(nullable = false)
    private String label;

    @NotNull(message = "L'article doit avoir un prix")
    @Positive(message = "Le prix doit être positif")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @NotNull(message = "L'article doit avoir une quantité en stock")
    @Positive(message = "Le stock doit être positif")
    @Column(nullable = false)
    private Integer stock;

    @Column(nullable = false)
    private Boolean available = true;

    @NotBlank(message = "L'article doit avoir une catégorie")
    @Column(nullable = false)
    private String category;

    @Column(length = 1000)
    private String imageUrl;

    @Column(length = 1000)
    private String description;

}