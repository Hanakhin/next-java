"use client"

import {useEffect,useState} from "react";
import UserService from "@/app/Services/UserService";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button";


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

    const handleDelete = async (userId:string) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            try {
                await UserService.deleteUser(userId);
                // Mettre à jour la liste des utilisateurs après suppression
                setUsers(users.filter(user => user.id !== userId));
            } catch (error) {
                console.log(error);
                setError("Erreur lors de la suppression de l'utilisateur.");
            }
        }
    };

    return (
        <section>
            <Table>
                <TableCaption>Liste des utilisateurs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Pseudo</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Possede un permis</TableHead>
                        <TableHead className="text-right">Role</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user=>(
                        <TableRow key={user.id}>
                            <TableCell className={"font-medium"}>{user.pseudo}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.hasPermis ? "oui" : "non"}</TableCell>
                            <TableCell  className="text-right">{user.role}</TableCell>
                            <TableCell  className="text-right">
                                <Button variant={'outline'} className={"hover:text-green-500 mr-3 border-primary hover:bg-primary-white"}>Modifier</Button>
                                <Button variant={'outline'} className={"hover:text-red-500 border-primary hover:bg-primary-white"} onClick={()=>handleDelete(user.id)}>Supprimer</Button>
                            </TableCell>
                        </TableRow>
                    )))}
                </TableBody>
            </Table>

        </section>
    );
}
