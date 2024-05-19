"use client"
import { Field, Fieldset, Input, Label, Legend, Button } from '@headlessui/react'
import Link from 'next/link'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react';
import { SignUpCredentials } from '@/server/actions/signup';

interface UserSignUp {
    name: string
    email: string
    password: string
    terms: boolean
}

const SignUpForm = () => {

    const { register, handleSubmit } = useForm<UserSignUp>();
    const [showPassword, setShowPassword] = useState<boolean>(false)
    
    const onSubmit: SubmitHandler<UserSignUp> = async (data) => {
        const { name, email, password } = data
        const result = await SignUpCredentials({email, name, password})
        console.log(result)
    };

    return (
        <Fieldset className="flex flex-col gap-4 p-10 min-w-[400px] bg-neutral-600/10 rounded-2xl" as="form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-4xl font-bebas font-bold text-center">Boardeable</h1>
            <Legend className="text-2xl font-bold text-center">Registrate</Legend>
            <Field className="flex flex-col gap-2">
                <Label className="label-text">Name</Label>
                <Input
                    className="input input-sm input-bordered"
                    type="text" {...register('name', { required: true, minLength: 3 })} />
            </Field>
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
            <Field as="label" htmlFor="terms" className="flex gap-2">
                <input id="terms" type="checkbox" className="checkbox checkbox-sm" {...register('terms', { required: true })} />
                <span className="label-text">Terminos y Condiciones</span>
            </Field>
            <div>
                <Button className="btn btn-sm btn-primary w-full" type="submit">Registrate</Button>
                <div className="divider">O</div>
                <Link className="btn btn-sm w-full" href="/signin">Inicia Sesión</Link>
            </div>
        </Fieldset>
    )
}

export default SignUpForm