import { auth } from '@/auth'
import Footer from '@/components/footer'
import NavBar from '@/components/ui/navbar'
import { redirect } from 'next/navigation'
import React from 'react'

type PrivateLayoutProps = {
    children: React.ReactNode
}

const PrivateLayout = async ({ children }: PrivateLayoutProps) => {

    const session = await auth()

    if (!session) return redirect("/signin")

    const { image } = session.user
    const authenticated = !!session

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar authenticated={authenticated} userImage={image} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default PrivateLayout