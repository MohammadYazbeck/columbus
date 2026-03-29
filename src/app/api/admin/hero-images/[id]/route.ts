import {NextResponse} from 'next/server';
import {prisma} from '@/src/lib/prisma';
import {getAdminSession} from '@/src/lib/auth';
import {saveHeroImage} from '@/src/lib/upload';

type Params = {
  params: {id: string};
};

export async function PATCH(request: Request, {params}: Params) {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({error: 'Invalid id'}, {status: 400});
  }

  const contentType = request.headers.get('content-type') ?? '';
  const data: Record<string, unknown> = {};

  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData();
    const sortOrderRaw = Number(formData.get('sortOrder'));
    if (!Number.isNaN(sortOrderRaw)) {
      data.sortOrder = sortOrderRaw;
    }
    const isActiveValue = String(formData.get('isActive') ?? '');
    if (isActiveValue === 'true' || isActiveValue === 'false') {
      data.isActive = isActiveValue === 'true';
    }
    const image = formData.get('image');
    if (image instanceof File && image.size > 0) {
      data.filePath = await saveHeroImage(image);
    }
  } else {
    const payload = await request.json();
    if (typeof payload.sortOrder === 'number') {
      data.sortOrder = payload.sortOrder;
    }
    if (typeof payload.isActive === 'boolean') {
      data.isActive = payload.isActive;
    }
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({error: 'No fields to update'}, {status: 400});
  }
  const heroImage = await prisma.heroImage.update({
    where: {id},
    data
  });
  return NextResponse.json(heroImage);
}

export async function DELETE(_request: Request, {params}: Params) {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({error: 'Invalid id'}, {status: 400});
  }
  await prisma.heroImage.delete({where: {id}});
  return NextResponse.json({success: true});
}
