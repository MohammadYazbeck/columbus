'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Locale } from '@/src/i18n/routing';
import { LocaleSwitcher } from './locale-switcher';
import { cn } from '@/src/lib/utils';

type NavCategory = {
  slug: string;
  label: string;
};

type Props = {
  locale: Locale;
  messages: Record<string, string>;
  categories: NavCategory[];
};

type NavItem = {
  key: string;
  path: (locale: Locale) => string;
  dropdown?: boolean;
};

const navItems: NavItem[] = [
  { key: 'home', path: (locale: Locale) => `/${locale}` },
  { key: 'products', path: (locale: Locale) => `/${locale}/categories`, dropdown: true },
  { key: 'branches', path: (locale: Locale) => `/${locale}/branches` },
  { key: 'about', path: (locale: Locale) => `/${locale}/about` },
  { key: 'contact', path: (locale: Locale) => `/${locale}/contact` },
  { key: 'careers', path: (locale: Locale) => `/${locale}/careers` }
];

export function Navbar({ locale, messages, categories }: Props) {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  const openProducts = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsProductsOpen(true);
  };

  const closeProducts = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setIsProductsOpen(false), 120);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-white/70 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center">
          <Image
            src="/logo.png"
            alt="Colombus Coffee"
            width={280}
            height={90}
            className="h-16 w-auto object-contain"
            priority
          />
          <span className="sr-only">Colombus Coffee</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {navItems.map((item) => {
            if (item.dropdown) {
              return (
                <div
                  key={item.key}
                  className="relative inline-flex items-center"
                  onMouseEnter={openProducts}
                  onMouseLeave={closeProducts}
                >
                  <Link
                    href={item.path(locale)}
                    className={cn(
                      'relative inline-flex items-center overflow-hidden text-sm text-[#6d5d4b] transition-colors duration-300',
                      'uppercase tracking-[0.1em]',
                      'after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-[#aa1d1d] after:to-[#ff0000] after:opacity-0 after:transition-all after:duration-300 after:ease-out hover:text-[#1b140f] hover:after:left-0 hover:after:w-full hover:after:opacity-100'
                    )}
                  >
                    {messages.products ?? messages.categories ?? 'Products'}
                  </Link>
                  <div
                    className={cn(
                      'absolute left-1/2 top-full z-30 mt-2 w-72 -translate-x-1/2 rounded-2xl border border-white/30 bg-white/95 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-200',
                      isProductsOpen
                        ? 'pointer-events-auto translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-2 opacity-0'
                    )}
                    onMouseEnter={openProducts}
                    onMouseLeave={closeProducts}
                  >
                    <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                      {locale === 'ar' ? 'الفئات' : 'Categories'}
                    </p>
                    <div className="mt-3 grid gap-2">
                      {categories.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/${locale}/category/${category.slug}`}
                          className="rounded-xl px-3 py-2 text-sm text-primary transition hover:bg-[#f5f2ee]"
                        >
                          {category.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.key}
                href={item.path(locale)}
                className={cn(
                  'relative inline-flex items-center overflow-hidden text-sm text-[#6d5d4b] transition-colors duration-300',
                  'uppercase tracking-[0.35em]',
                  'after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-[#aa1d1d] after:to-[#ff0000] after:opacity-0 after:transition-all after:duration-300 after:ease-out hover:text-[#1b140f] hover:after:left-0 hover:after:w-full hover:after:opacity-100'
                )}
              >
                {messages[item.key] ??
                  messages[item.key === 'products' ? 'categories' : item.key] ??
                  item.key}
              </Link>
            );
          })}
        </nav>
        <LocaleSwitcher currentLocale={locale} />
      </div>
    </header>
  );
}
