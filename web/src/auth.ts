import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

/**
 * Studio owners allowlist. Each owner's password can be overridden by an env var
 * (recommended for production so secrets aren't committed to the repo); the
 * literal fallback keeps things working out of the box. Sessions are stateless
 * JWTs (no auth tables needed). Set a strong AUTH_SECRET in production.
 */
const OWNERS: { email: string; password: string }[] = [
  {
    email: process.env.ADMIN_EMAIL ?? "thamothamotharan35@gmail.com",
    password: process.env.ADMIN_PASSWORD ?? "thamo@123",
  },
  {
    email: "crmari21052000@gmail.com",
    password: process.env.ADMIN_PASSWORD_2 ?? "maari@123",
  },
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
        if (owner && password === owner.password) {
          return { id: owner.email, name: "Studio Owner", email: owner.email };
        }
        return null;
      },
    }),
  ],
});
