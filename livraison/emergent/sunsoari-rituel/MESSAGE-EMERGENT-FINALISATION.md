# Message à envoyer à Emergent pour finaliser

**Avant d'envoyer :**
1. Dépose dans Emergent le nouveau `sunsoari-pour-emergent.zip`, qui remplace l'ancien.
2. Joins tes 3 vidéos du Drive :
   - `SUNSOARI_HOME_MOBILE_1080P_60FPS.mp4` ;
   - `SUNSOARI_HOME_4K_60FPS_FLUX_OPTIQUE.mp4` ;
   - `Sunsoari_Home_Reel_ASMR_Joint_Centre.mp4`.

Copie ensuite tout ce qui est entre les deux lignes.

---

Bonjour, voici la version finale de « Mon Rituel · Sunsoari ». Le fichier `sunsoari-app.js` du ZIP remplace l'ancien et reste la référence : reprends exactement ses données, ses textes et sa logique. Ne réécris pas les textes de conseil : ils ont été relus pour la réglementation cosmétique.

**1. Mets à jour l'application avec la nouvelle version**
- **Design :** icônes dessinées au trait (`ICONS`, `EMO`, `SWATCH`, `MONO`). Aucun émoji, nulle part.
- **Questions :**
  - le test du visage nu utilise le « test du mouchoir » (`pt_soir`) ;
  - le mot « picote » n'est plus répété ;
  - `pt_reac` est sauté si la peau réagit déjà au lavage ;
  - pas de question en double.
- **Recommandations sélectives et variées :**
  - utilise `pickFor`, `seedOf` (départage stable propre à chaque profil) et une seule marque par routine ;
  - « Pour toi » (`forYou`) : 10 produits par carrousel, sans doublon.
- **Catalogue complet :**
  - plus de 460 produits dans `EXT` : K-, J-, C-, V-beauty, reste de l'Asie, Turquie, Afrique et diaspora, marques coréennes pour peaux noires, Dalglow, NINELESS ;
  - un onglet « Catalogue » dans Produits (`A.catalogue`), avec des filtres par zone, dont Maquillage et Médicaments.
- **Médicaments** (champ `med`) : statut, indication, contre-indications et précautions dans `A.medBox`. Ils ne sont **jamais** placés dans une routine et n'ont **jamais** de lien d'achat. L'assistante IA ne les prescrit pas : elle renvoie vers un médecin ou un pharmacien.

**2. Vidéo d'accueil**
- **À faire :**
  - compresse les vidéos jointes en MP4 H.264 web : au plus 8 Mo pour le téléphone et 15 Mo pour l'ordinateur, en 1080p maximum, sans le son ;
  - héberge-les (CDN) et branche-les en fond de l'accueil avec les attributs `data-home-video` (ordinateur) et `data-home-video-mobile` (téléphone). La fonction `A.heroVideo` existe déjà : vidéo muette, en boucle, avec la photo d'accueil comme image d'attente, et désactivée si l'appareil demande moins d'animations.
- **Choix des vidéos :**
  - `SUNSOARI_HOME_MOBILE_1080P_60FPS` → téléphone ;
  - `SUNSOARI_HOME_4K_60FPS_FLUX_OPTIQUE` → ordinateur (à réduire en 1080p) ;
  - `Sunsoari_Home_Reel_ASMR_Joint_Centre` → contenu « Tutos et coulisses » et accueil, lié à l'étape `douche` et au produit Onsha Premier Rituel (Home) (`premierHome`).

**3. Espace créatrice (contenus de la fondatrice)**
- Les contenus sont des métaobjets Shopify de type `sunsoari_contenu` : `titre`, `type`, `fichier`, `vignette`, `lien`, `emplacement`, `etape`, `produit`, `publie`. Le détail est dans `AJOUTER-MES-VIDEOS.md`.
- **Sur le site Shopify :** la section `shopify-section-mon-rituel-app.liquid` les transmet déjà à l'app (`window.SUNSOARI_CONTENT`).
- **Sur ton application :** lis les mêmes métaobjets avec l'API Storefront de Shopify, pour que le site et l'app affichent exactement les mêmes contenus.
- **Brouillons :** un contenu dont `publie` vaut faux n'est envoyé qu'à la fondatrice connectée (étiquette client `sunsoari-admin`). L'encadré « Mon espace créatrice » (`A.adminBox`) n'est visible que pour elle.

**4. Vérifie, puis montre-moi**
- les parcours « L'essentiel » et « Diagnostic complet » (femme, homme), jusqu'à « Ton espace soin est prêt » ;
- la vidéo d'accueil sur iPhone (lecture automatique, muette) et sur ordinateur ;
- Produits > Catalogue > Médicaments, avec la fiche Minoxidil : indication, contre-indications, aucun bouton d'achat ;
- une vidéo ajoutée dans les métaobjets Shopify, visible à l'accueil puis sous l'étape douche ;
- un « Ajouter au panier » qui ouvre bien `https://sunsoari.fr/cart/…`.

**Ce que je ne veux pas :** pas d'émoji, pas de faux avis ni de faux chiffres, pas de promesse de résultat, pas de produit « blanchissant », pas de nouvelle fonction que je n'ai pas demandée. Pour les filtres, garde les textes du `GLOSSAIRE`.

---
