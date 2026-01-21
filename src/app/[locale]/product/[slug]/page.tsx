import {notFound} from 'next/navigation';
import Image from 'next/image';
import type {Locale} from '@/src/i18n/routing';
import {getProductBySlug, getSuggestedProducts} from '@/src/lib/queries';
import {asUploadUrl} from '@/src/lib/media';
import {AvailabilityBadge} from '@/src/components/cards/availability-badge';
import {ProductCard} from '@/src/components/cards/product-card';

type Props = {
  params: {locale: Locale; slug: string};
};

export default async function ProductPage({params}: Props) {
  const {locale, slug} = params;
  const product = await getProductBySlug(slug, locale);
  if (!product) {
    notFound();
  }
  const suggestions = await getSuggestedProducts(product.id, product.categoryId, locale);
  const points = (product.translation.points as {label: string; value: string}[]) ?? [];

  return (
    <div className="space-y-12">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="grid gap-6">
          {product.media.length === 0 ? (
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-[#f8f4ef]">
              <div className="relative aspect-[85/120] w-full">
                <Image
                  src="/fallback-product.svg"
                  alt={product.translation.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ) : (
            product.media.map((media) => (
              <div key={media.id} className="relative overflow-hidden rounded-3xl border border-white/20 bg-[#f8f4ef]">
                <div className="relative aspect-[85/120] w-full">
                  <Image
                    src={asUploadUrl(media.filePath) ?? '/fallback-product.svg'}
                    alt={product.translation.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))
          )}
        </div>
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {product.category.translation.name}
          </p>
          <h1 className="text-4xl font-semibold text-primary">{product.translation.name}</h1>
          <AvailabilityBadge
            active={product.isActive}
            label={
              product.isActive
                ? locale === 'ar'
                  ? 'متوفر'
                  : 'Available'
                : locale === 'ar'
                  ? 'غير متاح'
                  : 'Unavailable'
            }
          />
          <ul className="space-y-3 rounded-3xl border border-white/30 bg-white/70 p-6">
            {points.map((point, index) => (
              <li key={`${point.label}-${index}`} className="text-sm text-muted-foreground">
                <span className="font-semibold text-primary">{point.label}:</span> {point.value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {suggestions.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">
            {locale === 'ar' ? 'اقتراحات من نفس الفئة' : 'More from this category'}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {suggestions.map((suggestion) => (
              <ProductCard key={suggestion.id} locale={locale} product={suggestion} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
