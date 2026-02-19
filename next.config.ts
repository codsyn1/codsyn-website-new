import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,          // Proper URL handling
  images: {
    unoptimized: true          // Image optimization
  }
};

export default nextConfig;
