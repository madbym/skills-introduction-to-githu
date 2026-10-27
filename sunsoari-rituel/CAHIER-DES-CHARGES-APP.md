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
- **Gratuit à vie** : diagnostic complet, routine (Matin, SPF, Soir, Corps, Cheveux), recommandations, onglets Cheveux, Mes produits, Diagnostic, Protection solaire et Astuces, scanner, lexique, guides, bibliothèque d'ingrédients, tutos d'installation des produits, la première story de l'Académie.
- **Sunsoari+ à 2,99 € / mois** ou **24,90 € / an** (soit 2,08 € par mois, −31 %), 7 jours d'essai gratuit. Il débloque le **suivi** : Mon planner et les rappels (routine, recharges), Mon évolution (photos et ressenti), Ma semaine (plan d'introduction), les vidéos et stories de l'Académie, l'analyse photo et vidéo par l'IA, l'assistante sans limite et un nouveau diagnostic à chaque saison. Les onglets réservés affichent un cadenas 🔒 et une carte « Essayer gratuitement ». Pas de remise produit incluse pour l'instant, pour protéger la marge (à tester plus tard, par exemple 3 mois offerts avec un coffret).
- **Reconnaître une abonnée sur sunsoari.fr** : le webhook Stripe ajoute l'étiquette client Shopify `sunsoari-plus`, et la section affiche alors l'attribut `data-plus` sur la balise de l'application.
- **Moyens de paiement** : **Apple Pay**, **carte bancaire** (CB, Visa, Mastercard), **PayPal** et **Klarna**, via Stripe Checkout (un seul compte Stripe, chaque moyen s'active dans le tableau de bord Stripe > Paramètres > Moyens de paiement). Google Pay activé en plus pour Android. Apple Pay nécessite de vérifier le domaine de l'application dans Stripe.
- **Abonnement mensuel 2,99 €** : Apple Pay, carte, PayPal (prélèvement automatique chaque mois). **Klarna** : proposé surtout pour l'**abonnement annuel à 24,90 €** et pour les achats de produits ; vérifier dans Stripe que Klarna est disponible pour les paiements récurrents en France avant de l'afficher sur le mensuel.
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

## 5 nonies. Ajouts issus du « Questionnaire peau » et du « Rituel de Sira »
- **Avant le test du type de peau**, deux aides :
  - le « test du visage nu » : nettoyer, ne rien appliquer, attendre une heure, observer à la lumière du jour et, en option, faire le test du mouchoir ;
  - un encadré dépliable « Les 4 types de peau en bref ».
- **Nouvelles questions** :
  - « Quand tu mets une crème hydratante classique… » ;
  - « Le soleil, le froid ou les vacances te donnent des irritations ? » ;
  - « Tu mets une crème solaire sur le visage ? » ;
  - la carnation décrite par la réaction au soleil ;
  - « Je me maquille tous les jours ».
- **Écran de résultat** :
  - « Pourquoi ta peau est comme ça » ;
  - deux colonnes « Ce qui t'aide » et « À éviter » ;
  - une note pour les peaux mates à foncées ;
  - une note « Ta priorité numéro un » si la crème solaire n'est pas quotidienne.
- **Service de rituel personnalisé** : avec `data-whatsapp="numéro"`, le résultat propose « Envoyer sur WhatsApp ». Le message est prérempli et la cliente ajoute elle-même ses 3 photos. Ensuite, Sunsoari crée son espace soin, sur le modèle du Rituel de Sira (section 5 quater).
- **Confidentialité** : une page d'espace soin contient des photos et des données de santé. Elle ne doit jamais être partagée par un lien public. Elle doit être réservée à la cliente, par compte ou par lien privé, et effacée à sa demande.

## 5 decies. Compte client, liste de produits et favoris
- **Connexion** : avec le compte client Shopify (`/account/login`, `/account/register`). La section `shopify-section-mon-rituel-app.liquid` transmet le prénom (`data-customer-name`). L'écran « Mon compte » est accessible par le cœur en haut d'Aujourd'hui. Il contient :
  - la connexion ou la création de compte ;
  - le lien vers les commandes ;
  - la routine.
- **Favoris** :
  - **produits** : le cœur sur chaque carte, puis « Ajouter mes produits Sunsoari au panier » en un geste ;
  - **articles** : stories et guides ;
  - **vidéos** : tutoriels ;
  - **posts** : liens Instagram et TikTok.

  Les contenus externes s'ajoutent sans code par `window.SUNSOARI_CONTENT = [{ id, type: "video"|"post"|"article", title, url, img, src }]`.
- **Widget « liste de favoris »** : `data-widget="favoris"` affiche seulement la liste. Elle peut s'intégrer sur une page « Mes favoris » ou dans le compte client.
- **À construire sur le serveur** : synchronisation du diagnostic, de la routine, du suivi et des favoris entre appareils. Deux possibilités : les métachamps client Shopify, ou une base de données avec connexion par e-mail (lien magique). Tout cela dans le respect du RGPD : consentement, export et suppression des données.
- **Questionnaire complété** :
  - prénom, âge et rythme de vie (facultatifs) ;
  - routine actuelle en texte libre ;
  - points noirs, brillance, marques après les boutons et cernes ;
  - traitement de dermatologue en cours et allergies ;
  - « Un mot de plus ».

  Le résultat s'affiche à la cliente (« Fanta, voici ta peau ») et peut être envoyé par WhatsApp, copié, ou transmis par Instagram ou par le formulaire de contact.

## 5 undecies. Espace soin automatique et prise de vue
- **Automatique** : à la fin du diagnostic, la cliente arrive directement dans « Mon espace soin », sans intervention manuelle. Elle peut le rouvrir depuis Aujourd'hui. Il compte 9 onglets, sur le modèle du Rituel de Sira :
  - **Ma routine** : Matin, Journée et SPF, Soir et Corps. Les étapes se cochent ; celles qui ne sont pas encore introduites affichent « à partir de la semaine N ». Une question « Routine faite aujourd'hui ? » attend un oui ou un non.
  - **Mon planner** : le calendrier du mois, avec 4 repères par jour (matin, SPF, soir, corps), les jours d'affilée et le pourcentage de jours complets.
  - **Mon évolution** : une étape toutes les 2 semaines, avec 3 photos, le ressenti, ce qu'elle remarque et une note ; un avant / maintenant ; le parcours depuis le jour 0.
  - **Ma semaine** : le calendrier du soir (un actif par soir) et le plan d'introduction.
  - **Protection solaire** : une journée type, 8 règles et sa crème solaire.
  - **Recommandations** : la routine détaillée et des sélections par besoin.
  - **Mes produits** : chaque produit qu'elle possède déjà reçoit un statut parmi « Garder », « Finir puis remplacer », « Mettre en pause » ou « À vérifier », à partir de « Ta routine actuelle ».
  - **Diagnostic** : les photos du jour 0, les observations de l'IA, le résultat du test de peau, les délais réalistes et quand arrêter un produit.
  - **Astuces** : les gestes qui comptent et les conseils personnalisés.
- **Prise de vue** (étape « Montre-nous ta peau ») : deux choix possibles.
  - **3 photos** : face, profil gauche et profil droit.
  - **Une vidéo** : environ 10 secondes en selfie (face, gauche, droite, haut, bas). L'application en extrait 5 images et ne conserve pas la vidéo.

  L'IA analyse ensuite toutes les images ensemble : signes visibles par zone, résumé, points observés, et un conseil dermatologique si nécessaire, sans jamais poser de diagnostic médical. Les miniatures ne sont gardées sur le téléphone qu'avec l'accord de la cliente (case à cocher).
- **Sur le serveur, en production** :
  - un agent IA génère et met à jour l'espace soin dans le compte de la cliente, par exemple après chaque étape d'évolution ;
  - les photos sont stockées chiffrées dans l'UE avec un consentement explicite, et supprimables en un clic ;
  - en option, une vérification par l'esthéticienne Sunsoari avant envoi, pour les clientes Sunsoari+.

## 5 duodecies. « Raconte-moi » : description libre, à l'oral ou à l'écrit
- **Premier écran du diagnostic** : la cliente parle ou écrit librement. Par exemple : prénom, âge, femme, homme ou autre, métier et rythme, routine actuelle, ce qui la gêne sur la peau, les cheveux ou le corps, son budget.
- **La dictée** : bouton micro avec la reconnaissance vocale du navigateur (français), et sinon le micro du clavier du téléphone. L'audio n'est pas enregistré : seul le texte est utilisé.
- **Le remplissage** : « Remplir mes réponses » envoie le texte à l'IA avec la liste des codes autorisés de chaque question. L'IA ne remplit que ce qui est dit clairement. Sans IA, un repli lit l'âge, le prénom, le genre, les préoccupations, la texture des cheveux, la routine et le budget.
- **La vérification** : la cliente voit « On a rempli pour toi », puis le questionnaire reprend à la première question sans réponse.
- **Nouvelles questions** : « Tu es… » (femme, homme, autre, ne pas répondre ; la question sur la grossesse est sautée pour un homme) et « Ton budget soin par mois ».
- **Plus tard** : enregistrer un message audio et le transcrire sur le serveur (par exemple avec Whisper), pour les navigateurs sans dictée.

## 5 terdecies. Un parcours d'un seul tenant, puis l'espace et l'e-mail
- **Le diagnostic se suit sans interruption.** Au milieu, le résultat du test de peau est court : le type, une ligne d'explication et l'idée reçue. Il n'y a plus d'envoi WhatsApp en cours de route. Les explications complètes sont dans l'espace soin (onglet Diagnostic). Le service WhatsApp avec l'esthéticienne reste disponible depuis cet onglet.
- **Dictée sur chaque champ texte** : un bouton « 🎤 Dicter » à côté de chaque champ (prénom, rythme, routine actuelle, notes…).
- **Dernière étape, « Ton espace soin est prêt »** : e-mail, consentement « recevoir ma routine et mes rappels » (obligatoire pour l'envoi), consentement « nouveautés et offres » (facultatif et séparé), puis « Créer mon espace et recevoir ma routine ». Une cliente déjà connectée passe directement à son espace. Il est aussi possible de « Voir mon espace sans e-mail ».
- **Le serveur** reçoit un `POST data-email-endpoint` contenant `{ email, prenom, consentement_routine, consentement_offres, resultat, routine: { matin, soir, hebdo, cheveux }, resume }`. Il doit :
  1. créer le compte client Shopify, ou envoyer un lien magique de connexion ;
  2. enregistrer l'espace soin dans le compte ;
  3. envoyer l'e-mail de routine (modèle `email-routine.html`), puis les rappels (recharges, étape d'évolution toutes les 2 semaines, nouveau diagnostic à chaque saison). Cela passe par Klaviyo ou Shopify Email, seulement si le consentement est donné.
- **Mon compte** : si la cliente a passé l'étape, une carte « Reçois ta routine par e-mail » le lui propose à nouveau.

## 5 quaterdecies. Cheveux, cuir chevelu, compléments et douche
- **Routine cheveux à part entière** (onglet « Cheveux » de la routine et de l'espace soin) : shampoing (ou shampoing traitant du cuir chevelu), après-shampoing, soin sans rinçage, protection chaleur si coiffage chaud, soin du cuir chevelu, gommage du cuir chevelu, masque hebdomadaire.
- **Priorité K-beauty et J-beauty** dans le choix des produits, cheveux compris. Les soins pensés pour cheveux texturés restent proposés aux cheveux ondulés à crépus. Nouveaux produits : SOME BY MI, lilyeve, 107 Beauty, medicube, Aromatica, VT, Kaminomoto, Seapuri, epais, MOEV, &honey, Fino, Tsubaki, Orbis, Elizavecca, TOCOBO. En pharmacie : Kerium DS, Kertyol P.S.O., Nodé K, Dercos Aminexil, Neoptide.
- **Nouvelles questions** : signes du cuir chevelu (squames grasses, plaques épaisses, tempes qui se dégarnissent, chute, zone sans cheveux, boutons ou croûtes) ; ce qu'un médecin a déjà dit (dermatite séborrhéique, psoriasis, alopécie de traction ou androgénétique, pelade) ; coiffures (tresses, perruques ou tissages, défrisage, chaleur, coiffures serrées).
- **Orientation, jamais de diagnostic** : chaque signe reçoit une explication, des gestes du quotidien et la bonne personne à consulter. Squames épaisses ou grasses : shampoings de pharmacie adaptés, pas de soin stimulant ni de gommage, pas d'huiles essentielles. Tempes : alopécie de traction expliquée (réversible si on supprime tôt la tension).
- **Compléments alimentaires et plantes** : pharmacie (Forcapil, Phytophanère, Anacaps Reactiv), Japon (DHC), Corée (Vital Beautie), plantes (ortie, prêle, levure de bière, moringa, fenugrec). Règles affichées : bilan sanguin d'abord, biotine et examens de laboratoire, grossesse et traitements, pas de cumul, 3 mois minimum. Sunsoari ne vend pas de compléments pour l'instant : avant d'en vendre, il faut vérifier la réglementation (déclaration auprès de la DGCCRF, allégations de santé autorisées par l'Union européenne).
- **Textures** : sous-types 2A à 4C (question affichée selon la texture), porosité (faible, moyenne, forte). L'onglet Cheveux présente le guide de la texture de la cliente (ce qui lui fait du bien, ce qu'il faut éviter, méthodes LOC/LCO, scrunch, co-wash, wash day, satin la nuit), sa porosité, l'équilibre hydratation-protéines et les autres textures. Le classement de 1 à 4C est présenté comme un repère, pas comme une mesure scientifique.
- **Nouvelle étape « coiffant »** (crème, gel ou mousse) pour les cheveux ondulés à crépus. Section « Plus d'options pour ta texture » : 4 produits par étape, coréens et japonais d'abord, marques afro pour les cheveux bouclés à crépus. Nouveaux produits : Kundal, Lador LPP, YOLU, Hair Recipe, Milbon, Kinky-Curly Curling Custard, Uncle Funky's Daughter Curly Magic, Not Your Mother's Curl Talk, SheaMoisture JBCO Leave-In.
- **Douche et corps** : nouvelle étape « nettoyant corps ». Salt & Stone, Summer Fridays (beurres corporels), Round Lab, Curel, Kose, Pelican, SOME BY MI.
- **Écartés volontairement** : savons et gels « blanchissants » (Koji White, White Conc…). Ils ne correspondent pas aux valeurs Sunsoari et peuvent irriter.
- **Micro** : si le navigateur ou la page intégrée bloque le micro, l'application l'explique et place le curseur dans le champ pour utiliser la dictée du clavier du téléphone. Dans un aperçu claude.ai, le micro intégré est bloqué ; sur sunsoari.fr, il fonctionne.
- **Vidéo et photos** : l'analyse par l'IA demande la capacité « images ». Sans IA, la cliente coche ce qu'elle voit sur ses images, et sa routine en tient compte.

