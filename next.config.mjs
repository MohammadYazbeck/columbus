import nextIntl from 'next-intl/plugin';

const withNextIntl = nextIntl('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb'
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  }
};

export default withNextIntl(config);
