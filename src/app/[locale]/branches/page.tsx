import type {ComponentProps} from 'react';
import type {Locale} from '@/src/i18n/routing';
import {getBranches} from '@/src/lib/queries';
import {BranchCard} from '@/src/components/sections/branch-card';

type Props = {
  params: {locale: Locale};
};

type Branch = ComponentProps<typeof BranchCard>['branch'];

export default async function BranchesPage({params}: Props) {
  const branches = (await getBranches(params.locale)) as Branch[];
  const isArabic = params.locale === 'ar';

  return (
    <div className="space-y-12">
      <header className="relative overflow-hidden rounded-[34px] border border-[#e6ddd0] bg-[#fffdf9] px-6 py-8 shadow-[0_24px_55px_rgba(0,0,0,0.06)] md:px-10 md:py-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(171,29,29,0.08),_transparent_58%)]" />
        <div className="relative z-10 flex flex-col gap-5">
          <p className="text-xs uppercase tracking-[0.4em] text-[#ab1d1d]">
            {isArabic ? 'فروعنا' : 'Our Locations'}
          </p>
          <h1 className="text-4xl font-semibold text-[#17120f] md:text-5xl">
            {isArabic ? 'مقاهي كولومبوس' : 'Colombus Coffeehouses'}
          </h1>
          <p className="max-w-3xl text-sm text-[#4f4337] md:text-base">
            {isArabic
              ? 'مساحات دافئة لطقوس القهوة الهادئة واللقاءات واللحظات المصنوعة بحب.'
              : 'Warm spaces for slow coffee rituals, conversations, and handcrafted moments.'}
          </p>
          <div className="inline-flex w-max items-center gap-3 rounded-full border border-[#ab1d1d]/25 bg-[#ab1d1d]/5 px-4 py-2">
            <span className="text-sm font-semibold text-[#17120f]">
              {String(branches.length).padStart(2, '0')}
            </span>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#ab1d1d]">
              {isArabic ? 'فرع متاح' : 'Active Branches'}
            </span>
          </div>
        </div>
      </header>
      <div className="space-y-10">
        {branches.map((branch) => (
          <BranchCard key={branch.id} branch={branch} locale={params.locale} />
        ))}
      </div>
    </div>
  );
}
