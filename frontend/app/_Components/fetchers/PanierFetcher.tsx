"use client"

import { useEffect, useState } from "react";
import { PanierService } from "@/app/Services/PanierService";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export function PanierFetcher() {
    const [panier, setPanier] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const { data: session } = useSession();
    const userId = session?.user?.id;

    useEffect(() => {
        if (userId) {
            getPanier();
        }
    }, [userId]);

    const getPanier = async () => {
        setLoading(true);
        try {
            const res = await PanierService.getPanierByUserId(userId);
            setPanier(res);
        } catch (error) {
            console.log(error);
            setError("Erreur lors de la récupération du panier.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteArticle = async (articleId: string) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
            try {
                await PanierService.removeArticleFromPanier(panier.id, articleId); // Supprimer l'article du panier
                setPanier(prev => ({
                    ...prev,
                    articles: prev.articles.filter(article => article.id !== articleId),
                }));
            } catch (error) {
                console.log(error);
                setError("Erreur lors de la suppression de l'article.");
            }
        }
    };

    const handleClearPanier = async () => {
        if (confirm("Êtes-vous sûr de vouloir vider le panier ?")) {
            try {
                await PanierService.clearPanier(panier.id);
                setPanier(null);
            } catch (error) {
                console.log(error);
                setError("Erreur lors du vidage du panier.");
            }
        }
    };

    return (
        <section>
            <Table>
                <TableCaption>Mon Panier</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Propriétaire</TableHead>
                        <TableHead>Articles</TableHead>
                        <TableHead>Date de création</TableHead>
                        <TableHead>Actif</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {panier ? (
                        <TableRow key={panier.id}>
                            <TableCell className={"font-medium"}>{panier.owner.username}</TableCell>
                            <TableCell>{panier.articles.length} articles</TableCell>
                            <TableCell>{formatDate(panier.dateCreation)}</TableCell>
                            <TableCell>{panier.active ? "Oui" : "Non"}</TableCell>
                            <TableCell className="text-right">
                                <Button variant={'outline'} className={"hover:text-red-500 border-primary hover:bg-primary-white"} onClick={handleClearPanier}>Vider le panier</Button>
                                {/* Affichage des articles avec option de suppression */}
                                {panier.articles.map(article => (
                                    <div key={article.id}>
                                        {article.nom}
                                        <Button variant={'outline'} className={"hover:text-red-500 border-primary hover:bg-primary-white"} onClick={() => handleDeleteArticle(article.id)}>Supprimer</Button>
                                    </div>
                                ))}
                            </TableCell>
                        </TableRow>
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">Aucun panier trouvé.</td>
                        </tr>
                    )}
                </TableBody>
            </Table>

            {loading && <p className="text-center py-4">Chargement du panier...</p>}
            {error && <p className="text-center py-4 text-red-500">{error}</p>}
        </section>
    );
}

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
};