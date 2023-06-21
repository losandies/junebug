import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";

import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                if (!(credentials?.email || credentials?.password)) {
                    throw new Error("Invalid Credentials");
                }
                const user = await db.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user || !user.password) {
                    throw new Error("User Doesn't Exist");
                }

                const validPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!validPassword) {
                    throw new Error("Invalid Credentials");
                }

                return user;
            },
        }),
    ],
    callbacks: {
        session({ token, session }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }

            return session;
        },
        async jwt({ token, user }) {
            const dbUser = await db.user.findFirst({
                where: {
                    email: token.email,
                },
            });

            if (!dbUser) {
                token.id = user!.id;
                return token;
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
            };
        },
        // redirect() {
        //     return "/dashboard";
        // },
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
