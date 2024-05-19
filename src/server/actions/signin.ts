"use server"

import { signIn } from "@/auth"
import { UserSignIn } from "@/schemas/signin.schema"

export const SignInCredentials = async (data: UserSignIn) => {

    const formData = new FormData()
    formData.append("email", data.email)
    formData.append("password", data.password)

    try {
        await signIn("credentials", { ...Object.fromEntries(formData), redirect: false })
        return { success: true, message: "Inicio de sesion exitoso." }
    } catch (error) {
        return { success: false, message: "Credenciales inválidas." }
    }
}