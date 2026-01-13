import {MetadataRoute} from 'next';
import {prisma} from '@/src/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://colombus.local';
  const locales: ('en' | 'ar')[] = ['en', 'ar'];
  const categories = await prisma.category.findMany({select: {slug: true}});
  const products = await prisma.product.findMany({select: {slug: true}});
  const staticPaths = ['', '/categories', '/branches', '/about', '/contact', '/careers'];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    staticPaths.forEach((segment) => {
      entries.push({
        url: `${baseUrl}/${locale}${segment}`,
        lastModified: new Date()
      });
    });
    categories.forEach((category) => {
      entries.push({
        url: `${baseUrl}/${locale}/category/${category.slug}`,
        lastModified: new Date()
      });
    });
    products.forEach((product) => {
      entries.push({
        url: `${baseUrl}/${locale}/product/${product.slug}`,
        lastModified: new Date()
      });
    });
  }

  return entries;
}
