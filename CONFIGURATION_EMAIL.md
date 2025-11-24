# Configuration de l'envoi d'emails

Pour que le formulaire de contact fonctionne et envoie des emails à `contact@codgeni.com`, vous devez configurer les variables d'environnement SMTP.

## Étapes de configuration

1. Créez un fichier `.env.local` à la racine du projet (à côté de `package.json`)

2. Ajoutez les variables suivantes dans `.env.local`:

```env
# Configuration SMTP pour l'envoi d'emails

# Host SMTP (exemples: smtp.gmail.com, smtp.outlook.com, smtp.mail.yahoo.com)
SMTP_HOST=smtp.gmail.com

# Port SMTP (587 pour TLS, 465 pour SSL)
SMTP_PORT=587

# Secure (true pour SSL/465, false pour TLS/587)
SMTP_SECURE=false

# Email d'envoi (votre adresse email)
SMTP_USER=votre-email@gmail.com

# Mot de passe de l'email ou mot de passe d'application
SMTP_PASSWORD=votre-mot-de-passe
```

## Configuration avec Gmail

Pour utiliser Gmail comme service SMTP:

1. Activez l'authentification à deux facteurs sur votre compte Google
2. Générez un mot de passe d'application:
   - Allez sur https://myaccount.google.com/apppasswords
   - Sélectionnez "Mail" et "Autre (nom personnalisé)"
   - Entrez "CodGeni Contact Form"
   - Copiez le mot de passe généré (16 caractères)
3. Utilisez ce mot de passe d'application comme `SMTP_PASSWORD`

**Configuration Gmail:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=votre-mot-de-passe-application
```

## Configuration avec d'autres services

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@outlook.com
SMTP_PASSWORD=votre-mot-de-passe
```

### Yahoo Mail
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@yahoo.com
SMTP_PASSWORD=votre-mot-de-passe
```

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=votre-cle-api-sendgrid
```

## Sécurité

⚠️ **Important:** Ne commitez jamais le fichier `.env.local` dans Git. Il doit être dans `.gitignore`.

Le fichier `.env.local` est déjà ignoré par Git par défaut dans Next.js.

## Test

Après avoir configuré les variables d'environnement:

1. Redémarrez le serveur de développement (`npm run dev`)
2. Remplissez le formulaire de contact sur votre site
3. Vérifiez que l'email arrive bien à `contact@codgeni.com`

## Dépannage

Si les emails ne sont pas envoyés:

1. Vérifiez que toutes les variables d'environnement sont correctement définies
2. Vérifiez les logs du serveur pour voir les erreurs
3. Pour Gmail, assurez-vous d'utiliser un mot de passe d'application et non votre mot de passe principal
4. Vérifiez que le port et les paramètres de sécurité correspondent à votre service SMTP




