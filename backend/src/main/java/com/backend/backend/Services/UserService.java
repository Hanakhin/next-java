package com.backend.backend.Services;

import com.backend.backend.Exceptions.UserNotFoundException;
import com.backend.backend.Models.User;
import com.backend.backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        // Vérifiez si l'utilisateur existe déjà
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }

        // Hachage du mot de passe
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setId(UUID.randomUUID());
        return userRepository.save(user);
    }

    public User authenticateUser(String pseudo, String password) {
        Optional<User> userOptional = userRepository.findByPseudo(pseudo);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
        }
        return null;
    }


    public void deleteUser(UUID id) throws UserNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        userRepository.delete(user);
        // Ne pas retourner l'utilisateur supprimé
    }

    public List<User> getUsersWithPermis(Boolean hasPermis) {
        List<User> users = userRepository.findByHasPermis(hasPermis);
        return users;
    }

    public User getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public Optional<User> getUserByPseudo(String pseudo) {
        return userRepository.findByPseudo(pseudo);
    }
}