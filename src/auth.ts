import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub({})],
  pages:{
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      console.log({ user, account, profile, email, credentials })
      return true
    }
  }
})