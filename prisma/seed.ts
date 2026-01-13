import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.upsert({
    where: {username: 'admin'},
    update: {},
    create: {
      username: 'admin',
      passwordHash
    }
  });

  await prisma.productMedia.deleteMany({});
  await prisma.productTranslation.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.categoryTranslation.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.branchTranslation.deleteMany({});
  await prisma.branch.deleteMany({});
  await prisma.careerSlotTranslation.deleteMany({});
  await prisma.careerSlot.deleteMany({});
  await prisma.heroImage.deleteMany({});

  const categories = await prisma.$transaction([
    prisma.category.create({
      data: {
        slug: 'signature-espressos',
        sortOrder: 1,
        translations: {
          create: [
            {locale: 'en', name: 'Signature Espressos'},
            {locale: 'ar', name: 'الإسبريسو الخاص'}
          ]
        }
      }
    }),
    prisma.category.create({
      data: {
        slug: 'cold-brews',
        sortOrder: 2,
        translations: {
          create: [
            {locale: 'en', name: 'Cold Brew Atelier'},
            {locale: 'ar', name: 'مشروبات باردة'}
          ]
        }
      }
    })
  ]);

  const productPayload = [
    {
      slug: 'damascus-gold',
      categoryId: categories[0].id,
      sortOrder: 1,
      isFeatured: true,
      featuredOrder: 1,
      translations: {
        create: [
          {
            locale: 'en',
            name: 'Damascus Gold',
            points: [
              {label: 'Profile', value: 'Dark chocolate, cedar honey'},
              {label: 'Texture', value: 'Velvet crema'}
            ]
          },
          {
            locale: 'ar',
            name: 'ذهب دمشق',
            points: [
              {label: 'الطابع', value: 'شوكولا داكنة وعسل الأرز'},
              {label: 'القوام', value: 'كريما مخملية'}
            ]
          }
        ]
      },
      media: {
        create: [
          {
            filePath:
              'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=60',
            sortOrder: 1
          }
        ]
      }
    },
    {
      slug: 'levantine-silk',
      categoryId: categories[0].id,
      sortOrder: 2,
      translations: {
        create: [
          {
            locale: 'en',
            name: 'Levantine Silk',
            points: [
              {label: 'Profile', value: 'Cardamom bloom'},
              {label: 'Finish', value: 'Rose petal'}
            ]
          },
          {
            locale: 'ar',
            name: 'حرير الشام',
            points: [
              {label: 'الطابع', value: 'إشراقة الهيل'},
              {label: 'النهاية', value: 'ورود دمشق'}
            ]
          }
        ]
      },
      media: {
        create: [
          {
            filePath:
              'https://images.unsplash.com/photo-1432107294467-9e7e4792a017?auto=format&fit=crop&w=900&q=60',
            sortOrder: 1
          }
        ]
      }
    },
    {
      slug: 'cedar-smoke',
      categoryId: categories[0].id,
      sortOrder: 3,
      isFeatured: true,
      featuredOrder: 2,
      translations: {
        create: [
          {
            locale: 'en',
            name: 'Cedar Smoke',
            points: [
              {label: 'Profile', value: 'Cedar spice'},
              {label: 'Texture', value: 'Dense & warm'}
            ]
          },
          {
            locale: 'ar',
            name: 'دخان الأرز',
            points: [
              {label: 'الطابع', value: 'توابل أرز'},
              {label: 'القوام', value: 'دافئ وكثيف'}
            ]
          }
        ]
      },
      media: {
        create: [
          {
            filePath:
              'https://images.unsplash.com/photo-1459257868276-5e65389e2722?auto=format&fit=crop&w=900&q=60',
            sortOrder: 1
          }
        ]
      }
    },
    {
      slug: 'damas-sunset',
      categoryId: categories[1].id,
      sortOrder: 1,
      isFeatured: true,
      featuredOrder: 3,
      translations: {
        create: [
          {
            locale: 'en',
            name: 'Damas Sunset',
            points: [
              {label: 'Profile', value: 'Caramelized figs'},
              {label: 'Texture', value: 'Silky frost'}
            ]
          },
          {
            locale: 'ar',
            name: 'غروب دمشق',
            points: [
              {label: 'الطابع', value: 'تين مكرمل'},
              {label: 'القوام', value: 'ثلج حريري'}
            ]
          }
        ]
      },
      media: {
        create: [
          {
            filePath:
              'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=60',
            sortOrder: 1
          }
        ]
      }
    },
    {
      slug: 'almond-noir-brew',
      categoryId: categories[1].id,
      sortOrder: 2,
      translations: {
        create: [
          {
            locale: 'en',
            name: 'Almond Noir Brew',
            points: [
              {label: 'Profile', value: 'Roasted almond'},
              {label: 'Finish', value: 'Vanilla mist'}
            ]
          },
          {
            locale: 'ar',
            name: 'مشروب اللوز الداكن',
            points: [
              {label: 'الطابع', value: 'لوز محمص'},
              {label: 'النهاية', value: 'لمسة فانيلا'}
            ]
          }
        ]
      },
      media: {
        create: [
          {
            filePath:
              'https://images.unsplash.com/photo-1502462041640-f5b6b285b0d0?auto=format&fit=crop&w=900&q=60',
            sortOrder: 1
          }
        ]
      }
    },
    {
      slug: 'amber-haze-brew',
      categoryId: categories[1].id,
      sortOrder: 3,
      translations: {
        create: [
          {
            locale: 'en',
            name: 'Amber Haze Brew',
            points: [
              {label: 'Profile', value: 'Citrus zest'},
              {label: 'Texture', value: 'Feather-light'}
            ]
          },
          {
            locale: 'ar',
            name: 'سحابة الكهرمان',
            points: [
              {label: 'الطابع', value: 'قشر حمضيات'},
              {label: 'القوام', value: 'خفيف للغاية'}
            ]
          }
        ]
      },
      media: {
        create: [
          {
            filePath:
              'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=60',
            sortOrder: 1
          }
        ]
      }
    }
  ];

  for (const product of productPayload) {
    await prisma.product.create({data: product});
  }

  const branches = [
    {
      imagePath: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=900&q=60',
      googleEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26610.1773!2d36.285!3d33.513!2m3!1f0!2f0!3f0',
      directionsUrl: 'https://maps.app.goo.gl/abcdef',
      phone: '+963 11 222 3344',
      translations: [
        {locale: 'en', name: 'Al Rawda Salon', address: 'Rawda 5th Avenue, Damascus'},
        {locale: 'ar', name: 'صالون الروضة', address: 'دمشق، شارع الروضة الخامس'}
      ]
    },
    {
      imagePath: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=60',
      googleEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.010!2d36.298!3d33.507!2m3!1f0!2f0!3f0',
      directionsUrl: 'https://maps.app.goo.gl/xyz123',
      email: 'downtown@colombus.coffee',
      mobile: '+963 944 123 456',
      translations: [
        {locale: 'en', name: 'Downtown House', address: 'Martyrs Square, Damascus'},
        {locale: 'ar', name: 'فرع وسط المدينة', address: 'ساحة الشهداء، دمشق'}
      ]
    }
  ];

  for (let index = 0; index < branches.length; index += 1) {
    const branch = branches[index];
    await prisma.branch.create({
      data: {
        isActive: true,
        sortOrder: index + 1,
        imagePath: branch.imagePath,
        phone: branch.phone,
        mobile: branch.mobile,
        email: branch.email,
        googleEmbedUrl: branch.googleEmbedUrl,
        directionsUrl: branch.directionsUrl,
        translations: {
          create: branch.translations
        }
      }
    });
  }

  const careers = await prisma.$transaction([
    prisma.careerSlot.create({
      data: {
        sortOrder: 1,
        translations: {
          create: [
            {locale: 'en', title: 'Head Barista', description: 'Lead beverage programming.'},
            {locale: 'ar', title: 'رئيس الباريستا', description: 'قيادة برنامج المشروبات.'}
          ]
        }
      }
    }),
    prisma.careerSlot.create({
      data: {
        sortOrder: 2,
        translations: {
          create: [
            {locale: 'en', title: 'Boutique Manager', description: 'Oversee flagship experience.'},
            {locale: 'ar', title: 'مدير البوتيك', description: 'إدارة تجربة الفرع الفاخر.'}
          ]
        }
      }
    })
  ]);

  await prisma.heroImage.createMany({
    data: [
      {
        sortOrder: 1,
        filePath: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=80'
      },
      {
        sortOrder: 2,
        filePath: 'https://images.unsplash.com/photo-1432107294467-9e7e4792a017?auto=format&fit=crop&w=900&q=80'
      },
      {
        sortOrder: 3,
        filePath: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80'
      },
      {
        sortOrder: 4,
        filePath: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80'
      }
    ]
  });

  console.log('Seeded', {categories: categories.length, products: productPayload.length, careers: careers.length});
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
