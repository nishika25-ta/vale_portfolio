/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    formats: ['image/webp'],
    unoptimized: true,
  },
};

export default nextConfig;
