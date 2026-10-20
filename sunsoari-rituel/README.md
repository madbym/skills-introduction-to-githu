# Mon Rituel Sunsoari

Un widget de diagnostic beauté pour sunsoari.fr : questionnaire peau, cheveux et eau → rituel personnalisé → produits de la boutique avec lien et ajout au panier → planner de recharges et de semaine de soin.

Un seul fichier (`sunsoari-rituel.js`), sans dépendance, isolé dans un Shadow DOM : il ne casse pas le style du site qui l'accueille.

## Fichiers

| Fichier | Rôle |
|---|---|
| `sunsoari-rituel.js` | Le widget complet (catalogue, questions, logique, planner) |
| `shopify-section-mon-rituel.liquid` | Section à coller dans le thème Shopify |
| `demo.html` | Page de démonstration |

## Installation

### Sur Shopify (sunsoari.fr)
1. **Boutique en ligne > Thèmes > … > Modifier le code**.
2. Dans `assets`, ajouter `sunsoari-rituel.js`.
3. Dans `sections`, créer `mon-rituel.liquid` et coller `shopify-section-mon-rituel.liquid`.
4. Créer une page « Mon rituel » (`/pages/mon-rituel`), puis dans **Personnaliser** ajouter la section « Mon Rituel ».

Sur la boutique, « Ajouter au panier » ajoute le produit sans quitter la page.

### Sur un autre site (WordPress, Wix, Webflow, Squarespace, blog, lien en bio…)
Coller un bloc HTML :

```html
<div id="sunsoari-rituel" data-shop="https://sunsoari.fr"></div>
<script src="URL-DU-FICHIER/sunsoari-rituel.js" defer></script>
```

`URL-DU-FICHIER` : l'adresse du fichier une fois ajouté aux assets Shopify (clic droit sur le fichier > copier le lien `cdn.shopify.com/...`).

Hors Shopify, « Ajouter au panier » ouvre un lien panier Shopify (`sunsoari.fr/cart/ID:1`) : la cliente arrive directement sur ton panier.

Si le site n'accepte pas les scripts (certaines offres Wix gratuites), utiliser une iframe vers la page Shopify :

```html
<iframe src="https://sunsoari.fr/pages/mon-rituel" style="width:100%;height:900px;border:0"></iframe>
```

### Suivi (facultatif)
Le widget émet deux événements à brancher sur Google Analytics, Meta Pixel ou Klaviyo :
- `sunsoari:result` : diagnostic terminé (réponses + recommandation)
- `sunsoari:add_to_cart` : clic sur « Ajouter au panier »

Tous les liens produits portent `utm_source=mon-rituel` : tu vois les ventes générées dans Shopify Analytics.

## Mettre à jour

- **Prix, photos, nouveaux produits** : objet `P` en haut du fichier.
- **Durées de recharge** : objet `REFILLS` (reprises des fiches produits, à vérifier avec la documentation des fabricants).
- **Questions** : tableau `QUESTIONS`. **Règles de recommandation** : fonction `recommend`.

## Données personnelles

Les réponses et le planner restent dans le navigateur de la cliente (`localStorage`). Rien n'est envoyé à un serveur. Le jour où tu ajoutes un envoi d'e-mail ou un compte cliente, il faudra mettre à jour la politique de confidentialité et recueillir le consentement.

## Feuille de route

| Étape | Contenu | Quand |
|---|---|---|
| **V1 (ce fichier)** | Diagnostic, recommandations, liens panier, planner recharges + semaine | Maintenant |
| V2 | Rappel de recharge par e-mail (flux Klaviyo déclenché par la date d'installation), code de bienvenue après le diagnostic, avis clientes par profil | Après les 50 premiers diagnostics |
| V3 | Compte cliente (historique, rituels sauvegardés), nouvelles catégories (K-beauty, marques africaines) dans le même diagnostic | Quand la gamme s'élargit |
| Plus tard | Analyse de peau par photo via un prestataire spécialisé | À valider avec un juriste (RGPD, données sensibles) |
