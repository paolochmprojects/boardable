import { Card } from "@prisma/client"
import CardForm from "./card-form"

interface CardWrapperProps {
  cards: Card[],
  listId: string
}

const CardsWrapper = ({ cards = [], listId }: CardWrapperProps) => {

  return (
    <div className="flex flex-col gap-2">
      {cards.map(card => (<CardForm key={card.id} card={card} mode="view" listId={listId} />))}
      <div>
        <CardForm mode="btn" listId={listId} />
      </div>
    </div>
  )
}

export default CardsWrapper