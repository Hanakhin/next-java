"use client";

import { Card } from "flowbite-react";
import {useSession} from "next-auth/react";

interface Article {
    id: string;
    label: string;
    description: string;
    available: boolean;
    category: string;
    price: number;
}

interface ArticleCardProps {
    article: Article;
    onAddToCart: () => Promise<void>;
}

export function ArticleCard({ article, onAddToCart }: ArticleCardProps) {

    const {data:session} = useSession()

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            if(session){

                if(article.available ){
                    await onAddToCart();
                    window.alert('article' + " " + article.label + " " +  'ajouté au panier !')
                }else{
                    window.alert("l'article est indisponible...")
                }

            }else{
                window.alert('vous devez vous connecter pour ajouter cet article au panier')
            }

        } catch (error) {
            console.error("Erreur lors de l'ajout au panier:", error);
        }
    };

    return (
        <Card
            className="max-w-sm p-2"
            imgAlt={article.label}
            imgSrc={`/image/articles/default-${article.category}.jpg`}
        >
            <h5 className="text-xl font-semibold tracking-tight text-primary">
                {article.label}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {article.description}
            </p>
            <div className="mb-5 mt-2.5 flex items-center">
        <span
            className={`ml-3 mr-2 rounded px-2.5 py-0.5 text-xs font-semibold ${
                article.available
                    ? 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900'
                    : 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900'
            }`}
        >
          {article.available ? 'Disponible' : 'Indisponible'}
        </span>
                <span className="ml-3 mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
          {article.category}
        </span>
            </div>
            <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          {article.price.toFixed(2)} €
        </span>
                <a
                    href="#"
                    onClick={handleAddToCart}
                    className="rounded-lg bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-600"
                >
                    Ajouter au panier
                </a>
            </div>
        </Card>
    );
}