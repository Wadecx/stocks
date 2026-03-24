# Application de Gestion de Commandes

Application Next.js avec TypeScript, Tailwind CSS et SQLite (Prisma) pour la gestion de clients, produits et commandes.

## Fonctionnalités

### Authentification
- Page de login avec email/mot de passe
- 2 rôles : **admin** et **user**
- Protection des routes

**Comptes de test:**
- Admin: `admin@admin.com` / `admin123`
- User: `user@user.com` / `user123`

### Gestion des données

#### Clients
- Liste complète des clients
- Ajout de nouveaux clients
- Modification des informations clients
- Suppression de clients (impossible s'il y a des commandes)
- Visualisation des commandes par client

#### Produits
- Liste des produits avec prix, stock et catégorie
- Ajout de nouveaux produits
- Modification des produits existants
- Suppression de produits
- Affichage en cartes avec indicateur de stock faible

#### Commandes
- Liste de toutes les commandes
- Création de commandes (sélection client + produits)
- Modification du statut ("en cours" / "livrée")
- Visualisation détaillée des commandes
- Suppression de commandes

### Dashboard
- Nombre total de clients avec lien vers la liste
- Nombre total de commandes avec lien vers la liste
- Nombre total de produits avec lien vers la liste
- Commandes récentes
- Produits en stock faible

### Administration (Admin uniquement)
- Gestion des utilisateurs via JSONPlaceholder
- Modification des rôles (admin/user)
- Ajout et suppression d'utilisateurs (simulé)
- Liste de tous les utilisateurs

## Installation

```bash
# Installer les dépendances
npm install

# Initialiser la base de données (première fois uniquement)
npx prisma migrate dev

# Remplir la base de données avec des données de test
npm run prisma:seed

# Lancer en mode développement
npm run dev

# Construire pour la production
npm run build

# Lancer en production
npm start
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## Structure du projet

```
commandes/
├── app/                      # Pages et routes Next.js
│   ├── admin/               # Pages admin
│   │   └── users/           # Gestion utilisateurs
│   ├── api/                 # Routes API
│   │   ├── auth/            # Authentification
│   │   ├── clients/         # API clients
│   │   ├── products/        # API produits
│   │   ├── orders/          # API commandes
│   │   └── users/           # API utilisateurs (JSONPlaceholder)
│   ├── clients/             # Pages clients CRUD
│   ├── products/            # Pages produits CRUD
│   ├── orders/              # Pages commandes CRUD
│   ├── login/               # Page de connexion
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Dashboard
├── components/              # Composants React
│   └── Navbar.tsx           # Barre de navigation
├── lib/                     # Bibliothèques et utilitaires
│   ├── auth.ts              # Système d'authentification
│   └── prisma.ts            # Client Prisma
├── types/                   # Types TypeScript
│   └── index.ts             # Définitions de types
├── prisma/                  # Configuration Prisma
│   ├── schema.prisma        # Schéma de la base de données
│   ├── seed.ts              # Script de seed
│   └── migrations/          # Migrations de la BDD
└── middleware.ts            # Middleware de protection des routes
```

## Technologies utilisées

- **Next.js 16** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS
- **Prisma 5** - ORM pour la base de données
- **SQLite** - Base de données relationnelle
- **JSONPlaceholder** - API pour les utilisateurs

## Déploiement

### Vercel (Recommandé)

1. Créer un compte sur [Vercel](https://vercel.com)
2. Installer Vercel CLI:
```bash
npm install -g vercel
```
3. Déployer:
```bash
vercel
```

### Netlify

1. Créer un compte sur [Netlify](https://www.netlify.com)
2. Installer Netlify CLI:
```bash
npm install -g netlify-cli
```
3. Construire et déployer:
```bash
npm run build
netlify deploy --prod
```

### Autres options

L'application peut également être déployée sur:
- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify
- Google Cloud Run

## Notes importantes

- Les modifications sur les utilisateurs (JSONPlaceholder) sont simulées et non persistées
- Les données clients/produits/commandes sont stockées localement dans des fichiers JSON
- Pour une application en production, utilisez une vraie base de données (PostgreSQL, MongoDB, etc.)
- Le middleware protège automatiquement les routes selon le rôle de l'utilisateur
- La route `/admin/users` est accessible uniquement aux administrateurs

## Développement

Pour ajouter de nouvelles fonctionnalités:

1. Créer les types TypeScript dans `types/index.ts`
2. Ajouter les routes API dans `app/api/`
3. Créer les pages dans `app/`
4. Mettre à jour le middleware si nécessaire pour la protection des routes

## Auteur

Projet réalisé dans le cadre d'un cours de développement web.
