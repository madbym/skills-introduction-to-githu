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
- **Moyens de paiement** : **Apple Pay**, **carte bancaire** (CB, Visa, Mastercard), **PayPal** et **Klarna**, via Stripe Checkout (un seul compte Stripe, chaque moyen s'active dans le tableau de bord Stripe > Paramètres > Moyens de paiement). Google Pay activé en plus pour Android. Apple Pay nécessite de vérifier le domaine de l'application dans Stripe.
- **Abonnement mensuel 4,90 €** : Apple Pay, carte, PayPal (prélèvement automatique chaque mois). **Klarna** : proposé surtout pour l'**abonnement annuel à 39 €** et pour les achats de produits ; vérifier dans Stripe que Klarna est disponible pour les paiements récurrents en France avant de l'afficher sur le mensuel.
- Portail client Stripe pour changer de moyen de paiement, voir ses factures et résilier. Webhooks Stripe pour activer / désactiver Sunsoari+.
- Les achats de produits restent sur Shopify (sunsoari.fr), qui gère déjà Apple Pay, carte, PayPal et Klarna via Shopify Payments.
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
12. **Engagement** : « Je m'engage à prendre soin de moi » + curseur « Glisse pour valider » + confettis.
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

## 5 quater. Espace soin personnalisé (format « Rituel de [prénom] »)
Après le diagnostic, chaque cliente a son espace, sur le modèle validé par Fanta. Onglets :
- **Ma routine** : Matin, Journée (SPF), Soir, Corps. Étapes à cocher, remises à zéro chaque jour. Le soir change selon le jour.
- **Mon planner** : chaque jour, « routine faite ? » oui ou non, sans culpabiliser. Vue mois avec ‹ ›.
- **Mon évolution** : une étape toutes les 2 semaines. Elle contient la date, 3 photos (face, profil gauche, profil droit), « Comment va ta peau ? », ce que tu remarques et ton ressenti. Même lumière, sans filtre ni maquillage.
- **Ma semaine** :
  - plan d'introduction, un produit par semaine, avec un test de 48 h sur la mâchoire. Ordre : SPF et nettoyant, puis démaquillant, lotion ou essence, hydratant et contour des yeux, sérum doux, actif fort 1 soir puis 2 soirs, masques ;
  - calendrier du soir : un seul actif par soir, jamais le même soir qu'un exfoliant ;
  - au mois 3, un actif peut passer à 3 ou 4 soirs si tout va bien.
- **Protection solaire** :
  - une journée type : 7 h 30, midi, après le sport, soir ;
  - les règles : choix (SPF 50 ou 50+, logo UVA), quantité (deux longueurs de doigt), zones oubliées, tous les jours, retouche toutes les 2 h dehors, corps, que faire si ça picote, ombre et chapeau ;
  - ses produits solaires.
- **Recommandations** :
  - 5 produits par catégorie, en priorité coréens et japonais, avec des marques africaines quand elles conviennent ;
  - le produit de sa routine est encadré ;
  - prix indicatifs et budget total ;
  - un rappel : « vérifie la liste d'ingrédients, achète chez un revendeur officiel ».
- **Mes produits** : ce que devient chaque produit qu'elle possède déjà, avec un statut parmi « garder », « finir puis remplacer », « mettre en pause » ou « ne pas combiner avec… ».
- **Diagnostic** : photos du jour 0, puis type de peau, sensibilité, imperfections, marques, texture, tonicité et corps. Ensuite :
  - un « À retenir » ;
  - des pistes à vérifier avec un ou une dermatologue ;
  - des délais réalistes : semaines 2 à 4, 6 à 10, mois 3 à 4, 4 à 6 ;
  - quand arrêter un produit.
- **Astuces** : les gestes qui comptent (ne pas percer, taie d'oreiller, ligne des cheveux, après le sport, vacances, filtre de douche). Le filtre est présenté comme un geste de confort : il ne traite ni l'acné ni les marques.

Déjà dans le prototype (`sunsoari-app.js`, onglet Aujourd'hui) : le plan d'introduction (`introPlan`), le calendrier du soir (`eveningCalendar`), les étapes « à partir de la semaine N » et les délais réalistes.

**Données sensibles, à respecter strictement :**
- les photos du visage et les mentions comme « acné hormonale » sont des données personnelles, voire des données de santé (RGPD, article 9) ;
- consentement explicite et séparé avant tout envoi de photo ;
- stockage chiffré dans l'UE, accès réservé à la cliente et à Sunsoari, suppression en un clic ;
- jamais de photo de cliente dans un dépôt de code, un lien public ou une publicité sans accord écrit ;
- à faire valider par un ou une juriste avant le lancement ;
- toujours rappeler : « Conseil cosmétique personnalisé, il ne remplace pas l'avis d'un dermatologue ».

## 5 quinquies. Photos
- Utiliser les photos d'ambiance Sunsoari du dossier `sunsoari-rituel/img/` : lumière naturelle, mains, eau, fleurs, matières.
- Où les placer :
  - bandeau de l'accueil Aujourd'hui ;
  - haut de la routine révélée ;
  - collection SHIFT ;
  - écran Sunsoari+ ;
  - couvertures de stories ;
  - vignette de chaque produit Sunsoari (correspondance dans `PROD_PHOTO`).
- Produits d'autres marques : jamais de photo officielle sans autorisation. Afficher une vignette douce avec les initiales de la marque.
- Pas de photo de cliente, de visage retouché ni d'avant/après.
- Les contenus à venir (vidéos d'installation, coulisses, UGC) sont listés dans `sunsoari-rituel/MEDIATHEQUE-A-EXPLOITER.md`.

## 5 sexies. Scanner, bibliothèque et repères de réputation
- **Scanner de code-barres et de QR code** (onglet Scan, gros bouton en tête) :
  - lecture en direct avec la caméra arrière : BarcodeDetector sur Android, sinon la bibliothèque ZXing (`@zxing/library` 0.21.3) chargée au premier scan, ce qui couvre l'iPhone ;
  - si la caméra est refusée, « Prendre une photo du code » ;
  - formats lus : EAN-13, EAN-8, UPC, Code 128, QR, Data Matrix ;
  - un code-barres cherche le produit dans Open Beauty Facts, puis calcule le score ;
  - un QR code `sunsoari.fr/products/…` ouvre la fiche Sunsoari ; un autre lien s'affiche avec son domaine, sans ouverture automatique ;
  - la page doit être servie en HTTPS pour accéder à la caméra.
- **Bibliothèque** : environ 145 produits d'autres marques (visage, corps, cheveux, cuir chevelu) en plus de la gamme Sunsoari, avec des classiques coréens, japonais et de pharmacie européenne, des marques pour peaux noires et métissées et des soins pour cheveux bouclés à crépus.
- **Repères de réputation** (`REV_BY_ID`), affichés en badges : Best-seller en Corée, Classique au Japon, Référence en pharmacie, Marque pensée pour les peaux noires et métissées, Sans trace blanche sur peau foncée, Pensé pour les cheveux bouclés à crépus.
  - Ce sont des repères publics, pas des avis vérifiés. Ne jamais inventer d'avis, de notes ni de nombres d'avis.
- **À construire** : avis vérifiés de clientes Sunsoari (acheteuses identifiées), filtrables par type de peau, carnation et texture de cheveux, avec modération et sans contrepartie cachée.
- **Question « carnation »** (facultative) : elle favorise les solaires sans trace blanche et explique la prévention des marques sur peau mate à foncée.

## 5 septies. Test du type de peau (remplace la question unique)
- **Le principe** : on ne déduit plus le type de peau d'une seule impression. Le test pose six questions d'observation :
  - la peau une heure après le lavage ;
  - la brillance en fin de journée ;
  - les pores ;
  - les zones rêches ;
  - la peau qui brille et tiraille en même temps ;
  - les réactions aux nouveaux produits.
- **Questions reprises du Bilan Peau Visage** : les saisons, les antécédents suivis par un médecin (eczéma, rosacée, psoriasis, acné) et le quotidien (soleil, sport, ville, écrans, sommeil ou stress).
- **Le calcul** (`skinProfile`) : un score de sébum et un score de sécheresse donnent le type (grasse, mixte, sèche ou normale). Deux mentions s'y ajoutent : « déshydratée », un état passager, et « sensible ».
- **L'écran de résultat** :
  - ce que veut dire le type de peau et comment en prendre soin ;
  - l'idée reçue « une peau grasse n'a pas besoin de crème » ;
  - des astuces selon les saisons et le quotidien ;
  - les sources (Académie américaine de dermatologie, DermNet) ;
  - un bouton pour poser une question à l'assistante.
- **L'assistante sert aussi de coach peau** : elle reçoit le résultat du test et, si la cliente ne connaît pas son type de peau, l'aide à le découvrir par une ou deux questions.
- **À prévoir sur le serveur** :
  - un agent « coach peau » qui s'appuie sur une base de sources validées (fiches de l'Académie américaine de dermatologie, de DermNet et de la Société française de dermatologie), avec citation des liens ;
  - sans jamais poser de diagnostic médical.

## 5 octies. Questions de suivi, ménopause et créatrices africaines et asiatiques
- **« D'après toi, cette réaction a pu venir… »** : la question s'affiche si la cliente a déjà réagi à un produit. Choix possibles :
  - un produit trop fort ou utilisé trop souvent ;
  - un peeling ou un soin en institut ;
  - un traitement médical ;
  - le soleil ;
  - un mélange d'actifs ;
  - je ne sais pas.

  Chaque cause donne un conseil adapté. Par exemple, une réaction après un peeling ne rend pas tous les acides interdits, et un traitement peut sensibiliser la peau au soleil.
- **Hormones** : la question propose « Enceinte ou allaitante », « En ménopause ou périménopause », « Rien de tout ça » ou « Je préfère ne pas répondre ». La ménopause oriente vers l'hydratation et le confort, et donne un conseil dédié.
- **Conseils personnalisés** : `insights` s'affiche dans Aujourd'hui (eau, carnation, taches, réactions, ménopause…).
- **Marques de cheveux texturés fondées par des créatrices d'origine africaine, afro-caribéenne ou afro-asiatique** (champ `founder`, affiché en badge) :
  - Musoya, Kalia Nature, Tropikalbliss, Carolina B, Adeba Nature, Nilotiqa, Afrocenchix, Adwoa Beauty ;
  - SheaMoisture (fondateur né au Liberia).
- **Priorité aux créateurs et créatrices d'Afrique et d'Asie** : à compatibilité égale, les marques concernées passent devant (`afroAsia` dans `pickFor`).
- **À vérifier avant la mise en ligne** : la disponibilité en France et le nom exact du produit pour chaque marque.

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
