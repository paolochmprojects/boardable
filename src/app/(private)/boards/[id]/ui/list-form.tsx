"use client"
import { ListFormSchema, ListFormType } from '@/schemas/list.schema'
import { createList, deleteList, updateList } from '@/server/actions/lists'
import { Button, Field, Fieldset, Input, Label } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAlerts } from "@/store/alerts"
import { useRouter } from 'next/navigation'
import { List } from '@prisma/client'

type ModeForm = "create" | "edit" | "view"

interface ListFormProps {
    boardId: string
    mode: ModeForm,
    list?: List
}

const ListForm = ({ boardId, mode, list }: ListFormProps) => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm<ListFormType>({
        resolver: zodResolver(ListFormSchema),
    })
    const [modeForm, setModeForm] = useState<ModeForm>(mode)
    const [loading, setLoading] = useState<boolean>(false)
    const { addAlert } = useAlerts()
    const router = useRouter()

    const onSubmitCreate: SubmitHandler<ListFormType> = async (data) => {
        setLoading(true)
        const { success, message } = await createList(data.title, boardId)

        if (!success) {
            setLoading(false)
            return addAlert({ type: "error", message })
        }

        addAlert({ type: "success", message })
        setLoading(false)
        reset()
        return router.refresh()
    }

    const onSubmitEdit: SubmitHandler<ListFormType> = async (data) => {

        if (!list) return
        setLoading(true)
        const { success, message } = await updateList(list.id, data.title)

        if (!success) {
            setLoading(false)
            return addAlert({ type: "error", message })
        }
        addAlert({ type: "success", message })
        setLoading(false)
        setModeForm("view")
        return router.refresh()
    }

    const onSubmitDelete = async () => {
        if (!list) return
        setLoading(true)
        const { success, message } = await deleteList(list.id)

        if (!success) {
            setLoading(false)
            return addAlert({ type: "error", message })
        }
        addAlert({ type: "success", message })
        setLoading(false)
        return router.refresh()
    }

    if (modeForm === "create") return (
        <Fieldset as="form"
            className="py-2"
            onSubmit={handleSubmit(onSubmitCreate)}
        >
            <Field className="flex flex-col gap-2">
                <Label>Nombre de lista</Label>
                <Input className="input input-sm input-bordered w-full" type="text" {...register("title")} />
                {errors.title && <p className="text-red-500 text-xs mt-2">{errors.title.message}</p>}
            </Field>
            <div className="pt-4">
                <Button type="submit" className="btn btn-xs btn-primary">Crear lista</Button>
            </div>
        </Fieldset>
    )

    if (modeForm === "view") return (
        <div className="flex justify-between items-center">
            <h4 className="font-bold">
                {list?.title}
            </h4>
            <div className="dropdown dropdown-bottom">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Button onClick={() => setModeForm("edit")}>Editar</Button></li>
                    <li><Button onClick={() => onSubmitDelete()}>Eliminar</Button></li>
                </ul>
            </div>
        </div>
    )

    if (modeForm === "edit") return (
        <Fieldset as="form"
            className="py-2"
            onSubmit={handleSubmit(onSubmitEdit)}
        >
            <Field className="flex flex-col gap-2">
                <Label>Nombre de lista</Label>
                <Input className="input input-sm input-bordered w-full" type="text" defaultValue={list?.title} {...register("title")} />
                {errors.title && <p className="text-red-500 text-xs mt-2">{errors.title.message}</p>}
            </Field>
            <div className="pt-4 flex justify-end gap-1">
                <Button type="submit" className="btn btn-xs btn-primary">Guardar</Button>
                <Button onClick={() => setModeForm("view")} className="btn btn-xs btn-ghost">Cancelar</Button>
            </div>
        </Fieldset>
    )

}

export default ListForm