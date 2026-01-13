import {z} from 'zod';

export const contactSchema = z.object({
  locale: z.enum(['en', 'ar']),
  name: z.string().min(3).max(120),
  email: z.string().email(),
  title: z.string().min(3).max(150),
  message: z.string().min(10).max(1000),
  captchaToken: z.string().optional()
});

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
