"use client"
import { useAlerts } from '@/store/alerts'
import clsx from 'clsx'
import { useEffect } from 'react'
import { CgDanger } from "react-icons/cg";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoWarningOutline, IoCloseCircleOutline } from "react-icons/io5";


const ALERT_DISPLAY_TIME = 3000
const Alerts = () => {

    const { alerts, removeAlert } = useAlerts()

    useEffect(() => {
        const timers = alerts.map((_, index) =>
            setTimeout(() => {
                removeAlert(index)
            }, ALERT_DISPLAY_TIME)
        )
        return () => timers.forEach(timer => clearTimeout(timer))
    }, [alerts, removeAlert])

    return (
        <div className="absolute flex flex-col-reverse gap-6 bottom-6 right-6">
            {alerts.map((alert, index) => (
                <div
                    key={index}
                    className={clsx(
                        "flex items-center gap-2 w-72 alert",
                        alert.type === "success" && "alert-success",
                        alert.type === "warning" && "alert-warning",
                        alert.type === "error" && "alert-error")}
                >
                    {alert.type === "success" && <FaRegCircleCheck />}
                    {alert.type === "warning" && <IoWarningOutline />}
                    {alert.type === "error" && <CgDanger />}
                    <span className="flex-grow text-sm">{alert.message}</span>
                    <IoCloseCircleOutline onClick={() => removeAlert(index)} />
                </div>
            ))}
        </div>
    )
}

export default Alerts