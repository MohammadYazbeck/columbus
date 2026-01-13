import Link from 'next/link';
import { Locale } from '@/src/i18n/routing';

type Props = {
  locale: Locale;
  tagline: string;
};

export function Footer({ locale, tagline }: Props) {
  return (
    <footer className="border-t border-white/20 bg-black text-white">
      <div className="container flex flex-col items-center gap-4 py-10 text-center text-sm md:flex-row md:justify-between md:text-left">
        <p>{tagline}</p>
        <div className="flex gap-4 text-xs uppercase tracking-[0.2em]">
          <Link href={`/${locale}/contact`}>Contact</Link>
          <Link href={`/${locale}/careers`}>Careers</Link>
        </div>
      </div>
    </footer>
  );
}
