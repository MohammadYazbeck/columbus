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
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com'
      }
    ]
  }
};

export default withNextIntl(config);
