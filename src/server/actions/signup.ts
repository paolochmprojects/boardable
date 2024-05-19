"use server"

import prisma from "@/lib/db"


interface UserSignUp{
    name: string
    email: string
    password: string
}

export const SignUpCredentials = async ({ email, name, password }:UserSignUp) => {
    console.log("SignUpCredentials", { email, name, password })
}