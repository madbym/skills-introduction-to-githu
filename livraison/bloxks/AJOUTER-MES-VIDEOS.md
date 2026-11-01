# Ajouter mes vidéos et mes photos dans l'app (espace créatrice)

**Le principe :** tu déposes tes vidéos et tes photos dans **Shopify**, depuis ton téléphone. L'app les affiche toute seule aux bons endroits. Ton espace privé, c'est ton admin Shopify : personne d'autre n'y a accès. Dans l'app, un encadré **« Mon espace créatrice »** n'apparaît que pour toi.

---

## Mise en place (une seule fois, environ 15 minutes)

### 1. Créer le modèle « Contenu Sunsoari »
Shopify > **Paramètres > Données personnalisées > Métaobjets > Ajouter une définition**.
- **Nom :** Contenu Sunsoari. **Type (identifiant) :** `sunsoari_contenu`. C'est important : l'app cherche exactement ce mot.
- Ajoute ces champs, en respectant exactement les **identifiants** (deuxième colonne) :

| Nom affiché | Identifiant | Type de champ |
|---|---|---|
| Titre | `titre` | Texte sur une ligne |
| Type | `type` | Texte sur une ligne, choix : `video`, `photo`, `post`, `article` |
| Fichier | `fichier` | Fichier (vidéo ou image) |
| Vignette | `vignette` | Fichier (image), facultatif |
| Lien | `lien` | URL (TikTok, Instagram, YouTube), facultatif |
| Emplacement | `emplacement` | Liste de textes, choix : `accueil`, `academie` |
| Étape de routine | `etape` | Texte sur une ligne, facultatif (ex. `douche`, `nettoyant`, `serum`, `spf`, `shampoing`) |
| Produit | `produit` | Texte sur une ligne, facultatif (identifiant du produit, ex. `biodancecollagen`) |
| Publié | `publie` | Vrai ou faux |

- Dans **Accès**, active **Storefronts** (lecture). Sans ça, le site ne voit pas tes contenus.

### 2. Te reconnaître comme fondatrice
Shopify > **Clients** : ouvre ton compte client (crée-le avec ton e-mail s'il n'existe pas) et ajoute l'étiquette **`sunsoari-admin`**.
Quand tu es connectée sur sunsoari.fr, l'app affiche ton espace créatrice avec trois boutons : « Ajouter une vidéo ou une photo », « Gérer mes contenus » et « Mes fichiers Shopify ».

### 3. Mettre à jour la section du thème
Remplace le contenu de la section « mon-rituel-app » par le nouveau fichier `shopify-section-mon-rituel-app.liquid`, puis enregistre.

---

## Au quotidien (2 minutes, depuis l'app Shopify)
1. **Contenu > Métaobjets > Contenu Sunsoari > Ajouter.**
2. Donne un **titre** court, par exemple « Mon rituel douche du soir ».
3. **Fichier :** choisis ta vidéo ou ta photo dans ta galerie. **Ou bien Lien :** colle l'adresse de ta vidéo TikTok ou Instagram.
4. **Emplacement :**
   - `accueil` : carrousel « Nouveau chez Sunsoari » sur la page Aujourd'hui ;
   - `academie` : « Tutos et coulisses Sunsoari » dans Ressources.
5. Facultatif :
   - une **étape** (`douche`, `serum`…) : la vidéo apparaît sous ce produit dans la routine des clientes ;
   - un **produit** : la vidéo apparaît sur la fiche de ce produit.
6. **Publié :**
   - décoché = brouillon, tu es la seule à le voir dans l'app ;
   - coché = toutes les clientes le voient.

Les vidéos se lisent directement dans l'app. Les clientes peuvent aussi les garder dans leurs favoris.

---

## Conseils
- **Format :** vertical (9:16), en MP4, de préférence moins d'une minute. Garde le fichier léger pour que la vidéo se charge vite.
- **Vignette :** une jolie image de couverture donne envie de cliquer. Sans vignette, Shopify prend une image de la vidéo.
- **Formats sans montrer ton visage :** mains, voix off, plans produits, routine de dos. Tout ça marche très bien.
- **Créatrice UGC IA :** indique-le dans le titre ou la légende, par exemple « créé avec l'IA ».
- **Photos ou vidéos de clientes :** jamais sans leur accord écrit.
- **Textes :** pas de promesse de résultat ni d'allégation santé (mêmes règles que le reste de Sunsoari).