## 5 quindecies. Homme, femme, ludique et fluide
- **Cohérence selon le genre** : la question grossesse et ménopause n'apparaît pas pour un homme. Une question « barbe » (rasé, barbe courte, barbe longue, pas concerné) s'affiche pour les hommes et les personnes qui se décrivent autrement. Elle ajoute à la routine du matin l'étape rasage (Bevel, marque fondée par Tristan Walker, pensée pour les poils frisés) ou soin de la barbe (Horace, Bulldog), avec des conseils contre le feu du rasoir et les poils incarnés. Nouvelle préoccupation « feu du rasoir, poils incarnés » et habitude « je me rase souvent », pour tous. Les exemples de texte sont neutres (« parent » plutôt que « maman »).
- **Diagnostic ludique** : un émoji cohérent pour chaque réponse (mains de 4 carnations, drapeaux pour les origines, symboles de texture de cheveux…). Un émoji pour chaque partie, et un petit message d'encouragement au début de chaque nouvelle partie.
- **Fluidité** : la feuille de style n'est chargée qu'une fois, seul le contenu change. Les choix multiples se mettent à jour sans recharger l'écran. Une animation douce accompagne chaque nouvel écran, désactivée si le téléphone demande moins d'animations. Le catalogue est calculé une seule fois. Chaque écran s'affiche en moins de 20 ms sur ordinateur.

