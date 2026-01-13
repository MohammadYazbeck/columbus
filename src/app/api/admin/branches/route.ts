import {NextResponse} from 'next/server';
import {prisma} from '@/src/lib/prisma';
import {getAdminSession} from '@/src/lib/auth';

export async function GET() {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
  const branches = await prisma.branch.findMany({
    include: {translations: true},
    orderBy: {sortOrder: 'asc'}
  });
  return NextResponse.json(branches);
}

export async function POST(request: Request) {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
  const body = await request.json();
  if (!body.translations?.en?.name || !body.translations?.ar?.name || !body.googleEmbedUrl) {
    return NextResponse.json({error: 'Missing translations'}, {status: 400});
  }
  const isActive =
    typeof body.isActive === 'boolean'
      ? body.isActive
      : String(body.isActive ?? 'true') === 'true';
  const branch = await prisma.branch.create({
    data: {
      imagePath: body.imagePath ?? null,
      phone: body.phone ?? null,
      mobile: body.mobile ?? null,
      email: body.email ?? null,
      googleEmbedUrl: body.googleEmbedUrl,
      directionsUrl: body.directionsUrl ?? null,
      isActive,
      sortOrder: Number(body.sortOrder) || 0,
      translations: {
        create: [
          {locale: 'en', name: body.translations.en.name, address: body.translations.en.address},
          {locale: 'ar', name: body.translations.ar.name, address: body.translations.ar.address}
        ]
      }
    }
  });
  return NextResponse.json(branch, {status: 201});
}
