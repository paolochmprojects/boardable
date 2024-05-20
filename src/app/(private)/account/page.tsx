import { auth } from "@/auth"
import { redirect } from "next/navigation"
import AccountForm from "./ui/account-form"

const ProfilePage = async () => {

    const session = await auth()
    if (!session) return redirect("/signin")
    
        const { email, name } = session.user

    return (
        <div className="max-w-screen-md mx-auto">
            <h1 className="text-4xl font-bold font-bebas">
                Mi cuenta
            </h1>
            <div className="flex justify-center mt-4">
                <AccountForm userData={{ email, name }} />
            </div>
        </div>
    )
}

export default ProfilePage