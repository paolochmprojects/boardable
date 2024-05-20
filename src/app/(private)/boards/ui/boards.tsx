import BoardWrapper from './board-wrapper'
import { Board } from '@prisma/client'
import BoardForm from './board-form'
import { HexColor } from '@/schemas/board.schema'
import BoardSort from './board-sort'

interface BoarsProps {
    boards: Board[]
}

const Boards = ({ boards }: BoarsProps) => {

    return (
        <div>
            <BoardSort />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 px-2" >
                <BoardWrapper>
                    <BoardForm />
                </BoardWrapper>
                {boards.map(board => (
                    <BoardWrapper key={board.id} color={board.color as HexColor}>
                        <h4 className="font-bold">{board.title}</h4>
                    </BoardWrapper>
                ))}
            </div>
        </div>
    )
}

export default Boards