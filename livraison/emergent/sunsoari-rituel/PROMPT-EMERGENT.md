# Prompt à envoyer à Emergent (version du 26 octobre 2026)

**Avant d'envoyer :** dépose dans Emergent tout le contenu du ZIP `sunsoari-pour-emergent.zip`, ou connecte le dépôt GitHub `madbym/skills-introduction-to-githu` (branche `claude/sunsoari-rituel-app`) si Emergent le propose.
Envoie ensuite le **message 1**. Attends qu'il soit terminé et teste-le avant d'envoyer le suivant. Un message à la fois, c'est moins de crédits gaspillés.

---

## Message 1 · Comprendre le projet et reprendre l'application existante

Tu vas construire « Mon Rituel · Sunsoari », l'application beauté de la boutique Shopify **sunsoari.fr** (filtres de douche Onsha, SHIFT et Sullab, puis K-beauty, J-beauty et marques africaines). Elle doit fonctionner sur le web (ordinateur et mobile) et s'installer sur l'écran d'accueil (PWA).

**Lis d'abord, dans cet ordre :**
1. `EMERGENT-LIRE-MOI.md` ;
2. `CAHIER-DES-CHARGES-APP.md` (le cahier des charges complet, toutes ses sections, jusqu'à la section 9 « Règles de contenu ») ;
3. `sunsoari-app.js` : le prototype complet et validé (environ 2 800 lignes).

**Règle principale :** le prototype est la référence. Reprends **exactement** ses données, ses textes et sa logique :
- **données** : catalogue Sunsoari `P` avec les identifiants de variantes Shopify, plus de 220 produits d'autres marques `EXT`, ingrédients `ING`, questions `QUESTIONS` avec leurs `skipIf`, émojis `EMO` ;
- **moteur** : `skinProfile`, `tagsOf`, `hairTags`, `fitScore`, `pickFor`, `buildRoutine`, `introPlan`, `eveningCalendar`, `insights`, `scalpGuide`, `forYou`, `hairOptions` ;
- **guides** : `TEXTURES`, `POROSITY`, `SUPP`.

Ne réécris pas les textes de conseil. Ils ont été relus pour respecter la réglementation cosmétique : aucune allégation médicale, aucune promesse de résultat, aucun faux avis ni faux chiffre.

**Pour ce premier message :**
- Mets en ligne l'application telle quelle (front-end), en servant `sunsoari-app.js` et le dossier `img/`, sur une page qui reprend `demo.html`.
- Ajoute le manifeste et les icônes du dossier `app/` pour qu'elle soit installable.
- Ne change ni le design ni le parcours.
- **Vérifie et montre-moi :**
  - le diagnostic complet (45 à 50 écrans selon les réponses, à partir de l'écran « Avant de commencer ») se termine sur « Ton espace soin est prêt » ;
  - l'espace soin s'affiche avec ses 10 onglets ;
  - un bouton « Ajouter au panier » ouvre bien `https://sunsoari.fr/cart/…` avec le bon produit.

## Message 2 · Le serveur IA (assistante, analyse photo et vidéo, « Raconte-moi »)

Crée une route serveur `POST /api/ia` et donne-moi son adresse publique : je la mettrai dans l'attribut `data-ai-endpoint` sur Shopify.

- **Entrée :** `{ input: texte ou liste de messages, json: booléen, images: [{ media_type: "image/jpeg", data: base64 }] }`.
- **Sortie :** `{ text: "…" }`.
- **Modèle :** appelle l'API Claude d'Anthropic avec le modèle Claude le plus récent qui sait lire les images. La clé API reste **uniquement sur le serveur**, dans une variable d'environnement, jamais dans le navigateur.
- **Limites :** au plus 6 images par appel, 1 Mo par image. Limite le nombre d'appels par appareil (par exemple 30 par jour en gratuit). Réponds `429` si la limite est dépassée.
- **Images :** ne stocke **jamais** les images. Elles sont analysées puis oubliées.
- Autorise uniquement les appels venant de `https://sunsoari.fr` et de l'adresse de l'application (CORS).

## Message 3 · Comptes clients et e-mail de routine

1. **Comptes :** utilise les comptes clients Shopify (Customer Account API), avec connexion par lien envoyé par e-mail. Une fois connectée, la cliente retrouve sur tous ses appareils son diagnostic, sa routine, son planner, son évolution, ses favoris et son étagère. Ces données sont aujourd'hui dans `localStorage`, sous la clé `sunsoari-app-v3` : migre-les à la première connexion.
2. **Envoi de la routine :** crée `POST /api/routine-email`. Il reçoit `{ email, prenom, consentement_routine, consentement_offres, resultat, routine: { matin, soir, hebdo, cheveux }, resume }`. Il doit :
   - créer ou retrouver le compte client ;
   - envoyer l'e-mail de routine à partir du modèle `email-routine.html`, **uniquement si** `consentement_routine` vaut `true` ;
   - inscrire la cliente aux offres **uniquement si** `consentement_offres` vaut `true`.

   L'envoi passe par Klaviyo (ou Shopify Email). Donne-moi l'adresse de la route : je la mettrai dans `data-email-endpoint`.
3. **Rappels par e-mail**, seulement avec l'accord de la cliente : recharge de filtre (selon `REFILLS`), étape d'évolution toutes les 2 semaines, nouveau diagnostic à chaque saison.

## Message 4 · Données de santé et RGPD (obligatoire avant la mise en ligne)

Le diagnostic contient des **données de santé** : grossesse, ménopause, eczéma, psoriasis, traitements, chute de cheveux, photos du visage. Ce sont des données sensibles (article 9 du RGPD). Mets en place :
- un **consentement explicite et séparé** avant d'enregistrer ces réponses sur le serveur. Sans consentement, elles restent seulement sur le téléphone ;
- un hébergement des données dans l'Union européenne ;
- la suppression du compte et de toutes les données en un clic dans « Mon compte », et l'export des données ;
- **photos et miniatures d'évolution** : stockées uniquement si la cliente coche « Garder mes photos », chiffrées, jamais utilisées pour la publicité ni pour entraîner un modèle ;
- une page « Confidentialité » claire, en français. Je la ferai relire par un professionnel.

## Message 5 · Abonnement Sunsoari+ (Stripe)

Suis la section 2 du cahier des charges :
- **formules :** 2,99 €/mois ou 24,90 €/an, 7 jours d'essai. Le diagnostic et la routine restent gratuits ; l'abonnement débloque le planner, l'évolution, Ma semaine, les vidéos de l'Académie, l'IA et l'assistante sans limite (voir `PLUS_TABS` et `storyLocked`) ;
- **reconnaître une abonnée :** le webhook ajoute l'étiquette client Shopify `sunsoari-plus` ; la section Shopify ajoute alors `data-plus` sur la balise ;
- **paiement :** Apple Pay, carte et PayPal ; Klarna surtout pour l'abonnement annuel ;
- **gestion :** portail client Stripe, et webhooks pour activer ou couper les fonctions Sunsoari+ ;
- **adresse de paiement :** l'application l'attend dans l'attribut `data-checkout-url`.

**Ne lance pas de paiement réel :** reste en mode test Stripe jusqu'à ce que je valide.

## Message 6 · Finitions

- **Dictée :** quand la dictée du navigateur n'est pas disponible, propose d'enregistrer un court message vocal, de le transcrire sur le serveur, puis de supprimer l'audio.
- **Performance :** l'application doit rester fluide sur un iPhone de milieu de gamme. Mesure le temps d'affichage de chaque écran et corrige ce qui dépasse 100 ms.
- **Accessibilité :** contrastes, navigation au clavier, textes alternatifs.
- **Tests automatiques :**
  - parcours femme, homme et « autre » ;
  - profil grossesse ;
  - profils psoriasis et dermatite séborrhéique du cuir chevelu ;
  - cheveux 4C à porosité forte ;
  - scan d'un code-barres ;
  - envoi de la routine par e-mail.

---

## Ce que je ne veux pas
- Pas de faux avis, pas de compteur d'inscrites inventé, pas de compte à rebours, pas de « résultats garantis ».
- Pas de produits « blanchissants » ou « éclaircissants ».
- Sur les filtres, garde exactement les textes du prototype (`GLOSSAIRE`, story « Filtre de douche ») : sédiments (calcaire, rouille, sable, certains métaux lourds selon le fabricant) et gel vitaminé qui réduit le chlore. Jamais « adoucisseur », jamais « soigne ».
- Pas de nouvelle fonction que je n'ai pas demandée : demande-moi d'abord.
