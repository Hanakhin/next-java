package com.backend.backend.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "Veuillez entrer un pseudo")
    @Column(unique = true)
    private String pseudo;

    @Email(message = "L'email doit être valide")
    @NotBlank(message = "Veuillez entrer une adresse email")
    @Column(unique = true)
    private String email;

    @Size(min = 6, message = "Le mot de passe doit contenir au moins 6 caractères")
    @NotBlank(message = "Le mot de passe ne doit pas être vide")
    private String password;

    @NotBlank(message = "Veuillez spécifier un rôle")
    private String role;

    @ElementCollection
    @CollectionTable(name = "user_history", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "history_entry")
    private List<String> history;

    private boolean hasPermis;
}