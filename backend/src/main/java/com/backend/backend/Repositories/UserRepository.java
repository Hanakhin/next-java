package com.backend.backend.Repositories;

import com.backend.backend.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);

    Optional<User> findByPseudo(String pseudo);

    List<User> findByHasPermis(Boolean HasPermis);
}