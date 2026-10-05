import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: {
      allowedOrigins: [
        "*.app.github.dev",
      ],
    },
  },
};

export default nextConfig;