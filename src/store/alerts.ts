import {create} from "zustand";


interface Alert {
    message: string
    type: "success" | "warning" | "error"
}

interface AlertsState {
    alerts: Alert[]
    addAlert: (alert: Alert) => void
    removeAlert: (index: number) => void
}

export const useAlerts = create<AlertsState>((set) => ({
    alerts: [],
    addAlert: (alert: Alert) => set((state) => ({alerts: [...state.alerts, alert]})),
    removeAlert: (index: number) => set((state) => ({
        alerts: state.alerts.filter((_, i) => i !== index)
    })),
}))


