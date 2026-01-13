import Link from 'next/link';
import {Locale} from '@/src/i18n/routing';
import {cn} from '@/src/lib/utils';

type Props = {
  locale: Locale;
  slug: string;
  label: string;
  active?: boolean;
};

export function CategoryChip({locale, slug, label, active}: Props) {
  return (
    <Link
      href={`/${locale}/category/${slug}`}
      className={cn(
        'rounded-2xl px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        active
          ? 'bg-gradient-to-r from-[#3b2119] via-[#29130f] to-[#120905] text-white shadow-[0_12px_30px_rgba(18,9,5,0.25)]'
          : 'border border-transparent bg-white/60 text-primary shadow-inner hover:border-[#d6c5b6] hover:text-primary'
      )}
    >
      {label}
    </Link>
  );
}
