import { auth } from "@/auth"
import { getBoardsByUserId } from "@/server/actions/boards"
import Boards from "./ui/boards"
import { redirect, useSearchParams } from "next/navigation"

interface BoardsProps {
    searchParams: {
        sort?: string
    }
}

type Sort = 'az' | 'za' | 'latest' | 'oldest'

const BoardsPage = async ({searchParams}:BoardsProps) => {

    const session = await auth()
    if (!session) return redirect("/signin")

    const sortTypes = ['az','za', 'latest','oldest']

    let sort = searchParams.sort || 'az'
    if (!sortTypes.includes(sort)) sort = 'az'

    const boards = await getBoardsByUserId(sort as Sort)
    
    return (
        <div className="max-w-screen-lg mx-auto flex flex-col gap-4">
            <h1 className="text-4xl font-bold font-bebas">Mis Tableros</h1>
            <Boards boards={boards} />
        </div>
    )
}

export default BoardsPage