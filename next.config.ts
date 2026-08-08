import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  experimental: {
    cpus: 1,
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },

};

export default nextConfig;