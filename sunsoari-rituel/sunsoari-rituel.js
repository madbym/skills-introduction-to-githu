/*!
 * Mon Rituel Sunsoari — widget diagnostic, recommandations et planner.
 * Un seul fichier, sans dépendance. S'intègre sur Shopify ou sur n'importe quel site :
 *   <div id="sunsoari-rituel" data-shop="https://sunsoari.fr"></div>
 *   <script src="sunsoari-rituel.js" defer></script>
 * Le widget vit dans un Shadow DOM : il ne casse pas le style du site hôte.
 */
(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // Catalogue (repris de la boutique Shopify, octobre 2026).
  // Pour mettre à jour : changer prix, images ou variantes ici.
  // ---------------------------------------------------------------------------
  var IMG = "https://cdn.shopify.com/s/files/1/0932/8191/1117/files/";
  var SCENTS = ["hinoki", "ocean", "pin", "fleur", "sans"];
  var SCENT_LABEL = { hinoki: "Hinoki", ocean: "Océan", pin: "Forêt de Pin", fleur: "Fleur de Prunier", sans: "Sans senteur" };

  var P = {
    premierHome: {
      title: "Onsha · Premier Rituel (Home)", handle: "onsha-premier-rituel-home", price: 29.9,
      img: IMG + "onsha-premier-rituel-home-3217469.png?v=1791147391&width=480",
      pitch: "Pour découvrir le rituel thermal Onsha sans changer de pommeau : la coque de diffusion Home et un filtre thermal à la senteur de ton choix.",
      variants: { hinoki: 54931015893325, ocean: 54931015926093, pin: 54931015958861, fleur: 54931015991629, sans: 54931016024397 }
    },
    starterHome: {
      title: "Onsha · Starter Home", handle: "onsha-starter-home", price: 49.9,
      img: IMG + "onsha-starter-home-2493305.png?v=1791178009&width=480",
      pitch: "Le pommeau filtrant au jet fin, la coque de diffusion et un filtre thermal : tout pour commencer le rituel à la maison.",
      variants: { hinoki: 54930382291277, ocean: 54930382324045, pin: 54930382356813, fleur: 54930382389581, sans: 54931005800781 }
    },
    coffretHome: {
      title: "Onsha · Coffret Douche Thermale Coréen (Home)", handle: "coffret-home-onsha-sullab-sunsoari", price: 79.9,
      img: IMG + "onsha-coffret-douche-thermal-coreen-home-1074246.png?v=1791147381&width=480",
      pitch: "Le rituel complet : pommeau au jet fin, coque de diffusion Home et quatre filtres thermaux pour plusieurs semaines de douches.",
      variants: { all: 53576723267917 }
    },
    shiftAroma: {
      title: "SHIFT · Coffret Douche & Aromathérapie", handle: "shift-coffret-douche-aromatherapie", price: 109.9,
      img: IMG + "shift-coffret-douche-aromatherapie-3669659.png?v=1787169803&width=480",
      pitch: "Le système SHIFT prêt à installer : pommeau filtrant, flexible 2 m, 3 filtres Pure Water et 6 capsules soin & aromathérapie.",
      variants: { all: 54532797301069 }, variantNote: "4 coloris au choix sur la fiche produit"
    },
    shiftSoin: {
      title: "SHIFT · Coffret Soin Douche Coréenne", handle: "pommeau-de-douche-filtrant-a-vitamine-c-aromatherapie", price: 59.9,
      img: IMG + "pommeau-de-douche-filtrant-a-vitamine-c-8567410.png?v=1779701776&width=480",
      pitch: "Le pommeau filtrant SHIFT avec une capsule pour commencer ton rituel dès le premier jour.",
      variants: { all: 53576794243405 }
    },
    pommeau: {
      title: "Onsha · Pommeau de Douche Filtrant", handle: "pommeau-de-douche-filtrant", price: 23.9,
      img: IMG + "onsha-pommeau-de-douche-filtrant-5452678.png?v=1790484198&width=480",
      pitch: "Un jet fin et uniforme grâce à ses 197 micro-trous. La base la plus simple pour une douche plus douce au quotidien.",
      variants: { all: 53576156774733 }
    },
    coffretNomade: {
      title: "Onsha · Coffret Douche Thermale Coréen (Nomade)", handle: "coffret-mini", price: 59.9,
      img: IMG + "onsha-coffret-douche-thermal-coreen-nomade-7120852.png?v=1791147377&width=480",
      pitch: "Le rituel thermal en format compact : douchette filtrante, filtres sédiments et capsules. Il te suit chez toi, à l'hôtel ou en location.",
      variants: { all: 53576645574989 }
    },
    setNomade: {
      title: "Onsha · Set Découverte Nomade", handle: "onsha-mini-decouverte-sullab-sunsoari", price: 29.9,
      img: IMG + "onsha-set-decouverte-nomade-6470897.jpg?v=1790484189&width=480",
      pitch: "La coque Nomade et quatre capsules thermales, une de chaque senteur : idéal pour trouver ta préférée.",
      variants: { all: 54487727178061 }
    },
    douchette: {
      title: "Onsha · Douchette Filtrante", handle: "douchette-filtrante", price: 23.9,
      img: IMG + "onsha-douchette-filtrante-3783139.png?v=1791147375&width=480",
      pitch: "Une douchette compacte au filtre intégré, qui se visse sur un flexible standard.",
      variants: { all: 53576176566605 }
    },
    robinet: {
      title: "Sullab · Filtre Robinet Lavabo", handle: "filtre-a-robinet-faucet-sullab-sunsoari", price: 25.9,
      img: IMG + "filtre-a-robinet-faucet-1360756.jpg?v=1779701782&width=480",
      pitch: "Pour ton rituel visage au lavabo : il se fixe sur le robinet et retient les sédiments et particules visibles. Sans plombier.",
      variants: { all: 53576773271885 }
    },
    filtreThermal: {
      title: "Onsha · Filtre Thermal Vitaminé (Home)", handle: "filtre-vitamine-showerfilter-sunsoari", price: 12.9,
      img: IMG + "onsha-filtre-thermal-vitamine-home-6907673.png?v=1791229949&width=480",
      pitch: "La recharge de ta coque Home.",
      variants: { hinoki: 54553817678157, ocean: 54553817710925, pin: 54553817743693, fleur: 53576547434829 }
    },
    filtreSans: {
      title: "Onsha · Filtre Thermal Vitaminé (Home) Sans Senteur", handle: "onsha-filtre-thermal-vitamine-sans-senteur", price: 12.9,
      img: IMG + "onsha-filtre-thermal-vitamine-sans-senteur-3597431.png?v=1790152818&width=480",
      pitch: "La recharge de ta coque Home, sans parfum ajouté.",
      variants: { all: 54813838147917 }
    },
    capsule: {
      title: "Onsha · Capsule Thermale Coréenne (Nomade)", handle: "capsule-vitaminee-shower-filter-sunsoari", price: 6.9,
      img: IMG + "onsha-capsule-thermale-coreenne-nomade-5997875.png?v=1791147395&width=480",
      pitch: "La recharge de ta coque Nomade.",
      variants: { hinoki: 54553818300749, ocean: 54553818333517, pin: 54553818366285, fleur: 53576407253325 }
    },
    sediment: {
      title: "Onsha · Filtres Sédiment x3 (Recharges Douchette)", handle: "filtre-sediment-recharge", price: 13.9,
      img: IMG + "onsha-filtre-sediment-recharge-douchette-5702371.jpg?v=1791147374&width=480",
      pitch: "Les recharges de ta douchette filtrante.",
      variants: { all: 53576179450189 }
    },
    pureWater: {
      title: "SHIFT · Pack 3 Filtres à Sédiments (Pure Water)", handle: "pack-3-sediments-pure-water", price: 25.9,
      img: IMG + "shift-pack-3-filtres-pure-water-4967086.jpg?v=1791229931&width=480",
      pitch: "Les recharges de ton pommeau SHIFT.",
      variants: { all: 53576814592333 }
    }
  };

  // Durées de remplacement : reprises des fiches produits (indications fabricant,
  // à ajuster selon la fréquence de douche). La cliente peut les modifier.
  var REFILLS = {
    filtreThermal: { label: "Filtre thermal Home", days: 28, hint: "environ 3 à 4 semaines selon ta fréquence de douche" },
    capsule: { label: "Capsule thermale Nomade", days: 12, hint: "environ 10 à 15 jours selon ta fréquence de douche" },
    sediment: { label: "Filtre sédiment douchette", days: 75, hint: "environ 2 à 3 mois selon ton eau" },
    pureWater: { label: "Filtre Pure Water SHIFT", days: 75, hint: "environ 2 à 3 mois selon ton eau" }
  };

  // ---------------------------------------------------------------------------
  // Sélection d'autres marques (non vendues sur Sunsoari).
  // Descriptions factuelles uniquement (format, usage), aucune promesse d'effet.
  // `url` vide → recherche Google Shopping (neutre, ne casse jamais).
  // Lien affilié : renseigner `url` et passer `affiliate: true` (mention affichée).
  // `for` : réponses du diagnostic auxquelles le produit correspond.
  // ---------------------------------------------------------------------------
  var EXT = [
    { brand: "Round Lab", name: "1025 Dokdo Cleanser", origin: "Corée", cat: "Visage",
      desc: "Nettoyant visage moussant, à utiliser matin et soir.", for: ["seche", "sensible", "normale"], url: "", affiliate: false },
    { brand: "Hada Labo", name: "Gokujyun Lotion", origin: "Japon", cat: "Visage",
      desc: "Lotion hydratante à l'acide hyaluronique, à appliquer après le nettoyage.", for: ["seche", "normale", "mixte"], url: "", affiliate: false },
    { brand: "COSRX", name: "Advanced Snail 96 Mucin Power Essence", origin: "Corée", cat: "Visage",
      desc: "Essence à la mucine d'escargot, texture fluide.", for: ["mixte", "normale"], url: "", affiliate: false },
    { brand: "Beauty of Joseon", name: "Relief Sun Rice + Probiotics SPF 50+", origin: "Corée", cat: "Visage",
      desc: "Crème solaire visage au riz, finition légère.", for: ["seche", "sensible", "mixte", "normale"], url: "", affiliate: false },
    { brand: "Nuhanciam", name: "Baume Corps Réparateur Intense", origin: "France", cat: "Corps",
      desc: "Baume corps au karité, pensé pour les peaux noires et métissées.", for: ["seche"], url: "", affiliate: false },
    { brand: "Les Secrets de Loly", name: "Kurl Nectar", origin: "France", cat: "Cheveux",
      desc: "Soin sans rinçage pour cheveux ondulés, bouclés, frisés et crépus. Marque fondée par Kelly Massol.", for: ["ondules", "boucles", "crepus"], url: "", affiliate: false },
    { brand: "Les Secrets de Loly", name: "Pink Paradise", origin: "France", cat: "Cheveux",
      desc: "Après-shampoing de la gamme cheveux bouclés.", for: ["ondules", "boucles"], url: "", affiliate: false },
    { brand: "Activilong", name: "Actiforce Masque-Soin", origin: "France", cat: "Cheveux",
      desc: "Masque au beurre de karité, conçu pour les cheveux bouclés, frisés et crépus.", for: ["crepus", "boucles", "secs"], url: "", affiliate: false }
  ];

  function externals(a) {
    var keys = [a.peau, a.texture, a.cheveux], picked = [], cats = {};
    EXT.forEach(function (p) {
      var hit = p.for.some(function (k) { return keys.indexOf(k) > -1; });
      if (hit && (cats[p.cat] || 0) < 2) { picked.push(p); cats[p.cat] = (cats[p.cat] || 0) + 1; }
    });
    return picked.slice(0, 4);
  }

  function extUrl(p) {
    return p.url || "https://www.google.com/search?tbm=shop&q=" + encodeURIComponent(p.brand + " " + p.name);
  }

  // ---------------------------------------------------------------------------
  // Questions du diagnostic
  // ---------------------------------------------------------------------------
  var QUESTIONS = [
    { id: "lieu", title: "Où vas-tu surtout l'utiliser ?", sub: "On adapte le format à ta salle de bain.",
      options: [["maison", "À la maison", "Ma douche de tous les jours"], ["voyage", "Souvent en déplacement", "Hôtel, location, salle de sport"], ["deux", "Les deux", "Un rituel à la maison et un qui me suit"]] },
    { id: "flexible", title: "Ta douche a-t-elle un flexible avec une douchette à main ?", sub: "C'est ce qui permet de visser nos pommeaux et coques de diffusion.",
      options: [["oui", "Oui", "Un tuyau souple et une douchette"], ["non", "Non", "Seulement une douche de tête fixe"], ["nsp", "Je ne sais pas", "On t'aide à vérifier"]] },
    { id: "eau", title: "Comment est l'eau chez toi ?", sub: "Indice : des traces blanches sur la robinetterie signalent souvent une eau calcaire.",
      link: ["Consulter la qualité de l'eau de ta commune", "https://www.eaupotable.sante.gouv.fr/"],
      options: [["douce", "Plutôt douce", "Peu de traces blanches"], ["moyenne", "Moyenne", "Un peu de calcaire"], ["calcaire", "Calcaire", "Traces blanches fréquentes"], ["nsp", "Je ne sais pas", ""]] },
    { id: "peau", title: "Après la douche, ta peau est plutôt…", sub: "Ton ressenti suffit. Ce n'est pas un diagnostic médical.",
      options: [["seche", "Sèche, elle tiraille", ""], ["sensible", "Sensible, vite inconfortable", ""], ["mixte", "Mixte à grasse", ""], ["normale", "Confortable", ""]] },
    { id: "texture", title: "Ta texture de cheveux ?", sub: "",
      options: [["raides", "Raides", ""], ["ondules", "Ondulés", ""], ["boucles", "Bouclés", ""], ["crepus", "Frisés à crépus", ""]] },
    { id: "cheveux", title: "Et leur état en ce moment ?", sub: "",
      options: [["secs", "Secs ou ternes", ""], ["colores", "Colorés ou décolorés", ""], ["fins", "Fins, vite plats", ""], ["ok", "Plutôt contente", ""]] },
    { id: "envies", title: "Qu'attends-tu de ta douche ?", sub: "Plusieurs choix possibles.", multi: true,
      options: [["senteur", "Un moment senteur", "Une douche qui sent bon"], ["chlore", "Moins de chlore", "Selon la fiche du fabricant"], ["soir", "Un rituel du soir", "Ralentir, se poser"], ["jet", "Un jet plus doux", "Un jet plus fin"], ["sansparfum", "Rien de parfumé", "Je préfère sans senteur"]] },
    { id: "senteur", title: "Quelle senteur t'attire ?", sub: "Tu pourras en changer à chaque recharge.", skipIf: function (a) { return (a.envies || []).indexOf("sansparfum") > -1; },
      options: [["hinoki", "Hinoki", "Bois clair, apaisant"], ["ocean", "Océan", "Frais, iodé"], ["pin", "Forêt de Pin", "Vert, résineux"], ["fleur", "Fleur de Prunier", "Floral, doux"], ["sans", "Sans senteur", ""]] },
    { id: "budget", title: "Pour commencer, ton budget ?", sub: "Tu pourras compléter ton rituel plus tard.",
      options: [["petit", "Moins de 30 €", ""], ["moyen", "30 à 60 €", ""], ["grand", "Plus de 60 €", ""]] }
  ];

  // ---------------------------------------------------------------------------
  // Logique de recommandation
  // ---------------------------------------------------------------------------
  function scentOf(a) {
    if ((a.envies || []).indexOf("sansparfum") > -1) return "sans";
    return a.senteur || "hinoki";
  }

  function recommend(a) {
    var s = scentOf(a), main, alts = [], extras = [], refills = [];
    var nomade = a.lieu === "voyage";

    if (nomade && s === "sans") {
      // Les capsules Nomade sont toutes parfumées : on propose la douchette seule.
      main = "douchette"; alts = ["premierHome"]; refills = ["sediment"];
    } else if (nomade) {
      main =a.budget === "petit" ? "setNomade" : "coffretNomade";
      alts = main === "setNomade" ? ["coffretNomade", "douchette"] : ["setNomade", "douchette"];
      refills = ["capsule", "sediment"];
    } else {
      main = a.budget === "petit" ? "premierHome" : a.budget === "moyen" ? "starterHome" : "coffretHome";
      if (main === "premierHome") alts = ["starterHome", "pommeau"];
      else if (main === "starterHome") alts = ["premierHome", "coffretHome"];
      else alts = ["starterHome", "shiftAroma"];
      refills = [s === "sans" ? "filtreSans" : "filtreThermal"];
      if (a.lieu === "deux") extras.push("setNomade");
    }
    if ((a.envies || []).indexOf("jet") > -1 && main !== "starterHome" && main !== "coffretHome" && alts.indexOf("pommeau") < 0) alts.push("pommeau");
    if (a.peau === "mixte" || a.peau === "sensible") extras.push("robinet");
    return { scent: s, main: main, alts: alts.slice(0, 3), extras: extras, refills: refills };
  }

  function insights(a) {
    var out = [];
    var eau = {
      douce: "Ton eau semble plutôt douce. Ton rituel peut se concentrer sur la sensorialité et le confort du jet.",
      moyenne: "Ton eau est moyennement calcaire. Pense à nettoyer régulièrement ton pommeau pour garder un jet régulier.",
      calcaire: "Ton eau semble calcaire. Bon à savoir : nos filtres de douche ne sont pas des adoucisseurs et ne retirent pas le calcaire de façon significative. Un détartrage régulier du pommeau aide à garder un jet régulier.",
      nsp: "Tu ne connais pas la dureté de ton eau : le site officiel eaupotable.sante.gouv.fr donne la qualité de l'eau de ta commune."
    }[a.eau];
    if (eau) out.push(["Ton eau", eau]);

    var peau = {
      seche: "Ta peau tiraille après la douche. Des gestes doux souvent conseillés : une eau tiède plutôt que très chaude, une douche courte, se sécher en tamponnant et appliquer un soin hydratant juste après.",
      sensible: "Ta peau est vite inconfortable. Si tu préfères éviter le parfum, choisis nos versions sans senteur. Chaque peau est différente : en cas d'inconfort qui dure, demande l'avis d'un dermatologue ou d'un pharmacien.",
      mixte: "Ta peau est mixte à grasse. Un nettoyage doux matin et soir, sans frotter, reste la base. Le filtre de robinet peut accompagner ton rituel visage au lavabo.",
      normale: "Ta peau est confortable. Ton rituel peut rester simple et sensoriel."
    }[a.peau];
    if (peau) out.push(["Ta peau", peau]);

    var tex = { raides: "raides", ondules: "ondulés", boucles: "bouclés", crepus: "frisés à crépus" }[a.texture] || "";
    var etat = {
      secs: "Les longueurs sèches aiment souvent une eau pas trop chaude, un soin après chaque shampoing et un masque une fois par semaine.",
      colores: "Les cheveux colorés aiment souvent une eau tiède et des produits adaptés à la coloration. Ton coiffeur ou ta coiffeuse reste la meilleure personne pour te conseiller.",
      fins: "Les cheveux fins préfèrent souvent des soins légers, appliqués surtout sur les longueurs.",
      ok: "Tes cheveux vont bien : garde ce qui marche pour toi."
    }[a.cheveux];
    if (etat) out.push(["Tes cheveux", (tex ? "Cheveux " + tex + ". " : "") + etat + (a.texture === "boucles" || a.texture === "crepus" ? " Pour les boucles et les cheveux crépus, beaucoup aiment espacer les shampoings et prévoir un moment soin dédié." : "")]);

    if (a.flexible === "non") out.push(["Ta douche", "Sans flexible, nos pommeaux et coques ne se fixent pas directement. Écris-nous avec une photo de ta douche : on vérifie la compatibilité avec toi avant tout achat."]);
    if (a.flexible === "nsp") out.push(["Ta douche", "Regarde si ta douchette est reliée au mur par un tuyau souple. Si oui, nos produits se vissent sur le raccord standard. Un doute ? Envoie-nous une photo."]);
    return out;
  }

  function weeklyRitual(a) {
    var g = [["douche", "Douche tiède et courte", [0, 1, 2, 3, 4, 5, 6]]];
    if (a.peau === "seche" || a.peau === "sensible") g.push(["hydrate", "Soin corps après la douche", [0, 1, 2, 3, 4, 5, 6]]);
    else g.push(["hydrate", "Soin corps après la douche", [0, 2, 4, 6]]);
    var masque = a.texture === "boucles" || a.texture === "crepus" || a.cheveux === "secs" ? [2, 6] : [6];
    g.push(["masque", "Moment soin cheveux", masque]);
    if ((a.envies || []).indexOf("soir") > -1 || (a.envies || []).indexOf("senteur") > -1) g.push(["soir", "Rituel senteur du soir", [4, 6]]);
    g.push(["pommeau", "Nettoyer le pommeau", a.eau === "calcaire" ? [5] : []]);
    return g.filter(function (x) { return x[2].length; });
  }

  // ---------------------------------------------------------------------------
  // Stockage (navigateur de la cliente uniquement, aucune donnée envoyée)
  // ---------------------------------------------------------------------------
  var KEY = "sunsoari-rituel-v1";
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(state) { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* stockage indisponible */ } }

  // ---------------------------------------------------------------------------
  // Utilitaires
  // ---------------------------------------------------------------------------
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function euro(n) { return n.toFixed(2).replace(".", ",") + " €"; }
  function today() { var d = new Date(); return d.toISOString().slice(0, 10); }
  function addDays(iso, n) { var d = new Date(iso + "T12:00:00"); d.setDate(d.getDate() + n); return d; }
  function frDate(d) { return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }); }
  function ymd(d) { return d.toISOString().slice(0, 10).replace(/-/g, ""); }
  var PLACEHOLDER = "data:image/svg+xml," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='#efe6d8'/><circle cx='50' cy='42' r='16' fill='#c9853f' opacity='.55'/><path d='M14 74c12-8 24-8 36 0s24 8 36 0' stroke='#2f6f7e' stroke-width='3' fill='none' opacity='.6'/></svg>");
  var DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  var CSS = [
    ":host{all:initial;display:block;min-width:0;max-width:100%;--sand:#efe6d8;--paper:#fbf8f3;--ink:#2b2622;--muted:#6f655c;--water:#2f6f7e;--water-soft:#dcebee;--sun:#c9853f;--line:#e2d8ca;--sage:#7d8f76;",
    "--display:'Instrument Serif',Georgia,'Times New Roman',serif;--body:'Figtree',system-ui,-apple-system,'Segoe UI',sans-serif;font-family:var(--body);color:var(--ink);font-size:16px;line-height:1.5}",
    "*{box-sizing:border-box}",
    ".wrap{background:var(--paper);border:1px solid var(--line);border-radius:20px;overflow:hidden;max-width:880px;margin:0 auto}",
    ".top{padding:24px 24px 0;background:linear-gradient(180deg,var(--sand),var(--paper))}",
    ".brand{display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap}",
    "h2{font-family:var(--display);font-weight:400;font-size:clamp(28px,6vw,40px);line-height:1.05;margin:0;text-wrap:balance}",
    ".brand span{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}",
    ".tabs{display:flex;gap:4px;margin-top:20px;overflow-x:auto}",
    ".tab{font:inherit;font-size:15px;border:0;background:transparent;color:var(--muted);padding:10px 14px;border-radius:12px 12px 0 0;cursor:pointer;white-space:nowrap}",
    ".tab[aria-selected=true]{background:var(--paper);color:var(--ink);font-weight:600}",
    ".tab:disabled{opacity:.45;cursor:not-allowed}",
    ".body{padding:24px}",
    ".progress{height:4px;background:var(--line);border-radius:4px;overflow:hidden;margin-bottom:20px}",
    ".progress i{display:block;height:100%;background:var(--water);transition:width .3s}",
    ".q h3{font-family:var(--display);font-weight:400;font-size:clamp(24px,5vw,30px);line-height:1.15;margin:0 0 6px;text-wrap:balance}",
    ".q p.sub{margin:0 0 16px;color:var(--muted)}",
    ".opts{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px}",
    ".opt{font:inherit;text-align:left;background:#fff;border:1.5px solid var(--line);border-radius:14px;padding:14px 16px;cursor:pointer;color:var(--ink);display:flex;flex-direction:column;gap:2px;min-height:64px}",
    ".opt small{color:var(--muted);font-size:13px}",
    ".opt:hover{border-color:var(--water)}",
    ".opt[aria-pressed=true]{border-color:var(--water);background:var(--water-soft)}",
    "button:focus-visible,a:focus-visible,input:focus-visible{outline:2px solid var(--water);outline-offset:2px}",
    ".nav{display:flex;justify-content:space-between;align-items:center;margin-top:20px;gap:12px}",
    ".btn{font:inherit;font-weight:600;border:0;border-radius:999px;padding:12px 20px;cursor:pointer;background:var(--water);color:#fff;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:44px}",
    ".btn.ghost{background:transparent;color:var(--water);border:1.5px solid var(--water)}",
    ".btn.link{background:transparent;color:var(--muted);padding:12px 4px;font-weight:400}",
    ".btn:disabled{opacity:.4;cursor:not-allowed}",
    ".ext{display:inline-block;margin:-6px 0 14px;color:var(--water);font-size:14px}",
    ".note{font-size:13px;color:var(--muted);background:var(--sand);border-radius:12px;padding:12px 14px;margin-top:20px}",
    ".grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}",
    ".ins{border-top:1px solid var(--line);padding-top:12px}",
    ".ins b{display:block;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--sun);margin-bottom:4px}",
    ".ins p{margin:0;font-size:15px}",
    "h4{font-family:var(--display);font-weight:400;font-size:26px;margin:28px 0 12px}",
    ".hero{display:grid;grid-template-columns:minmax(0,200px) minmax(0,1fr);gap:20px;background:#fff;border:1px solid var(--line);border-radius:18px;padding:16px;align-items:center}",
    ".hero img,.card img{width:100%;aspect-ratio:1;object-fit:contain;background:var(--sand);border-radius:12px;display:block}",
    ".tag{display:inline-block;font-size:12px;letter-spacing:.08em;text-transform:uppercase;background:var(--water-soft);color:var(--water);border-radius:999px;padding:3px 10px;margin-bottom:6px}",
    ".pt{font-weight:600;font-size:17px;margin:0 0 4px}",
    ".price{font-variant-numeric:tabular-nums;font-weight:600}",
    ".pp{margin:6px 0 12px;color:var(--muted);font-size:14px}",
    ".acts{display:flex;gap:8px;flex-wrap:wrap}",
    ".cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}",
    ".card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:12px;display:flex;flex-direction:column;gap:6px}",
    ".card .acts{margin-top:auto}",
    ".card .btn{padding:10px 14px;font-size:14px;flex:1}",
    ".mono{aspect-ratio:16/9;border-radius:12px;background:linear-gradient(135deg,var(--water-soft),var(--sand));display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;max-width:100%}",
    ".mono span{font-family:var(--display);font-size:34px;color:var(--water);line-height:1}",
    ".mono small{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}",
    ".disc{font-size:12px;color:var(--muted)}",
    ".refill{background:#fff;border:1px solid var(--line);border-radius:16px;padding:16px;display:grid;gap:10px}",
    ".refill .row{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline}",
    ".bar{height:8px;background:var(--water-soft);border-radius:8px;overflow:hidden}",
    ".bar i{display:block;height:100%;background:var(--water)}",
    ".bar.late i{background:var(--sun)}",
    ".fields{display:flex;gap:12px;flex-wrap:wrap;font-size:14px;color:var(--muted)}",
    ".fields label{display:flex;flex-direction:column;gap:4px}",
    "input{font:inherit;border:1.5px solid var(--line);border-radius:10px;padding:8px 10px;background:var(--paper);color:var(--ink);min-height:40px}",
    "input[type=number]{width:90px}",
    ".week{overflow-x:auto}",
    "table{border-collapse:collapse;width:100%;min-width:520px;font-size:14px}",
    "th,td{padding:8px 4px;text-align:center;border-bottom:1px solid var(--line)}",
    "th:first-child,td:first-child{text-align:left;padding-left:0}",
    "th{font-weight:600;color:var(--muted);font-size:12px;letter-spacing:.08em;text-transform:uppercase}",
    ".dot{width:30px;height:30px;border-radius:50%;border:1.5px solid var(--line);background:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font:inherit;color:#fff}",
    ".dot[aria-pressed=true]{background:var(--sage);border-color:var(--sage)}",
    ".empty{text-align:center;padding:32px 8px;color:var(--muted)}",
    ".foot{padding:14px 24px;border-top:1px solid var(--line);font-size:12px;color:var(--muted);display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap}",
    ".foot a{color:var(--muted)}",
    "@media (max-width:560px){.top,.body{padding-left:16px;padding-right:16px}.hero{grid-template-columns:1fr}.hero img{max-width:220px;margin:0 auto}}",
    "@media (prefers-reduced-motion:reduce){*{transition:none!important}}"
  ].join("");

  // ---------------------------------------------------------------------------
  // Widget
  // ---------------------------------------------------------------------------
  function Widget(host) {
    this.host = host;
    this.shop = (host.getAttribute("data-shop") || "https://sunsoari.fr").replace(/\/$/, "");
    this.contact = host.getAttribute("data-contact") || this.shop + "/pages/contact";
    this.root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
    this.state = load();
    if (!this.state.answers) this.state.answers = {};
    if (!this.state.refills) this.state.refills = {};
    if (!this.state.week) this.state.week = {};
    this.tab = this.state.done ? "reco" : "diag";
    this.step = 0;
    this.render();
    var self = this;
    this.root.addEventListener("click", function (e) { self.onClick(e); });
    this.root.addEventListener("change", function (e) { self.onChange(e); });
    // Image indisponible (réseau, aperçu) : on garde une vignette douce plutôt qu'un cadre vide.
    this.root.addEventListener("error", function (e) {
      if (e.target.tagName === "IMG" && !e.target.dataset.fallback) { e.target.dataset.fallback = "1"; e.target.src = PLACEHOLDER; }
    }, true);
  }

  Widget.prototype.visibleQuestions = function () {
    var a = this.state.answers;
    return QUESTIONS.filter(function (q) { return !(q.skipIf && q.skipIf(a)); });
  };

  Widget.prototype.url = function (key) {
    return this.shop + "/products/" + P[key].handle + "?utm_source=mon-rituel&utm_medium=widget";
  };

  Widget.prototype.variantFor = function (key, scent) {
    var v = P[key].variants;
    return v.all || v[scent] || v.hinoki;
  };

  Widget.prototype.cartUrl = function (variantId) {
    return this.shop + "/cart/" + variantId + ":1?utm_source=mon-rituel&utm_medium=widget";
  };

  Widget.prototype.render = function () {
    var done = !!this.state.done;
    var tabs = [["diag", "Mon diagnostic"], ["reco", "Mes recommandations"], ["plan", "Mon planner"]];
    var html = "<style>" + CSS + "</style><div class='wrap'><div class='top'><div class='brand'><h2>Mon Rituel</h2><span>par Sunsoari</span></div><div class='tabs' role='tablist'>";
    for (var i = 0; i < tabs.length; i++) {
      var t = tabs[i];
      html += "<button class='tab' role='tab' data-tab='" + t[0] + "' aria-selected='" + (this.tab === t[0]) + "'" + (!done && t[0] !== "diag" ? " disabled" : "") + ">" + t[1] + "</button>";
    }
    html += "</div></div><div class='body'>";
    html += this.tab === "diag" ? this.renderDiag() : this.tab === "reco" ? this.renderReco() : this.renderPlan();
    html += "</div><div class='foot'><span>Tes réponses restent dans ton navigateur. Aucune donnée n'est envoyée.</span><a href='" + esc(this.contact) + "' target='_blank' rel='noopener'>Une question ? Écris-nous</a></div></div>";
    this.root.innerHTML = html;
  };

  Widget.prototype.renderDiag = function () {
    var qs = this.visibleQuestions();
    if (this.step >= qs.length) this.step = qs.length - 1;
    var q = qs[this.step], a = this.state.answers[q.id];
    var pct = Math.round((this.step / qs.length) * 100);
    var html = "<div class='progress' aria-hidden='true'><i style='width:" + pct + "%'></i></div><div class='q'>";
    html += "<p class='sub' style='margin:0 0 6px;font-size:13px'>Question " + (this.step + 1) + " sur " + qs.length + "</p>";
    html += "<h3>" + esc(q.title) + "</h3>" + (q.sub ? "<p class='sub'>" + esc(q.sub) + "</p>" : "");
    if (q.link) html += "<a class='ext' href='" + q.link[1] + "' target='_blank' rel='noopener'>" + esc(q.link[0]) + " ↗</a>";
    html += "<div class='opts'>";
    for (var i = 0; i < q.options.length; i++) {
      var o = q.options[i];
      var on = q.multi ? (a || []).indexOf(o[0]) > -1 : a === o[0];
      html += "<button class='opt' data-q='" + q.id + "' data-v='" + o[0] + "' aria-pressed='" + on + "'>" + esc(o[1]) + (o[2] ? "<small>" + esc(o[2]) + "</small>" : "") + "</button>";
    }
    html += "</div></div><div class='nav'>";
    html += this.step > 0 ? "<button class='btn link' data-act='prev'>← Retour</button>" : "<span></span>";
    var ready = q.multi ? (a || []).length > 0 : !!a;
    if (q.multi || this.step === qs.length - 1) html += "<button class='btn' data-act='next'" + (ready ? "" : " disabled") + ">" + (this.step === qs.length - 1 ? "Voir mon rituel" : "Continuer") + "</button>";
    html += "</div><p class='note'>Ce diagnostic repose sur ton ressenti. Il ne remplace pas l'avis d'un ou d'une professionnelle de santé.</p>";
    return html;
  };

  Widget.prototype.productCard = function (key, scent, big) {
    var p = P[key], vid = this.variantFor(key, scent);
    var scentTxt = p.variants.all ? (p.variantNote || "") : "Senteur : " + SCENT_LABEL[p.variants[scent] ? scent : "hinoki"];
    var acts = "<div class='acts'><a class='btn' href='" + this.cartUrl(vid) + "' target='_top' data-add='" + vid + "'>Ajouter au panier</a><a class='btn ghost' href='" + this.url(key) + "' target='_blank' rel='noopener'>Voir</a></div>";
    if (big) {
      return "<div class='hero'><img src='" + p.img + "' alt='" + esc(p.title) + "' loading='lazy'><div><span class='tag'>Ton point de départ</span><p class='pt'>" + esc(p.title) + "</p><span class='price'>" + euro(p.price) + "</span>" + (scentTxt ? " · <small>" + esc(scentTxt) + "</small>" : "") + "<p class='pp'>" + esc(p.pitch) + "</p>" + acts + "</div></div>";
    }
    return "<div class='card'><img src='" + p.img + "' alt='" + esc(p.title) + "' loading='lazy'><p class='pt' style='font-size:15px'>" + esc(p.title) + "</p><span class='price'>" + euro(p.price) + "</span><p class='pp' style='margin:0'>" + esc(p.pitch) + "</p>" + acts + "</div>";
  };

  Widget.prototype.renderReco = function () {
    var a = this.state.answers, r = recommend(a), ins = insights(a), self = this;
    var html = "<div class='q'><h3>Ton rituel Sunsoari</h3><p class='sub'>D'après tes réponses. Tu peux refaire le diagnostic quand tu veux.</p></div>";
    html += "<div class='grid2'>" + ins.map(function (x) { return "<div class='ins'><b>" + esc(x[0]) + "</b><p>" + esc(x[1]) + "</p></div>"; }).join("") + "</div>";
    html += "<h4>Notre suggestion</h4>" + this.productCard(r.main, r.scent, true);
    html += "<h4>D'autres options qui pourraient te convenir</h4><div class='cards'>" + r.alts.concat(r.extras).map(function (k) { return self.productCard(k, r.scent); }).join("") + "</div>";
    var ext = externals(a);
    if (ext.length) {
      html += "<h4>Pour compléter, d'autres marques qu'on aime</h4><p class='sub' style='margin:-6px 0 12px;color:var(--muted)'>Non vendues sur Sunsoari. Des idées de K-beauty, J-beauty et de marques pensées pour les cheveux texturés et les peaux noires et métissées.</p><div class='cards'>";
      ext.forEach(function (p, i) {
        var initials = p.brand.split(" ").map(function (w) { return w[0]; }).join("").slice(0, 3);
        html += "<div class='card'><div class='mono'><span>" + esc(initials) + "</span><small>" + esc(p.origin) + " · " + esc(p.cat) + "</small></div>";
        html += "<p class='pt' style='font-size:15px;margin:0'>" + esc(p.name) + "</p><small style='color:var(--muted)'>" + esc(p.brand) + "</small><p class='pp' style='margin:0'>" + esc(p.desc) + "</p>";
        html += "<div class='acts'><a class='btn ghost' href='" + esc(extUrl(p)) + "' target='_blank' rel='noopener" + (p.affiliate ? " sponsored" : "") + "' data-ext='" + i + "'>Où l'acheter ↗</a></div>";
        html += p.affiliate ? "<small class='disc'>Lien affilié : Sunsoari peut toucher une commission.</small>" : "";
        html += "</div>";
      });
      html += "</div><p class='note' style='margin-top:12px'>Ces marques ne sont pas partenaires de Sunsoari. Vérifie toujours la liste des ingrédients et fais un test sur une petite zone avant un nouveau soin.</p>";
    }
    html += "<h4>Tes recharges, à prévoir</h4><div class='cards'>" + r.refills.map(function (k) { return self.productCard(k, r.scent); }).join("") + "</div>";
    html += "<div class='nav'><button class='btn link' data-act='restart'>Refaire le diagnostic</button><button class='btn' data-tab='plan'>Organiser mon planner →</button></div>";
    html += "<p class='note'>Un filtre de douche n'est ni un soin ni un dispositif médical. Les effets décrits sont ceux annoncés par les fabricants, et le ressenti varie d'une personne à l'autre.</p>";
    return html;
  };

  Widget.prototype.renderPlan = function () {
    var a = this.state.answers, r = recommend(a), self = this;
    var keys = r.refills.map(function (k) { return k === "filtreSans" ? "filtreThermal" : k; }).filter(function (k) { return REFILLS[k]; });
    if (r.main === "shiftAroma") keys = ["pureWater"];
    var html = "<div class='q'><h3>Mon planner</h3><p class='sub'>Tes recharges et ta semaine de soin, au même endroit.</p></div>";
    html += "<h4 style='margin-top:8px'>Mes recharges</h4><div class='grid2'>";
    keys.forEach(function (k) {
      var info = REFILLS[k], st = self.state.refills[k] || {};
      var start = st.start || "", days = st.days || info.days;
      html += "<div class='refill'><div class='row'><b>" + esc(info.label) + "</b><small style='color:var(--muted)'>" + esc(info.hint) + "</small></div>";
      html += "<div class='fields'><label for='rs-" + k + "'>Installée le<input type='date' id='rs-" + k + "' data-refill='" + k + "' data-f='start' value='" + start + "' max='" + today() + "'></label>";
      html += "<label for='rd-" + k + "'>À changer tous les (jours)<input type='number' min='1' max='365' id='rd-" + k + "' data-refill='" + k + "' data-f='days' value='" + days + "'></label></div>";
      if (start) {
        var next = addDays(start, +days), left = Math.ceil((next - new Date()) / 864e5);
        var pct = Math.max(0, Math.min(100, Math.round(100 - (left / days) * 100)));
        var txt = left > 1 ? "Prochaine recharge dans " + left + " jours, " + frDate(next) : left >= 0 ? "À changer très bientôt : " + frDate(next) : "À changer depuis " + (-left) + " jours";
        var gcal = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent("Changer mon " + info.label.toLowerCase() + " · Sunsoari") + "&dates=" + ymd(next) + "/" + ymd(addDays(next.toISOString().slice(0, 10), 1)) + "&details=" + encodeURIComponent("Recharge : " + self.url(k));
        html += "<div class='bar" + (left < 0 ? " late" : "") + "'><i style='width:" + pct + "%'></i></div><span>" + esc(txt) + "</span>";
        html += "<div class='acts'><a class='btn ghost' href='" + gcal + "' target='_blank' rel='noopener'>Ajouter à Google Agenda</a><button class='btn ghost' data-ics='" + k + "'>Fichier calendrier</button><a class='btn' href='" + self.url(k) + "' target='_blank' rel='noopener'>Racheter</a></div>";
      } else {
        html += "<span class='pp' style='margin:0'>Indique la date d'installation pour calculer ta prochaine recharge.</span>";
      }
      html += "</div>";
    });
    html += "</div>";

    var g = weeklyRitual(a), wk = this.state.week;
    html += "<h4>Ma semaine rituel</h4><p class='sub' style='margin-top:-6px;color:var(--muted)'>Coche ce que tu as fait. Les cases suggérées sont en contour plein, mais c'est toi qui décides.</p><div class='week'><table><thead><tr><th>Geste</th>" + DAYS.map(function (d) { return "<th>" + d + "</th>"; }).join("") + "</tr></thead><tbody>";
    g.forEach(function (row) {
      html += "<tr><td>" + esc(row[1]) + "</td>";
      for (var d = 0; d < 7; d++) {
        var id = row[0] + "-" + d, on = !!wk[id], sug = row[2].indexOf(d) > -1;
        html += "<td><button class='dot' data-week='" + id + "' aria-pressed='" + on + "' aria-label='" + esc(row[1]) + ", " + DAYS[d] + "' style='" + (sug && !on ? "border-color:var(--sage)" : "") + "'>" + (on ? "✓" : "") + "</button></td>";
      }
      html += "</tr>";
    });
    html += "</tbody></table></div><div class='nav'><button class='btn link' data-act='resetweek'>Nouvelle semaine</button><button class='btn ghost' data-tab='reco'>← Mes recommandations</button></div>";
    return html;
  };

  Widget.prototype.downloadIcs = function (k) {
    var info = REFILLS[k], st = this.state.refills[k];
    if (!st || !st.start) return;
    var next = addDays(st.start, +(st.days || info.days));
    var ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Sunsoari//Mon Rituel//FR", "BEGIN:VEVENT", "UID:" + k + "-" + ymd(next) + "@sunsoari", "DTSTAMP:" + ymd(new Date()) + "T000000Z",
      "DTSTART;VALUE=DATE:" + ymd(next), "SUMMARY:Changer mon " + info.label.toLowerCase() + " · Sunsoari", "DESCRIPTION:Recharge : " + this.url(k),
      "BEGIN:VALARM", "TRIGGER:-PT12H", "ACTION:DISPLAY", "DESCRIPTION:Recharge Sunsoari", "END:VALARM", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = "recharge-sunsoari.ics";
    document.body.appendChild(a); a.click(); a.remove();
  };

  Widget.prototype.emit = function (name, detail) {
    try { this.host.dispatchEvent(new CustomEvent("sunsoari:" + name, { detail: detail, bubbles: true, composed: true })); } catch (e) { /* ancien navigateur */ }
  };

  Widget.prototype.onClick = function (e) {
    var t = e.target.closest ? e.target.closest("button,a") : null;
    if (!t) return;
    var d = t.dataset, s = this.state;

    if (d.tab && !t.disabled) { this.tab = d.tab; this.render(); return; }
    if (d.q) {
      var q = QUESTIONS.filter(function (x) { return x.id === d.q; })[0];
      if (q.multi) {
        var cur = (s.answers[q.id] || []).slice(), i = cur.indexOf(d.v);
        if (i > -1) cur.splice(i, 1); else cur.push(d.v);
        s.answers[q.id] = cur; save(s); this.render(); return;
      }
      s.answers[q.id] = d.v; save(s);
      var qs = this.visibleQuestions();
      if (this.step < qs.length - 1) this.step++;
      this.render(); return;
    }
    if (d.act === "prev") { this.step = Math.max(0, this.step - 1); this.render(); return; }
    if (d.act === "next") {
      if (this.step < this.visibleQuestions().length - 1) { this.step++; }
      else { s.done = true; save(s); this.tab = "reco"; this.emit("result", { answers: s.answers, reco: recommend(s.answers) }); }
      this.render(); return;
    }
    if (d.act === "restart") { s.answers = {}; s.done = false; save(s); this.step = 0; this.tab = "diag"; this.render(); return; }
    if (d.act === "resetweek") { s.week = {}; save(s); this.render(); return; }
    if (d.week) { s.week[d.week] = !s.week[d.week]; save(s); this.render(); return; }
    if (d.ics) { this.downloadIcs(d.ics); return; }
    if (d.ext) { var x = externals(s.answers)[+d.ext]; if (x) this.emit("external_click", { brand: x.brand, product: x.name }); return; }
    if (d.add) {
      this.emit("add_to_cart", { variantId: +d.add });
      // Sur la boutique Shopify elle-même : ajout au panier sans quitter la page.
      if (window.Shopify && window.Shopify.shop && location.origin === this.shop) {
        e.preventDefault();
        var self = this;
        fetch("/cart/add.js", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: [{ id: +d.add, quantity: 1 }] }) })
          .then(function (r) { if (!r.ok) throw r; t.textContent = "Ajouté ✓"; document.dispatchEvent(new CustomEvent("cart:refresh")); })
          .catch(function () { location.href = self.cartUrl(d.add); });
      }
      // Ailleurs : le lien « panier permanent » Shopify ouvre la commande sur sunsoari.fr.
    }
  };

  Widget.prototype.onChange = function (e) {
    var d = e.target.dataset;
    if (!d.refill) return;
    var st = this.state.refills[d.refill] || {};
    st[d.f] = e.target.value;
    this.state.refills[d.refill] = st; save(this.state); this.render();
  };

  // Polices (chargées une fois dans la page hôte, utilisées dans le Shadow DOM).
  function loadFonts() {
    if (document.getElementById("sunsoari-rituel-fonts")) return;
    var l = document.createElement("link");
    l.id = "sunsoari-rituel-fonts"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Figtree:wght@400;600&family=Instrument+Serif&display=swap";
    document.head.appendChild(l);
  }

  function init() {
    loadFonts();
    var hosts = document.querySelectorAll("#sunsoari-rituel, [data-sunsoari-rituel]");
    for (var i = 0; i < hosts.length; i++) if (!hosts[i].__sunsoari) hosts[i].__sunsoari = new Widget(hosts[i]);
  }

  window.SunsoariRituel = { init: init, recommend: recommend, externals: externals, catalog: P, otherBrands: EXT };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
