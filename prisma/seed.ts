import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  })

  console.log(`Created admin user: ${admin.email}`)

  // Create products
  const products = [
    {
      name: 'Kit Robot Rover 2 roues',
      slug: 'kit-robot-rover-2-roues',
      description: 'Un kit complet pour construire un robot rover à deux roues motrices, parfait pour débuter avec Arduino.',
      price: 49.99,
      stock: 10,
      imageUrl: '/images/rover.jpg',
    },
    {
      name: 'Kit Robot Bras articulé',
      slug: 'kit-robot-bras-articule',
      description: 'Bras robotique avec 4 degrés de liberté. Idéal pour apprendre la cinématique.',
      price: 69.99,
      stock: 5,
      imageUrl: '/images/bras.jpg',
    },
    {
      name: 'Kit Robot Suiveur de ligne',
      slug: 'kit-robot-suiveur-de-ligne',
      description: 'Construisez un robot rapide capable de suivre une ligne noire tracée au sol.',
      price: 39.99,
      stock: 15,
      imageUrl: '/images/suiveur.jpg',
    },
  ];

  for (const productData of products) {
    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: productData,
    })
    console.log(`Created product: ${product.name}`)

    // Create a tutorial for each product
    await prisma.tutorial.upsert({
      where: { id: `tut-${product.id}` },
      update: {},
      create: {
        id: `tut-${product.id}`,
        title: `Guide de montage : ${product.name}`,
        content: `Bienvenue dans le guide complet pour le ${product.name}. Suivez les instructions ci-dessous pour assembler votre module opérationnel...`,
        productId: product.id,
      }
    })

    // Note: We could add example real GLB URLs here if available
    // await prisma.product.update({ where: { id: product.id }, data: { modelUrl: 'https://example.com/model.glb' } })
  }

  console.log('Database seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
