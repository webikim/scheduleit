import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth-helper";
import { getUserByEmail } from "../../../lib/auth/auth-dao";
import { connectMongo } from "../../../lib/mongo-helper";

export default NextAuth({
    session: {
        strategy: "jwt"
    },
    jwt: {
        maxAge: 60 * 60     // 1 hour in sec
    },
    providers: [CredentialsProvider({
        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password"}
        },
        async authorize(credentials) {
            const client = await connectMongo();
            const user = await getUserByEmail(client, credentials.email);
            if (!user) {
                throw new Error("no user found.");
            }

            const isValid = await verifyPassword(credentials.password, user.password);
            
            if (!isValid) {
                throw new Error("signin failed.")
            }
            client.close();
            return { email: user.email }
        }
    }) ]
});