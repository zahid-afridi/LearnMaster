// src/lib/auth.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Call your backend API that validates credentials
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: credentials.email, password: credentials.password }),
                });
                const user = await res.json();
                if (res.ok && user) {
                    // return an object that will become `session.user`
                    return { id: user.id, name: user.name, email: user.email };
                }
                return null;
            },
        }),
    ],

    // Choose session strategy: "jwt" or "database"
    session: { strategy: "jwt" },

    // callbacks, pages, adapter etc. can go here
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
