/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' for development
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Commented out basePath for local development
  // basePath: '/Analytics-Dashboards',
  // assetPrefix: '/Analytics-Dashboards/',
};

export default nextConfig;
