import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import prisma from "./lib/db"
import { z } from "zod"
import { compare } from "bcryptjs"
import { Provider, User } from "@prisma/client"


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

        const isPasswordValid = await compare(password, userInDB.password as string)

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
        let userExist = await prisma.user.findUnique({
          where: {
            email: user.email!
          }
        })

        if (!userExist) {

          userExist = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name!,
              image: user.image!,
              provider: [Provider.GITHUB],
              emailVerified: true
            }
          })

        } else {

          if (!userExist.provider.includes(Provider.GITHUB)) {
            userExist = await prisma.user.update({
              where: {
                email: user.email!
              },
              data: {
                provider: {
                  push: Provider.GITHUB
                },
                emailVerified: true
              }
            })
          }
        }
        const { password: _, ...data } = userExist
        token.data = data
      }

      if (account?.provider === "credentials") {
        token.data = user
      }

      return token
    },

    async session({ session, token }) {

      const {id, email, name, image, provider, role } = token.data as User
    
      session.user.email = email
      session.user.id = id
      session.user.name = name
      session.user.image = image ? image : undefined
      session.user.provider = provider
      session.user.role = role

      return session
    }
  }
})