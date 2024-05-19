"use client"
import { signOutAction } from "@/server/actions/signout"
import { Button } from "@headlessui/react"
import Link from "next/link"

interface NavBarProps {
    authenticated: boolean
}

const NavBar = ({ authenticated }: NavBarProps) => {

    const signOut = async () => {
        await signOutAction()
    }

    return (
        <header>
            <nav className="flex max-w-screen-xl mx-auto p-6 justify-between items-center">
                <Link href="/" className="text-4xl font-bebas">
                    Boardeable
                </Link>
                <ul className="flex gap-4 items-center">
                    {authenticated ? (
                        <li>
                            <Button onClick={signOut} className="btn btn-xs btn-ghost">
                                Cerrar Sesion
                            </Button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link href="/signin" className="btn btn-xs btn-ghost">
                                    Iniciar Sesion
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup" className="btn btn-xs btn-ghost">
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