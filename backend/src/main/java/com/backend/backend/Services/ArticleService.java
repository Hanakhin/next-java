package com.backend.backend.Services;


import com.backend.backend.Exceptions.ArticleNotFoundException;
import com.backend.backend.Exceptions.UserNotFoundException;
import com.backend.backend.Models.Article;
import com.backend.backend.Models.User;
import com.backend.backend.Repositories.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public Article createArticle(Article article) {
        article.setId(UUID.randomUUID());

        return articleRepository.save(article);
    }

    public void deleteArticle(UUID id) throws ArticleNotFoundException {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        articleRepository.delete(article);
    }
}
