import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create treatment categories
  const categories = await Promise.all([
    prisma.treatmentCategory.create({
      data: {
        name: 'Perawatan Wajah',
        slug: 'perawatan-wajah',
        description: 'Berbagai treatment untuk perawatan wajah',
        order: 1,
      },
    }),
    prisma.treatmentCategory.create({
      data: {
        name: 'Perawatan Tubuh',
        slug: 'perawatan-tubuh',
        description: 'Treatment untuk perawatan seluruh tubuh',
        order: 2,
      },
    }),
    prisma.treatmentCategory.create({
      data: {
        name: 'Hair Treatment',
        slug: 'hair-treatment',
        description: 'Perawatan rambut profesional',
        order: 3,
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} treatment categories`);

  // Create treatments
  const treatments = await Promise.all([
    prisma.treatment.create({
      data: {
        categoryId: categories[0].id,
        name: 'Facial Brightening',
        slug: 'facial-brightening',
        description: 'Treatment wajah untuk mencerahkan kulit',
        price: 500000,
        duration: 60,
        benefits: ['Kulit cerah', 'Merata', 'Glowing'],
      },
    }),
    prisma.treatment.create({
      data: {
        categoryId: categories[0].id,
        name: 'Anti-Aging Treatment',
        slug: 'anti-aging-treatment',
        description: 'Treatment untuk mengurangi tanda penuaan',
        price: 750000,
        duration: 90,
        benefits: ['Kulit lebih muda', 'Kencang', 'Elastis'],
      },
    }),
    prisma.treatment.create({
      data: {
        categoryId: categories[0].id,
        name: 'Acne Treatment',
        slug: 'acne-treatment',
        description: 'Treatment khusus untuk kulit berjerawat',
        price: 600000,
        duration: 75,
        benefits: ['Jerawat berkurang', 'Bekas jerawat memudar', 'Kulit sehat'],
      },
    }),
    prisma.treatment.create({
      data: {
        categoryId: categories[1].id,
        name: 'Body Massage',
        slug: 'body-massage',
        description: 'Pijat tubuh relaksasi profesional',
        price: 400000,
        duration: 60,
        benefits: ['Relaksasi', 'Mengurangi stres', 'Sirkulasi darah'],
      },
    }),
    prisma.treatment.create({
      data: {
        categoryId: categories[1].id,
        name: 'Body Scrub',
        slug: 'body-scrub',
        description: 'Pengelupasan kulit tubuh',
        price: 350000,
        duration: 45,
        benefits: ['Kulit halus', 'Cerah', 'Segar'],
      },
    }),
    prisma.treatment.create({
      data: {
        categoryId: categories[2].id,
        name: 'Hair Spa',
        slug: 'hair-spa',
        description: 'Perawatan rambut spa lengkap',
        price: 450000,
        duration: 90,
        benefits: ['Rambut lembut', 'Berkilau', 'Sehat'],
      },
    }),
  ]);

  console.log(`✅ Created ${treatments.length} treatments`);

  // Create some unclaimed affiliate codes for testing
  const unclaimedCodes = await Promise.all([
    prisma.preClaimAffiliateCode.create({
      data: {
        code: 'PROMO2026',
        notes: 'Kode promo untuk event tahun baru',
        status: 'unclaimed',
      },
    }),
    prisma.preClaimAffiliateCode.create({
      data: {
        code: 'SEMINAR001',
        notes: 'Kode untuk peserta seminar',
        status: 'unclaimed',
      },
    }),
  ]);

  console.log(`✅ Created ${unclaimedCodes.length} unclaimed affiliate codes`);

  console.log('✨ Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
