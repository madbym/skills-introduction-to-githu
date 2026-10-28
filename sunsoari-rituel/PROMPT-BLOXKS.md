# Prompt pour Bloxks (application iPhone et Android)

Bloxks (bloxks.app/build) crée des applications **natives** pour l'App Store et Google Play, à partir d'une description. Il ne peut pas reprendre tel quel le fichier web `sunsoari-app.js`. Il faut donc lui décrire l'application et lui donner les données.

**Ordre conseillé :**
1. sunsoari.fr avec Shopify (gratuit) ;
2. Emergent pour le serveur (comptes, IA, e-mails) ;
3. Bloxks pour l'app des stores, branchée sur ce même serveur.

Ainsi, la cliente retrouve son espace soin aussi bien sur le site que dans l'app.

**À joindre si Bloxks accepte des fichiers :**
- `CAHIER-DES-CHARGES-APP.md` ;
- `sunsoari-app.js` (les données et les calculs y sont en JavaScript pur, réutilisables dans une app React Native) ;
- le dossier `img/` ;
- le logo.

Envoie le **message 1**, teste, puis le **message 2**, et ainsi de suite.

---

## Message 1 · L'app, le diagnostic et la routine

Crée une application mobile iOS et Android, en français, avec tutoiement, appelée **« Mon Rituel · Sunsoari »**. C'est l'application de la boutique beauté **sunsoari.fr** : filtres de douche Onsha, SHIFT et Sullab, puis K-beauty, J-beauty et marques africaines.

**Style :**
- **ambiance :** premium, doux, sensoriel, naturel, inspiré de l'eau et du soleil ;
- **couleurs :** crème #fbf8f3, sable #efe6d8, encre #2b2622, bleu eau #2f6f7e pour les boutons, soleil #c9853f ;
- **typographie :** titres en Instrument Serif, texte en Figtree ;
- **forme :** grandes pilules arrondies ;
- **photos :** celles du dossier `img/` joint.

**Le diagnostic :**
- un écran « Avant de commencer » avec deux chemins : « L'essentiel » en 5 minutes (environ 31 écrans) ou « Le diagnostic complet » en 15 minutes (environ 51 écrans) ; la liste des questions réservées au complet est `FULL_ONLY` ;
- une question par écran, 45 à 50 écrans selon les réponses ; les questions dont on connaît déjà la réponse sont sautées, et « Qu'aimerais-tu améliorer ? » est pré-coché ;
- les mots compliqués des réponses portent un astérisque \* expliqué sous la question (`OPT_DEF`) ;
- réponses en grandes pilules avec un émoji, passage automatique à l'écran suivant après un choix unique ;
- barre de progression en 5 parties : 🚿 douche, 🧖🏾 visage, 🧴 corps, 💇🏾 cheveux, ✨ envies ;
- un petit message d'encouragement au début de chaque partie, et le petit soleil Sunsoari (`SUNNY`) qui porte le sous-titre de chaque question dans une bulle ;
- l'âge, les produits déjà utilisés et la situation particulière se répondent par cases à cocher ; la météo peau (UV, humidité, qualité de l'air) s'appuie sur Open-Meteo ;
- les questions, les réponses et les émojis sont dans `QUESTIONS` et `EMO` du fichier joint : reprends-les exactement.

Le diagnostic couvre :
- la douche et l'eau ;
- une photo ou une vidéo du visage ;
- « Raconte-moi », à l'oral ou à l'écrit ;
- le test du visage nu : se laver le visage, dire ce qu'on ressent tout de suite, puis regarder sa peau 5 minutes après, avec un minuteur. Le résultat (`skinProfile`) donne le type de peau, « Ce qui nous fait dire ça » et une fiabilité ;
- les antécédents, la carnation et les préoccupations ;
- grossesse et ménopause, **masquées pour un homme** ;
- barbe et rasage, **pour les hommes** ;
- le corps ;
- les cheveux : texture de 2A à 4C, porosité, cuir chevelu, coiffures ;
- les envies et le budget.

