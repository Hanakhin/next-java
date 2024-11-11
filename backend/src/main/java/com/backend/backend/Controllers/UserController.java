package com.backend.backend.Controllers;

import com.backend.backend.Exceptions.UserNotFoundException;
import com.backend.backend.Services.UserService;
import com.backend.backend.Models.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/users")
public class UserController
{
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllusers(){
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> adduser(@RequestBody User user){

        User newuser = userService.createUser(user);
        return new ResponseEntity<>(newuser, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable UUID id) {
        try {
            User deletedUser = userService.deleteUser(id); // Suppression par ID
            return new ResponseEntity<>(deletedUser, HttpStatus.OK); // Retourne l'utilisateur supprimé
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Utilisateur non trouvé
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Erreur interne
        }
    }
    
}