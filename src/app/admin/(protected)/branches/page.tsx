import {getAdminBranches} from '@/src/lib/admin-data';
import {getAdminLocale} from '@/src/lib/admin-locale';
import {BranchesManager} from '@/src/components/admin/branches-manager';

export default async function AdminBranchesPage() {
  const locale = getAdminLocale();
  const branches = await getAdminBranches();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-primary">{locale === 'ar' ? 'الفروع' : 'Branches'}</h1>
      <BranchesManager branches={branches} locale={locale} />
    </div>
  );
}
