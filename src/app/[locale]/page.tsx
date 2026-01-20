import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/src/i18n/routing';
import { Hero } from '@/src/components/sections/hero';
import { ProductCard } from '@/src/components/cards/product-card';
import { CategoryChip } from '@/src/components/cards/category-chip';
import { AboutShowcase } from '@/src/components/sections/about-showcase';
import { getCategories, getFeaturedProducts, getHeroImages } from '@/src/lib/queries';

type Props = {
  params: { locale: Locale };
};

export default async function HomePage({ params }: Props) {
  const { locale } = params;
  const tHero = await getTranslations({ locale, namespace: 'hero' });
  const tHome = await getTranslations({ locale, namespace: 'home' });
  const [heroImages, categories, featured] = await Promise.all([
    getHeroImages(),
    getCategories(locale, { includeInactive: false }),
    getFeaturedProducts(locale)
  ]);

  return (
    <div className="space-y-16">
      <Hero
        title={tHero('title')}
        subtitle={tHero('subtitle')}
        cta={tHero('cta')}
        href={`/${locale}/categories`}
        images={heroImages}
        locale={locale}
      />

      <AboutShowcase locale={locale} />

      <section className="space-y-6 rounded-[36px]   p-6  md:p-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-primary">{tHome('featured')}</h2>
            <p className="text-muted-foreground">{tHome('story')}</p>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((product, index) => (
            <ProductCard
              key={product.id}
              locale={locale}
              product={product}
              variant={index % 3 === 0 ? 'bento' : 'standard'}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-[32px] border border-[#efe7df] bg-white/90 p-6 shadow-[0_30px_60px_rgba(0,0,0,0.05)] md:p-10">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold text-primary">
            {tHome('categoriesTitle')}
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              locale={locale}
              slug={category.slug}
              label={category.translation.name}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
