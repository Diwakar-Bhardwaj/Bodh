

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";

export const authOptions = {
  providers: [
    // 1. GOOGLE PROVIDER
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // 2. APPLE PROVIDER
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),

    // 3. CREDENTIALS AUTHENTICATION ENGINE
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ [NextAuth] Missing entry fields.");
          return null;
        }

        const cleanEmail = credentials.email.toLowerCase().trim();
        const plainPassword = String(credentials.password);

        try {
          // Fetch user profile from the connection pool
          const [rows] = await pool.query(
            "SELECT * FROM users WHERE LOWER(email) = ? LIMIT 1",
            [cleanEmail]
          );

          if (!rows || rows.length === 0) {
            console.log(`❌ [NextAuth] User ${cleanEmail} not found.`);
            return null;
          }

          const user = rows[0];

          if (!user.password) {
            console.log("❌ [NextAuth] Missing credential password. Use social login instead.");
            return null;
          }

          const dbHashString = String(user.password).trim();

          // Cryptographic comparison evaluation check
          const isMatch = await bcrypt.compare(plainPassword, dbHashString);
          if (!isMatch) {
            console.log("❌ [NextAuth] Password mismatch.");
            return null;
          }

          console.log(`✅ [NextAuth] Authentication verified for ${cleanEmail} with role: ${user.role}`);
          
          // Return user object—The role parameter ('USER' or 'ADMIN') is captured safely here
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image || null,
            provider: "credentials",
            role: user.role || "USER", 
          };

        } catch (dbError) {
          console.error("❌ [NextAuth] Database query fault:", dbError);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    // SYNC SOCIAL SIGN-INS TO MYSQL DATABASE
    async signIn({ user, account }) {
      if (account.provider === "credentials") return true;

      try {
        const cleanEmail = user.email.toLowerCase().trim();
        const [users] = await pool.query(
          "SELECT * FROM users WHERE LOWER(email) = ?",
          [cleanEmail]
        );

        if (users.length === 0) {
          await pool.query(
            `
            INSERT INTO users (name, email, image, provider, role)
            VALUES (?, ?, ?, ?, 'USER')
            `,
            [user.name, cleanEmail, user.image || null, account.provider]
          );
        }
        return true;
      } catch (error) {
        console.error("❌ [NextAuth] Sign-in callback exception:", error);
        return false;
      }
    },

    // BIND DATA PROFILE PARAMETERS TO THE ENCRYPTED JWT WEB TOKEN
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.provider = user.provider;
      }
      return token;
    },

    // EXPOSE PARAMS TO CLIENT-SIDE HOOKS (useSession) AND INTERCEPTOR FILTERS
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role; 
        session.user.provider = token.provider;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login", // Set this to your primary app login interface path
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };