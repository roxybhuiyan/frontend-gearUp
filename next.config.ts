import type { NextConfig } from "next";

const backendApi =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }] },
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${backendApi}/:path*` }];
  },
};
export default nextConfig;
