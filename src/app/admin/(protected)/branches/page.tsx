import {getAdminBranches} from '@/src/lib/admin-data';
import {BranchesManager} from '@/src/components/admin/branches-manager';

export default async function AdminBranchesPage() {
  const branches = await getAdminBranches();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-primary">Branches</h1>
      <BranchesManager branches={branches} />
    </div>
  );
}
