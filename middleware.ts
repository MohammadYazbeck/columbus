import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: true
});

export const config = {
  matcher: [
    '/((?!_next|api/admin|admin|uploads|favicon.ico|robots.txt|sitemap.xml).*)'
  ]
};
