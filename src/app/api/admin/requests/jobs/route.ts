import {NextResponse} from 'next/server';
import {prisma} from '@/src/lib/prisma';
import {getAdminSession} from '@/src/lib/auth';

export async function GET() {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
  const applications = await prisma.jobApplication.findMany({
    include: {careerSlot: {include: {translations: true}}},
    orderBy: {createdAt: 'desc'},
    take: 200
  });
  return NextResponse.json(applications);
}
