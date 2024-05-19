"use client"
import { signOutAction } from "@/server/actions/signout"
import { Button } from "@headlessui/react"
import { useSession } from "next-auth/react"
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
            <nav className="flex max-w-screen-xl mx-auto p-6 justify-between">
                <Link href="/" className="text-4xl font-bebas">
                    Boardeable
                </Link>
                <ul>
                    {authenticated ? (
                        <li>
                            <Button onClick={signOut} className="btn btn-sm btn-primary">
                                Cerrar Sesion
                            </Button>
                        </li>
                    ) : (
                        <li>
                            <Link href="/signin" className="btn btn-sm btn-primary">
                                Iniciar Sesion
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default NavBar