"use client"

import { deleteBoardbyId } from "@/server/actions/boards"
import { Button, Fieldset, Input, Label } from "@headlessui/react"
import { useAlerts } from "@/store/alerts"
import { useRouter } from "next/navigation"
import { Board } from "@prisma/client"
import { useState } from "react"

type ModeForm = "view" | "edit"
interface BoardFormProps {
    board: Board
    mode: ModeForm
}

const BoardForm = ({ board, mode }: BoardFormProps) => {

    const [modeForm, setModeForm] = useState<ModeForm>("view")
    const { addAlert } = useAlerts()
    const router = useRouter()
    const deleteBoard = async () => {
        const { success, message } = await deleteBoardbyId(board.id)
        if (!success) return addAlert({ type: "error", message })

        addAlert({ type: "success", message })
        router.push("/boards")
    }



    if(modeForm === "view")  return (
        <div className="flex gap-4 items-center">
            <h2 className="text-3xl font-bold font-bebas">{board.title}</h2>
            <div className="dropdown dropdown-bottom">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Button>Editar</Button></li>
                    <li><Button onClick={deleteBoard}>Eliminar</Button></li>
                </ul>
            </div>
        </div>
    )

   
    
}

export default BoardForm