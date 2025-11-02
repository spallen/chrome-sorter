import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Disable React strict mode for Chrome extension compatibility
  reactStrictMode: false,
  // Optimize for Chrome extension
  trailingSlash: true,
};

export default nextConfig;
