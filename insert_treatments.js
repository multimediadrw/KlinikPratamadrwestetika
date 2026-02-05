const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const data = JSON.parse(fs.readFileSync('/home/ubuntu/upload/bukumenu(3).json', 'utf8'));
  
  const categories = {
    'anti_acne_treatment': 'Anti Acne Treatment',
    'post_acne_treatment': 'Post Acne Treatment',
    'anti_aging_treatment': 'Anti Aging Treatment',
    'flex_pigment_treatment': 'Flek & Pigment Treatment',
    'glow_skin_treatment': 'Glow Skin Treatment',
    'body_treatment': 'Body Treatment',
    'lymphatic_treatment': 'Lymphatic Treatment',
    'hair_treatment': 'Hair Treatment',
    'nail_hand_foot_aesthetic': 'Nail, Hand & Foot Aesthetic'
  };
  
  for (const [key, categoryName] of Object.entries(categories)) {
    const treatments = data.menu_lengkap[key];
    if (!treatments) continue;
    
    // Create or get category
    let category = await prisma.treatmentCategory.findFirst({
      where: { name: categoryName }
    });
    
    if (!category) {
      category = await prisma.treatmentCategory.create({
        data: { 
          name: categoryName, 
          description: categoryName,
          slug: key
        }
      });
      console.log('Created category:', categoryName);
    }
    
    // Create treatments
    for (const treatment of treatments) {
      const existing = await prisma.treatment.findFirst({
        where: { name: treatment.nama }
      });
      
      if (!existing) {
        let priceStr = treatment.harga.replace(/Rp\s*/g, '').replace(/\./g, '').replace(/,/g, '').split('/')[0].trim();
        priceStr = priceStr.replace(/[^0-9]/g, '');
        const slug = treatment.nama.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        await prisma.treatment.create({
          data: {
            name: treatment.nama,
            description: treatment.manfaat,
            price: priceStr,
            duration: 60,
            categoryId: category.id,
            slug: slug
          }
        });
        console.log('Created:', treatment.nama, '- Rp', priceStr);
      }
    }
  }
  
  const total = await prisma.treatment.count();
  console.log('\nTotal treatments in database:', total);
}

main().catch(console.error).finally(() => prisma.$disconnect());
