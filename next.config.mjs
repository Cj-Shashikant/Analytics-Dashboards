/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/Analytics-Dashboards' : '',
  assetPrefix: isProd ? '/Analytics-Dashboards/' : '',
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
