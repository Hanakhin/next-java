package com.backend.backend.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.DecimalMin;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @NotNull(message = "La commande doit être associée à un utilisateur")
    private User user;

    @Positive(message = "Le nombre d'articles doit être positif")
    @Column(nullable = false)
    private int nbArticle;

    @DecimalMin(value = "0.0", inclusive = false, message = "Le prix total doit être supérieur à 0")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal prixTotal;

    @ManyToMany
    @JoinTable(
            name = "commande_article",
            joinColumns = @JoinColumn(name = "commande_id"),
            inverseJoinColumns = @JoinColumn(name = "article_id")
    )
    private List<Article> articles;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date dateCommande;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutCommande statut;

    public enum StatutCommande {
        EN_ATTENTE, VALIDEE, EXPEDIEE, LIVREE, ANNULEE
    }
}