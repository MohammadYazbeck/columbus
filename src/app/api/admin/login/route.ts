import {NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import {prisma} from '@/src/lib/prisma';
import {setAdminSession} from '@/src/lib/auth';

export async function POST(request: Request) {
  const {username, password} = await request.json();
  if (!username || !password) {
    return NextResponse.json({error: 'Missing credentials'}, {status: 400});
  }
  const admin = await prisma.adminUser.findUnique({where: {username}});
  if (!admin) {
    return NextResponse.json({error: 'Invalid credentials'}, {status: 401});
  }
  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return NextResponse.json({error: 'Invalid credentials'}, {status: 401});
  }
  setAdminSession(admin);
  return NextResponse.json({success: true});
}