## 5 sexdecies. Test de peau simplifié, explications et astérisques
- **Écran « Avant de commencer »** au tout début : 10 à 15 minutes, être chez soi ou près d'un lavabo, nettoyant habituel et serviette à portée de main, une photo possible. Option « je réponds de mémoire ».
- **Test du visage nu en 5 minutes** (au lieu d'une heure) : bouton « C'est fait, mon visage est lavé ». Question immédiate « Juste après le lavage, ta peau… » (tire partout, tire sur les joues, picote, confortable). Les questions de mémoire suivent pendant l'attente. Puis « Ça fait 5 minutes : ta peau… », avec un minuteur.
- **Nouvelle question « Les boutons, chez toi… »** : elle détecte une peau à tendance acnéique.
- **Le moteur `skinProfile`** donne le type de peau (grasse, mixte, sèche, normale), plus « à tendance acnéique », « déshydratée » et « sensible ». Il donne aussi les raisons (« Ce qui nous fait dire ça ») et une fiabilité (faible, moyenne ou élevée, selon le nombre de réponses). Le bouton « 🤖 Explique-moi ma peau » transmet ces raisons à l'assistante.
- **Astérisques** : les réponses qui demandent une explication portent un * et le bloc « * Ce que veulent dire ces mots » les définit sous la question (`OPT_DEF`). Cela concerne les préoccupations, les antécédents, les réactions, le cuir chevelu, le corps et le test de peau.
- **Nouvelles préoccupations** : « Acné », « Plaques, zones qui grattent ou qui pèlent » (eczéma, psoriasis ou autre affection) et « Autre chose ». Elles ouvrent un champ « Dis-nous en plus », avec la dictée. Avec des plaques, la routine est très douce et un conseil oriente vers un médecin.

## 5 septdecies. Pas de question en double
- **Questions supprimées** :
  - « Le soleil, le froid ou les vacances te donnent des irritations ? », déjà couvert par « Et selon les saisons ? » et par la question sur les nouveaux produits ;
  - le budget douche : un seul budget mensuel (« visage, corps, cheveux et douche »), d'où l'on déduit le coffret douche ;
  - « Je me rase souvent » dans « Ton quotidien », déjà couvert par les préoccupations et la question barbe.
- **Questions sautées quand la réponse est déjà connue** :
  - « zones rêches » si la peau tire après le lavage ;
  - « briller et tirailler en même temps » si la réponse se déduit du test ;
  - « Ta peau a-t-elle déjà mal réagi à… » si elle réagit rarement et n'a pas d'allergie connue.
- **Pré-cochage** : « Qu'aimerais-tu améliorer ? » coche d'avance ce qui a déjà été dit (boutons, brillance, sécheresse, rougeurs, éléments vus sur la photo), avec le message « On a déjà coché ce que tu nous as dit ». Le cuir chevelu est pré-coché d'après la photo.
- **Options masquées** : un cuir chevelu « sans souci » ne se voit plus proposer « squames » ni « plaques ».
- **« Raconte-moi »** : les questions déjà remplies par la voix ou le texte ne sont plus reposées (`voiceIds`, `nextStep`).

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
- Filtres : le filtre à sédiments retient les dépôts de calcaire, la rouille, le sable et certains métaux lourds (selon les données du fabricant) ; le gel vitaminé à la vitamine C réduit le chlore, ce qui rend l'eau plus douce au contact de la peau et ménage la barrière cutanée. Ne pas employer « adoucisseur » ni « eau adoucie », et ne jamais dire qu'un filtre soigne. Un glossaire « C'est quoi ? » (filtre vitaminé, filtre à sédiments, chlore, calcaire, barrière cutanée, capsule, dureté de l'eau) s'affiche dans « Le savais-tu ? », dans Ressources et dans Astuces.
- Score présenté comme « compatibilité avec ton profil », jamais comme une évaluation médicale.
- Marques non vendues par Sunsoari signalées ; liens affiliés signalés.
