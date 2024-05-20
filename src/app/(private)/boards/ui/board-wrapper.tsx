import { colors, HexColor } from '@/schemas/board.schema'
import cslx from 'clsx'

interface BoardWrapperProps {
    children: React.ReactNode,
    color?: HexColor
}
const BoardWrapper = ({ children, color=HexColor.color1 }: BoardWrapperProps) => {
    return (
        <div className={cslx("h-52 bg-color1 rounded-3xl flex items-center justify-center", colors[color] )} >
            {children}
        </div>
    )
}

export default BoardWrapper