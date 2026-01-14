import type { Locale } from '@/src/i18n/routing';

type Translated = Record<Locale, string>;

export const aboutIntro = {
  welcome: {
    en: 'Welcome',
    ar: 'أهلاً بكم'
  } as Translated,
  title: {
    en: 'Colombus Coffee',
    ar: 'قهوة كولومبوس'
  } as Translated,
  lead: {
    en: 'Colombus is the leading coffee roasting, packaging, and grinding house that began its journey in Milan in 1990 before relocating to Bucharest in 1992. From the very beginning, our King, San Cristobal, Kenana, and Colombus labels set out to merge commercial acumen with artisanal roasting excellence.',
    ar: 'تُعد كولومبوس الشركة الرائدة في تحميص وتعبئة وطحن القهوة؛ وقد بدأت مسيرتها في ميلانو عام 1990 وانتقلت إلى بوخارست عام 1992. منذ الانطلاقة الأولى، سعت علامات كينغ وسان كريستوبال وكنانة وكولومبوس إلى الجمع بين الخبرة التجارية والتميّز الحرفي في التحميص.'
  } as Translated
};

export const aboutNarrative: Record<Locale, string[]> = {
  en: [
    'What started as a single company soon became a portfolio that mastered both commercial and industrial coffee ventures. Colombus quickly dominated the Romanian market before exporting to Eastern and Western Europe, proving that a Damascus-inspired palette could delight global audiences.',
    'In 2001 we strategically expanded into the Middle East, inaugurating our first roasting, packaging, and grinding facility in Syria alongside fresh coffee boutiques and cafés under the Colombus moniker. We were pioneers in bringing hot chocolate, cappuccino, orchid drinks, espresso, decaf, American coffee, and French coffee to local consumers—then exporting those flavors worldwide.',
    'Today our marketing strategy is built on three synchronized pillars: ready-to-prepare coffee and beverage distribution, a network of fresh-coffee retail branches, and the experiential Colombus coffee chain. Together, they ensure the Colombus promise reaches business owners and discerning guests alike.'
  ],
  ar: [
    'ما بدأ كشركة واحدة سرعان ما تحوّل إلى محفظة متكاملة تجمع بين الأنشطة التجارية والصناعية في عالم القهوة. سيطرت كولومبوس سريعاً على السوق الرومانية قبل أن تبدأ بالتصدير إلى أوروبا الشرقية والغربية، لتثبت أن الذائقة المستوحاة من دمشق قادرة على إبهار العالم.',
    'في عام 2001 توسعنا استراتيجياً نحو الشرق الأوسط، حيث افتتحنا أول مصنع للتحميص والتعبئة والطحن في سوريا بالتزامن مع إطلاق فروع القهوة الطازجة والمقاهي تحت اسم كولومبوس. كنا من الأوائل في تقديم الشوكولا الساخنة والكابتشينو ومشروب السحلب والإسبريسو والقهوة الخالية من الكافيين والأمريكية والفرنسية إلى السوق المحلية، ثم قمنا بتصديرها إلى أنحاء العالم.',
    'تعتمد استراتيجيتنا التسويقية اليوم على ثلاثة محاور متناغمة: توزيع القهوة والمشروبات الجاهزة للتحضير، شبكة فروع لبيع القهوة الطازجة، وسلسلة مقاهي كولومبوس التجريبية. معاً، تضمن هذه المحاور وصول وعد كولومبوس إلى أصحاب الأعمال والضيوف المميزين.'
  ]
};

export const aboutHighlights = [
  {
    id: 'legacy',
    image: '/about/about-01.jpg',
    title: {
      en: 'European Legacy & Multi-brand Power',
      ar: 'إرث أوروبي ومحفظة علامات قوية'
    } as Translated,
    description: {
      en: 'Founded in Milan and anchored in Bucharest, Colombus elevated the King, San Cristobal, Kenana, and Colombus brands into one powerhouse that fused commercial precision with industrial craftsmanship.',
      ar: 'انطلقت كولومبوس من ميلانو وترسخت في بوخارست، لترفع علامات كينغ وسان كريستوبال وكنانة وكولومبوس إلى قوة واحدة تجمع الدقة التجارية بالمهارة الصناعية.'
    } as Translated
  },
  {
    id: 'expansion',
    image: '/about/about-02.jpg',
    title: {
      en: 'Middle East Expansion & Innovation',
      ar: 'التوسع في الشرق الأوسط والابتكار'
    } as Translated,
    description: {
      en: 'By 2001 our roasting, packaging, and grinding campus in Syria ushered in a new era. Colombus boutiques introduced regional markets to hot chocolate, cappuccino, orchid drinks, espresso, decaf, American, and French coffee.',
      ar: 'مع عام 2001 دشّن مجمّع التحميص والتعبئة والطحن في سوريا عصراً جديداً؛ إذ قدّمت بوتيكات كولومبوس للأسواق الإقليمية الشوكولا الساخنة والكابتشينو والسحلب والإسبريسو والقهوة الخالية من الكافيين والأمريكية والفرنسية.'
    } as Translated
  },
  {
    id: 'strategy',
    image: '/about/about-03.jpg',
    title: {
      en: 'Three Strategic Growth Pillars',
      ar: 'ثلاثة محاور استراتيجية للنمو'
    } as Translated,
    description: {
      en: 'Ready-to-prepare beverages, fresh-coffee retail branches, and Colombus coffee houses form a unified revenue engine designed for business owners who expect memorable, profitable experiences.',
      ar: 'المشروبات الجاهزة للتحضير وفروع القهوة الطازجة وسلسلة مقاهي كولومبوس تشكل معاً محركاً موحداً للإيرادات صُمم لروّاد الأعمال الذين يبحثون عن تجارب ربحية لا تُنسى.'
    } as Translated
  }
] as const;

export const aboutPillars = [
  {
    title: {
      en: 'Rapid Beverage Distribution',
      ar: 'توزيع المشروبات السريعة'
    } as Translated,
    detail: {
      en: 'Supplying coffee beans, capsules, and instant hot or cold drinks engineered for high-volume venues.',
      ar: 'تزويد الحبوب والكبسولات والمشروبات الساخنة أو الباردة الجاهزة للمرافق ذات الاستهلاك العالي.'
    } as Translated
  },
  {
    title: {
      en: 'Fresh Coffee Branches',
      ar: 'فروع القهوة الطازجة'
    } as Translated,
    detail: {
      en: 'Boutiques that roast, grind, and personalize blends on-site for premium hospitality concepts.',
      ar: 'بوتيكات تقوم بالتحميص والطحن والمزج حسب الطلب في الموقع لخدمة مشاريع الضيافة الراقية.'
    } as Translated
  },
  {
    title: {
      en: 'Colombus Coffee Chain',
      ar: 'سلسلة مقاهي كولومبوس'
    } as Translated,
    detail: {
      en: 'Immersive cafés that showcase our beverages, staffing standards, and profitable franchise playbooks.',
      ar: 'مقاهٍ غامرة تستعرض مشروباتنا ومعايير فرق العمل وكتيبات الامتياز المربحة.'
    } as Translated
  }
] as const;
