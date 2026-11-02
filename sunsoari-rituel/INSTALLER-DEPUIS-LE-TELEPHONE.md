# Installer l'app sur sunsoari.fr depuis le téléphone (sans ordinateur)

L'application est hébergée sur GitHub (dépôt public) et servie par jsDelivr, un CDN gratuit. Il n'y a **aucun fichier à importer** dans Shopify : tu colles un seul bloc de texte.

## Le bloc à coller
```liquid
{%- if page.handle == 'mon-rituel' -%}
<div data-sunsoari-rituel
  data-shop="{{ request.origin }}"
  data-whatsapp="0781737521"
  data-instagram="sunsoari"
  {%- if customer %} data-customer-name="{{ customer.first_name | escape }}"{% endif %}
  {%- if customer and customer.tags contains 'sunsoari-plus' %} data-plus{% endif %}
  {%- if customer and customer.tags contains 'sunsoari-admin' %} data-admin data-admin-url="https://admin.shopify.com/store/{{ shop.permanent_domain | remove: '.myshopify.com' }}"{% endif %}
  data-login-url="{{ routes.account_login_url }}"
  data-register-url="{{ routes.account_register_url }}"></div>
<script charset="utf-8" src="https://cdn.jsdelivr.net/gh/madbym/skills-introduction-to-githu@20bd8d3046a9346edf11547fe4aa7c5fa87c6c5a/sunsoari-rituel/sunsoari-app.js" defer></script>
{%- endif -%}
```

## Pas à pas dans l'app Shopify
1. **Créer la page :** Boutique en ligne > Pages > **+** (Ajouter une page). Titre : **Mon rituel**, puis Enregistrer. L'adresse de la page doit être `mon-rituel`.
2. **Ouvrir l'éditeur :** Boutique en ligne > Thèmes > **Personnaliser** (sur ton thème actuel, ou sur une copie si tu veux d'abord tester).
3. **Aller sur une page :** en haut, touche le menu « Page d'accueil » et choisis **Pages > Page par défaut** (ou « Mon rituel »).
4. **Ajouter le bloc :** dans la liste des sections, touche **Ajouter une section** > **Liquid personnalisé**.
5. **Coller le texte :** dans le champ « Code Liquid », colle **tout le bloc** ci-dessus, puis **Enregistrer**.
6. **Tester :** ouvre **sunsoari.fr/pages/mon-rituel** dans Safari.

La ligne `page.handle == 'mon-rituel'` fait que l'app ne s'affiche que sur la page « Mon rituel », même si la section est ajoutée à toutes les pages.

## Plus tard
- **Mises à jour :** quand l'app change, Claude te donne un nouveau bloc. Tu remplaces l'ancien, et c'est tout.
- **Quand Emergent a fini :** ajoute dans le bloc `data-ai-endpoint="…"` et `data-email-endpoint="…"` avec les adresses qu'il te donne.
- **Vidéo d'accueil :** importe la vidéo dans Contenu > Fichiers, copie son lien, puis ajoute `data-home-video="…"` dans le bloc.
- **Version définitive :** quand tu auras un ordinateur, la section complète (`shopify-section-mon-rituel-app.liquid`) ajoute les réglages vidéo et ton espace créatrice avec les métaobjets.
