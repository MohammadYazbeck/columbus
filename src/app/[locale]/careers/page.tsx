import {getTranslations} from 'next-intl/server';
import type {Locale} from '@/src/i18n/routing';
import {getCareerSlots} from '@/src/lib/queries';
import {CareerForm} from '@/src/components/forms/career-form';
import {isCaptchaEnabled} from '@/src/lib/features';

type Props = {
  params: {locale: Locale};
};

type CareerSlot = {
  id: number;
  translation: {title: string};
};

export default async function CareersPage({params}: Props) {
  const {locale} = params;
  const t = await getTranslations({locale, namespace: 'careers'});
  const tf = await getTranslations({locale, namespace: 'forms'});
  const slots = (await getCareerSlots(locale)) as CareerSlot[];
  const enableCaptcha = isCaptchaEnabled();
  const options = slots.map((slot) => ({
    id: slot.id,
    title: slot.translation.title
  }));

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs uppercase text-muted-foreground">
          {locale === 'ar' ? 'الوظائف' : 'Careers'}
        </p>
        <h1 className="text-4xl font-semibold text-primary">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </header>
      <div className="rounded-3xl border border-white/20 bg-white/80 p-6">
        {options.length === 0 ? (
          <p className="text-muted-foreground">
            {locale === 'ar' ? 'لا توجد وظائف متاحة الآن.' : 'No open roles at the moment.'}
          </p>
        ) : (
          <CareerForm
            locale={locale}
            enableCaptcha={enableCaptcha}
            options={options}
            labels={{
              selectRole: t('selectRole'),
              placeholder: t('placeholder'),
              form: {
                fullName: tf('job.fullName'),
                birthDate: tf('job.birthDate'),
                bornCity: tf('job.bornCity'),
                sex: tf('job.sex'),
                nationality: tf('job.nationality'),
                phoneNumber: tf('job.phoneNumber'),
                email: tf('email'),
                socialState: tf('job.socialState'),
                cv: tf('job.cv'),
                submit: locale === 'ar' ? 'تقديم' : 'Apply',
                captcha: tf('captcha')
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
