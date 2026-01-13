'use client';

import Image from 'next/image';
import {motion} from 'framer-motion';
import type {Locale} from '@/src/i18n/routing';
import {aboutHighlights, aboutIntro, aboutNarrative, aboutPillars} from '@/src/data/about';

type Props = {
  params: {locale: Locale};
};

const fade = {
  hidden: {opacity: 0, y: 28},
  show: {opacity: 1, y: 0, transition: {duration: 0.8, ease: 'easeOut'}}
};

export default function AboutPage({params}: Props) {
  const {locale} = params;
  const lang = locale === 'ar' ? 'ar' : 'en';

  return (
    <div className="space-y-16 text-primary">
      <motion.section
        variants={fade}
        initial="hidden"
        animate="show"
        className="grid gap-8 rounded-[42px] border border-white/20 bg-white/85 p-8 shadow-[0_55px_100px_rgba(0,0,0,0.08)] md:grid-cols-[1.15fr_0.85fr] md:p-12"
      >
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.5em] text-muted-foreground">{aboutIntro.welcome[lang]}</p>
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
        <div className="relative overflow-hidden rounded-[32px]">
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
        viewport={{amount: 0.3}}
        className="space-y-4 rounded-[38px] border border-white/18 bg-white/85 p-6 shadow-[0_35px_80px_rgba(0,0,0,0.08)] md:p-10"
      >
        {aboutHighlights.map((highlight, index) => (
          <motion.div
            key={highlight.id}
            variants={fade}
            className="flex flex-col gap-4 rounded-[26px] border border-white/40 bg-white/90 p-5 md:flex-row md:items-center"
          >
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{String(index + 1).padStart(2, '0')}</p>
              <h2 className="mt-2 text-2xl font-semibold">{highlight.title[lang]}</h2>
              <p className="text-sm text-muted-foreground">{highlight.description[lang]}</p>
            </div>
            <div className="relative h-40 w-full overflow-hidden rounded-[20px] md:w-64">
              <Image
                src={highlight.image}
                alt={highlight.title[lang]}
                fill
                sizes="(max-width:768px) 100vw, 30vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        ))}
      </motion.section>

      <motion.section
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{amount: 0.3}}
        className="space-y-6 rounded-[36px] border border-white/20 bg-white p-6 text-sm text-muted-foreground shadow-[0_30px_70px_rgba(0,0,0,0.06)] md:p-12"
      >
        {aboutNarrative[lang].map((paragraph, index) => (
          <motion.div
            key={index}
            variants={fade}
            className="flex items-start gap-4 rounded-[26px] border border-white/40 bg-white/90 p-5 shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-[#aa1d1d]/10 text-xs font-semibold tracking-[0.3em] text-[#aa1d1d]">
              {String(index + 1).padStart(2, '0')}
            </div>
            <p className="text-base leading-relaxed">{paragraph}</p>
          </motion.div>
        ))}
      </motion.section>

      <motion.section
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{amount: 0.3}}
        className="space-y-5 rounded-[34px] border border-white/20 bg-[#0b0605] p-6 text-white shadow-[0_45px_80px_rgba(0,0,0,0.35)] md:p-10"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            {lang === 'ar' ? 'محاور العمل' : 'Operating pillars'}
          </p>
          <h3 className="mt-2 text-3xl font-semibold">
            {lang === 'ar' ? 'صُممت لأصحاب الأعمال' : 'Engineered for business owners'}
          </h3>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {aboutPillars.map((pillar, index) => (
            <div key={pillar.title.en} className="rounded-[24px] border border-white/25 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-white/70">{String(index + 1).padStart(2, '0')}</p>
              <h4 className="mt-3 text-lg font-semibold text-white">{pillar.title[lang]}</h4>
              <p className="mt-2 text-sm text-white/80">{pillar.detail[lang]}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{amount: 0.3}}
        className="rounded-[30px] border border-white/20 bg-white/80 p-6 text-primary shadow-[0_35px_70px_rgba(0,0,0,0.08)] md:p-10"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              {lang === 'ar' ? 'تواصل' : 'Connect'}
            </p>
            <h4 className="mt-2 text-2xl font-semibold">
              {lang === 'ar' ? 'نصنع قيمة لأعمال القهوة والضيافة' : 'We craft value for coffee & hospitality'}
            </h4>
          </div>
          <a
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 rounded-full border border-[#aa1d1d] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#aa1d1d] transition hover:bg-[#aa1d1d]/10"
          >
            {lang === 'ar' ? 'تواصل الآن' : 'Talk to us'}
            <span aria-hidden>↗</span>
          </a>
        </div>
      </motion.section>
    </div>
  );
}
