'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {Button} from '@/src/components/ui/button';
import {Input} from '@/src/components/ui/input';
import {Label} from '@/src/components/ui/label';
import type {AdminLocale} from '@/src/lib/admin-locale';

type Category = {
  id: number;
  slug: string;
  sortOrder: number;
  isActive: boolean;
  translations: {locale: string; name: string}[];
};

type CategoryFormState = {
  slug: string;
  sortOrder: number;
  isActive: 'true' | 'false';
  nameEn: string;
  nameAr: string;
};

const localeName = (translations: Category['translations'], locale: 'en' | 'ar') =>
  translations.find((t) => t.locale === locale)?.name ?? '';

export function CategoriesManager({categories, locale}: {categories: Category[]; locale: AdminLocale}) {
  const router = useRouter();
  const isArabic = locale === 'ar';
  const buildEmptyForm = (): CategoryFormState => ({
    slug: '',
    sortOrder: 1,
    isActive: 'true',
    nameEn: '',
    nameAr: ''
  });
  const [form, setForm] = useState<CategoryFormState>(() => buildEmptyForm());
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const isEditing = editingCategoryId !== null;

  const resetForm = () => {
    setForm(buildEmptyForm());
    setEditingCategoryId(null);
  };

  const populateForm = (category: Category) => {
    setForm({
      slug: category.slug,
      sortOrder: category.sortOrder,
      isActive: category.isActive ? 'true' : 'false',
      nameEn: localeName(category.translations, 'en'),
      nameAr: localeName(category.translations, 'ar')
    });
    setEditingCategoryId(category.id);
  };

  const submitCategory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetch(isEditing ? `/api/admin/categories/${editingCategoryId}` : '/api/admin/categories', {
      method: isEditing ? 'PATCH' : 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        slug: form.slug,
        sortOrder: form.sortOrder,
        isActive: form.isActive,
        translations: {en: form.nameEn, ar: form.nameAr}
      })
    });
    resetForm();
    router.refresh();
  };

  const deleteCategory = async (id: number) => {
    await fetch(`/api/admin/categories/${id}`, {method: 'DELETE'});
    router.refresh();
  };

  return (
    <div className="space-y-8">
      <form onSubmit={submitCategory} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-2">
        <div className="md:col-span-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{isEditing ? (isArabic ? 'تعديل الفئة' : 'Edit category') : isArabic ? 'إضافة فئة' : 'Create category'}</h2>
          {isEditing && (
            <Button type="button" variant="ghost" onClick={resetForm}>
              {isArabic ? 'إلغاء التعديل' : 'Cancel edit'}
            </Button>
          )}
        </div>
        <div>
          <Label>{isArabic ? 'المعرّف' : 'Slug'}</Label>
          <Input value={form.slug} onChange={(event) => setForm((prev) => ({...prev, slug: event.target.value}))} />
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
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={form.isActive}
            onChange={(event) => setForm((prev) => ({...prev, isActive: event.target.value as 'true' | 'false'}))}
          >
            <option value="true">{isArabic ? 'نشط' : 'Active'}</option>
            <option value="false">{isArabic ? 'غير نشط' : 'Inactive'}</option>
          </select>
        </div>
        <div>
          <Label>Name (EN)</Label>
          <Input value={form.nameEn} onChange={(event) => setForm((prev) => ({...prev, nameEn: event.target.value}))} />
        </div>
        <div>
          <Label>الاسم (AR)</Label>
          <Input value={form.nameAr} onChange={(event) => setForm((prev) => ({...prev, nameAr: event.target.value}))} />
        </div>
        <div className="md:col-span-2">
          <Button type="submit">{isEditing ? (isArabic ? 'حفظ التعديلات' : 'Update category') : isArabic ? 'إضافة الفئة' : 'Create category'}</Button>
        </div>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-3">{isArabic ? 'المعرّف' : 'Slug'}</th>
              <th className="px-4 py-3">{isArabic ? 'الاسم (EN)' : 'Name (EN)'}</th>
              <th className="px-4 py-3">{isArabic ? 'الاسم (AR)' : 'Name (AR)'}</th>
              <th className="px-4 py-3">{isArabic ? 'الترتيب' : 'Sort'}</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t">
                <td className="px-4 py-3 font-mono text-xs">{category.slug}</td>
                <td className="px-4 py-3">{localeName(category.translations, 'en')}</td>
                <td className="px-4 py-3">{localeName(category.translations, 'ar')}</td>
                <td className="px-4 py-3">{category.sortOrder}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Button type="button" variant="ghost" onClick={() => populateForm(category)}>
                      {isArabic ? 'تعديل' : 'Edit'}
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => deleteCategory(category.id)}>
                      {isArabic ? 'حذف' : 'Delete'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
