"use client"
import { BoardFormSchema, BoardFormType, colors, HexColor } from '@/schemas/board.schema'
import { createBoard, deleteBoardbyId, updateBoard } from '@/server/actions/boards'
import { useAlerts } from '@/store/alerts'
import { Button, Field, Fieldset, Input, Label } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ColorPicker from './colorpicker'
import { Board } from '@prisma/client'


type ModeForm = "view" | "edit" | "create"

interface BoardFormProps {
    board?: Board
    mode: ModeForm
}

const BoardForm = ({ mode, board }: BoardFormProps) => {

    const [modeForm, setModeForm] = useState<ModeForm>(mode)
    const [color, setColor] = useState<HexColor>(HexColor.color1)
    const [loading, setLoading] = useState<boolean>(false)
    const { addAlert } = useAlerts()
    const router = useRouter()

    const { register, formState: { errors }, handleSubmit, setValue } = useForm<BoardFormType>({
        resolver: zodResolver(BoardFormSchema)
    })

    const setColorAction = (color: HexColor) => {
        setColor(color)
        setValue('color', color)
    }
    const onSubmitCreate: SubmitHandler<BoardFormType> = async (data) => {

        setLoading(true)
        const { success, message } = await createBoard(data)
        if (!success) return addAlert({ type: "error", message })

        addAlert({ type: "success", message })
        setValue('title', '')
        setLoading(false)
        return router.refresh()
    }

    const onSubmitEdit: SubmitHandler<BoardFormType> = async (data) => {
        if (!board) return
        setLoading(true)
        const { success, message } = await updateBoard(board.id, data)

        if (!success) {
            setLoading(false)
            return addAlert({ type: "error", message })
        }

        addAlert({ type: "success", message })
        setLoading(false)
        setModeForm("view")
        return router.refresh()
    }

    const deleteBoard = async () => {
        if (!board) return
        const { success, message } = await deleteBoardbyId(board.id)
        if (!success) return addAlert({ type: "error", message })

        addAlert({ type: "success", message })
        router.push("/boards")
    }

    if (modeForm === "create") return (
        <Fieldset
            className="h-full w-full p-6 flex flex-col justify-around relative"
            as="form"
        >
            <Field className="flex flex-col gap-1">
                <Label className="label-text">Titulo de tablero</Label>
                <Input
                    className="input input-sm input-bordered"
                    type="text"
                    {...register('title')}
                />
                {errors.title && <p className="text-red-500 text-xs mt-2">{errors.title.message}</p>}
            </Field>
            <Field className="flex gap-2 items-center">
                <Label className="label-text">Color</Label>
                <Input
                    type="text"
                    className="hidden"
                    {...register('color', { value: color })}
                />
                {errors.color && <p className="text-red-500 text-xs mt-2">{errors.color.message}</p>}
                <ColorPicker setColor={setColorAction} color={color} />
            </Field>
            <Button
                type="button"
                disabled={loading}
                onClick={handleSubmit(onSubmitCreate)}
                className={clsx("btn btn-sm btn-primary w-20 absolute bottom-10 right-10", loading && "btn-disabled")}>
                {loading ? <><span className="loading loading-spinner"></span>Cargando...</> : "Crear"}
            </Button>
        </Fieldset>
    )

    if (modeForm === "edit" && board) return (
        <Fieldset
            className="w-full p-6 h-48 my-2 flex flex-col gap-2 justify-around rounded-xl relative bg-base-100 max-w-md"
            as="form"
        >
            <Field className="flex flex-col gap-1">
                <Label className="label-text">Titulo de tablero</Label>
                <Input
                    className="input input-sm input-bordered"
                    type="text"
                    defaultValue={board?.title}
                    {...register('title')}
                />
                {errors.title && <p className="text-red-500 text-xs mt-2">{errors.title.message}</p>}
            </Field>
            <Field className="flex gap-2 items-center">
                <Label className="label-text">Color</Label>
                <Input
                    type="text"
                    className="hidden"
                
                    {...register('color', { value: board.color as HexColor })}
                />
                {errors.color && <p className="text-red-500 text-xs mt-2">{errors.color.message}</p>}
                <ColorPicker setColor={setColorAction} color={color} />
            </Field>
            <div className="flex gap-1 justify-end">
                <Button
                    type="button"
                    disabled={loading}
                    onClick={handleSubmit(onSubmitEdit)}
                    className={clsx("btn btn-xs btn-primary w-20", loading && "btn-disabled")}>
                    {loading ? <><span className="loading loading-spinner"></span>Cargando...</> : "Editar"}
                </Button>
                <Button
                    type="button"
                    disabled={loading}
                    onClick={() => setModeForm("view")}
                    className={clsx("btn btn-xs btn-outline w-20", loading && "btn-disabled")}>
                    Cancelar
                </Button>
            </div>
        </Fieldset>
    )

    if (modeForm === "view" && board) return (
        <div className="flex gap-4 items-center px-2">
            <h2 className="text-3xl font-bold font-bebas">{board.title}</h2>
            <div className="dropdown dropdown-bottom">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Button onClick={() => setModeForm("edit")}>Editar</Button></li>
                    <li><Button onClick={deleteBoard}>Eliminar</Button></li>
                </ul>
            </div>
        </div>
    )

    return null
}

export default BoardForm