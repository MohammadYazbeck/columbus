import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/src/i18n/routing';
import { Navbar } from '@/src/components/navigation/navbar';
import { Footer } from '@/src/components/navigation/footer';
import { getCategories } from '@/src/lib/queries';

export const dynamic = 'force-dynamic';

type Props = {
  children: ReactNode;
  params: { locale: Locale };
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;
  if (!locales.includes(locale)) {
    notFound();
  }
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  const navCategories = await getCategories(locale, { includeInactive: false });
  const categoryLinks = navCategories.map((category) => ({
    slug: category.slug,
    label: category.translation.name
  }));
  const footerMessages = messages.footer as Record<string, string> | undefined;

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar
            locale={locale}
            messages={messages.navigation as Record<string, string>}
            categories={categoryLinks}
          />
          <main className="container min-h-[80vh] py-10">{children}</main>
          <Footer locale={locale} tagline={footerMessages?.tagline ?? ''} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
