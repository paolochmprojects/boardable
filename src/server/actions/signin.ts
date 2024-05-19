"use server"

import { signIn } from "@/auth"
import { UserSignIn } from "@/schemas/signin.schema"

export const SignInCredentials = async (data: UserSignIn) => {
    console.log("SignInCredentials", data)
}