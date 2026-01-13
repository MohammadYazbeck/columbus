import {NextResponse} from 'next/server';
import {prisma} from '@/src/lib/prisma';
import {getAdminSession} from '@/src/lib/auth';

export async function GET() {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
  const careers = await prisma.careerSlot.findMany({
    include: {translations: true},
    orderBy: {sortOrder: 'asc'}
  });
  return NextResponse.json(careers);
}

export async function POST(request: Request) {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
  const body = await request.json();
  const isActive =
    typeof body.isActive === 'boolean'
      ? body.isActive
      : String(body.isActive ?? 'true') === 'true';
  const career = await prisma.careerSlot.create({
    data: {
      isActive,
      sortOrder: Number(body.sortOrder) || 0,
      translations: {
        create: [
          {
            locale: 'en',
            title: body.translations?.en?.title ?? '',
            description: body.translations?.en?.description ?? null
          },
          {
            locale: 'ar',
            title: body.translations?.ar?.title ?? '',
            description: body.translations?.ar?.description ?? null
          }
        ]
      }
    }
  });
  return NextResponse.json(career, {status: 201});
}
