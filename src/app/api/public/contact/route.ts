import {NextResponse} from 'next/server';
import {contactSchema} from '@/src/lib/validation';
import {prisma} from '@/src/lib/prisma';
import {isCaptchaEnabled} from '@/src/lib/features';

export async function POST(request: Request) {
  const data = await request.json();
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({error: parsed.error.flatten()}, {status: 400});
  }
  if (isCaptchaEnabled() && !parsed.data.captchaToken) {
    return NextResponse.json({error: 'Captcha required'}, {status: 400});
  }
  await prisma.contactSubmission.create({
    data: {
      locale: parsed.data.locale,
      name: parsed.data.name,
      email: parsed.data.email,
      title: parsed.data.title,
      message: parsed.data.message
    }
  });
  return NextResponse.json({success: true});
}
