'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {Button} from '@/src/components/ui/button';
import {Input} from '@/src/components/ui/input';
import {Label} from '@/src/components/ui/label';
import {Select} from '@/src/components/ui/select';
import {Textarea} from '@/src/components/ui/textarea';
import {asUploadUrl} from '@/src/lib/media';

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

const translationName = (translations: {locale: string; name: string}[], locale: 'en' | 'ar') =>
  translations.find((t) => t.locale === locale)?.name ?? '';

const pointsToText = (translations: ProductTranslation[], locale: 'en' | 'ar') => {
  const translation = translations.find((t) => t.locale === locale);
  const points = translation?.points;
  if (!Array.isArray(points)) return '';
  return points
    .filter(
      (point): point is {label: string; value: string} =>
        typeof point === 'object' &&
        point !== null &&
        'label' in point &&
        'value' in point &&
        typeof (point as {label: string}).label === 'string' &&
        typeof (point as {value: string}).value === 'string'
    )
    .map((point) => `${point.label}: ${point.value}`)
    .join('\n');
};

type ProductFormState = {
  slug: string;
  categoryId: number;
  sortOrder: number;
  isActive: 'true' | 'false';
  isFeatured: 'true' | 'false';
  featuredOrder: string;
  nameEn: string;
  nameAr: string;
  pointsEn: string;
  pointsAr: string;
};

export function ProductsManager({products, categories}: {products: Product[]; categories: Category[]}) {
  const router = useRouter();
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
    pointsEn: '',
    pointsAr: ''
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
      pointsEn: pointsToText(product.translations, 'en'),
      pointsAr: pointsToText(product.translations, 'ar')
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
    formData.append('points_en', form.pointsEn);
    formData.append('points_ar', form.pointsAr);
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

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{isEditing ? 'Edit product' : 'Create product'}</h2>
          {isEditing && (
            <Button type="button" variant="ghost" onClick={cancelEdit}>
              Cancel edit
            </Button>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Slug</Label>
            <Input value={form.slug} onChange={(event) => setForm((prev) => ({...prev, slug: event.target.value}))} />
          </div>
          <div>
            <Label>Category</Label>
            <Select
              value={String(form.categoryId)}
              onChange={(event) => setForm((prev) => ({...prev, categoryId: Number(event.target.value)}))}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {translationName(category.translations, 'en')}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Sort order</Label>
            <Input
              type="number"
              value={form.sortOrder}
              onChange={(event) => setForm((prev) => ({...prev, sortOrder: Number(event.target.value)}))}
            />
          </div>
          <div>
            <Label>Status</Label>
            <Select
              value={form.isActive}
              onChange={(event) =>
                setForm((prev) => ({...prev, isActive: event.target.value as ProductFormState['isActive']}))
              }
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </Select>
          </div>
          <div>
            <Label>Featured</Label>
            <Select
              value={form.isFeatured}
              onChange={(event) =>
                setForm((prev) => ({...prev, isFeatured: event.target.value as ProductFormState['isFeatured']}))
              }
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </Select>
          </div>
          <div>
            <Label>Featured order</Label>
            <Input
              value={form.featuredOrder}
              onChange={(event) => setForm((prev) => ({...prev, featuredOrder: event.target.value}))}
            />
          </div>
          <div>
            <Label>Images</Label>
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
                Replace existing gallery with newly uploaded files
              </label>
            </div>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Name (EN)</Label>
            <Input value={form.nameEn} onChange={(event) => setForm((prev) => ({...prev, nameEn: event.target.value}))} />
          </div>
          <div>
            <Label>الاسم (AR)</Label>
            <Input value={form.nameAr} onChange={(event) => setForm((prev) => ({...prev, nameAr: event.target.value}))} />
          </div>
          <div>
            <Label>Points (EN)</Label>
            <Textarea value={form.pointsEn} onChange={(event) => setForm((prev) => ({...prev, pointsEn: event.target.value}))} />
            <p className="text-xs text-muted-foreground">One detail per line using Label: Value</p>
          </div>
          <div>
            <Label>ملاحظات (AR)</Label>
            <Textarea value={form.pointsAr} onChange={(event) => setForm((prev) => ({...prev, pointsAr: event.target.value}))} />
          </div>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : isEditing ? 'Update product' : 'Save product'}
        </Button>
      </form>

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Products</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((product) => (
            <div key={product.id} className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>{product.slug}</span>
                <div className="flex gap-1">
                  <Button type="button" variant="ghost" size="sm" onClick={() => populateForm(product)}>
                    Edit
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => deleteProduct(product.id)}>
                    Delete
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {translationName(product.translations, 'en')} · {product.category.slug}
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
