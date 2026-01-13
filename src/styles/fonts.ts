import {Urbanist, Cairo} from 'next/font/google';

export const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-urbanist'
});

export const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cairo'
});
