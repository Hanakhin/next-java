package com.backend.backend.Controllers;

import com.backend.backend.Exceptions.UserNotFoundException;
import com.backend.backend.Models.Concours;
import com.backend.backend.Models.User;
import com.backend.backend.Services.ConcoursService;
import com.backend.backend.Services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/events")
public class ConcoursController {

    public final ConcoursService concoursService;
    public final UserService userService;

    public ConcoursController(ConcoursService concoursService, UserService userService) {
        this.concoursService = concoursService;
        this.userService = userService;
    }
    @GetMapping
    public ResponseEntity<List<Concours>> getAllConcours() {
        List<Concours> concours = concoursService.getAllConcours();
        return new ResponseEntity<>(concours, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Concours> createConcours(@RequestBody Concours concour) {
        Concours newconcour = concoursService.createConcour(concour);
        return new ResponseEntity<>(newconcour, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable UUID id) {
        try {
            concoursService.deleteEvent(id); // Suppression par ID
            return new ResponseEntity<>("event successfully deleted", HttpStatus.OK); // Retourne un message de confirmation
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>("event not found", HttpStatus.NOT_FOUND); // Utilisateur non trouvé
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR); // Erreur interne
        }
    }
}
