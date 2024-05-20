"use server"
import { auth } from "@/auth"
import prisma from "@/lib/db"

interface CardFormData {
    listId: string
    title: string
}

interface UpdateCardFormData extends CardFormData {
    id: string
}

export const createCard = async (data: CardFormData) => {

    const session = await auth()
    if (!session) return { success: false, message: 'Inicia sesion para crear tarjetas' }

    const list = await prisma.list.findUnique({
        where: {
            id: data.listId
        },
        include: {
            board: true
        }
    })

    if (!list) return { success: false, message: 'Lista no encontrada' }
    if (list.board.userId !== session.user.id) return { success: false, message: 'No puedes crear tarjetas en este tablero' }

    try {
        await prisma.card.create({data})
        return { success: true, message: 'Tarjeta creada' }

    } catch (error) {
        return { success: false, message: 'Error al crear tarjeta' }
    }

}

export const updateCard = async (data: UpdateCardFormData) => {
    const session = await auth()
    if (!session) return { success: false, message: 'Inicia sesion para editar tarjetas' }

    const list = await prisma.list.findUnique({
        where: {
            id: data.listId
        },
        include: {
            board: true
        }
    })

    if (!list) return { success: false, message: 'Lista no encontrada' }
    if (list.board.userId !== session.user.id) return { success: false, message: 'No puedes editar tarjetas en este tablero' }

    const card = await prisma.card.findUnique({
        where: {
            id: data.id
        }
    })

    if (!card) return { success: false, message: 'Tarjeta no encontrada' }

    const { id:_ , ...dataCard} = data
    try {
        await prisma.card.update({
            where: {
                id: data.id
            },
            data: dataCard
        })
        return { success: true, message: 'Tarjeta actualizada' }
    } catch (error) {
        return { success: false, message: 'Error al actualizar tarjeta' }
    }
}

export const deleteCard = async (id: string) => {
    const session = await auth()
    if (!session) return { success: false, message: 'Inicia sesion para eliminar tarjetas' }

    const card = await prisma.card.findUnique({
        where: {
            id
        }
    })
    if (!card) return { success: false, message: 'Tarjeta no encontrada' }  

    const list = await prisma.list.findUnique({
        where: {
            id: card.listId
        },
        include: {
            board: true
        }
    })

    if (!list) return { success: false, message: 'Lista no encontrada' }
    if (list.board.userId !== session.user.id) return { success: false, message: 'No puedes eliminar tarjetas en este tablero' }

    try {
        await prisma.card.delete({
            where: {
                id
            }
        })
        return { success: true, message: 'Tarjeta eliminada' }
    } catch (error) {
        return { success: false, message: 'Error al eliminar tarjeta' }
    }
}
