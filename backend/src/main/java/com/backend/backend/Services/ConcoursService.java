package com.backend.backend.Services;

import com.backend.backend.Exceptions.ArticleNotFoundException;
import com.backend.backend.Exceptions.UserNotFoundException;
import com.backend.backend.Models.Article;
import com.backend.backend.Models.Concours;
import com.backend.backend.Models.User;
import com.backend.backend.Repositories.ConcoursRepository;
import com.backend.backend.Repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ConcoursService {
    
    private final ConcoursRepository concoursRepository;
    private final UserRepository userRepository;

    @Autowired
    public ConcoursService(ConcoursRepository concoursRepository, UserRepository userRepository) {
        this.concoursRepository = concoursRepository;
        this.userRepository = userRepository;
    }

    public List<Concours> getAllConcours() {
        return concoursRepository.findAll();
    }

    public Concours createConcour(Concours concour) {
        concour.setId(UUID.randomUUID());
        return concoursRepository.save(concour);
    }

    public void addParticipant(UUID concoursId, UUID userId) {
        Concours concours = concoursRepository.findById(concoursId)
                .orElseThrow(() -> new EntityNotFoundException("Concours not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        concours.getParticipants().add(user);
        concoursRepository.save(concours);
    }

    public void deleteEvent(UUID id) throws ArticleNotFoundException {
        Concours concours = concoursRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        concoursRepository.delete(concours);
    }
}
