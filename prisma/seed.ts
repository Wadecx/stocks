import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Début du seeding...');

  // Supprimer les données existantes
  await prisma.orderProduct.deleteMany();
  await prisma.order.deleteMany();
  await prisma.client.deleteMany();
  await prisma.product.deleteMany();

  // Créer les clients
  const clients = await Promise.all([
    prisma.client.create({
      data: {
        name: 'Jean Dupont',
        email: 'jean.dupont@example.com',
        phone: '0123456789',
        address: '123 Rue de Paris, 75001 Paris',
      },
    }),
    prisma.client.create({
      data: {
        name: 'Marie Martin',
        email: 'marie.martin@example.com',
        phone: '0234567890',
        address: '456 Avenue des Champs, 69001 Lyon',
      },
    }),
    prisma.client.create({
      data: {
        name: 'Pierre Dubois',
        email: 'pierre.dubois@example.com',
        phone: '0345678901',
        address: '789 Boulevard de la Liberté, 33000 Bordeaux',
      },
    }),
  ]);

  console.log('Clients créés:', clients.length);

  // Créer les produits
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Ordinateur Portable',
        price: 899.99,
        stock: 15,
        category: 'Électronique',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Souris Sans Fil',
        price: 29.99,
        stock: 50,
        category: 'Accessoires',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Clavier Mécanique',
        price: 89.99,
        stock: 30,
        category: 'Accessoires',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Écran 27 pouces',
        price: 299.99,
        stock: 20,
        category: 'Électronique',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Casque Audio',
        price: 149.99,
        stock: 25,
        category: 'Audio',
      },
    }),
  ]);

  console.log('Produits créés:', products.length);

  // Créer les commandes
  const order1 = await prisma.order.create({
    data: {
      clientId: clients[0].id,
      status: 'en cours',
      total: 959.97,
      date: '2026-03-20',
      products: {
        create: [
          {
            productId: products[0].id,
            quantity: 1,
            price: 899.99,
          },
          {
            productId: products[1].id,
            quantity: 2,
            price: 29.99,
          },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      clientId: clients[1].id,
      status: 'livrée',
      total: 449.98,
      date: '2026-03-15',
      products: {
        create: [
          {
            productId: products[3].id,
            quantity: 1,
            price: 299.99,
          },
          {
            productId: products[4].id,
            quantity: 1,
            price: 149.99,
          },
        ],
      },
    },
  });

  const order3 = await prisma.order.create({
    data: {
      clientId: clients[2].id,
      status: 'en cours',
      total: 179.98,
      date: '2026-03-22',
      products: {
        create: [
          {
            productId: products[2].id,
            quantity: 2,
            price: 89.99,
          },
        ],
      },
    },
  });

  console.log('Commandes créées: 3');
  console.log('Seeding terminé avec succès!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
