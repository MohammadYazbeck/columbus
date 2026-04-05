'use client';

import {useRouter} from 'next/navigation';
import {Button} from '@/src/components/ui/button';

export function LogoutButton({
  variant = 'ghost',
  label
}: {
  variant?: 'ghost' | 'outline';
  label: string;
}) {
  const router = useRouter();
  const handleClick = async () => {
    await fetch('/api/admin/logout', {method: 'POST'});
    router.push('/admin/login');
    router.refresh();
  };
  return (
    <Button type="button" variant={variant} onClick={handleClick}>
      {label}
    </Button>
  );
}
