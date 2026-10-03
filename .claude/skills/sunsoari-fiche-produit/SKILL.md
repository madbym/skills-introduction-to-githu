---
name: sunsoari-fiche-produit
description: Rédaction et optimisation des fiches produits et collections Shopify de Sunsoari (filtres de douche, recharges, coffrets, accessoires) — titre, description, bénéfices prudents, caractéristiques, FAQ, référencement Google (SEO), texte alternatif des images. À utiliser pour créer ou améliorer un produit Shopify ou une collection.
---

# Sunsoari — fiches produits Shopify

Charger d'abord `sunsoari-marque`. Toute allégation doit venir de la **documentation du fabricant** (Onsha, Sullab, Shift) ou d'un fait vérifiable. Si une information manque, la demander à Fanta au lieu de l'inventer.

## Avant d'écrire

Collecter (via le connecteur Shopify ou auprès de Fanta) :
- nom exact, marque, prix, variantes, contenu du coffret ;
- type de filtration et matériaux selon le fabricant ;
- durée de vie de la recharge et compatibilité ;
- dimensions, raccord, installation ;
- ce que le fabricant affirme **avec ses preuves** (rapport de test, certification).

## Structure de la fiche

1. **Titre** (≤ 70 caractères) : Marque + type de produit + élément distinctif. Ex. « Onsha – Filtre de douche thermal à la vitamine C, sans senteur ».
2. **Phrase d'ouverture** (1–2 lignes) : le moment de soin, en ressenti.
3. **Pourquoi on l'a choisi** : le regard Sunsoari, 2–3 lignes sincères.
4. **Ce qu'il fait** (puces) : uniquement des informations fabricant, formulées prudemment (« conçu pour… », « selon le fabricant… »).
5. **Ce qu'il ne fait pas** (optionnel, inspire confiance) : ex. « il ne remplace pas un adoucisseur ».
6. **Dans la boîte**.
7. **Installation** : étapes courtes, idéalement avec une vidéo.
8. **Recharge** : quand la changer, lien vers la recharge compatible.
9. **Caractéristiques** : tableau (matériaux, dimensions, raccord, durée).
10. **FAQ** (4–6 questions) : « Compatible avec ma douche ? », « Combien de temps dure la recharge ? », « Ça enlève le calcaire ? » (réponse honnête).

## Référencement Google (SEO)

- **Titre SEO** ≤ 60 caractères, **méta-description** ≤ 155 caractères, avec le mot-clé principal (« filtre de douche », « pommeau filtrant », « recharge filtre douche »).
- Adresse (handle) courte, en minuscules, avec des tirets.
- **Texte alternatif** de chaque image : description factuelle (« Pommeau de douche filtrant blanc installé sur un flexible chromé »).
- Liens internes : produit → recharge compatible → collection.
- Pas de bourrage de mots-clés : le texte doit rester naturel.

## Collections suggérées

Douche à la maison · Nomade et voyage · Recharges · Coffrets cadeaux · Par marque (Onsha, Sullab, Shift).

## Le thème du dépôt

Le dossier `sunsoari-theme/` contient le générateur du thème Shopify « Sunsoari - fullstack » (voir son `README.md`) : chaque produit a un modèle de page attribué. Modifier les générateurs dans `build/`, puis regénérer ; ne jamais modifier `remote/` (copie de référence).

## Avant de publier

- [ ] Aucune allégation santé, aucun chiffre sans source.
- [ ] Prix, variantes et stock vérifiés.
- [ ] Images avec texte alternatif.
- [ ] Recharge compatible liée.
- [ ] Modifications dans Shopify : les proposer et **attendre l'accord de Fanta** avant de les enregistrer.
