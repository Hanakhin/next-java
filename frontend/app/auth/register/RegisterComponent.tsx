"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UserService from "@/app/Services/UserService";

export const RegisterComponent = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [formData, setFormData] = useState({
        pseudo: '',
        email: '',
        password: '',
        role: 'USER',
        hasPermis: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await UserService.createUser(formData);
            setSuccessMessage('Utilisateur créé avec succès !');
        } catch (error) {
            console.error(error);
            setErrorMessage('Erreur lors de la création de l’utilisateur. Veuillez réessayer.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className={'text-4xl'}>Inscription</h1>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div>
                <label htmlFor="pseudo">Pseudo</label>
                <Input
                    id="pseudo"
                    name="pseudo"
                    placeholder="Votre pseudo (entre 4 et 20 caracteres)"
                    value={formData.pseudo}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="exemple@exemple.com"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="password">Mot de passe</label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Votre mot de passe (minimum 6 caracteres)"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>

            <Button type="submit" className={'text-white'}>S&#39;inscrire</Button>
        </form>
    );
};

export default RegisterComponent;