import Link from 'next/link';
import {ReactNode} from 'react';
import {redirect} from 'next/navigation';
import {getAdminSession} from '@/src/lib/auth';
import {LogoutButton} from '@/src/components/admin/logout-button';

export const dynamic = 'force-dynamic';

type Props = {
  children: ReactNode;
};

const navItems = [
  {href: '/admin/dashboard', label: 'Dashboard'},
  {href: '/admin/hero', label: 'Hero Images'},
  {href: '/admin/categories', label: 'Categories'},
  {href: '/admin/products', label: 'Products'},
  {href: '/admin/branches', label: 'Branches'},
  {href: '/admin/careers', label: 'Careers'},
  {href: '/admin/requests/jobs', label: 'Job Applications'}
];

export default function AdminProtectedLayout({children}: Props) {
  const session = getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white/90 p-6 md:flex">
        <div className="text-xl font-semibold text-primary">Colombus Admin</div>
        <nav className="mt-8 space-y-2 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded-lg px-3 py-2 hover:bg-slate-100">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <LogoutButton />
        </div>
      </aside>
      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-4">
          <p className="text-sm text-muted-foreground">Signed in as {session.username}</p>
          <LogoutButton variant="outline" />
        </header>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
