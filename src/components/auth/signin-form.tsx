"use client"
import { useAlerts } from '@/store/alerts'
import { Button, Field, Fieldset, Input, Label, Legend } from '@headlessui/react'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { SignInFormSchema, UserSignIn } from "@/schemas/signin.schema"
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { SignInCredentials } from '@/server/actions/signin'



const SignInForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserSignIn>({
        resolver: zodResolver(SignInFormSchema),
    })
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { alerts, addAlert } = useAlerts()
    const onSubmit: SubmitHandler<UserSignIn> = async (data) => {

        const { email, password } = data
        const result = await SignInCredentials({ email, password })
        console.log(result)
    };

    return (
        <Fieldset className="flex flex-col gap-4 p-10 min-w-[400px] bg-neutral-600/10 rounded-2xl"
            as="form"
            onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-4xl font-bebas font-bold text-center">Boardeable</h1>
            <Legend className="text-2xl font-bold text-center">Inicia Sesion</Legend>
            <Field className="flex flex-col gap-2">
                <Label className={clsx("label-text", errors.email && "text-red-500")}>Email</Label>
                <Input
                    className={clsx("input input-sm input-bordered", errors.email && "input-error")}
                    type="email" {...register('email')}
                />
                {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
            </Field>
            <Field>
                <div className="flex flex-col gap-2 relative">
                    <Label className={clsx("label-text", errors.password && "text-red-500")}>Password</Label>
                    <Input
                        className={clsx("input input-sm input-bordered", errors.password && "input-error")}
                        type={showPassword ? "text" : "password"} {...register('password')}
                    />
                    <button
                        type="button"
                        className={clsx("absolute right-2 top-1/2 translate-y-1/2", errors.password && "text-red-500")}
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
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