/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  // Disable static export
  experimental: {
    isrMemoryCacheSize: 0,
  },
};
module.exports = nextConfig;
