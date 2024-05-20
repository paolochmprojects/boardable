import {z} from "zod"

export const AccountFormSchema = z.object({
    name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres." }),
    email: z.string().email({ message: "Email inválido." }),
    password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." }).optional().or(z.literal("")),
})

export type UserAccount = z.infer<typeof AccountFormSchema>