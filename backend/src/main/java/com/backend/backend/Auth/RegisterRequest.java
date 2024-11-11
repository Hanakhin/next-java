package com.backend.backend.Auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    @NotBlank(message = "Veuillez entrer un pseudo")
    private String pseudo;

    @Email(message = "L'email doit être valide")
    @NotBlank(message = "Veuillez entrer une adresse email")
    private String email;

    @Size(min = 6, message = "Le mot de passe doit contenir au moins 6 caractères")
    @NotBlank(message = "Le mot de passe ne doit pas être vide")
    private String password;

    @NotBlank(message = "Veuillez spécifier un rôle")
    private String role;

    private boolean hasPermis;

    public boolean getHasPermis() {
        return hasPermis;
    }

}