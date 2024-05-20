import React from 'react'
import ListWrapper from './list-wrapper'
import ListForm from './list-form'
import { List } from '@prisma/client'

interface BoardProps {
    boardId: string,
    lists: List[]
}

const Board = ({ boardId, lists = [] }: BoardProps) => {
    return (
        <div className="flex h-[70vh] gap-2 w-screen overflow-auto">
            {lists.map(list => (
                <ListWrapper key={list.id}>
                    <ListForm boardId={boardId} list={list} mode="view" />
                </ListWrapper>
            ))}
            <ListWrapper>
                <ListForm boardId={boardId} mode="create" />
            </ListWrapper>
        </div>
    )
}

export default Board