import {NextResponse} from 'next/server';
import {prisma} from '@/src/lib/prisma';
import {getAdminSession} from '@/src/lib/auth';

type Params = {
  params: {id: string};
};

export async function PATCH(request: Request, {params}: Params) {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
  const id = Number(params.id);
  const body = await request.json();
  const isActive =
    typeof body.isActive === 'boolean'
      ? body.isActive
      : String(body.isActive ?? 'true') === 'true';
  await prisma.careerSlot.update({
    where: {id},
    data: {
      isActive,
      sortOrder: Number(body.sortOrder) || 0
    }
  });

  const translations = body.translations ?? {};
  for (const locale of ['en', 'ar'] as const) {
    if (!translations[locale]) continue;
    await prisma.careerSlotTranslation.upsert({
      where: {careerSlotId_locale: {careerSlotId: id, locale}},
      update: {
        title: translations[locale].title,
        description: translations[locale].description ?? null
      },
      create: {
        careerSlotId: id,
        locale,
        title: translations[locale].title,
        description: translations[locale].description ?? null
      }
    });
  }

  return NextResponse.json({success: true});
}

export async function DELETE(_request: Request, {params}: Params) {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
  const id = Number(params.id);
  await prisma.careerSlot.delete({where: {id}});
  return NextResponse.json({success: true});
}
