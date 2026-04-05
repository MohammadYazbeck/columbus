import {getAdminCareerSlots} from '@/src/lib/admin-data';
import {getAdminLocale} from '@/src/lib/admin-locale';
import {CareersManager} from '@/src/components/admin/careers-manager';

export default async function AdminCareersPage() {
  const locale = getAdminLocale();
  const careers = await getAdminCareerSlots();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-primary">{locale === 'ar' ? 'الوظائف' : 'Career Slots'}</h1>
      <CareersManager careers={careers} locale={locale} />
    </div>
  );
}
