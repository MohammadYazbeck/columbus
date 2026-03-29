import {prisma} from './prisma';

export async function getAdminDashboardStats() {
  const [productCount, jobCount] = await Promise.all([
    prisma.product.count(),
    prisma.jobApplication.count()
  ]);
  return {productCount, jobCount};
}

export async function getAdminCategories() {
  return prisma.category.findMany({
    include: {translations: true},
    orderBy: {sortOrder: 'asc'}
  });
}

export async function getAdminProducts() {
  return prisma.product.findMany({
    include: {
      translations: true,
      media: {orderBy: {sortOrder: 'asc'}},
      category: {select: {id: true, slug: true}}
    },
    orderBy: [{category: {sortOrder: 'asc'}}, {sortOrder: 'asc'}]
  });
}

export async function getAdminBranches() {
  return prisma.branch.findMany({
    include: {translations: true},
    orderBy: {sortOrder: 'asc'}
  });
}

export async function getAdminHeroImages() {
  return prisma.heroImage.findMany({
    orderBy: {sortOrder: 'asc'}
  });
}

export async function getAdminCareerSlots() {
  return prisma.careerSlot.findMany({
    include: {translations: true},
    orderBy: {sortOrder: 'asc'}
  });
}

export async function getAdminJobApplications() {
  return prisma.jobApplication.findMany({
    include: {careerSlot: {include: {translations: true}}},
    orderBy: {createdAt: 'desc'},
    take: 100
  });
}
