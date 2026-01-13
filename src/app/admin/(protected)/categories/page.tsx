import {getAdminCategories} from '@/src/lib/admin-data';
import {CategoriesManager} from '@/src/components/admin/categories-manager';

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-primary">Categories</h1>
      <CategoriesManager categories={categories} />
    </div>
  );
}
