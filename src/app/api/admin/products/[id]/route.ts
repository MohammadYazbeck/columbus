import {NextResponse} from 'next/server';
import {prisma} from '@/src/lib/prisma';
import {getAdminSession} from '@/src/lib/auth';
import {saveProductMedia} from '@/src/lib/upload';

type Params = {
  params: {id: string};
};

const parsePoints = (raw: string) =>
  raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split(':');
      return {label: label.trim(), value: rest.join(':').trim()};
    })
    .filter((item) => item.label && item.value);

export async function PATCH(request: Request, {params}: Params) {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
  const productId = Number(params.id);
  const formData = await request.formData();
  const sortOrderRaw = Number(formData.get('sortOrder') ?? 0);
  const data = {
    slug: String(formData.get('slug') ?? ''),
    categoryId: Number(formData.get('categoryId')),
    sortOrder: Number.isNaN(sortOrderRaw) ? 0 : sortOrderRaw,
    isActive: String(formData.get('isActive') ?? 'true') === 'true',
    isFeatured: String(formData.get('isFeatured') ?? 'false') === 'true',
    featuredOrder: formData.get('featuredOrder')
      ? Number(formData.get('featuredOrder'))
      : null
  };
  if (Number.isNaN(data.categoryId)) {
    return NextResponse.json({error: 'Invalid category'}, {status: 400});
  }
  await prisma.product.update({
    where: {id: productId},
    data
  });

  const enName = String(formData.get('name_en') ?? '');
  const arName = String(formData.get('name_ar') ?? '');
  const pointsEn = parsePoints(String(formData.get('points_en') ?? ''));
  const pointsAr = parsePoints(String(formData.get('points_ar') ?? ''));

  if (enName) {
    await prisma.productTranslation.upsert({
      where: {productId_locale: {productId, locale: 'en'}},
      update: {name: enName, points: pointsEn},
      create: {productId, locale: 'en', name: enName, points: pointsEn}
    });
  }
  if (arName) {
    await prisma.productTranslation.upsert({
      where: {productId_locale: {productId, locale: 'ar'}},
      update: {name: arName, points: pointsAr},
      create: {productId, locale: 'ar', name: arName, points: pointsAr}
    });
  }

  const mediaFiles = formData.getAll('media').filter((file): file is File => file instanceof File);
  const shouldReplace = String(formData.get('replaceMedia') ?? 'false') === 'true';
  if (shouldReplace) {
    await prisma.productMedia.deleteMany({where: {productId}});
  }
  for (let index = 0; index < mediaFiles.length; index += 1) {
    const file = mediaFiles[index];
    if (!file || file.size === 0) continue;
    const filePath = await saveProductMedia(file);
    await prisma.productMedia.create({
      data: {productId, filePath, sortOrder: index + 1}
    });
  }

  return NextResponse.json({success: true});
}

export async function DELETE(_request: Request, {params}: Params) {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
  const productId = Number(params.id);
  await prisma.product.delete({where: {id: productId}});
  return NextResponse.json({success: true});
}
