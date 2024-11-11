"use client"

import {useEffect,useState} from "react";
import UserService from "@/app/Services/UserService";

export function UserFetcher() {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        setLoading(true);
        try {
            const res = await UserService.getAllUsers();
            setUsers(res.data);
        } catch (error) {
            console.log(error);
            setError("Erreur lors de la récupération des utilisateurs.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <div>
                {loading && <p>Chargement des utilisateurs...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!loading && !error && users.length === 0 && <p>Aucun utilisateur trouvé.</p>}
                <ul>
                    {users.map(user => (
                        <li key={user.id} className={'text-red-500'}>
                            {user.pseudo}--{user.email}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
