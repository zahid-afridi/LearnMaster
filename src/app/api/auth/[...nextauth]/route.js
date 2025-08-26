import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import pool from "../../../../../utils/db";

const handler = NextAuth({
    providers: [
        // 🔹 Google OAuth Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        // 🔹 Email + Password Provider
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                const result = await pool.query("SELECT * FROM users WHERE email=$1", [
                    credentials.email,
                ]);

                if (result.rows.length === 0) {
                    throw new Error("No account found with this email");
                }

                const user = result.rows[0];
                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    throw new Error("Incorrect password");
                }

                return {
                    id: user.user_id,
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],

    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        // Handle Google login and store profile data
        async signIn({ user, account, profile }) {
            if (account.provider === "google") {
                const result = await pool.query(
                    "SELECT * FROM users WHERE email=$1",
                    [user.email]
                );

                if (result.rows.length === 0) {
                    // 🔹 Insert new user into users table
                    const insertUserQuery = `
            INSERT INTO users (email, name)
            VALUES ($1, $2)
            RETURNING user_id, email, name
          `;
                    const userValues = [user.email, user.name || profile.name];
                    const { rows } = await pool.query(insertUserQuery, userValues);

                    const newUserId = rows[0].user_id;
                    user.id = newUserId;

                    // 🔹 Insert into user_profiles table
                    const insertProfileQuery = `
            INSERT INTO user_profiles (user_id, profile_image_url)
            VALUES ($1, $2)
          `;
                    const profileValues = [newUserId, profile.picture];
                    await pool.query(insertProfileQuery, profileValues);
                } else {
                    // Existing user
                    user.id = result.rows[0].user_id;

                    // Optionally update profile image
                    await pool.query(
                        "UPDATE user_profiles SET profile_image_url=$1 WHERE user_id=$2",
                        [profile.picture, user.id]
                    );
                }
            }

            return true;
        },

        // Attach user data to JWT
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },

        // Attach JWT data to session
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
            }
            return session;
        },
    },

    pages: {
        signIn: "/login",
    },
});

export { handler as GET, handler as POST };
