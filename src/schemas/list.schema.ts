import {z} from "zod"


export const ListFormSchema = z.object({
    title: z.string().min(3, { message: "El titulo debe tener al menos 3 caracteres." }),
})

export type ListFormType = z.infer<typeof ListFormSchema>