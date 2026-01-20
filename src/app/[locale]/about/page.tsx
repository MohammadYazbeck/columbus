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
    <div className="space-y-16 text-primary">
      <motion.section
        variants={fade}
        initial="hidden"
        animate="show"
        className="grid gap-8 rounded-[28px] border border-[#efe7df] bg-white/90 p-8 text-primary shadow-[0_55px_100px_rgba(0,0,0,0.08)] md:grid-cols-[1.15fr_0.85fr] md:p-12"
      >
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.5em] text-[#aa1d1d]">
            {aboutIntro.welcome[lang]}
          </p>
          <h1 className="text-5xl font-semibold md:text-6xl">{aboutIntro.title[lang]}</h1>
          <p className="text-lg text-muted-foreground">{aboutIntro.lead[lang]}</p>
          <div className="grid gap-3 text-base text-muted-foreground md:grid-cols-3">
            <div>
              <p className="text-3xl font-semibold text-primary">1990</p>
              <p>{lang === 'ar' ? 'ميلانو' : 'Milan origin'}</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-primary">2001</p>
              <p>{lang === 'ar' ? 'المصنع الإقليمي' : 'Regional campus'}</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-primary">+30</p>
              <p>{lang === 'ar' ? 'عاماً من التوسع' : 'years scaling'}</p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[18px]">
          <Image
            src={aboutHighlights[0].image}
            alt={aboutHighlights[0].title[lang]}
            fill
            sizes="(max-width:768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      </motion.section>

      <motion.section
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.3 }}
        className="space-y-10 rounded-[26px] p-6 md:p-10"
      >
        {aboutHighlights.map((highlight, index) => {
          const isReversed = index % 2 === 1;
          const isFilled = index % 2 === 0;
          return (
            <motion.div
              key={highlight.id}
              variants={fade}
              className={`flex flex-col  rounded-lg gap-6 sm:rounded-[18px]  md:flex md:items-stretch md:gap-0 ${
                isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
              } ${
                isFilled
                  ? 'border-[#aa1d1d]/40 bg-[#aa1d1d] text-[#fdf7f2] '
                  : 'border-[#efe7df] bg-[#fdf7f2]  text-[#aa1d1d]'
              }`}
            >
              <div
                className={`relative h-80 w-full overflow-hidden rounded-t-lg shadow-[0_28px_70px_rgba(15,10,6,0.18)]
  sm:rounded-t-none
  md:h-[22rem] md:w-1/2
  lg:h-[26rem]
  ${
    (isReversed && lang === 'ar') || (!isReversed && lang === 'en')
      ? 'sm:rounded-l-[16px] md:rounded-l-[18px]'
      : 'sm:rounded-r-[16px] md:rounded-r-[18px]'
  }
`}
              >
                <Image
                  src={highlight.image}
                  alt={highlight.title[lang]}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="w-full space-y-3 px-4 pb-6 pt-2 md:w-1/2 md:px-8 md:py-10">
                <p
                  className={
                    isFilled
                      ? 'text-xs uppercase tracking-[0.35em] text-[#fdf7f2] '
                      : 'text-xs uppercase tracking-[0.35em] text-[#aa1d1d]'
                  }
                >
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="text-2xl font-semibold">{highlight.title[lang]}</h2>
                <p
                  className={
                    isFilled ? 'text-sm text-[#fdf7f2]/90' : 'text-sm text-[#aa1d1d]/80'
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
        className="space-y-8   p-7 text-sm text-muted-foreground  md:p-12"
      >
        {aboutNarrative[lang].map((paragraph, index) => {
          return (
            <motion.div
              key={index}
              variants={fade}
              className="flex items-start gap-5 rounded-[14px] border border-[#eadfd3] border-l-4 border-l-[#aa1d1d] bg-[#fff5f1] p-6 md:p-8"
            >
              <div className="flex min-h-10 min-w-10 items-center justify-center rounded-full border border-[#aa1d1d]/30 bg-[#fff5f1] text-xs font-semibold tracking-[0.3em] text-[#aa1d1d]">
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
        className="rounded-[20px] border border-[#efe7df] bg-[#fdf7f2] p-6 text-primary shadow-[0_35px_70px_rgba(0,0,0,0.08)] md:p-10"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#aa1d1d]">
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
            className="inline-flex items-center gap-2 rounded-full border border-[#aa1d1d] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#aa1d1d] transition hover:bg-[#aa1d1d]/10"
          >
            {lang === 'ar' ? 'لنتواصل' : 'Let’s connect'}
            <span aria-hidden>↗</span>
          </a>
        </div>
      </motion.section>
    </div>
  );
}
