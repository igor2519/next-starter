const { withSentryConfig } = require('@sentry/nextjs');

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'sameorigin',
  },
  {
    key: 'Referrer-Policy',
    value: 'no-referrer-when-downgrade',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-XSS-Protection',
    value: '1',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
];

/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

// Sentry setup
const shouldEnableSentry =
  process.env.NODE_ENV === 'production' &&
  process.env.SENTRY_DSN &&
  process.env.NEXT_PUBLIC_SENTRY_DSN &&
  process.env.SENTRY_ORG &&
  process.env.SENTRY_PROJECT &&
  process.env.SENTRY_AUTH_TOKEN;

/** @type {import('@sentry/nextjs').sentryWebpackPluginOptions} */
const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = shouldEnableSentry
  ? withSentryConfig(moduleExports, sentryWebpackPluginOptions)
  : moduleExports;
