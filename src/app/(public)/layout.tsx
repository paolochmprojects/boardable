import { auth } from "@/auth"
import Footer from "@/components/footer"
import NavBar from "@/components/ui/navbar"
import { redirect } from "next/dist/server/api-utils"

export const revalidate = 0
interface PublicLayoutProps {
    children: React.ReactNode
}
const PublicLayout = async ({ children }: PublicLayoutProps) => {

    const session = await auth()

    const authenticated = !!session

    let userImage = session?.user.image 

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar authenticated={authenticated} userImage={userImage}/>
            <main className="flex items-center justify-center flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default PublicLayout