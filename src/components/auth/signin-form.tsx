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
import { signInCredentials, signInWithGithub } from '@/server/actions/signin'
import { useRouter } from 'next/navigation'
import { FaGithub } from "react-icons/fa";



const SignInForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserSignIn>({
        resolver: zodResolver(SignInFormSchema),
    })

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { addAlert } = useAlerts()
    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()

    const onSubmit: SubmitHandler<UserSignIn> = async (data) => {
        setLoading(true)
        const { success, message } = await signInCredentials(data)
        if (!success) {
            addAlert({ type: "error", message })
        } else {
            addAlert({ type: "success", message })
            router.push("/")
        }
        setLoading(false)
    };

    const handleSignInWithGithub = async () => {
        setLoading(true)
        await signInWithGithub()
        setLoading(false)
    }

    return (
        <Fieldset className="flex flex-col gap-4 p-10 min-w-[400px] bg-neutral-200/30 rounded-2xl"
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
            <div className="flex flex-col gap-2">
                <Button className={clsx(
                    "btn btn-sm btn-primary w-full",
                )}
                    disabled={loading}
                    type="submit">
                    {loading ? <><span className="loading loading-spinner" /> Cargando...</> : "Iniciar Sesion"}

                </Button>
                <div className="divider">O</div>
                <Link className="btn btn-sm w-full" href="/signup">Registrate</Link>
                <Button
                    disabled={loading}
                    type="button"
                    className="btn btn-sm btn-neutral w-full" onClick={handleSignInWithGithub}>
                    <FaGithub />
                    {loading ? <><span className="loading loading-spinner" /> Cargando...</> : "Iniciar Sesion con Github"}
                </Button>
            </div>
        </Fieldset>
    )
}

export default SignInForm