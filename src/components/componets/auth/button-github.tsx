"use client"
import { signIn } from '@/auth'
import { SignInWithGithub } from '@/server/actions/signin'
import { Button } from '@headlessui/react'
import React from 'react'
import { FaGithub } from 'react-icons/fa'

const ButtonGithub = () => {

    const handleClick = async () => {
        await SignInWithGithub()
    }

    return (
        <Button
            onClick={handleClick}
            className="btn">
            <FaGithub size={20} /> Inicia con Github
        </Button>
    )
}

export default ButtonGithub