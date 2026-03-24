# Guide de Déploiement

Ce guide explique comment déployer l'application de gestion de commandes sur différentes plateformes.

## Option 1: Vercel (Recommandé - Le plus simple)

Vercel est la plateforme officielle pour Next.js et offre le déploiement le plus simple.

### Méthode A: Déploiement via Git (Recommandé)

1. **Créer un dépôt Git (si ce n'est pas déjà fait)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Créer un dépôt sur GitHub**
   - Aller sur [github.com](https://github.com)
   - Créer un nouveau dépôt
   - Suivre les instructions pour pousser votre code

3. **Déployer sur Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Cliquer sur "New Project"
   - Importer votre dépôt GitHub
   - Vercel détectera automatiquement Next.js
   - Cliquer sur "Deploy"
   - Votre application sera en ligne en quelques minutes!

### Méthode B: Déploiement via CLI

1. **Installer Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Se connecter à Vercel**
   ```bash
   vercel login
   ```

3. **Déployer**
   ```bash
   vercel
   ```

   Pour un déploiement en production:
   ```bash
   vercel --prod
   ```

4. Vercel vous donnera une URL de déploiement (ex: `https://votre-app.vercel.app`)

## Option 2: Netlify

1. **Installer Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Se connecter à Netlify**
   ```bash
   netlify login
   ```

3. **Construire le projet**
   ```bash
   npm run build
   ```

4. **Déployer**
   ```bash
   netlify deploy --prod
   ```

5. Suivre les instructions pour connecter votre site

**Note:** Netlify peut nécessiter une configuration supplémentaire pour Next.js. Créez un fichier `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## Option 3: Railway

1. **Créer un compte sur [Railway](https://railway.app)**

2. **Créer un nouveau projet**
   - Cliquer sur "New Project"
   - Sélectionner "Deploy from GitHub repo"
   - Autoriser l'accès à votre dépôt

3. **Configuration automatique**
   - Railway détectera automatiquement Next.js
   - Le déploiement se fera automatiquement

4. Votre application sera accessible via une URL Railway

## Option 4: Render

1. **Créer un compte sur [Render](https://render.com)**

2. **Créer un nouveau Web Service**
   - Cliquer sur "New +"
   - Sélectionner "Web Service"
   - Connecter votre dépôt Git

3. **Configuration**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: Node

4. Cliquer sur "Create Web Service"

## Option 5: Hébergement local pour démonstration

Si vous voulez juste démontrer l'application localement:

1. **Construire pour la production**
   ```bash
   npm run build
   ```

2. **Démarrer le serveur de production**
   ```bash
   npm start
   ```

3. L'application sera accessible sur `http://localhost:3000`

4. Pour la rendre accessible sur votre réseau local:
   - Trouver votre adresse IP locale (ex: 192.168.1.x)
   - Partager `http://votre-ip:3000` avec d'autres sur le même réseau

## Vérifications avant le déploiement

Avant de déployer, assurez-vous que:

- [ ] `npm run build` fonctionne sans erreurs
- [ ] Tous les fichiers nécessaires sont présents
- [ ] Les fichiers de données (clients.json, products.json, orders.json) existent
- [ ] Le fichier .gitignore exclut node_modules et .next

## Après le déploiement

1. **Tester l'authentification**
   - Admin: admin@admin.com / admin123
   - User: user@user.com / user123

2. **Vérifier toutes les fonctionnalités**
   - Dashboard
   - CRUD clients
   - CRUD produits
   - CRUD commandes
   - Gestion utilisateurs (admin uniquement)

3. **Partager l'URL**
   - Copier l'URL de déploiement
   - La partager pour démonstration

## Problèmes courants

### Erreur de build
- Vérifier que toutes les dépendances sont installées
- Exécuter `npm install` puis `npm run build` localement

### Routes protégées ne fonctionnent pas
- Vérifier que le middleware.ts est bien présent
- S'assurer que les cookies sont activés dans le navigateur

### Données non chargées
- Vérifier que les fichiers JSON dans /data sont présents
- Vérifier les logs de déploiement pour les erreurs

## Support

Pour toute question ou problème:
- Consulter la documentation Next.js: [nextjs.org/docs](https://nextjs.org/docs)
- Consulter la documentation de votre plateforme de déploiement
