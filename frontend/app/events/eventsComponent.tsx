"use client"

import React, { useEffect, useState, useMemo } from "react";
import ConcoursService from "@/app/Services/ConcourService";
import { Select } from "flowbite-react";

// Composant de carte pour chaque concours
const ConcoursCard = ({ concours, onParticipate }) => (
    <div className="border rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-bold mb-2">{concours.label}</h2>
        <p className="mb-2">Date: {new Date(concours.date).toLocaleDateString()}</p>
        <p className="mb-2">Adresse: {concours.adresse}</p>
        <p className="mb-2">Statut: {concours.active ? "Actif" : "Inactif"}</p>
        <p className="mb-4">{concours.description}</p>
        <button
            onClick={onParticipate}
            className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600`}
            disabled={!concours.active || new Date(concours.date) <= new Date()}
        >
            Participer
        </button>
    </div>
);

// Hook personnalisé pour la pagination
const usePagination = (items, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(items.length / itemsPerPage);

    const currentItems = useMemo(() => {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return items.slice(begin, end);
    }, [items, currentPage, itemsPerPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return { currentItems, currentPage, maxPage, handlePageChange };
};

// Composant principal
export function ConcoursFetcher() {
    const [concours, setConcours] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [dateFilter, setDateFilter] = useState("all");
    const [activeFilter, setActiveFilter] = useState("all");

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

    const filteredConcours = useMemo(() => {
        let result = [...concours];

        if (dateFilter === "future") {
            result = result.filter(concours => new Date(concours.date) > new Date());
        } else if (dateFilter === "past") {
            result = result.filter(concours => new Date(concours.date) <= new Date());
        }

        if (activeFilter === "active") {
            result = result.filter(concours => concours.active);
        } else if (activeFilter === "inactive") {
            result = result.filter(concours => !concours.active);
        }

        return result;
    }, [concours, dateFilter, activeFilter]);

    const { currentItems, currentPage, maxPage, handlePageChange } = usePagination(filteredConcours, 3);

    const handleParticipate = async (concoursId) => {
        try {
            await ConcoursService.participateToConcours(concoursId);
            alert("Votre participation a été enregistrée !");
            // Recharger les concours pour mettre à jour l'état
            getConcours();
        } catch (error) {
            console.log(error);
            setError("Erreur lors de l'inscription au concours. Veuillez réessayer.");
        }
    };

    return (
        <section className="container mx-auto px-4">
            <div className="flex justify-between mb-4">
                <Select onChange={(e) => setDateFilter(e.target.value)}>
                    <option value="all">Toutes les dates</option>
                    <option value="future">Concours à venir</option>
                    <option value="past">Concours passés</option>
                </Select>
                <Select onChange={(e) => setActiveFilter(e.target.value)}>
                    <option value="all">Tous les statuts</option>
                    <option value="active">Actifs</option>
                    <option value="inactive">Inactifs</option>
                </Select>
            </div>

            {loading && <p className="text-center py-4">Chargement des concours...</p>}
            {error && <p className="text-center py-4 text-red-500">{error}</p>}
            {!loading && !error && currentItems.length === 0 && (
                <p className="text-center py-4">Aucun concours trouvé.</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map(concours => (
                    <ConcoursCard
                        key={concours.id}
                        concours={concours}
                        onParticipate={() => handleParticipate(concours.id)}
                    />
                ))}
            </div>

            {maxPage > 1 && (
                <div className="flex justify-center mt-4">
                    {Array.from({ length: maxPage }, (_, i) => i + 1).map(page => (
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