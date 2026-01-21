'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {Button} from '@/src/components/ui/button';
import {Input} from '@/src/components/ui/input';
import {Label} from '@/src/components/ui/label';
import {Textarea} from '@/src/components/ui/textarea';
import {asUploadUrl} from '@/src/lib/media';

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

const getTranslation = (branch: Branch, locale: 'en' | 'ar') =>
  branch.translations.find((t) => t.locale === locale);

const normalizeEmbedUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  const match = trimmed.match(/src="([^"]+)"/i);
  return match ? match[1] : trimmed;
};

export function BranchesManager({branches}: {branches: Branch[]}) {
  const router = useRouter();
  const [form, setForm] = useState({
    nameEn: '',
    addressEn: '',
    nameAr: '',
    addressAr: '',
    imagePath: '',
    googleEmbedUrl: '',
    directionsUrl: '',
    phone: '',
    mobile: '',
    email: '',
    sortOrder: 1
  });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetch('/api/admin/branches', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        imagePath: form.imagePath,
        googleEmbedUrl: normalizeEmbedUrl(form.googleEmbedUrl),
        directionsUrl: form.directionsUrl,
        phone: form.phone,
        mobile: form.mobile,
        email: form.email,
        sortOrder: form.sortOrder,
        translations: {
          en: {name: form.nameEn, address: form.addressEn},
          ar: {name: form.nameAr, address: form.addressAr}
        }
      })
    });
    router.refresh();
  };

  const deleteBranch = async (id: number) => {
    await fetch(`/api/admin/branches/${id}`, {method: 'DELETE'});
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-2">
        <div>
          <Label>Name (EN)</Label>
          <Input value={form.nameEn} onChange={(event) => setForm((prev) => ({...prev, nameEn: event.target.value}))} />
        </div>
        <div>
          <Label>الاسم (AR)</Label>
          <Input value={form.nameAr} onChange={(event) => setForm((prev) => ({...prev, nameAr: event.target.value}))} />
        </div>
        <div>
          <Label>Address (EN)</Label>
          <Textarea value={form.addressEn} onChange={(event) => setForm((prev) => ({...prev, addressEn: event.target.value}))} />
        </div>
        <div>
          <Label>العنوان (AR)</Label>
          <Textarea value={form.addressAr} onChange={(event) => setForm((prev) => ({...prev, addressAr: event.target.value}))} />
        </div>
        <div>
          <Label>Image path or URL</Label>
          <Input value={form.imagePath} onChange={(event) => setForm((prev) => ({...prev, imagePath: event.target.value}))} />
          <p className="text-xs text-muted-foreground">Use /uploads/... or https://</p>
        </div>
        <div>
          <Label>Google embed URL</Label>
          <Input value={form.googleEmbedUrl} onChange={(event) => setForm((prev) => ({...prev, googleEmbedUrl: event.target.value}))} />
          <p className="text-xs text-muted-foreground">
            Paste the iframe URL from Google Maps (Share → Embed a map).
          </p>
        </div>
        <div>
          <Label>Directions URL</Label>
          <Input value={form.directionsUrl} onChange={(event) => setForm((prev) => ({...prev, directionsUrl: event.target.value}))} />
        </div>
        <div>
          <Label>Phone</Label>
          <Input value={form.phone} onChange={(event) => setForm((prev) => ({...prev, phone: event.target.value}))} />
        </div>
        <div>
          <Label>Mobile</Label>
          <Input value={form.mobile} onChange={(event) => setForm((prev) => ({...prev, mobile: event.target.value}))} />
        </div>
        <div>
          <Label>Email</Label>
          <Input value={form.email} onChange={(event) => setForm((prev) => ({...prev, email: event.target.value}))} />
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
          <Button type="submit">Create branch</Button>
        </div>
      </form>

      <div className="grid gap-6 md:grid-cols-2">
        {branches.map((branch) => (
          <div key={branch.id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{getTranslation(branch, 'en')?.name}</h3>
                <p className="text-xs text-muted-foreground">{branch.googleEmbedUrl.slice(0, 40)}...</p>
              </div>
              <Button variant="ghost" onClick={() => deleteBranch(branch.id)}>
                Delete
              </Button>
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
