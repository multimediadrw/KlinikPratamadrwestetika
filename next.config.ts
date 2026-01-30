import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  staticPageGenerationTimeout: 0,
  experimental: {
    isrMemoryCacheSize: 0,
  },
};

export default nextConfig;
