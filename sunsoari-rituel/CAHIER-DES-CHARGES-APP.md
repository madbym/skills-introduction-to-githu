# Sunsoari · Mon Rituel — cahier des charges de l'application complète

À coller dans Emergent (ou Lovable, Floot, Bolt). Joindre `sunsoari-app.js` : il contient le catalogue, les questions, les règles de recommandation, le score de compatibilité, les 34 ingrédients, les tendances et les guides déjà validés. **Reprendre ces données et cette logique telles quelles.**

---

Crée une application web mobile (installable sur l'écran d'accueil, PWA), en français avec tutoiement, appelée **« Mon Rituel · Sunsoari »** : un coach beauté pour le visage, le corps, les cheveux et la douche, relié à la boutique Shopify **sunsoari.fr**. Inspiration : l'application Lóvi (parcours, écrans, interactions), avec l'identité Sunsoari et des règles de prudence strictes.

## 1. Comptes et données
- Inscription par e-mail (lien magique) + Google + Apple. Le diagnostic se fait AVANT l'inscription ; on propose de créer un compte pour sauvegarder la routine.
- Base de données : profils, réponses du diagnostic, routines, étagère, souhaits, scans, journal de peau, coches du plan du jour, recharges, abonnement.
- Photos du visage et du cuir chevelu : analysées puis **supprimées par défaut**. Conservation uniquement si l'utilisatrice active « Suivre mes progrès » (consentement explicite, révocable, suppression en un clic).
- Page « Mes données » : export et suppression du compte.

