'use client';

import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/src/components/ui/button';
import {Input} from '@/src/components/ui/input';
import {Label} from '@/src/components/ui/label';
import {AdminLocaleSwitcher} from '@/src/components/admin/locale-switcher';
import type {AdminLocale} from '@/src/lib/admin-locale';

export function AdminLoginForm({locale}: {locale: AdminLocale}) {
  const router = useRouter();
  const [error, setError] = useState('');
  const isArabic = locale === 'ar';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      username: formData.get('username'),
      password: formData.get('password')
    };
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      router.push('/admin/dashboard');
      router.refresh();
    } else {
      setError(isArabic ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials');
    }
  };

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className="flex min-h-screen items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg"
      >
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-primary">
            {isArabic ? 'لوحة تحكم كولومبوس' : 'Columbus Admin'}
          </h1>
          <AdminLocaleSwitcher locale={locale} />
        </div>
        <div>
          <Label htmlFor="username">{isArabic ? 'اسم المستخدم' : 'Username'}</Label>
          <Input id="username" name="username" required />
        </div>
        <div>
          <Label htmlFor="password">{isArabic ? 'كلمة المرور' : 'Password'}</Label>
          <Input id="password" type="password" name="password" required />
        </div>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <Button type="submit" className="w-full">
          {isArabic ? 'تسجيل الدخول' : 'Sign in'}
        </Button>
      </form>
    </div>
  );
}
