# Mon Rituel · Sunsoari — point d'entrée pour Emergent

Ce dépôt contient tout ce qu'il faut pour construire l'application « Mon Rituel · Sunsoari ».

## Fichiers à lire, dans cet ordre
1. `sunsoari-rituel/CAHIER-DES-CHARGES-APP.md` : le cahier des charges complet (comptes, abonnement Sunsoari+ à 4,90 €/mois ou 39 €/an avec 7 jours d'essai, parcours façon Lóvi, écrans, stories, tutoriels, scan visage, gamme SHIFT prioritaire, espace soin personnalisé avec plan d'introduction semaine par semaine (section 5 quater), mobile et web, règles de contenu).
2. `sunsoari-rituel/sunsoari-app.js` : le prototype fonctionnel. Il contient les données et la logique validées à reprendre telles quelles : catalogue Shopify (`P`, avec les identifiants de variantes SHIFT et Onsha), autres marques (`EXT`), questions (`QUESTIONS`), moteur de recommandation (`recommend`, `routinePlan`, `insights`), score de compatibilité (`fitScore`, `parseInci`), ingrédients (`ING`), tendances (`TRENDS`), stories (`STORIES`), tutoriels (`TUTOS`), guides (`GUIDES`), recharges (`REFILLS`), plan d'introduction (`introPlan`) et calendrier du soir (`eveningCalendar`).
3. `sunsoari-rituel/app/` : la version installable (manifeste, icônes) à reproduire.
4. `sunsoari-rituel/demo.html` : la page de démonstration du prototype.

## Message à envoyer à Emergent
> Lis `EMERGENT-LIRE-MOI.md`, puis `sunsoari-rituel/CAHIER-DES-CHARGES-APP.md`, et construis l'application décrite en reprenant exactement les données et la logique de `sunsoari-rituel/sunsoari-app.js`. Commence par la phase 1 : onboarding, routine révélée (Matin, Soir, Hebdo, Douche avec la collection SHIFT), barre de navigation et écrans Aujourd'hui, Produits, Scan, Ressources, Assistante. Ensuite : comptes, abonnement Stripe, IA.

## Branche
Tout le travail est sur la branche `claude/sunsoari-rituel-app`.
