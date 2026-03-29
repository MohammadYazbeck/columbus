import {NextResponse} from 'next/server';
import {prisma} from '@/src/lib/prisma';
import {getAdminSession} from '@/src/lib/auth';
import {saveBranchImage} from '@/src/lib/upload';

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

  try {
    const formData = await request.formData();
    const nameEn = String(formData.get('name_en') ?? '');
    const nameAr = String(formData.get('name_ar') ?? '');
    const addressEn = String(formData.get('address_en') ?? '');
    const addressAr = String(formData.get('address_ar') ?? '');
    const googleEmbedUrl = String(formData.get('googleEmbedUrl') ?? '');
    const directionsUrl = String(formData.get('directionsUrl') ?? '');
    const phone = String(formData.get('phone') ?? '');
    const mobile = String(formData.get('mobile') ?? '');
    const email = String(formData.get('email') ?? '');
    const sortOrderRaw = Number(formData.get('sortOrder') ?? 0);
    const sortOrder = Number.isNaN(sortOrderRaw) ? 0 : sortOrderRaw;
    const isActive = String(formData.get('isActive') ?? 'true') === 'true';
    const image = formData.get('image');

    if (!nameEn || !nameAr || !googleEmbedUrl) {
      return NextResponse.json({error: 'Missing translations'}, {status: 400});
    }

    const imagePath =
      image instanceof File && image.size > 0 ? await saveBranchImage(image) : null;

    const branch = await prisma.branch.create({
      data: {
        imagePath,
        phone: phone || null,
        mobile: mobile || null,
        email: email || null,
        googleEmbedUrl,
        directionsUrl: directionsUrl || null,
        isActive,
        sortOrder,
        translations: {
          create: [
            {locale: 'en', name: nameEn, address: addressEn},
            {locale: 'ar', name: nameAr, address: addressAr}
          ]
        }
      }
    });
    return NextResponse.json(branch, {status: 201});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: 'Failed to save branch'}, {status: 500});
  }
}
