"use client"
import { Button, Fieldset, Input, Label } from '@headlessui/react'
import { Card } from '@prisma/client'
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CardFormSchema, CardFormType } from '@/schemas/card.schema';
import { FiPlus } from "react-icons/fi";
import { createCard, deleteCard, updateCard } from '@/server/actions/card';
import { useAlerts } from '@/store/alerts';
import { useRouter } from 'next/navigation';

type ModeForm = "create" | "edit" | "view" | "btn"
interface CardFormProps {
    card?: Card
    mode: ModeForm,
    listId: string
}

const CardForm = ({ card, mode, listId }: CardFormProps) => {

    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const { addAlert } = useAlerts()
    const [modeForm, setModeForm] = useState<ModeForm>(mode)
    const { register, formState: { errors }, handleSubmit, reset } = useForm<CardFormType>({
        resolver: zodResolver(CardFormSchema),
    })

    const handleSubmitCreate: SubmitHandler<CardFormType> = async (data) => {
        setLoading(true)
        const { success, message } = await createCard({...data, listId})

        if (!success) {
            setLoading(false)
            return addAlert({ type: "error", message })
        }

        addAlert({ type: "success", message })
        setLoading(false)
        reset()
        setModeForm("btn")
        return router.refresh()
    }

    const handleSubmitEdit: SubmitHandler<CardFormType> = async (data) => {

        if (!card) return

        setLoading(true)

        const {message, success} = await updateCard({id: card.id, listId, title: data.title})

        if (!success) {
            setLoading(false)
            return addAlert({ type: "error", message })
        }

        addAlert({ type: "success", message })
        setLoading(false)
        setModeForm("view")
        return router.refresh()

    }

    const handleSubmitDelete = async () => {
        if (!card) return
        setLoading(true)
        const { success, message } = await deleteCard(card.id)

        if (!success) {
            setLoading(false)
            return addAlert({ type: "error", message })
        }
        addAlert({ type: "success", message })
        setLoading(false)
        setModeForm("btn")
        return router.refresh()
    }


    if (modeForm === "btn") return (
        <Button
            onClick={() => setModeForm("create")}
            className="btn btn-ghost btn-sm"
        >
            <FiPlus />
            Añadir
        </Button>
    )

    if (modeForm === "create") return (
        <Fieldset
            as="form"
            onSubmit={handleSubmit(handleSubmitCreate)}
        >
            <Label className="label">
                <span className="label-text">Título</span>
            </Label>
            <Input
                type="text"
                className="input input-bordered input-sm w-full"
                {...register("title")}
            />
            {errors.title && <p className="text-red-500 text-xs mt-2">{errors.title.message}</p>}
            <div className="flex py-2 gap-1">
                <Button
                    className="btn w-20 btn-primary btn-xs"
                    type="submit"
                >
                    Crear
                </Button>
                <Button
                    onClick={() => setModeForm("btn")}
                    className="btn w-20 btn-outline btn-xs"
                >
                    Cancelar
                </Button>
            </div>
        </Fieldset>
    )

    if (modeForm === "view" && card ) return (
        <div className="rounded-lg shadow-md p-4 flex justify-between items-center">
            <p>{card?.title}</p>
            <div className="dropdown dropdown-bottom">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Button onClick={() => setModeForm("edit")}>Editar</Button></li>
                    <li><Button onClick={() => handleSubmitDelete()}>Eliminar</Button></li>
                </ul>
            </div>
        </div>
    )

    if (modeForm === "edit" && card) return (
        <Fieldset
            as="form"
            onSubmit={handleSubmit(handleSubmitEdit)}
        >
            <Label className="label">
                <span className="label-text">Título</span>
            </Label>
            <Input
                type="text"
                className="input input-bordered input-sm w-full"
                {...register("title", { value: card.title })}
            />
            {errors.title && <p className="text-red-500 text-xs mt-2">{errors.title.message}</p>}
            <div className="flex py-4 gap-1">
                <Button
                    className="btn w-20 btn-primary btn-xs"
                    type="submit"
                >
                    Guardar
                </Button>
                <Button
                    onClick={() => setModeForm("view")}
                    className="btn w-20 btn-outline btn-xs"
                >
                    Cancelar
                </Button>
            </div>
        </Fieldset>
    )

    return (<div></div>)
}

export default CardForm