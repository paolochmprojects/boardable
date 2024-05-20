"use client"
import { BoardFormSchema, BoardFormType, colors, HexColor } from '@/schemas/board.schema'
import { createBoard } from '@/server/actions/boards'
import { useAlerts } from '@/store/alerts'
import { Button, Field, Fieldset, Input, Label } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ColorPicker from './colorpicker'


const BoardForm = () => {
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
    const onSubmit: SubmitHandler<BoardFormType> = async (data) => {

        setLoading(true)
        const { success, message } = await createBoard(data)
        if (!success) return addAlert({ type: "error", message })

        addAlert({ type: "success", message })
        setValue('title', '')
        setLoading(false)
        return router.refresh()
    }

    return (
        <Fieldset
            className="h-full w-full p-6 flex flex-col justify-around relative"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
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
                onClick={handleSubmit(onSubmit)}
                className={clsx("btn btn-sm btn-primary w-20 absolute bottom-10 right-10", loading && "btn-disabled")}>
                {loading ? <><span className="loading loading-spinner"></span>Cargando...</> : "Crear"}
            </Button>
        </Fieldset>
    )
}

export default BoardForm