'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {Button} from '@/src/components/ui/button';
import {Input} from '@/src/components/ui/input';
import {Label} from '@/src/components/ui/label';
import {Select} from '@/src/components/ui/select';
import {Textarea} from '@/src/components/ui/textarea';
import {asUploadUrl} from '@/src/lib/media';
import type {AdminLocale} from '@/src/lib/admin-locale';

type ProductTranslation = {
  locale: string;
  name: string;
  points?: unknown;
};

type Product = {
  id: number;
  slug: string;
  sortOrder: number;
  isActive: boolean;
  isFeatured: boolean;
  featuredOrder: number | null;
  categoryId: number;
  category: {slug: string};
  translations: ProductTranslation[];
  media: {id: number; filePath: string}[];
};

type Category = {
  id: number;
  slug: string;
  translations: {locale: string; name: string}[];
};

type PointRow = {
  id: string;
  label: string;
  value: string;
};

const translationName = (translations: {locale: string; name: string}[], locale: 'en' | 'ar') =>
  translations.find((t) => t.locale === locale)?.name ?? '';

const createPointRow = (label = '', value = ''): PointRow => ({
  id: Math.random().toString(36).slice(2),
  label,
  value
});

const pointsFromTranslations = (translations: ProductTranslation[], locale: 'en' | 'ar') => {
  const translation = translations.find((t) => t.locale === locale);
  const points = translation?.points;
  if (!Array.isArray(points)) return [createPointRow()];
  const rows = points
    .filter(
      (point): point is {label: string; value: string} =>
        typeof point === 'object' &&
        point !== null &&
        'label' in point &&
        'value' in point &&
        typeof (point as {label: string}).label === 'string' &&
        typeof (point as {value: string}).value === 'string'
    )
    .map((point) => createPointRow(point.label, point.value));
  return rows.length > 0 ? rows : [createPointRow()];
};

const pointsToPayload = (rows: PointRow[]) =>
  rows
    .map((row) => ({label: row.label.trim(), value: row.value.trim()}))
    .filter((row) => row.label && row.value)
    .map((row) => `${row.label}: ${row.value}`)
    .join('\n');

type ProductFormState = {
  slug: string;
  categoryId: number;
  sortOrder: number;
  isActive: 'true' | 'false';
  isFeatured: 'true' | 'false';
  featuredOrder: string;
  nameEn: string;
  nameAr: string;
  pointsEn: PointRow[];
  pointsAr: PointRow[];
};

