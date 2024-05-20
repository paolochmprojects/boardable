import React from 'react'
import ListWrapper from './list-wrapper'
import ListForm from './list-form'
import { Card, List } from '@prisma/client'
import CardForm from './card-form'
import CardsWrapper from './cards-wrapper'

type ListExt = List & { cards: Card[] }
interface BoardProps {
    boardId: string,
    lists: ListExt[]
}

const Board = ({ boardId, lists = [] }: BoardProps) => {
    return (
        <div className="flex h-[70vh] gap-2 w-screen overflow-auto">
            {lists.map(list => (
                <ListWrapper key={list.id}>
                    <ListForm boardId={boardId} list={list} mode="view" />
                    <CardsWrapper key={list.id} cards={list.cards} listId={list.id}/>
                </ListWrapper>
            ))}
            <ListWrapper>
                <ListForm boardId={boardId} mode="create"/>
            </ListWrapper>
        </div>
    )
}

export default Board