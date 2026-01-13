import {NextResponse} from 'next/server';
import {jobApplicationSchema} from '@/src/lib/validation';
import {isCaptchaEnabled} from '@/src/lib/features';
import {prisma} from '@/src/lib/prisma';
import {saveJobCv} from '@/src/lib/upload';

export async function POST(request: Request) {
  const formData = await request.formData();
  const careerSlotId = Number(formData.get('careerSlotId'));
  const payload = {
    locale: String(formData.get('locale') ?? 'en') as 'en' | 'ar',
    careerSlotId: Number.isNaN(careerSlotId) ? 0 : careerSlotId,
    fullName: String(formData.get('fullName') ?? ''),
    birthDate: String(formData.get('birthDate') ?? ''),
    bornCity: String(formData.get('bornCity') ?? ''),
    sex: (formData.get('sex') ?? 'male') as 'male' | 'female',
    nationality: String(formData.get('nationality') ?? ''),
    phoneNumber: String(formData.get('phoneNumber') ?? ''),
    email: String(formData.get('email') ?? ''),
    socialState: (formData.get('socialState') ?? 'single') as 'single' | 'married',
    captchaToken: String(formData.get('captchaToken') ?? '')
  };

  const parsed = jobApplicationSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({error: parsed.error.flatten()}, {status: 400});
  }
  if (isCaptchaEnabled() && !parsed.data.captchaToken) {
    return NextResponse.json({error: 'Captcha required'}, {status: 400});
  }

  let cvFilePath: string | null = null;
  const cv = formData.get('cv');
  if (cv instanceof File && cv.size > 0) {
    cvFilePath = await saveJobCv(cv);
  }

  await prisma.jobApplication.create({
    data: {
      ...parsed.data,
      birthDate: new Date(parsed.data.birthDate),
      cvFilePath
    }
  });

  return NextResponse.json({success: true});
}
