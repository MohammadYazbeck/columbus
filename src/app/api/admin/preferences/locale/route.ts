import {NextResponse} from 'next/server';
import {setAdminLocale, type AdminLocale} from '@/src/lib/admin-locale';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const locale = body?.locale;
  if (locale !== 'ar' && locale !== 'en') {
    return NextResponse.json({error: 'Invalid locale'}, {status: 400});
  }

  setAdminLocale(locale as AdminLocale);
  return NextResponse.json({success: true});
}
