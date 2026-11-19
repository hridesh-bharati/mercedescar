
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [65, 70, 75],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
