import {NextResponse} from 'next/server';
import {prisma} from '@/src/lib/prisma';
import {getAdminSession} from '@/src/lib/auth';
import {saveBranchImage} from '@/src/lib/upload';

type Params = {
  params: {id: string};
};

export async function PATCH(request: Request, {params}: Params) {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  try {
    const id = Number(params.id);
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

    const data: {
      imagePath?: string | null;
      phone: string | null;
      mobile: string | null;
      email: string | null;
      googleEmbedUrl: string;
      directionsUrl: string | null;
      isActive: boolean;
      sortOrder: number;
    } = {
      phone: phone || null,
      mobile: mobile || null,
      email: email || null,
      googleEmbedUrl,
      directionsUrl: directionsUrl || null,
      isActive,
      sortOrder
    };

    if (image instanceof File && image.size > 0) {
      data.imagePath = await saveBranchImage(image);
    }

    const branch = await prisma.branch.update({
      where: {id},
      data
    });

    if (nameEn) {
      await prisma.branchTranslation.upsert({
        where: {branchId_locale: {branchId: id, locale: 'en'}},
        update: {name: nameEn, address: addressEn},
        create: {branchId: id, locale: 'en', name: nameEn, address: addressEn}
      });
    }
    if (nameAr) {
      await prisma.branchTranslation.upsert({
        where: {branchId_locale: {branchId: id, locale: 'ar'}},
        update: {name: nameAr, address: addressAr},
        create: {branchId: id, locale: 'ar', name: nameAr, address: addressAr}
      });
    }

    return NextResponse.json(branch);
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: 'Failed to update branch'}, {status: 500});
  }
}

export async function DELETE(_request: Request, {params}: Params) {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
  const id = Number(params.id);
  await prisma.branch.delete({where: {id}});
  return NextResponse.json({success: true});
}
