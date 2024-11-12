// AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

type User = {
    id: string;
    username: string;
    pseudo: string;
    role: string;
};

type AuthContextType = {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Vérifier si l'utilisateur est déjà connecté (par exemple, en vérifiant un token dans le localStorage)
        const token = localStorage.getItem('authToken');
        if (token) {
            // Vérifier la validité du token avec le serveur
            checkAuth(token);
        } else {
            setIsLoading(false);
        }
    }, []);

    const checkAuth = async (token: string) => {
        try {
            const response = await axios.get('http://localhost:8080/api/auth/check', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
        } catch (error) {
            console.error("Erreur d'authentification:", error);
            localStorage.removeItem('authToken');
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (username: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
            const { token, user } = response.data;
            localStorage.setItem('authToken', token);
            setUser(user);
        } catch (error) {
            console.error("Erreur de connexion:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};