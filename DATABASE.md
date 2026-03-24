# Guide de la Base de Données

Cette application utilise SQLite avec Prisma ORM pour gérer les données.

## Configuration

La base de données SQLite est configurée via Prisma et stockée dans `prisma/dev.db`.

### Variables d'environnement

Le fichier `.env` contient la configuration de la base de données:

```
DATABASE_URL="file:./prisma/dev.db"
```

## Schéma de la Base de Données

L'application utilise 4 tables principales:

### Client
- `id`: Identifiant unique (auto-incrémenté)
- `name`: Nom du client
- `email`: Email (unique)
- `phone`: Téléphone
- `address`: Adresse
- Relations: Un client peut avoir plusieurs commandes

### Product
- `id`: Identifiant unique (auto-incrémenté)
- `name`: Nom du produit
- `price`: Prix (Float)
- `stock`: Stock disponible (Int)
- `category`: Catégorie
- Relations: Un produit peut être dans plusieurs commandes

### Order
- `id`: Identifiant unique (auto-incrémenté)
- `clientId`: Référence au client
- `status`: Statut ("en cours" ou "livrée")
- `total`: Montant total (Float)
- `date`: Date de la commande
- Relations: Une commande appartient à un client et contient plusieurs produits

### OrderProduct
- `id`: Identifiant unique (auto-incrémenté)
- `orderId`: Référence à la commande
- `productId`: Référence au produit
- `quantity`: Quantité
- `price`: Prix unitaire au moment de la commande
- Relations: Table de jointure entre Order et Product

## Commandes Prisma Utiles

### Initialiser la base de données

```bash
# Créer les migrations et la base de données
npx prisma migrate dev

# Générer le client Prisma
npx prisma generate
```

### Remplir la base de données avec des données de test

```bash
npm run prisma:seed
```

Ce script remplit la base de données avec:
- 3 clients exemples
- 5 produits exemples
- 3 commandes exemples

### Visualiser les données

```bash
# Ouvrir Prisma Studio (interface graphique)
npx prisma studio
```

Prisma Studio s'ouvrira sur [http://localhost:5555](http://localhost:5555) et vous permettra de:
- Visualiser toutes les tables
- Modifier les données directement
- Ajouter ou supprimer des enregistrements

### Réinitialiser la base de données

```bash
# Supprimer toutes les données et recréer les tables
npx prisma migrate reset

# Cela exécutera également automatiquement le seed
```

### Créer une nouvelle migration

Si vous modifiez le schéma dans `prisma/schema.prisma`:

```bash
npx prisma migrate dev --name nom_de_la_migration
```

## Utilisation dans le Code

### Importer le client Prisma

```typescript
import { prisma } from '@/lib/prisma';
```

### Exemples d'utilisation

**Récupérer tous les clients:**
```typescript
const clients = await prisma.client.findMany({
  orderBy: { id: 'asc' },
});
```

**Créer un nouveau client:**
```typescript
const newClient = await prisma.client.create({
  data: {
    name: "John Doe",
    email: "john@example.com",
    phone: "0123456789",
    address: "123 Main St"
  },
});
```

**Mettre à jour un client:**
```typescript
const updated = await prisma.client.update({
  where: { id: 1 },
  data: { name: "Jane Doe" },
});
```

**Supprimer un client:**
```typescript
await prisma.client.delete({
  where: { id: 1 },
});
```

**Récupérer une commande avec ses produits:**
```typescript
const order = await prisma.order.findUnique({
  where: { id: 1 },
  include: {
    products: true,
    client: true,
  },
});
```

## Déploiement

### Base de données pour la production

Pour la production, il est recommandé d'utiliser:

1. **PostgreSQL** (recommandé pour Vercel/Netlify)
   ```
   DATABASE_URL="postgresql://user:password@host:5432/database"
   ```

2. **MySQL**
   ```
   DATABASE_URL="mysql://user:password@host:3306/database"
   ```

3. **Services managés:**
   - [Supabase](https://supabase.com) - PostgreSQL gratuit
   - [PlanetScale](https://planetscale.com) - MySQL serverless
   - [Railway](https://railway.app) - PostgreSQL/MySQL

### Migrations en production

```bash
# Appliquer les migrations sans seed
npx prisma migrate deploy
```

## Backup et Restauration

### Backup SQLite

```bash
# Copier le fichier de base de données
cp prisma/dev.db prisma/dev.db.backup
```

### Restauration

```bash
# Remplacer par le backup
cp prisma/dev.db.backup prisma/dev.db
```

## Dépannage

### Erreur: "Can't reach database server"

- Vérifier que DATABASE_URL est correct dans `.env`
- Exécuter `npx prisma migrate dev` pour créer la base de données

### Erreur: "Table does not exist"

```bash
npx prisma migrate reset
```

### Erreur: "Prisma Client not generated"

```bash
npx prisma generate
```

## Plus d'informations

- [Documentation Prisma](https://www.prisma.io/docs)
- [Guide SQLite](https://www.sqlite.org/docs.html)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
