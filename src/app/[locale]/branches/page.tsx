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

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-semibold text-primary">
          {params.locale === 'ar' ? 'مقاهي كولومبوس' : 'Colombus Coffeehouses'}
        </h1>
        <p className="text-muted-foreground">
          {params.locale === 'ar'
            ? 'مساحات دافئة لطقوس القهوة الهادئة واللقاءات واللحظات المصنوعة بحب.'
            : 'Warm spaces for slow coffee rituals, conversations, and handcrafted moments.'}
        </p>
      </header>
      <div className="space-y-8">
        {branches.map((branch) => (
          <BranchCard key={branch.id} branch={branch} />
        ))}
      </div>
    </div>
  );
}
