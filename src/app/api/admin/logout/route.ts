import {NextResponse} from 'next/server';
import {destroyAdminSession} from '@/src/lib/auth';

export async function POST() {
  destroyAdminSession();
  return NextResponse.json({success: true});
}
