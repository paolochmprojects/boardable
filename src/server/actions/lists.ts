"use server"
import { auth } from "@/auth"
import prisma from "@/lib/db"


export const getLists = async (boardId: string) => {

    const session = await auth()
    if (!session) return { success: false, message: 'You must be logged in' }

    const lists = await prisma.list.findMany({
        where: {
            boardId
        },
        include: {
            cards: {
                orderBy: {
                    createdAt: 'asc'
                }
            }
        },
        orderBy: {
            createdAt: 'asc'
        }
    })
    return {success: true, message: 'Listas encontradas', data: lists}
}

export const createList = async (title: string, boardId: string) => {

    const session = await auth()
    if (!session) return { success: false, message: 'Inicia sesion para crear listas' }

    const board = await prisma.board.findUnique({
        where: {
            id: boardId
        }
    })


    if (!board) return { success: false, message: 'Tablero no encontrado' }
    if (board.userId !== session.user.id) return { success: false, message: 'No puedes crear listas en este tablero' }

    try {

        await prisma.list.create({
            data: {
                title,
                boardId
            }
        })

        return { success: true, message: 'Lista creada'}
        
    } catch (error) {   
        return { success: false, message: 'Error al crear lista' }
    }
}

export const updateList = async (listId: string, title: string) => {

    const session = await auth()
    if (!session) return { success: false, message: 'Inicia sesion para editar listas' }

    const list = await prisma.list.findUnique({
        where: {
            id: listId
        },
        include: {
            board: true
        }
    })

    if (!list) return { success: false, message: 'Lista no encontrada' }
    if (list.board.userId !== session.user.id) return { success: false, message: 'No puedes editar listas en este tablero' }

    try {
        await prisma.list.update({
            where: {
                id: listId
            },
            data: {
                title
            }
        })  
        return { success: true, message: 'Lista actualizada'}   
    } catch (error) {   
        return { success: false, message: 'Error al actualizar lista' }
    }
}

export const deleteList = async (listId: string) => {

    const session = await auth()
    if (!session) return { success: false, message: 'Inicia sesion para eliminar listas' }

    const list = await prisma.list.findUnique({
        where: {
            id: listId
        },
        include: {
            board: true
        }
    })

    if (!list) return { success: false, message: 'Lista no encontrada' }
    if (list.board.userId !== session.user.id) return { success: false, message: 'No puedes eliminar listas en este tablero' }

    try {
        await prisma.list.delete({
            where: {
                id: listId
            }
        })  
        return { success: true, message: 'Lista eliminada'}   
    } catch (error) {   
        return { success: false, message: 'Error al eliminar lista' }
    }
}