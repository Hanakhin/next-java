package com.backend.backend.Controllers;

import com.backend.backend.DTO.PanierRequestDTO;
import com.backend.backend.DTO.ArticleRequestDTO;
import com.backend.backend.Models.Panier;
import com.backend.backend.Services.PanierService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/paniers")
public class PanierController {

    private final PanierService panierService;

    public PanierController(PanierService panierService) {
        this.panierService = panierService;
    }

    @GetMapping
    public ResponseEntity<List<Panier>> getAllPaniers() {
        List<Panier> paniers = panierService.getAllPaniers();
        return new ResponseEntity<>(paniers, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<Panier> getPanierByUserId(@PathVariable UUID id) {
        Panier panier = panierService.getPanierByUserId(id);
        return new ResponseEntity<>(panier, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Panier> createPanier(@RequestBody PanierRequestDTO request) {
        Panier newPanier = panierService.createPanier(request.getUserId());
        return new ResponseEntity<>(newPanier, HttpStatus.CREATED);
    }

    @PostMapping("/{panierId}/add")
    public ResponseEntity<Void> addArticleToPanier(
            @PathVariable UUID panierId,
            @RequestBody ArticleRequestDTO request) {
        panierService.addArticleToPanier(panierId, request.getArticleId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{panierId}")
    public ResponseEntity<Void> deletePanier(@PathVariable UUID panierId) {
        panierService.deletePanier(panierId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
    }

    @DeleteMapping("/{panierId}/articles/{articleId}")
    public ResponseEntity<Void> removeArticleFromPanier(
            @PathVariable UUID panierId,
            @PathVariable UUID articleId) {
        panierService.removeArticleFromPanier(panierId, articleId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
    }

    @DeleteMapping("/{panierId}/clear")
    public ResponseEntity<Void> clearPanier(@PathVariable UUID panierId) {
        panierService.clearPanier(panierId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
    }
}