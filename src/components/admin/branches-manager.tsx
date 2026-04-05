'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {Button} from '@/src/components/ui/button';
import {Input} from '@/src/components/ui/input';
import {Label} from '@/src/components/ui/label';
import {Textarea} from '@/src/components/ui/textarea';
import {asUploadUrl} from '@/src/lib/media';
import type {AdminLocale} from '@/src/lib/admin-locale';

type Branch = {
  id: number;
  sortOrder: number;
  isActive: boolean;
  imagePath: string | null;
  phone: string | null;
  mobile: string | null;
  email: string | null;
  googleEmbedUrl: string;
  directionsUrl: string | null;
  translations: {locale: string; name: string; address: string}[];
};

type BranchFormState = {
  nameEn: string;
  addressEn: string;
  nameAr: string;
  addressAr: string;
  googleEmbedUrl: string;
  directionsUrl: string;
  phone: string;
  mobile: string;
  email: string;
  sortOrder: number;
};

const getTranslation = (branch: Branch, locale: 'en' | 'ar') =>
  branch.translations.find((t) => t.locale === locale);

const normalizeEmbedUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  const match = trimmed.match(/src="([^"]+)"/i);
  return match ? match[1] : trimmed;
};

export function BranchesManager({branches, locale}: {branches: Branch[]; locale: AdminLocale}) {
  const router = useRouter();
  const isArabic = locale === 'ar';
  const buildEmptyForm = (): BranchFormState => ({
    nameEn: '',
    addressEn: '',
    nameAr: '',
    addressAr: '',
    googleEmbedUrl: '',
    directionsUrl: '',
    phone: '',
    mobile: '',
    email: '',
    sortOrder: 1
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingBranchId, setEditingBranchId] = useState<number | null>(null);
  const [form, setForm] = useState<BranchFormState>(() => buildEmptyForm());
  const isEditing = editingBranchId !== null;

  const resetForm = () => {
    setForm(buildEmptyForm());
    setEditingBranchId(null);
    setImageFile(null);
  };

  const populateForm = (branch: Branch) => {
    setForm({
      nameEn: getTranslation(branch, 'en')?.name ?? '',
      addressEn: getTranslation(branch, 'en')?.address ?? '',
      nameAr: getTranslation(branch, 'ar')?.name ?? '',
      addressAr: getTranslation(branch, 'ar')?.address ?? '',
      googleEmbedUrl: branch.googleEmbedUrl,
      directionsUrl: branch.directionsUrl ?? '',
      phone: branch.phone ?? '',
      mobile: branch.mobile ?? '',
      email: branch.email ?? '',
      sortOrder: branch.sortOrder
    });
    setEditingBranchId(branch.id);
    setImageFile(null);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name_en', form.nameEn);
    formData.append('address_en', form.addressEn);
    formData.append('name_ar', form.nameAr);
    formData.append('address_ar', form.addressAr);
    formData.append('googleEmbedUrl', normalizeEmbedUrl(form.googleEmbedUrl));
    formData.append('directionsUrl', form.directionsUrl);
    formData.append('phone', form.phone);
    formData.append('mobile', form.mobile);
    formData.append('email', form.email);
    formData.append('sortOrder', String(form.sortOrder));
    formData.append('isActive', 'true');
    if (imageFile) {
      formData.append('image', imageFile);
    }
    await fetch(isEditing ? `/api/admin/branches/${editingBranchId}` : '/api/admin/branches', {
      method: isEditing ? 'PATCH' : 'POST',
      body: formData
    });
    resetForm();
    router.refresh();
  };

  const deleteBranch = async (id: number) => {
    await fetch(`/api/admin/branches/${id}`, {method: 'DELETE'});
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-2">
        <div className="md:col-span-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{isEditing ? (isArabic ? 'تعديل الفرع' : 'Edit branch') : isArabic ? 'إضافة فرع' : 'Create branch'}</h2>
          {isEditing && (
            <Button type="button" variant="ghost" onClick={resetForm}>
              {isArabic ? 'إلغاء التعديل' : 'Cancel edit'}
            </Button>
          )}
        </div>
        <div>
          <Label>{isArabic ? 'الاسم (EN)' : 'Name (EN)'}</Label>
          <Input value={form.nameEn} onChange={(event) => setForm((prev) => ({...prev, nameEn: event.target.value}))} />
        </div>
        <div>
          <Label>الاسم (AR)</Label>
          <Input value={form.nameAr} onChange={(event) => setForm((prev) => ({...prev, nameAr: event.target.value}))} />
        </div>
        <div>
          <Label>{isArabic ? 'العنوان (EN)' : 'Address (EN)'}</Label>
          <Textarea value={form.addressEn} onChange={(event) => setForm((prev) => ({...prev, addressEn: event.target.value}))} />
        </div>
        <div>
          <Label>العنوان (AR)</Label>
          <Textarea value={form.addressAr} onChange={(event) => setForm((prev) => ({...prev, addressAr: event.target.value}))} />
        </div>
        <div>
          <Label>{isEditing ? (isArabic ? 'استبدال صورة الفرع' : 'Replace branch image') : isArabic ? 'صورة الفرع' : 'Branch image'}</Label>
          <Input
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
          />
          <p className="text-xs text-muted-foreground">
            {isArabic
              ? `يتم الرفع إلى نفس التخزين المستخدم لصور المنتجات.${isEditing ? ' اترك الحقل فارغاً للإبقاء على الصورة الحالية.' : ''}`
              : `Uploads to the same server storage used by product images.${isEditing ? ' Leave empty to keep the current image.' : ''}`}
          </p>
        </div>
        <div>
          <Label>{isArabic ? 'رابط تضمين Google' : 'Google embed URL'}</Label>
          <Input value={form.googleEmbedUrl} onChange={(event) => setForm((prev) => ({...prev, googleEmbedUrl: event.target.value}))} />
          <p className="text-xs text-muted-foreground">
            {isArabic
              ? 'الصق رابط iframe من خرائط Google (مشاركة ← تضمين خريطة).'
              : 'Paste the iframe URL from Google Maps (Share → Embed a map).'}
          </p>
        </div>
        <div>
          <Label>{isArabic ? 'رابط الاتجاهات' : 'Directions URL'}</Label>
          <Input value={form.directionsUrl} onChange={(event) => setForm((prev) => ({...prev, directionsUrl: event.target.value}))} />
        </div>
        <div>
          <Label>{isArabic ? 'الهاتف' : 'Phone'}</Label>
          <Input value={form.phone} onChange={(event) => setForm((prev) => ({...prev, phone: event.target.value}))} />
        </div>
        <div>
          <Label>{isArabic ? 'الجوال' : 'Mobile'}</Label>
          <Input value={form.mobile} onChange={(event) => setForm((prev) => ({...prev, mobile: event.target.value}))} />
        </div>
        <div>
          <Label>{isArabic ? 'البريد الإلكتروني' : 'Email'}</Label>
          <Input value={form.email} onChange={(event) => setForm((prev) => ({...prev, email: event.target.value}))} />
        </div>
        <div>
          <Label>{isArabic ? 'ترتيب الظهور' : 'Sort order'}</Label>
          <Input
            type="number"
            value={form.sortOrder}
            onChange={(event) => setForm((prev) => ({...prev, sortOrder: Number(event.target.value)}))}
          />
        </div>
        <div className="md:col-span-2">
          <Button type="submit">{isEditing ? (isArabic ? 'حفظ التعديلات' : 'Update branch') : isArabic ? 'إضافة الفرع' : 'Create branch'}</Button>
        </div>
      </form>

      <div className="grid gap-6 md:grid-cols-2">
        {branches.map((branch) => (
          <div key={branch.id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{getTranslation(branch, isArabic ? 'ar' : 'en')?.name}</h3>
                <p className="text-xs text-muted-foreground">{branch.googleEmbedUrl.slice(0, 40)}...</p>
              </div>
              <div className="flex gap-1">
                    <Button type="button" variant="ghost" onClick={() => populateForm(branch)}>
                      {isArabic ? 'تعديل' : 'Edit'}
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => deleteBranch(branch.id)}>
                      {isArabic ? 'حذف' : 'Delete'}
                    </Button>
              </div>
            </div>
            {branch.imagePath && (
              <img
                src={asUploadUrl(branch.imagePath) ?? '/fallback-product.svg'}
                alt="Branch"
                className="mt-3 h-32 w-full rounded-xl object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
