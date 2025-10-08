/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '/Analytics-Dashboards',
  assetPrefix: '/Analytics-Dashboards/',
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
