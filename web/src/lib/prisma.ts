import { PrismaClient } from "@prisma/client";

/**
 * Whether a database is configured. The site is designed to run without one —
 * when DATABASE_URL is absent, `prisma` is null and callers fall back to
 * logging + email so forms never break in a fresh/preview environment.
 */
export const dbEnabled = Boolean(process.env.DATABASE_URL);

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma: PrismaClient | null = dbEnabled
  ? (globalForPrisma.prisma ?? new PrismaClient())
  : null;

if (dbEnabled && prisma && process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
