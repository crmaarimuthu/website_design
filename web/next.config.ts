import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All media is local under /public/media — no remote patterns needed.
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
