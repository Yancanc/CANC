import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "win98icons.alexmeub.com",
      },
    ],
  },
};

export default nextConfig;
