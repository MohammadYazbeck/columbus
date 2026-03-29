'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Locale } from '@/src/i18n/routing';
import { aboutHighlights, aboutIntro, aboutNarrative } from '@/src/data/about';

type Props = {
  locale: Locale;
};

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const photoLayer = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: (delay: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.85, delay, ease: 'easeOut' }
  })
};

export function AboutShowcase({ locale }: Props) {
  const lang = locale === 'ar' ? 'ar' : 'en';
  const narrative = aboutNarrative[lang][0];
  const collage = aboutHighlights.slice(0, 3);
  const stats = [
    lang === 'ar'
      ? { label: 'سنوات الإتقان', value: '32+' }
      : { label: 'Years mastering', value: '32+' },
    lang === 'ar'
      ? { label: 'الأسواق النشطة', value: '18' }
      : { label: 'Active markets', value: '18' },
    lang === 'ar'
      ? { label: 'سلسلة القهوة', value: 'Colombus' }
      : { label: 'Coffee chain', value: 'Colombus' }
  ];

  return (
    <section className="relative overflow-hidden rounded-[18px] p-6 text-primary  md:p-14">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4  from-[#f2ebe3] to-transparent" />
      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.4 }}
          className="space-y-6"
        >
          <p className="text-sm uppercase tracking-[0.5em] text-[#aa1d1d]">
            {aboutIntro.welcome[lang]}
          </p>
          <h2 className="text-5xl font-semibold tracking-tight text-primary md:text-6xl">
            {aboutIntro.title[lang]}
          </h2>
          <p className="text-lg text-muted-foreground">{aboutIntro.lead[lang]}</p>
          <div className="flex flex-wrap gap-4">
            {stats.map((stat, index) => {
              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[#efe7df] border-t-2 border-t-[#aa1d1d] bg-white px-6 py-4"
                >
                  <p className="text-3xl font-semibold text-[#aa1d1d]">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
          <Link
            href={`/${locale}/about`}
            className="inline-flex w-max items-center gap-2 rounded-full border border-[#aa1d1d] px-7 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#aa1d1d] transition hover:bg-[#aa1d1d]/10"
          >
            {lang === 'ar' ? 'قصتنا' : 'Our story'}
            <span aria-hidden>↗</span>
          </Link>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.3 }}
          className="relative h-[360px]"
        >
          {collage.map((highlight, index) => (
            <motion.div
              key={highlight.id}
              custom={index * 0.1}
              variants={photoLayer}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.4 }}
              className={`absolute rounded-[28px] border border-[#efe7df] bg-white shadow-[0_30px_60px_rgba(15,10,6,0.18)] ${
                index === 0
                  ? 'inset-x-0 top-0 h-[230px]'
                  : index === 1
                    ? 'left-4 right-20 top-44 h-[180px]'
                    : 'right-0 top-20 h-[200px] w-48 hidden lg:block'
              }`}
            >
              <Image
                src={highlight.image}
                alt={highlight.title[lang]}
                fill
                sizes="(max-width:1024px) 100vw, 40vw"
                className="rounded-[28px] object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.p
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.4 }}
        className="mt-10 rounded-[28px] border border-[#efe7df] border-l-4 border-l-[#aa1d1d] bg-white p-6 text-base text-muted-foreground"
      >
        {narrative}
      </motion.p>
    </section>
  );
}
