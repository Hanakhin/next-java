import axios from 'axios';
import {userType} from "@/app/Types/UserType";


const API_URL = 'http://localhost:8080/api/users';

class UserService {
    // Méthode pour récupérer tous les utilisateurs
    static async getAllUsers() {
        try {
            return await axios.get(API_URL);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
            throw error;
        }
    }
    // Méthode pour créer un nouvel utilisateur
    static async createUser(user:typeof userType) {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", user);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur:", error);
            throw error;
        }
    }

    static async deleteUser(userId:string) {
        try {
            const response = await axios.delete(`${API_URL}/${userId}`);
            return response.data;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}

export default UserService;