import type {Locale} from '@/src/i18n/routing';

export const siteContact: Record<
  'address' | 'phone' | 'mobile' | 'email',
  Record<Locale, string>
> = {
  address: {
    en: "Main Location : Hamouria - Rif Dimashq - Syria  Temporary location : Dar'a Highway - Rif Dimashq - Syria",
    ar: 'الموقع الرئيسي : حمورية - ريف دمشق - سوريا  الموقع المؤقت : طريق درعا - ريف دمشق - سوريا'
  },
  phone: {
    en: '+963 11 9813',
    ar: '+963 11 9813'
  },
  mobile: {
    en: '+963989994010',
    ar: '+963989994010'
  },
  email: {
    en: 'columbus.syr@gmail.com',
    ar: 'columbus.syr@gmail.com'
  }
};

export const siteSocials = [
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/columbus.syr'
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/columbus.syr'
  }
] as const;
