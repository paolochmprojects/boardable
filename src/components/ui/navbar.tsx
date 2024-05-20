"use client"
import { signOutAction } from "@/server/actions/signout"
import { FaRegUser } from "react-icons/fa6";
import { Button } from "@headlessui/react"
import Link from "next/link"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import Image from "next/image";

interface NavBarProps {
    authenticated: boolean,
    userImage?: string
}

const NavBar = ({ authenticated, userImage }: NavBarProps) => {

    const pathname = usePathname()

    const signOut = async () => {
        await signOutAction()
    }

    return (
        <header>
            <nav className="flex max-w-screen-xl mx-auto p-6 justify-between items-center">
                <Link href="/" className="text-4xl font-bold font-bebas">
                    Boardeable
                </Link>
                <ul className="flex gap-4 items-center">
                    {authenticated ? (<div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {userImage ?
                                    <Image src={userImage} alt="user image" width={32} height={32} priority={false} loading="lazy" />
                                    :
                                    <FaRegUser />}
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link href="/account">
                                    Mi cuenta
                                </Link>
                            </li>
                            <li>
                                <Link href="/boards">
                                    Mis Tableros
                                </Link>
                            </li>
                            <li>
                                <Button onClick={signOut}>
                                    Cerrar Sesion
                                </Button>
                            </li>
                        </ul>
                    </div>
                        /*   <>
                           <li>
                               <Link href="/account" className={clsx("btn btn-xs", pathname === "/account" ? "btn-link" : "btn-ghost")}>
                                   
                                   Mi Cuenta
                               </Link>
                           </li>
                           <li>
                               <Link href="/boards" className={clsx("btn btn-xs", pathname === "/boards" ? "btn-link" : "btn-ghost")}>
                                   Tableros
                               </Link>
                           </li>
                           <li>
                               
                           </li>
                       </> */
                    ) : (
                        <>
                            <li>
                                <Link href="/signin" className={clsx(
                                    "btn btn-xs", pathname === "/signin" ? "btn-link" : "btn-ghost"
                                )}>
                                    Iniciar Sesion
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup" className={clsx(
                                    "btn btn-xs", pathname === "/signup" ? "btn-link" : "btn-ghost")}>
                                    Registrate
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default NavBar