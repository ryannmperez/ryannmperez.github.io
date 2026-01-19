/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable API routes for visitor tracking
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
