# Optimisations SEO pour Google Search Console

Ce document décrit toutes les optimisations SEO implémentées pour améliorer le référencement sur Google Search Console.

## 📋 Fichiers créés/modifiés

### 1. Sitemap dynamique (`src/app/sitemap.ts`)
- Sitemap XML généré automatiquement avec toutes les routes
- Mis à jour automatiquement lors du build
- Accessible à `/sitemap.xml`
- Priorités et fréquences de mise à jour configurées

### 2. Robots.txt (`src/app/robots.ts`)
- Fichier robots.txt généré dynamiquement
- Accessible à `/robots.txt`
- Configuration spécifique pour Googlebot
- Référence au sitemap incluse

### 3. Manifest PWA (`src/app/manifest.ts`)
- Manifest pour Progressive Web App
- Configuration du thème et des icônes
- Accessible à `/manifest.json`

### 4. Métadonnées optimisées (`src/app/layout.tsx`)
- Métadonnées complètes avec template
- Open Graph optimisé pour les réseaux sociaux
- Twitter Cards configurées
- Données structurées JSON-LD (Schema.org)
- Balises de vérification pour Google, Yandex, Yahoo
- Métadonnées géographiques (Haïti)

### 5. Données structurées (`src/lib/structured-data.ts`)
- Schema.org pour Organisation
- Schema.org pour Site Web
- Schema.org pour Services
- Amélioration du rich snippets dans Google

### 6. Configuration Next.js améliorée (`next.config.js`)
- Headers de sécurité optimisés
- Compression activée
- Optimisation des images (AVIF, WebP)
- Cache-Control pour sitemap et robots.txt
- Suppression des console.log en production

## 🔧 Variables d'environnement nécessaires

Créez un fichier `.env.local` avec les variables suivantes :

```env
# URL du site
NEXT_PUBLIC_SITE_URL=https://codgeni.ht

# Vérification Google Search Console
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code

# Vérifications optionnelles
NEXT_PUBLIC_YANDEX_VERIFICATION=your-code
NEXT_PUBLIC_YAHOO_VERIFICATION=your-code

# Réseaux sociaux (recommandé pour SEO)
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/codgeni
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/codgeni_ht
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/codgeni
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/codgeni

# Informations de contact (pour données structurées)
NEXT_PUBLIC_CONTACT_EMAIL=contact@codgeni.ht
NEXT_PUBLIC_CONTACT_PHONE=+509xxxxxxxx
```

## 📝 Étapes pour Google Search Console

### 1. Soumettre le sitemap
1. Allez sur [Google Search Console](https://search.google.com/search-console)
2. Ajoutez votre propriété (site web)
3. Allez dans "Sitemaps"
4. Ajoutez : `https://codgeni.ht/sitemap.xml`

### 2. Vérifier la propriété
1. Dans Google Search Console, allez dans "Paramètres" > "Propriété"
2. Sélectionnez "Méthode recommandée" (balise HTML)
3. Copiez le code de vérification fourni
4. Ajoutez-le dans `.env.local` comme `NEXT_PUBLIC_GOOGLE_VERIFICATION`

### 3. Vérifier l'indexation
1. Utilisez "Inspection d'URL" pour tester vos pages
2. Vérifiez que le robots.txt est accessible
3. Vérifiez que le sitemap est correctement lu

### 4. Améliorer le référencement
- Vérifiez les pages indexées dans "Couverture"
- Analysez les performances dans "Performance"
- Corrigez les erreurs d'indexation

## 🎯 Optimisations supplémentaires recommandées

### Images
- Créez une image Open Graph à `/public/images/og-image.jpg` (1200x630px)
- Optimisez toutes les images (WebP, AVIF)
- Ajoutez des attributs `alt` descriptifs

### Performance
- Vérifiez les scores Lighthouse
- Optimisez le Core Web Vitals
- Activez le lazy loading des images

### Contenu
- Ajoutez des métadonnées spécifiques pour chaque page
- Utilisez des balises H1-H6 correctement
- Ajoutez des liens internes entre pages

### Local SEO
- Créez un profil Google Business
- Ajoutez des données structurées LocalBusiness si applicable
- Optimisez pour les recherches locales

## 📊 Vérification

### URLs importantes à vérifier :
- `https://codgeni.ht/sitemap.xml` - Sitemap
- `https://codgeni.ht/robots.txt` - Robots.txt
- `https://codgeni.ht/manifest.json` - Manifest
- `https://codgeni.ht/` - Page d'accueil avec métadonnées

### Outils de test :
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema Markup Validator](https://validator.schema.org/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## 🔄 Mise à jour du sitemap

Le sitemap est généré automatiquement. Pour ajouter de nouvelles routes :
1. Modifiez `src/app/sitemap.ts`
2. Ajoutez les nouvelles routes dans le tableau `routes`
3. Le sitemap sera régénéré au prochain build

## 📞 Support

Pour toute question sur les optimisations SEO, consultez :
- [Google Search Central](https://developers.google.com/search)
- [Next.js SEO Documentation](https://nextjs.org/learn/seo/introduction-to-seo)

