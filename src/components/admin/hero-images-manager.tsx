'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/src/components/ui/button';
import {Input} from '@/src/components/ui/input';
import {Label} from '@/src/components/ui/label';
import {Select} from '@/src/components/ui/select';
import {asUploadUrl} from '@/src/lib/media';
import type {AdminLocale} from '@/src/lib/admin-locale';

type HeroImage = {
  id: number;
  filePath: string;
  sortOrder: number;
  isActive: boolean;
};

type EditMap = Record<
  number,
  {
    sortOrder: number;
    isActive: boolean;
  }
>;

const mapFromImages = (images: HeroImage[]): EditMap =>
  images.reduce<EditMap>((acc, image) => {
    acc[image.id] = {sortOrder: image.sortOrder, isActive: image.isActive};
    return acc;
  }, {});

export function HeroImagesManager({heroImages, locale}: {heroImages: HeroImage[]; locale: AdminLocale}) {
  const router = useRouter();
  const isArabic = locale === 'ar';
  const [form, setForm] = useState({
    sortOrder: heroImages.length + 1,
    isActive: 'true'
  });
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [edits, setEdits] = useState<EditMap>(() => mapFromImages(heroImages));
  const [replacementFiles, setReplacementFiles] = useState<Record<number, File | null>>({});

  useEffect(() => {
    setEdits(mapFromImages(heroImages));
    setForm((prev) => ({...prev, sortOrder: heroImages.length + 1}));
    setReplacementFiles({});
  }, [heroImages]);

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!heroFile) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('sortOrder', String(form.sortOrder));
      formData.append('isActive', form.isActive);
      formData.append('image', heroFile);
      const response = await fetch('/api/admin/hero-images', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        console.error('Failed to save hero image');
        return;
      }
      setHeroFile(null);
      setForm({sortOrder: heroImages.length + 2, isActive: 'true'});
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateEditField = (id: number, field: keyof EditMap[number], value: number | boolean) => {
    setEdits((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleSave = async (id: number) => {
    const data = edits[id];
    if (!data) return;
    const formData = new FormData();
    formData.append('sortOrder', String(data.sortOrder));
    formData.append('isActive', data.isActive ? 'true' : 'false');
    const replacementFile = replacementFiles[id];
    if (replacementFile) {
      formData.append('image', replacementFile);
    }
    await fetch(`/api/admin/hero-images/${id}`, {
      method: 'PATCH',
      body: formData
    });
    setReplacementFiles((prev) => ({...prev, [id]: null}));
    router.refresh();
  };

  const deleteImage = async (id: number) => {
    await fetch(`/api/admin/hero-images/${id}`, {method: 'DELETE'});
    router.refresh();
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleCreate} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6">
        <div>
          <h2 className="text-lg font-semibold text-primary">{isArabic ? 'إضافة صور الهيرو' : 'Add hero imagery'}</h2>
          <p className="text-sm text-muted-foreground">
            {isArabic
              ? 'ارفع صوراً طولية ليتم تمريرها تلقائياً داخل هيرو الصفحة الرئيسية.'
              : 'Upload vertical photos that will auto-scroll inside the home hero.'}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>{isArabic ? 'ترتيب الظهور' : 'Sort order'}</Label>
            <Input
              type="number"
              value={form.sortOrder}
              onChange={(event) => setForm((prev) => ({...prev, sortOrder: Number(event.target.value)}))}
              min={0}
            />
          </div>
          <div>
            <Label>{isArabic ? 'الحالة' : 'Status'}</Label>
            <Select
              value={form.isActive}
              onChange={(event) => setForm((prev) => ({...prev, isActive: event.target.value as 'true' | 'false'}))}
            >
              <option value="true">{isArabic ? 'نشط' : 'Active'}</option>
              <option value="false">{isArabic ? 'غير نشط' : 'Inactive'}</option>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label>{isArabic ? 'الصورة' : 'Image'}</Label>
            <Input
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={(event) => setHeroFile(event.target.files?.[0] ?? null)}
              required
            />
            <p className="text-xs text-muted-foreground">
              {isArabic ? 'المقاس المقترح 1920×1080 بحد أقصى 5MB.' : 'Recommended size 1920×1080px (max 5MB).'}
            </p>
          </div>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (isArabic ? 'جارٍ الحفظ...' : 'Saving...') : isArabic ? 'إضافة صورة الهيرو' : 'Add hero image'}
        </Button>
      </form>

      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary">{isArabic ? 'الصور الحالية' : 'Current images'}</h2>
          <p className="text-xs uppercase text-muted-foreground">
            {heroImages.length} items
          </p>
        </div>
        <div className="mt-4 space-y-4">
          {heroImages.length === 0 && (
            <p className="text-sm text-muted-foreground">
              {isArabic ? 'لا توجد صور هيرو حالياً. ارفع أول صورة من الأعلى.' : 'No hero imagery yet. Upload your first showcase above.'}
            </p>
          )}
          {heroImages.map((image) => {
            const editable = edits[image.id] ?? {sortOrder: image.sortOrder, isActive: image.isActive};
            return (
              <div
                key={image.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-100 p-4 md:flex-row md:items-center"
              >
                <div className="relative h-32 w-full overflow-hidden rounded-2xl bg-slate-100 md:h-40 md:w-28">
                  <Image
                    src={asUploadUrl(image.filePath) ?? '/fallback-product.svg'}
                    alt="Hero"
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <Label className="text-xs uppercase text-muted-foreground">{isArabic ? 'ترتيب الظهور' : 'Sort order'}</Label>
                      <Input
                        type="number"
                        value={editable.sortOrder}
                        onChange={(event) =>
                          updateEditField(image.id, 'sortOrder', Number(event.target.value) || 0)
                        }
                      />
                    </div>
                    <div>
                      <Label className="text-xs uppercase text-muted-foreground">{isArabic ? 'الحالة' : 'Status'}</Label>
                      <Select
                        value={editable.isActive ? 'true' : 'false'}
                        onChange={(event) => updateEditField(image.id, 'isActive', event.target.value === 'true')}
                      >
                        <option value="true">{isArabic ? 'نشط' : 'Active'}</option>
                        <option value="false">{isArabic ? 'غير نشط' : 'Inactive'}</option>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs uppercase text-muted-foreground">{isArabic ? 'استبدال الصورة' : 'Replace image'}</Label>
                    <Input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={(event) =>
                        setReplacementFiles((prev) => ({
                          ...prev,
                          [image.id]: event.target.files?.[0] ?? null
                        }))
                      }
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {isArabic ? 'اترك الحقل فارغاً للإبقاء على الصورة الحالية.' : 'Leave empty to keep the current image.'}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" onClick={() => handleSave(image.id)}>
                      {isArabic ? 'حفظ' : 'Save'}
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => deleteImage(image.id)}>
                      {isArabic ? 'حذف' : 'Delete'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
