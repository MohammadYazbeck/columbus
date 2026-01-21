import {notFound} from 'next/navigation';
import {getCategoryBySlug} from '@/src/lib/queries';
import {ProductCard} from '@/src/components/cards/product-card';
import type {Locale} from '@/src/i18n/routing';

type Props = {
  params: {locale: Locale; slug: string};
};

export default async function CategoryPage({params}: Props) {
  const {locale, slug} = params;
  const category = await getCategoryBySlug(slug, locale);
  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          {locale === 'ar' ? 'فئة القهوة' : 'Coffee Category'}
        </p>
        <h1 className="text-4xl font-semibold text-primary">{category.translation.name}</h1>
      </header>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {category.products.map((product, index) => (
          <ProductCard
            key={product.id}
            locale={locale}
            product={product}
            variant={index % 2 === 0 ? 'bento' : 'standard'}
          />
        ))}
      </div>
    </div>
  );
}
