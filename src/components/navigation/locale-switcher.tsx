'use client';

import {usePathname} from 'next/navigation';
import {useRouter} from 'next/navigation';
import {Button} from '@/src/components/ui/button';
import {Locale, locales} from '@/src/i18n/routing';

export function LocaleSwitcher({currentLocale}: {currentLocale: Locale}) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (locale: Locale) => {
    if (locale === currentLocale) return;
    const newPath = pathname.replace(/^\/(en|ar)/, `/${locale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((locale) => (
        <Button
          key={locale}
          size="sm"
          variant={locale === currentLocale ? 'accent' : 'ghost'}
          onClick={() => switchLocale(locale)}
        >
          {locale.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
