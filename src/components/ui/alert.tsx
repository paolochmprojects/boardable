

interface AlertProps {
    message: string
    type: "success" | "warning" | "error"
}
const Alert = ({ message, type }: AlertProps) => {
    return (
        <div>{message}</div>
    )
}

export default Alert