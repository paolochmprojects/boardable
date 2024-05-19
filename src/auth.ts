import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import prisma from "./lib/db"
import { z } from "zod"
import { compare } from "bcryptjs"


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      authorize: async (credentials) => {


        const { success, data } = z.object({
          email: z.string().email(),
          password: z.string().min(8),
        }).safeParse(credentials)

        if (!success) return null

        const { email, password } = data

        const userInDB = await prisma.user.findUnique({
          where: {
            email: email.toLocaleLowerCase().trim()
          }
        })

        if (!userInDB) return null

        const isPasswordValid = await compare(password, userInDB.password)

        if (!isPasswordValid) return null

        const { password: _, ...user } = userInDB

        return user
      }
    })],
  pages: {
    signIn: "/signin",
    newUser: "/signup",
  },

  callbacks: {
    async jwt({ token, user, account }) {

      if (account?.provider === "github") {
        console.log(user)
      }

      return token

    }
  }
})