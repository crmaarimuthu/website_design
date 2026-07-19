import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

/**
 * Single-owner admin auth. Credentials are checked against ADMIN_EMAIL /
 * ADMIN_PASSWORD env vars; sessions are stateless JWTs (no auth tables needed).
 * Set a strong AUTH_SECRET in production.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  // A real secret is REQUIRED in production (build/runtime will error without it,
  // which is the safe default). A throwaway dev secret keeps local dev working.
  secret:
    process.env.AUTH_SECRET ??
    (process.env.NODE_ENV === "production" ? undefined : "dev-only-insecure-secret"),
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: (credentials) => {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (!adminEmail || !adminPassword) return null;
        if (credentials?.email === adminEmail && credentials?.password === adminPassword) {
          return { id: "admin", name: "Studio Admin", email: adminEmail };
        }
        return null;
      },
    }),
  ],
});
