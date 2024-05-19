import { z } from "zod"

export const SignInFormSchema = z.object({
    email: z.string({ required_error: "Email es requerido." }).email({ message: "Email inválido." }),
    password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
})

export type UserSignIn = z.infer<typeof SignInFormSchema>
