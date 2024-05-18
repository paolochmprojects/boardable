import Footer from '@/components/footer'
import React from 'react'

interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex items-center justify-center flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default AuthLayout