import {getAdminProducts, getAdminCategories} from '@/src/lib/admin-data';
import {getAdminLocale} from '@/src/lib/admin-locale';
import {ProductsManager} from '@/src/components/admin/products-manager';

export default async function AdminProductsPage() {
  const locale = getAdminLocale();
  const [products, categories] = await Promise.all([getAdminProducts(), getAdminCategories()]);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-primary">{locale === 'ar' ? 'المنتجات' : 'Products'}</h1>
      <ProductsManager products={products} categories={categories} locale={locale} />
    </div>
  );
}
