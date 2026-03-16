import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['react-icons', 'framer-motion', '@tanstack/react-form', '@react-email/components', 'effect']
  }
};

export default nextConfig;
