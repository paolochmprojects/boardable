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


const BoardForm = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const [color, setColor] = useState<HexColor>(HexColor.color1)
    const { addAlert } = useAlerts()
    const router = useRouter()

    const { register, formState: { errors }, handleSubmit, setValue } = useForm<BoardFormType>({
        resolver: zodResolver(BoardFormSchema)
    })

    const setColorAction = (color: HexColor) => {
        setColor(color)
        setVisible(!visible)
        setValue('color', color)
    }

    const onSubmit: SubmitHandler<BoardFormType> = async (data) => {
        const { success, message } = await createBoard(data)
        if (!success) return addAlert({ type: "error", message })

        addAlert({ type: "success", message })
        setValue('title', '')

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
                <div className="relative w-8 h-8">
                    <div
                        onClick={() => setVisible(!visible)}
                        className={clsx("w-8 h-8 rounded-full border border-black", colors[color])} />
                    {visible && <div className="absolute w-40 bg-base-100 rounded-lg top-10 left-1/2 -translate-x-1/2 grid grid-cols-4 gap-2 p-3 shadow-lg">
                        <div className="w-8 h-8 rounded-full border border-black bg-color1" onClick={() => setColorAction(HexColor.color1)} ></div>
                        <div className="w-8 h-8 rounded-full border border-black bg-color2" onClick={() => setColorAction(HexColor.color2)} ></div>
                        <div className="w-8 h-8 rounded-full border border-black bg-color3" onClick={() => setColorAction(HexColor.color3)} ></div>
                        <div className="w-8 h-8 rounded-full border border-black bg-color4" onClick={() => setColorAction(HexColor.color4)} ></div>
                        <div className="w-8 h-8 rounded-full border border-black bg-color5" onClick={() => setColorAction(HexColor.color5)} ></div>
                        <div className="w-8 h-8 rounded-full border border-black bg-color6" onClick={() => setColorAction(HexColor.color6)} ></div>
                        <div className="w-8 h-8 rounded-full border border-black bg-color7" onClick={() => setColorAction(HexColor.color7)} ></div>
                        <div className="w-8 h-8 rounded-full border border-black bg-color8" onClick={() => setColorAction(HexColor.color8)} ></div>
                    </div>}
                </div>
            </Field>
            <Button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="btn btn-sm btn-primary w-20 absolute bottom-10 right-10">
                Crear
            </Button>
        </Fieldset>
    )
}

export default BoardForm