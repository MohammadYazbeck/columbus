'use client';

import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/src/components/ui/button';
import {Input} from '@/src/components/ui/input';
import {Label} from '@/src/components/ui/label';

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');

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
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg"
      >
        <h1 className="text-2xl font-semibold text-primary">Colombus Admin</h1>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" name="username" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" required />
        </div>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </div>
  );
}
