import {NextResponse} from 'next/server';
import {prisma} from '@/src/lib/prisma';
import {getAdminSession} from '@/src/lib/auth';

export async function GET() {
  if (!getAdminSession()) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: {createdAt: 'desc'},
    take: 200
  });
  return NextResponse.json(submissions);
}
