import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // Allow Sanity CDN images
  },
};

export default nextConfig;



