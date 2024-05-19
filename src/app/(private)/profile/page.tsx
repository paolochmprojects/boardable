import { auth } from "@/auth"
import { redirect } from "next/navigation"

const ProfilePage = async () => {

    const session = await auth()
    if (!session) return redirect("/signin")
    console.log(session)
    return (
        <div>ProfilePage</div>
    )
}

export default ProfilePage