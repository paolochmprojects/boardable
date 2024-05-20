"use client"
import { useAlerts } from '@/store/alerts'
import { Button, Field, Fieldset, Input, Label } from '@headlessui/react'
import { useState } from 'react'
import clsx from 'clsx'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AccountFormSchema, UserAccount } from '@/schemas/account.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { MdDeleteOutline, MdOutlineSave } from "react-icons/md";
import { updateAccount } from '@/server/actions/account-update'
import { signOutAction } from '@/server/actions/signout'
import { deleteAccount } from '@/server/actions/acount-delete'


interface AccountFormProps {
    userData: UserAccount
}

const AccountForm = ({ userData }: AccountFormProps) => {

    const { handleSubmit, register, formState: { errors } } = useForm<UserAccount>({
        resolver: zodResolver(AccountFormSchema)
    })

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { addAlert } = useAlerts()
    const [loading, setLoading] = useState<boolean>(false)
    const [completed, setCompleted] = useState<boolean>(false)

    const onSubmit: SubmitHandler<UserAccount> = async (data) => {
        setLoading(true)
        const { success, message, userData } = await updateAccount(data)

        if (!success) {
            addAlert({ type: "error", message })
            setLoading(false)
        } else {

            addAlert({ type: "success", message })

            setTimeout(() => {
                addAlert({ type: "warning", message: "Se cerrara la sesion, por favor vuelve a ingresar." })
            }, 1000)

            setTimeout(async () => {
                await signOutAction()
                setCompleted(true)
            }, 3000)
        }
    }

    const onDelete = async (email: string) => {
        setLoading(true)

        const { success, message } = await deleteAccount(email)

        if (!success) {
            addAlert({ type: "error", message })
            setLoading(false)
        } else {
            addAlert({ type: "success", message })

            setTimeout(() => {
                addAlert({ type: "warning", message: "Se cerrara la sesion, por favor vuelve a ingresar." })
            }, 1000)

            setTimeout(async () => {
                await signOutAction()
                setCompleted(true)
            }, 3000)
        }
    }

    return (
        <Fieldset
            className="flex flex-col gap-2 p-10 min-w-[400px] bg-neutral-200/30 rounded-2xl"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Field className="flex flex-col gap-1">
                <Label className={clsx("label-text", errors.name && "text-red-500")}>Nombre</Label>
                <Input
                    className={clsx("input input-sm input-bordered", errors.name && "input-error")}
                    type="text" {...register('name', { value: userData.name })}
                />
                {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>}
            </Field>
            <Field className="flex flex-col gap-1">
                <Label className={clsx("label-text", errors.email && "text-red-500")}>Correo</Label>
                <Input
                    disabled
                    className={clsx("input input-sm input-bordered", errors.email && "input-error")}
                    type="email" {...register('email', { value: userData.email })}
                />
                {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
            </Field>
            <Field>
                <div className="flex flex-col gap-1 relative">
                    <Label className={clsx("label-text", errors.password && "text-red-500")}>Nueva contraseña</Label>
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
                <Button
                    type="submit"
                    className="btn btn-sm btn-block btn-primary"
                    disabled={loading || completed}>
                    {loading ?
                        <><span className="loading loading-spinner" /> Guardando...</>
                        :
                        <><MdOutlineSave />Guardar cambios</>}
                </Button>
                <div className="divider">O</div>
                <Button
                    onClick={() => onDelete(userData.email)}
                    type="button"
                    className="btn btn-sm btn-block btn-outline btn-error" 
                    disabled={loading || completed}>
                    {loading ?
                        <><span className="loading loading-spinner" /> Cargando...</>
                        :
                        <><MdDeleteOutline />Elimar cuenta</>
                    }
                </Button>
            </div>
        </Fieldset>
    )
}

export default AccountForm