import {NextResponse} from 'next/server';
import {prisma} from '@/src/lib/prisma';
import {getAdminSession} from '@/src/lib/auth';
import {saveHeroImage} from '@/src/lib/upload';

export async function GET() {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
  const heroImages = await prisma.heroImage.findMany({
    orderBy: {sortOrder: 'asc'}
  });
  return NextResponse.json(heroImages);
}

export async function POST(request: Request) {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  try {
    const formData = await request.formData();
    const sortOrderRaw = Number(formData.get('sortOrder') ?? 0);
    const sortOrder = Number.isNaN(sortOrderRaw) ? 0 : sortOrderRaw;
    const isActive = String(formData.get('isActive') ?? 'true') === 'true';
    const image = formData.get('image');
    if (!(image instanceof File) || image.size === 0) {
      return NextResponse.json({error: 'Missing image'}, {status: 400});
    }
    const filePath = await saveHeroImage(image);
    const heroImage = await prisma.heroImage.create({
      data: {filePath, sortOrder, isActive}
    });
    return NextResponse.json(heroImage, {status: 201});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: 'Failed to save hero image'}, {status: 500});
  }
}
