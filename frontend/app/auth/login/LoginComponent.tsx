'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const SignInComponent = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password,
        });

        if (result.error) {
            setErrorMessage('Erreur lors de la connexion. Vérifiez vos identifiants.');
            setSuccessMessage('');
        } else {
            setSuccessMessage('Connexion réussie!');
            setErrorMessage('');
            router.push('/'); // Redirige vers la page d'accueil ou tableau de bord
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-4xl">Se connecter</h1>

            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <div>
                <label htmlFor="email">Email</label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="exemple@exemple.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="password">Mot de passe</label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Votre mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <Button type="submit" className="text-white">Se connecter</Button>
        </form>
    );
};

export default SignInComponent;
