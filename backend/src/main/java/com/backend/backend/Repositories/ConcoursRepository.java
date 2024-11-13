package com.backend.backend.Repositories;

import com.backend.backend.Models.Concours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ConcoursRepository extends JpaRepository<Concours,UUID>{

}
