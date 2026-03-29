'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/src/i18n/routing';
import { asUploadUrl } from '@/src/lib/media';

type Media = {
  id: number;
  filePath: string;
};

type Props = {
  locale: Locale;
  product: {
    slug: string;
    isActive: boolean;
    translation: { name: string; points: any };
    media?: Media[];
  };
  variant?: 'bento' | 'standard';
};

export function ProductCard({ locale, product }: Props) {
  const imageUrl = asUploadUrl(product.media?.[0]?.filePath) ?? '/fallback-product.svg';

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
      className="group overflow-hidden rounded-lg  bg-white "
    >
      <div className="relative">
        <div className="relative aspect-[53/75] w-full">
          <Image
            src={imageUrl}
            alt={product.translation.name}
            fill
            className="object-cover transition duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-4 py-3 text-white">
          <h3 className="truncate text-sm font-semibold sm:text-base">
            {product.translation.name}
          </h3>
          <Link
            href={`/${locale}/product/${product.slug}`}
            className="shrink-0 rounded-full border border-white/70 px-3 py-1 text-[0.5rem] font-semibold uppercase transition hover:border-white hover:bg-white/10 sm:text-[0.55rem]"
          >
            {locale === 'ar' ? 'عرض التفاصيل' : 'View details'}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
