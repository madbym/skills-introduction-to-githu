# Mettre « Mon Rituel » sur sunsoari.fr avec Shopify (générateur de blocs IA)

L'application tient dans un seul fichier : `sunsoari-app.js`. Il est trop gros pour être collé dans un bloc. On le met donc dans le thème, puis on demande à l'IA de Shopify de créer un **bloc** qui l'affiche.

## Étape 1 · Mettre le fichier dans le thème (5 minutes)
1. Shopify > **Boutique en ligne > Thèmes**. Sur ton thème, clique sur **⋯ > Dupliquer** : tu travailles sur la copie, le site reste intact.
2. Sur la copie : **⋯ > Modifier le code**. Dans le dossier **assets**, clique sur **Ajouter un fichier** et téléverse `sunsoari-app.js`.
3. **Contenu > Fichiers** : téléverse les 16 images du dossier `img/`. Copie l'adresse d'une image et garde seulement le début, jusqu'à `/files/` inclus (par exemple `https://cdn.shopify.com/s/files/1/xxxx/xxxx/files/`).
4. **Boutique en ligne > Pages > Ajouter une page** : titre « Mon rituel », adresse `/pages/mon-rituel`.

## Étape 2 · Le prompt à coller dans le générateur de blocs
Dans l'éditeur de thème (Personnaliser), ouvre la page « Mon rituel ». Selon ton thème :
- **Horizon** : champ IA dans la barre de gauche ;
- **Dawn et autres thèmes 2.0** : passe par Sidekick, qui donne le lien vers le générateur de blocs.

Copie tout ce qui est entre les deux lignes :

---

Crée un bloc de thème appelé « Mon Rituel Sunsoari ». Il sert uniquement de conteneur pour une application JavaScript déjà prête, déposée dans les assets du thème sous le nom `sunsoari-app.js`. N'écris pas l'application toi-même et ne modifie pas ce fichier.

Le bloc doit produire exactement :
1. une balise `<div>` avec l'attribut `data-sunsoari-rituel` et ces attributs, remplis à partir des réglages du bloc (n'écris un attribut que si son réglage n'est pas vide) :
   - `data-shop="{{ request.origin }}"` ;
   - `data-whatsapp` ← réglage texte « Numéro WhatsApp » (valeur par défaut `0781737521`) ;
   - `data-instagram` ← réglage texte « Compte Instagram » (valeur par défaut `sunsoari`) ;
   - `data-img-base` ← réglage texte « Adresse des images (Fichiers Shopify) » ;
   - `data-contact` ← réglage lien « Page contact » (valeur par défaut `/pages/contact`) ;
   - `data-widget="favoris"` seulement si le réglage de sélection « Affichage » vaut « Favoris seulement » (choix : « Application complète », valeur par défaut, ou « Favoris seulement ») ;
   - `data-ai-endpoint` ← réglage texte « Adresse du serveur IA » (vide par défaut) ;
   - `data-email-endpoint` ← réglage texte « Adresse d'envoi de la routine par e-mail » (vide par défaut) ;
   - si une cliente est connectée : `data-customer-name="{{ customer.first_name | escape }}"` ;
   - si la cliente connectée a l'étiquette `sunsoari-plus` : l'attribut `data-plus` (sans valeur) ;
   - toujours : `data-login-url="{{ routes.account_login_url }}"` et `data-register-url="{{ routes.account_register_url }}"`.
2. juste après : `<script charset="utf-8" src="{{ 'sunsoari-app.js' | asset_url }}" defer></script>`.

Mise en page : pleine largeur sur mobile, largeur maximale de 560 px centrée sur ordinateur, espacement vertical réglable de 0 à 80 px (24 px par défaut), titre facultatif au-dessus (réglage texte « Titre »). Fond transparent. N'ajoute aucun style qui s'applique à l'intérieur de l'application : elle a ses propres styles, isolés. N'ajoute ni texte marketing, ni avis, ni chiffre.

---

## Étape 3 · Vérifier, puis publier
1. Ajoute le bloc sur la page « Mon rituel » et colle l'adresse des images dans son réglage.
2. Laisse « Adresse du serveur IA » et « Adresse d'envoi… » **vides** pour l'instant : l'application fonctionne sans. Tu les rempliras quand Emergent aura créé le serveur.
3. Sur ton téléphone, en aperçu, vérifie :
   - le diagnostic va jusqu'au bout ;
   - le micro « Dicter » fonctionne ;
   - un bouton « Ajouter au panier » ouvre le panier sunsoari.fr avec le bon produit.
4. Si tout est bon : **Publier** la copie du thème.
5. Pour une page « Mes favoris » dans le compte client : ajoute un second bloc réglé sur « Favoris seulement ».

## Si le générateur de blocs n'est pas disponible
Le fichier `shopify-section-mon-rituel-app.liquid` fait la même chose. **Modifier le code > sections > Ajouter une section** « mon-rituel-app », colle le contenu du fichier, enregistre, puis ajoute la section « Mon Rituel (application) » sur la page.

## Liens pour se repérer
- Ajouter un lien « Mon rituel » dans le menu principal : **Boutique en ligne > Navigation**.
- Bouton « Faire mon diagnostic » sur la page d'accueil et sur les fiches produits : un bouton qui mène à `/pages/mon-rituel`.
