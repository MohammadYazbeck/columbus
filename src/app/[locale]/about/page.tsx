'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Locale } from '@/src/i18n/routing';
import {
  aboutHighlights,
  aboutIntro,
  aboutNarrative,
  aboutPillars
} from '@/src/data/about';

type Props = {
  params: { locale: Locale };
};

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

export default function AboutPage({ params }: Props) {
  const { locale } = params;
  const lang = locale === 'ar' ? 'ar' : 'en';

  return (
    <div className="space-y-10 text-primary">
      <motion.section
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.1 }}
        className="rounded-[28px] bg-black/90 p-8 text-[#fdf7f2] shadow-[0_55px_100px_rgba(0,0,0,0.1)] md:p-12"
      >
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.5em] text-[#FF0000]">
            {aboutIntro.welcome[lang]}
          </p>
          <h1 className="text-5xl font-semibold text-[#ffffff] md:text-6xl">
            {aboutIntro.title[lang]}
          </h1>
          <blockquote className="rounded-[14px] border border-amber-100/20 bg-black px-6 py-5 text-base italic leading-relaxed text-[#fdf7f2] ">
            {aboutIntro.lead[lang]}
            <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.3em] text-[#fdf7f2]">
              {lang === 'ar' ? 'كولومبوس' : 'Colombus Roastery'}
            </span>
          </blockquote>
        </div>
      </motion.section>

      <motion.section
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.1 }}
        className="space-y-10 rounded-[26px] p-6 md:p-10 -mx-4 sm:mx-0"
      >
        {aboutHighlights.map((highlight, index) => {
          const isReversed = index % 2 === 1;
          const isFilled = index % 2 === 0;
          return (
            <motion.div
              key={highlight.id}
              variants={fade}
              className={`grid overflow-hidden rounded-[18px]  md:grid-cols-2 ${
                isFilled
                  ? 'border-[#FF0000]/40 bg-[#FF0000] text-[#fdf7f2]'
                  : 'border-[#efe7df] bg-[#fdf7f2] text-[#FF0000]'
              }`}
            >
              <div
                className={`relative order-1 min-h-[18rem] w-full md:min-h-[22rem] lg:min-h-[26rem] ${
                  isReversed ? 'md:order-2' : 'md:order-1'
                }`}
              >
                <Image
                  src={highlight.image}
                  alt={highlight.title[lang]}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div
                className={`order-2 flex w-full flex-col justify-center space-y-3 px-6 pb-6 pt-4 md:px-10 md:py-10 ${
                  isReversed ? 'md:order-1' : 'md:order-2'
                }`}
              >
                <p
                  className={
                    isFilled
                      ? 'text-xs uppercase tracking-[0.35em] text-[#fdf7f2] '
                      : 'text-xs uppercase tracking-[0.35em] text-[#FF0000]'
                  }
                >
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="text-2xl font-semibold">{highlight.title[lang]}</h2>
                <p
                  className={
                    isFilled ? 'text-sm text-[#fdf7f2]/90' : 'text-sm text-[#FF0000]/80'
                  }
                >
                  {highlight.description[lang]}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.section>

      <motion.section
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.3 }}
        className="space-y-8 p-7 text-sm text-muted-foreground md:p-12 -mx-4 sm:mx-0"
      >
        {aboutNarrative[lang].map((paragraph, index) => {
          return (
            <motion.div
              key={index}
              variants={fade}
              className="flex items-start gap-5 rounded-[14px] border border-[#eadfd3] border-l-4 border-l-[#FF0000] bg-[#fff5f1] p-6 md:p-8"
            >
              <div className="flex min-h-10 min-w-10 items-center justify-center rounded-full border border-[#FF0000]/30 bg-[#fff5f1] text-xs font-semibold tracking-[0.3em] text-[#FF0000]">
                {String(index + 1).padStart(2, '0')}
              </div>
              <p className="text-base leading-relaxed text-primary/80 md:text-lg">
                {paragraph}
              </p>
            </motion.div>
          );
        })}
      </motion.section>

      <motion.section
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.3 }}
        className="rounded-[20px] border border-[#efe7df] bg-black p-6 text-[#fdf7f2] shadow-[0_35px_70px_rgba(0,0,0,0.08)] md:p-10"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#FF0000]">
              {lang === 'ar' ? 'لنصنع لحظة' : 'Let’s brew together'}
            </p>
            <h4 className="mt-2 text-2xl font-semibold">
              {lang === 'ar'
                ? 'نبتكر لحظات قهوة تبقى في الذاكرة'
                : 'We craft coffee moments worth returning to'}
            </h4>
          </div>
          <a
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 rounded-full border text-[#fdf7f2] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em]  transition hover:bg-[#FF0000]/10"
          >
            {lang === 'ar' ? 'لنتواصل' : 'Let’s connect'}
            <span aria-hidden>↗</span>
          </a>
        </div>
      </motion.section>
    </div>
  );
}
