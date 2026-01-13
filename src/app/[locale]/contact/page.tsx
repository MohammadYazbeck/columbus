import {getTranslations} from 'next-intl/server';
import type {Locale} from '@/src/i18n/routing';
import {ContactForm} from '@/src/components/forms/contact-form';
import {ContactInfo} from '@/src/components/sections/contact-info';
import {isCaptchaEnabled} from '@/src/lib/features';

type Props = {
  params: {locale: Locale};
};

const INFO = {
  address: {
    en: 'Garden Plaza, Damascus, Syria',
    ar: 'غاردن بلازا، دمشق، سوريا'
  },
  phone: {
    en: '+963 11 445 9080',
    ar: '+963 11 445 9080'
  },
  mobile: {
    en: '+963 944 555 120',
    ar: '+963 944 555 120'
  },
  email: {
    en: 'hello@colombus.coffee',
    ar: 'hello@colombus.coffee'
  }
};

export default async function ContactPage({params}: Props) {
  const {locale} = params;
  const t = await getTranslations({locale, namespace: 'contact'});
  const tf = await getTranslations({locale, namespace: 'forms'});
  const enableCaptcha = isCaptchaEnabled();

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

      <div className="rounded-3xl border border-white/20 bg-white/80 p-6">
        <ContactForm
          locale={locale}
          enableCaptcha={enableCaptcha}
          labels={{
            name: tf('name'),
            email: tf('email'),
            title: tf('title'),
            message: tf('message'),
            captcha: tf('captcha'),
            submit: locale === 'ar' ? 'إرسال' : 'Submit'
          }}
        />
      </div>
    </div>
  );
}
