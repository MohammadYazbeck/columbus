import {getTranslations} from 'next-intl/server';
import type {Locale} from '@/src/i18n/routing';
import {ContactInfo} from '@/src/components/sections/contact-info';

type Props = {
  params: {locale: Locale};
};

const INFO = {
  address: {
    en: 'Main Location : Hamouria - Rif Dimashq - Syria  Temporary location : Dar\'a Highway - Rif Dimashq - Syria',
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

export default async function ContactPage({params}: Props) {
  const {locale} = params;
  const t = await getTranslations({locale, namespace: 'contact'});

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          {locale === 'ar' ? 'التواصل' : 'Contact'}
        </p>
        <h1 className="text-4xl font-semibold text-primary">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </header>

      <ContactInfo
        items={[
          {label: t('addressLabel'), value: INFO.address[locale]},
          {label: t('phoneLabel'), value: INFO.phone[locale]},
          {label: t('mobileLabel'), value: INFO.mobile[locale]},
          {label: t('emailLabel'), value: INFO.email[locale]}
        ]}
      />
    </div>
  );
}
