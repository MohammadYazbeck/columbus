import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {createHmac, timingSafeEqual} from 'crypto';
import type {AdminUser} from '@prisma/client';

const COOKIE_NAME = 'colombus_admin';

type SessionPayload = {
  userId: number;
  username: string;
  iat: number;
};

const secret = () => {
  if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET is not configured');
  }
  return process.env.SESSION_SECRET;
};

function encode(payload: SessionPayload) {
  const base = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = createHmac('sha256', secret()).update(base).digest('base64url');
  return `${base}.${signature}`;
}

function decode(token: string): SessionPayload | null {
  try {
    const [base, signature] = token.split('.');
    if (!base || !signature) return null;
    const expected = createHmac('sha256', secret()).update(base).digest('base64url');
    const valid =
      expected.length === signature.length &&
      timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
    if (!valid) return null;
    const payload = JSON.parse(Buffer.from(base, 'base64url').toString());
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export function setAdminSession(user: Pick<AdminUser, 'id' | 'username'>) {
  const payload: SessionPayload = {
    userId: user.id,
    username: user.username,
    iat: Date.now()
  };
  const token = encode(payload);
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 12,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  });
}

export function destroyAdminSession() {
  cookies().delete(COOKIE_NAME);
}

export function getAdminSession() {
  const cookie = cookies().get(COOKIE_NAME);
  if (!cookie) return null;
  return decode(cookie.value);
}

export function requireAdminSession() {
  const session = getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }
  return session;
}
