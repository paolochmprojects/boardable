import {z} from "zod"

export const SignUpFormSchema = z.object({
    name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres." }),
    email: z.string({ required_error: "Email es requerido." }).email({ message: "Email inválido." }),
    password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
    terms: z.literal(true, {
        errorMap: () => ({ message: "Debes aceptar los términos y condiciones" })
    })
})

export type UserSignUp = z.infer<typeof SignUpFormSchema>
