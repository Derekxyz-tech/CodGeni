# Configuration du nom de domaine sur Hostinger

Ce guide vous explique comment connecter votre nom de domaine à votre site Next.js sur Hostinger.

## 📋 Prérequis

- Un compte Hostinger avec un hébergement VPS ou Cloud
- Un nom de domaine (acheté sur Hostinger ou ailleurs)
- Accès au panneau de contrôle Hostinger (hPanel)

## 🎯 Étape 1 : Configuration dans Hostinger hPanel

### 1.1 Si votre domaine est sur Hostinger

1. Connectez-vous à votre **hPanel** Hostinger
2. Allez dans **Domaines** → **Gestionnaire de domaines**
3. Trouvez votre domaine et cliquez sur **DNS / Zones de noms**
4. Vérifiez que ces enregistrements DNS existent :

```
Type    Nom              Valeur              TTL
A       @                VOTRE_IP_SERVEUR    3600
A       www              VOTRE_IP_SERVEUR    3600
CNAME   www              votredomaine.com    3600
```

**Remplacez `VOTRE_IP_SERVEUR`** par l'IP de votre serveur Hostinger (vous la trouverez dans les détails de votre VPS/Cloud).

### 1.2 Si votre domaine est ailleurs (ex: GoDaddy, Namecheap, etc.)

1. Connectez-vous au panneau de contrôle de votre registraire de domaine
2. Allez dans la section **DNS** ou **Nameservers**
3. Vous avez deux options :

#### Option A : Utiliser les nameservers de Hostinger (Recommandé)

1. Dans hPanel Hostinger, notez vos **nameservers** (généralement quelque chose comme) :
   ```
   ns1.dns-parking.com
   ns2.dns-parking.com
   ```

2. Dans votre registraire de domaine, changez les nameservers pour ceux de Hostinger
3. Attendez 24-48h pour la propagation DNS

#### Option B : Configurer les DNS manuellement

Dans votre registraire de domaine, ajoutez ces enregistrements :

```
Type    Nom    Valeur              TTL
A       @      VOTRE_IP_SERVEUR    3600
A       www    VOTRE_IP_SERVEUR    3600
```

**Remplacez `VOTRE_IP_SERVEUR`** par l'IP de votre serveur Hostinger.

## 🔧 Étape 2 : Configurer le domaine sur le serveur

### 2.1 Dans hPanel Hostinger

1. Allez dans **Hébergement** → **Domaines**
2. Cliquez sur **Ajouter un domaine**
3. Entrez votre nom de domaine (ex: `codgeni.com`)
4. Choisissez **Utiliser un répertoire existant** et pointez vers `/home/username/domains/votredomaine.com/public_html`
5. Cliquez sur **Ajouter**

### 2.2 Via SSH (Alternative)

Si vous préférez configurer via SSH :

```bash
# Créer le répertoire pour le domaine
mkdir -p ~/domains/votredomaine.com/public_html

# Définir les permissions
chmod 755 ~/domains/votredomaine.com/public_html
```

## 🌐 Étape 3 : Mettre à jour la configuration Nginx

1. Connectez-vous en SSH à votre serveur
2. Modifiez le fichier de configuration Nginx :

```bash
sudo nano /etc/nginx/sites-available/votredomaine.com
```

3. Remplacez `votredomaine.com` par votre vrai nom de domaine :

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

4. Testez la configuration :
```bash
sudo nginx -t
```

5. Rechargez Nginx :
```bash
sudo systemctl reload nginx
```

## 🔒 Étape 4 : Installer SSL (HTTPS)

Une fois que le domaine pointe correctement vers votre serveur, installez un certificat SSL gratuit avec Let's Encrypt :

```bash
# Installer certbot
sudo apt install certbot python3-certbot-nginx

# Obtenir le certificat SSL
sudo certbot --nginx -d votredomaine.com -d www.votredomaine.com
```

Suivez les instructions à l'écran. Certbot configurera automatiquement Nginx pour utiliser HTTPS.

## ⚙️ Étape 5 : Mettre à jour l'URL dans le code

### 5.1 Mettre à jour les métadonnées

Modifiez le fichier `src/app/layout.tsx` pour utiliser votre vrai domaine :

```typescript
export const metadata: Metadata = {
  // ... autres métadonnées
  openGraph: {
    url: 'https://votredomaine.com',  // Changez ici
    // ...
  },
};

// Et dans le <head>:
<link rel="canonical" href="https://votredomaine.com" />
```

### 5.2 Utiliser une variable d'environnement (Recommandé)

Pour rendre l'URL configurable, ajoutez dans votre `.env` sur le serveur :

```env
NEXT_PUBLIC_SITE_URL=https://votredomaine.com
```

Puis modifiez `src/app/layout.tsx` :

```typescript
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codgeni.com';

export const metadata: Metadata = {
  // ...
  openGraph: {
    url: siteUrl,
    // ...
  },
};
```

Et dans le head :
```typescript
<link rel="canonical" href={siteUrl} />
```

## ✅ Étape 6 : Vérifier la configuration

1. **Vérifiez les DNS** : Utilisez un outil comme [whatsmydns.net](https://www.whatsmydns.net) pour vérifier que votre domaine pointe vers votre IP

2. **Testez le domaine** : Ouvrez votre navigateur et visitez `http://votredomaine.com`

3. **Vérifiez HTTPS** : Après l'installation de SSL, testez `https://votredomaine.com`

4. **Vérifiez les redirections** : Assurez-vous que `www.votredomaine.com` redirige vers `votredomaine.com` (ou vice-versa)

## 🐛 Troubleshooting

### Le domaine ne charge pas

1. **Vérifiez les DNS** :
   ```bash
   dig votredomaine.com
   nslookup votredomaine.com
   ```

2. **Vérifiez que Nginx fonctionne** :
   ```bash
   sudo systemctl status nginx
   ```

3. **Vérifiez les logs Nginx** :
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

4. **Vérifiez que votre application Next.js tourne** :
   ```bash
   pm2 status
   ```

### Erreur "SSL certificate problem"

Attendez 24-48h après avoir configuré les DNS avant d'installer SSL. Les DNS doivent être propagés partout.

### Le site charge mais ne fonctionne pas correctement

Vérifiez que toutes les variables d'environnement sont bien configurées dans le fichier `.env` sur le serveur.

## 📝 Checklist finale

- [ ] DNS configurés correctement
- [ ] Domaine ajouté dans hPanel Hostinger
- [ ] Nginx configuré avec le bon nom de domaine
- [ ] Application Next.js fonctionne sur le port 3000
- [ ] PM2 gère l'application
- [ ] SSL installé et fonctionnel
- [ ] URL mise à jour dans le code
- [ ] Site accessible via `https://votredomaine.com`
- [ ] Redirection www configurée (si nécessaire)

## 🔄 Mise à jour après changement de domaine

Si vous changez de domaine plus tard :

1. Mettez à jour les DNS
2. Mettez à jour la configuration Nginx
3. Réinstallez le certificat SSL : `sudo certbot --nginx -d nouveaudomaine.com`
4. Mettez à jour les variables d'environnement
5. Reconstruisez l'application : `npm run build && pm2 restart codgeni`

---

**Note** : La propagation DNS peut prendre de 24 à 48 heures. Soyez patient ! 

Pour vérifier si les DNS sont propagés : https://www.whatsmydns.net

