"use client"

import { useEffect, useState } from "react";
import ConcoursService from "@/app/Services/ConcourService";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";

export function EventFecther() {
    const [concours, setConcours] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getConcours();
    }, []);

    const getConcours = async () => {
        setLoading(true);
        try {
            const res = await ConcoursService.getAllConcours();
            setConcours(res.data);
        } catch (error) {
            console.log(error);
            setError("Erreur lors de la récupération des concours.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (concoursId: string) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce concours ?")) {
            try {
                await ConcoursService.deleteConcours(concoursId);
                // Mettre à jour la liste des concours après suppression
                setConcours(concours.filter(concours => concours.id !== concoursId));
            } catch (error) {
                console.log(error);
                setError("Erreur lors de la suppression du concours.");
            }
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    return (
        <section>
            <Table>
                <TableCaption>Liste des concours</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Label</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Adresse</TableHead>
                        <TableHead>Actif</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {concours.map((concours => (
                        <TableRow key={concours.id}>
                            <TableCell className={"font-medium"}>{concours.label}</TableCell>
                            <TableCell>{formatDate(concours.date)}</TableCell>
                            <TableCell>{concours.adresse}</TableCell>
                            <TableCell>{concours.active ? "Oui" : "Non"}</TableCell>
                            <TableCell className="text-right">
                                <Button variant={'outline'} className={"hover:text-green-500 mr-3 border-primary hover:bg-primary-white"}>Modifier</Button>
                                <Button variant={'outline'} className={"hover:text-red-500 border-primary hover:bg-primary-white"} onClick={() => handleDelete(concours.id)}>Supprimer</Button>
                            </TableCell>
                        </TableRow>
                    )))}
                </TableBody>
            </Table>
        </section>
    );
}