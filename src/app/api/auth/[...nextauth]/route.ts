import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import { authOption } from "./options";

const handler = NextAuth(authOption)

export {handler as GET, handler as POST}