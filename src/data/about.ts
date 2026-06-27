import type { Locale } from '@/src/i18n/routing';

type Translated = Record<Locale, string>;

export const aboutIntro = {
  welcome: {
    en: 'Welcome to the Coffeehouse',
    ar: 'أهلاً بكم في المقهى'
  } as Translated,
  title: {
    en: 'Columbus Coffee',
    ar: 'قهوة كولومبوس'
  } as Translated,
  lead: {
    en: 'Since 1990 in Milan, we’ve been roasting with care, then carried that ritual to Bucharest in 1992. Our King, San Cristobal, Kenana, and Columbus labels were created to deliver coffeehouse warmth, consistent quality, and business confidence in every cup.',
    ar: 'منذ عام 1990 في ميلانو نُحمّص القهوة بعناية، ثم نقلنا هذا الطقس إلى بوخارست عام 1992. صُممت علامات كينغ وسان كريستوبال وكنانة وكولومبوس لتقدّم دفء المقهى وجودة ثابتة وثقة تجارية في كل كوب.'
  } as Translated
};

export const aboutNarrative: Record<Locale, string[]> = {
  en: [
    'We started with a single roastery and a simple promise: serve coffee that feels calm, familiar, and refined. Each cup is built on balance and a clean finish.',
    'In 2001, our Middle East roastery opened in Syria, alongside boutique cafes. We served espresso classics with quiet precision and a warm welcome.',
    'Today, ready-to-craft beverages, fresh-coffee retail, and Columbus coffeehouses work as one—elegant, consistent, and built to last.'
  ],
  ar: [
    'بدأنا بمحمصة واحدة ووعد بسيط: قهوة هادئة، مألوفة، وراقية. كل كوب قائم على توازن ونهاية نقية.',
    'في عام 2001 افتتحنا موطن التحميص في الشرق الأوسط بسوريا، إلى جانب بوتيكات ومقاهٍ مختارة. قدّمنا كلاسيكيات الإسبريسو بدقة ودفء.',
    'اليوم تعمل المشروبات الجاهزة للتحضير، ومتاجر القهوة الطازجة، ومقاهي كولومبوس كتجربة واحدة—أنيقة، ثابتة، وممتدة.'
  ]
};

export const aboutHighlights = [
  {
    id: 'legacy',
    image: '/about/about-001.jpg',
    title: {
      en: 'A Ritual Born in Milan',
      ar: 'طقس وُلد في ميلانو'
    } as Translated,
    description: {
      en: 'From Milan to Bucharest, four labels were shaped to deliver coffeehouse warmth with commercial consistency. Each blend is designed to feel familiar, inviting, and dependable from the first sip to the last.',
      ar: 'من ميلانو إلى بوخارست، صُممت أربع علامات لتمنح دفء المقهى مع موثوقية تجارية. كل خلطة صُممت لتكون مألوفة ودافئة وموثوقة من أول رشفة حتى آخرها.'
    } as Translated
  },
  {
    id: 'expansion',
    image: '/about/about-002.jpg',
    title: {
      en: 'A Roastery Home in Syria',
      ar: 'موطن التحميص في سوريا'
    } as Translated,
    description: {
      en: 'Our Syrian campus brought roasting and packaging closer to guests, while boutique cafes served espresso favorites with a warm welcome. The experience is built on fresh aroma, fast service, and a barista touch.',
      ar: 'قرّب مجمّعنا في سوريا التحميص والتعبئة إلى الضيوف، بينما قدّمت البوتيكات والمقاهي كلاسيكيات الإسبريسو بترحيب دافئ. بُنيت التجربة على رائحة طازجة وخدمة سريعة ولمسة باريستا.'
    } as Translated
  },
  {
    id: 'strategy',
    image: '/about/about-003.jpg',
    title: {
      en: 'Three Experiences, One Promise',
      ar: 'ثلاث تجارب، وعد واحد'
    } as Translated,
    description: {
      en: 'Ready drinks, fresh coffee retail, and coffeehouses come together to keep guests returning and owners growing. One promise shows up in every store, counter, and cup.',
      ar: 'المشروبات الجاهزة ومتاجر القهوة الطازجة والمقاهي تتحد لتُبقي الضيوف قريبين وأصحاب الأعمال في نمو مستمر. وعد واحد يظهر في كل فرع وكل منضدة وكل كوب.'
    } as Translated
  }
] as const;

export const aboutPillars = [
  {
    title: {
      en: 'Ready-To-Craft Beverages',
      ar: 'مشروبات جاهزة للتحضير'
    } as Translated,
    detail: {
      en: 'Fast-serve drinks and beans that keep the coffee ritual consistent in high-volume venues.',
      ar: 'مشروبات سريعة التقديم وحبوب تحافظ على طقس القهوة ثابتاً في المواقع ذات الإقبال العالي.'
    } as Translated
  },
  {
    title: {
      en: 'Fresh Coffee Boutique',
      ar: 'بوتيك القهوة الطازجة'
    } as Translated,
    detail: {
      en: 'On-site roasting and grinding with blends tailored to each hospitality concept.',
      ar: 'تحميص وطحن في الموقع مع خلطات مخصصة لكل مفهوم ضيافة.'
    } as Translated
  },
  {
    title: {
      en: 'Columbus Coffeehouse',
      ar: 'مقهى كولومبوس'
    } as Translated,
    detail: {
      en: 'Signature cafes, barista standards, and a playbook that helps owners grow with confidence.',
      ar: 'مقاهٍ بتجربة مميزة ومعايير باريستا واضحة ودليل يساعد أصحاب الأعمال على النمو بثقة.'
    } as Translated
  }
] as const;
