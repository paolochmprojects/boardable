"use server"
import prisma from "@/lib/db"

export const deleteAccount = async (email: string) => {
    
    const userExist = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!userExist) return { success: false, message: "No existe el usuario." }

    const user = await prisma.user.delete({
        where: {
            email
        }
    })

    const { password: _, ...userData } = user

    return { success: true, message: "Cuenta eliminada exitosamente.", userData }
}