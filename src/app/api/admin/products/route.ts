import {NextResponse} from 'next/server';
import {prisma} from '@/src/lib/prisma';
import {getAdminSession} from '@/src/lib/auth';
import {saveProductMedia} from '@/src/lib/upload';

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

export async function GET() {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
  const products = await prisma.product.findMany({
    include: {
      translations: true,
      media: {orderBy: {sortOrder: 'asc'}},
      category: {select: {id: true, slug: true}}
    }
  });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  const formData = await request.formData();
  const slug = String(formData.get('slug') ?? '');
  const categoryId = Number(formData.get('categoryId'));
  const sortOrderRaw = Number(formData.get('sortOrder') ?? 0);
  const sortOrder = Number.isNaN(sortOrderRaw) ? 0 : sortOrderRaw;
  const isActive = String(formData.get('isActive') ?? 'true') === 'true';
  const isFeatured = String(formData.get('isFeatured') ?? 'false') === 'true';
  const featuredOrder = formData.get('featuredOrder')
    ? Number(formData.get('featuredOrder'))
    : null;
  const enName = String(formData.get('name_en') ?? '');
  const arName = String(formData.get('name_ar') ?? '');
  const pointsEn = parsePoints(String(formData.get('points_en') ?? ''));
  const pointsAr = parsePoints(String(formData.get('points_ar') ?? ''));

  if (!slug || Number.isNaN(categoryId) || !enName || !arName) {
    return NextResponse.json({error: 'Missing fields'}, {status: 400});
  }

  const product = await prisma.product.create({
    data: {
      slug,
      categoryId,
      sortOrder,
      isActive,
      isFeatured,
      featuredOrder,
      translations: {
        create: [
          {locale: 'en', name: enName, points: pointsEn},
          {locale: 'ar', name: arName, points: pointsAr}
        ]
      }
    }
  });

  const mediaFiles = formData.getAll('media').filter((file): file is File => file instanceof File);
  for (let index = 0; index < mediaFiles.length; index += 1) {
    const file = mediaFiles[index];
    if (!file || file.size === 0) continue;
    const filePath = await saveProductMedia(file);
    await prisma.productMedia.create({
      data: {productId: product.id, filePath, sortOrder: index + 1}
    });
  }

  return NextResponse.json({success: true, productId: product.id}, {status: 201});
}
