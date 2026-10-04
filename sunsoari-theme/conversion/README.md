# Refonte « Sunsoari – Copie conversion (à valider) »

Thème Shopify `194596962637` (non publié).

- `original/` : fichiers téléchargés du thème avant modification (sauvegarde).
  `templates/product.ss-onsha-coque-nomade.json` vient du thème principal « Images et vidéos ».
- `build.py` : regénère les fiches produits dans `theme/templates/`.
- `theme/` : fichiers envoyés dans le thème.
- `extract.py` : outil qui récupère les fichiers du thème depuis les journaux de session.

Regénérer : `python3 build.py`.

## Modifications

- Bouton « Ajouter au panier » juste après la description (variantes, offres par quantité et
  produits indispensables / compléments au-dessus ; caractéristiques et réassurance en dessous).
- Étiquettes « Indispensable », « Au choix », « Complément idéal » sur les cases à cocher (jamais pré-cochées).
- Images des senteurs Onsha (les fichiers Hinoki.jpg, Ocean.jpg, Pin.jpg n'existent plus) et des collections SHIFT.
- Nouveaux modèles : coque Nomade, Starter Home, Premier Rituel (Home).
- Fil d'Ariane structuré (BreadcrumbList) pour Google sur les fiches produits.

## Nettoyage du site (`clean_site.py`)

- Accueil, collections, page « Nos marques » : « pommeau » → « pomme de douche », images introuvables remplacées.
- `page.json` (pages d'aide et « Notre univers ») : seulement le texte de la page (les anciennes sections « Notre histoire » sont retirées).
- `list-collections.json` (/collections) : contenu de démonstration du thème retiré (Black Friday, Ceramide…).
- Hors thème (en direct) : menus, pages d'aide, collections, fiches produits mis à jour via l'API Shopify.
