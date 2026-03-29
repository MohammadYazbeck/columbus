import {z} from 'zod';

export const jobApplicationSchema = z.object({
  locale: z.enum(['en', 'ar']),
  careerSlotId: z.number().int(),
  fullName: z.string().min(3).max(120),
  birthDate: z.string(),
  bornCity: z.string().min(2).max(120),
  sex: z.enum(['male', 'female']),
  nationality: z.string().min(2).max(80),
  phoneNumber: z.string().min(6).max(30),
  email: z.string().email(),
  socialState: z.enum(['single', 'married']),
  captchaToken: z.string().optional()
});
