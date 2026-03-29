const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 
prisma.branch.findMany({ include: { translations: true }, orderBy: { sortOrder: 'asc' } }).then(r => { console.log(JSON.stringify(r, null, 2)); }).catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect()); 
