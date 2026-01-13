import {redirect} from 'next/navigation';
import {getAdminSession} from '@/src/lib/auth';

export default function AdminIndexPage() {
  const session = getAdminSession();
  if (session) {
    redirect('/admin/dashboard');
  }
  redirect('/admin/login');
}
