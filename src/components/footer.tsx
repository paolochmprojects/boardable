import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="flex justify-center p-6">
            <small className="text-slate-500 text-xs">
                &copy; Copyright 2024 Bordeable - 
                <Link href="https://github.com/paolochmprojects" target="_blank"> paolochmprojects</Link>
            </small>
        </footer>
    )
}

export default Footer