export function ProductsManager({
  products,
  categories,
  locale
}: {
  products: Product[];
  categories: Category[];
  locale: AdminLocale;
}) {
  const router = useRouter();
  const isArabic = locale === 'ar';
  const [mediaFiles, setMediaFiles] = useState<FileList | null>(null);
  const buildEmptyForm = (): ProductFormState => ({
    slug: '',
    categoryId: categories[0]?.id ?? 0,
    sortOrder: 1,
    isActive: 'true',
    isFeatured: 'false',
    featuredOrder: '',
    nameEn: '',
    nameAr: '',
    pointsEn: [createPointRow()],
    pointsAr: [createPointRow()]
  });
  const [form, setForm] = useState<ProductFormState>(() => buildEmptyForm());
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [replaceMedia, setReplaceMedia] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = editingProductId !== null;

  const resetForm = () => {
    setForm(buildEmptyForm());
    setEditingProductId(null);
    setMediaFiles(null);
    setReplaceMedia(false);
  };

  const populateForm = (product: Product) => {
    setForm({
      slug: product.slug,
      categoryId: product.categoryId,
      sortOrder: product.sortOrder,
      isActive: product.isActive ? 'true' : 'false',
      isFeatured: product.isFeatured ? 'true' : 'false',
      featuredOrder: product.featuredOrder?.toString() ?? '',
      nameEn: translationName(product.translations, 'en'),
      nameAr: translationName(product.translations, 'ar'),
      pointsEn: pointsFromTranslations(product.translations, 'en'),
      pointsAr: pointsFromTranslations(product.translations, 'ar')
    });
    setEditingProductId(product.id);
    setMediaFiles(null);
    setReplaceMedia(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('slug', form.slug);
    formData.append('categoryId', String(form.categoryId));
    formData.append('sortOrder', String(form.sortOrder));
    formData.append('isActive', form.isActive);
    formData.append('isFeatured', form.isFeatured);
    formData.append('featuredOrder', form.featuredOrder);
    formData.append('name_en', form.nameEn);
    formData.append('name_ar', form.nameAr);
    formData.append('points_en', pointsToPayload(form.pointsEn));
    formData.append('points_ar', pointsToPayload(form.pointsAr));
    if (mediaFiles) {
      Array.from(mediaFiles).forEach((file) => formData.append('media', file));
    }
    let endpoint = '/api/admin/products';
    let method: 'POST' | 'PATCH' = 'POST';
    if (isEditing && editingProductId !== null) {
      endpoint = `/api/admin/products/${editingProductId}`;
      method = 'PATCH';
      formData.append('replaceMedia', replaceMedia ? 'true' : 'false');
    }
    try {
      const response = await fetch(endpoint, {
        method,
        body: formData
      });
      if (!response.ok) {
        console.error('Failed to save product');
        return;
      }
      resetForm();
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProduct = async (id: number) => {
    await fetch(`/api/admin/products/${id}`, {method: 'DELETE'});
    router.refresh();
  };

  const cancelEdit = () => resetForm();

  const updatePoint = (
    locale: 'pointsEn' | 'pointsAr',
    id: string,
    field: 'label' | 'value',
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [locale]: prev[locale].map((point) => (point.id === id ? {...point, [field]: value} : point))
    }));
  };

  const addPoint = (locale: 'pointsEn' | 'pointsAr') => {
    setForm((prev) => ({
      ...prev,
      [locale]: [...prev[locale], createPointRow()]
    }));
  };

  const removePoint = (locale: 'pointsEn' | 'pointsAr', id: string) => {
    setForm((prev) => {
      const nextPoints = prev[locale].filter((point) => point.id !== id);
      return {
        ...prev,
        [locale]: nextPoints.length > 0 ? nextPoints : [createPointRow()]
      };
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {isEditing ? (isArabic ? 'تعديل المنتج' : 'Edit product') : isArabic ? 'إضافة منتج' : 'Create product'}
          </h2>
          {isEditing && (
            <Button type="button" variant="ghost" onClick={cancelEdit}>
              {isArabic ? 'إلغاء التعديل' : 'Cancel edit'}
            </Button>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>{isArabic ? 'المعرّف' : 'Slug'}</Label>
            <Input value={form.slug} onChange={(event) => setForm((prev) => ({...prev, slug: event.target.value}))} />
          </div>
          <div>
            <Label>{isArabic ? 'الفئة' : 'Category'}</Label>
            <Select
              value={String(form.categoryId)}
              onChange={(event) => setForm((prev) => ({...prev, categoryId: Number(event.target.value)}))}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {translationName(category.translations, isArabic ? 'ar' : 'en')}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>{isArabic ? 'ترتيب الظهور' : 'Sort order'}</Label>
            <Input
              type="number"
              value={form.sortOrder}
              onChange={(event) => setForm((prev) => ({...prev, sortOrder: Number(event.target.value)}))}
            />
          </div>
          <div>
            <Label>{isArabic ? 'الحالة' : 'Status'}</Label>
            <Select
              value={form.isActive}
              onChange={(event) =>
                setForm((prev) => ({...prev, isActive: event.target.value as ProductFormState['isActive']}))
              }
            >
              <option value="true">{isArabic ? 'نشط' : 'Active'}</option>
              <option value="false">{isArabic ? 'غير نشط' : 'Inactive'}</option>
            </Select>
          </div>
          <div>
            <Label>{isArabic ? 'مميز' : 'Featured'}</Label>
            <Select
              value={form.isFeatured}
              onChange={(event) =>
                setForm((prev) => ({...prev, isFeatured: event.target.value as ProductFormState['isFeatured']}))
              }
            >
              <option value="false">{isArabic ? 'لا' : 'No'}</option>
              <option value="true">{isArabic ? 'نعم' : 'Yes'}</option>
            </Select>
          </div>
          <div>
            <Label>{isArabic ? 'ترتيب المميز' : 'Featured order'}</Label>
            <Input
              value={form.featuredOrder}
              onChange={(event) => setForm((prev) => ({...prev, featuredOrder: event.target.value}))}
            />
          </div>
          <div>
            <Label>{isArabic ? 'الصور' : 'Images'}</Label>
            <Input type="file" multiple accept=".jpg,.jpeg,.png,.webp" onChange={(event) => setMediaFiles(event.target.files)} />
          </div>
          {isEditing && (
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <input
                  type="checkbox"
                  checked={replaceMedia}
                  onChange={(event) => setReplaceMedia(event.target.checked)}
                />
                {isArabic
                  ? 'استبدال الصور الحالية بالصور الجديدة المرفوعة'
                  : 'Replace existing gallery with newly uploaded files'}
              </label>
            </div>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>{isArabic ? 'الاسم (EN)' : 'Name (EN)'}</Label>
            <Input value={form.nameEn} onChange={(event) => setForm((prev) => ({...prev, nameEn: event.target.value}))} />
          </div>
          <div>
            <Label>الاسم (AR)</Label>
            <Input value={form.nameAr} onChange={(event) => setForm((prev) => ({...prev, nameAr: event.target.value}))} />
          </div>
          <div>
            <Label>{isArabic ? 'النقاط (EN)' : 'Points (EN)'}</Label>
            <div className="space-y-3">
              {form.pointsEn.map((point) => (
                <div key={point.id} className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
                  <Input
                    placeholder={isArabic ? 'العنوان' : 'Label'}
                    value={point.label}
                    onChange={(event) => updatePoint('pointsEn', point.id, 'label', event.target.value)}
                  />
                  <Input
                    placeholder={isArabic ? 'القيمة' : 'Value'}
                    value={point.value}
                    onChange={(event) => updatePoint('pointsEn', point.id, 'value', event.target.value)}
                  />
                  <Button type="button" variant="ghost" onClick={() => removePoint('pointsEn', point.id)}>
                    {isArabic ? 'حذف' : 'Remove'}
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => addPoint('pointsEn')}>
                {isArabic ? 'إضافة نقطة' : 'Add point'}
              </Button>
            </div>
          </div>
          <div>
            <Label>ملاحظات (AR)</Label>
            <div className="space-y-3">
              {form.pointsAr.map((point) => (
                <div key={point.id} className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
                  <Input
                    placeholder="العنوان"
                    value={point.label}
                    onChange={(event) => updatePoint('pointsAr', point.id, 'label', event.target.value)}
                  />
                  <Input
                    placeholder="القيمة"
                    value={point.value}
                    onChange={(event) => updatePoint('pointsAr', point.id, 'value', event.target.value)}
                  />
                  <Button type="button" variant="ghost" onClick={() => removePoint('pointsAr', point.id)}>
                    {isArabic ? 'حذف' : 'Remove'}
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => addPoint('pointsAr')}>
                {isArabic ? 'إضافة نقطة' : 'Add point'}
              </Button>
            </div>
          </div>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? isArabic
              ? 'جارٍ الحفظ...'
              : 'Saving...'
            : isEditing
              ? isArabic
                ? 'حفظ التعديلات'
                : 'Update product'
              : isArabic
                ? 'حفظ المنتج'
                : 'Save product'}
        </Button>
      </form>

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">{isArabic ? 'المنتجات' : 'Products'}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((product) => (
            <div key={product.id} className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>{product.slug}</span>
                <div className="flex gap-1">
                  <Button type="button" variant="ghost" size="sm" onClick={() => populateForm(product)}>
                    {isArabic ? 'تعديل' : 'Edit'}
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => deleteProduct(product.id)}>
                    {isArabic ? 'حذف' : 'Delete'}
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {translationName(product.translations, isArabic ? 'ar' : 'en')} · {product.category.slug}
              </p>
              <div className="mt-3 flex gap-2">
                {product.media.slice(0, 3).map((media) => (
                  <img
                    key={media.id}
                    src={asUploadUrl(media.filePath) ?? '/fallback-product.svg'}
                    alt={product.slug}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
