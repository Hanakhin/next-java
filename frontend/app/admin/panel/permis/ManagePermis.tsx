"use client"

import {useEffect, useState} from "react";
import UserService from "@/app/Services/UserService";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";

export const ManagePermis = () =>{


    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getUsersWithPermis(true);
    }, []);

    const getUsersWithPermis = async (hasPermis:boolean) => {
        setLoading(true);
        try {
            const res = await UserService.getUsersWithPermis(hasPermis);
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
                            </TableCell>
                        </TableRow>
                    )))}
                </TableBody>
            </Table>

        </section>
    );
}