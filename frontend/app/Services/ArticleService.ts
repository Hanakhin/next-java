import axios from 'axios';
import {articleType} from "@/app/Types/ArticleType";


const API_URL = 'http://localhost:8080/api/articles';

class ArticleService {
    // Méthode pour récupérer tous les utilisateurs
    static async getAllArticles() {
        try {
            return await axios.get(API_URL);
        } catch (error) {
            console.error("Erreur lors de la récupération des articles:", error);
            throw error;
        }
    }

    // Méthode pour créer un nouvel utilisateur
    static async createArticle(article:typeof articleType) {
        try {
            const response = await axios.post(API_URL, article);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur:", error);
            throw error;
        }
    }
}

export default ArticleService; // Exportez directement l'instance de UserService