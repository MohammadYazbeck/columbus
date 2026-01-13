'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/src/components/ui/button';
import { asUploadUrl } from '@/src/lib/media';
import type { Locale } from '@/src/i18n/routing';

type HeroImage = {
  id?: number;
  filePath: string;
};

type HeroProps = {
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  images: HeroImage[];
  locale: Locale;
};

const fallbackHeroImages: HeroImage[] = [
  {
    filePath:
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=2000&q=80'
  },
  {
    filePath:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2000&q=80'
  },
  {
    filePath:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2000&q=80'
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '20%' : '-20%',
    opacity: 0,
    scale: 1.04
  }),
  center: {
    x: '0%',
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-20%' : '20%',
    opacity: 0,
    scale: 0.97
  })
};

export function Hero({ title, subtitle, cta, href, images, locale }: HeroProps) {
  const sliderImages = useMemo(
    () => (images.length > 0 ? images : fallbackHeroImages),
    [images]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (sliderImages.length <= 1) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  const currentImage = sliderImages[currentIndex];
  const currentUrl = asUploadUrl(currentImage.filePath) ?? '/fallback-product.svg';
  const isRtl = locale === 'ar';

  return (
    <section className="relative min-h-[70vh] overflow-hidden rounded-[18px] border border-white/15 sm:min-h-[520px] lg:min-h-[600px]">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`${currentImage.filePath}-${currentIndex}`}
          className="absolute inset-0"
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          <Image
            src={currentUrl}
            alt="Colombus hero background"
            fill
            sizes="100vw"
            quality={95}
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0403]/85 via-[#30130b]/45 to-[#050202]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent)]" />
      <div
        className={`pointer-events-none absolute top-4 z-10 flex w-full px-4 sm:px-6 lg:px-16 ${
          isRtl ? 'justify-end' : 'justify-start'
        }`}
      >
        <div
          className="flex items-center gap-3 rounded-full border border-white/30 bg-white/12 px-5 py-2 text-white backdrop-blur-xl shadow-[0_20px_35px_rgba(0,0,0,0.35)]"
          style={{
            [isRtl ? 'marginRight' : 'marginLeft']: '-1.5rem'
          }}
        >
          <div className="h-10 overflow-hidden rounded-full">
            <Image
              src="/badge.png"
              alt="Colombus"
              width={128}
              height={40}
              className="h-full w-auto object-contain"
            />
          </div>
        </div>
      </div>
      <div className="relative z-10 flex min-h-[70vh] flex-col justify-end px-4 pb-6 pt-24 sm:min-h-[520px] sm:px-6 sm:pb-12 sm:pt-40 lg:min-h-[600px] lg:px-14">
        <motion.div
          className="w-full max-w-3xl rounded-2xl border border-white/15 bg-white/0 p-5 text-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/70 sm:text-xs">
            Colombus Reserve
          </p>
          <h1 className="mt-3 text-2xl font-semibold sm:mt-4 sm:text-3xl lg:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-white/85 sm:text-base">{subtitle}</p>
          <Button
            asChild
            size="lg"
            variant="accent"
            className="mt-6 w-full rounded-full px-8 py-5 text-base shadow-[0_20px_35px_rgba(0,0,0,0.25)] sm:w-auto sm:px-10 sm:py-6"
          >
            <a href={href}>{cta}</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
