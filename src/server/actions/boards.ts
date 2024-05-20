"use server"

import { auth } from "@/auth"
import prisma from "@/lib/db"
import { BoardFormType } from "@/schemas/board.schema"
import { Board } from "@prisma/client"

type BoardFormData = BoardFormType
type Sort = 'az' | 'za' | 'latest' | 'oldest'

export const getBoardsByUserId = async (sort: Sort = 'az'): Promise<Board[]> => {

    const session = await auth()
    if (!session) return []
    const { id } = session.user

    const orderTypes = {
        az: { title: 'asc' },
        za: { title: 'desc' },
        latest: { createdAt: 'desc' },
        oldest: { createdAt: 'asc' },
    } as const;

    const orderBy = orderTypes[sort]

    const boards = await prisma.board.findMany({
        where: {
            userId: id
        },
        orderBy,
    })

    return boards
}


export const createBoard = async ({ color, title }: BoardFormData) => {

    const session = await auth()
    if (!session) return { success: false, message: 'You must be logged in to create a board' }
    const { id } = session.user

    try {
        await prisma.board.create({
            data: {
                title,
                color,
                userId: id
            }
        })

        return { success: true, message: 'Board created successfully' }

    } catch (error) {

        return { success: false, message: 'Failed to create board' }
    }

}


export const updateBoard = async (boardId: string, data: BoardFormData) => {
    const session = await auth()
    if (!session) return { success: false, message: 'You must be logged in' }
    const { id } = session.user

    const board = await prisma.board.findUnique({
        where: {
            userId: id,
            id: boardId
        }
    })
    if (!board) return { success: false, message: 'Board not found' }

    try {
        await prisma.board.update({
            where: {
                id: boardId
            },
            data
        })
        return { success: true, message: 'Board updated successfully' }
    } catch (error) {
        return { success: false, message: 'Failed to update board' }
    }
}

export const getBoardByIdAndUserId = async (boardId: string) => {
    const session = await auth()
    if (!session) return { success: false, message: 'You must be logged in', data: null }
    const { id } = session.user

    const board = await prisma.board.findUnique({
        where: {
            userId: id,
            id: boardId
        }
    })
    if (!board) return { success: false, message: 'Board not found', data: null }
    return { success: true, message: 'Board found', data: board }
}

export const deleteBoardbyId = async (boardId: string) => {

    const session = await auth()
    if (!session) return { success: false, message: 'You must be logged in' }
    const { id } = session.user

    const boardExist = await prisma.board.findUnique({
        where: {
            userId: id,
            id: boardId
        }
    })
    if (!boardExist) return { success: false, message: 'Board not found' }

    await prisma.board.deleteMany({
        where: {
            userId: id,
            id: boardId
        }
    })
    return { success: true, message: 'Board deleted' }
}