import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "https://alivio2.vercel.app/api/v1/**/**/"
      },
    ],
  },
};

export default nextConfig;
