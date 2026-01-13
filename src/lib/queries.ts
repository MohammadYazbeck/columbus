import {prisma} from './prisma';
import type {Locale} from '../i18n/routing';

function getTranslation<T extends {locale: string}>(items: T[], locale: Locale) {
  const exact = items.find((item) => item.locale === locale);
  if (exact) return exact;
  return items.find((item) => item.locale === 'en') ?? items[0];
}

export async function getHeroImages() {
  return prisma.heroImage.findMany({
    where: {isActive: true},
    orderBy: {sortOrder: 'asc'}
  });
}

export async function getCategories(locale: Locale, opts?: {includeInactive?: boolean}) {
  const categories = await prisma.category.findMany({
    where: opts?.includeInactive ? undefined : {isActive: true},
    include: {translations: true},
    orderBy: {sortOrder: 'asc'}
  });
  return categories.map((category) => ({
    ...category,
    translation: getTranslation(category.translations, locale)
  }));
}

export async function getCategoryBySlug(slug: string, locale: Locale) {
  const category = await prisma.category.findUnique({
    where: {slug},
    include: {
      translations: true,
      products: {
        where: {isActive: true},
        include: {translations: true, media: true},
        orderBy: {sortOrder: 'asc'}
      }
    }
  });
  if (!category || (!category.isActive && locale !== 'en')) return null;
  return {
    ...category,
    translation: getTranslation(category.translations, locale),
    products: category.products.map((product) => ({
      ...product,
      translation: getTranslation(product.translations, locale)
    }))
  };
}

export async function getProductBySlug(slug: string, locale: Locale) {
  const product = await prisma.product.findUnique({
    where: {slug},
    include: {
      translations: true,
      media: {orderBy: {sortOrder: 'asc'}},
      category: {include: {translations: true}}
    }
  });
  if (!product || !product.isActive) return null;
  const categoryTranslation = getTranslation(product.category.translations, locale);
  return {
    ...product,
    translation: getTranslation(product.translations, locale),
    category: {...product.category, translation: categoryTranslation}
  };
}

export async function getSuggestedProducts(productId: number, categoryId: number, locale: Locale) {
  const suggestions = await prisma.product.findMany({
    where: {
      categoryId,
      isActive: true,
      NOT: {id: productId}
    },
    include: {translations: true, media: true},
    orderBy: {sortOrder: 'asc'},
    take: 4
  });
  return suggestions.map((product) => ({
    ...product,
    translation: getTranslation(product.translations, locale)
  }));
}

export async function getFeaturedProducts(locale: Locale) {
  const products = await prisma.product.findMany({
    where: {isActive: true, isFeatured: true},
    include: {translations: true, media: true, category: {include: {translations: true}}},
    orderBy: [{featuredOrder: 'asc'}, {sortOrder: 'asc'}],
    take: 6
  });
  return products.map((product) => ({
    ...product,
    translation: getTranslation(product.translations, locale),
    category: {
      ...product.category,
      translation: getTranslation(product.category.translations, locale)
    }
  }));
}

export async function getBranches(locale: Locale) {
  const branches = await prisma.branch.findMany({
    where: {isActive: true},
    include: {translations: true},
    orderBy: {sortOrder: 'asc'}
  });
  return branches.map((branch) => ({
    ...branch,
    translation: getTranslation(branch.translations, locale)
  }));
}

export async function getCareerSlots(locale: Locale) {
  const careers = await prisma.careerSlot.findMany({
    where: {isActive: true},
    include: {translations: true},
    orderBy: {sortOrder: 'asc'}
  });
  return careers.map((career) => ({
    ...career,
    translation: getTranslation(career.translations, locale)
  }));
}
