"use server"

import { signIn } from "@/auth"


export const SignInWithGithub = async () => {
    await signIn('github')
}