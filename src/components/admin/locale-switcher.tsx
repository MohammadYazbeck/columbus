'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import type {AdminLocale} from '@/src/lib/admin-locale';

type Props = {
  locale: AdminLocale;
};

export function AdminLocaleSwitcher({locale}: Props) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const updateLocale = async (nextLocale: AdminLocale) => {
    if (nextLocale === locale || isSaving) return;
    setIsSaving(true);
    try {
      await fetch('/api/admin/preferences/locale', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({locale: nextLocale})
      });
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-white p-1">
      {([
        {value: 'ar', label: 'العربية'},
        {value: 'en', label: 'English'}
      ] as const).map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => updateLocale(item.value)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            locale === item.value ? 'bg-[#ab1d1d] text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
          disabled={isSaving}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
