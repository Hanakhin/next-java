"use client";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Image from "next/image";
import {CustomLinkWithIcon} from "@/app/_Components/Buttons_Links/CustomLinkWithIcon";
import {Calendar, Captions, Send, ShoppingBag} from "lucide-react";
import Link from "next/link";
import {useSession,signOut} from "next-auth/react";

export function CustomNavbar() {
    const {data: session } = useSession()

    return (
        <Navbar className={'w-full flex bg-primary/50 backdrop-blur'}>

            <div className={"inline-flex w-full justify-evenly"}>

                <div className={'inline-flex justify-evenly flex-1'}>
                <CustomLinkWithIcon name={"Magasin"} url={"/shop"} Icon={ShoppingBag}/>
                <CustomLinkWithIcon name={"Evenements"} url={"/events"} Icon={Calendar}/>
                <Navbar.Brand href="/">
                    <Image
                        src={"/image/Logo.png"}
                        width={150}
                        height={150}
                        alt={"logo peche3000"}
                    />
                </Navbar.Brand>
                <CustomLinkWithIcon name={"Permis"} url={"/permis"} Icon={Captions}/>
                <CustomLinkWithIcon name={"Contact"} url={"/"} Icon={Send}/>
                </div>

                <div className={"flex"}>
                    {session ? (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar alt="User profil" img="/icons/defaultUser.svg" rounded />
                            }
                        >
                            <Dropdown.Header>
                                <span className="block truncate text-sm font-medium">{session?.user?.pseudo}</span>
                                <span className="block truncate text-sm font-medium">{session?.user?.email}</span>
                            </Dropdown.Header>
                            <Dropdown.Item className={"hover:text-green-400"}>Mes commandes</Dropdown.Item>
                            <Dropdown.Item className={"hover:text-green-400"}>Mes évènements</Dropdown.Item>
                            <Dropdown.Item className={"hover:text-green-400"}>Mon panier</Dropdown.Item>
                            <Dropdown.Item className={"hover:text-green-400"}>Paramètres</Dropdown.Item>
                            {session?.user?.role == "ADMIN" && <Link href={'/admin/panel'}><Dropdown.Item className={"hover:text-green-400"}>Admin panel</Dropdown.Item></Link>}
                            <Dropdown.Divider />
                            <Dropdown.Item className={"hover:text-red-500"} onClick={()=>signOut()}>Se déconnecter</Dropdown.Item>
                        </Dropdown>
                    ) : (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar alt="User settings" img="/icons/defaultUser.svg" rounded />
                            }
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">Anonyme</span>
                                <span className="block truncate text-sm font-medium"></span>
                            </Dropdown.Header>
                            <Link href={'/auth/login'}><Dropdown.Item className={"hover:text-green-400"}>Se connecter</Dropdown.Item></Link>
                            <Link href={'/auth/register'}><Dropdown.Item className={"hover:text-green-400"}>S'inscrire</Dropdown.Item></Link>
                        </Dropdown>
                    )}

                </div>
            </div>
        </Navbar>
    );
}
