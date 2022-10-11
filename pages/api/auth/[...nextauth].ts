import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth-helper";
import { getUserByEmail } from "../../../lib/dao/user-dao";
import { connectMongo } from "../../../lib/mongo-helper";

export const authOption: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    jwt: {
        maxAge: 60 * 60     // 1 hour in sec
    },
    secret: process.env.AUTH_SECRET,
    providers: [CredentialsProvider({
        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            console.log('.. credentials = ', credentials)
            const client = await connectMongo();
            if (!credentials?.email || !credentials?.password) {
                throw new Error("signin failed.")
            }
            const user = await getUserByEmail(client, credentials.email);
            if (!user) {
                throw new Error("no user found.");
            }

            const isValid = await verifyPassword(credentials.password, user.password);

            if (!isValid) {
                throw new Error("signin failed.")
            }
            await client.close();
            return { email: user.email, name: user.fullname }
        }
    })]
}

export default NextAuth(authOption);
