"use client"

import {Section} from "@/app/_Components/Section";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import ArticleService from "@/app/Services/ArticleService";

export const ManageArticles=()=>{
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getArticles();
    }, []);

    const getArticles = async () => {
        setLoading(true);
        try {
            const res = await ArticleService.getAllArticles();
            setArticles(res.data);
        } catch (error) {
            console.log(error);
            setError("Erreur lors de la récupération des articles.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (articleId:string) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
            try {
                await ArticleService.deleteArticle(articleId);
                setArticles(articles.filter(article => article.id !== articleId));
            } catch (error) {
                console.log(error);
                setError("Erreur lors de la suppression de l'utilisateur.");
            }
        }
    };

    return(
        <Section>
            <Table>
                <TableCaption>Liste des articles</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Label</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead>disponible</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead className="text-right">Categorie</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {articles.map((article=>(
                        <TableRow key={article.id}>
                            <TableCell className={"font-medium"}>{article.label}</TableCell>
                            <TableCell>{article.description}</TableCell>
                            <TableCell>{article.price}€</TableCell>
                            <TableCell className={`${article.available? 'text-green-500' : 'text-red-500'}`}>{article.available ? "oui" : "non"}</TableCell>
                            <TableCell  className="text-right">{article.stock}</TableCell>
                            <TableCell  className="text-right">{article.category}</TableCell>
                            <TableCell  className="text-right">
                                <Button variant={'outline'} className={"hover:text-green-500 mr-3 border-primary hover:bg-primary-white"}>Modifier</Button>
                                <Button variant={'outline'} className={"hover:text-red-500 border-primary hover:bg-primary-white"} onClick={()=>handleDelete(article.id)}>Supprimer</Button>
                            </TableCell>
                        </TableRow>
                    )))}
                </TableBody>
            </Table>
        </Section>
    )
}