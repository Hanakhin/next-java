"use client"

import { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Select } from "flowbite-react";
import ArticleService from "@/app/Services/ArticleService";
import { PanierService } from "@/app/Services/PanierService";
import { ArticleCard } from '../ArticleCard';
import usePagination from '@/hooks/UsePagination';

export function ArticleFetcher() {
    const { data: session } = useSession();
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [priceSort, setPriceSort] = useState("none");

    useEffect(() => {
        getArticles();
    }, []);

    const getArticles = async () => {
        setLoading(true);
        try {
            const res = await ArticleService.getAllArticles();
            setArticles(res.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des articles:", error);
            setError("Erreur lors de la récupération des articles.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (articleId: string) => {
        if (!session?.user?.id) {
            console.error("Utilisateur non connecté");
            return;
        }

        try {
            await PanierService.addToCart(session.user.id, articleId);
            console.log("Article ajouté au panier avec succès");
            // Ajouter ici une notification ou mise à jour de l'UI
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'article au panier:", error);
            // Gérer l'erreur (par exemple, afficher un message à l'utilisateur)
        }
    };

    const filteredAndSortedArticles = useMemo(() => {
        let result = [...articles];
        if (categoryFilter !== "all") {
            result = result.filter(article => article.category === categoryFilter);
        }
        if (priceSort === "asc") {
            result.sort((a, b) => a.price - b.price);
        } else if (priceSort === "desc") {
            result.sort((a, b) => b.price - a.price);
        }
        return result;
    }, [articles, categoryFilter, priceSort]);

    const { currentItems, currentPage, totalPages, handlePageChange } = usePagination({
        items: filteredAndSortedArticles,
        itemsPerPage: 3
    });

    const uniqueCategories = useMemo(() =>
            ["all", ...new Set(articles.map(article => article.category))],
        [articles]
    );

    if (loading) return <p className="text-center py-4">Chargement des articles...</p>;
    if (error) return <p className="text-center py-4 text-red-500">{error}</p>;

    return (
        <section className="container mx-auto px-4">
            <div className="flex justify-between mb-4">
                <Select onChange={(e) => setCategoryFilter(e.target.value)}>
                    {uniqueCategories.map(category => (
                        <option key={category} value={category}>
                            {category === "all" ? "Toutes les catégories" : category}
                        </option>
                    ))}
                </Select>
                <Select onChange={(e) => setPriceSort(e.target.value)}>
                    <option value="none">Tri par prix</option>
                    <option value="asc">Prix croissant</option>
                    <option value="desc">Prix décroissant</option>
                </Select>
            </div>

            {currentItems.length === 0 ? (
                <p className="text-center py-4">Aucun article trouvé.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentItems.map(article => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                            onAddToCart={() => handleAddToCart(article.id)}
                        />
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`mx-1 px-3 py-1 border rounded ${
                                currentPage === page ? 'bg-green-500 text-white' : 'bg-white'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
}