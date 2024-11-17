package com.backend.backend.Controllers;

import com.backend.backend.Exceptions.UserNotFoundException;
import com.backend.backend.Models.Concours;
import com.backend.backend.Models.User;
import com.backend.backend.Services.ConcoursService;
import com.backend.backend.Services.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
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
    public ResponseEntity<?> deleteEvent(@PathVariable UUID id) {
        try {
            concoursService.deleteEvent(id); // Suppression par ID
            return new ResponseEntity<>("event successfully deleted", HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>("event not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{concoursId}/participate")
    public ResponseEntity<Void> participateToConcours(
            @PathVariable UUID concoursId,
            Authentication authentication) {
        // Récupérer le pseudo de l'utilisateur connecté
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String pseudo = userDetails.getUsername(); // Récupérer le pseudo

        try {
            // Récupérer l'utilisateur par son pseudo
            Optional<User> user = userService.getUserByPseudo(pseudo); // Utilisez votre méthode pour obtenir l'utilisateur

            // Participer au concours avec l'ID de l'utilisateur
            concoursService.participateToConcours(concoursId, user.get().getId());
            return new ResponseEntity<>(HttpStatus.OK); // 200 OK
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found si le concours n'existe pas
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT); // 409 Conflict si l'utilisateur est déjà participant
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found si l'utilisateur n'existe pas
        }
    }
}
