package com.backend.backend.Repositories;

import com.backend.backend.Models.Panier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PanierRepository extends JpaRepository<Panier, UUID> {
    Panier findByOwnerId(UUID id);
}
