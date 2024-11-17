"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import ArticleService from "@/app/Services/ArticleService"; // Assurez-vous que ce service existe

export const ArticleForm = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [formData, setFormData] = useState({
        label: '',
        price: '',
        stock: '',
        available: true,
        category: '',
        imageUrl: '',
        description:'',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSelectChange = (value) => {
        setFormData(prevState => ({
            ...prevState,
            category: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ArticleService.createArticle(formData);
            setSuccessMessage('Article créé avec succès !');
        } catch (error) {
            console.error(error);
            setErrorMessage('Erreur lors de la création de l’article. Veuillez réessayer.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className={"text-4xl"}>Ajout d&#39;article</h1>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div>
                <label htmlFor="label">Label</label>
                <Input
                    id="label"
                    name="label"
                    placeholder="Label de l'article"
                    value={formData.label}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="description">description</label>
                <Input
                    id="description"
                    name="description"
                    placeholder="description de l'article"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="price">Prix</label>
                <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="Prix de l'article"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="stock">Stock</label>
                <Input
                    id="stock"
                    name="stock"
                    type="number"
                    placeholder="Quantité en stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="category">Catégorie</label>
                <Select onValueChange={handleSelectChange} required>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionnez une catégorie"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="canne">Canne à pêche</SelectItem>
                        <SelectItem value="appat">Appât</SelectItem>
                        <SelectItem value="casquette">Casquette</SelectItem>
                        <SelectItem value="chaise">Chaise de pêche</SelectItem>
                        <SelectItem value="moulinet">Moulinet</SelectItem>
                        <SelectItem value="fil">Fil de pêche</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label htmlFor="imageUrl">URL de l'image</label>
                <Input
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="URL de l'image de l'article"
                    value={formData.imageUrl}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>
                    <input
                        type="checkbox"
                        name="available"
                        checked={formData.available}
                        onChange={(e) => setFormData(prev => ({...prev, available: e.target.checked}))}
                    />
                    Disponible
                </label>
            </div>

            <Button type="submit">Ajouter l'article</Button>
        </form>
    );
};

export default ArticleForm;