import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    password: string;
    fullname: string;
    phone: number | null;
    photo: string | null;
    isAdmin: boolean;
    createdAt: Date;
  }

  interface Session {
    user?: {
      email?: string;
      fullname?: string;
      photo?: string;
      isAdmin?: boolean;
      id: string;
      accessToken?: string;
      phone?: string;
    };
  }

  interface JWT {
    email?: string;
    fullname?: string;
    photo?: string;
    isAdmin?: boolean;
    id: string;
    accessToken?: string;
    phone?: string;
  }
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const user = await db.user.findUnique({
            where: {
              email,
            },
          });
          if (!user) {
            return null;
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (account?.provider === "credentials" && user) {
        token.email = user.email;
        token.photo = user.photo;
        token.fullname = user.fullname;
        token.id = user.id;
        token.phone = user.phone;
        token.isAdmin = user.isAdmin;
      }

      if (account?.provider === "google" && user) {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(user.name || "", salt);

        const data = {
          fullname: user.name || "",
          email: user.email,
          password: hashPassword,
          photo: user.image || "",
        };

        const userDB = await db.user.findUnique({
          where: { email: data.email },
        });

        if (!userDB) {
          const newUser = await db.user.create({
            data: data,
          });

          token.email = data.email;
          token.fullname = newUser.fullname || data.fullname;
          token.isAdmin = newUser.isAdmin;
          token.photo = newUser.photo || data.photo;
          token.phone = newUser.phone;
          token.id = newUser.id;
        } else {
          token.email = data.email;
          token.fullname = userDB.fullname || data.fullname;
          token.isAdmin = userDB.isAdmin;
          token.photo = userDB.photo || data.photo;
          token.phone = userDB.phone;
          token.id = userDB.id;
        }
      }

      if (trigger === "update" && session) {
        token.photo = session.user?.photo;
        token.fullname = session.user?.fullname;
        token.email = session.user?.email;
        token.phone = session.user?.phone;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) || "";
        session.user.email = (token.email as string) || "";
        session.user.fullname = (token.fullname as string) || "";
        session.user.photo = (token.photo as string) || "";
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.phone = (token.phone as string) || "";

        const accsesToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || "", {
          algorithm: "HS256",
        });

        session.user.accessToken = accsesToken;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
  },
};

export default authOptions;
