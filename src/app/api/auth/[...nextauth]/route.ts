
import { FailedLoginResponse, SuccessLoginResponse } from "@/interface"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/users/login`, {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: { "Content-Type": "application/json" }
                })

                const payload: SuccessLoginResponse | FailedLoginResponse = await response.json()

                if ('token' in payload) {
                    return {
                        id: payload.data.user._id,
                        name: payload.data.user.name,
                        email: payload.data.user.email,
                        user: payload.data.user,
                        token: payload.token
                    }
                } else {
                    throw new Error(payload.message)
                }
            }
        })
    ],

    callbacks: {
        jwt: ({ token, user, trigger, session }) => {
            if (user) {
                token.user = user.user;
                token.token = user.token;
            }
            if (trigger === "update" && session?.user) {
                token.user = {
                    ...token.user,
                    ...session.user,
                };
            }
            return token;
        },
        session: ({ session, token }) => {
            session.user = token.user;
            session.token = token.token;
            return session;
        }
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }