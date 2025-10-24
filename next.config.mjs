/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly disable static export
  output: undefined,
  trailingSlash: false,
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
};

export default nextConfig;
