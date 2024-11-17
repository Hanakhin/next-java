package com.backend.backend.Models;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Panier {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User owner;

    @ManyToMany
    @JoinTable(
            name = "panier_article",
            joinColumns = @JoinColumn(name = "panier_id"),
            inverseJoinColumns = @JoinColumn(name = "article_id")
    )
    private List<Article> articles;

    @Column(nullable = false)
    private LocalDateTime dateCreation;

    @PrePersist
    protected void onCreate() {
        dateCreation = LocalDateTime.now();
    }
}