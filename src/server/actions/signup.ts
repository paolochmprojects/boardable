"use server"

import prisma from "@/lib/db"
import { genSalt, hash } from "bcryptjs"


interface UserSignUp {
    name: string
    email: string
    password: string
}

interface SignUpResponse {
    success: boolean
    message: string
}

export const SignUpCredentials = async (data: UserSignUp) : Promise<SignUpResponse> => {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    if (user) {
        return { success: false, message: "El usuario ya esta registrado." }
    }

    const salt = await genSalt(10)

    try {
        await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: await hash(data.password, salt)
            }
        })
    } catch (error) {
        return { success: false, message: "Error al registrar el usuario." }
    }

    return { success: true, message: "Usuario registrado exitosamente." }
}