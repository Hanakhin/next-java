package com.backend.backend.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Future;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Concours {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "Le concours doit avoir un label")
    @Column(nullable = false)
    private String label;

    @NotNull(message = "Le concours doit avoir une date")
    @Future(message = "La date du concours doit être dans le futur")
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @NotBlank(message = "Le concours doit avoir une description")
    @Column(nullable = false, length = 1000)
    private String description;

    @NotBlank(message = "le concours doit avoir une adresse")
    @Column(nullable = false)
    private String adresse;

    @ManyToMany
    @JoinTable(
            name = "concours_user",
            joinColumns = @JoinColumn(name = "concours_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> participants;

    @Column(nullable = false)
    private boolean active = true;


}