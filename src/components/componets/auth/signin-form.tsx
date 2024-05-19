"use client"
import { useAlerts } from '@/store/alerts'
import { Button, Field, Fieldset, Input, Label, Legend } from '@headlessui/react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface UserSignIn {
    email: string
    password: string
}

const SignInForm = () => {
    const { register, handleSubmit } = useForm<UserSignIn>()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const {alerts, addAlert } = useAlerts()
    const onSubmit: SubmitHandler<UserSignIn> = async (data) => {
        addAlert({message:"hola", type:"success"})
        addAlert({message:"hola", type:"warning"})
        addAlert({message:"hola", type:"error"})
    };

    console.log(alerts)
    return (
        <Fieldset className="flex flex-col gap-4 p-10 min-w-[400px] bg-neutral-600/10 rounded-2xl"
            as="form"
            onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-4xl font-bebas font-bold text-center">Boardeable</h1>
            <Legend className="text-2xl font-bold text-center">Inicia Sesion</Legend>
            <Field className="flex flex-col gap-2">
                <Label className="label-text">Email</Label>
                <Input
                    className="input input-sm input-bordered"
                    type="email" {...register('email', { required: true })} />
            </Field>
            <Field className="flex flex-col gap-2 relative">
                <Label className="label-text">Password</Label>
                <Input
                    className="input input-sm input-bordered"
                    type={showPassword ? "text" : "password"} {...register('password', { required: true, minLength: 8 })} />
                <button
                    type="button"
                    className="absolute right-2 top-1/2 translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
            </Field>
            <div>
                <Button className="btn btn-sm btn-primary w-full" type="submit">Inicia sesion</Button>
                <div className="divider">O</div>
                <Link className="btn btn-sm w-full" href="/signup">Registrate</Link>
            </div>
        </Fieldset>
    )
}

export default SignInForm