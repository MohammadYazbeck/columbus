import {getTranslations} from 'next-intl/server';
import {Facebook, Instagram} from 'lucide-react';
import type {Locale} from '@/src/i18n/routing';
import {ContactInfo} from '@/src/components/sections/contact-info';
import {siteContact, siteSocials} from '@/src/lib/site-contact';

type Props = {
  params: {locale: Locale};
};

export default async function ContactPage({params}: Props) {
  const {locale} = params;
  const t = await getTranslations({locale, namespace: 'contact'});
  const iconMap = {
    facebook: Facebook,
    instagram: Instagram
  } as const;

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs uppercase text-muted-foreground">
          {locale === 'ar' ? 'التواصل' : 'Contact'}
        </p>
        <h1 className="text-4xl font-semibold text-primary">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </header>

      <ContactInfo
        items={[
          {label: t('addressLabel'), value: siteContact.address[locale]},
          {label: t('phoneLabel'), value: siteContact.phone[locale]},
          {label: t('mobileLabel'), value: siteContact.mobile[locale]},
          {label: t('emailLabel'), value: siteContact.email[locale]}
        ]}
      />

      <section className="rounded-[28px] border border-[#efe7df] bg-white/80 p-6">
        <div className="space-y-2">
          <p className="text-xs uppercase text-[#ab1d1d]">
            {locale === 'ar' ? 'السوشال ميديا' : 'Social media'}
          </p>
          <h2 className="text-2xl font-semibold text-primary">
            {locale === 'ar' ? 'تابع كولومبوس' : 'Follow Columbus'}
          </h2>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
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
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#ab1d1d]/20 bg-[#ab1d1d]/5 text-[#ab1d1d] transition hover:border-[#ab1d1d] hover:bg-[#ab1d1d]/10"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </a>
              );
            })()
          ))}
        </div>
      </section>
    </div>
  );
}
