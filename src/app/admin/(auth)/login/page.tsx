import {redirect} from 'next/navigation';
import {getAdminSession} from '@/src/lib/auth';
import {AdminLoginForm} from '@/src/components/admin/login-form';
import {getAdminLocale} from '@/src/lib/admin-locale';

export default function AdminLoginPage() {
  const session = getAdminSession();
  const locale = getAdminLocale();
  if (session) {
    redirect('/admin/dashboard');
  }
  return <AdminLoginForm locale={locale} />;
}
