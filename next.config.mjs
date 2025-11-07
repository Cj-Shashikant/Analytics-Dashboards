import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  // Add webpack alias for '@' to point to 'src' for consistent resolution
  webpack: config => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

export default nextConfig;
