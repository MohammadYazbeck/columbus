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
          {params.locale === 'ar' ? 'فروع كولومبوس' : 'Colombus Branches'}
        </h1>
        <p className="text-muted-foreground">
          {params.locale === 'ar'
            ? 'أماكن مختارة لتجربة القهوة الفاخرة في سوريا.'
            : 'Flagship houses crafted for slow luxury coffee rituals.'}
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
