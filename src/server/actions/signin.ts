"use server"

import { signIn } from "@/auth"
import { UserSignIn } from "@/schemas/signin.schema"

export const signInCredentials = async (data: UserSignIn) => {

    // const formData = new FormData()
    // formData.append("email", data.email)
    // formData.append("password", data.password)

    // try {
    //     await signIn("credentials", { ...Object.fromEntries(formData), redirect: false })
    //     return { success: true, message: "Inicio de sesion exitoso." }
    // } catch {
    //     return { success: false, message: "Credenciales inválidas." }
    // }

    return { success: false, message: "El inicion de sesion usuario encuentra disponible, intenta mediante la autenticación con Github." }
}

export const signInWithGithub = async () => {
    await signIn("github")
}