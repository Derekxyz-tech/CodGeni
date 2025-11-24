# CodGeni - Site Web Portfolio

Site web portfolio pour CodGeni, une agence de développement web basée en Haïti.

## 🚀 Technologies utilisées

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS
- **Framer Motion** - Animations
- **Three.js** - Graphiques 3D
- **Nodemailer** - Envoi d'emails

## 📋 Prérequis

- Node.js 18 ou supérieur
- npm ou yarn

## 🛠️ Installation

1. Clonez le repository :
```bash
git clone https://github.com/votre-username/codgeni.git
cd codgeni
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env.local` à la racine :
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=votre-mot-de-passe-application
TO_EMAIL=votre-email@gmail.com
```

4. Lancez le serveur de développement :
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Build et Production

```bash
npm run build
npm start
```

## 📦 Déploiement

Pour déployer sur Hostinger, consultez le fichier [DEPLOYMENT.md](./DEPLOYMENT.md) pour les instructions complètes.

### Résumé rapide :

1. Assurez-vous d'avoir un **VPS** ou **Cloud Hosting** sur Hostinger
2. Transférez vos fichiers via Git ou FTP
3. Installez Node.js et PM2 sur le serveur
4. Configurez Nginx comme reverse proxy
5. Installez SSL avec Let's Encrypt

## 📝 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Crée une build de production
- `npm start` - Lance le serveur de production
- `npm run lint` - Vérifie le code avec ESLint

## 🔒 Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `SMTP_HOST` | Serveur SMTP | `smtp.gmail.com` |
| `SMTP_PORT` | Port SMTP | `587` |
| `SMTP_SECURE` | Connexion sécurisée | `false` |
| `SMTP_USER` | Email d'envoi | `votre-email@gmail.com` |
| `SMTP_PASSWORD` | Mot de passe d'application | `votre-mot-de-passe` |
| `TO_EMAIL` | Email destinataire | `contact@codgeni.com` |

## 📄 Pages légales

Les pages suivantes sont disponibles mais en cours de rédaction :
- `/mentions-legales` - Mentions légales
- `/confidentialite` - Politique de confidentialité
- `/cgv` - Conditions générales de vente
- `/cookies` - Politique de cookies

## 🐛 Troubleshooting

### Problèmes avec l'envoi d'emails

Assurez-vous d'utiliser un **mot de passe d'application** Gmail et non votre mot de passe principal.

### Erreurs de build

Vérifiez que toutes les dépendances sont installées : `npm install`

## 📞 Support

Pour toute question, contactez-nous à contact@codgeni.com

## 📄 Licence

© 2025 CodGeni. Tous droits réservés.

