import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/src/i18n/routing';
import { getCategories } from '@/src/lib/queries';
import Link from 'next/link';
import { Badge } from '@/src/components/ui/badge';

type Props = {
  params: { locale: Locale };
};

export default async function CategoriesPage({ params }: Props) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'navigation' });
  const categories = await getCategories(locale, { includeInactive: false });

  return (
    <div className="space-y-8 h-full">
      <div>
        <h1 className="text-4xl font-semibold text-primary">{t('categories')}</h1>
        <p className="text-muted-foreground">
          {locale === 'ar'
            ? 'اكتشف تشكيلات القهوة حسب الطابع والنكهة.'
            : 'Explore curated collections defined by aroma and terroir.'}
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/${locale}/category/${category.slug}`}
            className="rounded-[28px] border border-[#ede6df] bg-white p-6 shadow-[0_18px_50px_rgba(10,7,4,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(10,7,4,0.12)]"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-primary">
                {category.translation.name}
              </h3>
              <Badge
                variant="outline"
                className="border-white/60 bg-white/70 text-primary"
              >
                {locale === 'ar' ? 'الترتيب' : 'Order'} {category.sortOrder}
              </Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {locale === 'ar'
                ? 'تشكيلة مختارة بعناية من الحبوب المحمصة.'
                : 'A carefully calibrated range of roasted beans.'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
