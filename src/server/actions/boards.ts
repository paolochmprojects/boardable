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