import { colors, HexColor } from '@/schemas/board.schema'
import cslx from 'clsx'
import Link from 'next/link'

interface BoardWrapperProps {
    children: React.ReactNode,
    color?: HexColor,
    boardId?: string
}
const BoardWrapper = ({ children, color = HexColor.color1, boardId }: BoardWrapperProps) => {

    return (
        <Link
            href={boardId ? `/boards/${boardId}` : "/boards"}
            className={cslx(
                "h-52 bg-color1 rounded-3xl flex items-center justify-center",
                colors[color]
            )} >
            {children}
        </Link>
    )
}

export default BoardWrapper