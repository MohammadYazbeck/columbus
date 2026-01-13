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
  const body = await request.json();
  const categoryId = Number(params.id);
  if (Number.isNaN(categoryId)) {
    return NextResponse.json({error: 'Invalid id'}, {status: 400});
  }
  const updated = await prisma.category.update({
    where: {id: categoryId},
    data: {
      slug: body.slug,
      sortOrder: Number(body.sortOrder) || 0,
      isActive: String(body.isActive ?? 'true') === 'true'
    }
  });
  if (body.translations?.en || body.translations?.ar) {
    const entries = [
      body.translations.en && {locale: 'en', name: body.translations.en},
      body.translations.ar && {locale: 'ar', name: body.translations.ar}
    ].filter(Boolean) as {locale: string; name: string}[];
    await Promise.all(
      entries.map((translation) =>
        prisma.categoryTranslation.upsert({
          where: {categoryId_locale: {categoryId, locale: translation.locale}},
          update: {name: translation.name},
          create: {categoryId, ...translation}
        })
      )
    );
  }
  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, {params}: Params) {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
  const categoryId = Number(params.id);
  await prisma.category.delete({where: {id: categoryId}});
  return NextResponse.json({success: true});
}
