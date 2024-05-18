import { Button, Field, Fieldset, Input, Label, Legend } from '@headlessui/react'
import { FaGithub } from "react-icons/fa";
import React from 'react'
import ButtonGithub from '@/components/componets/auth/button-github';

const Login = () => {


    return (<div className="max-w-screen-lg mx-auto">
        <h1 className="font-bebas text-4xl font-bold">Bordeable</h1>
        <Fieldset as="form" className="flex flex-col gap-4 w-72">
            <Legend className="font-bebas text-3xl">Login</Legend>
            <Field className="flex flex-col gap-2">
                <Label >Email</Label>
                <Input type="text" className="w-full" />
            </Field>
            <Field className="flex flex-col gap-2">
                <Label >Password</Label>
                <Input type="password" className="w-full" />
            </Field>
            <Button
                className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[hover]:data-[active]:bg-sky-700"
                type="submit"
                >
                Inicia sesión
            </Button>
            <hr />
            <ButtonGithub/>
        </Fieldset>
    </div>
    )
}

export default Login