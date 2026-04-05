import Link from 'next/link';
import {Facebook, Instagram} from 'lucide-react';
import { Locale } from '@/src/i18n/routing';
import {siteSocials} from '@/src/lib/site-contact';

type Props = {
  locale: Locale;
  tagline: string;
  links: {
    contact: string;
    careers: string;
  };
};

export function Footer({ locale, tagline, links }: Props) {
  const iconMap = {
    facebook: Facebook,
    instagram: Instagram
  } as const;

  return (
    <footer className="border-t border-white/20 bg-black text-white">
      <div className="container flex flex-col gap-6 py-10 text-center text-sm md:flex-row md:items-end md:justify-between md:text-left">
        <div className="space-y-3">
          <p>{tagline}</p>
          <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            {siteSocials.map((social) => (
              (() => {
                const Icon = iconMap[social.id];
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-[#ab1d1d] hover:bg-[#ab1d1d]"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                );
              })()
            ))}
          </div>
        </div>
        <div className="flex gap-4 text-xs uppercase">
          <Link
            href={`/${locale}/contact`}
            className="border-b border-transparent pb-1 transition hover:border-[#ab1d1d] hover:text-[#ab1d1d]"
          >
            {links.contact}
          </Link>
          <Link
            href={`/${locale}/careers`}
            className="border-b border-transparent pb-1 transition hover:border-[#ab1d1d] hover:text-[#ab1d1d]"
          >
            {links.careers}
          </Link>
        </div>
      </div>
    </footer>
  );
}
