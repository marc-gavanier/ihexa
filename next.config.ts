import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['react-icons', 'effect', '@tanstack/react-form', 'motion']
  }
};

export default nextConfig;
