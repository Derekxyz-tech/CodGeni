# Guide de déploiement sur Hostinger

Ce guide vous explique comment déployer votre site Next.js sur Hostinger.

## Prérequis

- Un compte Hostinger avec **VPS** ou **Cloud Hosting** (le hosting partagé standard ne supporte pas Node.js)
- Accès SSH à votre serveur
- Node.js installé sur le serveur (version 18 ou supérieure)

## Étape 1 : Préparer le projet localement

### 1.1 Vérifier les variables d'environnement

Assurez-vous que votre fichier `.env.local` contient toutes les variables nécessaires :

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=votre-mot-de-passe-application
TO_EMAIL=votre-email@gmail.com
```

### 1.2 Installer les dépendances et tester le build

```bash
npm install
npm run build
npm start
```

Vérifiez que tout fonctionne correctement en local.

## Étape 2 : Préparer le serveur Hostinger

### 2.1 Se connecter en SSH

Connectez-vous à votre serveur Hostinger via SSH :
```bash
ssh username@your-server-ip
```

### 2.2 Installer Node.js et npm

Si Node.js n'est pas installé :

```bash
# Installer nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Installer Node.js 18
nvm install 18
nvm use 18
nvm alias default 18

# Vérifier l'installation
node --version
npm --version
```

### 2.3 Installer PM2 (gestionnaire de processus)

```bash
npm install -g pm2
```

## Étape 3 : Transférer les fichiers

### Option A : Via Git (recommandé)

1. Créez un repository Git (GitHub, GitLab, etc.)
2. Poussez votre code :
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/votre-username/votre-repo.git
git push -u origin main
```

3. Sur le serveur, clonez le repository :
```bash
cd ~/domains/votredomaine.com/public_html
git clone https://github.com/votre-username/votre-repo.git .
```

### Option B : Via FTP/SFTP

1. Utilisez FileZilla ou un client FTP similaire
2. Connectez-vous à votre serveur
3. Transférez tous les fichiers vers `/home/username/domains/votredomaine.com/public_html`

## Étape 4 : Configuration sur le serveur

### 4.1 Installer les dépendances

```bash
cd ~/domains/votredomaine.com/public_html
npm install --production
```

### 4.2 Créer le fichier .env

```bash
nano .env
```

Ajoutez vos variables d'environnement :
```env
NODE_ENV=production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=votre-mot-de-passe-application
TO_EMAIL=votre-email@gmail.com
```

Sauvegardez avec `Ctrl+X`, puis `Y`, puis `Enter`.

### 4.3 Construire le projet

```bash
npm run build
```

### 4.4 Configurer PM2

Modifiez le fichier `ecosystem.config.js` avec votre chemin et nom d'utilisateur :

```bash
nano ecosystem.config.js
```

Puis démarrez l'application :

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

Suivez les instructions affichées pour configurer le démarrage automatique.

## Étape 5 : Configurer le reverse proxy avec Nginx

### 5.1 Installer Nginx (si non installé)

```bash
sudo apt update
sudo apt install nginx
```

### 5.2 Configurer Nginx

Créez un fichier de configuration pour votre domaine :

```bash
sudo nano /etc/nginx/sites-available/votredomaine.com
```

Ajoutez la configuration suivante :

```nginx
server {
    listen 80;
    server_name votredomaine.com www.votredomaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Activez la configuration :

```bash
sudo ln -s /etc/nginx/sites-available/votredomaine.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5.3 Configurer SSL avec Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d votredomaine.com -d www.votredomaine.com
```

## Étape 6 : Vérifier le déploiement

1. Visitez votre domaine dans un navigateur
2. Vérifiez que le site fonctionne correctement
3. Testez le formulaire de contact

## Commandes utiles PM2

```bash
# Voir les logs
pm2 logs codgeni

# Redémarrer l'application
pm2 restart codgeni

# Arrêter l'application
pm2 stop codgeni

# Voir le statut
pm2 status

# Surveiller les ressources
pm2 monit
```

## Mise à jour du site

Après avoir fait des modifications :

```bash
cd ~/domains/votredomaine.com/public_html
git pull  # Si vous utilisez Git
npm install
npm run build
pm2 restart codgeni
```

## Troubleshooting

### Le site ne charge pas

1. Vérifiez que PM2 est en cours d'exécution : `pm2 status`
2. Vérifiez les logs : `pm2 logs codgeni`
3. Vérifiez que Nginx fonctionne : `sudo systemctl status nginx`
4. Vérifiez les ports : `netstat -tulpn | grep 3000`

### Erreur de port déjà utilisé

Si le port 3000 est déjà utilisé, modifiez le port dans `ecosystem.config.js` et dans la configuration Nginx.

### Variables d'environnement

Assurez-vous que le fichier `.env` est bien créé et contient toutes les variables nécessaires.

## Support

Pour plus d'aide, consultez :
- Documentation Hostinger : https://www.hostinger.com/tutorials
- Documentation Next.js : https://nextjs.org/docs/deployment
- Documentation PM2 : https://pm2.keymetrics.io/docs/usage/quick-start/

