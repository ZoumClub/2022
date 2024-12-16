/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.car-logos.org',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  swcMinify: true,
};

module.exports = nextConfig;