/** @type {import('next').NextConfig} */
const basePath = process.env.NODE_ENV === 'production' ? '/property-nextjs' : '';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
