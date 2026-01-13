'use client';

import {useRouter} from 'next/navigation';
import {Button} from '@/src/components/ui/button';

export function LogoutButton({variant = 'ghost'}: {variant?: 'ghost' | 'outline'}) {
  const router = useRouter();
  const handleClick = async () => {
    await fetch('/api/admin/logout', {method: 'POST'});
    router.push('/admin/login');
    router.refresh();
  };
  return (
    <Button type="button" variant={variant} onClick={handleClick}>
      Logout
    </Button>
  );
}