**La dictée :** un bouton « 🎤 Dicter » sur chaque champ texte, avec la reconnaissance vocale native du téléphone, en français.

**La fin du parcours :** e-mail, puis deux cases à cocher séparées (« recevoir ma routine » et « recevoir les offres »), puis l'**espace soin**.

**L'espace soin, en 10 onglets :**
1. **Ma routine** (Matin, SPF, Soir, Corps, Cheveux) ;
2. **Mon planner** (oui ou non chaque jour) ;
3. **Mon évolution** (photos toutes les 2 semaines) ;
4. **Ma semaine** (un nouveau produit par semaine) ;
5. **Protection solaire** ;
6. **Recommandations** ;
7. **Cheveux** (routine, guide de texture, cuir chevelu, compléments) ;
8. **Mes produits** ;
9. **Diagnostic** ;
10. **Astuces**.

Les recommandations utilisent le moteur du fichier joint (`buildRoutine`, `fitScore`, `pickFor`, `insights`, `scalpGuide`, `hairOptions`) et le catalogue de plus de 220 produits (`P` et `EXT`). Garde tous les textes de conseil tels quels.

**Les achats :** chaque produit Sunsoari a un bouton « Ajouter au panier ». Il ouvre `https://sunsoari.fr/cart/{identifiant de variante}:1` dans le navigateur intégré.

## Message 2 · Le serveur, les comptes et les notifications

Branche l'application sur le serveur créé avec Emergent. Je te donnerai les adresses et les clés API dans les réglages, jamais dans le code :
- **IA :** `POST /api/ia`. Elle sert à l'assistante, à l'analyse des photos et de la vidéo et à « Raconte-moi ». Les photos ne sont jamais stockées sur le serveur.
- **Routine par e-mail et création du compte :** `POST /api/routine-email`.
- **Comptes :** les comptes clients Shopify, avec connexion par lien e-mail. Le même espace soin est retrouvé sur le site et dans l'app.

**Notifications push**, seulement si la cliente les accepte :
- le rappel de la routine du soir ;
- le changement de filtre ou de capsule (selon `REFILLS`) ;
- la photo d'évolution toutes les 2 semaines.

**Le scanner :** lecture des codes-barres et des QR codes avec la caméra. Les fiches produits viennent d'Open Beauty Facts.

## Message 3 · Abonnement et publication

- **Sunsoari+** : 2,99 €/mois ou 24,90 €/an, avec 7 jours d'essai. Le diagnostic et la routine restent gratuits ; l'abonnement débloque le planner, l'évolution, Ma semaine, les vidéos de l'Académie, l'IA et l'assistante sans limite. Sur iPhone et Android, l'abonnement numérique passe par les achats intégrés d'Apple et de Google. Vérifie les règles des stores avant la publication.
- **Confidentialité :** prépare les fiches App Store et Google Play, en particulier les rubriques sur les données collectées (photos, données de santé). Les données de santé ne partent sur le serveur qu'avec un consentement explicite et séparé.
- **Avant de publier**, fais-moi tester une version de test (TestFlight sur iPhone, test interne sur Android).

## Règles à respecter partout
- Aucune allégation médicale, aucune promesse de résultat, aucun faux avis ni faux chiffre, pas de compte à rebours.
- Pas de produits « blanchissants » ou « éclaircissants ».
- **Pour les filtres, reprends les textes du fichier joint** (`GLOSSAIRE`) :
  - le filtre à sédiments retient les dépôts de calcaire, la rouille, le sable et certains métaux lourds, selon les données du fabricant ;
  - le gel vitaminé à la vitamine C réduit le chlore, ce qui rend l'eau plus douce au contact de la peau et ménage la barrière cutanée ;
  - n'écris jamais qu'un filtre soigne.
- **Glossaire « C'est quoi ? »** : à afficher dans l'écran « Le savais-tu ? », dans Ressources et dans Astuces.
- Pas de nouvelle fonction que je n'ai pas demandée : demande-moi d'abord.
