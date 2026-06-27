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
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } }
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};

export default function AboutPage({ params }: Props) {
  const { locale } = params;
  const lang = locale === 'ar' ? 'ar' : 'en';
  const milestones =
    lang === 'ar'
      ? [
          { year: '1990', label: 'ميلانو' },
          { year: '1992', label: 'بوخارست' },
          { year: '2001', label: 'سوريا' }
        ]
      : [
          { year: '1990', label: 'Milan' },
          { year: '1992', label: 'Bucharest' },
          { year: '2001', label: 'Syria' }
        ];

  return (
    <div className="space-y-20 text-primary">
      <motion.section
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.1 }}
        className="relative overflow-hidden rounded-[36px] border border-[#e6ddd0] bg-[#fffdf9] px-6 py-10 text-[#1a1512] shadow-[0_24px_55px_rgba(0,0,0,0.06)] md:px-12 md:py-14"
      >
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-6">
            <p className="text-xs uppercase  text-[#ab1d1d] md:text-sm">
              {aboutIntro.welcome[lang]}
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-[#17120f] md:text-6xl">
              {aboutIntro.title[lang]}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[#3f342b] md:text-lg">
              {aboutIntro.lead[lang]}
            </p>
            <p className="text-[11px] font-semibold uppercase  text-[#ab1d1d] md:text-xs">
              {lang === 'ar' ? 'كولومبوس' : 'Columbus Roastery'}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-[11px] uppercase text-[#ab1d1d] md:text-xs">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex items-center gap-3">
                  <span className="text-[#1a1512]">{milestone.year}</span>
                  <span className="text-[#ab1d1d]/85">{milestone.label}</span>
                  {index < milestones.length - 1 && (
                    <span className="h-1 w-1 rounded-full bg-[#ab1d1d]/70" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative min-h-[300px] overflow-hidden rounded-[20px]">
              <Image
                src={aboutHighlights[0].image}
                alt={aboutHighlights[0].title[lang]}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
            </div>
            <p className="text-sm leading-relaxed text-[#463a30] md:text-base">
              {aboutHighlights[0].description[lang]}
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.2 }}
        className="space-y-8"
      >
        <div className="space-y-3">
          <p className="text-xs uppercase text-[#ab1d1d]">
            {lang === 'ar' ? 'دعائم التجربة' : 'Experience Pillars'}
          </p>
          <h2 className="text-3xl font-semibold text-[#18120f] md:text-4xl">
            {lang === 'ar'
              ? 'تصميم راقٍ يربط التحميص بالضيافة'
              : 'A refined system linking roasting to hospitality'}
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {aboutPillars.map((pillar, index) => (
            <motion.article
              key={pillar.title[lang]}
              variants={fade}
              className="space-y-3 border-t border-[#ab1d1d]/30 pt-5"
            >
              <p className="text-xs font-semibold uppercase text-[#ab1d1d]">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="text-xl font-semibold text-[#1d1713]">
                {pillar.title[lang]}
              </h3>
              <p className="text-sm leading-relaxed text-[#4d4034] md:text-base">
                {pillar.detail[lang]}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.2 }}
        className="space-y-2"
      >
        {aboutHighlights.map((highlight, index) => {
          const isReversed = index % 2 === 1;
          return (
            <motion.article
              key={highlight.id}
              variants={fade}
              className="grid gap-8 border-t border-[#e8dccd] py-10 first:border-t-0 md:grid-cols-12 md:items-center"
            >
              <div
                className={`relative min-h-[260px] overflow-hidden rounded-[20px] md:col-span-6 ${
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              </div>

              <div
                className={`space-y-4 md:col-span-6 ${isReversed ? 'md:order-1' : 'md:order-2'}`}
              >
                <p className="text-xs font-semibold uppercase text-[#ab1d1d]">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="text-2xl font-semibold text-[#18120f] md:text-3xl">
                  {highlight.title[lang]}
                </h3>
                <p className="text-sm leading-relaxed text-[#4b4035] md:text-base">
                  {highlight.description[lang]}
                </p>
              </div>
            </motion.article>
          );
        })}
      </motion.section>

      <motion.section
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.2 }}
        className="rounded-[32px] border border-[#e6ddd0] bg-[#fffdf9] px-6 py-10 text-[#1a1512] shadow-[0_22px_50px_rgba(0,0,0,0.06)] md:px-10 md:py-12"
      >
        <div className="space-y-6">
          <p className="text-xs uppercase text-[#ab1d1d]">
            {lang === 'ar' ? 'لنصنع لحظة' : 'Let’s brew together'}
          </p>

          <div className="space-y-4">
            {aboutNarrative[lang].map((paragraph, index) => (
              <div
                key={index}
                className="grid gap-3 border-t border-[#ab1d1d]/20 pt-4 md:grid-cols-[auto_1fr] md:items-start md:gap-6"
              >
                <p className="text-xs font-semibold uppercase text-[#ab1d1d]">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="text-sm leading-relaxed text-[#473a2f] md:text-base">
                  {paragraph}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-[#ab1d1d]/20 pt-6 md:flex-row md:items-center md:justify-between">
            <h4 className="max-w-2xl text-2xl font-semibold md:text-3xl">
              {lang === 'ar'
                ? 'نبتكر لحظات قهوة تبقى في الذاكرة'
                : 'We craft coffee moments worth returning to'}
            </h4>
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#ab1d1d] bg-[#ab1d1d] px-7 py-3 text-xs font-semibold uppercase text-white transition hover:bg-[#8f1818]"
            >
              {lang === 'ar' ? 'لنتواصل' : 'Let’s connect'}
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
