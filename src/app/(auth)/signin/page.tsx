import { Button, Field, Fieldset, Input, Label, Legend } from '@headlessui/react'
import { FaGithub } from "react-icons/fa";
import React from 'react'
import SignInForm from '@/components/componets/auth/signin-form';

const Login = () => {

    return (<div className="max-w-screen-lg mx-auto">
        <SignInForm />
    </div>
    )
}

export default Login