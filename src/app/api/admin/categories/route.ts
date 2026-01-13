import {NextResponse} from 'next/server';
import {prisma} from '@/src/lib/prisma';
import {getAdminSession} from '@/src/lib/auth';

export async function GET() {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
  const categories = await prisma.category.findMany({
    include: {translations: true},
    orderBy: {sortOrder: 'asc'}
  });
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
  const body = await request.json();
  const {slug, sortOrder, isActive, translations} = body;
  if (!slug || !translations?.en || !translations?.ar) {
    return NextResponse.json({error: 'Invalid payload'}, {status: 400});
  }
  const category = await prisma.category.create({
    data: {
      slug,
      sortOrder: Number(sortOrder) || 0,
      isActive: String(isActive ?? 'true') === 'true',
      translations: {
        create: [
          {locale: 'en', name: translations.en},
          {locale: 'ar', name: translations.ar}
        ]
      }
    },
    include: {translations: true}
  });
  return NextResponse.json(category, {status: 201});
}
