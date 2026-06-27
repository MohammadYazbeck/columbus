import Link from 'next/link';
import {ReactNode} from 'react';
import {redirect} from 'next/navigation';
import {getAdminSession} from '@/src/lib/auth';
import {LogoutButton} from '@/src/components/admin/logout-button';
import {AdminLocaleSwitcher} from '@/src/components/admin/locale-switcher';
import {getAdminDirection, getAdminLocale} from '@/src/lib/admin-locale';

export const dynamic = 'force-dynamic';

type Props = {
  children: ReactNode;
};

export default function AdminProtectedLayout({children}: Props) {
  const session = getAdminSession();
  const locale = getAdminLocale();
  const isArabic = locale === 'ar';
  const dir = getAdminDirection(locale);
  if (!session) {
    redirect('/admin/login');
  }

  const navItems = [
    {href: '/admin/dashboard', label: isArabic ? 'لوحة التحكم' : 'Dashboard'},
    {href: '/admin/hero', label: isArabic ? 'صور الهيرو' : 'Hero Images'},
    {href: '/admin/categories', label: isArabic ? 'الفئات' : 'Categories'},
    {href: '/admin/products', label: isArabic ? 'المنتجات' : 'Products'},
    {href: '/admin/branches', label: isArabic ? 'الفروع' : 'Branches'},
    {href: '/admin/careers', label: isArabic ? 'الوظائف' : 'Careers'},
    {href: '/admin/requests/jobs', label: isArabic ? 'طلبات التوظيف' : 'Job Applications'}
  ];

  return (
    <div dir={dir} className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white/90 p-6 md:flex">
        <div className="text-xl font-semibold text-primary">
          {isArabic ? 'لوحة تحكم كولومبوس' : 'Columbus Admin'}
        </div>
        <nav className="mt-8 space-y-2 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded-lg px-3 py-2 hover:bg-slate-100">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <LogoutButton label={isArabic ? 'تسجيل الخروج' : 'Logout'} />
        </div>
      </aside>
      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-4">
          <p className="text-sm text-muted-foreground">
            {isArabic ? `تم تسجيل الدخول بواسطة ${session.username}` : `Signed in as ${session.username}`}
          </p>
          <div className="flex items-center gap-3">
            <AdminLocaleSwitcher locale={locale} />
            <LogoutButton variant="outline" label={isArabic ? 'تسجيل الخروج' : 'Logout'} />
          </div>
        </header>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
