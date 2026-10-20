# Prompt à coller dans Emergent ou Bolt

Copie tout ce qui est entre les deux lignes `---` dans le premier message de l'outil.
Ajoute ensuite le fichier `sunsoari-rituel.js` (pièce jointe ou import GitHub si l'outil le propose) : il contient le catalogue, les questions et la logique déjà validés.

---

Crée une application web mobile en priorité, en français, appelée **« Mon Rituel Sunsoari »**, pour la boutique en ligne Shopify **sunsoari.fr** (filtres de douche, recharges, accessoires, coffrets des marques Onsha, SHIFT et Sullab).

## Objectif
Aider chaque cliente à trouver son rituel de douche, de peau et de cheveux, lui recommander des produits de la boutique avec un lien direct pour les acheter, et l'aider à suivre ses recharges grâce à un planner. Simple, rapide (diagnostic en 1 minute), rassurant.

## Base existante à reprendre
Je joins `sunsoari-rituel.js`, un widget déjà fonctionnel. Reprends **exactement** :
- le catalogue `P` (titres, handles, prix, images, identifiants de variantes Shopify par senteur) ;
- les questions `QUESTIONS` ;
- la fonction `recommend` (règles de recommandation) et `insights` (conseils) ;
- les durées de recharge `REFILLS` ;
- la sélection d'autres marques `EXT` et la fonction `externals` (K-beauty, J-beauty, marques pour cheveux texturés et peaux noires et métissées).
Ne modifie pas les textes de conseil sans me le demander : ils ont été relus pour respecter la réglementation.

## Écrans
1. **Accueil** : « Trouve ton rituel de douche » + bouton « Commencer mon diagnostic » + 3 étapes illustrées (diagnostic, rituel, planner).
2. **Diagnostic** : une question par écran, barre de progression, retour possible. 9 questions : lieu (maison / voyage / les deux), flexible de douche, dureté de l'eau (lien vers https://www.eaupotable.sante.gouv.fr/), ressenti de la peau, texture des cheveux, état des cheveux, attentes (choix multiple), senteur (Hinoki, Océan, Forêt de Pin, Fleur de Prunier, Sans senteur ; question masquée si « rien de parfumé »), budget.
3. **Mon rituel** : cartes de conseils (eau, peau, cheveux, douche), produit principal « Ton point de départ », « D'autres options qui pourraient te convenir », « Tes recharges à prévoir ». Chaque produit : photo, nom, prix, senteur, bouton **« Ajouter au panier »** et bouton **« Voir le produit »**.
4. **Mon planner** :
   - recharges : date d'installation + fréquence en jours (modifiable), barre de progression, date de la prochaine recharge, boutons « Ajouter à Google Agenda », « Télécharger le rappel (.ics) », « Racheter » ;
   - semaine de soin : tableau lundi à dimanche des gestes suggérés selon le profil, à cocher, bouton « Nouvelle semaine ».
   Après les produits Sunsoari, section **« Pour compléter, d'autres marques qu'on aime »** : carte avec marque, origine (Corée, Japon, France…), catégorie, description factuelle et bouton « Où l'acheter ». Mention « Non vendues sur Sunsoari ». Si un lien est affilié, afficher « Lien affilié : Sunsoari peut toucher une commission ». Pas de photos de ces marques sans autorisation : vignette avec initiales.
5. **Mes favoris** : produits enregistrés d'un clic (cœur sur chaque carte).

## Liens vers la boutique
- Fiche produit : `https://sunsoari.fr/products/{handle}?utm_source=mon-rituel&utm_medium=app`
- Ajout au panier : lien panier permanent Shopify `https://sunsoari.fr/cart/{variantId}:1?utm_source=mon-rituel&utm_medium=app`
- Contact : `https://sunsoari.fr/pages/contact`

## Données
- V1 : tout est enregistré **dans le navigateur** (localStorage). Aucun compte, aucune donnée envoyée. Affiche en bas : « Tes réponses restent dans ton navigateur. »
- Pas de scan du visage, pas d'envoi de photo.

## Intégration
L'application doit pouvoir s'afficher :
1. comme site autonome (ex. rituel.sunsoari.fr) ;
2. dans une **iframe** sur sunsoari.fr (Shopify) et sur tout autre site : pas de blocage `X-Frame-Options`, hauteur adaptative ;
3. fournis aussi le code d'intégration à copier (`<iframe …>`) sur un écran « Intégrer ».

## Design
Premium, doux, sensoriel, moderne, multiculturel, accessible. Univers : l'eau, la lumière, le soleil, les rituels, les matières naturelles (céramique, lin, bois, pierre). Couleurs : fond crème #fbf8f3, sable #efe6d8, texte #2b2622, bleu eau #2f6f7e (couleur principale des boutons), soleil #c9853f (petits labels), sauge #7d8f76. Typos : Instrument Serif pour les titres, Figtree pour le texte. Coins arrondis doux, beaucoup d'air, gros boutons faciles à toucher (44 px minimum), contrastes lisibles. Pas de clichés ni de folklore, pas d'emoji dans l'interface.

## Règles de texte (obligatoires)
- Tutoiement, ton chaleureux et simple.
- Aucune allégation médicale ni promesse de résultat (pas de « soigne », « anti-chute », « peau parfaite », pas de chiffres de filtration inventés).
- Ne jamais dire qu'un filtre adoucit l'eau ou supprime le calcaire.
- Ne pas dénigrer l'eau du robinet.
- Toujours afficher : « Ce diagnostic repose sur ton ressenti. Il ne remplace pas l'avis d'un ou d'une professionnelle de santé. » et « Un filtre de douche n'est ni un soin ni un dispositif médical. »

## Suivi
Déclenche un événement à la fin du diagnostic et à chaque clic « Ajouter au panier » (prévoir l'emplacement pour Google Analytics / Meta Pixel, sans les activer).

## Hors périmètre V1
Comptes clientes, e-mails, paiement dans l'app, scan du visage.

---

## Après la première version
Teste sur ton téléphone : faire le diagnostic 3 fois avec des profils différents, cliquer sur chaque lien produit, vérifier que le panier s'ouvre avec le bon produit et la bonne senteur.
