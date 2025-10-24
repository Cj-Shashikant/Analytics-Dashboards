/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly set as standard Next.js app (not static export)
  output: 'standalone',
  trailingSlash: false,
  // Disable static optimization for problematic pages
  experimental: {
    outputFileTracingRoot: undefined,
  },
  // Standard Next.js app configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ensure proper image handling for Vercel
  images: {
    domains: [],
    unoptimized: false,
  },
  // Ensure proper routing
  async rewrites() {
    return [];
  },
};

export default nextConfig;
