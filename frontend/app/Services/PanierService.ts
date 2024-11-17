import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export interface Article {
    id: string;
    nom: string;
    prix: number;
}

export interface Panier {
    id: string;
    owner: { id: string; username: string };
    articles: Article[];
    dateCreation: string;
}

export class PanierService {
    // Récupérer le panier d'un utilisateur par ID
    static async getPanierByUserId(userId: string): Promise<Panier | null> {
        try {
            const response = await axios.get(`${API_URL}/paniers/user/${userId}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return null; // Panier non trouvé
            }
            throw error;
        }
    }

    // Créer un nouveau panier pour un utilisateur
    static async createPanier(userId: string): Promise<Panier> {
        const response = await axios.post(`${API_URL}/paniers`, { userId });
        return response.data;
    }

    // Ajouter un article à un panier
    static async addArticleToPanier(panierId: string, articleId: string): Promise<void> {
        await axios.post(`${API_URL}/paniers/${panierId}/add`, { articleId });
    }

    // Supprimer un panier par ID
    static async deletePanier(panierId: string): Promise<void> {
        try {
            await axios.delete(`${API_URL}/paniers/${panierId}`);
        } catch (error) {
            console.error('Erreur lors de la suppression du panier:', error);
            throw error;
        }
    }

    // Ajouter un article au panier ou créer un nouveau panier si nécessaire
    static async addToCart(userId: string, articleId: string): Promise<void> {
        try {
            let panier = await this.getPanierByUserId(userId);
            if (!panier) {
                panier = await this.createPanier(userId);
            }
            await this.addArticleToPanier(panier.id, articleId);
        } catch (error) {
            console.error("Erreur lors de l'ajout au panier:", error);
            throw error;
        }
    }

    // Retirer un article d'un panier par ID
    static async removeArticleFromPanier(panierId: string, articleId: string): Promise<Panier> {
        try {
            const response = await axios.delete(`${API_URL}/paniers/${panierId}/articles/${articleId}`);
            return response.data; // Retourne le panier mis à jour après suppression de l'article
        } catch (error) {
            console.error('Erreur lors du retrait de l\'article du panier:', error);
            throw error;
        }
    }

    // Vider le contenu d'un panier
    static async clearPanier(panierId: string): Promise<void> {
        try {
            await axios.delete(`${API_URL}/paniers/${panierId}/clear`);
        } catch (error) {
            console.error('Erreur lors du vidage du panier:', error);
            throw error;
        }
    }

}