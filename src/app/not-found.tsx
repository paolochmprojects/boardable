import { auth } from '@/auth'
import Footer from '@/components/footer'
import NavBar from '@/components/ui/navbar'
import Link from 'next/link'
import React from 'react'

const NotFound = async() => {
  const session = await auth()

  const authenticated = !!session

  return (<div className="flex flex-col min-h-screen">
    <NavBar authenticated={authenticated} />
    <main className="flex flex-col flex-grow justify-center gap-4 items-center">
      <h1 className="text-9xl font-bebas">404</h1>
      <h2 className="text-3xl">No encontrado</h2>
      <Link className="btn btn-primary btn-outline" href="/">🏠 Ir a inicio</Link>
    </main>
    <Footer />
  </div>
  )
}

export default NotFound