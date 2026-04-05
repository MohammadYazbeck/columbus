'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {Button} from '@/src/components/ui/button';
import {Input} from '@/src/components/ui/input';
import {Textarea} from '@/src/components/ui/textarea';
import {Label} from '@/src/components/ui/label';
import type {AdminLocale} from '@/src/lib/admin-locale';

type CareerSlot = {
  id: number;
  isActive: boolean;
  sortOrder: number;
  translations: {locale: string; title: string; description: string | null}[];
};

type CareerFormState = {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  sortOrder: number;
  isActive: 'true' | 'false';
};

const getTranslation = (slot: CareerSlot, locale: 'en' | 'ar') =>
  slot.translations.find((t) => t.locale === locale);

export function CareersManager({careers, locale}: {careers: CareerSlot[]; locale: AdminLocale}) {
  const router = useRouter();
  const isArabic = locale === 'ar';
  const buildEmptyForm = (): CareerFormState => ({
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    sortOrder: 1,
    isActive: 'true'
  });
  const [form, setForm] = useState<CareerFormState>(() => buildEmptyForm());
  const [editingCareerId, setEditingCareerId] = useState<number | null>(null);
  const isEditing = editingCareerId !== null;

  const resetForm = () => {
    setForm(buildEmptyForm());
    setEditingCareerId(null);
  };

  const populateForm = (career: CareerSlot) => {
    setForm({
      titleEn: getTranslation(career, 'en')?.title ?? '',
      titleAr: getTranslation(career, 'ar')?.title ?? '',
      descriptionEn: getTranslation(career, 'en')?.description ?? '',
      descriptionAr: getTranslation(career, 'ar')?.description ?? '',
      sortOrder: career.sortOrder,
      isActive: career.isActive ? 'true' : 'false'
    });
    setEditingCareerId(career.id);
  };

  const submitSlot = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetch(isEditing ? `/api/admin/careers/${editingCareerId}` : '/api/admin/careers', {
      method: isEditing ? 'PATCH' : 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        isActive: form.isActive,
        sortOrder: form.sortOrder,
        translations: {
          en: {title: form.titleEn, description: form.descriptionEn},
          ar: {title: form.titleAr, description: form.descriptionAr}
        }
      })
    });
    resetForm();
    router.refresh();
  };

  const toggleActive = async (career: CareerSlot) => {
    await fetch(`/api/admin/careers/${career.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({isActive: !career.isActive})
    });
    router.refresh();
  };

  const deleteSlot = async (id: number) => {
    await fetch(`/api/admin/careers/${id}`, {method: 'DELETE'});
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={submitSlot} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-2">
        <div className="md:col-span-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{isEditing ? (isArabic ? 'تعديل الوظيفة' : 'Edit slot') : isArabic ? 'إضافة وظيفة' : 'Create slot'}</h2>
          {isEditing && (
            <Button type="button" variant="ghost" onClick={resetForm}>
              {isArabic ? 'إلغاء التعديل' : 'Cancel edit'}
            </Button>
          )}
        </div>
        <div>
          <Label>{isArabic ? 'العنوان (EN)' : 'Title (EN)'}</Label>
          <Input value={form.titleEn} onChange={(event) => setForm((prev) => ({...prev, titleEn: event.target.value}))} />
        </div>
        <div>
          <Label>العنوان (AR)</Label>
          <Input value={form.titleAr} onChange={(event) => setForm((prev) => ({...prev, titleAr: event.target.value}))} />
        </div>
        <div>
          <Label>{isArabic ? 'الوصف (EN)' : 'Description (EN)'}</Label>
          <Textarea
            value={form.descriptionEn}
            onChange={(event) => setForm((prev) => ({...prev, descriptionEn: event.target.value}))}
          />
        </div>
        <div>
          <Label>الوصف (AR)</Label>
          <Textarea
            value={form.descriptionAr}
            onChange={(event) => setForm((prev) => ({...prev, descriptionAr: event.target.value}))}
          />
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
        <div className="md:col-span-2">
          <Button type="submit">{isEditing ? (isArabic ? 'حفظ التعديلات' : 'Update slot') : isArabic ? 'إضافة الوظيفة' : 'Create slot'}</Button>
        </div>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        {careers.map((career) => (
          <div key={career.id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{getTranslation(career, 'en')?.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {career.isActive ? (isArabic ? 'نشط' : 'Active') : isArabic ? 'غير نشط' : 'Inactive'} · {isArabic ? 'الترتيب' : 'order'} {career.sortOrder}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => populateForm(career)}>
                  {isArabic ? 'تعديل' : 'Edit'}
                </Button>
                <Button size="sm" variant="outline" onClick={() => toggleActive(career)}>
                  {career.isActive ? (isArabic ? 'تعطيل' : 'Disable') : isArabic ? 'تفعيل' : 'Enable'}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => deleteSlot(career.id)}>
                  {isArabic ? 'حذف' : 'Delete'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
