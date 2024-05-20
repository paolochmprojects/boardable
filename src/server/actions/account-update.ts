"use server"

import prisma from "@/lib/db"
import { UserAccount } from "@/schemas/account.schema"
import { genSalt, hash } from "bcryptjs"


export const updateAccount = async (data: UserAccount) => {


    const userExist = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    if (!userExist) return { success: false, message: "No existe el usuario." }

    const salt = await genSalt(10)

    const user = await prisma.user.update({
        where: {
            email: data.email
        },
        data: {
            name: data.name,
            password: data.password ? await hash(data.password, salt) : undefined
        }
    })

    const { password:_ , ...userData } = user

    return { success: true, message: "Cuenta actualizada exitosamente.", userData }
}