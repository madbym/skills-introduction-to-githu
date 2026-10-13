# Correctif : barre « livraison offerte » du panier

Problème : la barre affichait « Vous bénéficiez de la livraison offerte » dès 70 € de sous-total,
même quand une remise s'appliquait (la remise « Livraison offerte France dès 70 € » ne se cumule avec aucune autre),
et quel que soit le pays.

Correction (thème « Sunsoari – v5 (correctif livraison offerte) ») :
- France : objectif 70 € sans remise, 100 € (montant après remises, `cart.total_price`) dès qu'une remise s'applique.
- Monaco : objectif 100 €.
- Autres pays : barre masquée.
- Texte d'explication sous la barre mis à jour.

Fichiers : `assets/cart.js` (classe `FreeShippingGoal`), `snippets/free-shipping-goal.liquid`.
