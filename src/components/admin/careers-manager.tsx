'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {Button} from '@/src/components/ui/button';
import {Input} from '@/src/components/ui/input';
import {Textarea} from '@/src/components/ui/textarea';
import {Label} from '@/src/components/ui/label';

type CareerSlot = {
  id: number;
  isActive: boolean;
  sortOrder: number;
  translations: {locale: string; title: string; description: string | null}[];
};

const getTranslation = (slot: CareerSlot, locale: 'en' | 'ar') =>
  slot.translations.find((t) => t.locale === locale);

export function CareersManager({careers}: {careers: CareerSlot[]}) {
  const router = useRouter();
  const [form, setForm] = useState({
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    sortOrder: 1
  });

  const createSlot = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetch('/api/admin/careers', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        sortOrder: form.sortOrder,
        translations: {
          en: {title: form.titleEn, description: form.descriptionEn},
          ar: {title: form.titleAr, description: form.descriptionAr}
        }
      })
    });
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
      <form onSubmit={createSlot} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-2">
        <div>
          <Label>Title (EN)</Label>
          <Input value={form.titleEn} onChange={(event) => setForm((prev) => ({...prev, titleEn: event.target.value}))} />
        </div>
        <div>
          <Label>العنوان (AR)</Label>
          <Input value={form.titleAr} onChange={(event) => setForm((prev) => ({...prev, titleAr: event.target.value}))} />
        </div>
        <div>
          <Label>Description (EN)</Label>
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
          <Label>Sort order</Label>
          <Input
            type="number"
            value={form.sortOrder}
            onChange={(event) => setForm((prev) => ({...prev, sortOrder: Number(event.target.value)}))}
          />
        </div>
        <div className="md:col-span-2">
          <Button type="submit">Create slot</Button>
        </div>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        {careers.map((career) => (
          <div key={career.id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{getTranslation(career, 'en')?.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {career.isActive ? 'Active' : 'Inactive'} · order {career.sortOrder}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => toggleActive(career)}>
                  {career.isActive ? 'Disable' : 'Enable'}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => deleteSlot(career.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
