import { signInWithGithub } from '@/server/actions/signin'
import { Button } from '@headlessui/react'
import React from 'react'
import { FaGithub } from 'react-icons/fa6'

const BtnGitgub = () => {

    const handleSignInWithGithub = async () => {
        await signInWithGithub()
    }
    
    return (

        <Button
            type="button"
            className="btn btn-sm btn-neutral w-full" onClick={handleSignInWithGithub}>
            <FaGithub />
            Ingresa con Github
        </Button>
    )
}

export default BtnGitgub