import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: process.env.NEXT_PUBLIC_HOME_URL!,
        permanent: false,
      },
    ];
  }
};

export default nextConfig;
