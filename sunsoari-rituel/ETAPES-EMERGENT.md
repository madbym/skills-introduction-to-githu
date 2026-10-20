# Construire « Mon Rituel Sunsoari » dans Emergent, étape par étape

Emergent travaille mieux avec un message par étape. Après chaque étape : teste sur ton téléphone, puis passe à la suivante.
Budget : surveille tes crédits Emergent en haut de l'écran. Les étapes 1 à 3 suffisent pour une première version.

## Avant de commencer
1. Va sur app.emergent.sh et crée un nouveau projet (application web).
2. Garde ouverts : `PROMPT-EMERGENT-BOLT.md` (le cahier des charges complet) et `sunsoari-rituel.js` (le catalogue et la logique).

## Message 1 · La base
> Copie tout le contenu de `PROMPT-EMERGENT-BOLT.md` (entre les deux lignes ---), puis joins le fichier `sunsoari-rituel.js`. Ajoute à la fin :
> « Commence uniquement par l'accueil et le diagnostic (les 13 écrans avec la barre de progression et les écrans intermédiaires). Pas encore de résultats ni de planner. Mobile d'abord. »

**À vérifier :** une question par écran, passage automatique, flèche retour, barre en 4 segments, textes en français avec tutoiement.

## Message 2 · Les résultats
> « Ajoute l'écran Mon rituel : conseils, produit principal, autres options, autres marques (avec badge "Fabriqué au…" et mention "Non vendues sur Sunsoari"), recharges. Reprends exactement les fonctions recommend, insights et externals et les données P et EXT du fichier joint. Boutons Ajouter au panier = lien https://sunsoari.fr/cart/{variantId}:1 et Voir = https://sunsoari.fr/products/{handle}. »

**À vérifier :** clique sur 3 boutons « Ajouter au panier » : le panier sunsoari.fr doit s'ouvrir avec le bon produit et la bonne senteur.

## Message 3 · Le planner
> « Ajoute l'écran Mon planner : recharges (date d'installation, fréquence modifiable, barre de progression, prochaine date, Google Agenda, fichier .ics, Racheter) et semaine de soin à cocher (fonction weeklyRitual). Tout est enregistré dans le navigateur (localStorage), aucun compte. »

## Message 4 · Intégration au site
> « Rends l'application intégrable en iframe sur Shopify et sur d'autres sites (pas de blocage X-Frame-Options, hauteur adaptative) et ajoute un écran Intégrer avec le code iframe à copier. »

Puis publie l'application dans Emergent et colle l'iframe sur une page Shopify « Mon rituel » (Boutique en ligne > Pages > bloc HTML personnalisé).

## Message 5 · Finitions (facultatif)
> « Ajoute les favoris (cœur sur chaque produit) et les événements de suivi au diagnostic terminé et à chaque clic panier, sans activer d'outil d'analyse. »

## Si Emergent s'éloigne de la demande
- « Reviens à la version précédente » puis reformule l'étape plus courte.
- Rappelle les règles : « Aucune allégation médicale, ne jamais dire qu'un filtre adoucit l'eau, pas de graphique de résultats inventé. »

## Avant la mise en ligne
- Relis tous les textes visibles par tes clientes.
- Fais le diagnostic avec 3 profils différents.
- Vérifie que la politique de confidentialité de sunsoari.fr mentionne l'outil (même si rien n'est envoyé).
