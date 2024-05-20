"use client"
import { Field, Fieldset, Input, Label, Legend, Button } from '@headlessui/react'
import Link from 'next/link'
import clsx from 'clsx'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react';
import { SignUpCredentials } from '@/server/actions/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormSchema, UserSignUp } from '@/schemas/signup.schema';
import { useAlerts } from '@/store/alerts';
import BtnGitgub from './button-github';


const SignUpForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<UserSignUp>({
        resolver: zodResolver(SignUpFormSchema),
    });

    const { addAlert } = useAlerts()

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const onSubmit: SubmitHandler<UserSignUp> = async (data) => {
        setLoading(true)
        const { name, email, password } = data
        const { success, message } = await SignUpCredentials({ email, name, password })
        if (!success) {
            addAlert({ type: "error", message })
        } else {
            addAlert({ type: "success", message })
        }
        setLoading(false)
    };

    return (
        <Fieldset className="flex flex-col gap-4 p-10 min-w-[400px] bg-neutral-200/30 rounded-2xl" as="form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-4xl font-bebas font-bold text-center">Boardeable</h1>
            <Legend className="text-2xl font-bold text-center">Registrate</Legend>
            <Field className="flex flex-col gap-1">
                <Label className={clsx("label-text", errors.name && "text-red-500")}>Nombre</Label>
                <Input
                    className={clsx("input input-sm input-bordered", errors.name && "input-error")}
                    type="text" {...register('name')}
                    disabled={loading}
                />
                {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>}
            </Field>
            <Field className="flex flex-col gap-1">
                <Label className={clsx("label-text", errors.email && "text-red-500")}>Email</Label>
                <Input
                    className={clsx("input input-sm input-bordered", errors.email && "input-error")}
                    type="email" {...register('email')}
                    disabled={loading}
                />
                {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
            </Field>
            <Field>
                <div className="flex flex-col gap-1 relative">
                    <Label className={clsx("label-text", errors.password && "text-red-500")}>Password</Label>
                    <Input
                        className={clsx("input input-sm input-bordered", errors.password && "input-error")}
                        type={showPassword ? "text" : "password"} {...register('password')}
                        disabled={loading}
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
            <Field as="label" htmlFor="terms" >
                <div className="flex gap-1">
                    <Input id="terms" type="checkbox"
                        className={clsx("checkbox checkbox-sm", errors.terms ? "checkbox-error" : "checkbox-primary")} 
                        {...register('terms')}
                        disabled={loading}
                    />
                    <span className={clsx("label-text", errors.terms && "text-red-500")}>Terminos y Condiciones</span>
                </div>
                {errors.terms && <p className="text-red-500 text-xs mt-2">Debes aceptar los terminos y condiciones</p>}
            </Field>
            <div  className="flex flex-col gap-1">
                <Button className={clsx(
                    "btn btn-sm btn-primary btn-block",
                )}
                    disabled={loading}
                    type="submit">
                    {loading ? <><span className="loading loading-spinner" /> Cargando...</> : "Registrarse"}

                </Button>
                <div className="divider">O</div>
                <Link className="btn btn-sm btn-block btn-outline" href="/signin">Inicia Sesión</Link>
                <BtnGitgub />
            </div>
        </Fieldset>
    )
}

export default SignUpForm