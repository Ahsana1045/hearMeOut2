import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import type { SessionStrategy } from "next-auth";

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" as SessionStrategy },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;
                const user = await prisma.user.findUnique({
                    where: { username: credentials.username },
                });
                if (!user) return null;
                const isValid = await compare(credentials.password, user.password);
                if (!isValid) return null;
                return { id: user.id, name: user.username, email: user.email };
            },
        }),
    ],
    pages: {
        signIn: "/", // or your custom sign-in page
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
