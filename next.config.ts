import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // enable Partial Prerendering(static rendering and dynamic rendering) for this route
  cacheComponents: true,
};

export default nextConfig;
