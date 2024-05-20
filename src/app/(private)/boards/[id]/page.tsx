import { getBoardByIdAndUserId } from "@/server/actions/boards"
import { redirect } from "next/navigation"
import clsx from "clsx"
import BoardOptions from "./ui/board-options"
import { colors, HexColor } from "@/schemas/board.schema"

const BoardPage = async ({ params }: { params: { id: string } }) => {

    const { id } = params
    const { success, data } = await getBoardByIdAndUserId(id)

    if (!success) redirect("/not-found")
    if (!data) redirect("/not-found")

    return (
        <div className={clsx("p-6 min-h-[75vh]", colors[data.color as HexColor])}>
            <div className="flex gap-4 items-center">
                <h2 className="text-3xl font-bold font-bebas">{data?.title}</h2>
                <BoardOptions boardId={data.id}/>
            </div>
        </div>
    )
}

export default BoardPage