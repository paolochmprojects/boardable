import { getBoardByIdAndUserId } from "@/server/actions/boards"
import { redirect } from "next/navigation"
import clsx from "clsx"
import BoardForm from "./ui/board-form"
import { colors, HexColor } from "@/schemas/board.schema"
import Board from "./ui/board"
import { getLists } from "@/server/actions/lists"

const BoardPage = async ({ params }: { params: { id: string } }) => {

    const { id } = params
    const { success, data: board } = await getBoardByIdAndUserId(id)

    if (!success) redirect("/not-found")
    if (!board) redirect("/not-found")

    const { success: successList, data: lists } = await getLists(board.id)

    if (!successList) return redirect("/not-found")
    if (!lists) return redirect("/not-found")
    if (!board) return redirect("/not-found")

    return (
        <div className={clsx("p-6", colors[board.color as HexColor])}>
            
                <BoardForm board={board} mode="view" />
            
            <div className="flex">
                <Board boardId={board.id} lists={lists} />
            </div>
        </div>
    )
}

export default BoardPage