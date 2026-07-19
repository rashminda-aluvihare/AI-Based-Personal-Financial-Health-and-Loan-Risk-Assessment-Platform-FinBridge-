import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
