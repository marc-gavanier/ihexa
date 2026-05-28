import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['pg'],
  outputFileTracingIncludes: {
    '/*': ['./public/locales/**/*']
  },
  experimental: {
    optimizePackageImports: ['react-icons', 'effect', '@tanstack/react-form', 'motion']
  }
};

export default process.env.ENV === 'prod' ? withSentryConfig(nextConfig) : nextConfig;
