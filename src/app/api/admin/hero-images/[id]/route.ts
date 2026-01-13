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
  if (Number.isNaN(id)) {
    return NextResponse.json({error: 'Invalid id'}, {status: 400});
  }
  const payload = await request.json();
  const data: Record<string, unknown> = {};
  if (typeof payload.sortOrder === 'number') {
    data.sortOrder = payload.sortOrder;
  }
  if (typeof payload.isActive === 'boolean') {
    data.isActive = payload.isActive;
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
