"use server"

import { signIn } from "@/auth"


export const SignInCredentials = async () => {
    signIn("credentials")
}