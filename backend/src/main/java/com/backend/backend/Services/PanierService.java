package com.backend.backend.Services;

import com.backend.backend.Exceptions.ArticleNotFoundException;
import com.backend.backend.Exceptions.ArticleOutOfStockException;
import com.backend.backend.Exceptions.PanierNotFoundException;
import com.backend.backend.Exceptions.UserNotFoundException;
import com.backend.backend.Models.Article;
import com.backend.backend.Models.Panier;
import com.backend.backend.Models.User;
import com.backend.backend.Repositories.ArticleRepository;
import com.backend.backend.Repositories.PanierRepository;
import com.backend.backend.Repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class PanierService {

    private final PanierRepository panierRepository;

    private final ArticleRepository articleRepository;

    private final UserRepository userRepository;

    public PanierService(PanierRepository panierRepository, ArticleRepository articleRepository, UserRepository userRepository) {
        this.panierRepository = panierRepository;
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }


    public List<Panier> getAllPaniers() {
        return panierRepository.findAll();
    }

    public Panier getPanierByUserId(UUID id) {
        return panierRepository.findByOwnerId(id);
    }

    public Panier createPanier(UUID userId) {
        User owner = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        Panier panier = new Panier();
        panier.setOwner(owner);
        return panierRepository.save(panier);
    }

    @Transactional
    public void addArticleToPanier(UUID panierId, UUID articleId) {
        Panier panier = panierRepository.findById(panierId)
                .orElseThrow(() -> new PanierNotFoundException(panierId));
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new ArticleNotFoundException(articleId));

        // Vérification du stock
        if (article.getStock() <= 0) {
            throw new ArticleOutOfStockException(articleId.toString());
        }

        // Vérification des doublons et gestion de la quantité
        boolean articleExisteDansPanier = panier.getArticles().stream()
                .anyMatch(a -> a.getId().equals(articleId));

        if (articleExisteDansPanier) {
            // Logique pour incrémenter la quantité si nécessaire
            // Exemple : panier.incrementArticleQuantity(articleId);
        } else {
            panier.getArticles().add(article);
        }

        // Mise à jour du stock de l'article
        article.setStock(article.getStock() - 1);
        articleRepository.save(article);

        panierRepository.save(panier);
    }

    public void removeArticleFromPanier(UUID panierId, UUID articleId) {
        Panier panier = panierRepository.findById(panierId).orElseThrow(() -> new PanierNotFoundException(panierId));
        panier.getArticles().removeIf(article -> article.getId().equals(articleId));
        panierRepository.save(panier);
    }

    public void clearPanier(UUID panierId) {
        Panier panier = panierRepository.findById(panierId).orElseThrow(() -> new PanierNotFoundException(panierId));
        panier.getArticles().clear();
        panierRepository.deleteById(panierId);
    }
    public void deletePanier(UUID panierId) {
        if (!panierRepository.existsById(panierId)) {
            throw new PanierNotFoundException(panierId); // Lancez une exception si le panier n'existe pas
        }
        panierRepository.deleteById(panierId); // Supprimez le panier par ID
    }
}