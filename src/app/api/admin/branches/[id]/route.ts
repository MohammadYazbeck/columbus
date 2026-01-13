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
  const branch = await prisma.branch.update({
    where: {id},
    data: {
      imagePath: body.imagePath ?? null,
      phone: body.phone ?? null,
      mobile: body.mobile ?? null,
      email: body.email ?? null,
      googleEmbedUrl: body.googleEmbedUrl,
      directionsUrl: body.directionsUrl ?? null,
      isActive,
      sortOrder: Number(body.sortOrder) || 0
    }
  });

  if (body.translations?.en?.name) {
    await prisma.branchTranslation.upsert({
      where: {branchId_locale: {branchId: id, locale: 'en'}},
      update: {name: body.translations.en.name, address: body.translations.en.address},
      create: {branchId: id, locale: 'en', name: body.translations.en.name, address: body.translations.en.address}
    });
  }
  if (body.translations?.ar?.name) {
    await prisma.branchTranslation.upsert({
      where: {branchId_locale: {branchId: id, locale: 'ar'}},
      update: {name: body.translations.ar.name, address: body.translations.ar.address},
      create: {branchId: id, locale: 'ar', name: body.translations.ar.name, address: body.translations.ar.address}
    });
  }

  return NextResponse.json(branch);
}

export async function DELETE(_request: Request, {params}: Params) {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
  const id = Number(params.id);
  await prisma.branch.delete({where: {id}});
  return NextResponse.json({success: true});
}
