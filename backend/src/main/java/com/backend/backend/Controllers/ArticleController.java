package com.backend.backend.Controllers;


import com.backend.backend.Exceptions.UserNotFoundException;
import com.backend.backend.Models.Article;
import com.backend.backend.Services.ArticleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public ResponseEntity<List<Article>> getAllArticles() {
        List<Article> articles = articleService.getAllArticles();
        return new ResponseEntity<>(articles, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Article> createArticle(@RequestBody Article article) {
        Article newArticle = articleService.createArticle(article);
        return new ResponseEntity<>(newArticle, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable UUID id) {
        try {
            articleService.deleteArticle(id); // Suppression par ID
            return new ResponseEntity<>("Article successfully deleted", HttpStatus.OK); // Retourne un message de confirmation
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>("Article not found", HttpStatus.NOT_FOUND); // Utilisateur non trouvé
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR); // Erreur interne
        }
    }

}
