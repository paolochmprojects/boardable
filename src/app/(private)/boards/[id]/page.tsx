import { getBoardByIdAndUserId } from "@/server/actions/boards"
import { redirect } from "next/navigation"
import clsx from "clsx"
import BoardOptions from "./ui/board-options"
import { colors, HexColor } from "@/schemas/board.schema"
import Board from "./ui/board"
import { getLists } from "@/server/actions/lists"

const BoardPage = async ({ params }: { params: { id: string } }) => {

    const { id } = params
    const { success, data: board } = await getBoardByIdAndUserId(id)

    if (!success) redirect("/not-found")
    if (!board) redirect("/not-found")

    const { success: successList, data: lists, message } = await getLists(board.id)

    if (!successList) return redirect("/not-found")
    if (!lists) return redirect("/not-found")

    return (
        <div className={clsx("p-6", colors[board.color as HexColor])}>
            <div className="flex gap-4 items-center">
                <h2 className="text-3xl font-bold font-bebas">{board?.title}</h2>
                <BoardOptions boardId={board.id} />
            </div>
            <div className="flex">
                <Board boardId={board.id} lists={lists} />
            </div>
        </div>
    )
}

export default BoardPage