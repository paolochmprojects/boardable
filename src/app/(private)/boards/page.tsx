import { Select } from "@headlessui/react"
import Boards from "./ui/boards"

const BoardsPage = async () => {
    return (
        <div className="max-w-screen-lg mx-auto flex flex-col gap-4">
            <h1 className="text-4xl font-bold font-bebas">Mis Tableros</h1>
            <Boards />
        </div>
    )
}

export default BoardsPage