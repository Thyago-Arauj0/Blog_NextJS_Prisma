import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { findUserByCredentials } from "@/lib/user"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Credentials({
    credentials:{
      email:{},
      password:{}
    },

    authorize: async(credentials) =>{
      console.log(credentials)
      const user = await findUserByCredentials(
        credentials.email as string, 
        credentials.password as string
      )

      console.log("Credenciais recebidas:", credentials)
      console.log("Usuário retornado:", user)

      if (!user) return null;

        // converte id para string
      return {
        id: user.id.toString(),
        email: user.email ?? "",
        name: user.name ?? "",
      };
    }

  })],

    callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; 
        session.user.name = token.name
        session.user.email = token.email ?? "";
      }
      return session
    }
  },

  session: {
    strategy: "jwt"
  }
})