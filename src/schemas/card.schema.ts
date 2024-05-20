import {z} from "zod"


export const CardFormSchema = z.object({
    title: z.string().min(3, { message: "El titulo debe tener al menos 3 caracteres." }),
})

export type CardFormType = z.infer<typeof CardFormSchema>