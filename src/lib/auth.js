import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email and password fields.");
        }

        // Clean lowercase comparison for emails to prevent casing bugs
        const cleanEmail = credentials.email.toLowerCase().trim();

        // Query database for the admin account row
        const [users] = await pool.query(
          "SELECT id, name, email, password, role FROM users WHERE LOWER(email) = ? LIMIT 1",
          [cleanEmail]
        );

        const user = users[0];

        if (!user) {
          throw new Error("No account found matching that email address.");
        }

        // Validate password hash matches
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Incorrect password string context.");
        }

        // Strict administrative boundary gate check
        if (user.role !== "ADMIN") {
          throw new Error("Access Denied: Account lacks administrative privileges.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/admin/login"
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
};