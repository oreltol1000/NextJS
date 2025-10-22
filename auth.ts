// this file used create the authentication functions for the server-side
// will use signIn and signOut functions to authenticate users.

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // validate email and password schema
        const parsedCredentials = loginSchema.safeParse(credentials);
        if (parsedCredentials.success) {
          // get encrypted password from database
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          // compare password with encrypted password
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
          else return null;
        }

        return null;
      },
    }),
  ],
});
