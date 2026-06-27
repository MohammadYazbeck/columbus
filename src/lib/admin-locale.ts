import {cookies} from 'next/headers';

export type AdminLocale = 'en' | 'ar';

export const ADMIN_LOCALE_COOKIE = 'columbus_admin_locale';

export function getAdminLocale(): AdminLocale {
  const locale = cookies().get(ADMIN_LOCALE_COOKIE)?.value;
  return locale === 'en' ? 'en' : 'ar';
}

export function setAdminLocale(locale: AdminLocale) {
  cookies().set(ADMIN_LOCALE_COOKIE, locale, {
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 365
  });
}

export function getAdminDirection(locale: AdminLocale) {
  return locale === 'ar' ? 'rtl' : 'ltr';
}
