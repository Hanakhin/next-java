"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ConcoursService from "@/app/Services/ConcourService";

export const ConcoursForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [minDate, setMinDate] = useState('');

    const [formData, setFormData] = useState({
        label: '',
        date: '',
        description: '',
        adresse: '',
        active: true
    });

    useEffect(() => {
        // Définir la date minimale à aujourd'hui
        const today = new Date();
        const formattedDate = today.toISOString().slice(0, 16);
        setMinDate(formattedDate);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ConcoursService.createConcour(formData);
            setSuccessMessage('Concours créé avec succès !');
            // Réinitialiser le formulaire ou rediriger l'utilisateur
        } catch (error) {
            console.error(error);
            setErrorMessage('Erreur lors de la création du concours. Veuillez réessayer.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-4xl">Création d'un concours</h1>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <div>
                <label htmlFor="label">Label</label>
                <Input
                    id="label"
                    name="label"
                    placeholder="Label du concours"
                    value={formData.label}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="date">Date</label>
                <Input
                    id="date"
                    name="date"
                    type="datetime-local"
                    value={formData.date}
                    onChange={handleChange}
                    min={minDate} // Empêche la sélection de dates passées
                    required
                />
            </div>

            <div>
                <label htmlFor="description">Description</label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Description du concours"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="adresse">Adresse</label>
                <Input
                    id="adresse"
                    name="adresse"
                    placeholder="Adresse du concours"
                    value={formData.adresse}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>
                    <input
                        type="checkbox"
                        name="active"
                        checked={formData.active}
                        onChange={handleChange}
                    />
                    Actif
                </label>
            </div>

            <Button type="submit">Créer le concours</Button>
        </form>
    );
};

export default ConcoursForm;