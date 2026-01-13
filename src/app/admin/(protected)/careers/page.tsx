import {getAdminCareerSlots} from '@/src/lib/admin-data';
import {CareersManager} from '@/src/components/admin/careers-manager';

export default async function AdminCareersPage() {
  const careers = await getAdminCareerSlots();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-primary">Career Slots</h1>
      <CareersManager careers={careers} />
    </div>
  );
}
