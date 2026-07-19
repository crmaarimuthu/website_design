import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

/**
 * Studio owners allowlist. Emails are non-secret and live in code; each owner's
 * password comes from its own env var, falling back to the shared ADMIN_PASSWORD.
 * Sessions are stateless JWTs (no auth tables needed). Set a strong AUTH_SECRET
 * in production.
 */
const OWNERS: { email: string; passwordEnv: string }[] = [
  { email: process.env.ADMIN_EMAIL ?? "thamothamotharan35@gmail.com", passwordEnv: "thamo@123" },
  { email: "crmari21052000@gmail.com", passwordEnv: "maari@123" },
];

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
        const email = String(credentials?.email ?? "").toLowerCase().trim();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        const owner = OWNERS.find((o) => o.email.toLowerCase() === email);
        if (!owner) return null;

        // Per-owner password if set, else the shared ADMIN_PASSWORD.
        const expected = process.env[owner.passwordEnv] ?? process.env.ADMIN_PASSWORD;
        if (expected && password === expected) {
          return { id: owner.email, name: "Studio Owner", email: owner.email };
        }
        return null;
      },
    }),
  ],
});
