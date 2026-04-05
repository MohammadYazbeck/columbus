import {getAdminJobApplications} from '@/src/lib/admin-data';
import {getAdminLocale} from '@/src/lib/admin-locale';
import {asUploadUrl} from '@/src/lib/media';
import {ChevronDown} from 'lucide-react';

export default async function JobRequestsPage() {
  const locale = getAdminLocale();
  const isArabic = locale === 'ar';
  const applications = await getAdminJobApplications();

  const detailRows = (app: (typeof applications)[number]) => [
    {
      label: isArabic ? 'الوظيفة' : 'Role',
      value:
        app.careerSlot.translations.find((t) => t.locale === locale)?.title ??
        app.careerSlot.translations[0]?.title ??
        '—'
    },
    {label: isArabic ? 'اللغة' : 'Locale', value: app.locale},
    {label: isArabic ? 'البريد الإلكتروني' : 'Email', value: app.email},
    {label: isArabic ? 'رقم الهاتف' : 'Phone number', value: app.phoneNumber},
    {
      label: isArabic ? 'تاريخ الميلاد' : 'Birth date',
      value: new Date(app.birthDate).toLocaleDateString(isArabic ? 'ar' : 'en')
    },
    {label: isArabic ? 'مدينة الولادة' : 'Birth city', value: app.bornCity},
    {label: isArabic ? 'الجنس' : 'Sex', value: app.sex === 'male' ? (isArabic ? 'ذكر' : 'Male') : isArabic ? 'أنثى' : 'Female'},
    {label: isArabic ? 'الجنسية' : 'Nationality', value: app.nationality},
    {
      label: isArabic ? 'الحالة الاجتماعية' : 'Social state',
      value: app.socialState === 'single' ? (isArabic ? 'أعزب' : 'Single') : isArabic ? 'متزوج' : 'Married'
    },
    {
      label: isArabic ? 'تاريخ التقديم' : 'Submitted at',
      value: new Date(app.createdAt).toLocaleString(isArabic ? 'ar' : 'en')
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-primary">{isArabic ? 'طلبات التوظيف' : 'Job Applications'}</h1>
      <div className="space-y-4">
        {applications.map((app) => (
          <details key={app.id} className="group rounded-2xl border border-slate-200 bg-white shadow-sm">
            <summary className="flex cursor-pointer list-none flex-col gap-3 p-6 marker:hidden md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-primary">{app.fullName}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {detailRows(app)[0]?.value} · {app.email} · {new Date(app.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {app.cvFilePath ? (
                  <span className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm text-primary">
                    {isArabic ? 'يوجد سيرة ذاتية' : 'CV attached'}
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm text-muted-foreground">
                    {isArabic ? 'لا يوجد سيرة ذاتية' : 'No CV'}
                  </span>
                )}
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ab1d1d]/20 bg-[#ab1d1d]/5 text-[#ab1d1d] transition group-open:rotate-180 group-open:bg-[#ab1d1d] group-open:text-white">
                  <ChevronDown className="h-4 w-4" />
                </span>
              </div>
            </summary>

            <div className="border-t border-slate-100 px-6 pb-6 pt-5">
              <div className="mb-5 flex flex-wrap gap-2">
                {app.cvFilePath ? (
                  <a
                    href={asUploadUrl(app.cvFilePath) ?? '#'}
                    className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-medium transition hover:border-slate-400 hover:bg-slate-50"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {isArabic ? 'تحميل السيرة الذاتية' : 'Download CV'}
                  </a>
                ) : (
                  <span className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm text-muted-foreground">
                    {isArabic ? 'لم يتم رفع سيرة ذاتية' : 'No CV uploaded'}
                  </span>
                )}
              </div>

              <dl className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {detailRows(app).map((row) => (
                  <div
                    key={`${app.id}-${row.label}`}
                    className="rounded-xl border border-slate-100 bg-slate-50/60 p-4"
                  >
                    <dt className="text-xs font-medium uppercase text-muted-foreground">{row.label}</dt>
                    <dd className="mt-2 break-words text-sm font-medium text-primary">{row.value || '—'}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
