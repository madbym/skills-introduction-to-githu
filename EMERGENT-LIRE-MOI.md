# Mon Rituel · Sunsoari : point d'entrée pour Emergent (mis à jour le 26 octobre 2026)

L'application « Mon Rituel · Sunsoari » existe déjà sous forme de prototype complet et testé. Ton travail : la mettre en ligne et ajouter le serveur (IA, comptes, e-mails, données, abonnement), **sans changer le parcours ni les textes**.

## Fichiers, dans l'ordre de lecture
| Fichier | Rôle |
|---|---|
| `sunsoari-rituel/PROMPT-EMERGENT.md` | Les 6 messages de travail, à suivre un par un |
| `sunsoari-rituel/CAHIER-DES-CHARGES-APP.md` | Le cahier des charges complet (sections 1 à 9, avec 5 quater à 5 novodecies) |
| `sunsoari-rituel/sunsoari-app.js` | **La référence** : l'application complète (données, questions, moteur de recommandation, écrans) |
| `sunsoari-rituel/demo.html` | La page qui charge l'application |
| `sunsoari-rituel/app/` | Manifeste et icônes pour l'installation sur téléphone (PWA) |
| `sunsoari-rituel/img/` | 16 photos d'ambiance Sunsoari (Onsha, SHIFT) |
| `sunsoari-rituel/email-routine.html` | Modèle de l'e-mail de routine (Klaviyo ou Shopify Email) |
| `sunsoari-rituel/shopify-section-mon-rituel-app.liquid` | Section Shopify qui affiche l'application sur sunsoari.fr |
| `sunsoari-rituel/PROMPT-SHOPIFY-BLOCKS.md` | Installation sur sunsoari.fr avec le générateur de blocs Shopify |
| `sunsoari-rituel/PROMPT-BLOXKS.md` | Application iPhone et Android avec Bloxks, branchée sur le serveur Emergent |
| `sunsoari-rituel/MEDIATHEQUE-A-EXPLOITER.md` | Photos et vidéos du Drive : ce qu'on peut utiliser, et ce qu'il ne faut pas utiliser |
| `sunsoari-rituel/marques-a-ajouter.csv` | Modèle pour ajouter des marques au catalogue |

Les fichiers `sunsoari-rituel.js` et `sunsoari-beaute.js` sont d'anciennes versions : ne les utilise pas.

## Ce que fait l'application aujourd'hui
- **Deux chemins au choix** : « L'essentiel » en 5 minutes (environ 31 écrans) ou « Le diagnostic complet » en 15 minutes (environ 51 écrans), à compléter plus tard depuis l'espace soin (`FULL_ONLY`).
- **Diagnostic complet de 45 à 51 écrans selon les réponses**, une question par écran, avec un émoji par réponse, une barre de progression en 5 parties et un message d'encouragement à chaque nouvelle partie. Il couvre :
  - un écran « Avant de commencer » (10 à 15 minutes, être près d'un lavabo) ;
  - la douche ;
  - la photo ou la vidéo du visage ;
  - « Raconte-moi », à l'oral ou à l'écrit (les questions déjà remplies ne sont pas reposées) ;
  - le test du visage nu : se laver le visage, dire ce qu'on ressent tout de suite, puis regarder sa peau 5 minutes après (minuteur), avec des questions de mémoire pendant l'attente ;
  - le type de peau (grasse, mixte, sèche, normale, plus « à tendance acnéique », « déshydratée » et « sensible »), avec « Ce qui nous fait dire ça » et une fiabilité ;
  - les antécédents, la carnation et les préoccupations ;
  - les réactions et leur cause ;
  - grossesse et ménopause (masquées pour un homme), barbe et rasage (pour les hommes) ;
  - le corps ;
  - les cheveux : texture de 2A à 4C, porosité, cuir chevelu, signes et diagnostics médicaux, coiffures ;
  - les envies, les marques préférées, le format de routine et le budget.
- **Le petit soleil Sunsoari** dans une bulle sur chaque question, des réponses à cocher pour l'âge, les produits déjà utilisés et la situation particulière, et la **météo peau** (UV, humidité, qualité de l'air via Open-Meteo).
- **Pas de question en double** : les questions dont on connaît déjà la réponse sont sautées, et « Qu'aimerais-tu améliorer ? » est pré-coché d'après les réponses précédentes.
- **Astérisques \*** : les mots compliqués des réponses sont expliqués sous la question (`OPT_DEF`). Un **lexique** de 42 définitions est dans Ressources et à côté des écrans concernés (`GLOSSAIRE`).
- **Abonnement Sunsoari+** (2,99 €/mois ou 24,90 €/an) : le diagnostic et la routine restent gratuits ; le planner, l'évolution, Ma semaine et l'Académie sont réservés (`PLUS_TABS`).
- **Dictée** sur chaque champ texte. Si le micro est bloqué, l'app bascule sur la dictée du clavier.
- **Fin du parcours** : e-mail et consentements séparés, puis l'espace soin.
- **Espace soin en 10 onglets** : Ma routine (Matin, SPF, Soir, Corps, Cheveux), Mon planner, Mon évolution, Ma semaine, Protection solaire, Recommandations, Cheveux (routine, guide de texture, porosité, cuir chevelu, compléments), Mes produits, Diagnostic, Astuces.
- **Autres écrans** : scanner de codes-barres et de QR codes (Open Beauty Facts), bibliothèque de plus de 220 produits (K-beauty, J-beauty, C-beauty, marques africaines et afro), assistante, compte et favoris.

## Attributs de la balise `<div data-sunsoari-rituel>`
| Attribut | Rôle |
|---|---|
| `data-shop` | Boutique, pour les liens produits et panier |
| `data-whatsapp` | Numéro WhatsApp |
| `data-instagram` | Compte Instagram |
| `data-img-base` | Adresse des images |
| `data-contact` | Page contact |
| `data-customer-name` | Prénom de la cliente connectée |
| `data-login-url` | Page de connexion |
| `data-register-url` | Page d'inscription |
| `data-widget="favoris"` | Affiche seulement les favoris |
| `data-ai-endpoint` | Serveur IA : `POST {input, json, images}` → `{text}` |
| `data-email-endpoint` | Envoi de la routine par e-mail |
| `data-checkout-url` | Paiement de l'abonnement Sunsoari+ |
| `data-plus` | La cliente est abonnée à Sunsoari+ (étiquette Shopify `sunsoari-plus`) : débloque le planner, l'évolution, Ma semaine et l'Académie |

## Branche
Tout le travail est sur la branche `claude/sunsoari-rituel-app` du dépôt `madbym/skills-introduction-to-githu`.
