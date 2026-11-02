# À LIRE EN PREMIER · Ne reconstruis pas l'application

Ce dossier contient **l'application finale et complète** « Mon Rituel · Sunsoari ». Elle fonctionne telle quelle, sans installation ni compilation.

| Fichier | Rôle |
|---|---|
| `index.html` | La page de l'application |
| `sunsoari-app.js` | Toute l'application : diagnostic, routine, catalogue de plus de 460 produits, espace soin, scanner… |
| `img/` | Les photos |
| `manifest.webmanifest`, `icon-*` | L'installation sur l'écran d'accueil du téléphone |

## Ce que tu dois faire
1. **Héberge ce dossier tel quel**, comme un site statique : `index.html` à la racine, avec `sunsoari-app.js` et `img/` à côté.
2. **Ne modifie pas `sunsoari-app.js`.** Ne recrée aucun écran, aucune question, aucun texte, aucun design : tout y est déjà, validé et testé.
3. Ouvre `index.html` et vérifie que le diagnostic va jusqu'à « Ton espace soin est prêt ».
4. **Donne-moi l'adresse publique** de la page.

## Ensuite seulement : le serveur
Ajoute une route `POST /api/ia` qui reçoit `{ input, json, images }` et renvoie `{ text }`, en appelant l'API Claude. La clé API reste sur le serveur. Puis ajoute dans `index.html` l'attribut `data-ai-endpoint="https://…/api/ia"` sur la balise `<div id="sunsoari-rituel">`.

Tout le reste (e-mails, comptes, abonnement) viendra plus tard, une étape à la fois, quand je te le demanderai.
