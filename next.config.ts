import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cpus: 1,
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;