import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['pg'],
  experimental: {
    optimizePackageImports: ['react-icons', 'effect', '@tanstack/react-form', 'motion']
  }
};

export default nextConfig;