## 2. Abonnement (Stripe)
- **Gratuit à vie** : diagnostic complet, routine Matin · Soir · Hebdo · Douche, planner (plan du jour, recharges, rappels), journal de peau, 5 scans par mois, guides de base, bibliothèque d'ingrédients.
- **Sunsoari+ à 4,90 € / mois** ou **39 € / an** (7 jours d'essai gratuit) : scans illimités, analyse photo du visage et du cuir chevelu par l'IA, suivi de l'évolution dans le temps, assistante IA illimitée, re-diagnostic à chaque saison, alertes météo peau (UV, humidité, pollution), guides premium, **-10 % sur sunsoari.fr** (code Shopify personnel).
- Paiement Stripe Checkout + portail client Stripe. Webhooks pour activer / désactiver l'accès.
- **Obligatoire en France** : bouton « Résilier mon abonnement » visible dans le compte (résiliation en 3 clics), rappel par e-mail avant la fin de l'essai, CGV d'abonnement, prix TTC affichés, information sur le droit de rétractation de 14 jours.
- Paywall doux : jamais bloquant pendant le diagnostic ; affiché quand on touche une fonction Sunsoari+.

## 3. Parcours d'accueil (onboarding), comme Lóvi
Une question par écran, mascotte Sunsoari (petit soleil souriant) qui « parle » dans une bulle, barre de progression, retour, passage automatique, écrans de transition animés.
1. Bienvenue : « Ta maison de soin » + bouton Commencer.
2. Pour qui ? (je préfère ne pas le dire possible) · tranche d'âge.
3. Type de peau · priorités (3 max, avec icônes) · zones à améliorer (front, entre les sourcils, yeux, nez, bouche, menton, cou, sur une illustration dessinée, pas une photo).
4. Conditions particulières (grossesse/allaitement, déséquilibre hormonal, ménopause, maladie auto-immune, aucune) → adapte les exclusions d'actifs.
5. Produits déjà utilisés (nettoyant, démaquillant, tonique, hydratant, sérum, contour des yeux, SPF, exfoliant, aucun).
6. Fréquence de l'écran solaire.
7. **Ma ville** → afficher en direct indice UV, humidité, pollution (API Open-Meteo, gratuite) pour adapter les conseils.
8. Corps · cheveux (texture, longueurs, cuir chevelu, lavage) · douche (lieu, flexible, eau calcaire, envies, senteur).
9. Préférences : K-beauty, J-beauty, marques africaines, budget.
10. Photo facultative du visage et du cuir chevelu (analyse IA, observations à valider).
11. Écran « Ton profil est complet à X % » (pourcentage réel des questions répondues).
12. **Engagement** : « Engageons-nous à prendre soin de toi » + curseur « Glisse pour valider » + confettis.
13. Révélation : « Ta nouvelle routine est prête ! »

## 4. Écrans principaux (barre du bas)
**Aujourd'hui** : objectif, semaine avec série de jours réussis, premiers pas, plan du jour (Matin / Soir à cocher), journal de peau (5 humeurs), météo peau du jour, mes recharges, mot du jour, questions à l'assistante.
**Produits** : recherche, Ma routine, Étagère, Souhaits, Scans, collections (Trésors d'Afrique, Apaiser à la coréenne, Rituel douche), fiche produit avec score, ingrédients, mode d'emploi, avis, alternatives, acheter.
**Scan** (bouton central) : photo du produit (IA lit le nom et la liste INCI), code-barres (Open Beauty Facts), recherche, copier-coller INCI → score de compatibilité 0-100 avec 3 sous-notes (Tolérance, Objectifs, Type), ingrédients repérés, alertes (parfum, allergènes, alcool), alternatives mieux adaptées, ajouter à l'étagère.
**Ressources** : guides (rituel 7 jours, protection solaire, rituel douche, cheveux bouclés à crépus), vidéos de gestes, bibliothèque d'ingrédients, tendances France / Asie / Afrique avec sources.
**Assistante** : chat IA qui connaît le profil, la routine et le catalogue ; questions suggérées ; réponses courtes et prudentes.

## 4 bis. Contenus façon Lóvi (stories, tutoriels, scan visage)
- **Stories plein écran** (barre de progression segmentée en haut, toucher à droite pour avancer, à gauche pour revenir, croix pour fermer), rangées en rubriques dans Ressources : « Sunsoari, c'est quoi ? » (histoire du nom), « Mythe ou vérité » (étiquettes Mythe / Vérité / Astuce), « Académie », « Tendances ». Reprendre `STORIES` du fichier joint.
- **Tutoriels** par étape (protection solaire, double nettoyage, sérum, installer son pommeau) : d'abord en cartes sous-titrées (`TUTOS`), puis en vidéos verticales filmées par Fanta (mains, voix off, sous-titres, lecteur avec avance et retour de 5 secondes). Bouton « Tutoriel » sur chaque fiche produit.
- **Scan du visage** : filtres (Tout, Brillance, Sécheresse, Rougeurs, Boutons, Taches, Grain irrégulier), points de couleur sur les zones du visage, liste « Analyse de ta peau » par zone, bouton « Enregistrer ». **Mon suivi** : historique daté (miniature seulement si l'utilisatrice l'accepte), objectif, nombre de signes notés et statut par rapport au scan précédent (« Moins de signes notés », « Pas de changement noté », « Plus de signes notés »), avec la mention que la lumière et l'angle changent le résultat. Sunsoari+ : comparaison avant / après côte à côte.

## 5. Routine révélée
Onglets **Matin · Soir · Hebdo · Douche**. Chaque produit : étape, marque, prix, origine, badge « Fabriqué au… », **% de compatibilité**, « Pourquoi on l'a choisi » (ingrédients cliquables), 3 questions à poser à l'assistante, bouton Acheter (Sunsoari : ajout au panier Shopify ; autres marques : où l'acheter), carrousel « Autres options pour toi » avec leur %. Onglet Douche : SHIFT mis en avant, sauf profils sensibles / sans parfum / grossesse → Onsha sans senteur, avec explication. Comparatif SHIFT / Onsha.

## 5 · Formats de routine et recommandations
- Question du diagnostic « Quelle routine te ressemble ? » + bascule visible sur l'écran de routine : **Essentielle** (matin : nettoyant, hydratant, SPF · soir : démaquillage si besoin, nettoyant, sérum ciblé si objectif, hydratant), **Équilibrée** (matin : nettoyant, tonique, sérum, hydratant, SPF · soir : démaquillage, nettoyant, tonique, sérum, hydratant), **Complète façon K-beauty** (matin : nettoyant, tonique, essence, sérum, hydratant, SPF · soir : démaquillage, nettoyant, tonique, essence, sérum, contour des yeux, hydratant, masque de nuit · hebdo : exfoliant, masque visage, soins cheveux, corps, huile). Sérum du matin orienté vitamine C / niacinamide / antioxydants, sérum du soir orienté réparation.
- Une recommandation pour chaque étape (moteur `pickFor` : on écarte le déconseillé, puis on classe par compatibilité, réponses, origine préférée, ingrédients recherchés).
- Recommandations « Pour toi » sur l'accueil et dans Produits (fonction `forYou`) : par objectif (taches, imperfections…), Ton rituel douche SHIFT, cheveux, corps, Fabriqué en Afrique.

## 5 bis. SHIFT, gamme prioritaire (produits les plus rentables)
- Toujours afficher la **collection SHIFT complète** dans l'onglet Douche, la boutique et les collections : Coffret Douche & Aromathérapie (109,90 €, 4 coloris : blanc, noir, rose, vert), Coffret Soin Douche Coréenne (59,90 €), Pack 6 capsules soin & aromathérapie (32,90 €), Pack 3 filtres Pure Water (25,90 €).
- **Senteurs SHIFT** : Tea Tree & Lavender, Basil & Grass, Ginger & Bergamote (dans le coffret) ; Hinoki Spring, Cherry Blossom, Patchouli & Rose, Fruité, Découverte (6 senteurs) en packs de 6. Question « senteur » du diagnostic avec ces choix ; choix de senteur et de coloris directement sur les cartes, avec lien panier vers la bonne variante Shopify.
- SHIFT = recommandation principale dès que le budget dépasse 30 € ou qu'une senteur SHIFT est choisie, sauf peau sensible, réaction aux huiles essentielles, sans parfum ou grossesse (les capsules contiennent des huiles essentielles, dont le tea tree) : alors Onsha sans senteur, avec l'explication, et la gamme SHIFT reste visible.
- Recharges SHIFT dans le planner (Pure Water ; capsules selon la fréquence de douche).

## 5 ter. Mobile et web
Une seule application, responsive : site web (ordinateur et mobile) + application installable sur l'écran d'accueil (PWA : manifeste, icônes, mode plein écran). Plus tard, si besoin, versions App Store et Google Play (attention : Apple prélève une commission sur les abonnements vendus dans l'application).

## 6. Ludique et interactif
Séries de jours (streak) et badges (1re semaine, 10 scans, routine complète 30 jours), confettis aux étapes clés, mascotte animée, cartes « Le savais-tu ? », quiz ingrédients de la semaine, avant/après dans le temps (Sunsoari+, avec consentement), rappels push (routine, recharge, météo UV).

## 7. IA
Claude (API Anthropic) côté serveur uniquement, clé jamais dans l'application. Trois usages : lecture d'étiquette produit, observations cosmétiques sur photo (sans diagnostic, sans deviner âge, origine ou identité), assistante. Limites d'usage par compte (gratuit / Sunsoari+).

## 8. Design
Couleurs : crème #fbf8f3, sable #efe6d8, encre #2b2622, bleu eau #2f6f7e (actions), soleil #c9853f, sauge #7d8f76. Titres Instrument Serif, texte Figtree. Grandes pilules arrondies, icônes au trait, animations douces. Univers eau, lumière, rituel, multiculturel sans clichés.

## 9. Règles de contenu (non négociables)
- Aucune allégation médicale, aucune promesse de résultat ni de date (« vous verrez la différence le … » interdit).
- Pas de faux chiffres ni de fausse preuve sociale (« 10 342 inscrites aujourd'hui » interdit sauf chiffre réel), pas de comparaison « avec nous / en moyenne » inventée, pas de « vérifié par un médecin » sans médecin.
- Ne jamais dire qu'un filtre adoucit l'eau ou retire le calcaire.
- Score présenté comme « compatibilité avec ton profil », jamais comme une évaluation médicale.
- Marques non vendues par Sunsoari signalées ; liens affiliés signalés.
