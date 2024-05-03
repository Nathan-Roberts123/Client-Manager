import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUserHandler } from "@/lib/services/user";
import prisma from "@/lib/prisma";
import { type NextAuthOptions } from "next-auth";

const OPTIONS: NextAuthOptions = {
  pages: {
    signIn: "/auth/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "paul@gmail.com" },
        password: {
          label: "password",
          type: "password",
          placeholder: "**********",
        },
      },

      async authorize(credentials) {
        if (credentials) {
          const { username, id } = await loginUserHandler(credentials);

          return { id, username: username };
        }
        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          username: profile.given_name,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account) {
        if (account.provider === "google") {
          if (profile) {
            const { email, sub, name: username } = profile;

            const existingUser = await prisma.user.findUnique({
              where: { email: email, username: username },
              select: {
                id: true,
              },
            });

            if (!existingUser) {
              if (email && username) {
                await prisma.user.create({
                  data: { id: sub, email, username },
                });
              } else if (email) {
                await prisma.user.create({
                  data: { id: sub, email, username: "unknown" },
                });
              } else {
                throw new Error("No email was found");
              }
            }

            return true;
          } else {
            throw new Error("Google Account Does Not Have Profile");
          }
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user)
        return {
          ...token,
          id: user.id,
          username: user.username,
        };
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
        },
      };
    },
  },
};

export default OPTIONS;
