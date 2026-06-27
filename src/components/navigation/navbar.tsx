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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);
  const isRtl = locale === 'ar';
  const productsLabel = messages.products ?? messages.categories ?? 'Products';

  const openProducts = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsProductsOpen(true);
  };

  const closeProducts = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setIsProductsOpen(false), 120);
  };

  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-white/70 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center">
          <Image
            src="/logo.png"
            alt="Columbus Coffee"
            width={280}
            height={90}
            className="h-16 w-auto object-contain"
            priority
          />
          <span className="sr-only">Columbus Coffee</span>
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
                      'uppercase',
                      'after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-[#aa1d1d] after:to-[#ff0000] after:opacity-0 after:transition-all after:duration-300 after:ease-out hover:text-[#1b140f] hover:after:left-0 hover:after:w-full hover:after:opacity-100'
                    )}
                  >
                    {productsLabel}
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
                    <p className="text-xs uppercase text-muted-foreground">
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
                  'uppercase',
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
        <div className="flex items-center gap-3">
          <LocaleSwitcher currentLocale={locale} />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ede6df] bg-white/80 text-[#1b140f] transition hover:border-[#cdbfb2] md:hidden"
            aria-controls="mobile-menu"
            aria-expanded={isMobileOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">{isMobileOpen ? 'Close menu' : 'Open menu'}</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={cn(
                  'h-[2px] w-5 rounded-full bg-current transition',
                  isMobileOpen && 'translate-y-[6px] rotate-45'
                )}
              />
              <span
                className={cn('h-[2px] w-5 rounded-full bg-current transition', isMobileOpen && 'opacity-0')}
              />
              <span
                className={cn(
                  'h-[2px] w-5 rounded-full bg-current transition',
                  isMobileOpen && '-translate-y-[6px] -rotate-45'
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <button
          type="button"
          aria-hidden="true"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px] md:hidden"
        />
      )}
      <div
        id="mobile-menu"
        className={cn(
          'absolute left-0 top-full z-40 w-full border-b border-white/20 bg-white/95 backdrop-blur-xl transition duration-200 md:hidden',
          isMobileOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
        )}
      >
        <div className={cn('container py-6', isRtl ? 'text-right' : 'text-left')}>
          <div className="grid gap-4 text-base font-semibold text-primary">
            {navItems.map((item) => {
              if (item.dropdown) {
                return (
                  <div key={item.key} className="space-y-3">
                    <Link
                      href={item.path(locale)}
                      className="inline-flex items-center gap-2 text-base font-semibold text-primary"
                      onClick={closeMobileMenu}
                    >
                      {productsLabel}
                    </Link>
                    <div className="rounded-2xl border border-[#ede6df] bg-white p-4">
                      <p className="text-xs uppercase text-muted-foreground">
                        {locale === 'ar' ? 'الفئات' : 'Categories'}
                      </p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {categories.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/${locale}/category/${category.slug}`}
                            className="rounded-xl px-3 py-2 text-sm text-primary transition hover:bg-[#f5f2ee]"
                            onClick={closeMobileMenu}
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
                  className="inline-flex items-center gap-2 text-base font-semibold text-primary"
                  onClick={closeMobileMenu}
                >
                  {messages[item.key] ??
                    messages[item.key === 'products' ? 'categories' : item.key] ??
                    item.key}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
