import axios from 'axios';
import {concourType} from "@/app/Types/ConcourType";

const API_URL = 'http://localhost:8080/api/events';

class ConcourService {
    static async getAllConcours() {
        try {
            return await axios.get(API_URL);
        } catch (error) {
            console.error("Erreur lors de la récupération des concours:", error);
            throw error;
        }
    }

    static async createConcour(concour: typeof concourType) {
        try {
            const response = await axios.post(`${API_URL}/add`, concour);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la création du concours:", error);
            throw error;
        }
    }

    static async participateToConcours(concoursId: string) {
        try {
            const response = await axios.post(`${API_URL}/${concoursId}/participate`);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de l'inscription au concours:", error);
            throw error;
        }
    }

    static async deleteConcours(concoursId : string){
        try{
            const response = await axios.delete(`${API_URL}/delete/${concoursId}`)
            return response.data;
        }catch(error){
            console.error("erreur lors de la suppression du concours", error);
            throw error
        }
    }
}

export default ConcourService;