/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'ihexa',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws'
    };
  },
  async run() {
    const databaseUrl = new sst.Secret('DatabaseUrl');

    new sst.aws.Nextjs('IHexa', {
      environment: {
        DATABASE_URL: databaseUrl.value,
        NEXT_PUBLIC_MATOMO_URL: process.env['NEXT_PUBLIC_MATOMO_URL'] ?? '',
        NEXT_PUBLIC_MATOMO_SITE_ID: process.env['NEXT_PUBLIC_MATOMO_SITE_ID'] ?? '',
        NEXT_PUBLIC_SENTRY_DSN: process.env['NEXT_PUBLIC_SENTRY_DSN'] ?? '',
        SENTRY_DSN: process.env['SENTRY_DSN'] ?? ''
      }
    });
  }
});
