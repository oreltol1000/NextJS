import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  //   credentials provider is used to authenticate users with a username and password
  //  you can use other providers like Google, GitHub, etc.
  providers: [Credentials({})],
});
