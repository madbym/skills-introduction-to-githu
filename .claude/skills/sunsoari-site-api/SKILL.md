---
name: sunsoari-site-api
description: Site web Sunsoari.fr (thème Shopify du dépôt, pages, structure, vitesse, accessibilité, référencement) et création d'API ou d'intégrations de qualité (Shopify Admin GraphQL, webhooks, petites applications avec Lovable ou Floot). À utiliser pour modifier le site, le thème, une page, ou construire une API ou une automatisation.
---

# Sunsoari — site web et API

Charger `sunsoari-marque` pour tout texte visible par les clientes.

## Le site (Shopify)

- Le thème se trouve dans `sunsoari-theme/` : `build/` (générateurs Python), `theme/` (fichiers générés), `remote/` (copie de référence, **ne jamais modifier**).
- Regénérer : `cd sunsoari-theme/build && python3 products.py && python3 pages.py && python3 settings.py`.
- Travailler sur le **thème non publié** « Sunsoari - fullstack » ; ne jamais publier un thème sans l'accord de Fanta.

### Pages indispensables

Accueil · Collections · Fiches produits · Notre histoire · Comment choisir son filtre · Guide d'installation · FAQ · Contact · Livraison et retours · Mentions légales · CGV · Politique de confidentialité · Gestion des cookies.

### Qualité minimale de chaque page

- Lisible sur téléphone en priorité (la majorité des visites).
- Images compressées (WebP), chargement différé sous la ligne de flottaison.
- Contraste suffisant, textes alternatifs, boutons assez grands (accessibilité).
- Un titre principal (H1) par page, titre SEO et méta-description.
- Parcours d'achat testé de bout en bout avant toute mise en ligne.

## Créer une API ou une intégration de qualité

Avant de coder, **vérifier si Shopify ou une application existante le fait déjà** : moins de code, c'est moins de maintenance pour une petite équipe.

Quand du code est justifié :

1. **Clarifier** : qui l'utilise, quelles données, que se passe-t-il en cas d'erreur.
2. **Conception** : routes nommées clairement (`GET /produits`, `POST /avis`), réponses JSON cohérentes, codes HTTP corrects (200, 201, 400, 401, 404, 500), pagination.
3. **Sécurité** :
   - clés et mots de passe dans des **variables d'environnement**, jamais dans le code ni dans Git ;
   - permissions minimales (scopes Shopify limités au nécessaire) ;
   - vérifier la signature HMAC des webhooks Shopify ;
   - valider toutes les entrées ; limiter le nombre de requêtes.
4. **Données personnelles** (clientes) : n'en stocker que le strict nécessaire (RGPD).
5. **Fiabilité** : gérer les erreurs et les nouvelles tentatives, respecter les limites de l'API Shopify, journaux sans données sensibles.
6. **Tests** : tests automatiques sur les cas normaux et les cas d'erreur avant toute mise en ligne.
7. **Documentation** : un `README` court (installation, variables, exemples d'appels).

### Outils connectés

- **Shopify** (Admin GraphQL) : produits, commandes, stock, remises. Lecture libre ; toute écriture validée par Fanta.
- **Lovable** ou **Floot** : petites applications complètes (ex. quiz « quel filtre pour moi ? », page de suivi des recharges). Ces outils consomment des crédits : prévenir avant.
- **Webflow** : seulement si un site vitrine séparé est décidé (pas nécessaire pour l'instant).

## Idées utiles (par ordre de valeur)

1. Quiz « Quel filtre pour ma douche ? » → recommandation de produit.
2. Rappel automatique de recharge (Shopify + Klaviyo, souvent sans code).
3. Tableau de bord simple : ventes, produits phares, recharges à prévoir.
