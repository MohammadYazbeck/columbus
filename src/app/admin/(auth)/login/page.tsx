import {redirect} from 'next/navigation';
import {getAdminSession} from '@/src/lib/auth';
import {AdminLoginForm} from '@/src/components/admin/login-form';

export default function AdminLoginPage() {
  const session = getAdminSession();
  if (session) {
    redirect('/admin/dashboard');
  }
  return <AdminLoginForm />;
}
