/*!
 * Mon Rituel Sunsoari · version 3 (application)
 * Diagnostic visage, corps, cheveux et douche · mode photo local · catalogue Asie et Afrique ·
 * bibliothèque d'ingrédients · tendances · planner.
 * Un seul fichier, sans dépendance, isolé dans un Shadow DOM :
 *   <div id="sunsoari-rituel" data-shop="https://sunsoari.fr"></div>
 *   <script src="sunsoari-app.js" defer></script>
 */
(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // Catalogue (repris de la boutique Shopify, octobre 2026).
  // Pour mettre à jour : changer prix, images ou variantes ici.
  // ---------------------------------------------------------------------------
  var IMG = "https://cdn.shopify.com/s/files/1/0932/8191/1117/files/";
  // Photos d'ambiance Sunsoari (dossier img/ à côté du script). data-img-base="https://…/" pour un autre emplacement.
  var SCRIPT_BASE = ((document.currentScript && document.currentScript.src) || "").replace(/[^\/]*$/, "");
  var IMG_BASE = SCRIPT_BASE + "img/";
  function photo(name) { return IMG_BASE + name + ".webp"; }
  var AMB = { today: "pomme-de-douche-jet-fin-ambiance-douche", reveal: "pomme-de-douche-ambiance-douche-mains-fleur-de-prunier", shift: "shift-flexibles-couleurs-ambiance-salle-de-bain", plus: "shift-capsule-blossom-ambiance-fleurs-2" };
  // Photo de chaque produit Sunsoari ; sinon, le visuel de la fiche Shopify.
  var PROD_PHOTO = { premierHome: "premier-rituel-ocean-mains-insertion-2", starterHome: "filtre-thermal-ocean-ambiance", coffretHome: "filtre-thermal-hinoki-ambiance", shiftAroma: "shift-coffret-paysage", shiftSoin: "shift-pommeau-changement-capsule-mains", douchette: "pomme-de-douche-ambiance-douche-mains-fleur-de-prunier", filtreThermal: "filtre-thermal-fleur-de-prunier-ambiance-fleurs", filtreSans: "filtre-thermal-sans-senteur-ambiance-pierre", shiftCaps: "shift-capsule-decouverte-coffret-ambiance-fleurs", capsule: "filtre-thermal-foret-de-pin-ambiance-branche" };
  var SCENTS = ["hinoki", "ocean", "pin", "fleur", "sans"];
  var SCENT_LABEL = { hinoki: "Hinoki", ocean: "Océan", pin: "Forêt de Pin", fleur: "Fleur de Prunier", sans: "Sans senteur", patchouli: "Patchouli & Rose", fruite: "Fruité", decouverte: "Découverte (6 senteurs)" };
  var SHIFT_ONLY = ["patchouli", "fruite", "decouverte"];

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
      pitch: "Le système SHIFT complet, prêt à installer : pommeau filtrant, flexible silicone 2 m, 3 filtres Pure Water et 6 capsules soin & aromathérapie (2 Tea Tree & Lavender, 2 Basil & Grass, 2 Ginger & Bergamote). L'eau est filtrée, puis enrichie en actifs hydratants et en senteur.",
      variants: { all: 54532797301069 }, colors: [["Blanc", 54532797301069], ["Noir", 54532797268301], ["Rose", 54532797333837], ["Vert", 54532797366605]], variantNote: "4 coloris : blanc, noir, rose, vert", act: ["vitc", "aloe", "karite", "teatree"]
    },
    shiftSoin: {
      title: "SHIFT · Coffret Soin Douche Coréenne", handle: "pommeau-de-douche-filtrant-a-vitamine-c-aromatherapie", price: 59.9,
      img: IMG + "pommeau-de-douche-filtrant-a-vitamine-c-8567410.png?v=1779701776&width=480",
      pitch: "Le pommeau filtrant SHIFT au jet fin, un filtre Pure Water et une capsule Tea Tree & Lavender : tout pour commencer le rituel coréen.", act: ["vitc", "aloe", "teatree"],
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
    shiftCaps: {
      title: "SHIFT · Pack 6 Capsules Soin & Aromathérapie", handle: "pack-6-capsules-vitaminees-shift-sunsoari", price: 32.9,
      img: IMG + "shift-6-capsules-aromatherapie-vitamine-c-3834627.jpg?v=1791181284&width=480",
      pitch: "Six capsules à base d'actifs hydratants et de vitamine C, avec leurs huiles essentielles.", act: ["vitc", "aloe", "karite", "teatree"],
      variants: { hinoki: 54487730520397, fleur: 54487735533901, patchouli: 54487733895501, fruite: 54487733600589, decouverte: 54487733174605, ocean: 54487733174605, pin: 54487733174605, sans: 54487733174605 },
      scents: [["hinoki", "Hinoki Spring"], ["fleur", "Cherry Blossom"], ["patchouli", "Patchouli & Rose"], ["fruite", "Fruité"], ["decouverte", "Découverte · 6 senteurs"]],
      scentLabel: function (s) { return "Collection : " + ({ hinoki: "Hinoki Spring", fleur: "Cherry Blossom", patchouli: "Patchouli & Rose", fruite: "Fruité" }[s] || "Découverte"); }
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

  var ICONS = {
    home: "<path d='M4 11l8-7 8 7v9H4z'/><path d='M10 20v-6h4v6'/>",
    plane: "<path d='M3 13l18-7-7 18-2-8z'/>",
    both: "<path d='M3 12l6-5 6 5v7H3z'/><path d='M14 9l7-3-3 7'/>",
    yes: "<path d='M5 12l5 5 9-10'/>",
    no: "<path d='M6 6l12 12M18 6L6 18'/>",
    ask: "<circle cx='12' cy='12' r='9'/><path d='M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6M12 17h.01'/>",
    drop: "<path d='M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z'/>",
    drops: "<path d='M8 4s4 5 4 8a4 4 0 0 1-8 0c0-3 4-8 4-8z'/><path d='M17 9s3 3.5 3 5.5a3 3 0 0 1-6 0c0-2 3-5.5 3-5.5z'/>",
    dots: "<circle cx='7' cy='8' r='1.2'/><circle cx='15' cy='6' r='1.2'/><circle cx='11' cy='13' r='1.2'/><circle cx='17' cy='16' r='1.2'/><circle cx='7' cy='17' r='1.2'/>",
    flame: "<path d='M12 3c1 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-4 3-6 1 2 2 2 3 1-1-2 0-4 0-6z'/>",
    halfsun: "<circle cx='12' cy='12' r='4'/><path d='M12 8v8' /><path d='M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5'/>",
    wave: "<path d='M3 9c3-3 6 3 9 0s6 3 9 0M3 15c3-3 6 3 9 0s6 3 9 0'/>",
    spots: "<circle cx='8' cy='9' r='4'/><circle cx='16' cy='15' r='4'/><circle cx='8' cy='18' r='2'/>",
    leaf: "<path d='M5 19C5 9 11 5 20 4c-1 9-5 15-15 15z'/><path d='M5 19l8-8'/>",
    sun: "<circle cx='12' cy='12' r='4'/><path d='M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5'/>",
    moon: "<path d='M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10z'/>",
    sunmoon: "<circle cx='9' cy='12' r='4'/><path d='M9 3v2M9 19v2M2 12h2M3.5 6.5L5 8M3.5 17.5L5 16'/><path d='M21 15a5 5 0 0 1-6-7 5 5 0 1 0 6 7z'/>",
    sprout: "<path d='M12 21v-8'/><path d='M12 13c0-4-3-6-7-6 0 4 3 6 7 6zM12 11c0-4 3-6 7-6 0 4-3 6-7 6z'/>",
    straight: "<path d='M7 3v18M12 3v18M17 3v18'/>",
    wavy: "<path d='M7 3c-2 4 2 6 0 9s2 6 0 9M12 3c-2 4 2 6 0 9s2 6 0 9M17 3c-2 4 2 6 0 9s2 6 0 9'/>",
    curly: "<path d='M8 3a3 3 0 1 0 0 6 3 3 0 1 1 0 6 3 3 0 1 0 0 6M16 3a3 3 0 1 0 0 6 3 3 0 1 1 0 6 3 3 0 1 0 0 6'/>",
    coily: "<path d='M6 4c3 0 3 3 0 3s-3 3 0 3 3 3 0 3-3 3 0 3 3 3 0 3M13 4c3 0 3 3 0 3s-3 3 0 3 3 3 0 3-3 3 0 3 3 3 0 3M20 4c-3 0-3 3 0 3'/>",
    dry: "<path d='M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z'/><path d='M9 14l6-3'/>",
    color: "<circle cx='12' cy='12' r='8'/><path d='M12 4a8 8 0 0 1 0 16z' fill='currentColor'/>",
    thin: "<path d='M12 3v18'/><path d='M9 6c1 2 1 4 0 6'/>",
    heart: "<path d='M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z'/>",
    flower: "<circle cx='12' cy='12' r='2.5'/><path d='M12 9.5C10 4 14 4 12 9.5M14.5 12C20 10 20 14 14.5 12M12 14.5C14 20 10 20 12 14.5M9.5 12C4 14 4 10 9.5 12'/>",
    tree: "<path d='M12 3l6 9h-4l4 6H6l4-6H6z'/><path d='M12 18v3'/>",
    shower: "<path d='M4 20V8a4 4 0 0 1 8 0'/><path d='M9 8h6'/><path d='M10 12v1M12 12v2M14 12v1M11 16v1M13 16v1'/>",
    none: "<circle cx='12' cy='12' r='8'/><path d='M7 17L17 7'/>",
    coin: "<circle cx='12' cy='12' r='8'/><path d='M14.5 9.5a3 3 0 1 0 0 5M8 11h5M8 13h5'/>"
  };
  function icon(name) { return name && ICONS[name] ? "<svg viewBox='0 0 24 24' aria-hidden='true'>" + ICONS[name] + "</svg>" : ""; }

  var PLACEHOLDER = "data:image/svg+xml," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='#efe6d8'/><circle cx='50' cy='42' r='16' fill='#c9853f' opacity='.55'/><path d='M14 74c12-8 24-8 36 0s24 8 36 0' stroke='#2f6f7e' stroke-width='3' fill='none' opacity='.6'/></svg>");
  var DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  var CSS = [
    ":host{all:initial;display:block;min-width:0;max-width:100%;--sand:#efe6d8;--sand-soft:#f6f1ea;--paper:#fbf8f3;--ink:#2b2622;--muted:#6f655c;--water:#2f6f7e;--water-soft:#dcebee;--sun:#c9853f;--line:#e2d8ca;--sage:#7d8f76;",
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
    ".qhead{display:flex;align-items:center;gap:12px;margin-bottom:18px}",
    ".back{width:40px;height:40px;border-radius:50%;border:0;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--ink);flex:none}",
    ".back:disabled{opacity:.25;cursor:default}",
    ".back svg,.ico svg,.facts svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}",
    ".segs{display:flex;gap:6px;flex:1}",
    ".seg{flex:1;height:4px;background:var(--line);border-radius:4px;overflow:hidden}",
    ".seg i{display:block;height:100%;background:var(--water);border-radius:4px;transition:width .35s}",
    ".kicker{margin:0 0 6px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--sun)}",
    ".ico{width:40px;height:40px;flex:none;display:flex;align-items:center;justify-content:center;color:var(--sun)}",
    ".lbl{flex:1;display:flex;flex-direction:column;gap:2px;font-size:17px}",
    ".rad,.chk{width:26px;height:26px;border:1.5px solid var(--line);border-radius:50%;flex:none;transition:all .2s}",
    ".chk{border-radius:8px}",
    ".opt[aria-pressed=true] .rad{border:8px solid var(--water)}",
    ".opt[aria-pressed=true] .chk{background:var(--water) url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3'%3E%3Cpath d='M5 12l5 5 9-10'/%3E%3C/svg%3E\") center/16px no-repeat;border-color:var(--water)}",
    ".cta{position:sticky;bottom:0;padding:16px 0 4px;background:linear-gradient(transparent,var(--paper) 30%);margin-top:8px}",
    ".btn.big{width:100%;min-height:56px;font-size:17px;box-shadow:0 10px 28px -10px rgba(47,111,126,.55)}",
    ".info{display:flex;flex-direction:column;gap:14px;padding:8px 0}",
    ".info h3{font-family:var(--display);font-weight:400;font-size:clamp(28px,6vw,36px);line-height:1.1;margin:0;text-wrap:balance}",
    ".center{text-align:center}",
    ".facts{list-style:none;margin:0;padding:0;display:grid;gap:12px}",
    ".facts li{display:flex;gap:14px;align-items:flex-start;background:#fff;border-radius:18px;padding:16px;color:var(--ink)}",
    ".facts svg{color:var(--water);flex:none}",
    ".ringwrap{position:relative;width:180px;height:180px;margin:8px auto}",
    ".ringwrap.small{width:130px;height:130px}",
    ".ring{width:100%;height:100%}",
    ".ring circle{fill:none;stroke-width:9}",
    ".ring .rt{stroke:var(--water-soft)}",
    ".ring .rv{stroke:var(--water);stroke-linecap:round;transition:stroke-dasharray .8s ease}",
    ".ringtxt{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}",
    ".ringtxt b{font-family:var(--display);font-weight:400;font-size:40px;line-height:1;font-variant-numeric:tabular-nums}",
    ".small .ringtxt b{font-size:30px}",
    ".ringtxt small{font-size:12px;color:var(--muted)}",
    ".chips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}",
    ".chips span{background:var(--water-soft);color:var(--water);border-radius:999px;padding:6px 14px;font-size:14px}",
    ".q h3{font-family:var(--display);font-weight:400;font-size:clamp(24px,5vw,30px);line-height:1.15;margin:0 0 6px;text-wrap:balance}",
    ".q p.sub{margin:0 0 16px;color:var(--muted)}",
    ".opts{display:grid;gap:10px}",
    ".opt{font:inherit;text-align:left;background:#fff;border:1.5px solid transparent;border-radius:999px;padding:12px 18px 12px 14px;cursor:pointer;color:var(--ink);display:flex;align-items:center;gap:14px;min-height:72px;box-shadow:0 2px 10px -4px rgba(43,38,34,.12);transition:border-color .2s,background .2s}",
    ".opt small{color:var(--muted);font-size:13px}",
    ".body{background:var(--sand-soft)}",
    ".body.paper{background:var(--paper)}",
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
    ".made{align-self:flex-start;font-size:12px;background:#f3e3cf;color:#8a5526;border-radius:999px;padding:3px 10px}",
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
    "h5{font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--sun);margin:22px 0 10px;font-weight:600}",
    ".why{font-size:13px;color:var(--water);margin:4px 0 0;font-weight:600}",
    ".why.big{font-size:14px;margin:-4px 0 12px}",
    ".vs{font-size:12px;color:var(--muted);margin:2px 0 0;font-style:italic}",
    ".acts-ing{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}",
    ".ingchip{font:inherit;font-size:12px;border:1px solid var(--line);background:var(--sand-soft);color:var(--ink);border-radius:999px;padding:4px 10px;cursor:pointer}",
    ".ingchip:hover{border-color:var(--water)}",
    ".chipset{display:flex;flex-wrap:wrap;gap:8px;margin:4px 0 14px}",
    ".chip{font:inherit;font-size:14px;border:1.5px solid var(--line);background:#fff;color:var(--ink);border-radius:999px;padding:8px 14px;cursor:pointer;min-height:40px}",
    ".chip[aria-pressed=true]{border-color:var(--water);background:var(--water-soft);color:var(--water)}",
    ".mirror{position:relative;aspect-ratio:3/4;max-width:340px;margin:0 auto;border-radius:28px;overflow:hidden;background:linear-gradient(160deg,var(--sand),var(--water-soft))}",
    ".mirror img{width:100%;height:100%;object-fit:cover;display:block}",
    ".silh{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:10px;color:var(--muted);font-size:12px;text-align:center;padding:0 24px 12px}",
    ".silh svg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:120px;height:120px;fill:none;stroke:var(--sun);stroke-width:.6;opacity:.35}",
    ".zone{position:absolute;transform:translate(-50%,-50%);font:inherit;font-size:12px;font-weight:600;border:0;border-radius:999px;padding:6px 10px;background:rgba(255,255,255,.88);color:var(--ink);cursor:pointer;box-shadow:0 4px 14px -6px rgba(0,0,0,.35);white-space:nowrap}",
    ".zone.marked{background:var(--water);color:#fff}",
    ".zone.on{outline:2px solid var(--sun);outline-offset:2px}",
    ".photoacts{display:flex;justify-content:center;margin:14px 0 4px}",
    ".obs{background:#fff;border-radius:18px;padding:14px;margin-top:12px}",
    ".obs p{margin:0 0 10px}",
    ".compare{background:#fff;border:1px solid var(--line);border-radius:16px;padding:12px 16px;margin-top:12px}",
    ".compare summary{cursor:pointer;font-weight:600;color:var(--water)}",
    ".cmpgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-top:12px}",
    ".cmp{border:1.5px solid var(--line);border-radius:14px;padding:12px}",
    ".cmp.on{border-color:var(--water);background:var(--water-soft)}",
    ".cmp ul{margin:8px 0;padding-left:18px;font-size:14px}",
    ".cmp small{color:var(--muted)}",
    ".inglist{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px}",
    ".ingrow{font:inherit;text-align:left;display:flex;justify-content:space-between;align-items:center;gap:10px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:12px 14px;cursor:pointer;color:var(--ink)}",
    ".ingrow span{display:flex;flex-direction:column;gap:2px;min-width:0}",
    ".ingrow small{color:var(--muted);font-size:12px}",
    ".ingrow em{font-style:normal;font-size:12px;color:var(--water);white-space:nowrap}",
    ".sheetbg{position:fixed;inset:0;background:rgba(43,38,34,.35);z-index:20}",
    ".sheet{position:fixed;left:50%;bottom:0;transform:translateX(-50%);width:min(560px,100%);max-height:80vh;overflow:auto;background:var(--paper);border-radius:24px 24px 0 0;padding:22px 20px calc(22px + env(safe-area-inset-bottom,0px));z-index:21;box-shadow:0 -12px 40px -12px rgba(0,0,0,.3)}",
    ".sheet h3{font-family:var(--display);font-weight:400;font-size:30px;margin:6px 0 10px}",
    ".sheet p{margin:0 0 10px;font-size:15px}",
    ".sheet a{color:var(--water)}",
    ".care{background:var(--sand);border-radius:12px;padding:10px 12px}",
    ".x{position:absolute;top:10px;right:12px;width:40px;height:40px;border:0;background:transparent;font-size:26px;cursor:pointer;color:var(--muted)}",
    ".trend-card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:4px}",
    ".made.trend{background:var(--water-soft);color:var(--water)}",
    "@media (max-width:560px){.top,.body{padding-left:16px;padding-right:16px}.hero{grid-template-columns:1fr}.hero img{max-width:220px;margin:0 auto}}",
    "@media (prefers-reduced-motion:reduce){*{transition:none!important}}",
    ".opt:active{transform:scale(.99)}"
  ].join("");

  // ---------------------------------------------------------------------------
  // BIBLIOTHÈQUE D'INGRÉDIENTS
  // Rôle cosmétique courant, formulé avec prudence. Pas d'effet garanti.
  // ---------------------------------------------------------------------------
  var ING = {
    hyaluronique: { n: "Acide hyaluronique", f: "Hydratation", what: "Molécule naturellement présente dans la peau, capable de retenir beaucoup d'eau.", use: "Souvent utilisé pour hydrater les couches superficielles de la peau et donner une sensation de peau repulpée.", care: "Bien toléré en général. Applique-le sur peau légèrement humide puis scelle avec une crème.", reg: "Partout" },
    ceramides: { n: "Céramides", f: "Barrière cutanée", what: "Lipides qui font partie du « ciment » entre les cellules de la couche superficielle de la peau.", use: "Souvent utilisés dans les soins pour peaux sèches ou sensibles, pour soutenir la barrière cutanée.", care: "Bien tolérés en général. Très présents en K-beauty et en J-beauty.", reg: "Corée, Japon" },
    niacinamide: { n: "Niacinamide (vitamine B3)", f: "Polyvalent", what: "Forme de vitamine B3 utilisée dans de nombreux sérums.", use: "Souvent utilisée pour l'éclat, le grain de peau, l'excès de sébum et l'apparence des marques.", care: "Commence par une concentration modérée : à forte dose, certaines peaux picotent.", reg: "Partout" },
    centella: { n: "Centella asiatica", f: "Apaisant", what: "Plante traditionnellement utilisée en Asie, riche en madécassoside et asiaticoside.", use: "Souvent choisie pour les peaux sensibles ou sujettes aux rougeurs, pour une sensation apaisée.", care: "Rarement irritante. Un incontournable de la K-beauty.", reg: "Corée" },
    heartleaf: { n: "Houttuynia (heartleaf)", f: "Apaisant", what: "Plante d'Asie de l'Est, appelée « heartleaf » pour la forme de ses feuilles.", use: "Utilisée dans des toniques pour peaux sensibles ou mixtes, pour une sensation apaisée.", care: "Bien tolérée en général. Très tendance dans les toniques coréens.", reg: "Corée" },
    mucine: { n: "Mucine d'escargot", f: "Hydratation", what: "Filtrat de sécrétion d'escargot, riche en glycoprotéines.", use: "Utilisée pour hydrater et pour une sensation de peau plus souple et plus lisse.", care: "Ne convient pas si tu évites les ingrédients d'origine animale.", reg: "Corée" },
    propolis: { n: "Propolis", f: "Apaisant", what: "Résine récoltée par les abeilles.", use: "Utilisée pour une sensation de peau apaisée et lumineuse.", care: "À éviter si tu es allergique aux produits de la ruche.", reg: "Corée" },
    riz: { n: "Riz (extraits, eau, ferments)", f: "Éclat", what: "Ingrédient historique des rituels de beauté en Asie de l'Est.", use: "Utilisé pour l'éclat et la douceur de la peau.", care: "Bien toléré en général.", reg: "Corée, Japon" },
    ferments: { n: "Ferments (galactomyces, riz…)", f: "Éclat", what: "Ingrédients obtenus par fermentation, très présents en J-beauty et K-beauty.", use: "Utilisés pour l'éclat et le confort de la peau.", care: "Teste d'abord sur une petite zone si ta peau est réactive.", reg: "Japon, Corée" },
    vitc: { n: "Vitamine C", f: "Éclat · taches", what: "Antioxydant, sous forme pure (acide ascorbique) ou de dérivés plus doux.", use: "Souvent utilisée pour l'éclat et l'apparence des taches.", care: "Peut picoter. Garde le flacon à l'abri de la lumière. Protection solaire le matin indispensable.", reg: "Partout" },
    tranexamique: { n: "Acide tranexamique", f: "Taches", what: "Actif venu du monde médical, devenu courant en cosmétique.", use: "Utilisé dans des soins qui ciblent l'apparence des taches et du teint inégal.", care: "Les taches ont des causes variées : demande l'avis d'un ou d'une dermatologue si elles changent.", reg: "Corée, Japon" },
    arbutine: { n: "Alpha-arbutine", f: "Taches", what: "Molécule qui freine la production de mélanine, très utilisée dans les sérums anti-taches.", use: "Utilisée pour l'apparence des taches et du teint inégal, souvent dès les premières marques.", care: "Plutôt bien tolérée. À associer à une protection solaire quotidienne.", reg: "Partout" },
    thiamidol: { n: "Thiamidol", f: "Taches", what: "Actif breveté par Beiersdorf (Nivea, Eucerin), qui agit sur une enzyme de la pigmentation.", use: "Utilisé dans des soins qui ciblent l'apparence des taches.", care: "Résultats progressifs, sur plusieurs semaines. Protection solaire indispensable.", reg: "Europe" },
    kojique: { n: "Acide kojique", f: "Taches", what: "Actif issu de la fermentation, traditionnel au Japon.", use: "Utilisé pour l'apparence des taches, souvent en association.", care: "Peut irriter les peaux sensibles, surtout en savon très concentré. Teste toujours avant.", reg: "Japon, Asie" },
    reglisse: { n: "Réglisse (extrait de racine)", f: "Taches · apaisant", what: "Extrait de plante utilisé à la fois pour unifier et pour apaiser.", use: "Utilisé pour le teint inégal et les peaux réactives.", care: "Généralement bien tolérée.", reg: "Asie, Europe" },
    retinoides: { n: "Rétinoïdes (rétinol, rétinal)", f: "Anti-âge", what: "Dérivés de la vitamine A, parmi les actifs anti-âge les plus étudiés.", use: "Utilisés pour le grain de peau et l'apparence des ridules.", care: "Pas pendant la grossesse ni l'allaitement. Introduis-les progressivement, le soir, et protège-toi du soleil le jour.", reg: "Partout" },
    bakuchiol: { n: "Bakuchiol", f: "Anti-âge", what: "Extrait végétal souvent présenté comme une alternative douce au rétinol.", use: "Utilisé pour le grain de peau et la souplesse.", care: "Les études restent moins nombreuses que pour le rétinol.", reg: "Partout" },
    aha: { n: "AHA (acides glycolique, lactique)", f: "Exfoliant", what: "Acides de fruits qui exfolient la surface de la peau.", use: "Utilisés pour le grain de peau et l'éclat.", care: "Peuvent irriter : commence 1 à 2 fois par semaine. Protection solaire indispensable.", reg: "Partout" },
    bha: { n: "BHA (acide salicylique)", f: "Exfoliant", what: "Acide qui agit aussi dans les pores.", use: "Souvent utilisé pour les peaux mixtes à grasses et sujettes aux imperfections.", care: "Commence doucement. Enceinte ? Demande l'avis de ton ou ta médecin.", reg: "Partout" },
    pha: { n: "PHA (gluconolactone)", f: "Exfoliant doux", what: "Acide exfoliant à grosse molécule, réputé plus doux.", use: "Utilisé pour le grain de peau des peaux sensibles.", care: "Plus doux que les AHA mais reste un exfoliant.", reg: "Corée" },
    azelaique: { n: "Acide azélaïque", f: "Imperfections · rougeurs", what: "Acide présent naturellement dans certaines céréales.", use: "Utilisé en cosmétique pour le teint inégal et les imperfections.", care: "Les fortes concentrations relèvent d'une prescription médicale.", reg: "Partout" },
    pdrn: { n: "PDRN", f: "Tendance", what: "Fragments d'ADN, souvent issus du saumon, passés des cabinets esthétiques coréens aux cosmétiques.", use: "Mis en avant pour le confort et la souplesse de la peau.", care: "Très à la mode, mais les preuves cliniques en cosmétique restent limitées et varient selon les formules.", reg: "Corée" },
    panthenol: { n: "Panthénol (B5)", f: "Apaisant", what: "Forme de vitamine B5.", use: "Utilisé pour le confort des peaux sèches ou sensibilisées.", care: "Très bien toléré en général.", reg: "Partout" },
    squalane: { n: "Squalane", f: "Nutrition", what: "Huile légère proche d'un composant du sébum.", use: "Utilisé pour nourrir sans effet gras.", care: "Bien toléré en général.", reg: "Partout" },
    spf: { n: "Filtres solaires", f: "Protection", what: "Molécules qui filtrent les UV.", use: "La protection solaire quotidienne est le geste le plus conseillé contre les taches et le vieillissement lié au soleil, sur toutes les carnations.", care: "Les formules vendues en Asie peuvent différer des versions européennes : vérifie l'emballage.", reg: "Japon, Corée" },
    karite: { n: "Beurre de karité", f: "Nutrition", what: "Beurre extrait des noix de l'arbre à karité, en Afrique de l'Ouest.", use: "Utilisé pour nourrir la peau et les longueurs des cheveux.", care: "Riche : sur le visage, il peut ne pas convenir aux peaux grasses.", reg: "Afrique de l'Ouest" },
    savonnoir: { n: "Savon noir africain", f: "Nettoyant", what: "Savon traditionnel d'Afrique de l'Ouest, à base de cendres végétales et d'huiles.", use: "Utilisé pour nettoyer la peau et le cuir chevelu.", care: "Peut dessécher certaines peaux : suis-le d'un soin hydratant.", reg: "Afrique de l'Ouest" },
    argan: { n: "Huile d'argan", f: "Nutrition", what: "Huile pressée à partir des amandes de l'arganier, au Maroc.", use: "Utilisée pour nourrir les longueurs, la peau du corps et parfois le visage.", care: "Quelques gouttes suffisent.", reg: "Maroc" },
    marula: { n: "Huile de marula", f: "Nutrition", what: "Huile du fruit du marula, en Afrique australe.", use: "Utilisée pour nourrir la peau, avec un toucher assez léger.", care: "Bien tolérée en général.", reg: "Afrique australe" },
    baobab: { n: "Huile de baobab", f: "Nutrition", what: "Huile des graines du baobab.", use: "Utilisée pour la peau sèche et les cheveux.", care: "Bien tolérée en général.", reg: "Afrique" },
    moringa: { n: "Moringa", f: "Nutrition", what: "Arbre cultivé en Afrique et en Asie, utilisé en huile ou en extrait.", use: "Utilisé dans des soins nourrissants pour la peau et les cheveux.", care: "Bien toléré en général.", reg: "Afrique, Asie" },
    ricin: { n: "Huile de ricin", f: "Cheveux", what: "Huile épaisse, très utilisée dans les routines des cheveux texturés (dont la version « jamaïcaine », torréfiée).", use: "Utilisée pour nourrir les longueurs et les sourcils.", care: "Très épaisse : quelques gouttes suffisent, plutôt sur les longueurs.", reg: "Caraïbes, Afrique, Inde" },
    chebe: { n: "Poudre de chébé", f: "Cheveux", what: "Mélange de graines et de plantes utilisé traditionnellement par des femmes du Tchad pour les longueurs.", use: "Appliquée sur les longueurs pour les protéger de la casse dans les rituels traditionnels.", care: "Les promesses de pousse ne sont pas prouvées. Ne l'applique pas sur le cuir chevelu irrité.", reg: "Tchad" },
    camelia: { n: "Huile de camélia (tsubaki)", f: "Cheveux", what: "Huile utilisée depuis longtemps au Japon pour les cheveux.", use: "Utilisée pour la douceur et la brillance des cheveux.", care: "Bien tolérée en général.", reg: "Japon" },
    romarin: { n: "Romarin", f: "Cuir chevelu", what: "Plante aromatique, en extrait ou en huile.", use: "Très tendance dans les soins du cuir chevelu.", care: "Les promesses de pousse ne sont pas prouvées. L'huile essentielle peut irriter.", reg: "Partout" },
    teatree: { n: "Tea tree (huile essentielle)", f: "Purifiant", what: "Huile essentielle de l'arbre à thé australien.", use: "Utilisée dans des soins pour peaux à imperfections et pour sa senteur fraîche.", care: "Allergène possible. Huiles essentielles : prudence si tu es enceinte, allaitante ou si ta peau réagit aux parfums.", reg: "Partout" },
    aloe: { n: "Aloe vera", f: "Hydratation", what: "Gel issu des feuilles de l'aloès.", use: "Utilisé pour la sensation de fraîcheur et d'hydratation.", care: "Bien toléré en général.", reg: "Partout" },
    olive: { n: "Huile d'olive", f: "Démaquillant", what: "Huile végétale riche en lipides.", use: "Utilisée dans les huiles démaquillantes pour dissoudre maquillage et protection solaire.", care: "Rince bien après usage.", reg: "Partout" },
    ginseng: { n: "Ginseng", f: "Énergie · éclat", what: "Racine emblématique de la pharmacopée coréenne.", use: "Utilisé pour l'éclat et la sensation de peau tonifiée.", care: "Bien toléré en général.", reg: "Corée" }
  };

  // ---------------------------------------------------------------------------
  // CATALOGUE ÉLARGI · autres marques (non vendues sur Sunsoari)
  // zone : visage / corps / cheveux / cuir · step : étape de routine
  // for : réponses du diagnostic qui le rendent pertinent · avoid : réponses qui l'excluent
  // Formules variables selon les pays : vérifier la liste INCI sur l'emballage.
  // ---------------------------------------------------------------------------
  var EXT = [
    // Visage · nettoyants
    { id: "roundlab", brand: "Round Lab", name: "1025 Dokdo Cleanser", origin: "Corée", zone: "visage", step: "nettoyant", act: ["hyaluronique"], for: ["seche", "sensible", "normale", "rougeurs", "secheresse"], avoid: [], desc: "Mousse nettoyante douce à l'eau de mer profonde." },
    { id: "cosrxgel", brand: "COSRX", name: "Low pH Good Morning Gel Cleanser", origin: "Corée", zone: "visage", step: "nettoyant", act: ["bha", "teatree"], for: ["mixte", "imperfections"], avoid: ["reactifHE", "enceinte"], desc: "Gel nettoyant à pH doux, avec BHA et tea tree." },
    { id: "dhc", brand: "DHC", name: "Deep Cleansing Oil", origin: "Japon", zone: "visage", step: "demaquillant", act: ["olive"], for: ["seche", "normale", "secheresse", "deux", "soir"], avoid: [], desc: "Huile démaquillante à l'huile d'olive, à émulsionner avec de l'eau." },
    { id: "arami", brand: "Arami Essentials", name: "Eden's Elixir", origin: "Nigeria", madeIn: "au Nigeria", zone: "visage", step: "tonique", act: ["savonnoir"], for: ["mixte", "imperfections", "normale"], avoid: ["sensible"], desc: "Tonique inspiré du savon noir africain, par une marque de Lagos." },
    // Visage · toniques, essences, sérums
    { id: "anua", brand: "Anua", name: "Heartleaf 77% Soothing Toner", origin: "Corée", zone: "visage", step: "tonique", act: ["heartleaf"], for: ["sensible", "rougeurs", "mixte"], avoid: [], desc: "Tonique à 77 % d'extrait de heartleaf." },
    { id: "hadalabo", brand: "Hada Labo", name: "Gokujyun Lotion", origin: "Japon", zone: "visage", step: "tonique", act: ["hyaluronique"], for: ["seche", "secheresse", "normale", "mixte"], avoid: [], desc: "Lotion hydratante à plusieurs acides hyaluroniques." },
    { id: "snail", brand: "COSRX", name: "Advanced Snail 96 Mucin Power Essence", origin: "Corée", zone: "visage", step: "serum", act: ["mucine"], for: ["secheresse", "texture", "normale", "mixte"], avoid: ["vegan"], desc: "Essence fluide à la mucine d'escargot." },
    { id: "bojglow", brand: "Beauty of Joseon", name: "Glow Serum Propolis + Niacinamide", origin: "Corée", zone: "visage", step: "serum", act: ["propolis", "niacinamide"], for: ["imperfections", "teint", "mixte", "texture"], avoid: ["ruche"], desc: "Sérum à la propolis et à la niacinamide." },
    { id: "skin1004", brand: "SKIN1004", name: "Madagascar Centella Ampoule", origin: "Corée", zone: "visage", step: "serum", act: ["centella"], for: ["sensible", "rougeurs", "mixte", "imperfections"], avoid: [], desc: "Ampoule à l'extrait de centella asiatica de Madagascar." },
    { id: "torriden", brand: "Torriden", name: "DIVE-IN Hyaluronic Acid Serum", origin: "Corée", zone: "visage", step: "serum", act: ["hyaluronique", "panthenol"], for: ["seche", "secheresse", "normale", "sensible"], avoid: [], desc: "Sérum hydratant léger à l'acide hyaluronique." },
    { id: "melano", brand: "Melano CC (Rohto)", name: "Premium Essence", origin: "Japon", zone: "visage", step: "serum", act: ["vitc"], for: ["taches", "teint"], avoid: ["sensible", "rougeurs"], desc: "Sérum à la vitamine C, à utiliser le soir et à introduire progressivement." },
    { id: "somebymi", brand: "Some By Mi", name: "AHA BHA PHA 30 Days Miracle Toner", origin: "Corée", zone: "visage", step: "exfoliant", act: ["aha", "bha", "pha", "teatree"], for: ["texture", "imperfections", "mixte"], avoid: ["sensible", "rougeurs", "reactifHE", "enceinte"], desc: "Tonique exfoliant doux aux trois familles d'acides." },
    { id: "bojeye", brand: "Beauty of Joseon", name: "Revive Eye Serum Ginseng + Retinal", origin: "Corée", zone: "visage", step: "yeux", act: ["ginseng", "retinoides"], for: ["rides"], avoid: ["enceinte", "sensible"], desc: "Sérum contour des yeux au ginseng et au rétinal." },
    { id: "anuapdrn", brand: "Anua", name: "PDRN Hyaluronic Acid Capsule 100 Serum", origin: "Corée", zone: "visage", step: "serum", act: ["pdrn", "hyaluronique"], for: ["rides", "secheresse", "teint"], avoid: ["vegan"], trend: true, desc: "Sérum tendance au PDRN et à l'acide hyaluronique." },
    // Visage · hydratants
    { id: "illiyoon", brand: "Illiyoon", name: "Ceramide Ato Concentrate Cream", origin: "Corée", zone: "visage", step: "hydratant", act: ["ceramides"], for: ["seche", "sensible", "secheresse", "rougeurs", "normale"], avoid: [], desc: "Crème aux céramides pour le visage et le corps." },
    { id: "curel", brand: "Curel (Kao)", name: "Intensive Moisture Cream", origin: "Japon", zone: "visage", step: "hydratant", act: ["ceramides"], for: ["sensible", "seche", "rougeurs"], avoid: [], desc: "Crème hydratante aux céramides, pensée pour les peaux sensibles." },
    { id: "cosrxlotion", brand: "COSRX", name: "Oil-Free Ultra-Moisturizing Lotion", origin: "Corée", zone: "visage", step: "hydratant", act: [], for: ["mixte", "imperfections", "texture"], avoid: [], desc: "Lotion hydratante légère, sans huile, à la sève de bouleau." },
    // Visage · ajouts pour des routines complètes
    { id: "imfromrice", brand: "I'm From", name: "Rice Toner", origin: "Corée", zone: "visage", step: "tonique", act: ["riz"], for: ["teint", "seche", "normale", "texture"], avoid: [], desc: "Tonique laiteux à l'extrait de riz." },
    { id: "klairs", brand: "Klairs", name: "Supple Preparation Unscented Toner", origin: "Corée", zone: "visage", step: "tonique", act: ["hyaluronique", "panthenol"], for: ["sensible", "rougeurs", "seche", "normale"], avoid: [], desc: "Tonique hydratant, version sans parfum." },
    { id: "nectaromerose", brand: "Nectarome", name: "Eau de rose de Damas", origin: "Maroc", madeIn: "au Maroc", zone: "visage", step: "tonique", act: [], for: ["normale", "seche", "mixte", "teint"], avoid: [], desc: "Eau florale de rose distillée au Maroc, en brume ou sur un coton." },
    { id: "missha", brand: "Missha", name: "Time Revolution The First Essence", origin: "Corée", zone: "visage", step: "essence", act: ["ferments"], for: ["teint", "texture", "normale", "seche", "mixte"], avoid: [], desc: "Essence aux ferments, à presser sur la peau après le tonique." },
    { id: "snailess", brand: "COSRX", name: "Advanced Snail 96 Mucin Essence", origin: "Corée", zone: "visage", step: "essence", act: ["mucine"], for: ["secheresse", "texture", "normale", "mixte"], avoid: ["vegan"], desc: "Essence fluide à la mucine d'escargot." },
    { id: "anuaserum", brand: "Anua", name: "Niacinamide 10% + TXA 4% Serum", origin: "Corée", zone: "visage", step: "serum", act: ["niacinamide", "tranexamique"], for: ["taches", "teint", "imperfections", "mixte"], avoid: [], desc: "Sérum à la niacinamide et à l'acide tranexamique." },
    { id: "bojlight", brand: "Beauty of Joseon", name: "Light On Serum Centella + Vita C", origin: "Corée", zone: "visage", step: "serum", act: ["centella", "vitc"], for: ["teint", "taches", "sensible", "normale"], avoid: [], desc: "Sérum doux à la vitamine C et à la centella." },
    { id: "cosrxvitc", brand: "COSRX", name: "The Vitamin C 23 Serum", origin: "Corée", zone: "visage", step: "serum", act: ["vitc"], for: ["taches", "teint"], avoid: ["sensible", "rougeurs"], desc: "Sérum concentré en vitamine C pure, à introduire progressivement." },
    { id: "bojdynasty", brand: "Beauty of Joseon", name: "Dynasty Cream", origin: "Corée", zone: "visage", step: "hydratant", act: ["riz", "niacinamide", "squalane"], for: ["seche", "normale", "teint", "secheresse"], avoid: [], desc: "Crème riche au riz et au ginseng, inspirée de rituels coréens anciens." },
    { id: "roundlabbirch", brand: "Round Lab", name: "Birch Juice Moisturizing Cream", origin: "Corée", zone: "visage", step: "hydratant", act: ["hyaluronique", "panthenol"], for: ["mixte", "normale", "secheresse"], avoid: [], desc: "Crème hydratante légère à la sève de bouleau." },
    { id: "laneige", brand: "Laneige", name: "Water Sleeping Mask", origin: "Corée", zone: "visage", step: "nuit", act: ["hyaluronique"], for: ["secheresse", "teint", "normale", "seche", "mixte"], avoid: [], desc: "Masque de nuit gel, en dernière étape le soir, 2 à 3 fois par semaine." },
    { id: "abib", brand: "Abib", name: "Mild Acidic pH Sheet Mask Heartleaf Fit", origin: "Corée", zone: "visage", step: "masquev", act: ["heartleaf"], for: ["sensible", "rougeurs", "mixte", "normale"], avoid: [], desc: "Masque en tissu apaisant, 15 à 20 minutes." },
    { id: "imfrommask", brand: "I'm From", name: "Rice Mask", origin: "Corée", zone: "visage", step: "masquev", act: ["riz"], for: ["teint", "texture", "seche", "normale"], avoid: [], desc: "Masque à rincer au riz, texture granuleuse douce." },
    { id: "cosrxahabha", brand: "COSRX", name: "AHA/BHA Clarifying Treatment Toner", origin: "Corée", zone: "visage", step: "exfoliant", act: ["aha", "bha"], for: ["texture", "imperfections", "mixte"], avoid: ["sensible", "rougeurs", "acides", "enceinte"], desc: "Tonique exfoliant léger aux AHA et BHA." },
    // Visage · protection solaire
    { id: "bojsun", brand: "Beauty of Joseon", name: "Relief Sun Rice + Probiotics SPF 50+", origin: "Corée", zone: "visage", step: "spf", act: ["spf", "riz"], for: ["taches", "teint", "seche", "normale", "mixte", "sensible"], avoid: [], desc: "Crème solaire visage au riz, finition légère." },
    { id: "biore", brand: "Bioré", name: "UV Aqua Rich Watery Essence SPF 50+", origin: "Japon", zone: "visage", step: "spf", act: ["spf", "hyaluronique"], for: ["mixte", "imperfections", "taches", "normale"], avoid: ["sensible", "rougeurs"], desc: "Solaire très fluide, texture gel." },
    // Corps
    // Sélection anti-taches et corps
    { id: "gmdiscolo", brand: "Good Molecules", name: "Discoloration Correcting Serum", origin: "États-Unis", zone: "visage", step: "serum", act: ["tranexamique", "niacinamide"], for: ["taches", "teint"], avoid: [], desc: "Sérum léger à l'acide tranexamique et à la niacinamide, à petit prix, pour le teint inégal." },
    { id: "axisydark", brand: "Axis-Y", name: "Dark Spot Correcting Glow Serum", origin: "Corée", zone: "visage", step: "serum", act: ["niacinamide"], for: ["taches", "teint"], avoid: [], desc: "Sérum coréen à la niacinamide, pensé pour les marques laissées par les boutons." },
    { id: "toarbutin", brand: "The Ordinary", name: "Alpha Arbutin 2% + HA", origin: "Canada", zone: "visage", step: "serum", act: ["arbutine", "hyaluronique"], for: ["taches", "teint"], avoid: [], desc: "Alpha-arbutine et acide hyaluronique : une formule simple pour commencer sur les taches." },
    { id: "naturiumarb", brand: "Naturium", name: "Alpha Arbutin Serum 2%", origin: "États-Unis", zone: "visage", step: "serum", act: ["arbutine"], for: ["taches", "teint"], avoid: [], desc: "Sérum à l'alpha-arbutine pour l'apparence des taches." },
    { id: "niveathia", brand: "Nivea", name: "Luminous630 Sérum anti-taches", origin: "Allemagne", zone: "visage", step: "serum", act: ["thiamidol"], for: ["taches"], avoid: [], desc: "Sérum au Thiamidol, facile à trouver en grande surface et en pharmacie." },
    { id: "ondotxa", brand: "Ondo Beauty 36.5", name: "Tranexamic Acid & Licorice Dark Spot Treatment", origin: "États-Unis", zone: "visage", step: "serum", act: ["tranexamique", "reglisse"], for: ["taches", "rougeurs"], avoid: [], desc: "Acide tranexamique et réglisse, une association douce pour les taches." },
    { id: "faded", brand: "Topicals", name: "Faded Serum", origin: "États-Unis", zone: "visage", step: "serum", act: ["tranexamique", "kojique", "azelaique", "niacinamide"], for: ["taches"], avoid: ["sensible", "rougeurs", "enceinte"], desc: "Plusieurs actifs anti-taches dans une formule, pour des marques installées. Commence 2 fois par semaine." },
    { id: "lrpmelab3", brand: "La Roche-Posay", name: "Mela B3 Sérum", origin: "France", zone: "visage", step: "serum", act: ["niacinamide"], for: ["taches", "teint", "sensible"], avoid: [], desc: "Sérum anti-taches de pharmacie, avec niacinamide et Melasyl, testé sur peaux sensibles selon la marque." },
    { id: "pcazelaic", brand: "Paula's Choice", name: "10% Azelaic Acid Booster", origin: "États-Unis", zone: "visage", step: "serum", act: ["azelaique"], for: ["taches", "imperfections", "rougeurs"], avoid: [], desc: "Acide azélaïque 10 % : marques, boutons et teint inégal. Commence 2 fois par semaine." },
    { id: "ggcglow", brand: "Geek & Gorgeous", name: "C-Glow", origin: "Allemagne", zone: "visage", step: "serum", act: ["vitc"], for: ["taches", "teint"], avoid: ["sensible", "rougeurs"], desc: "Vitamine C à petit prix. Commence 2 fois par semaine, le flacon se garde à l'abri de la lumière." },
    { id: "versedretinol", brand: "Versed", name: "Press Restart Gentle Retinol Serum", origin: "États-Unis", zone: "visage", step: "serum", act: ["retinoides"], for: ["taches", "texture", "rides"], avoid: ["enceinte", "sensible"], night: true, desc: "Rétinol doux pour débuter, le soir uniquement, avec une protection solaire le jour." },
    { id: "ggagame", brand: "Geek & Gorgeous", name: "A-Game 5", origin: "Allemagne", zone: "visage", step: "serum", act: ["retinoides"], for: ["taches", "texture", "rides"], avoid: ["enceinte", "sensible"], night: true, desc: "Rétinal à petit prix, le soir. Commence 1 à 2 fois par semaine." },
    { id: "toretinal", brand: "The Ordinary", name: "Retinal 0.2% Emulsion", origin: "Canada", zone: "visage", step: "serum", act: ["retinoides"], for: ["taches", "texture", "rides"], avoid: ["enceinte", "sensible", "rougeurs"], night: true, desc: "Rétinal plus concentré, pour les peaux déjà habituées aux rétinoïdes. Le soir, 1 fois par semaine au début." },
    { id: "acmdepiwhite", brand: "Laboratoire ACM", name: "Dépiwhite Crème Zones Sensibles", origin: "France", zone: "corps", step: "corps", act: ["niacinamide", "reglisse", "aha"], for: ["corpsMarques"], needs: ["corpsMarques"], avoid: ["acides"], desc: "Crème de pharmacie pour les taches des aisselles, du maillot, des genoux et des coudes." },
    // Bibliothèque élargie : classiques coréens, japonais, européens, peaux foncées et cheveux texturés
    { id: "anuaoil", brand: "Anua", name: "Heartleaf Pore Control Cleansing Oil", origin: "Corée", zone: "visage", step: "demaquillant", act: ["heartleaf"], for: ["mixte", "imperfections", "deux", "soir"], avoid: [], desc: "Huile démaquillante légère qui se rince sans film gras." },
    { id: "banila", brand: "Banila Co", name: "Clean It Zero Cleansing Balm", origin: "Corée", zone: "visage", step: "demaquillant", act: [], for: ["normale", "seche", "deux", "soir"], avoid: ["reactifHE"], desc: "Baume fondant qui se transforme en huile, pour bien retirer maquillage et crème solaire." },
    { id: "softymo", brand: "Kosé", name: "Softymo Speedy Cleansing Oil", origin: "Japon", zone: "visage", step: "demaquillant", act: [], for: ["normale", "mixte", "deux", "soir"], avoid: [], desc: "Huile démaquillante japonaise, efficace et petit prix." },
    { id: "sensibio", brand: "Bioderma", name: "Sensibio H2O", origin: "France", zone: "visage", step: "demaquillant", act: [], for: ["sensible", "rougeurs", "deux", "soir"], avoid: [], desc: "Eau micellaire très douce, pensée pour les peaux sensibles." },
    { id: "ceravehydra", brand: "CeraVe", name: "Crème Lavante Hydratante", origin: "États-Unis", zone: "visage", step: "nettoyant", act: ["ceramides", "hyaluronique"], for: ["seche", "sensible", "normale", "secheresse"], avoid: [], desc: "Nettoyant crème non moussant, aux céramides, qui ne tiraille pas." },
    { id: "ceravefoam", brand: "CeraVe", name: "Gel Moussant", origin: "États-Unis", zone: "visage", step: "nettoyant", act: ["ceramides", "niacinamide"], for: ["mixte", "imperfections"], avoid: [], desc: "Gel moussant pour peau mixte à grasse, sans dessécher." },
    { id: "toleriane", brand: "La Roche-Posay", name: "Toleriane Gel Nettoyant", origin: "France", zone: "visage", step: "nettoyant", act: ["ceramides", "niacinamide"], for: ["sensible", "rougeurs", "seche"], avoid: [], desc: "Nettoyant de pharmacie pour peaux sensibles, sans parfum." },
    { id: "bojplum", brand: "Beauty of Joseon", name: "Green Plum Refreshing Cleanser", origin: "Corée", zone: "visage", step: "nettoyant", act: [], for: ["mixte", "normale"], avoid: [], desc: "Gel doux qui nettoie sans tirailler." },
    { id: "toniacinamide", brand: "The Ordinary", name: "Niacinamide 10% + Zinc 1%", origin: "Canada", zone: "visage", step: "serum", act: ["niacinamide"], for: ["mixte", "imperfections", "taches"], avoid: ["sensible"], desc: "Sérum petit prix pour le sébum et les marques. Commence un jour sur deux." },
    { id: "effaclarduo", brand: "La Roche-Posay", name: "Effaclar Duo+M", origin: "France", zone: "visage", step: "hydratant", act: ["niacinamide"], for: ["mixte", "imperfections"], avoid: ["sensible"], desc: "Soin hydratant pour peau à imperfections, de pharmacie." },
    { id: "cicalfate", brand: "Avène", name: "Cicalfate+ Crème Réparatrice", origin: "France", zone: "visage", step: "hydratant", act: [], for: ["sensible", "rougeurs", "seche"], avoid: [], desc: "Crème réparatrice pour les peaux fragilisées ou irritées." },
    { id: "aestura", brand: "Aestura", name: "Atobarrier 365 Cream", origin: "Corée", zone: "visage", step: "hydratant", act: ["ceramides"], for: ["seche", "sensible", "rougeurs", "secheresse"], avoid: [], desc: "Crème aux céramides qui renforce la barrière de la peau." },
    { id: "soonjung", brand: "Etude", name: "SoonJung 2x Barrier Intensive Cream", origin: "Corée", zone: "visage", step: "hydratant", act: ["panthenol"], for: ["sensible", "rougeurs"], avoid: [], desc: "Crème très douce, sans parfum, pour les périodes d'irritation." },
    { id: "skin1004sun", brand: "SKIN1004", name: "Hyalu-Cica Water-Fit Sun Serum SPF 50+", origin: "Corée", zone: "visage", step: "spf", act: ["spf", "centella", "hyaluronique"], for: ["mixte", "normale", "imperfections", "taches"], avoid: [], desc: "Solaire texture sérum, très léger, idéal sous le maquillage." },
    { id: "isntreesun", brand: "Isntree", name: "Hyaluronic Acid Watery Sun Gel SPF 50+", origin: "Corée", zone: "visage", step: "spf", act: ["spf", "hyaluronique"], for: ["normale", "seche", "taches"], avoid: [], desc: "Gel solaire aqueux et frais." },
    { id: "roundlabsun", brand: "Round Lab", name: "Birch Juice Moisturizing Sun Cream", origin: "Corée", zone: "visage", step: "spf", act: ["spf"], for: ["seche", "normale", "secheresse"], avoid: [], desc: "Solaire plus hydratant, parfait en hiver. Vérifie l'indice sur la version achetée." },
    { id: "uvmune", brand: "La Roche-Posay", name: "Anthelios UVMune 400 Fluide Invisible SPF 50+", origin: "France", zone: "visage", step: "spf", act: ["spf"], for: ["sensible", "normale", "mixte", "taches"], avoid: [], desc: "Solaire de pharmacie très haute protection, fluide invisible." },
    { id: "pcbha", brand: "Paula's Choice", name: "Skin Perfecting 2% BHA Liquid", origin: "États-Unis", zone: "visage", step: "exfoliant", act: ["bha"], for: ["mixte", "imperfections", "texture"], avoid: ["acides", "sensible"], desc: "Exfoliant BHA de référence pour les pores et les points noirs. 1 à 3 soirs par semaine." },
    { id: "bojredbean", brand: "Beauty of Joseon", name: "Red Bean Refreshing Pore Mask", origin: "Corée", zone: "visage", step: "masquev", act: [], for: ["mixte", "imperfections"], avoid: [], desc: "Masque à l'argile douce, sur le front et le menton." },
    { id: "axisymugwort", brand: "Axis-Y", name: "Mugwort Pore Clarifying Wash Off Pack", origin: "Corée", zone: "visage", step: "masquev", act: [], for: ["sensible", "imperfections", "rougeurs"], avoid: [], desc: "Masque argile et armoise, doux pour les peaux réactives." },
    { id: "cerave_sa", brand: "CeraVe", name: "SA Crème Anti-Rugosités", origin: "États-Unis", zone: "corps", step: "corps", act: ["bha", "ceramides"], for: ["corpsTresSec", "corpsMarques"], avoid: ["acides"], desc: "Pour les zones rugueuses et les petits boutons sur les bras ou les jambes." },
    { id: "eucerinurea", brand: "Eucerin", name: "UreaRepair Plus Lotion 10% Urée", origin: "Allemagne", zone: "corps", step: "corps", act: [], for: ["corpsSec", "corpsTresSec"], avoid: [], desc: "Lait à l'urée pour les peaux très sèches et rêches." },
    { id: "lipikar", brand: "La Roche-Posay", name: "Lipikar Baume AP+M", origin: "France", zone: "corps", step: "corps", act: ["karite"], for: ["corpsTresSec", "corpsSensible", "corpsSec"], avoid: [], desc: "Baume de pharmacie pour les peaux très sèches et sensibles." },
    { id: "atoderm", brand: "Bioderma", name: "Atoderm Crème", origin: "France", zone: "corps", step: "corps", act: [], for: ["corpsSec", "corpsSensible"], avoid: [], desc: "Crème simple, grand format, bien tolérée." },
    { id: "mielle", brand: "Mielle Organics", name: "Rosemary Mint Scalp & Hair Strengthening Oil", origin: "États-Unis", zone: "cheveux", step: "soin", act: ["romarin"], for: ["crepus", "boucles", "secs"], avoid: ["reactifHE"], desc: "Huile au romarin et à la menthe pour le cuir chevelu et les pointes. Contient des huiles essentielles." },
    { id: "cantu", brand: "Cantu", name: "Shea Butter Leave-In Conditioning Repair Cream", origin: "États-Unis", zone: "cheveux", step: "soin", act: ["karite"], for: ["crepus", "boucles", "secs"], avoid: [], desc: "Crème sans rinçage au karité, très répandue et petit prix." },
    { id: "sheamoisture", brand: "SheaMoisture", name: "Coconut & Hibiscus Curl Enhancing Smoothie", origin: "États-Unis", zone: "cheveux", step: "soin", act: ["karite"], for: ["boucles", "crepus"], avoid: [], founder: "Fondée par Richelieu Dennis, né au Liberia", desc: "Crème coiffante qui définit les boucles et limite les frisottis." },
    { id: "sheamasque", brand: "SheaMoisture", name: "Jamaican Black Castor Oil Strengthen & Restore Masque", origin: "États-Unis", zone: "cheveux", step: "masque", act: ["karite"], for: ["crepus", "secs", "boucles"], avoid: [], desc: "Masque riche pour les cheveux crépus secs et cassants." },
    { id: "asiam", brand: "As I Am", name: "Coconut CoWash", origin: "États-Unis", zone: "cheveux", step: "shampoing", act: [], for: ["crepus", "boucles", "secs"], avoid: [], desc: "Après-shampoing lavant, pour laver sans dessécher les cheveux crépus." },
    { id: "pattern", brand: "Pattern Beauty", name: "Leave-In Conditioner", origin: "États-Unis", zone: "cheveux", step: "soin", act: [], for: ["crepus", "boucles"], avoid: [], desc: "Soin sans rinçage pour boucles serrées à crépus." },
    { id: "boucleme", brand: "Bouclème", name: "Curl Cream", origin: "Royaume-Uni", zone: "cheveux", step: "soin", act: [], for: ["boucles", "ondules"], avoid: [], desc: "Crème légère pour cheveux ondulés à bouclés." },
    { id: "miseenscene", brand: "Mise en Scène", name: "Perfect Serum Original", origin: "Corée", zone: "cheveux", step: "soin", act: ["argan"], for: ["secs", "colores", "raides", "ondules"], avoid: [], desc: "Sérum capillaire coréen culte, pour la brillance et les pointes." },
    { id: "masil", brand: "Masil", name: "8 Seconds Salon Hair Mask", origin: "Corée", zone: "cheveux", step: "masque", act: [], for: ["secs", "colores", "fins"], avoid: [], desc: "Masque express, quelques secondes de pose." },
    { id: "ryo", brand: "Ryo", name: "Hair Loss Expert Care Shampoo", origin: "Corée", zone: "cuir", step: "shampoing", act: ["ginseng"], for: ["cuirGras", "fins"], avoid: [], desc: "Shampoing coréen au ginseng pour un cuir chevelu qui regraisse et des cheveux fins." },
    { id: "kelual", brand: "Ducray", name: "Kelual DS Shampooing", origin: "France", zone: "cuir", step: "shampoing", act: [], for: ["cuirPellicules", "cuirDS"], avoid: [], desc: "Shampoing de pharmacie pour les pellicules et les démangeaisons." },
    { id: "kloraneavoine", brand: "Klorane", name: "Shampooing à l'Avoine", origin: "France", zone: "cuir", step: "shampoing", act: [], for: ["cuirSensible", "cuirSec"], avoid: [], desc: "Shampoing très doux pour les lavages fréquents et les cuirs chevelus sensibles." },
    // Marques connues : Corée, Japon, Chine, Afrique et diaspora
    { id: "medicube", brand: "Medicube", name: "Zero Pore Pad 2.0", origin: "Corée", zone: "visage", step: "exfoliant", act: ["aha", "bha"], for: ["mixte", "imperfections", "texture"], avoid: ["acides", "sensible"], desc: "Disques exfoliants très populaires en Corée. 2 à 3 soirs par semaine, jamais avec un autre acide." },
    { id: "drjart", brand: "Dr.Jart+", name: "Cicapair Tiger Grass Calming Gel Cream", origin: "Corée", zone: "visage", step: "hydratant", act: ["centella"], for: ["rougeurs", "sensible", "mixte"], avoid: [], desc: "Gel-crème à la centella pour calmer les rougeurs." },
    { id: "innisfree", brand: "Innisfree", name: "Green Tea Seed Hyaluronic Serum", origin: "Corée", zone: "visage", step: "serum", act: ["hyaluronique"], for: ["secheresse", "normale", "mixte"], avoid: [], desc: "Sérum hydratant au thé vert de l'île de Jeju." },
    { id: "sulwhasoo", brand: "Sulwhasoo", name: "First Care Activating Serum", origin: "Corée", zone: "visage", step: "essence", act: ["ginseng"], for: ["rides", "teint", "seche"], avoid: ["reactifHE"], desc: "Sérum de luxe coréen aux plantes, dont le ginseng. Contient du parfum." },
    { id: "mixsoon", brand: "Mixsoon", name: "Bean Essence", origin: "Corée", zone: "visage", step: "essence", act: ["ferments"], for: ["texture", "teint", "mixte"], avoid: [], desc: "Essence fermentée au soja, pour le grain de peau et l'éclat." },
    { id: "numbuzin3", brand: "Numbuzin", name: "No.3 Skin Softening Serum", origin: "Corée", zone: "visage", step: "serum", act: ["ferments", "niacinamide"], for: ["teint", "texture", "taches"], avoid: [], desc: "Sérum fermenté pour l'éclat et le grain de peau." },
    { id: "purito", brand: "Purito Seoul", name: "Wonder Releaf Centella Serum Unscented", origin: "Corée", zone: "visage", step: "serum", act: ["centella"], for: ["sensible", "rougeurs"], avoid: [], desc: "Sérum apaisant à la centella, sans parfum." },
    { id: "klairsvitc", brand: "Klairs", name: "Freshly Juiced Vitamin Drop", origin: "Corée", zone: "visage", step: "serum", act: ["vitc"], for: ["taches", "teint"], avoid: ["rougeurs"], desc: "Vitamine C à 5 %, plutôt douce, pour débuter." },
    { id: "heimish", brand: "Heimish", name: "All Clean Balm", origin: "Corée", zone: "visage", step: "demaquillant", act: [], for: ["normale", "seche", "deux", "soir"], avoid: ["reactifHE"], desc: "Baume démaquillant fondant, un classique coréen." },
    { id: "pyunkang", brand: "Pyunkang Yul", name: "Essence Toner", origin: "Corée", zone: "visage", step: "tonique", act: [], for: ["seche", "sensible", "secheresse"], avoid: [], desc: "Lotion minimaliste, très peu d'ingrédients." },
    { id: "haruharu", brand: "Haruharu Wonder", name: "Black Rice Hyaluronic Toner", origin: "Corée", zone: "visage", step: "tonique", act: ["riz", "hyaluronique"], for: ["seche", "normale", "teint"], avoid: [], desc: "Lotion hydratante au riz noir fermenté." },
    { id: "shiseidoanessa", brand: "Anessa (Shiseido)", name: "Perfect UV Sunscreen Skincare Milk SPF 50+", origin: "Japon", zone: "visage", step: "spf", act: ["spf"], for: ["mixte", "normale", "taches"], avoid: ["sensible"], desc: "Solaire japonais résistant à l'eau et à la transpiration. Contient de l'alcool." },
    { id: "senka", brand: "Senka", name: "Perfect Whip", origin: "Japon", zone: "visage", step: "nettoyant", act: ["hyaluronique"], for: ["mixte", "normale"], avoid: ["sensible"], desc: "Mousse nettoyante japonaise dense, très petit prix." },
    { id: "minon", brand: "Minon", name: "Amino Moist Charge Up Milky Lotion", origin: "Japon", zone: "visage", step: "hydratant", act: [], for: ["sensible", "seche", "secheresse"], avoid: [], desc: "Émulsion aux acides aminés, pensée au Japon pour les peaux sensibles et sèches." },
    { id: "tatcha", brand: "Tatcha", name: "The Rice Polish Foaming Enzyme Powder", origin: "Japon", zone: "visage", step: "exfoliant", act: ["riz"], for: ["teint", "texture", "normale"], avoid: [], desc: "Poudre exfoliante enzymatique au riz, inspirée des rituels japonais (marque américano-japonaise)." },
    { id: "kikumasamune", brand: "Kikumasamune", name: "High Moist Lotion (saké)", origin: "Japon", zone: "visage", step: "tonique", act: ["ferments"], for: ["seche", "teint"], avoid: [], desc: "Grande lotion au saké fermenté, classique des pharmacies japonaises." },
    { id: "winona", brand: "Winona", name: "Soothing Repair Serum", origin: "Chine", zone: "visage", step: "serum", act: [], for: ["sensible", "rougeurs"], avoid: [], desc: "Marque chinoise de référence pour les peaux sensibles. Peu distribuée en France : vérifie le revendeur." },
    { id: "proya", brand: "Proya", name: "Ruby Serum", origin: "Chine", zone: "visage", step: "serum", act: ["retinoides"], for: ["rides", "texture"], avoid: ["enceinte", "sensible"], night: true, desc: "Sérum anti-âge au rétinoïde d'une grande marque chinoise. Le soir uniquement. Peu distribué en France." },
    { id: "chando", brand: "Chando", name: "Himalaya Hydrating Essence Lotion", origin: "Chine", zone: "visage", step: "tonique", act: [], for: ["seche", "normale"], avoid: [], desc: "Lotion hydratante d'une marque chinoise historique (Chando). Distribution limitée en Europe." },
    { id: "herborist", brand: "Herborist", name: "Soins aux plantes de la médecine chinoise", origin: "Chine", zone: "visage", step: "hydratant", act: [], for: ["normale", "seche"], avoid: ["reactifHE"], desc: "Marque chinoise inspirée des plantes traditionnelles. Vérifie la composition du produit choisi." },
    { id: "madeforhue", brand: "Made For Hue", name: "Supra Fade", origin: "Royaume-Uni", zone: "visage", step: "serum", act: ["arbutine", "tranexamique", "azelaique"], for: ["taches"], avoid: ["sensible", "enceinte"], desc: "Sérum anti-taches d'une marque créée pour les peaux riches en mélanine. Commence 2 fois par semaine." },
    { id: "hyperskin", brand: "Hyper Skin", name: "Hyper Clear Brightening Vitamin C Serum", origin: "États-Unis", zone: "visage", step: "serum", act: ["vitc"], for: ["taches", "teint", "imperfections"], avoid: ["sensible"], desc: "Sérum vitamine C d'une marque créée pour les taches sur peaux mates à foncées." },
    { id: "eadem", brand: "Eadem", name: "Milk Marvel Dark Spot Serum", origin: "États-Unis", zone: "visage", step: "serum", act: [], for: ["taches", "teint"], avoid: [], desc: "Sérum anti-taches d'une marque fondée pour les peaux mates à foncées. Vérifie la liste d'ingrédients." },
    { id: "bgsunscreen", brand: "Black Girl Sunscreen", name: "Black Girl Sunscreen SPF 30", origin: "États-Unis", zone: "visage", step: "spf", act: ["spf"], for: ["normale", "seche"], avoid: [], desc: "Solaire pensé pour ne pas laisser de trace blanche. SPF 30 : pour la ville ; prends SPF 50 pour les taches ou le grand soleil." },
    { id: "bolden", brand: "Bolden", name: "SPF 30 Brightening Moisturizer", origin: "États-Unis", zone: "visage", step: "spf", act: ["spf"], for: ["normale", "taches"], avoid: [], desc: "Hydratant solaire d'une marque créée pour les peaux mates à foncées. SPF 30." },
    { id: "bioil", brand: "Bio-Oil", name: "Huile de Soin", origin: "Afrique du Sud", madeIn: "en Afrique du Sud", zone: "corps", step: "huile", act: [], for: ["corpsSec", "corpsMarques"], avoid: ["reactifHE"], desc: "Huile corps conçue en Afrique du Sud, très répandue pour l'aspect des vergetures et cicatrices. Contient du parfum." },
    { id: "africology", brand: "Africology", name: "Soins corps aux plantes africaines", origin: "Afrique du Sud", madeIn: "en Afrique du Sud", zone: "corps", step: "corps", act: [], for: ["corpsSec", "corpsOk"], avoid: ["reactifHE"], desc: "Marque sud-africaine de spa aux plantes du continent. Vérifie la composition du soin choisi." },
    // Cheveux texturés : marques fondées par des personnes d'origine africaine, afro-caribéenne ou afro-asiatique
    { id: "musoya", brand: "Musoya", name: "Soins cheveux crépus, frisés et bouclés", origin: "France", founder: "Fondée par Aminata Doucouré, d'origine ivoirienne", zone: "cheveux", step: "soin", act: [], for: ["crepus", "boucles", "secs"], avoid: [], desc: "Marque française pour cheveux crépus, frisés, lockés et bouclés, formulée en France avec une majorité d'ingrédients d'origine naturelle." },
    { id: "kalia", brand: "Kalia Nature", name: "Shampoing solide à l'hibiscus", origin: "France", founder: "Fondée par Sandrine Sophie, d'origine antillaise", zone: "cheveux", step: "shampoing", act: [], for: ["crepus", "boucles", "ondules"], avoid: [], desc: "Marque française naturelle inspirée des traditions caribéennes (hibiscus, coco, spiruline), pour cheveux ondulés à crépus, enfants compris." },
    { id: "tropikalbliss", brand: "Tropikalbliss", name: "Soins vegan cheveux crépus", origin: "France", founder: "Fondée par Inguela Coudoux, d'origine congolaise et vietnamienne", zone: "cheveux", step: "soin", act: [], for: ["crepus", "boucles"], avoid: [], desc: "Soins vegan pour cheveux crépus et naturels, d'une créatrice afro-asiatique." },
    { id: "carolinab", brand: "Carolina B", name: "Soins naturels cheveux frisés à crépus", origin: "", founder: "Fondée par Caroline Njiné, originaire de l'Ouest Cameroun", zone: "cheveux", step: "masque", act: [], for: ["crepus", "boucles", "secs"], avoid: [], desc: "Gamme naturelle pour cheveux frisés à crépus. Vérifie le lieu de vente et la composition du soin choisi." },
    { id: "adeba", brand: "Adeba Nature", name: "Soins capillaires naturels", origin: "Côte d'Ivoire", founder: "Fondée par Linda Dempah, en Côte d'Ivoire", zone: "cheveux", step: "soin", act: [], for: ["crepus", "boucles", "secs"], avoid: [], desc: "Marque ivoirienne de soins naturels. Disponibilité en France à vérifier." },
    { id: "nilotiqa", brand: "Nilotiqa", name: "Soins cheveux naturels", origin: "Afrique du Sud", founder: "Fondée par Thokozile Mangwiro, en Afrique du Sud", zone: "cheveux", step: "soin", act: [], for: ["crepus", "boucles"], avoid: [], desc: "Marque sud-africaine de soins capillaires créée par une femme pour les cheveux texturés." },
    { id: "afrocenchix", brand: "Afrocenchix", name: "Soins cheveux afro et bouclés", origin: "Royaume-Uni", founder: "Fondée par Rachael Twumasi-Corson et Joycelyn Mate", zone: "cheveux", step: "shampoing", act: [], for: ["crepus", "boucles"], avoid: [], desc: "Marque britannique de soins doux pour cheveux afro, fondée par deux femmes noires." },
    { id: "adwoa", brand: "Adwoa Beauty", name: "Soins cheveux texturés", origin: "États-Unis", founder: "Fondée par Julian Addo, inspirée de la diaspora africaine", zone: "cheveux", step: "masque", act: [], for: ["crepus", "boucles", "secs"], avoid: [], desc: "Marque pour cheveux très texturés, enracinée dans la culture de la diaspora africaine." },
    // Cheveux : Corée, Japon, Chine, Afrique, diaspora et Europe
    { id: "drforhair", brand: "Dr.FORHAIR", name: "Folligen Original Shampoo", origin: "Corée", zone: "cuir", step: "shampoing", act: [], for: ["cuirGras", "fins"], avoid: [], desc: "Shampoing coréen pour cuir chevelu qui regraisse et cheveux fins." },
    { id: "masilvolume", brand: "Masil", name: "5 Probiotics Perfect Volume Shampoo", origin: "Corée", zone: "cheveux", step: "shampoing", act: ["ferments"], for: ["fins", "raides", "ondules"], avoid: [], desc: "Shampoing volume aux probiotiques, pour cheveux fins et plats." },
    { id: "lador", brand: "Lador", name: "Perfect Hair Fill-Up", origin: "Corée", zone: "cheveux", step: "soin", act: [], for: ["secs", "colores"], avoid: [], desc: "Soin en ampoule pour cheveux abîmés ou colorés, très populaire en Corée." },
    { id: "moremo", brand: "Moremo", name: "Water Treatment Miracle 10", origin: "Corée", zone: "cheveux", step: "masque", act: [], for: ["secs", "colores", "fins"], avoid: [], desc: "Soin express à rincer, texture eau, pour démêler et adoucir." },
    { id: "unove", brand: "Unove", name: "Deep Damage Treatment EX", origin: "Corée", zone: "cheveux", step: "masque", act: [], for: ["secs", "colores"], avoid: [], desc: "Masque réparateur pour longueurs abîmées." },
    { id: "ichikami", brand: "Ichikami", name: "Smoothing Shampoo", origin: "Japon", zone: "cheveux", step: "shampoing", act: [], for: ["secs", "raides", "ondules"], avoid: [], desc: "Shampoing japonais aux plantes, pour des cheveux lisses et doux." },
    { id: "andhoney", brand: "&honey", name: "Deep Moist Shampoo", origin: "Japon", zone: "cheveux", step: "shampoing", act: [], for: ["secs", "boucles", "ondules"], avoid: ["ruche"], desc: "Shampoing hydratant au miel, une marque japonaise très suivie." },
    { id: "bawang", brand: "Bawang", name: "Shampoing aux plantes chinoises", origin: "Chine", zone: "cuir", step: "shampoing", act: ["ginseng"], for: ["cuirGras", "fins"], avoid: [], desc: "Marque chinoise historique de shampoings aux plantes. Distribution limitée en France : vérifie le produit et son revendeur." },
    { id: "chebetchad", brand: "Chébé du Tchad", name: "Poudre de chébé", origin: "Tchad", madeIn: "au Tchad", zone: "cheveux", step: "soin", act: ["chebe"], for: ["crepus", "secs", "boucles"], avoid: [], desc: "Mélange traditionnel des femmes du Tchad pour protéger les longueurs. Choisis un revendeur qui indique l'origine et la composition." },
    { id: "ghassoul", brand: "Nectarome", name: "Ghassoul (argile du Maroc)", origin: "Maroc", madeIn: "au Maroc", zone: "cuir", step: "shampoing", act: [], for: ["cuirGras", "crepus", "boucles"], avoid: [], desc: "Argile lavante traditionnelle du Maroc, pour un lavage doux sans mousse." },
    { id: "miellepom", brand: "Mielle Organics", name: "Pomegranate & Honey Leave-In Conditioner", origin: "États-Unis", zone: "cheveux", step: "soin", act: [], for: ["crepus", "boucles", "secs"], avoid: [], desc: "Après-shampoing sans rinçage pour boucles serrées à crépus." },
    { id: "camillerose", brand: "Camille Rose", name: "Curl Maker", origin: "États-Unis", zone: "cheveux", step: "soin", act: [], for: ["boucles", "crepus"], avoid: [], desc: "Gel-crème pour définir les boucles." },
    { id: "auntjackie", brand: "Aunt Jackie's", name: "Curl La La Defining Curl Custard", origin: "États-Unis", zone: "cheveux", step: "soin", act: [], for: ["boucles", "crepus"], avoid: [], desc: "Crème coiffante petit prix pour boucles et frisottis." },
    { id: "kinkycurly", brand: "Kinky-Curly", name: "Knot Today Leave-In Detangler", origin: "États-Unis", zone: "cheveux", step: "soin", act: [], for: ["crepus", "boucles"], avoid: [], desc: "Sans rinçage qui facilite le démêlage des cheveux crépus." },
    { id: "tgin", brand: "tgin", name: "Honey Miracle Hair Mask", origin: "États-Unis", zone: "cheveux", step: "masque", act: [], for: ["crepus", "secs", "boucles"], avoid: ["ruche"], desc: "Masque nourrissant au miel pour cheveux crépus secs." },
    { id: "thedoux", brand: "The Doux", name: "Mousse Def Texture Foam", origin: "États-Unis", zone: "cheveux", step: "soin", act: [], for: ["boucles", "crepus"], avoid: [], desc: "Mousse coiffante pour définir boucles et twists." },
    { id: "sheashampoo", brand: "SheaMoisture", name: "Jamaican Black Castor Oil Strengthen & Restore Shampoo", origin: "États-Unis", zone: "cheveux", step: "shampoing", act: ["ricin", "karite"], for: ["crepus", "secs", "boucles"], avoid: [], desc: "Shampoing doux à l'huile de ricin pour cheveux crépus et fragiles." },
    { id: "briogeo", brand: "Briogeo", name: "Don't Despair, Repair! Deep Conditioning Mask", origin: "États-Unis", zone: "cheveux", step: "masque", act: [], for: ["secs", "colores", "boucles"], avoid: [], desc: "Masque réparateur pour tous types de cheveux abîmés." },
    { id: "olaplex3", brand: "Olaplex", name: "No.3 Hair Perfector", origin: "États-Unis", zone: "cheveux", step: "masque", act: [], for: ["colores", "secs"], avoid: [], desc: "Soin avant shampoing pour cheveux colorés, décolorés ou lissés." },
    { id: "furterer", brand: "René Furterer", name: "Karité Nutri Masque Nutrition Intense", origin: "France", zone: "cheveux", step: "masque", act: ["karite"], for: ["secs", "crepus", "boucles"], avoid: [], desc: "Masque de pharmacie au karité pour cheveux très secs." },
    { id: "kloranemangue", brand: "Klorane", name: "Masque Nutrition à la Mangue", origin: "France", zone: "cheveux", step: "masque", act: [], for: ["secs", "ondules", "boucles"], avoid: [], desc: "Masque nourrissant de pharmacie, bon rapport qualité-prix." },
    { id: "anaphase", brand: "Ducray", name: "Anaphase+ Shampooing", origin: "France", zone: "cuir", step: "shampoing", act: [], for: ["fins", "cuirOk"], avoid: [], desc: "Shampoing de pharmacie pour cheveux fins qui manquent de densité. Une chute importante se montre à un médecin." },
    { id: "nodeds", brand: "Bioderma", name: "Nodé DS+ Shampooing", origin: "France", zone: "cuir", step: "shampoing", act: [], for: ["cuirPellicules", "cuirSensible", "cuirDS"], avoid: [], desc: "Shampoing de pharmacie pour les pellicules et les rougeurs du cuir chevelu." },
    { id: "skingourmet", brand: "Skin Gourmet", name: "Beurre de karité brut", origin: "Ghana", madeIn: "au Ghana", zone: "corps", step: "corps", act: ["karite"], for: ["corpsSec", "corpsTresSec", "secs", "crepus"], avoid: [], desc: "Marque d'Accra qui travaille des ingrédients ghanéens bruts." },
    { id: "kocos", brand: "Kocos Cosmétiques", name: "Soins au beurre de karité", origin: "Mali", madeIn: "au Mali", zone: "corps", step: "corps", act: ["karite"], for: ["corpsSec", "corpsTresSec", "corpsOk"], avoid: [], desc: "Laits, crèmes et savons au karité, créés par une pharmacienne malienne." },
    { id: "nuhanciam", brand: "Nuhanciam", name: "Baume Corps Réparateur Intense", origin: "France", zone: "corps", step: "corps", act: ["karite", "hyaluronique"], for: ["corpsTresSec", "corpsSec", "corpsMarques"], avoid: [], desc: "Baume corps pensé pour les peaux noires et métissées." },
    { id: "illiyoonbody", brand: "Illiyoon", name: "Ceramide Ato Lotion", origin: "Corée", zone: "corps", step: "corps", act: ["ceramides"], for: ["corpsSec", "corpsSensible", "corpsOk"], avoid: [], desc: "Lait corps aux céramides, texture légère." },
    { id: "nectarome", brand: "Nectarome", name: "Huile d'argan bio", origin: "Maroc", madeIn: "au Maroc", zone: "corps", step: "huile", act: ["argan"], for: ["corpsSec", "secs", "colores", "ondules", "raides"], avoid: [], desc: "Huile d'argan pressée près de Marrakech, pour le corps ou les longueurs." },
    // Cheveux
    { id: "loly", brand: "Les Secrets de Loly", name: "Kurl Nectar", origin: "France", zone: "cheveux", step: "soin", act: ["aloe"], for: ["ondules", "boucles", "crepus"], avoid: [], desc: "Soin sans rinçage pour cheveux ondulés à crépus, par une marque afro-descendante." },
    { id: "activilong", brand: "Activilong", name: "Actiforce Masque-Soin", origin: "France", zone: "cheveux", step: "masque", act: ["karite"], for: ["crepus", "boucles", "secs"], avoid: [], desc: "Masque au beurre de karité pour cheveux bouclés à crépus." },
    { id: "adaaada", brand: "Adaa Ada", name: "Soins cheveux crépus", origin: "Sénégal", zone: "cheveux", step: "soin", act: ["karite"], for: ["crepus", "boucles"], avoid: [], desc: "Marque sénégalaise dédiée aux cheveux crépus." },
    { id: "tsubaki", brand: "Tsubaki", name: "Premium Repair Shampoo", origin: "Japon", zone: "cheveux", step: "shampoing", act: ["camelia"], for: ["secs", "colores", "raides", "ondules"], avoid: [], desc: "Shampoing à l'huile de camélia." },
    { id: "fino", brand: "Fino", name: "Premium Touch Hair Mask", origin: "Japon", zone: "cheveux", step: "masque", act: ["camelia"], for: ["secs", "colores", "raides", "ondules", "fins"], avoid: [], desc: "Masque capillaire japonais très populaire, texture riche." },
    // Cuir chevelu
    { id: "aromatica", brand: "Aromatica", name: "Rosemary Scalp Scaling Shampoo", origin: "Corée", zone: "cuir", step: "shampoing", act: ["romarin"], for: ["cuirGras", "cuirPellicules"], avoid: ["reactifHE", "cuirSensible"], desc: "Shampoing au romarin pour cuir chevelu qui regraisse vite." },
    { id: "daenggi", brand: "Daeng Gi Meo Ri", name: "Ki Gold Energizing Shampoo", origin: "Corée", zone: "cuir", step: "shampoing", act: ["ginseng"], for: ["cuirOk", "cuirGras", "fins"], avoid: [], desc: "Shampoing coréen aux extraits de plantes de la pharmacopée traditionnelle." }    ,
    // --- Cheveux et cuir chevelu : K-beauty, J-beauty et pharmacie (ajout du 25 octobre 2026) ---
    { id: "sbmscalp", brand: "SOME BY MI", name: "Cica Peptide Anti Hair Loss Derma Scalp Shampoo", origin: "Corée", zone: "cuir", step: "shampoing", act: ["centella"], for: ["cuirGras", "cuirSensible", "chute", "fins", "tempes"], avoid: [], desc: "Shampoing coréen à la centella et aux peptides pour le cuir chevelu. « Anti-chute » désigne en cosmétique la chute par casse : une chute importante se montre à un médecin." },
    { id: "lilyevescalp", brand: "lilyeve", name: "Scalp Turn Cica Pore Deep Clean Shampoo", origin: "Corée", zone: "cuir", step: "shampoing", act: ["centella"], for: ["cuirGras", "cuirPellicules"], avoid: ["cuirSec"], desc: "Shampoing purifiant coréen pour un cuir chevelu qui regraisse vite." },
    { id: "b107", brand: "107 Beauty", name: "Scalp Purifying Microbiome Shampoo", origin: "Corée", zone: "cuir", step: "shampoing", act: ["ferments"], for: ["cuirGras", "cuirSensible", "cuirPellicules"], avoid: [], desc: "Shampoing coréen aux ferments, pensé pour l'équilibre du cuir chevelu." },
    { id: "medicuberos", brand: "medicube", name: "Shampoing volume au romarin", origin: "Corée", zone: "cuir", step: "shampoing", act: ["romarin"], for: ["cuirGras", "fins"], avoid: ["reactifHE", "cuirSensible"], desc: "Shampoing coréen rafraîchissant au romarin, pour racines grasses et cheveux fins." },
    { id: "kerium", brand: "La Roche-Posay", name: "Kerium DS Shampooing", origin: "France", zone: "cuir", step: "shampoing", act: [], for: ["cuirDS", "cuirPellicules"], avoid: [], desc: "Shampoing de pharmacie pour les états pelliculaires sévères et les rougeurs. Il accompagne le suivi médical, il ne le remplace pas." },
    { id: "kertyol", brand: "Ducray", name: "Kertyol P.S.O. Shampooing", origin: "France", zone: "cuir", step: "shampoing", act: [], for: ["cuirPso"], avoid: [], desc: "Shampoing de pharmacie pour les cuirs chevelus à squames épaisses. Il accompagne le suivi médical du psoriasis, il ne le remplace pas." },
    { id: "nodek", brand: "Bioderma", name: "Nodé K Shampooing", origin: "France", zone: "cuir", step: "shampoing", act: [], for: ["cuirPso"], avoid: [], desc: "Shampoing de pharmacie pour les squames épaisses du cuir chevelu, à utiliser en complément d'un avis médical." },
    { id: "aromaticaroot", brand: "Aromatica", name: "Rosemary Root Enhancer", origin: "Corée", zone: "cuir", step: "cuirsoin", act: ["romarin"], for: ["fins", "chute", "cuirGras", "tempes"], avoid: ["reactifHE", "cuirSensible", "cuirPso", "cuirDS", "enceinte"], desc: "Tonique coréen au romarin pour le cuir chevelu, sans rinçage. Les promesses de pousse ne sont pas prouvées." },
    { id: "aromaticapdrn", brand: "Aromatica", name: "Rosemary PDRN Scalp Serum", origin: "Corée", zone: "cuir", step: "cuirsoin", act: ["romarin", "pdrn"], for: ["fins", "chute", "cuirSec"], avoid: ["reactifHE", "cuirSensible", "cuirPso", "cuirDS", "enceinte", "vegan"], desc: "Sérum coréen pour le cuir chevelu, au romarin et au PDRN." },
    { id: "sbmtonic", brand: "SOME BY MI", name: "Cica Peptide Anti Hair Loss Derma Scalp Tonic", origin: "Corée", zone: "cuir", step: "cuirsoin", act: ["centella"], for: ["cuirGras", "chute", "fins", "tempes"], avoid: ["cuirPso", "cuirDS"], desc: "Tonique coréen pour le cuir chevelu, en spray. Il accompagne, il ne remplace pas un avis médical en cas de chute." },
    { id: "lilyeveexo", brand: "lilyeve", name: "Grow Turn Exosome Brush Ampoule", origin: "Corée", zone: "cuir", step: "cuirsoin", act: [], for: ["fins", "chute", "tempes"], avoid: ["cuirSensible", "cuirPso", "cuirDS"], desc: "Ampoule coréenne avec embout massant. Les exosomes sont un actif récent, avec encore peu de recul." },
    { id: "lilyevepdrn", brand: "lilyeve", name: "Scalp Turn Cica PDRN Brush Ampoule", origin: "Corée", zone: "cuir", step: "cuirsoin", act: ["centella", "pdrn"], for: ["cuirGras", "cuirSec"], avoid: ["cuirPso", "cuirDS", "vegan"], desc: "Ampoule coréenne à la centella et au PDRN, avec embout massant." },
    { id: "vtpdrnhair", brand: "VT", name: "PDRN Reedle Shot Brush Hair Serum", origin: "Corée", zone: "cuir", step: "cuirsoin", act: ["pdrn"], for: ["fins", "chute", "cuirGras"], avoid: ["cuirSensible", "cuirPso", "cuirDS", "vegan"], desc: "Sérum coréen aux micro-aiguilles végétales (« reedle ») : picotements possibles, à éviter sur un cuir chevelu irrité." },
    { id: "kaminomoto", brand: "Kaminomoto", name: "Super Strength Hair Serum Gold", origin: "Japon", zone: "cuir", step: "cuirsoin", act: [], for: ["chute", "fins", "tempes"], avoid: ["cuirSensible", "cuirPso", "cuirDS", "enceinte"], desc: "Lotion japonaise historique pour le cuir chevelu, classée « quasi-médicament » au Japon. Contient de l'alcool. Vérifie la composition et l'importateur en France." },
    { id: "seapuri", brand: "Seapuri", name: "Scalpy Hair Serum", origin: "Corée", zone: "cuir", step: "cuirsoin", act: [], for: ["cuirSec", "cuirSensible", "fins"], avoid: [], desc: "Sérum coréen à bille pour le cuir chevelu et les longueurs." },
    { id: "epais", brand: "epais", name: "Scalp Boosting Ampoule", origin: "Corée", zone: "cuir", step: "cuirsoin", act: [], for: ["fins", "chute"], avoid: ["cuirPso", "cuirDS"], desc: "Ampoule coréenne pour le cuir chevelu, pour cheveux fins." },
    { id: "moevtonic", brand: "MOEV", name: "Annurcatin Hair Tonic", origin: "Corée", zone: "cuir", step: "cuirsoin", act: [], for: ["fins", "chute"], avoid: ["cuirPso", "cuirDS"], desc: "Tonique coréen à l'extrait de pomme Annurca, pour le cuir chevelu." },
    { id: "dercosamx", brand: "Vichy", name: "Dercos Aminexil Clinical 5", origin: "France", zone: "cuir", step: "cuirsoin", act: [], for: ["chute", "fins", "tempes"], avoid: [], desc: "Soin de pharmacie pour les chutes passagères. Une chute qui dure plus de 3 mois se montre à un médecin." },
    { id: "neoptide", brand: "Ducray", name: "Neoptide Expert", origin: "France", zone: "cuir", step: "cuirsoin", act: [], for: ["chute", "fins"], avoid: [], desc: "Sérum de pharmacie pour cheveux qui manquent de densité. Il accompagne, il ne remplace pas un bilan médical." },
    { id: "aromaticascrub", brand: "Aromatica", name: "Rosemary Scalp Scrub", origin: "Corée", zone: "cuir", step: "gommagecuir", act: ["romarin"], for: ["cuirGras", "cuirPellicules"], avoid: ["cuirSensible", "cuirPso", "cuirDS", "reactifHE", "cuirSec"], desc: "Gommage coréen du cuir chevelu au romarin, une fois par semaine au plus." },
    { id: "andhoneytreat", brand: "&honey", name: "Melty Moist Repair Hair Treatment 2.0", origin: "Japon", zone: "cheveux", step: "apres", act: [], for: ["secs", "colores", "boucles", "ondules", "crepus"], avoid: ["ruche"], desc: "Après-shampoing japonais au miel, très suivi au Japon." },
    { id: "finocond", brand: "Fino", name: "Premium Touch Conditioner", origin: "Japon", zone: "cheveux", step: "apres", act: ["camelia"], for: ["secs", "colores", "raides", "ondules"], avoid: [], desc: "Après-shampoing japonais de la gamme du masque Fino." },
    { id: "aromaticacond", brand: "Aromatica", name: "Rosemary Hair Thickening Conditioner", origin: "Corée", zone: "cheveux", step: "apres", act: ["romarin"], for: ["fins", "raides", "ondules"], avoid: ["reactifHE"], desc: "Après-shampoing coréen léger au romarin, pour cheveux fins." },
    { id: "moevtreat", brand: "MOEV", name: "Annurcatin Treatment", origin: "Corée", zone: "cheveux", step: "apres", act: [], for: ["secs", "fins"], avoid: [], desc: "Soin capillaire coréen nourrissant, à rincer." },
    { id: "tsubakimask", brand: "Tsubaki", name: "Premium EX Repair Mask", origin: "Japon", zone: "cheveux", step: "masque", act: ["camelia"], for: ["secs", "colores", "boucles", "crepus", "ondules"], avoid: [], desc: "Masque japonais à l'huile de camélia, pour les longueurs abîmées." },
    { id: "elizavecca", brand: "Elizavecca", name: "CER-100 Collagen Ceramide Coating Protein Treatment", origin: "Corée", zone: "cheveux", step: "masque", act: ["ceramides"], for: ["secs", "colores", "boucles", "crepus"], avoid: [], desc: "Soin coréen très connu aux céramides et protéines, pour les cheveux abîmés." },
    { id: "finooil", brand: "Fino", name: "Premium Touch Hair Oil", origin: "Japon", zone: "cheveux", step: "soin", act: ["camelia"], for: ["secs", "colores"], avoid: [], desc: "Huile capillaire japonaise pour les pointes." },
    { id: "andhoneyoil", brand: "&honey", name: "Melty Moist Repair Hair Oil 3.0", origin: "Japon", zone: "cheveux", step: "soin", act: [], for: ["secs", "boucles", "ondules"], avoid: ["ruche"], desc: "Huile capillaire japonaise au miel, pour les longueurs sèches." },
    { id: "orbishm", brand: "Orbis", name: "Essence In Hair Milk", origin: "Japon", zone: "cheveux", step: "soin", act: [], for: ["secs", "colores", "boucles", "ondules", "crepus"], avoid: [], desc: "Lait capillaire japonais sans rinçage, léger." },
    { id: "elizaoil", brand: "Elizavecca", name: "CER-100 Hair Muscle Essence Oil", origin: "Corée", zone: "cheveux", step: "soin", act: [], for: ["secs", "colores"], avoid: [], desc: "Huile capillaire coréenne pour les pointes sèches." },
    { id: "tocobo", brand: "TOCOBO", name: "Heat Proof Hair Mist", origin: "Corée", zone: "cheveux", step: "thermo", act: [], for: ["raides", "ondules", "boucles", "crepus", "secs", "colores"], avoid: [], desc: "Brume coréenne à vaporiser avant le sèche-cheveux ou le lisseur." },
    // --- Douche et corps ---
    { id: "saltstonewash", brand: "Salt & Stone", name: "Body Wash Santal & Vetiver", origin: "États-Unis", zone: "corps", step: "gel", act: ["niacinamide", "hyaluronique"], for: ["corpsOk", "corpsSec", "corpsSenteur"], avoid: ["corpsSensible", "reactifHE"], desc: "Gel douche parfumé à la niacinamide et à l'acide hyaluronique, en flacon rechargeable. Très parfumé : pas pour les peaux réactives." },
    { id: "saltstonelotion", brand: "Salt & Stone", name: "Body Lotion Santal & Vetiver", origin: "États-Unis", zone: "corps", step: "corps", act: ["niacinamide"], for: ["corpsSec", "corpsSenteur", "corpsNourrir"], avoid: ["corpsSensible", "reactifHE"], desc: "Lait corps parfumé à la niacinamide, de la même gamme que le gel douche." },
    { id: "summerfridays", brand: "Summer Fridays", name: "Body Butter", origin: "États-Unis", zone: "corps", step: "corps", act: [], for: ["corpsSec", "corpsSenteur", "corpsNourrir"], avoid: ["corpsSensible", "reactifHE"], desc: "Beurre corporel aux senteurs des baumes à lèvres de la marque (vanille, goyave rose, lait de pistache). Vérifie la composition sur le site de la marque." },
    { id: "roundlabbody", brand: "Round Lab", name: "Pine Calming Cica Body Wash", origin: "Corée", zone: "corps", step: "gel", act: ["centella"], for: ["corpsSensible", "corpsOk", "corpsSec"], avoid: [], desc: "Gel douche coréen doux à la centella." },
    { id: "curelbody", brand: "Curel (Kao)", name: "Intensive Moisture Care Body Wash", origin: "Japon", zone: "corps", step: "gel", act: ["ceramides"], for: ["corpsSec", "corpsTresSec", "corpsSensible"], avoid: [], desc: "Nettoyant corps japonais pour peaux sèches et sensibles." },
    { id: "kosedeo", brand: "Kose", name: "Deo Carat Deodorant Body Wash", origin: "Japon", zone: "corps", step: "gel", act: [], for: ["corpsOk"], avoid: ["corpsSensible"], desc: "Gel douche japonais pensé contre les odeurs corporelles, pour le sport et l'été." },
    { id: "pelicanback", brand: "Pelican", name: "For Back Soap", origin: "Japon", zone: "corps", step: "gel", act: [], for: ["imperfections", "corpsMarques"], avoid: ["corpsSensible"], desc: "Savon japonais pensé pour le dos sujet aux boutons. Vérifie la composition et l'importateur." },
    { id: "sbmbody", brand: "SOME BY MI", name: "AHA BHA PHA 30 Days Miracle Acne Body Cleanser", origin: "Corée", zone: "corps", step: "gel", act: ["aha", "bha", "pha"], for: ["imperfections", "corpsMarques"], avoid: ["corpsSensible", "enceinte"], desc: "Nettoyant corps coréen aux acides exfoliants, pour le dos et le décolleté. À rincer, quelques fois par semaine pour commencer." }
  ];

  var STEP_LABEL = { essence: "Essence", nuit: "Masque de nuit", masquev: "Masque visage", demaquillant: "Démaquillage", nettoyant: "Nettoyant", tonique: "Tonique", serum: "Sérum", exfoliant: "Exfoliant (1 à 2 fois par semaine)", yeux: "Contour des yeux", hydratant: "Hydratant", spf: "Protection solaire", corps: "Soin du corps", huile: "Huile", shampoing: "Shampoing", soin: "Soin cheveux sans rinçage", masque: "Masque cheveux", apres: "Après-shampoing", cuirsoin: "Soin du cuir chevelu", gommagecuir: "Gommage du cuir chevelu", thermo: "Protection chaleur", gel: "Nettoyant corps" };

  // ---------------------------------------------------------------------------
  // TENDANCES · formulées avec recul (sources listées en bas de l'onglet)
  // ---------------------------------------------------------------------------
  var TRENDS = [
    { reg: "France", t: "Des routines plus courtes", d: "Le « skinimalisme » : 3 à 5 gestes ciblés plutôt que 10 produits. La priorité va à la barrière cutanée.", act: ["ceramides", "panthenol"], avis: "Une bonne nouvelle pour ta peau et ton budget. Mieux vaut peu de produits bien choisis." },
    { reg: "France", t: "La preuve avant le marketing", d: "Les consommatrices font davantage confiance à la dermocosmétique et aux résultats testés qu'aux promesses d'influence.", act: [], avis: "Regarde la liste INCI et les tests annoncés. Méfie-toi des chiffres sans source." },
    { reg: "France", t: "La protection solaire tous les jours", d: "Le SPF quotidien s'installe, porté par les textures légères venues d'Asie.", act: ["spf"], avis: "Le geste le plus utile, sur toutes les carnations, toute l'année." },
    { reg: "Asie", t: "Le PDRN, de la clinique au flacon", d: "Ingrédient star de la K-beauty en 2026, présent dans des sérums, crèmes et masques.", act: ["pdrn"], avis: "À suivre avec recul : les preuves en cosmétique restent limitées et varient selon les formules." },
    { reg: "Asie", t: "Apaiser plutôt qu'agresser", d: "Centella, heartleaf, panthénol et céramides dominent les routines coréennes.", act: ["centella", "heartleaf", "panthenol", "ceramides"], avis: "Idéal pour les peaux sensibles et les routines simples." },
    { reg: "Asie", t: "Le cuir chevelu traité comme la peau", d: "Sérums, gommages et shampoings dédiés au cuir chevelu : la « skinification » des cheveux.", act: ["romarin", "panthenol"], avis: "Intéressant, mais une démangeaison ou une rougeur qui dure mérite un avis médical." },
    { reg: "Asie", t: "Riz et ferments", d: "Ingrédients historiques de la beauté japonaise et coréenne, remis au goût du jour.", act: ["riz", "ferments"], avis: "Doux et sensoriels, parfaits pour l'éclat." },
    { reg: "Afrique", t: "L'essor de l'A-Beauty", d: "Une nouvelle génération de marques africaines retravaille les ingrédients locaux et valorise les coopératives de productrices.", act: ["karite", "marula", "baobab"], avis: "Une tendance qui rejoint la vision de Sunsoari : transmission, savoir-faire et femmes entrepreneures." },
    { reg: "Afrique", t: "Karité, marula, baobab", d: "Les huiles et beurres locaux sont choisis pour leur efficacité et leur valeur culturelle.", act: ["karite", "marula", "baobab", "moringa"], avis: "Riches et nourrissants : parfaits pour le corps et les longueurs." },
    { reg: "Afrique", t: "Le rituel chébé", d: "Rituel tchadien de protection des longueurs, très suivi par les communautés cheveux naturels.", act: ["chebe"], avis: "Beau rituel de transmission. Les promesses de pousse spectaculaire ne sont pas prouvées." },
    { reg: "Afrique", t: "Le savon noir revisité", d: "Le savon noir d'Afrique de l'Ouest se décline en toniques, nettoyants et shampoings.", act: ["savonnoir"], avis: "Nettoie bien, mais peut dessécher : à associer à un soin hydratant." }
  ];
  var TREND_SOURCES = [
    ["Rapport YouGov 2026 · Cosmetics Insiders", "https://www.cosmetics-insiders.com/les-francaises-et-lanti-age-ce-que-revele-le-rapport-yougov-2026"],
    ["Tendances cosmétiques 2026 · MBA MCI", "https://blog.mbadmb.com/tendances-cosmetiques-2026/"],
    ["2026 K-Beauty Forecast · BeautyMatter", "https://beautymatter.com/articles/2026-k-beauty-forecast-top-7-data-backed-trends"],
    ["K-Beauty 2026 et PDRN · Hyaluflow", "https://hyaluflow.com/post/k-beauty-trends-2026-what-u-s-skin-is-loving"],
    ["Africa Wellness Trends 2026 · Global Wellness Institute", "https://globalwellnessinstitute.org/global-wellness-institute-blog/2026/04/03/africa-wellness-initiative-trends-for-2026/"],
    ["A-Beauty · Euromonitor (décembre 2025)", "https://www.euromonitor.com/newsroom/press-releases/december-2025/cultural-identity-drives-the-rise-of-a-beauty-in-the-middle-east-and-africa-euromonitor-international"]
  ];

  // ---------------------------------------------------------------------------
  // PRODUITS SUNSOARI : ce qui distingue chaque système de douche (fiches produits)
  // ---------------------------------------------------------------------------
  var SHOWER_FACTS = {
    shift: { name: "SHIFT", pts: ["Filtre à sédiments Pure Water, puis capsule de soin", "Capsules : vitamine C, aloe vera, huile de coco, karité, tréhalose et huiles essentielles", "Senteurs : Tea Tree & Lavender, Basil & Grass, Ginger & Bergamote (coffret) · Hinoki Spring, Cherry Blossom, Patchouli & Rose, Fruité, Découverte (packs de 6)", "Coffret complet avec flexible silicone 2 m, 4 coloris"], care: "Les capsules contiennent des huiles essentielles, dont le tea tree." },
    onsha: { name: "Onsha", pts: ["Pommeau au jet fin (197 micro-trous)", "Filtre thermal vitaminé 2-en-1 (sédiments + capsule thermale)", "5 senteurs dont une version sans senteur", "Formats Home et Nomade (voyage)"], care: "Version sans senteur disponible pour les peaux qui réagissent aux parfums." }
  };

  var SECTIONS = ["Ta douche", "Ton visage", "Ton corps", "Tes cheveux", "Tes envies"];

  var QUESTIONS = [
    { id: "voix", sec: 0, type: "voice", kicker: "Toi" },
    { id: "lieu", sec: 0, title: "Où prends-tu ta douche le plus souvent ?", sub: "On te propose le bon format : à installer chez toi ou à emporter.",
      options: [["maison", "Chez moi", "Ma douche de tous les jours", "home"], ["voyage", "Souvent en déplacement", "Hôtel, location, salle de sport", "plane"], ["deux", "Les deux", "Chez moi et en voyage", "both"]] },
    { id: "flexible", sec: 0, title: "Ta douche a-t-elle une douchette reliée à un flexible ?", sub: "C'est là que se vissent nos pommeaux et nos coques.",
      options: [["oui", "Oui", "Un tuyau souple et une douchette", "shower"], ["non", "Non", "Seulement une douche de tête fixe", "no"], ["nsp", "Je ne sais pas", "On t'aide à vérifier", "ask"]] },
    { id: "eau", sec: 0, title: "Comment est l'eau chez toi ?", sub: "Indice : des traces blanches sur la robinetterie signalent souvent une eau calcaire.",
      link: ["Voir la qualité de l'eau de ta commune", "https://www.eaupotable.sante.gouv.fr/"],
      options: [["douce", "Plutôt douce", "Peu de traces blanches", "drop"], ["moyenne", "Moyenne", "Un peu de calcaire", "drops"], ["calcaire", "Calcaire", "Traces blanches fréquentes", "dots"], ["nsp", "Je ne sais pas", "", "ask"]] },
    { id: "infoEau", sec: 0, type: "info", kind: "eau" },

    { id: "photoVisage", sec: 1, type: "capture" },
    { id: "toi", sec: 1, type: "text", title: "Faisons connaissance", sub: "Facultatif : pour personnaliser ton résultat. Rien ne quitte ton téléphone.",
      fields: [["prenom", "Ton prénom", "text", ""], ["age", "Ton âge", "number", ""], ["rythme", "Ton rythme de vie", "text", "Ex. maman, travail de nuit, étudiante…"]] },
    { id: "genre", sec: 1, title: "Tu es…", sub: "Pour adapter nos conseils. Tu peux passer.",
      options: [["femme", "Une femme", "", "heart"], ["homme", "Un homme", "", "heart"], ["autre", "Je me décris autrement", "", "sprout"], ["nsp", "Je préfère ne pas répondre", "", "ask"]] },
    { id: "infoTest", sec: 1, type: "info", kind: "test" },
    { id: "pt_apres", sec: 1, title: "Une heure après t'être lavé le visage, sans rien appliquer, ta peau…", sub: "Pas sûre ? Fais le test ce soir avec un nettoyant doux, puis reviens.",
      options: [["tire", "Tiraille un peu partout", "", "dry"], ["tzone", "Brille sur le front, le nez ou le menton", "Le reste du visage va bien", "halfsun"], ["brille", "Brille un peu partout", "", "drops"], ["ok", "Est confortable", "Ni sèche, ni grasse", "heart"]] },
    { id: "pt_soir", sec: 1, title: "En fin de journée, ton visage…", sub: "",
      options: [["mat", "Reste mat, voire tiraille", "", "dry"], ["tz", "Brille sur le front, le nez et le menton", "", "halfsun"], ["tout", "Brille sur tout le visage", "", "drops"], ["var", "Ça dépend des jours", "", "ask"]] },
    { id: "pt_pores", sec: 1, title: "Dans le miroir, tes pores sont…", sub: "",
      options: [["peu", "Peu visibles", "", "none"], ["nez", "Visibles sur le nez et autour", "", "dots"], ["joues", "Visibles aussi sur les joues", "", "spots"]] },
    { id: "pt_peaux", sec: 1, title: "As-tu des zones rêches ou des petites peaux qui pèlent ?", sub: "",
      options: [["souvent", "Souvent", "", "dry"], ["hiver", "Parfois, surtout en hiver", "", "wave"], ["rare", "Rarement", "", "none"]] },
    { id: "pt_creme", sec: 1, title: "Quand tu mets une crème hydratante classique…", sub: "",
      options: [["boit", "Elle disparaît vite, j'en remets", "Ma peau en redemande", "dry"], ["ok", "Elle pénètre bien, c'est confortable", "", "heart"], ["zones", "Parfaite sur les joues, trop riche sur le front et le nez", "", "halfsun"], ["brille", "Elle me fait briller ou me donne des boutons", "", "drops"]] },
    { id: "pt_deshy", sec: 1, title: "Ta peau peut-elle briller et tirailler en même temps ?", sub: "C'est un signe fréquent de manque d'eau, quel que soit ton type de peau.",
      options: [["oui", "Oui, ça m'arrive", "", "yes"], ["non", "Non", "", "no"], ["nsp", "Je ne sais pas", "", "ask"]] },
    { id: "pt_reac", sec: 1, title: "Quand tu essaies un nouveau produit, ta peau…", sub: "",
      options: [["souvent", "Picote, rougit ou chauffe souvent", "", "flame"], ["parfois", "Réagit de temps en temps", "", "halfsun"], ["rare", "Réagit rarement", "", "heart"]] },
    { id: "pt_reac2", sec: 1, title: "Le soleil, le froid ou les vacances te donnent des irritations ?", sub: "",
      options: [["souvent", "Oui, souvent", "", "flame"], ["parfois", "Parfois", "", "halfsun"], ["rare", "Presque jamais", "", "heart"]] },
    { id: "spfHabit", sec: 1, title: "Tu mets une crème solaire sur le visage ?", sub: "",
      options: [["tlj", "Tous les jours", "", "sun"], ["ete", "Seulement en été ou en vacances", "", "halfsun"], ["jamais", "Jamais ou presque", "", "none"]] },
    { id: "saisons", sec: 1, title: "Et selon les saisons ?", sub: "Plusieurs choix possibles.", multi: true, none: "stable",
      options: [["hiver", "Plus sèche en hiver", "", "dry"], ["ete", "Plus grasse en été", "", "sun"], ["change", "Réactive aux changements de saison", "", "wave"], ["stable", "Pas de différence", "", "none"]] },
    { id: "antecedents", sec: 1, title: "Un ou une médecin t'a déjà parlé de…", sub: "Plusieurs choix possibles. On écartera ce qui pourrait irriter.", multi: true, none: "aucun",
      options: [["eczema", "Eczéma ou dermatite", "", "dry"], ["rosacee", "Rosacée", "", "flame"], ["psoriasis", "Psoriasis", "", "wave"], ["acne", "Acné suivie par un médecin", "", "dots"], ["traitement", "Un traitement de dermatologue en cours", "", "ask"], ["allergies", "Des allergies connues à des cosmétiques", "", "flame"], ["aucun", "Rien de tout ça", "", "none"]] },
    { id: "modeVie", sec: 1, title: "Ton quotidien, c'est plutôt…", sub: "Plusieurs choix possibles. Pour des astuces adaptées.", multi: true, none: "rien",
      options: [["soleil", "Souvent dehors ou au soleil", "", "sun"], ["sport", "Du sport régulier", "", "wave"], ["ville", "La ville, la pollution", "", "dots"], ["ecrans", "Beaucoup d'écrans", "", "halfsun"], ["sommeil", "Peu de sommeil ou du stress", "", "moon"], ["maquillage", "Je me maquille tous les jours", "", "flower"], ["rien", "Rien de particulier", "", "none"]] },
    { id: "infoPeau", sec: 1, type: "info", kind: "peau" },
    { id: "carnation", sec: 1, title: "Quelle est ta carnation ?", sub: "Pour choisir des solaires sans trace blanche et prévenir les marques. Tu peux passer.",
      options: [["claire", "Claire", "Rougit et brûle facilement, bronze peu", "halfsun"], ["mate", "Mate à métissée", "Rougit parfois, bronze bien", "sun"], ["foncee", "Foncée", "Rougit rarement", "heart"], ["tresfoncee", "Très foncée", "Ne rougit presque jamais", "heart"], ["nsp", "Je préfère ne pas répondre", "", "ask"]] },
    { id: "concerns", sec: 1, title: "Qu'aimerais-tu améliorer ?", sub: "Jusqu'à 5 choix. On adapte tes conseils et tes produits.", multi: true, max: 5, none: "aucune",
      options: [["secheresse", "Sécheresse, tiraillements", "", "dry"], ["imperfections", "Boutons, imperfections", "", "dots"], ["pointsnoirs", "Points noirs", "", "dots"], ["brillance", "Brillance", "", "drops"], ["marques", "Marques après les boutons", "", "spots"], ["cernes", "Cernes", "", "moon"], ["rougeurs", "Rougeurs, sensibilité", "", "flame"], ["teint", "Teint terne", "", "halfsun"], ["texture", "Grain de peau irrégulier", "", "wave"], ["taches", "Taches, teint inégal", "", "spots"], ["rides", "Ridules, fermeté", "", "sprout"], ["aucune", "Rien de particulier", "", "none"]] },
    { id: "tachesNiveau", sec: 1, title: "Comment décrirais-tu tes taches aujourd'hui ?", sub: "Ton ressenti suffit. Ça nous aide à doser ta routine.", skipIf: function (a) { return !has(a, "concerns", "taches") && !has(a, "concerns", "marques"); },
      options: [["t1", "Légères ou récentes", "Quelques marques après des boutons", "halfsun"], ["t2", "Visibles depuis plusieurs mois", "", "spots"], ["t3", "Marquées, anciennes ou étendues", "", "dots"], ["t4", "Très marquées, ou une tache qui change", "Un avis médical d'abord", "ask"]] },
    { id: "reactions", sec: 1, title: "Ta peau a-t-elle déjà mal réagi à…", sub: "Plusieurs choix possibles. Ça nous aide à écarter certains produits.", multi: true, none: "rien",
      options: [["reactifHE", "Parfums ou huiles essentielles", "", "flower"], ["acides", "Acides exfoliants", "", "wave"], ["ruche", "Produits de la ruche", "Miel, propolis", "leaf"], ["rien", "Rien de particulier", "", "none"]] },
    { id: "reacCause", sec: 1, title: "D'après toi, cette réaction a pu venir…", sub: "Plusieurs choix possibles. Une réaction n'a pas toujours la cause qu'on croit.", multi: true, none: "nsp",
      skipIf: function (a) { var r = a.reactions || []; return !r.length || r.indexOf("rien") > -1; },
      options: [["fort", "D'un produit trop fort ou utilisé trop souvent", "", "flame"], ["peeling", "D'un peeling ou d'un soin en institut", "", "wave"], ["medicament", "D'un traitement médical", "Acné, rétinoïde sur ordonnance, antibiotique…", "ask"], ["soleil", "Du soleil après le produit", "", "sun"], ["melange", "D'un mélange de plusieurs actifs", "", "dots"], ["nsp", "Je ne sais pas", "", "none"]] },
    { id: "valeurs", sec: 1, title: "Évites-tu certains ingrédients par conviction ?", sub: "", multi: true, none: "aucun",
      options: [["vegan", "Ingrédients d'origine animale", "Je préfère le vegan", "leaf"], ["aucun", "Non, pas particulièrement", "", "none"]] },
    { id: "grossesse", sec: 1, skipIf: function (a) { return a.genre === "homme"; }, title: "En ce moment, es-tu…", sub: "Ta peau change avec les hormones, et certains actifs sont déconseillés pendant la grossesse. Ta réponse reste sur ton téléphone.",
      options: [["oui", "Enceinte ou allaitante", "", "heart"], ["menopause", "En ménopause ou périménopause", "", "moon"], ["non", "Rien de tout ça", "", "none"], ["nsp", "Je préfère ne pas répondre", "", "ask"]] },
    { id: "actuels", sec: 1, type: "text", title: "Ta routine actuelle", sub: "Pas de stress : « rien » est une très bonne réponse. Ça nous aide à garder ce qui marche déjà.",
      fields: [["produitsVisage", "Les produits visage que tu utilises (nom et marque)", "area", "Ex. gel nettoyant CeraVe matin et soir, sérum niacinamide le matin…"], ["produitsCorps", "Et pour le corps ?", "text", "Ex. gel douche, crème Nivea…"]] },
    { id: "routine", sec: 1, title: "As-tu une routine visage au quotidien ?", sub: "",
      options: [["deux", "Oui, matin et soir", "", "sunmoon"], ["matin", "Seulement le matin", "", "sun"], ["soir", "Seulement le soir", "", "moon"], ["aucune", "Pas encore", "On commence simple", "sprout"]] },
    { id: "infoProfil", sec: 1, type: "info", kind: "profil" },

    { id: "corps", sec: 2, title: "Et la peau de ton corps ?", sub: "",
      options: [["corpsOk", "Confortable", "", "heart"], ["corpsSec", "Sèche après la douche", "", "dry"], ["corpsTresSec", "Très sèche, rugueuse par endroits", "Coudes, genoux, jambes", "wave"], ["corpsSensible", "Sensible, elle réagit vite", "", "flame"]] },
    { id: "corpsEnvies", sec: 2, title: "Pour ton corps, tu aimerais…", sub: "Plusieurs choix possibles.", multi: true, none: "corpsRien",
      options: [["corpsNourrir", "Une peau plus nourrie", "", "drop"], ["corpsMarques", "Un grain plus uniforme", "Marques, petites rugosités", "spots"], ["corpsSenteur", "Des soins qui sentent bon", "", "flower"], ["corpsRien", "Rien de particulier", "", "none"]] },

    { id: "photoCuir", sec: 3, type: "photo", target: "cuir" },
    { id: "texture", sec: 3, title: "Quelle est la texture de tes cheveux ?", sub: "",
      options: [["raides", "Raides", "", "straight"], ["ondules", "Ondulés", "", "wavy"], ["boucles", "Bouclés", "", "curly"], ["crepus", "Frisés à crépus", "", "coily"]] },
    { id: "cheveux", sec: 3, title: "Et tes longueurs, en ce moment ?", sub: "",
      options: [["secs", "Sèches ou cassantes", "", "dry"], ["colores", "Colorées ou décolorées", "", "color"], ["fins", "Fines, vite plates", "", "thin"], ["ok", "En forme", "", "heart"]] },
    { id: "cuir", sec: 3, title: "Ton cuir chevelu est plutôt…", sub: "Plusieurs choix possibles.", multi: true, none: "cuirOk",
      options: [["cuirGras", "Il regraisse vite", "", "drops"], ["cuirSec", "Il tiraille, il est sec", "", "dry"], ["cuirPellicules", "Pellicules", "", "dots"], ["cuirSensible", "Sensible, il démange", "", "flame"], ["cuirOk", "Sans souci", "", "heart"]] },
    { id: "cuirSignes", sec: 3, title: "Tu remarques aussi…", sub: "Plusieurs choix possibles. On ne pose pas de diagnostic : ça nous aide à t'orienter et à écarter ce qui pourrait irriter.", multi: true, none: "aucunSigne",
      options: [["squamesGrasses", "Des squames grasses et des rougeurs", "Parfois aussi aux sourcils ou sur les ailes du nez", "drops"], ["plaques", "Des plaques épaisses, des squames blanches ou argentées", "Parfois au-delà de la lisière, derrière les oreilles", "wave"], ["tempes", "Des tempes ou une lisière qui se dégarnissent", "", "thin"], ["chute", "Plus de cheveux qui tombent que d'habitude", "", "dots"], ["zones", "Une zone ronde sans cheveux", "", "ask"], ["boutonsCuir", "Des boutons ou des croûtes sur le cuir chevelu", "", "flame"], ["aucunSigne", "Rien de tout ça", "", "none"]] },
    { id: "cuirDiag", sec: 3, title: "Pour ton cuir chevelu, un ou une médecin t'a déjà parlé de…", sub: "Plusieurs choix possibles.", multi: true, none: "rienDiag",
      options: [["dsDiag", "Dermatite séborrhéique", "", "drops"], ["psoDiag", "Psoriasis du cuir chevelu", "", "wave"], ["tractionDiag", "Alopécie de traction", "Liée aux coiffures qui tirent", "thin"], ["androDiag", "Alopécie androgénétique", "Cheveux qui s'affinent avec le temps", "thin"], ["peladeDiag", "Pelade", "", "ask"], ["rienDiag", "Rien de tout ça", "", "none"]] },
    { id: "coiffures", sec: 3, title: "Tes coiffures, le plus souvent…", sub: "Plusieurs choix possibles.", multi: true, none: "libres",
      options: [["tresses", "Tresses, nattes, vanilles ou locks", "", "coily"], ["perruques", "Perruques ou tissages", "", "curly"], ["defrisage", "Défrisage ou lissage chimique", "", "straight"], ["chaleur", "Lisseur, fer ou sèche-cheveux chaud", "", "flame"], ["queue", "Queue de cheval ou chignon serrés", "", "wavy"], ["libres", "Cheveux libres, sans tension", "", "heart"]] },
    { id: "lavage", sec: 3, title: "À quelle fréquence laves-tu tes cheveux ?", sub: "",
      options: [["l1", "Tous les jours ou presque", "", "shower"], ["l2", "2 à 3 fois par semaine", "", "drops"], ["l3", "1 fois par semaine", "", "drop"], ["l4", "Moins souvent", "", "sprout"]] },

    { id: "envies", sec: 4, title: "Qu'est-ce qui compte pour toi sous la douche ?", sub: "Plusieurs choix possibles.", multi: true,
      options: [["senteur", "Une douche parfumée", "Une senteur qui détend, façon aromathérapie", "flower"], ["chlore", "Moins de chlore", "Selon les informations du fabricant", "drop"], ["soin", "Une eau qui prend soin de moi", "Capsules aux actifs hydratants", "halfsun"], ["soir", "Me détendre le soir", "Ralentir et souffler après la journée", "moon"], ["jet", "Un jet plus doux", "", "shower"], ["sansparfum", "Sans parfum", "Je préfère une douche sans senteur", "none"]] },
    { id: "senteur", sec: 4, title: "Quelle senteur t'attire ?", sub: "Tu pourras en changer à chaque recharge.", skipIf: function (a) { return has(a, "envies", "sansparfum"); },
      options: [["hinoki", "Hinoki", "Bois clair · Onsha et SHIFT Hinoki Spring", "tree"], ["fleur", "Floral", "Fleur de Prunier (Onsha) · Cherry Blossom (SHIFT)", "flower"], ["patchouli", "Patchouli & Rose", "Capsules SHIFT · chaud, enveloppant", "flower"], ["fruite", "Fruité", "Capsules SHIFT · énergie", "sun"], ["decouverte", "Découverte", "SHIFT · 6 senteurs à tester", "sprout"], ["ocean", "Océan", "Onsha · frais, iodé", "wave"], ["pin", "Forêt de Pin", "Onsha · vert, résineux", "leaf"], ["sans", "Sans senteur", "Onsha", "none"]] },
    { id: "origines", sec: 4, title: "Quelles marques aimerais-tu découvrir ?", sub: "On en tient compte pour te proposer d'autres marques que Sunsoari.", multi: true, none: "toutes",
      options: [["Corée", "K-beauty", "Corée", "sprout"], ["Japon", "J-beauty", "Japon", "flower"], ["Chine", "C-beauty", "Chine", "leaf"], ["Afrique", "Marques africaines", "Karité, argan, savon noir…", "sun"], ["toutes", "Un peu de tout", "", "heart"]] },
    { id: "format", sec: 4, title: "Quelle routine te ressemble ?", sub: "Tu pourras changer à tout moment depuis ta routine.",
      options: [["essentielle", "L'essentiel", "3 ou 4 gestes, le strict nécessaire", "sprout"], ["complete", "La routine complète", "Toutes les étapes, façon K-beauty", "sunmoon"], ["equilibree", "Entre les deux", "Les bases et un soin ciblé", "halfsun"]] },
    { id: "notes", sec: 4, type: "text", title: "Un mot de plus ?", sub: "Facultatif.", fields: [["notes", "Allergies, objectifs, budget, ce que tu veux nous dire…", "area", ""]] },
    { id: "budgetSoin", sec: 4, title: "Ton budget soin par mois, visage, corps et cheveux ?", sub: "On te propose d'abord ce qui rentre dans ton budget.",
      options: [["b30", "Moins de 30 €", "", "coin"], ["b60", "30 à 60 €", "", "coin"], ["b100", "60 à 100 €", "", "coin"], ["b100p", "Plus de 100 €", "", "coin"]] },
    { id: "budget", sec: 4, title: "Quel budget pour démarrer ton rituel douche ?", sub: "Tu pourras compléter ton rituel plus tard.",
      options: [["petit", "Moins de 30 €", "", "coin"], ["moyen", "30 à 70 €", "", "coin"], ["grand", "Plus de 70 €", "", "coin"]] },
    { id: "fin", sec: 4, type: "fin", kicker: "Ton espace" }
  ];

  // Zones des écrans photo (positions en % sur le cadre).
  var PHOTO = {
    visage: { title: "Regarde ta peau de près", sub: "Prends-toi en photo à la lumière du jour, sans maquillage, ou passe cette étape.",
      zones: [["front", "Front", 50, 18], ["nez", "Nez", 50, 45], ["joueG", "Joue gauche", 24, 55], ["joueD", "Joue droite", 76, 55], ["menton", "Menton", 50, 80]],
      obs: [["brillance", "Brillance"], ["secheresse", "Sécheresse"], ["rougeurs", "Rougeurs"], ["imperfections", "Boutons"], ["taches", "Taches"], ["texture", "Grain irrégulier"]] },
    cuir: { title: "Regarde ton cuir chevelu", sub: "Fais une photo de ta raie, à la lumière du jour, ou passe cette étape.",
      zones: [["raie", "Raie", 50, 25], ["tempes", "Tempes", 22, 45], ["nuque", "Nuque", 78, 45], ["longueurs", "Longueurs", 50, 78]],
      obs: [["cuirGras", "Racines grasses"], ["cuirSec", "Sécheresse"], ["cuirPellicules", "Pellicules"], ["cuirSensible", "Rougeurs"], ["secs", "Casse, pointes sèches"]] }
  };

  function has(a, k, v) { return (a[k] || []).indexOf(v) > -1; }

  // Toutes les réponses à plat, photo comprise, pour le moteur de recommandation.
  // ---------------------------------------------------------------------------
  // TEST DU TYPE DE PEAU : plusieurs signes, pas une seule impression
  // ---------------------------------------------------------------------------
  function skinProfile(a) {
    if (!a.pt_apres) return null;
    var oil = 0, dry = 0, tz = 0;
    oil += { tzone: 1, brille: 2 }[a.pt_apres] || 0; dry += a.pt_apres === "tire" ? 2 : 0; tz += a.pt_apres === "tzone" ? 1 : 0;
    oil += { tz: 1, tout: 2 }[a.pt_soir] || 0; dry += a.pt_soir === "mat" ? 1 : 0; tz += a.pt_soir === "tz" ? 1 : 0;
    oil += { nez: 0.5, joues: 1.5 }[a.pt_pores] || 0; tz += a.pt_pores === "nez" ? 1 : 0;
    dry += { souvent: 2, hiver: 1 }[a.pt_peaux] || 0;
    dry += a.pt_creme === "boit" ? 1.5 : 0; oil += { zones: 1, brille: 2 }[a.pt_creme] || 0; tz += a.pt_creme === "zones" ? 1 : 0;
    var type = oil >= 4.5 && tz < 2 ? "grasse" : oil >= 2 ? "mixte" : dry >= 2.5 ? "seche" : "normale";
    var ante = a.antecedents || [];
    var sensible = a.pt_reac === "souvent" || a.pt_reac2 === "souvent" || (a.pt_reac === "parfois" && a.pt_reac2 === "parfois") || ante.indexOf("eczema") > -1 || ante.indexOf("rosacee") > -1 || (a.pt_reac === "parfois" && has(a, "saisons", "change"));
    var deshy = a.pt_deshy === "oui" || (oil >= 1.5 && (a.pt_apres === "tire" || a.pt_peaux === "souvent"));
    return { type: type, sensible: sensible, deshy: deshy, peau: sensible ? "sensible" : type === "grasse" ? "mixte" : type };
  }
  var SKIN_WHY = {
    grasse: { why: "Tes glandes sébacées sont très actives. C'est souvent génétique, et les hormones, le stress et la chaleur augmentent encore la production de sébum : d'où la brillance, les pores visibles et les imperfections. Bonne nouvelle : une peau grasse marque souvent les rides plus tard.", avoid: ["Laver ton visage plus de 2 fois par jour", "Les gommages agressifs et l'alcool asséchant", "Supprimer la crème hydratante", "Percer les boutons"] },
    mixte: { why: "Ta zone T (front, nez, menton) a plus de glandes sébacées que tes joues. Elle produit donc plus de sébum et brille, alors que les joues restent normales ou sèches.", avoid: ["Traiter tout le visage comme une peau grasse", "Les produits très asséchants sur les joues", "L'argile ou les acides sur les joues"] },
    seche: { why: "Ta peau produit peu de sébum, le film protecteur naturel. Elle retient moins bien l'eau, d'où les tiraillements et les petites peaux. C'est souvent génétique, et ça s'accentue avec le froid, le chauffage, l'eau très chaude ou les nettoyants trop décapants.", avoid: ["L'eau très chaude", "Les gommages à grains", "Les toniques alcoolisés", "Les nettoyants qui moussent beaucoup"] },
    normale: { why: "Ton sébum et ton hydratation sont équilibrés. L'objectif est de garder cet équilibre et de protéger ta peau.", avoid: ["Multiplier les actifs sans raison", "Changer de routine trop souvent"] }
  };
  var SKIN_INFO = {
    grasse: { t: "Peau grasse", what: "Ta peau produit beaucoup de sébum : elle brille sur l'ensemble du visage et les pores se voient davantage. C'est souvent une question de génétique et d'hormones, et ça varie avec la chaleur.",
      tips: ["Hydrate quand même, chaque jour : une peau grasse peut manquer d'eau. Choisis un gel ou une crème légère marquée « non comédogène ».", "Nettoie matin et soir, et après le sport, avec un nettoyant doux. Frotter fort ou décaper fait souvent briller davantage.", "Évite les produits très alcoolisés qui assèchent la surface.", "Dans la journée, un papier matifiant absorbe la brillance sans abîmer la peau.", "Ta crème solaire peut remplacer ta crème du matin si elle est légère et hydratante."] },
    mixte: { t: "Peau mixte", what: "Ta peau a deux comportements : la zone T (front, nez, menton) brille, les joues sont normales ou sèches. C'est le type de peau le plus courant.",
      tips: ["Une crème légère sur tout le visage suffit, et tu peux ajouter un peu plus de crème sur les joues si elles tiraillent.", "Les soins pour peaux grasses (argile, BHA) se mettent sur la zone T seulement.", "Un nettoyant doux : si ta peau « crisse » sous les doigts après le lavage, c'est qu'il est trop décapant.", "Ta peau peut changer avec les saisons : plus légère l'été, un peu plus riche l'hiver."] },
    seche: { t: "Peau sèche", what: "Ta peau produit peu de sébum : elle tiraille, peut être rêche ou peler, surtout en hiver ou après la douche.",
      tips: ["Eau tiède plutôt que chaude, et une douche courte.", "Un nettoyant crème ou lait, sans savon moussant fort.", "Applique ta crème sur une peau encore légèrement humide, dans les minutes qui suivent : elle retient mieux l'eau.", "Cherche céramides, glycérine, beurre de karité ou squalane.", "L'hiver, chauffage et air sec accentuent la sécheresse : une crème plus riche le soir peut aider."] },
    normale: { t: "Peau normale", what: "Ta peau est plutôt équilibrée : ni très grasse, ni très sèche, et peu réactive. Elle a quand même besoin de soins simples pour le rester.",
      tips: ["Une routine courte suffit : nettoyant doux, crème, protection solaire.", "Adapte la texture à la saison : plus légère l'été, plus riche l'hiver.", "Introduis les actifs un par un, si tu en as besoin."] }
  };
  var SKIN_SOURCES = [
    ["Académie américaine de dermatologie : conseils de soin par type de peau", "https://www.aad.org/public/everyday-care/skin-care-basics/care/skin-care-tips-dermatologists-use"],
    ["Académie américaine de dermatologie : prendre soin d'une peau grasse", "https://www.aad.org/public/everyday-care/skin-care-basics/dry/oily-skin"],
    ["Académie américaine de dermatologie : choisir sa crème hydratante", "https://www.aad.org/public/everyday-care/skin-care-basics/dry/pick-moisturizer"],
    ["Académie américaine de dermatologie : acné et crème hydratante", "https://www.aad.org/public/diseases/acne/skin-care/moisturizer"],
    ["DermNet : la peau sèche", "https://dermnetnz.org/topics/dry-skin"],
    ["Académie américaine de dermatologie : rosacée, conseils de soin", "https://www.aad.org/public/diseases/rosacea/triggers/tips"]
  ];

  // Cuir chevelu : des signes (pas un diagnostic) et ce qu'un médecin a déjà dit.
  function hairTags(a) {
    var t = [], sg = a.cuirSignes || [], dg = a.cuirDiag || [], co = a.coiffures || [];
    if (sg.indexOf("squamesGrasses") > -1 || dg.indexOf("dsDiag") > -1) t.push("cuirDS");
    if (sg.indexOf("plaques") > -1 || dg.indexOf("psoDiag") > -1) t.push("cuirPso");
    if (sg.indexOf("tempes") > -1 || dg.indexOf("tractionDiag") > -1) t.push("tempes");
    if (sg.indexOf("chute") > -1 || dg.indexOf("androDiag") > -1) t.push("chute");
    if (co.indexOf("tresses") > -1 || co.indexOf("perruques") > -1 || co.indexOf("queue") > -1) t.push("tension");
    if (co.indexOf("chaleur") > -1) t.push("chaleur");
    if (t.indexOf("cuirDS") > -1 || t.indexOf("cuirPso") > -1) t.push("reactifHE");
    return t;
  }
  function tagsOf(a) {
    var t = [a.peau, a.corps, a.texture, a.cheveux, a.routine, a.lieu].filter(Boolean);
    var sp = skinProfile(a);
    if (sp) { if (sp.type === "grasse" || sp.type === "mixte") t.push("mixte"); if (sp.type === "seche") t.push("seche"); if (sp.deshy) t.push("secheresse"); if (sp.sensible) t.push("sensible"); }
    if ((a.antecedents || []).some(function (x) { return x === "eczema" || x === "rosacee" || x === "psoriasis"; })) t.push("reactifHE");
    ["concerns", "reactions", "valeurs", "corpsEnvies", "cuir", "envies"].forEach(function (k) { t = t.concat(a[k] || []); });
    t = t.concat(hairTags(a));
    ["photoVisage", "photoCuir"].forEach(function (k) {
      var z = a[k] || {};
      Object.keys(z).forEach(function (zone) { t = t.concat(z[zone]); });
    });
    if (t.indexOf("brillance") > -1) t.push("mixte");
    if (a.grossesse === "oui") t.push("enceinte");
    if (has(a, "concerns", "pointsnoirs")) t.push("imperfections", "texture");
    if (has(a, "concerns", "marques")) t.push("taches");
    if (has(a, "concerns", "brillance")) t.push("mixte");
    if (has(a, "antecedents", "traitement")) t.push("sensible", "acides");
    if (a.grossesse === "menopause") t.push("secheresse", "rides");
    return t;
  }

  var TAG_LABEL_EXTRA = { pointsnoirs: "points noirs", brillance: "brillance", marques: "marques après les boutons", cernes: "cernes" };
  var TAG_LABEL = { seche: "peau sèche", sensible: "peau sensible", mixte: "peau mixte à grasse", normale: "peau confortable", secheresse: "sécheresse", imperfections: "imperfections", rougeurs: "rougeurs", teint: "teint terne", texture: "grain de peau", taches: "taches", rides: "ridules", corpsSec: "corps sec", corpsTresSec: "corps très sec", corpsSensible: "corps sensible", corpsOk: "corps confortable", corpsMarques: "grain du corps", raides: "cheveux raides", ondules: "cheveux ondulés", boucles: "cheveux bouclés", crepus: "cheveux crépus", secs: "longueurs sèches", colores: "cheveux colorés", fins: "cheveux fins", cuirGras: "racines grasses", cuirSec: "cuir chevelu sec", cuirPellicules: "pellicules", cuirSensible: "cuir chevelu sensible", cuirOk: "cuir chevelu sans souci", deux: "routine matin et soir", soir: "routine du soir", brillance: "brillance (photo)", enceinte: "grossesse ou allaitement", reactifHE: "réaction aux huiles essentielles", acides: "réaction aux acides", ruche: "réaction aux produits de la ruche", vegan: "choix vegan", cuirDS: "squames grasses et rougeurs", cuirPso: "plaques et squames épaisses", tempes: "tempes qui se dégarnissent", chute: "chute de cheveux", tension: "coiffures qui tirent", chaleur: "coiffage à la chaleur" };
  Object.keys(TAG_LABEL_EXTRA).forEach(function (k) { TAG_LABEL[k] = TAG_LABEL_EXTRA[k]; });

  // ---------------------------------------------------------------------------
  // MOTEUR · produits d'autres marques, avec « pourquoi » et « plutôt que »
  // ---------------------------------------------------------------------------
  function scoreExt(p, tags, a) {
    var excl = p.avoid.filter(function (x) { return tags.indexOf(x) > -1; });
    if (tags.indexOf("acides") > -1 && p.act.some(function (x) { return ["aha", "bha", "pha"].indexOf(x) > -1; })) excl.push("acides");
    var match = p.for.filter(function (x) { return tags.indexOf(x) > -1; });
    var origins = a.origines || [];
    var bonus = origins.length && origins.indexOf("toutes") < 0 && (origins.indexOf(p.origin) > -1 || (origins.indexOf("Afrique") > -1 && ["Mali", "Ghana", "Nigeria", "Maroc", "Sénégal", "Afrique du Sud", "Kenya", "Côte d'Ivoire", "Tchad"].indexOf(p.origin) > -1)) ? 1.5 : 0;
    // Un produit doit correspondre à au moins une réponse : l'origine préférée ne fait que départager.
    return { p: p, match: match, excl: excl, score: excl.length || !match.length ? -1 : match.length + bonus + (p.madeIn ? 0.3 : 0) };
  }

  function pickStep(zone, step, tags, a) {
    var list = EXT.filter(function (p) { return p.zone === zone && p.step === step; }).map(function (p) { return scoreExt(p, tags, a); });
    list.sort(function (x, y) { return y.score - x.score; });
    if (!list.length || list[0].score <= 0) return null;
    return { best: list[0], other: list[1] || null };
  }

  function routinePlan(a) {
    var tags = tagsOf(a), plan = [];
    var add = function (group, zone, steps) {
      var items = [];
      steps.forEach(function (s) { var r = pickStep(zone, s, tags, a); if (r) items.push({ step: s, r: r }); });
      if (items.length) plan.push({ group: group, items: items });
    };
    // Routine courte (tendance « skinimalisme ») : on n'ajoute une étape que si elle répond à un besoin.
    var soir = a.routine === "aucune" ? ["nettoyant", "hydratant"] : ["nettoyant", "tonique", "serum", "hydratant"];
    if (a.routine === "deux" || a.routine === "soir") soir.unshift("demaquillant");
    if ((has(a, "concerns", "texture") || has(a, "concerns", "imperfections")) && a.routine !== "aucune") soir.splice(soir.length - 1, 0, "exfoliant");
    if (has(a, "concerns", "rides")) soir.splice(soir.length - 1, 0, "yeux");
    add("Visage · le soir", "visage", soir);
    add("Visage · le matin", "visage", ["spf"]);
    add("Corps", "corps", ["corps", "huile"]);
    add("Cheveux", "cheveux", ["shampoing", "soin", "masque"]);
    add("Cuir chevelu", "cuir", ["shampoing"]);
    return plan;
  }

  function whyText(sel, tags) {
    var labels = sel.match.map(function (m) { return TAG_LABEL[m] || m; });
    return labels.length ? "Choisi pour : " + labels.slice(0, 3).join(", ") + "." : "";
  }

  function versusText(sel) {
    var o = sel.other;
    if (!o) return "";
    var name = o.p.brand + " " + o.p.name;
    if (o.excl.length) return "Plutôt que " + name + " : il contient un ingrédient lié à « " + (TAG_LABEL[o.excl[0]] || o.excl[0]) + " ».";
    if (o.match.length < sel.best.match.length) return "Plutôt que " + name + " : il correspond à moins de tes réponses (" + (o.match.map(function (m) { return TAG_LABEL[m] || m; }).join(", ") || "aucune") + ").";
    return "Autre option proche : " + name + ".";
  }

  // ---------------------------------------------------------------------------
  // MOTEUR · produits Sunsoari (douche), SHIFT mis en avant quand il convient
  // ---------------------------------------------------------------------------
  function scentOf(a) {
    if (has(a, "envies", "sansparfum")) return "sans";
    return a.senteur || "hinoki";
  }

  function recommend(a) {
    var s = scentOf(a), tags = tagsOf(a), main, alts = [], extras = [], refills = [], why = [];
    var nomade = a.lieu === "voyage";
    // SHIFT contient des huiles essentielles (dont tea tree) : on l'écarte si la peau y réagit, si elle ne veut pas de parfum, ou pendant la grossesse.
    var shiftOk = !has(a, "envies", "sansparfum") && tags.indexOf("reactifHE") < 0 && a.grossesse !== "oui" && a.peau !== "sensible";
    var wantsShift = has(a, "envies", "senteur") || has(a, "envies", "soin") || has(a, "envies", "soir");

    if (nomade && s === "sans") {
      main = "douchette"; alts = ["premierHome"]; refills = ["sediment"];
    } else if (nomade) {
      main = a.budget === "petit" ? "setNomade" : "coffretNomade";
      alts = main === "setNomade" ? ["coffretNomade", "douchette"] : ["setNomade", "douchette"];
      refills = ["capsule", "sediment"];
    } else if (shiftOk && (a.budget !== "petit" || SHIFT_ONLY.indexOf(s) > -1)) {
      main = a.budget === "grand" ? "shiftAroma" : "shiftSoin";
      if (SHIFT_ONLY.indexOf(s) > -1) why.push("Ta senteur, " + SCENT_LABEL[s] + ", existe en capsules SHIFT.");
      alts = main === "shiftAroma" ? ["shiftSoin", "coffretHome"] : ["shiftAroma", "starterHome"];
      refills = ["pureWater", "shiftCaps"];
      why.push(wantsShift ? "Tu veux une douche sensorielle : SHIFT associe filtration et capsules d'aromathérapie aux actifs hydratants." : "SHIFT réunit filtration et capsules de soin dans un seul geste.");
    } else {
      main = a.budget === "petit" ? "premierHome" : a.budget === "moyen" ? "starterHome" : "coffretHome";
      if (main === "premierHome") alts = shiftOk ? ["shiftSoin", "pommeau"] : ["starterHome", "pommeau"];
      else if (main === "starterHome") alts = ["premierHome", "coffretHome"];
      else alts = ["starterHome", "pommeau"];
      refills = [s === "sans" ? "filtreSans" : "filtreThermal"];
      if (!shiftOk) why.push("On te propose Onsha plutôt que SHIFT : les capsules SHIFT contiennent des huiles essentielles" + (s === "sans" ? ", et tu préfères sans senteur." : ", à éviter pour ton profil."));
    }
    if (a.lieu === "deux" && main !== "setNomade") extras.push("setNomade");
    if (a.peau === "mixte" || has(a, "concerns", "imperfections")) extras.push("robinet");
    return { scent: s, main: main, alts: alts.slice(0, 3), extras: extras, refills: refills, why: why, shiftOk: shiftOk };
  }

  function insights(a) {
    var out = [], tags = tagsOf(a);
    var eau = {
      douce: "Ton eau semble plutôt douce. Ton rituel peut se concentrer sur la sensorialité et le confort du jet.",
      moyenne: "Ton eau est moyennement calcaire. Nettoie régulièrement ton pommeau pour garder un jet régulier.",
      calcaire: "Ton eau semble calcaire. Nos filtres de douche ne sont pas des adoucisseurs et ne retirent pas le calcaire de façon significative. Un détartrage régulier du pommeau aide à garder un jet régulier.",
      nsp: "Le site officiel eaupotable.sante.gouv.fr donne la qualité de l'eau de ta commune."
    }[a.eau];
    if (eau) out.push(["Ton eau", eau]);
    var C = {
      secheresse: "Sécheresse : eau tiède, douche courte, soin hydratant sur peau encore légèrement humide.",
      imperfections: "Imperfections : nettoyage doux, ne pas percer les boutons. Si elles persistent, un ou une dermatologue peut t'accompagner.",
      rougeurs: "Rougeurs : eau tiède, produits sans parfum. Des rougeurs qui durent méritent un avis médical.",
      teint: "Teint terne : sommeil, hydratation et protection solaire font partie des bases.",
      texture: "Grain de peau : évite les gommages trop fréquents. Un exfoliant doux 1 à 2 fois par semaine suffit.",
      taches: "Taches : la protection solaire quotidienne, toute l'année et sur toutes les carnations, est le geste le plus conseillé." + ({ t2: " Tes marques sont installées : ta routine associe un soin qui unifie et un soin qui renouvelle, sans exfolier trop souvent.", t3: " Tes taches sont marquées : la patience compte, comptez plusieurs mois. Un avis dermatologique t'aidera à aller plus loin.", t4: " Montre d'abord tes taches à un ou une dermatologue, surtout si l'une d'elles change. Les traitements les plus forts (trétinoïne, cystéamine, acide azélaïque à 20 %, peelings, laser) se font sur prescription ou en cabinet." }[a.tachesNiveau] || ""),
      rides: "Ridules : protection solaire, hydratation et, hors grossesse, rétinoïdes introduits progressivement."
    };
    if (a.carnation === "foncee" || a.carnation === "tresfoncee" || a.carnation === "mate") out.push(["Ta carnation", "Les peaux mates à foncées marquent plus facilement après un bouton, une irritation ou un soin trop fort. Douceur, pas de grattage, et une crème solaire sans trace blanche chaque matin : c'est la meilleure prévention."]);
    var rc = a.reacCause || [];
    if (rc.length && rc.indexOf("nsp") < 0) {
      var rtxt = [];
      if (rc.indexOf("peeling") > -1) rtxt.push("Une réaction après un peeling ne veut pas dire que ta peau ne supporte aucun acide : les exfoliants doux pourront revenir plus tard, à faible dose, une fois ta peau calmée.");
      if (rc.indexOf("medicament") > -1) rtxt.push("Certains traitements (contre l'acné, rétinoïdes sur ordonnance, quelques antibiotiques) rendent la peau plus fragile et plus sensible au soleil. Si tu en suis un, demande l'avis de ton médecin ou de ton pharmacien avant d'ajouter un actif.");
      if (rc.indexOf("soleil") > -1) rtxt.push("Certains actifs (acides, rétinoïdes) rendent la peau plus sensible au soleil : on les garde pour le soir, avec une crème solaire chaque matin.");
      if (rc.indexOf("fort") > -1 || rc.indexOf("melange") > -1) rtxt.push("Trop d'actifs, trop concentrés ou trop souvent : c'est la cause la plus fréquente. Ta routine introduit un seul produit à la fois.");
      if (rtxt.length) out.push(["Ta réaction passée", rtxt.join(" ")]);
    }
    if (a.spfHabit && a.spfHabit !== "tlj") out.push(["Ta crème solaire", "Ta priorité : une crème solaire chaque matin, toute l'année. Sans elle, taches et marques reviennent, quels que soient tes autres soins. Choisis une texture que tu aimes, c'est celle que tu mettras vraiment."]);
    if (has(a, "modeVie", "maquillage")) out.push(["Maquillage", "Le soir, démaquille-toi avant ton nettoyant (huile ou baume, puis nettoyant doux) : c'est le double nettoyage. Nettoie tes pinceaux et éponges chaque semaine."]);
    if (has(a, "antecedents", "traitement")) out.push(["Ton traitement", "Ton traitement passe en premier. Ta routine reste douce, sans acide ni rétinoïde, pour l'accompagner sans le contrarier. Montre-la à ton ou ta dermatologue avant d'ajouter un produit."]);
    if (has(a, "antecedents", "allergies")) out.push(["Tes allergies", "Avant d'acheter, scanne la liste d'ingrédients du produit dans l'onglet Scan, et fais toujours un test de 48 h sur la mâchoire."]);
    if (has(a, "concerns", "pointsnoirs")) out.push(["Points noirs", "Ne les presse pas. Un BHA (acide salicylique) 1 à 3 soirs par semaine et un masque à l'argile sur la zone T aident à désincruster les pores en douceur."]);
    if (has(a, "concerns", "cernes")) out.push(["Cernes", "Les cernes dépendent beaucoup de la génétique et du sommeil. Un contour des yeux hydratant et la crème solaire autour des yeux aident, sans miracle à attendre."]);
    if (a.grossesse === "menopause") out.push(["Ménopause", "Avec la baisse des hormones, la peau devient souvent plus sèche, plus fine et un peu moins ferme. Une crème plus riche aux céramides, la protection solaire chaque matin et, si ta peau les tolère, des rétinoïdes introduits doucement le soir. Si ta peau change beaucoup, parles-en à ton médecin."]);
    var cs = (a.concerns || []).filter(function (k) { return C[k]; });
    if (cs.length) out.push(["Ton visage", cs.map(function (k) { return C[k]; }).join(" ")]);
    var pv = a.photoVisage || {};
    var zones = Object.keys(pv).filter(function (z) { return pv[z].length; });
    if (zones.length) out.push(["Ta photo", "Tu as repéré : " + zones.map(function (z) { return (PHOTO.visage.zones.filter(function (x) { return x[0] === z; })[0] || [z, z])[1].toLowerCase() + " (" + pv[z].map(function (o) { return (PHOTO.visage.obs.filter(function (x) { return x[0] === o; })[0] || [o, o])[1].toLowerCase(); }).join(", ") + ")"; }).join(" · ") + "."]);
    var corps = { corpsSec: "Corps sec : un lait ou un beurre juste après la douche, sur peau encore humide.", corpsTresSec: "Zones très sèches : un baume riche le soir sur coudes, genoux et jambes. Si la peau gratte ou s'épaissit, demande un avis médical.", corpsSensible: "Corps sensible : soins sans parfum et eau tiède.", corpsOk: "Ton corps va bien : garde un soin simple et agréable." }[a.corps];
    if (corps) out.push(["Ton corps", corps]);
    var cuir = [];
    if (has(a, "cuir", "cuirGras")) cuir.push("Racines grasses : un shampoing doux plutôt que décapant, l'eau tiède et pas de soin riche sur les racines.");
    if (has(a, "cuir", "cuirPellicules")) cuir.push("Pellicules : si elles persistent ou s'accompagnent de rougeurs, un ou une dermatologue ou un pharmacien peut te conseiller.");
    if (has(a, "cuir", "cuirSensible")) cuir.push("Cuir chevelu qui démange : évite les huiles essentielles et les shampoings parfumés. Une démangeaison qui dure mérite un avis médical.");
    if (a.texture === "boucles" || a.texture === "crepus") cuir.push("Boucles et cheveux crépus : beaucoup espacent les shampoings et prévoient un moment soin dédié.");
    scalpGuide(a).forEach(function (g) { cuir.push(g[0] + " : " + g[2]); });
    if (cuir.length) out.push(["Tes cheveux", cuir.join(" ")]);
    if (a.grossesse === "oui") out.push(["Grossesse", "Pendant la grossesse et l'allaitement, on a écarté les rétinoïdes, les exfoliants acides et les produits aux huiles essentielles. Demande conseil à ton ou ta médecin ou sage-femme avant un nouvel actif."]);
    if (a.routine === "aucune") out.push(["Ta routine", "Pas de routine pour l'instant ? Commence par deux gestes : un nettoyage doux le soir et une protection solaire le matin."]);
    if (a.flexible === "non") out.push(["Ta douche", "Sans flexible, nos pommeaux et coques ne se fixent pas directement. Écris-nous avec une photo de ta douche : on vérifie la compatibilité avant tout achat."]);
    return out;
  }

  function weeklyRitual(a) {
    var g = [["douche", "Douche tiède et courte", [0, 1, 2, 3, 4, 5, 6]]];
    if (a.routine !== "deux") g.push(["soirv", "Routine visage du soir", [0, 1, 2, 3, 4, 5, 6]]);
    g.push(["spf", "Protection solaire le matin", [0, 1, 2, 3, 4, 5, 6]]);
    g.push(["corps", "Soin du corps après la douche", a.corps === "corpsOk" ? [1, 4, 6] : [0, 1, 2, 3, 4, 5, 6]]);
    var wash = { l1: [0, 1, 2, 3, 4, 5, 6], l2: [1, 4], l3: [5], l4: [5] }[a.lavage] || [2, 5];
    g.push(["lavage", "Shampoing", wash]);
    g.push(["masque", "Masque cheveux", a.texture === "boucles" || a.texture === "crepus" || a.cheveux === "secs" ? [2, 6] : [6]]);
    if (has(a, "concerns", "texture") && a.grossesse !== "oui") g.push(["exfo", "Exfoliant doux visage", [3]]);
    if (has(a, "envies", "senteur") || has(a, "envies", "soir")) g.push(["rituel", "Rituel senteur du soir", [4, 6]]);
    if (a.eau === "calcaire") g.push(["pommeau", "Nettoyer le pommeau", [5]]);
    return g;
  }

  CSS += [
    ".app{background:var(--paper);border:1px solid var(--line);border-radius:28px;overflow:hidden;max-width:520px;margin:0 auto;position:relative}",
    ".app .body{min-height:640px;padding-bottom:96px}",
    ".bnav{position:sticky;bottom:0;display:grid;grid-template-columns:repeat(5,1fr);gap:2px;padding:8px 8px calc(8px + env(safe-area-inset-bottom,0px));background:rgba(251,248,243,.94);backdrop-filter:blur(10px);border-top:1px solid var(--line);z-index:5}",
    ".bnav button{font:inherit;font-size:11px;border:0;background:transparent;color:var(--muted);display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px;border-radius:14px;cursor:pointer;min-height:48px}",
    ".bnav button svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}",
    ".bnav button[aria-current=true]{color:var(--water);background:var(--water-soft);font-weight:600}",
    ".todayhead{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px}",
    ".todayhead h3,.revealhead h3,.scanres h3,.guideview h3{font-family:var(--display);font-weight:400;font-size:clamp(28px,7vw,38px);margin:0;line-height:1.05}",
    ".goal{font-size:12px;background:var(--sand);border-radius:999px;padding:5px 12px;color:var(--ink)}",
    ".revealhead{margin-bottom:12px}",
    ".seg-tabs{display:flex;gap:4px;background:var(--sand);border-radius:999px;padding:4px;margin:0 0 14px;overflow-x:auto}",
    ".seg-tabs button{flex:1;font:inherit;font-size:14px;border:0;background:transparent;border-radius:999px;padding:9px 10px;cursor:pointer;color:var(--muted);display:flex;align-items:center;justify-content:center;gap:5px;white-space:nowrap;min-height:40px}",
    ".seg-tabs button svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.7}",
    ".seg-tabs button[aria-pressed=true]{background:#fff;color:var(--ink);font-weight:600;box-shadow:0 2px 8px -4px rgba(0,0,0,.2)}",
    ".rcard{background:#fff;border-radius:22px;padding:14px;margin-bottom:14px;box-shadow:0 4px 18px -10px rgba(43,38,34,.25)}",
    ".rtop{display:flex;gap:12px;align-items:flex-start}",
    ".num{width:28px;height:28px;border-radius:50%;background:var(--water);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:13px;flex:none}",
    ".rinfo{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}",
    ".rinfo small{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--sun)}",
    ".rinfo b{font-size:16px}",
    ".rinfo span{font-size:13px;color:var(--muted)}",
    ".badges{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}",
    ".fit{display:inline-block;font-size:12px;font-weight:600;border-radius:999px;padding:3px 10px;white-space:nowrap}",
    ".b-hi{background:#dcefe3;color:#2d6a45}.b-mid{background:#f6e9d3;color:#8a5a14}.b-lo{background:#f6dcd6;color:#9a3b2a}",
    ".ring .rv.b-hi{stroke:#3f8a5c;background:none}.ring .rv.b-mid{stroke:#c9853f;background:none}.ring .rv.b-lo{stroke:#c0553f;background:none}",
    ".heart{border:0;background:transparent;font-size:22px;cursor:pointer;color:var(--muted);width:40px;height:40px}",
    ".heart[aria-pressed=true]{color:#c0553f}",
    ".whybox{background:var(--sand-soft);border-radius:16px;padding:12px;margin:12px 0}",
    ".whybox b{font-size:13px}",
    ".whybox p{margin:6px 0;font-size:14px}",
    ".qchips,.qgrid{display:flex;flex-direction:column;align-items:flex-end;gap:6px;margin-top:8px}",
    ".qgrid{align-items:stretch}",
    ".qchip{font:inherit;font-size:13px;color:var(--water);background:var(--water-soft);border:0;border-radius:14px;padding:8px 12px;cursor:pointer;text-align:left}",
    ".alt-t{font-size:13px;color:var(--muted);margin:12px 0 6px}",
    ".carousel{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scroll-snap-type:x mandatory}",
    ".mini{font:inherit;text-align:left;flex:0 0 180px;scroll-snap-align:start;background:#fff;border:1px solid var(--line);border-radius:16px;padding:10px 12px;display:flex;flex-direction:column;gap:4px;cursor:pointer;color:var(--ink)}",
    ".mini small{color:var(--muted);font-size:12px}",
    ".cta.row{display:flex;gap:8px;flex-wrap:wrap}.cta.row .btn{flex:1}",
    ".week{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:14px;overflow:visible}",
    ".day{display:flex;flex-direction:column;align-items:center;gap:2px;background:#fff;border-radius:999px;padding:8px 0;font-size:12px;color:var(--muted)}",
    ".day b{font-size:15px;color:var(--ink)}",
    ".day.now{background:var(--water);color:#fff}.day.now b{color:#fff}",
    ".sect{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-align:center;margin:18px 0 8px}",
    ".task,.pstep{font:inherit;width:100%;text-align:left;display:flex;align-items:center;gap:12px;background:#fff;border:0;border-radius:999px;padding:12px 16px;margin-bottom:8px;cursor:pointer;color:var(--ink);min-height:52px}",
    ".task.done{color:var(--muted)}",
    ".tick{width:24px;height:24px;border-radius:50%;border:1.5px solid var(--line);display:flex;align-items:center;justify-content:center;flex:none;font-size:13px;color:#fff}",
    ".task.done .tick,.pstep[aria-pressed=true] .tick{background:var(--water);border-color:var(--water)}",
    ".plan{background:var(--sand-soft);border-radius:20px;padding:12px;margin-bottom:10px}",
    ".plan>b{display:block;margin:0 0 8px 4px}",
    ".pstep small{color:var(--muted)}",
    ".pstep.later{opacity:.55;cursor:default}",
    ".voicebox{display:flex;align-items:center;gap:14px;margin:12px 0}.mic{width:72px;height:72px;border-radius:50%;border:0;background:var(--water);color:#fff;font-size:28px;cursor:pointer;box-shadow:0 8px 24px -10px var(--water);flex:none}.mic.on{background:#C06F55;animation:pulse 1.2s infinite}@keyframes pulse{50%{box-shadow:0 0 0 12px rgba(192,111,85,.15)}}.voicebox span{color:var(--muted);font-size:14px}",
    "#voicetext{width:100%;font:inherit;font-size:16px;border:1px solid var(--line);border-radius:16px;padding:12px;background:#fff;color:var(--ink);resize:vertical}.ex{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}.ex span{font-size:12px;background:var(--sand-soft);border-radius:999px;padding:4px 10px;color:var(--muted)}",
    ".capgrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:12px 0}.capslot{display:grid;gap:6px;justify-items:center;cursor:pointer;font-size:12px;text-align:center}.capslot img,.capico{width:100%;aspect-ratio:3/4;border-radius:14px;object-fit:cover;border:1.5px dashed var(--water);display:flex;align-items:center;justify-content:center;font-size:26px;color:var(--water);background:#fff}.capslot.has img{border-style:solid;border-color:var(--line)}",
    ".capframes{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;margin:10px 0}.capframes img{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:10px}",
    ".esphead{margin-bottom:10px}.esphead h3{font-family:var(--display);font-weight:400;font-size:clamp(28px,7vw,38px);margin:0 0 8px;line-height:1.05}.esphead .chips{display:flex;flex-wrap:wrap;gap:6px}.esphead .chips span{font-size:12px;background:#fff;border:1px solid var(--line);border-radius:999px;padding:3px 10px;color:var(--muted)}",
    ".etabs{position:sticky;top:0;z-index:4;display:flex;overflow-x:auto;gap:0;background:var(--paper);border-bottom:1px solid var(--line);margin:0 -16px 14px;padding:0 16px;scrollbar-width:none}.etabs button{flex:none;font:inherit;font-size:13px;border:0;background:none;color:var(--muted);padding:12px 10px;border-bottom:2px solid transparent;cursor:pointer}.etabs button[aria-selected=true]{color:var(--ink);font-weight:600;border-bottom-color:var(--water)}",
    ".markbar{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;background:#fff;border-radius:16px;padding:10px 14px;margin:8px 0;font-size:14px}.yn{display:flex;gap:6px}.yn button{font:inherit;font-size:13px;font-weight:600;min-width:58px;padding:7px 12px;border-radius:999px;border:1px solid var(--line);background:var(--paper);cursor:pointer}.yn button[aria-pressed=true]:first-child{background:var(--water);color:#fff;border-color:var(--water)}.yn button[aria-pressed=true]:last-child{background:#C06F55;color:#fff;border-color:#C06F55}",
    ".stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:10px 0}.stats div{background:#fff;border-radius:16px;padding:12px;display:flex;flex-direction:column}.stats b{font-size:24px;font-weight:500}.stats small{font-size:11px;color:var(--muted)}",
    ".calh{display:flex;justify-content:space-between;align-items:center;margin:8px 0}.calh b{text-transform:capitalize;font-weight:500}.calh button{width:36px;height:36px;border-radius:50%;border:1px solid var(--line);background:#fff;font-size:18px;cursor:pointer}.pcal{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px}.pcal .wd{font-style:normal;font-size:10px;text-align:center;color:var(--muted)}.pcell{font:inherit;background:#fff;border:1px solid var(--line);border-radius:10px;padding:5px 2px;display:grid;gap:4px;justify-items:center;cursor:pointer;min-height:48px;font-size:12px}.pcell.today{border-color:var(--water)}.pcell.sel{background:var(--water-soft)}.pcell:disabled{opacity:.4}.segs4{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;width:100%;max-width:34px}.segs4 i{height:5px;border-radius:3px;background:var(--line)}.segs4 i.oui{background:var(--water)}.segs4 i.non{background:#C06F55}.legend{font-size:12px;color:var(--muted);display:flex;flex-wrap:wrap;gap:6px;align-items:center}.sw{display:inline-block;width:14px;height:6px;border-radius:3px;background:var(--line)}.sw.oui{background:var(--water)}.sw.non{background:#C06F55}",
    ".entry{background:#fff;border-radius:18px;padding:12px;margin-bottom:10px;display:grid;gap:8px}.entry.zero{background:var(--sand-soft)}.entry small{color:#9A4F37;font-weight:600}.entry .chips{display:flex;flex-wrap:wrap;gap:5px;margin:0}.entry .chips span{font-size:12px;background:var(--sand-soft);border-radius:999px;padding:2px 9px}.ph3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}.ph3 img,.ph3 i{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:10px;background:var(--line)}.pair{display:grid;grid-template-columns:1fr 1fr;gap:8px}.pair figure{margin:0}.pair img{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:12px}.pair figcaption{font-size:12px;color:var(--muted);text-align:center}",
    ".slots{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,150px),1fr));gap:8px;margin-bottom:10px}.slots div{background:#fff;border-radius:16px;padding:12px}.slots b{display:block;font-weight:600}.slots small{color:#9A4F37;font-size:11px;text-transform:uppercase;letter-spacing:.1em}.slots p{margin:4px 0 0;font-size:13px;color:var(--muted)}",
    ".mrow{display:flex;justify-content:space-between;gap:10px;background:#fff;border-radius:16px;padding:12px;margin-bottom:8px}.mrow span{display:flex;flex-direction:column;min-width:0}.mrow small{color:var(--muted);font-size:13px}.pill{font-style:normal;font-size:11px;font-weight:600;padding:4px 10px;border-radius:999px;white-space:nowrap;align-self:flex-start}.pill.keep{background:#DCEBE4;color:#2E6B57}.pill.adapt{background:#C4D3E4;color:#042850}.pill.pause{background:#F3DDD7;color:#9A3B2E}.reco-card.esp{background:linear-gradient(135deg,var(--water),#7591AA);color:#fff}.reco-card.esp span{color:rgba(255,255,255,.85)}",
    ".tfields{display:grid;gap:12px;margin-top:10px}.tfields label{display:grid;gap:6px;font-size:13px;color:var(--muted)}.tfields input,.tfields textarea{font:inherit;font-size:16px;color:var(--ink);background:#fff;border:1px solid var(--line);border-radius:14px;padding:12px}",
    ".hacts{display:flex;gap:8px;align-items:center}.acctbtn{width:40px;height:40px;border-radius:50%;border:1px solid var(--line);background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--water)}.acctbtn svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.7}",
    ".acct{background:#fff;border-radius:20px;padding:16px;margin-bottom:12px}.acct p{margin:6px 0 10px;font-size:14px;color:var(--muted)}.acct small{color:var(--muted);font-size:12px}",
    ".clist{display:grid;gap:8px;margin-bottom:12px}.crow{display:flex;align-items:center;gap:8px;background:#fff;border-radius:16px;padding:8px}.crow-main{flex:1;min-width:0;display:flex;align-items:center;gap:10px;border:0;background:none;font:inherit;color:var(--ink);text-align:left;cursor:pointer;text-decoration:none;padding:0}.crow-main img,.cico{width:52px;height:52px;border-radius:12px;object-fit:cover;flex:none;background:var(--sand-soft);display:flex;align-items:center;justify-content:center}.cico svg{width:22px;height:22px;fill:none;stroke:var(--water);stroke-width:1.6}.crow-main span{display:flex;flex-direction:column;min-width:0}.crow-main small{color:var(--muted);font-size:11px}.crow-main b{font-weight:500;font-size:14px}",
    ".favbtn{width:38px;height:38px;flex:none;border-radius:50%;border:1px solid var(--line);background:#fff;color:#C06F55;font-size:18px;cursor:pointer}.favbtn[aria-pressed=true]{background:#fbefe4}.shead .favbtn{background:rgba(255,255,255,.25);border-color:transparent;color:#fff}",
    ".advice{display:grid;gap:8px;margin-bottom:10px}.advice details{background:#fff;border-radius:16px;padding:12px 14px}.advice summary{cursor:pointer;font-weight:600}.advice p{margin:8px 0 0;font-size:14px;color:var(--ink)}",
    ".dodont{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:8px}.whybox.do li::marker{color:#2E6B57}.whybox.dont li::marker{color:#C06F55}.guide{margin:6px 0 10px;padding-left:20px;display:grid;gap:6px;font-size:14px}.types{background:#fff;border-radius:16px;padding:10px 14px;margin:10px 0}.types summary{cursor:pointer;font-weight:600}.types p{font-size:14px}",
    ".tipl{margin:6px 0 0;padding-left:18px;display:grid;gap:6px;font-size:14px}.myth{background:#fff4e8;border-radius:18px;padding:14px;margin:10px 0}.myth p{margin:6px 0 0;font-size:14px}.srcs{margin:12px 0;font-size:13px}.srcs ul{padding-left:18px}.srcs a{color:var(--water)}.srcs small{color:var(--muted)}",
    ".made.fnd{background:#fbefe4;color:#8a4b1f}.made.rev{background:#eef3f6;color:var(--water)}.revnote{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.revnote small{flex-basis:100%;color:var(--muted);font-size:11px}",
    ".scanhero{width:100%;font:inherit;display:flex;align-items:center;gap:14px;text-align:left;border:0;border-radius:22px;padding:18px;margin:4px 0 12px;background:var(--water);color:#fff;cursor:pointer}.scanhero svg{width:30px;height:30px;fill:none;stroke:currentColor;stroke-width:1.6;flex:none}.scanhero span{display:flex;flex-direction:column;gap:2px}.scanhero small{opacity:.85}",
    ".camview{position:fixed;inset:0;z-index:50;background:#0d1214;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:16px}.camview video{width:100%;max-width:520px;max-height:62vh;border-radius:20px;object-fit:cover;background:#000}",
    ".camframe{position:absolute;width:min(70vw,320px);height:min(36vw,170px);border:3px solid rgba(255,255,255,.85);border-radius:18px;top:calc(50% - 60px);box-shadow:0 0 0 999px rgba(0,0,0,.18);pointer-events:none}",
    ".camview p{color:#fff;text-align:center;margin:0;max-width:34ch;font-size:15px}.camacts{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}.camview .btn.ghost{background:rgba(255,255,255,.12);color:#fff;border-color:rgba(255,255,255,.4)}",
    ".tri{background:#fff;border-radius:20px;padding:14px;margin:0 0 14px}.tri>div{display:grid;grid-template-columns:repeat(auto-fit,minmax(0,1fr));gap:8px;margin:10px 0}.tri p{margin:0;background:var(--sand-soft);border-radius:14px;padding:10px;display:flex;flex-direction:column;gap:2px;font-size:13px;min-width:0}.tri p span{width:22px;height:22px;border-radius:50%;background:var(--line);display:flex;align-items:center;justify-content:center;font-size:12px}.tri p.on span{background:var(--water);color:#fff}.tri p small{color:var(--muted);font-size:11px;overflow-wrap:anywhere}.tri>small{color:var(--muted);font-size:12px;display:block}",
    ".intro{background:var(--sand-soft);border-radius:20px;padding:14px;margin-bottom:10px}.intro>p{margin:0 0 10px;font-size:14px;color:var(--muted)}",
    ".intro ol{list-style:none;margin:0;padding:0;display:grid;gap:8px}.intro li{display:flex;gap:10px;align-items:flex-start;background:#fff;border-radius:16px;padding:10px 12px}",
    ".intro li>span:last-child{display:flex;flex-direction:column;gap:2px;min-width:0}.intro li small{color:var(--muted);font-size:12px}.intro li em{font-style:normal;font-size:12px;color:var(--water)}",
    ".wn{flex:none;width:30px;height:30px;border-radius:50%;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600}",
    ".intro li.now{box-shadow:0 0 0 2px var(--water)}.intro li.now .wn{background:var(--water);color:#fff;border-color:var(--water)}.intro li.past{opacity:.6}.intro li.past .wn{background:var(--water-soft)}",
    ".evecal{background:#fff;border-radius:20px;padding:6px 14px;margin-bottom:10px}.evecal p{display:grid;grid-template-columns:44px minmax(0,1fr);gap:8px;margin:0;padding:9px 0;border-bottom:1px solid var(--line);font-size:14px}.evecal p:last-child{border:0}.evecal p.now b{color:var(--water)}",
    ".delays p{display:grid;grid-template-columns:120px minmax(0,1fr);gap:10px;margin:8px 0;font-size:14px}",
    ".mood{background:#fff;border-radius:20px;padding:14px}",
    ".mood p{margin:0 0 10px}",
    ".mood div{display:flex;justify-content:space-between;gap:4px}",
    ".mood button{font:inherit;border:0;background:transparent;display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;color:var(--muted);font-size:11px;padding:4px}",
    ".mood button span{font-size:26px;width:46px;height:46px;border-radius:50%;background:var(--sand-soft);display:flex;align-items:center;justify-content:center}",
    ".mood button[aria-pressed=true] span{background:var(--water-soft);outline:2px solid var(--water)}",
    ".reco-card{font:inherit;width:100%;text-align:left;display:flex;flex-direction:column;gap:2px;background:linear-gradient(135deg,var(--water-soft),var(--sand));border:0;border-radius:20px;padding:16px;margin-top:14px;cursor:pointer;color:var(--ink)}",
    ".reco-card span{font-size:13px;color:var(--muted)}",
    ".search{width:100%;margin-bottom:14px;border-radius:999px;padding:12px 16px}",
    ".list{display:flex;flex-direction:column;gap:8px}",
    ".prow{font:inherit;text-align:left;display:flex;justify-content:space-between;align-items:center;gap:10px;background:#fff;border:0;border-radius:16px;padding:12px 14px;cursor:pointer;color:var(--ink)}",
    ".prow span{display:flex;flex-direction:column;min-width:0}",
    ".prow small{color:var(--muted);font-size:12px}",
    ".coll{background:#fff;border-radius:20px;padding:14px;margin-bottom:10px}",
    ".coll p{margin:2px 0 10px;font-size:13px;color:var(--muted)}",
    ".coll .mini{background:var(--sand-soft);border:0}",
    ".empty{color:var(--muted);text-align:center;padding:16px 8px;margin:0}",
    ".scanmodes{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin:14px 0}",
    ".smode{font:inherit;text-align:left;background:#fff;border:1.5px solid var(--line);border-radius:20px;padding:14px;display:flex;flex-direction:column;gap:4px;cursor:pointer;color:var(--ink)}",
    ".smode svg{width:26px;height:26px;fill:none;stroke:var(--water);stroke-width:1.6}",
    ".smode small{color:var(--muted);font-size:12px}",
    ".scanform{display:flex;flex-direction:column;gap:8px;background:#fff;border-radius:20px;padding:14px}",
    ".scanform label{font-size:13px;color:var(--muted)}",
    "textarea{font:inherit;border:1.5px solid var(--line);border-radius:12px;padding:10px;background:var(--paper);color:var(--ink);resize:vertical}",
    ".scanres{display:flex;flex-direction:column;gap:10px}",
    ".subscores{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:8px 0}",
    ".subscores span{background:#fff;border-radius:14px;padding:10px;display:flex;flex-direction:column;align-items:center}",
    ".subscores b{font-size:20px;font-variant-numeric:tabular-nums}",
    ".subscores small{font-size:11px;color:var(--muted)}",
    ".scale{display:grid;grid-template-columns:repeat(5,1fr);gap:4px}",
    ".scale i{font-style:normal;font-size:10px;text-align:center;color:var(--muted);border-top:3px solid #c0553f;padding-top:3px}",
    ".scale i:nth-child(2){border-color:#d98a5a}.scale i:nth-child(3){border-color:#c9853f}.scale i:nth-child(4){border-color:#6fae7f}.scale i:nth-child(5){border-color:#3f8a5c}",
    ".notes{margin:6px 0;padding-left:18px;font-size:14px}",
    ".notes li.warn{color:#9a3b2a}.notes li.good{color:#2d6a45}",
    ".flags{display:flex;flex-wrap:wrap;gap:6px}",
    ".flags span{font-size:12px;background:#f6dcd6;color:#9a3b2a;border-radius:999px;padding:3px 10px}",
    ".guides{display:grid;gap:10px}",
    ".guide{font:inherit;text-align:left;display:flex;flex-direction:column;gap:4px;background:linear-gradient(135deg,#fff,var(--sand-soft));border:1px solid var(--line);border-radius:20px;padding:16px;cursor:pointer;color:var(--ink)}",
    ".guide b{font-family:var(--display);font-weight:400;font-size:24px}",
    ".guide small{color:var(--muted)}",
    ".gday{background:#fff;border-radius:16px;padding:12px 14px;margin-top:8px}",
    ".gday p{margin:4px 0 0;font-size:14px}",
    ".chatlog{display:flex;flex-direction:column;gap:8px;max-height:52vh;overflow:auto;padding:4px 0 10px}",
    ".bubble{max-width:86%;border-radius:18px;padding:10px 14px;font-size:15px;white-space:pre-wrap}",
    ".bubble.bot{background:#fff;align-self:flex-start;border-bottom-left-radius:6px}",
    ".bubble.me{background:var(--water);color:#fff;align-self:flex-end;border-bottom-right-radius:6px}",
    ".bubble.typing{color:var(--muted)}",
    ".chatform{display:flex;gap:8px;margin-top:10px}",
    ".chatform input{flex:1;border-radius:999px;padding:10px 16px}",
    ".chatform .btn{width:48px;padding:0}",
    ".sheet.top{z-index:23}",
    ".photoacts{flex-wrap:wrap;gap:8px}",
    ".app.full{border:0;border-radius:0;max-width:none;min-height:100vh}.app.full .body{max-width:640px;margin:0 auto}.app.full .bnav{max-width:none}",
    ".shiftbox{background:linear-gradient(160deg,var(--water-soft),var(--paper));border-radius:24px;padding:14px;margin:6px 0 14px}.shiftbox h4{margin:8px 0 4px}.shiftbox>p{font-size:14px;color:var(--muted);margin:0 0 12px}",
    "a.chip{text-decoration:none;display:inline-flex;align-items:center}",
    ".pluspill{font:inherit;font-size:13px;font-weight:600;border:0;border-radius:999px;padding:7px 14px;cursor:pointer;color:#fff;background:linear-gradient(135deg,var(--water),#4f8f9c)}",
    ".plushead{background:linear-gradient(160deg,#f6d9a8,var(--water-soft));border-radius:24px;padding:18px;margin-bottom:12px}.plushead h3{font-family:var(--display);font-weight:400;font-size:34px;margin:8px 0 4px;line-height:1.05}.plushead p{margin:0}",
    ".perks{list-style:none;padding:0;margin:0 0 14px;display:grid;gap:8px}.perks li{display:flex;gap:10px;align-items:center;background:#fff;border-radius:14px;padding:10px 12px;font-size:15px}.perks svg{width:20px;height:20px;fill:none;stroke:var(--sun);stroke-width:1.6;flex:none}",
    ".plans{display:grid;grid-template-columns:1fr 1fr;gap:10px}.plan2{font:inherit;position:relative;text-align:left;background:#fff;border:2px solid var(--line);border-radius:18px;padding:14px;display:flex;flex-direction:column;gap:4px;cursor:pointer;color:var(--ink)}.plan2[aria-pressed=true]{border-color:var(--water);background:var(--water-soft)}.plan2 .pr{font-size:22px;font-weight:600}.plan2 .pr small,.plan2>small{font-size:12px;color:var(--muted);font-weight:400}",
    ".best{position:absolute;top:-10px;right:10px;font-size:11px;background:var(--sun);color:#fff;border-radius:999px;padding:2px 8px}",
    ".paylist{display:grid;gap:8px;margin-bottom:14px}.pay{font:inherit;display:grid;grid-template-columns:1fr auto;grid-template-rows:auto auto;column-gap:10px;text-align:left;background:#fff;border:1.5px solid var(--line);border-radius:16px;padding:12px 14px;cursor:pointer;color:var(--ink)}.pay small{grid-column:1;color:var(--muted);font-size:12px}.pay .rad{grid-column:2;grid-row:1/3;align-self:center}.pay[aria-pressed=true]{border-color:var(--water)}.pay[aria-pressed=true] .rad{border:8px solid var(--water)}.pay:disabled{opacity:.5;cursor:not-allowed}",
    "a.btn.big{display:flex}",
    ".modes{display:flex;align-items:center;gap:6px;margin:0 0 8px;flex-wrap:wrap}.modes span{font-size:12px;color:var(--muted);margin-right:2px}.modes button{font:inherit;font-size:13px;border:1.5px solid var(--line);background:#fff;border-radius:999px;padding:6px 12px;cursor:pointer;color:var(--ink)}.modes button[aria-pressed=true]{border-color:var(--water);background:var(--water-soft);color:var(--water);font-weight:600}",
    ".sect.left{text-align:left;margin-left:2px}",
    ".amb{position:relative;margin:0 0 14px;border-radius:24px;overflow:hidden;height:180px;background:var(--sand)}.amb.short{height:140px}.amb.low img{object-position:center 85%}.amb img{width:100%;height:100%;object-fit:cover;display:block}",
    ".amb figcaption{position:absolute;inset:auto 0 0 0;padding:28px 16px 14px;background:linear-gradient(180deg,rgba(20,24,28,0),rgba(20,24,28,.55));color:#fff;display:flex;flex-direction:column;gap:2px}.amb figcaption small{font-size:11px;letter-spacing:.12em;text-transform:uppercase;opacity:.9}.amb figcaption b{font-weight:500;font-size:16px}",
    ".pthumb,.ptile{width:64px;height:64px;border-radius:16px;object-fit:cover;flex:none;background:var(--sand)}.ptile{display:flex;align-items:center;justify-content:center;font-family:var(--display);font-size:22px;color:var(--water);background:linear-gradient(150deg,var(--water-soft),var(--sand-soft))}",
    ".shiftph{width:100%;height:170px;object-fit:cover;border-radius:18px;display:block;margin-bottom:10px}",
    ".stories .storycard.ph{background-size:cover;background-position:center}",
    ".stories .storycard{flex:0 0 150px;height:190px;border:0;border-radius:20px;padding:14px;display:flex;flex-direction:column;justify-content:space-between;text-align:left;cursor:pointer;font:inherit;color:var(--ink);scroll-snap-align:start}",
    ".storycard b{font-family:var(--display);font-weight:400;font-size:21px;line-height:1.1}",
    ".storycard .tag{background:rgba(255,255,255,.7);font-size:10px}",
    ".sun{background:linear-gradient(160deg,#f6d9a8,#efe6d8)}.water{background:linear-gradient(160deg,#cfe4e8,#efe6d8)}.lilac{background:linear-gradient(160deg,#e3d8f0,#f6f1ea)}.sand{background:linear-gradient(160deg,#ead7c0,#f6f1ea)}",
    ".storyview{position:fixed;inset:0;z-index:30;display:flex;flex-direction:column;padding:calc(14px + env(safe-area-inset-top,0px)) max(18px,env(safe-area-inset-right,0px)) calc(18px + env(safe-area-inset-bottom,0px)) max(18px,env(safe-area-inset-left,0px));color:var(--ink)}",
    ".sbar{display:flex;gap:4px}.sbar i{flex:1;height:3px;border-radius:3px;background:rgba(43,38,34,.18)}.sbar i.done,.sbar i.now{background:var(--ink)}",
    ".shead{display:flex;justify-content:space-between;align-items:center;margin-top:10px;font-size:13px;position:relative;z-index:2}",
    ".x.light{position:static;color:var(--ink)}",
    ".sbody{flex:1;display:flex;flex-direction:column;justify-content:center;gap:14px;max-width:520px;margin:0 auto;width:100%}",
    ".sbody h3{font-family:var(--display);font-weight:400;font-size:clamp(30px,8vw,44px);line-height:1.08;margin:0;text-wrap:balance}",
    ".sbody p{font-size:17px;line-height:1.5;margin:0}",
    ".slab{align-self:flex-start;font-size:13px;font-weight:600;border-radius:8px;padding:4px 10px;background:#fff}",
    ".slab.mythe{color:#9a3b2a}.slab.verite{background:var(--water);color:#fff}.slab.astuce{background:var(--sun);color:#fff}",
    ".snav{position:absolute;top:80px;bottom:60px;width:40%;border:0;background:transparent;cursor:pointer;z-index:1}.snav.prev{left:0}.snav.next{right:0;width:60%}",
    ".shint{text-align:center;font-size:12px;color:var(--muted);margin:0}",
    ".sdot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:4px;vertical-align:middle}",
    ".zone .dots{display:inline-flex;margin-left:4px}.zone .dots .sdot{margin:0 1px;border:1px solid #fff}",
    ".zrow{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.zrow span{font-weight:600;min-width:90px}.zrow em{font-style:normal;font-size:12px;border:1.5px solid;border-radius:999px;padding:2px 8px;background:#fff}",
    ".toggle{display:flex;gap:10px;align-items:flex-start;font-size:14px;margin:10px 0;color:var(--ink)}.toggle input{min-height:auto;width:20px;height:20px;flex:none;margin-top:2px}",
    ".logrow{display:flex;gap:12px;align-items:center;background:#fff;border-radius:16px;padding:10px}.logrow img,.nothumb{width:52px;height:52px;border-radius:12px;object-fit:cover;flex:none;background:var(--sand);display:flex;align-items:center;justify-content:center}",
    ".nothumb svg{width:24px;height:24px;fill:none;stroke:var(--sun);stroke-width:1.4}",
    ".logrow>.lgt{flex:1;display:flex;flex-direction:column;gap:3px;min-width:0}.logrow small{color:var(--muted);font-size:12px}.logrow .fit{align-self:flex-start}"
  ].join("");
  // ---------------------------------------------------------------------------
  // GUIDES (gratuits)
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // STORIES (format « stories », comme Lóvi) · k : titre | mythe | verite | astuce | texte | etape
  // ---------------------------------------------------------------------------
  var STORIES = [
    { rub: "Sunsoari", title: "Sunsoari, c'est quoi ?", tone: "sun", img: "filtre-thermal-sans-senteur-ambiance-reflets-eau", slides: [
      { k: "titre", t: "Bienvenue dans ta maison de soin", d: "Sunsoari est née de deux sœurs, Fanta et Seyo, et d'une conviction : prendre soin de soi commence dès la douche." },
      { k: "texte", t: "Sun", d: "Le soleil : la lumière, la chaleur, la joie." },
      { k: "texte", t: "Sunsu · 순수", d: "Pour nous, ce mot coréen évoque la pureté et ce qui est authentique." },
      { k: "texte", t: "So", d: "« Maison » en bambara. Un lieu de réconfort, de transmission et de soin." },
      { k: "texte", t: "Soari et Seyo", d: "Le prénom du fils de Fanta, et celui de sa sœur, qui porte le prénom de leur grand-mère et évoque la joie." },
      { k: "astuce", t: "Ici, on te promet de l'honnêteté", d: "Pas de promesse miracle : des produits choisis avec exigence, et des conseils qui disent la vérité." }
    ] },
    { rub: "Mythe ou vérité", title: "Filtre de douche : ce qu'il fait vraiment", tone: "water", img: "shift-pommeau-changement-capsule-mains", slides: [
      { k: "titre", t: "Filtre de douche : ce qu'il fait vraiment", d: "On démêle le vrai du faux, sans marketing." },
      { k: "mythe", t: "« Un filtre de douche adoucit l'eau »", d: "" },
      { k: "verite", t: "La plupart ne retirent pas le calcaire de façon significative.", d: "Un adoucisseur est un autre appareil. Les filtres de douche sont surtout conçus pour réduire une partie du chlore et des sédiments, selon leurs fabricants." },
      { k: "mythe", t: "« L'eau du robinet est mauvaise pour la peau »", d: "" },
      { k: "verite", t: "En France, l'eau du robinet est potable et très contrôlée.", d: "Un filtre est un choix de confort et de sensorialité, pas une nécessité." },
      { k: "astuce", t: "Le bon réflexe", d: "Change ta cartouche aux dates conseillées : ton planner te le rappelle." }
    ] },
    { rub: "Mythe ou vérité", title: "Le soleil et les peaux foncées", tone: "sun", slides: [
      { k: "titre", t: "Le soleil et les peaux foncées", d: "Une idée reçue tenace." },
      { k: "mythe", t: "« Les peaux foncées n'ont pas besoin de protection solaire »", d: "" },
      { k: "verite", t: "Elles brûlent moins facilement, mais les UV agissent sur toutes les peaux.", d: "Taches, teint inégal et vieillissement lié au soleil concernent toutes les carnations." },
      { k: "astuce", t: "Astuce", d: "Cherche une texture qui ne laisse pas de traces blanches : les solaires asiatiques sont souvent très fluides." }
    ] },
    { rub: "Mythe ou vérité", title: "Spicules : exfoliation ou micro-aiguilles ?", tone: "lilac", slides: [
      { k: "titre", t: "Les spicules, nouvelle star de TikTok", d: "De minuscules fragments issus d'éponges marines, utilisés dans certains sérums coréens." },
      { k: "mythe", t: "« C'est du microneedling à la maison »", d: "" },
      { k: "verite", t: "Ils agissent en surface, sans la profondeur d'un acte réalisé en cabinet.", d: "Ils picotent volontairement : une sorte d'exfoliation physique douce." },
      { k: "mythe", t: "« Ça convient à tout le monde »", d: "" },
      { k: "verite", t: "À éviter sur peau sensible, à rougeurs ou abîmée.", d: "Et jamais le même soir qu'un exfoliant acide ou un rétinoïde." }
    ] },
    { rub: "Mythe ou vérité", title: "Le PDRN, tendance 2026", tone: "lilac", slides: [
      { k: "titre", t: "Le PDRN, ingrédient star de la K-beauty", d: "Des fragments d'ADN, souvent issus du saumon, passés des cabinets coréens aux sérums." },
      { k: "mythe", t: "« Ses effets sont prouvés comme en cabinet »", d: "" },
      { k: "verite", t: "En cosmétique, les preuves restent limitées et varient selon les formules.", d: "Une tendance à suivre avec curiosité, mais avec recul." },
      { k: "astuce", t: "À savoir", d: "Il est d'origine animale : à éviter si tu fais le choix du vegan." }
    ] },
    { rub: "Mythe ou vérité", title: "Le karité, trésor d'Afrique de l'Ouest", tone: "sand", slides: [
      { k: "titre", t: "Le karité, trésor d'Afrique de l'Ouest", d: "Un beurre extrait des noix de l'arbre à karité, souvent travaillé par des coopératives de femmes." },
      { k: "mythe", t: "« Le karité convient à toutes les peaux du visage »", d: "" },
      { k: "verite", t: "Il est riche : parfait pour le corps et les longueurs, parfois trop sur une peau grasse.", d: "Sur le visage, teste-le d'abord sur une petite zone." },
      { k: "astuce", t: "Le geste", d: "Réchauffe une noisette entre tes mains et applique-la sur peau encore humide après la douche." }
    ] },
    { rub: "Académie", title: "Les taches : comprendre avant d'agir", tone: "sand", slides: [
      { k: "titre", t: "Les taches : comprendre avant d'agir", d: "Teint inégal, marques après un bouton, taches de soleil : elles n'ont pas toutes la même origine." },
      { k: "texte", t: "Le geste numéro un", d: "La protection solaire tous les matins, toute l'année." },
      { k: "texte", t: "Les ingrédients les plus utilisés", d: "Niacinamide, vitamine C, acide tranexamique, acide azélaïque, réglisse." },
      { k: "astuce", t: "Patience et prudence", d: "Une tache qui change de forme, de couleur ou saigne se montre à un ou une dermatologue." }
    ] },
    { rub: "Académie", title: "Trois types de taches", tone: "sand", slides: [
      { k: "titre", t: "Trois types de taches", d: "Avant de choisir un soin, on regarde d'où vient la tache." },
      { k: "texte", t: "Les marques après une inflammation", d: "Après un bouton, une piqûre, une irritation, un eczéma ou un soin trop fort. Ce sont les plus fréquentes sur les peaux foncées." },
      { k: "texte", t: "Le mélasma", d: "Des plaques souvent symétriques sur les joues, le front ou la lèvre. Liées aux hormones (grossesse, contraception) et au soleil. Un suivi dermatologique est conseillé." },
      { k: "texte", t: "Les taches de soleil (lentigos)", d: "Liées au soleil reçu au fil des années, sur le visage, les mains, le décolleté." },
      { k: "astuce", t: "Une tache qui change", d: "Forme, couleur, taille ou saignement : montre-la à un ou une dermatologue, sans attendre." }
    ] },
    { rub: "Académie", title: "Le triangle anti-taches", tone: "water", slides: [
      { k: "titre", t: "Le triangle anti-taches", d: "Trois gestes qui travaillent ensemble." },
      { k: "texte", t: "1. Protéger", d: "Crème solaire SPF 50 chaque matin, même l'hiver. Sans elle, les autres soins ne suffisent pas." },
      { k: "texte", t: "2. Unifier", d: "Un actif qui freine la mélanine : alpha-arbutine, niacinamide, acide tranexamique, acide azélaïque, thiamidol, réglisse, vitamine C." },
      { k: "texte", t: "3. Renouveler", d: "Un rétinoïde le soir ou un exfoliant doux 1 à 2 fois par semaine, pour des marques installées. Sans exagérer : l'irritation crée de nouvelles taches." },
      { k: "texte", t: "Et le corps ?", d: "Mêmes familles d'ingrédients, mais en soins formulés pour le corps. La peau s'y renouvelle plus lentement : il faut encore plus de patience." },
      { k: "astuce", t: "Ce qui relève du médecin", d: "Trétinoïne, cystéamine, acide azélaïque à 20 %, peelings et laser se font sur prescription ou en cabinet." }
    ] },
    { rub: "Académie", title: "Introduire un nouvel actif", tone: "water", slides: [
      { k: "titre", t: "Introduire un nouvel actif", d: "La règle d'or : un seul nouveau produit à la fois." },
      { k: "etape", t: "1 · Teste", d: "Applique un peu de produit derrière l'oreille ou sur le cou pendant 2 à 3 jours." },
      { k: "etape", t: "2 · Commence doucement", d: "Un soir sur deux, puis tous les soirs si ta peau est confortable." },
      { k: "etape", t: "3 · Observe", d: "Note ton ressenti dans ton journal de peau." },
      { k: "astuce", t: "Si ça pique", d: "Fais une pause et reviens à une routine douce : nettoyant, hydratant, protection solaire." }
    ] }
  ];
  // Tutoriels pas à pas (une vidéo de Fanta peut remplacer chaque tutoriel : champ video).
  var TUTOS = {
    spf: { title: "Appliquer sa protection solaire", video: "", slides: [
      { k: "etape", t: "Le bon moment", d: "Chaque matin, en dernière étape de ta routine, après l'hydratant." },
      { k: "etape", t: "La bonne quantité", d: "Environ deux longueurs de doigt pour le visage et le cou." },
      { k: "etape", t: "Les zones oubliées", d: "Oreilles, cou, racine des cheveux, dessus des mains." },
      { k: "etape", t: "Renouveler", d: "Toutes les deux heures en cas d'exposition, et après la baignade." }
    ] },
    demaquillant: { title: "Le double nettoyage", video: "", slides: [
      { k: "etape", t: "1 · L'huile", d: "Sur peau sèche, masse l'huile démaquillante 30 à 60 secondes." },
      { k: "etape", t: "2 · Émulsionner", d: "Ajoute un peu d'eau : l'huile devient laiteuse. Rince." },
      { k: "etape", t: "3 · Le nettoyant doux", d: "Termine avec ton nettoyant habituel, puis sèche en tamponnant." }
    ] },
    serum: { title: "Appliquer un sérum", video: "", slides: [
      { k: "etape", t: "Sur peau propre", d: "Après le tonique, sur peau encore légèrement humide." },
      { k: "etape", t: "2 à 3 gouttes", d: "Réchauffe-les entre tes paumes et presse-les doucement sur le visage." },
      { k: "etape", t: "Sceller", d: "Termine avec ta crème pour garder l'hydratation." }
    ] },
    douche: { title: "Installer ton pommeau ou ta coque", video: "", slides: [
      { k: "etape", t: "Avant de commencer", d: "Vérifie que ta douche a un flexible avec un raccord standard. Lis la notice du fabricant." },
      { k: "etape", t: "Dévisser", d: "Dévisse ton ancien pommeau à la main, sans outil, et vérifie la présence du joint." },
      { k: "etape", t: "Visser", d: "Visse le nouveau pommeau ou la coque à la main, sans forcer." },
      { k: "etape", t: "Noter la date", d: "Indique la date d'installation dans ton planner : on te rappelle quand changer la recharge." }
    ] }
  };

  var GUIDES = [
    { tag: "7 jours", title: "Mon rituel de la semaine", sub: "Un geste nouveau par jour, sans tout changer d'un coup.", days: [
      ["Jour 1 · Repartir en douceur", "Nettoyant doux le soir, hydratant, et c'est tout. Eau tiède, on tamponne pour sécher."],
      ["Jour 2 · Le bon double nettoyage", "Le soir, si tu portes maquillage ou protection solaire : huile démaquillante, puis nettoyant doux."],
      ["Jour 3 · Hydrater en couches", "Tonique ou essence sur peau légèrement humide, puis crème pour sceller l'hydratation."],
      ["Jour 4 · Protéger sa barrière", "Pas d'exfoliant aujourd'hui. Céramides ou panthénol si ta peau tiraille."],
      ["Jour 5 · Un actif ciblé", "Introduis un seul sérum ciblé, un soir sur deux pour commencer. Note comment ta peau réagit."],
      ["Jour 6 · Le rituel douche", "Eau tiède, douche courte, soin du corps sur peau encore humide. Un moment senteur si tu aimes ça."],
      ["Jour 7 · Bilan", "Remplis ton journal de peau. Garde ce qui te fait du bien, retire ce qui pique ou dessèche."]
    ] },
    { tag: "Soleil", title: "La protection solaire, mode d'emploi", sub: "Le geste le plus conseillé, sur toutes les carnations.", days: [
      ["Chaque matin", "En dernière étape, après l'hydratant, même en hiver et même par temps couvert."],
      ["La bonne quantité", "L'équivalent de deux longueurs de doigt pour le visage et le cou."],
      ["Renouveler", "Toutes les deux heures en cas d'exposition, et après la baignade ou la transpiration."],
      ["Peaux foncées aussi", "Elles brûlent moins facilement, mais les UV favorisent les taches et le vieillissement cutané sur toutes les carnations."],
      ["Choisir sa texture", "Fluide ou gel pour les peaux mixtes, crème pour les peaux sèches. Les textures asiatiques sont souvent très légères."]
    ] },
    { tag: "Douche", title: "Le rituel douche Sunsoari", sub: "Faire de la douche un vrai moment de soin.", days: [
      ["Avant", "Prépare ta serviette et ton soin du corps à portée de main."],
      ["Pendant", "Eau tiède plutôt que très chaude, 5 à 10 minutes. Respire la senteur de ta capsule si tu en utilises une."],
      ["Après", "Sèche en tamponnant, puis applique ton lait ou ton beurre sur peau encore humide."],
      ["Entretien", "Change filtres et capsules aux dates de ton planner, et détartre le pommeau si ton eau est calcaire."]
    ] },
    { tag: "Cheveux", title: "Cheveux bouclés à crépus : ma semaine", sub: "Hydratation, protection des longueurs et douceur.", days: [
      ["Jour de lavage", "Shampoing doux sur le cuir chevelu, après-shampoing généreux sur les longueurs, démêlage avec les doigts."],
      ["Masque", "Une fois par semaine, 15 à 20 minutes, éventuellement sous une serviette chaude."],
      ["Entre deux lavages", "Brume d'eau et soin sans rinçage sur les longueurs, puis une huile ou un beurre pour sceller."],
      ["La nuit", "Taie ou bonnet en satin pour limiter la friction."],
      ["Le cuir chevelu", "Démangeaisons, plaques ou chute inhabituelle : parles-en à un ou une dermatologue."]
    ] }
  ];
  // ---------------------------------------------------------------------------
  // SCORE DE COMPATIBILITÉ · transparent, calculé sur l'appareil
  // Tolérance (45 %) · Objectifs (35 %) · Type de peau (20 %).
  // Ce n'est pas une évaluation médicale : il compare des ingrédients à tes réponses.
  // ---------------------------------------------------------------------------
  var ACT_GOALS = {
    niacinamide: ["imperfections", "teint", "texture", "taches"], hyaluronique: ["secheresse"], ceramides: ["secheresse", "rougeurs"],
    centella: ["rougeurs", "imperfections"], heartleaf: ["rougeurs"], panthenol: ["rougeurs", "secheresse"], mucine: ["secheresse", "texture"],
    propolis: ["imperfections", "teint"], riz: ["teint"], ferments: ["teint"], vitc: ["taches", "teint"], tranexamique: ["taches"],
    retinoides: ["rides", "texture"], bakuchiol: ["rides", "texture"], pdrn: ["rides", "secheresse"], aha: ["texture", "teint"],
    bha: ["imperfections", "texture"], pha: ["texture"], azelaique: ["imperfections", "taches", "rougeurs"], spf: ["taches", "rides"],
    squalane: ["secheresse"], karite: ["secheresse", "corpsSec", "corpsTresSec", "secs"], argan: ["secs", "corpsSec"], marula: ["secheresse"],
    baobab: ["secs", "corpsSec"], camelia: ["secs"], aloe: ["secheresse"], ginseng: ["teint", "rides"], arbutine: ["taches", "teint"], thiamidol: ["taches"], kojique: ["taches"], reglisse: ["taches", "rougeurs"], romarin: ["cuirGras"], ricin: ["secs"], teatree: ["imperfections"]
  };

  // INCI → ingrédient de la bibliothèque (minuscules, recherche par fragment).
  var INCI_MAP = [
    ["niacinamide", "niacinamide"], ["hyaluron", "hyaluronique"], ["ceramide", "ceramides"], ["centella", "centella"], ["madecassoside", "centella"],
    ["houttuynia", "heartleaf"], ["snail secretion", "mucine"], ["propolis", "propolis"], ["oryza sativa", "riz"], ["rice", "riz"],
    ["galactomyces", "ferments"], ["ferment", "ferments"], ["ascorbic", "vitc"], ["ascorbyl", "vitc"], ["tranexamic", "tranexamique"],
    ["retinol", "retinoides"], ["retinal", "retinoides"], ["retinyl", "retinoides"], ["bakuchiol", "bakuchiol"],
    ["glycolic", "aha"], ["lactic acid", "aha"], ["mandelic", "aha"], ["salicyl", "bha"], ["gluconolactone", "pha"], ["lactobionic", "pha"],
    ["azel", "azelaique"], ["arbutin", "arbutine"], ["isobutylamido thiazolyl resorcinol", "thiamidol"], ["kojic", "kojique"], ["glycyrrhiza", "reglisse"], ["licorice", "reglisse"], ["sodium dna", "pdrn"], ["polydeoxyribonucleotide", "pdrn"], ["pdrn", "pdrn"], ["panthenol", "panthenol"],
    ["squalane", "squalane"], ["butyrospermum", "karite"], ["shea", "karite"], ["argania", "argan"], ["sclerocarya", "marula"],
    ["adansonia", "baobab"], ["moringa", "moringa"], ["camellia japonica", "camelia"], ["rosmarinus", "romarin"], ["ricinus", "ricin"], ["melaleuca", "teatree"],
    ["aloe barbadensis", "aloe"], ["olea europaea", "olive"], ["panax ginseng", "ginseng"],
    ["octocrylene", "spf"], ["ethylhexyl triazone", "spf"], ["bis-ethylhexyloxyphenol", "spf"], ["diethylamino hydroxybenzoyl", "spf"], ["zinc oxide", "spf"], ["titanium dioxide", "spf"], ["methylene bis-benzotriazolyl", "spf"]
  ];
  // Ingrédients à signaler selon le profil.
  var FLAGS = [
    { k: "parfum", m: ["parfum", "fragrance"], label: "Parfum", why: "Peut gêner les peaux sensibles ou réactives aux parfums." },
    { k: "allergenes", m: ["limonene", "linalool", "citral", "geraniol", "eugenol", "citronellol", "coumarin", "benzyl alcohol"], label: "Allergènes parfumants", why: "Composants de parfums et d'huiles essentielles à déclarer : à surveiller si ta peau réagit aux parfums." },
    { k: "alcool", m: ["alcohol denat", "sd alcohol"], label: "Alcool dénaturé", why: "Peut dessécher les peaux sèches ou sensibles, surtout en haut de liste." },
    { k: "mit", m: ["methylisothiazolinone"], label: "Méthylisothiazolinone", why: "Conservateur connu pour provoquer des allergies de contact." }
  ];

  function parseInci(text) {
    var low = " " + String(text || "").toLowerCase().replace(/\s+/g, " ") + " ";
    var acts = [], flags = [];
    INCI_MAP.forEach(function (m) { if (low.indexOf(m[0]) > -1 && acts.indexOf(m[1]) < 0) acts.push(m[1]); });
    FLAGS.forEach(function (f) { if (f.m.some(function (x) { return low.indexOf(x) > -1; })) flags.push(f.k); });
    if (acts.indexOf("teatree") > -1 && flags.indexOf("allergenes") < 0) flags.push("allergenes");
    return { acts: acts, flags: flags };
  }

  // p = {act:[...], flags:[...], for:[...], zone}
  function fitScore(p, a) {
    var tags = tagsOf(a), act = p.act || [], flags = p.flags || [], notes = [];
    var sensitiveSkin = a.peau === "sensible" || tags.indexOf("rougeurs") > -1 || tags.indexOf("reactifHE") > -1;
    // Tolérance
    var tol = 100;
    var he = act.indexOf("teatree") > -1 || flags.indexOf("allergenes") > -1;
    if ((he || flags.indexOf("parfum") > -1) && sensitiveSkin) { tol -= 35; notes.push(["warn", "Contient du parfum ou des huiles essentielles, alors que ta peau y est sensible."]); }
    var acid = act.some(function (x) { return ["aha", "bha", "pha"].indexOf(x) > -1; });
    if (acid && (tags.indexOf("acides") > -1 || a.peau === "sensible")) { tol -= 25; notes.push(["warn", "Contient des acides exfoliants : commence doucement, ou évite-les si ta peau a déjà réagi."]); }
    if (a.grossesse === "oui" && (act.indexOf("retinoides") > -1 || acid || he)) { tol -= 45; notes.push(["warn", "Contient un actif déconseillé pendant la grossesse ou l'allaitement sans avis médical."]); }
    if (act.indexOf("propolis") > -1 && tags.indexOf("ruche") > -1) { tol -= 55; notes.push(["warn", "Contient de la propolis, alors que tu réagis aux produits de la ruche."]); }
    if ((act.indexOf("mucine") > -1 || act.indexOf("pdrn") > -1) && tags.indexOf("vegan") > -1) { tol -= 50; notes.push(["warn", "Contient un ingrédient d'origine animale."]); }
    if (flags.indexOf("alcool") > -1 && (a.peau === "seche" || a.peau === "sensible")) { tol -= 15; notes.push(["warn", "Contient de l'alcool dénaturé, parfois desséchant."]); }
    if (flags.indexOf("mit") > -1) { tol -= 20; notes.push(["warn", "Contient de la méthylisothiazolinone, allergène connu."]); }
    tol = Math.max(5, tol);
    // Objectifs
    var goals = tags.filter(function (t) { return ["secheresse", "imperfections", "rougeurs", "teint", "texture", "taches", "rides", "corpsSec", "corpsTresSec", "secs", "cuirGras"].indexOf(t) > -1; });
    var hit = goals.filter(function (g) { return act.some(function (x) { return (ACT_GOALS[x] || []).indexOf(g) > -1; }) || (p.for || []).indexOf(g) > -1; });
    var obj = goals.length ? Math.round(45 + 55 * hit.length / goals.length) : 75;
    hit.forEach(function (g) {
      var by = act.filter(function (x) { return (ACT_GOALS[x] || []).indexOf(g) > -1; }).map(function (x) { return ING[x].n; });
      notes.push(["good", (TAG_LABEL[g] || g).replace(/^./, function (c) { return c.toUpperCase(); }) + (by.length ? " : " + by.slice(0, 2).join(", ") + "." : " : correspond à ton besoin.")]);
    });
    // Type de peau / cheveux
    var type = 75;
    var key = p.zone === "corps" ? a.corps : p.zone === "cheveux" || p.zone === "cuir" ? a.texture : a.peau;
    if ((p.for || []).indexOf(key) > -1) type = 100;
    else if (p.zone === "visage" && a.peau === "mixte" && act.indexOf("karite") > -1) { type = 45; notes.push(["warn", "Texture riche : peut sembler lourde sur une peau mixte à grasse."]); }
    var total = Math.round(0.45 * tol + 0.35 * obj + 0.2 * type);
    return { total: total, tol: tol, obj: obj, type: type, notes: notes };
  }

  function band(n) { return n >= 95 ? "Idéal" : n >= 70 ? "Très adapté" : n >= 50 ? "Adapté" : n >= 35 ? "Avec précautions" : "Peu adapté"; }
  function bandClass(n) { return n >= 70 ? "b-hi" : n >= 50 ? "b-mid" : "b-lo"; }

  var STEP_FREQ = { essence: "Après le tonique, quelques gouttes pressées avec les paumes.", nuit: "Le soir en dernière étape, 2 à 3 fois par semaine.", masquev: "1 à 2 fois par semaine, 15 à 20 minutes.", demaquillant: "Chaque soir, sur peau sèche, puis rince.", nettoyant: "Matin et/ou soir, en massant 30 secondes.", tonique: "Après le nettoyage, matin et soir.", serum: "Quelques gouttes après le tonique.", exfoliant: "1 à 2 fois par semaine, le soir, jamais le même soir qu'un rétinoïde.", yeux: "Le soir, une petite quantité en tapotant.", hydratant: "Matin et soir, en dernière étape avant la protection solaire.", spf: "Chaque matin, en quantité généreuse, à renouveler en cas d'exposition.", corps: "Après la douche, sur peau encore humide.", huile: "Quelques gouttes sur les longueurs ou la peau.", shampoing: "Selon ta fréquence de lavage, en massant le cuir chevelu.", soin: "Sur cheveux humides, sans rincer.", masque: "1 fois par semaine, 10 à 20 minutes.", apres: "À chaque lavage, sur les longueurs, puis rince.", cuirsoin: "Sur le cuir chevelu propre, raie par raie, en massant du bout des doigts. Arrête s'il pique ou démange.", gommagecuir: "1 fois par semaine au plus, avant le shampoing.", thermo: "Avant chaque passage de chaleur, sur cheveux humides ou secs.", gel: "Sous la douche, à l'eau tiède, puis rince bien." };
  // ---------------------------------------------------------------------------
  // IA · deux branchements possibles
  //  1. data-ai-endpoint="https://…" : ton serveur (Claude API) reçoit {input, json, images} et renvoie {text}
  //  2. sinon, dans un aperçu Claude, la capacité « sample » (l'IA du compte de la personne qui regarde)
  // Sans IA, tout fonctionne : scan par liste d'ingrédients, photo annotée à la main, réponses locales.
  // ---------------------------------------------------------------------------
  var AI = { mode: "none", images: false };
  function initAI(host) {
    var ep = host.getAttribute("data-ai-endpoint");
    if (ep) { AI.mode = "endpoint"; AI.ep = ep; AI.images = true; return Promise.resolve(true); }
    if (!window.claude || !window.claude.use) return Promise.resolve(false);
    return window.claude.use("sample").then(function (s) {
      if (!s) return false;
      AI.sample = s; AI.mode = "sample";
      return s.limits().then(function (l) { AI.images = !!(l && l.images); }, function () {}).then(function () { return true; });
    }, function () { return false; });
  }
  function shrink(file) {
    return new Promise(function (res, rej) {
      var img = new Image(), url = URL.createObjectURL(file);
      img.onload = function () {
        var k = Math.min(1, 1024 / Math.max(img.width, img.height)), c = document.createElement("canvas");
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
        res(c.toDataURL("image/jpeg", 0.85).split(",")[1]);
      };
      img.onerror = rej; img.src = url;
    });
  }
  function aiCall(input, opts, asJson) {
    opts = opts || {};
    if (AI.mode === "sample") return asJson ? AI.sample.json(input, opts) : AI.sample(input, opts).then(function (r) { return r.text; });
    if (AI.mode === "endpoint") {
      return Promise.all((opts.images || []).map(shrink)).then(function (imgs) {
        return fetch(AI.ep, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ input: input, json: !!asJson, images: imgs.map(function (d) { return { media_type: "image/jpeg", data: d }; }) }) });
      }).then(function (r) { if (!r.ok) throw { code: "upstream_error" }; return r.json(); }).then(function (r) {
        if (!asJson) { if (opts.onText) opts.onText({ text: r.text }); return r.text; }
        var t = r.text, s = t.indexOf("{"), s2 = t.indexOf("["), st = s2 > -1 && (s2 < s || s < 0) ? s2 : s;
        return JSON.parse(t.slice(st, Math.max(t.lastIndexOf("}"), t.lastIndexOf("]")) + 1));
      });
    }
    return Promise.reject({ code: "not_granted" });
  }
  var AI_ERR = { not_granted: "L'assistante n'est pas activée ici.", rate_limited: "Trop de demandes d'un coup : réessaie dans un moment.", refused: "Je ne peux pas répondre à cette demande.", image_rejected: "Cette photo n'a pas pu être lue : essaie une autre image.", invalid_json: "La réponse n'a pas pu être lue : réessaie.", upstream_error: "Connexion interrompue : réessaie." };

  var RULES = "Tu es l'assistante beauté de Sunsoari, concept-store français (filtres de douche Onsha et SHIFT, puis K-beauty, J-beauty et marques africaines). " +
    "Réponds en français, en tutoyant, avec un ton chaleureux, simple et concret, en 120 mots maximum, sans titre ni emoji. " +
    "Règles absolues : aucune allégation médicale, aucun diagnostic, aucune promesse de résultat ; si un symptôme dure, s'aggrave ou fait mal, oriente vers un ou une dermatologue, un pharmacien ou un médecin. " +
    "Grossesse ou allaitement : pas de rétinoïdes, d'acides forts ni d'huiles essentielles sans avis médical. Ne dis jamais qu'un filtre de douche adoucit l'eau, retire le calcaire ou soigne la peau. " +
    "Quand tu cites un produit, choisis uniquement dans le catalogue fourni et dis pourquoi en citant ses ingrédients. Si tu ne sais pas, dis-le. " +
    "Tu es aussi sa coach peau : si elle ne connaît pas son type de peau, pose-lui une ou deux questions simples (brillance en fin de journée, tiraillements après le nettoyage, réactions aux produits), puis explique ce que ça veut dire et comment s'en occuper. " +
    "Rappelle quand c'est utile qu'une peau grasse a aussi besoin d'hydratation, que la déshydratation est un état passager, et appuie-toi sur les recommandations des sociétés de dermatologie (Académie américaine de dermatologie, DermNet) sans inventer de chiffres ni de références.";

  // ---------------------------------------------------------------------------
  // Stockage local (navigateur). Les photos ne sont jamais enregistrées.
  // ---------------------------------------------------------------------------
  var KEY = "sunsoari-app-v3";
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(st) { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* stockage indisponible */ } }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function euro(n) { return n.toFixed(2).replace(".", ",") + " €"; }
  function iso(d) { return (d || new Date()).toISOString().slice(0, 10); }
  function addDays(s, n) { var d = new Date(s + "T12:00:00"); d.setDate(d.getDate() + n); return d; }
  function ymd(d) { return d.toISOString().slice(0, 10).replace(/-/g, ""); }
  function frDate(d) { return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }); }
  var DSHORT = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  // Tous les produits sous une même forme : Sunsoari (douche) + autres marques.
  function allProducts() {
    var own = Object.keys(P).map(function (k) { var p = P[k]; return { id: "s:" + k, key: k, own: true, brand: p.title.split(" · ")[0], name: p.title.split(" · ")[1] || p.title, zone: "douche", step: "douche", act: p.act || [], flags: (p.act || []).indexOf("teatree") > -1 ? ["allergenes"] : [], for: [], price: p.price, desc: p.pitch, img: PROD_PHOTO[k] ? photo(PROD_PHOTO[k]) : p.img }; });
    return own.concat(EXT.map(function (p) { return { id: "e:" + p.id, brand: p.brand, name: p.name, zone: p.zone, step: p.step, act: p.act, flags: p.act.indexOf("teatree") > -1 ? ["allergenes"] : [], for: p.for, avoid: p.avoid, needs: p.needs, night: p.night, rev: p.rev, founder: p.founder, origin: p.origin, madeIn: p.madeIn, trend: p.trend, desc: p.desc, url: p.url, affiliate: p.affiliate }; }));
  }
  function byId(id) { return allProducts().filter(function (p) { return p.id === id; })[0]; }

  // La routine révélée : Matin · Soir · Hebdo · Douche
  // Choisit le meilleur produit pour une étape : on écarte ce qui est déconseillé, puis on classe
  // par score de compatibilité, réponses correspondantes, origine préférée et ingrédients recherchés.
  function pickFor(zone, step, a, opts) {
    opts = opts || {};
    var tags = tagsOf(a), origins = a.origines || [];
    var list = allProducts().filter(function (p) { return !p.own && p.zone === zone && p.step === step && (opts.exclude || []).indexOf(p.id) < 0; }).map(function (p) {
      var bad = (p.avoid || []).some(function (x) { return tags.indexOf(x) > -1; }) || (tags.indexOf("acides") > -1 && p.act.some(function (x) { return ["aha", "bha", "pha"].indexOf(x) > -1; }));
      var match = (p.for || []).filter(function (x) { return tags.indexOf(x) > -1; }).length;
      var pref = (opts.prefer || []).filter(function (x) { return p.act.indexOf(x) > -1; }).length;
      var orig = origins.length && origins.indexOf("toutes") < 0 && (origins.indexOf(p.origin) > -1 || (origins.indexOf("Afrique") > -1 && ["Mali", "Ghana", "Nigeria", "Maroc", "Sénégal", "Afrique du Sud", "Kenya", "Côte d'Ivoire", "Tchad"].indexOf(p.origin) > -1)) ? 6 : 0;
      if (opts.morning && p.night) bad = true;
      if (p.needs && !p.needs.some(function (x) { return tags.indexOf(x) > -1; })) bad = true;
      // Cuir chevelu : le shampoing doit répondre à ce que la cliente a coché.
      if (zone === "cuir" && step === "shampoing" && !(p.for || []).some(function (x) { return (a.cuir || []).concat(hairTags(a)).indexOf(x) > -1; })) bad = true;
      // Squames épaisses ou grasses : d'abord les shampoings de pharmacie prévus pour ça.
      var hz = hairTags(a), need = hz.indexOf("cuirPso") > -1 ? "cuirPso" : hz.indexOf("cuirDS") > -1 ? "cuirDS" : null;
      if (zone === "cuir" && step === "shampoing" && need && (p.for || []).indexOf(need) < 0) bad = true;
      if (zone === "cuir" && step !== "shampoing" && !(p.for || []).some(function (x) { return tags.indexOf(x) > -1; })) bad = true;
      var deep = a.carnation === "foncee" || a.carnation === "tresfoncee" || a.carnation === "mate";
      var rev = p.rev || [], revB = (deep && (rev.indexOf("nocast") > -1 || rev.indexOf("fonce") > -1) ? 8 : 0) + (rev.indexOf("afro") > -1 && (a.texture === "crepus" || a.texture === "boucles") ? 8 : 0) + (rev.length ? 2 : 0);
      var kj = p.origin === "Corée" || p.origin === "Japon" ? 3 : 0;
      var afroAsia = kj + ((p.founder || ["Corée", "Japon", "Chine", "Mali", "Ghana", "Nigeria", "Maroc", "Sénégal", "Afrique du Sud", "Kenya", "Côte d'Ivoire", "Tchad"].indexOf(p.origin) > -1) ? 4 : 0);
      return { p: p, bad: bad, score: fitScore(p, a).total + match * 4 + pref * 8 + orig + (p.madeIn ? 2 : 0) + revB + afroAsia };
    }).filter(function (x) { return !x.bad; }).sort(function (x, y) { return y.score - x.score; });
    return list.length ? list[0].p : null;
  }

  function buildRoutine(a) {
    var r = recommend(a), mode = a.format || "equilibree", used = [];
    var concerns = (a.concerns || []).filter(function (c) { return c !== "aucune"; });
    var add = function (arr, zone, step, opts) { opts = opts || {}; opts.exclude = used; var p = pickFor(zone, step, a, opts); if (p) { used.push(p.id); arr.push({ step: step, id: p.id }); } };
    var morningActs = ["vitc", "niacinamide", "tranexamique", "centella", "hyaluronique"], nightActs = ["retinoides", "pdrn", "ceramides", "mucine", "panthenol", "niacinamide", "hyaluronique"];
    // Taches : on dose selon l'intensité. Niveau 1 = unifier ; dès le niveau 2, triangle complet (protéger, unifier, renouveler).
    var tn = concerns.indexOf("taches") > -1 || concerns.indexOf("marques") > -1 ? ({ t1: 1, t2: 2, t3: 3, t4: 2 })[a.tachesNiveau] || 1 : 0;
    var fragile = a.peau === "sensible" || a.grossesse === "oui" || has(a, "reactions", "acides");
    if (tn) morningActs = ["arbutine", "thiamidol", "tranexamique", "niacinamide", "vitc", "reglisse"].concat(morningActs);
    if (tn >= 3 && !fragile) nightActs = ["retinoides"].concat(nightActs);
    else if (tn >= 2) nightActs = ["azelaique", "arbutine", "tranexamique"].concat(nightActs);
    var matin = [], soir = [], hebdo = [];
    var makeup = a.routine === "deux" || a.routine === "soir";
    if (mode === "essentielle") {
      add(matin, "visage", "nettoyant"); add(matin, "visage", "hydratant"); add(matin, "visage", "spf");
      if (makeup) add(soir, "visage", "demaquillant");
      soir.push({ step: "nettoyant", id: matin[0] && matin[0].id }); if (concerns.length) add(soir, "visage", "serum", { prefer: nightActs });
      soir.push({ step: "hydratant", id: matin[1] && matin[1].id });
    } else {
      add(matin, "visage", "nettoyant"); add(matin, "visage", "tonique"); add(matin, "visage", "serum", { prefer: morningActs, morning: true });
      if (mode === "complete") add(matin, "visage", "essence");
      add(matin, "visage", "hydratant"); add(matin, "visage", "spf");
      add(soir, "visage", "demaquillant");
      soir.push({ step: "nettoyant", id: matin[0] && matin[0].id }); soir.push({ step: "tonique", id: matin[1] && matin[1].id });
      if (mode === "complete") soir.push({ step: "essence", id: (matin.filter(function (x) { return x.step === "essence"; })[0] || {}).id });
      add(soir, "visage", "serum", { prefer: nightActs });
      if (mode === "complete" || concerns.indexOf("rides") > -1 || concerns.indexOf("cernes") > -1) add(soir, "visage", "yeux");
      add(soir, "visage", "hydratant");
      if (mode === "complete") add(soir, "visage", "nuit");
    }
    matin = matin.filter(function (x) { return x.id; }); soir = soir.filter(function (x) { return x.id; });
    // Ordre d'application : essence avant sérum le matin
    var order = ["demaquillant", "nettoyant", "tonique", "essence", "serum", "yeux", "hydratant", "nuit", "spf"];
    var byOrder = function (x, y) { return order.indexOf(x.step) - order.indexOf(y.step); };
    matin.sort(byOrder); soir.sort(byOrder);
    if (concerns.indexOf("texture") > -1 || concerns.indexOf("imperfections") > -1 || mode === "complete" || (tn >= 2 && !fragile)) add(hebdo, "visage", "exfoliant");
    add(hebdo, "visage", "masquev");
    // Cheveux : une routine à part entière, du cuir chevelu aux pointes.
    var cheveux = [], ht = tagsOf(a), scalpIssue = (a.cuir || []).some(function (c) { return c !== "cuirOk"; }) || ["cuirDS", "cuirPso", "chute", "tempes"].some(function (x) { return ht.indexOf(x) > -1; });
    var nCh = cheveux.length;
    if (scalpIssue) add(cheveux, "cuir", "shampoing");
    if (cheveux.length === nCh) add(cheveux, "cheveux", "shampoing");
    add(cheveux, "cheveux", "apres");
    if (mode !== "essentielle" || a.texture === "crepus" || a.texture === "boucles") add(cheveux, "cheveux", "soin");
    if (ht.indexOf("chaleur") > -1) add(cheveux, "cheveux", "thermo");
    var calm = ht.indexOf("cuirPso") > -1 || ht.indexOf("cuirDS") > -1;
    if (!calm && (["chute", "tempes", "fins"].some(function (x) { return ht.indexOf(x) > -1; }) || has(a, "cuir", "cuirGras") || mode === "complete")) add(cheveux, "cuir", "cuirsoin");
    if (!calm && (has(a, "cuir", "cuirGras") || has(a, "cuir", "cuirPellicules")) && mode !== "essentielle") add(cheveux, "cuir", "gommagecuir");
    add(cheveux, "cheveux", "masque");
    add(hebdo, "corps", "gel"); add(hebdo, "corps", "corps"); if (mode === "complete") add(hebdo, "corps", "huile");
    return { matin: matin, soir: soir, hebdo: hebdo, cheveux: cheveux, mode: mode, tn: tn, fragile: fragile, enceinte: a.grossesse === "oui", dermato: a.tachesNiveau === "t4",
      douche: [{ step: "douche", id: "s:" + r.main }].concat(r.refills.map(function (k) { return { step: "recharge", id: "s:" + k }; })), reco: r };
  }

  // Repères de réputation (publics, pas des avis vérifiés Sunsoari).
  var REV_LABEL = { kr: "Best-seller en Corée", jp: "Classique au Japon", cn: "Marque phare en Chine", eu: "Référence en pharmacie", fonce: "Marque pensée pour les peaux noires et métissées", nocast: "Sans trace blanche sur peau foncée", afro: "Pensé pour les cheveux bouclés à crépus" };
  var REV_BY_ID = {
    roundlab: ["kr"], anua: ["kr"], snail: ["kr"], skin1004: ["kr"], torriden: ["kr"], laneige: ["kr"], illiyoon: ["kr"], aestura: ["kr"], soonjung: ["kr"], anuaoil: ["kr"], banila: ["kr"], bojglow: ["kr"], bojsun: ["kr", "nocast"],
    skin1004sun: ["kr", "nocast"], isntreesun: ["kr", "nocast"], roundlabsun: ["kr", "nocast"], miseenscene: ["kr"],
    dhc: ["jp"], softymo: ["jp"], hadalabo: ["jp"], curel: ["jp"], melano: ["jp"], biore: ["jp", "nocast"], tsubaki: ["jp"], fino: ["jp"],
    sensibio: ["eu"], toleriane: ["eu"], effaclarduo: ["eu"], cicalfate: ["eu"], lrpmelab3: ["eu"], uvmune: ["eu", "nocast"], eucerinurea: ["eu"], lipikar: ["eu"], atoderm: ["eu"], kelual: ["eu"], kloraneavoine: ["eu"],
    nuhanciam: ["fonce"], madeforhue: ["fonce"], hyperskin: ["fonce"], eadem: ["fonce"], bgsunscreen: ["fonce", "nocast"], bolden: ["fonce", "nocast"],
    medicube: ["kr"], drjart: ["kr"], innisfree: ["kr"], sulwhasoo: ["kr"], mixsoon: ["kr"], numbuzin3: ["kr"], purito: ["kr"], heimish: ["kr"], shiseidoanessa: ["jp", "nocast"], senka: ["jp"], minon: ["jp"], kikumasamune: ["jp"],
    winona: ["cn"], proya: ["cn"], chando: ["cn"], mielle: ["afro"], musoya: ["afro"], kalia: ["afro"], tropikalbliss: ["afro"], carolinab: ["afro"], adeba: ["afro"], nilotiqa: ["afro"], afrocenchix: ["afro"], adwoa: ["afro"], miellepom: ["afro"], camillerose: ["afro"], auntjackie: ["afro"], kinkycurly: ["afro"], tgin: ["afro"], thedoux: ["afro"], sheashampoo: ["afro"],
    drforhair: ["kr"], masilvolume: ["kr"], lador: ["kr"], moremo: ["kr"], unove: ["kr"], ichikami: ["jp"], andhoney: ["jp"], bawang: ["cn"], furterer: ["eu"], kloranemangue: ["eu"], anaphase: ["eu"], nodeds: ["eu"], kerium: ["eu"], kertyol: ["eu"], nodek: ["eu"], dercosamx: ["eu"], neoptide: ["eu"], sbmscalp: ["kr"], aromaticaroot: ["kr"], elizavecca: ["kr"], tsubakimask: ["jp"], finooil: ["jp"], finocond: ["jp"], andhoneytreat: ["jp"], andhoneyoil: ["jp"], kaminomoto: ["jp"], orbishm: ["jp"], curelbody: ["jp"], roundlabbody: ["kr"], cantu: ["afro"], sheamoisture: ["afro"], sheamasque: ["afro"], asiam: ["afro"], pattern: ["afro"], boucleme: ["afro"], loly: ["afro"], activilong: ["afro"]
  };
  EXT.forEach(function (p) {
    p.rev = REV_BY_ID[p.id] || [];
    // Les soins pensés pour cheveux texturés ne sont proposés qu'aux cheveux ondulés à crépus.
    if (p.rev.indexOf("afro") > -1 && !p.needs) p.needs = ["crepus", "boucles", "ondules"];
  });

  // Plan d'introduction : un nouveau produit par semaine, les actifs forts en dernier, d'abord 1 soir puis 2.
  var STRONG = ["retinoides", "aha", "bha", "pha", "vitc", "azelaique"];
  function isStrong(p) { return !!p && (p.act || []).some(function (x) { return STRONG.indexOf(x) > -1; }); }
  function introPlan(R) {
    var weeks = [], seen = {};
    var push = function (label, items, note) { items = items.filter(function (it) { if (!it || !it.id || seen[it.id]) return false; seen[it.id] = 1; return true; }); if (!items.length) return; weeks.push({ label: label, items: items, note: note || "" }); };
    var find = function (list, step) { return list.filter(function (x) { return x.step === step; })[0]; };
    var m = R.matin, so = R.soir, sm = find(m, "serum"), ss = find(so, "serum");
    push("Les bases", [find(m, "nettoyant"), find(m, "spf")], "La protection solaire d'abord : c'est le soin qui compte le plus.");
    push("Le démaquillage du soir", [find(so, "demaquillant")]);
    push("La lotion", [find(m, "tonique"), find(m, "essence")]);
    push("L'hydratation", [find(m, "hydratant"), find(so, "hydratant"), find(so, "yeux"), find(so, "nuit")]);
    if (sm && !isStrong(byId(sm.id))) push("Le sérum du matin", [sm]);
    if (ss && !isStrong(byId(ss.id))) push("Le sérum du soir", [ss]);
    if (sm && isStrong(byId(sm.id))) push("Le sérum actif du matin", [sm], "Un matin sur deux la première semaine, puis tous les matins si ta peau est à l'aise.");
    if (ss && isStrong(byId(ss.id))) { push("Ton actif du soir, 1 soir", [ss], "Un seul soir cette semaine."); weeks.push({ label: "Ton actif du soir, 2 soirs", items: [], note: "Passe à 2 soirs si tu n'as ni picotement qui dure ni rougeur. Jamais le même soir que l'exfoliant." }); }
    push("Les soins de la semaine", R.hebdo.filter(function (x) { return byId(x.id) && byId(x.id).zone === "visage"; }), "Exfoliant et masque visage, jamais le même soir qu'un actif.");
    return weeks;
  }
  // Semaine en cours (1 = première) depuis le début du plan.
  function planWeek(start) { return Math.max(1, Math.floor((Date.now() - start) / (7 * 864e5)) + 1); }
  // Calendrier du soir : un seul actif par soir, des soirs de réparation entre deux.
  function eveningCalendar(R, week, wk) {
    var ss = R.soir.filter(function (x) { return x.step === "serum"; })[0], strong = ss && isStrong(byId(ss.id));
    var activeAt = -1, exfo = R.hebdo.filter(function (x) { return x.step === "exfoliant"; })[0], mask = R.hebdo.filter(function (x) { return x.step === "masquev"; })[0], hebdoAt = -1;
    wk.forEach(function (w, i) { if (ss && w.items.some(function (it) { return it.id === ss.id; })) activeAt = i + 1; if (w.label === "Les soins de la semaine") hebdoAt = i + 1; });
    // 0 = dimanche … 6 = samedi
    var nights = !strong ? [] : week < activeAt ? [] : week === activeAt ? [2] : [2, 5];
    return [1, 2, 3, 4, 5, 6, 0].map(function (d) {
      var t = "Réparation : nettoyant et hydratant";
      if (ss && !strong && week >= activeAt) t = "Sérum " + byId(ss.id).name;
      if (nights.indexOf(d) > -1) t = "Actif : " + byId(ss.id).name;
      if (week >= hebdoAt && hebdoAt > 0) { if (exfo && d === 0) t = "Exfoliant : " + byId(exfo.id).name; if (mask && d === 3) t = "Masque : " + byId(mask.id).name; }
      return { d: d, t: t };
    });
  }

  // Recommandations « pour toi », par besoin, pour nourrir l'accueil et la boutique.
  function forYou(a) {
    var tags = tagsOf(a), groups = [];
    var concerns = (a.concerns || []).filter(function (c) { return c !== "aucune"; });
    concerns.forEach(function (c) {
      var l = allProducts().filter(function (p) { return !p.own && p.zone === "visage" && ((p.for || []).indexOf(c) > -1 || p.act.some(function (x) { return (ACT_GOALS[x] || []).indexOf(c) > -1; })); })
        .map(function (p) { return { p: p, s: fitScore(p, a).total }; }).filter(function (x) { return x.s >= 50; }).sort(function (x, y) { return y.s - x.s; }).slice(0, 6);
      if (l.length) groups.push({ title: "Pour " + (TAG_LABEL[c] === "taches" ? "tes taches" : "ton objectif : " + TAG_LABEL[c]), items: l });
    });
    var hair = allProducts().filter(function (p) { return !p.own && (p.zone === "cheveux" || p.zone === "cuir"); }).map(function (p) { return { p: p, s: fitScore(p, a).total }; }).sort(function (x, y) { return y.s - x.s; }).slice(0, 6);
    if (hair.length) groups.push({ title: "Pour tes cheveux " + (TAG_LABEL[a.texture] || "").replace("cheveux ", ""), items: hair });
    var body = allProducts().filter(function (p) { return !p.own && p.zone === "corps"; }).map(function (p) { return { p: p, s: fitScore(p, a).total }; }).sort(function (x, y) { return y.s - x.s; }).slice(0, 6);
    if (body.length) groups.push({ title: "Pour ton corps", items: body });
    var shift = ["shiftAroma", "shiftSoin", "shiftCaps", "pureWater"].map(function (k) { var p = byId("s:" + k); return { p: p, s: fitScore(p, a).total }; });
    groups.splice(1, 0, { title: "Ton rituel douche SHIFT", items: shift });
    var africa = allProducts().filter(function (p) { return p.madeIn; }).map(function (p) { return { p: p, s: fitScore(p, a).total }; }).sort(function (x, y) { return y.s - x.s; });
    groups.push({ title: "Fabriqué en Afrique, pour toi", items: africa });
    return groups;
  }

  function alternatives(p, a, n) {
    return allProducts().filter(function (x) { return x.id !== p.id && x.zone === p.zone && x.step === p.step; })
      .map(function (x) { return { p: x, s: fitScore(x, a).total }; }).sort(function (x, y) { return y.s - x.s; }).slice(0, n || 4);
  }

  // Lecture de codes-barres et QR codes : BarcodeDetector quand le navigateur l'a (Android),
  // sinon la bibliothèque ZXing, chargée seulement au premier scan (iPhone).
  var ZX_URL = "https://cdn.jsdelivr.net/npm/@zxing/library@0.21.3/umd/index.min.js";
  var CODE_FORMATS = ["ean_13", "ean_8", "upc_a", "upc_e", "qr_code", "code_128", "data_matrix"];
  var zxPromise = null;
  function loadZX() {
    if (window.ZXing) return Promise.resolve(window.ZXing);
    if (!zxPromise) zxPromise = new Promise(function (res, rej) {
      var sc = document.createElement("script"); sc.src = ZX_URL; sc.async = true;
      sc.onload = function () { window.ZXing ? res(window.ZXing) : rej(); };
      sc.onerror = function () { zxPromise = null; rej(); };
      document.head.appendChild(sc);
    });
    return zxPromise;
  }
  function nativeDetector() { try { return "BarcodeDetector" in window ? new window.BarcodeDetector({ formats: CODE_FORMATS }) : null; } catch (e) { return null; } }

  // ---------------------------------------------------------------------------
  // APPLICATION
  // ---------------------------------------------------------------------------
  function App(host) {
    this.host = host;
    this.shop = (host.getAttribute("data-shop") || "https://sunsoari.fr").replace(/\/$/, "");
    this.contact = host.getAttribute("data-contact") || this.shop + "/pages/contact";
    if (host.getAttribute("data-img-base")) IMG_BASE = host.getAttribute("data-img-base").replace(/\/?$/, "/");
    this.root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
    var s = this.state = load();
    ["answers", "refills", "journal", "checks", "steps"].forEach(function (k) { if (!s[k]) s[k] = {}; });
    ["shelf", "wish", "scans", "favs"].forEach(function (k) { if (!s[k]) s[k] = []; });
    this.widget = host.getAttribute("data-widget") || "";
    this.view = s.done ? "today" : "diag"; this.step = 0; this.photos = {}; this.zone = null;
    this.rtab = "matin"; this.ptab = "routines"; this.rsTab = "guides"; this.chat = []; this.busy = false;
    this.sheet = null; this.detail = null; this.scan = null; this.skin = null; this.query = "";
    var self = this;
    this.render();
    this.root.addEventListener("click", function (e) { self.onClick(e); });
    this.root.addEventListener("change", function (e) { self.onChange(e); });
    this.root.addEventListener("submit", function (e) { e.preventDefault(); self.onSubmit(e); });
    this.root.addEventListener("input", function (e) { if (e.target.dataset && e.target.dataset.finemail) { self.fin.email = e.target.value.trim(); var b = self.root.querySelector("[data-act='finsend']"); if (b) b.disabled = !(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(self.fin.email) && self.fin.ok); return; } if (e.target.dataset && e.target.dataset.voicetext) { self.voice.text = e.target.value.slice(0, 3000); var need = self.voice.text.trim().length > 15; if (need !== !!self.root.querySelector("[data-act='voicefill']") && !(self.voiceFilled && self.voiceFilled.length)) self.renderKeepFocus("voicetext"); return; } if (e.target.dataset && e.target.dataset.evo) { self.evoDraft[e.target.dataset.evo] = e.target.value; return; } if (e.target.dataset && e.target.dataset.field) { self.state.answers[e.target.dataset.field] = e.target.value.slice(0, 600); self.save(); return; } if (e.target.id === "q-search") { self.query = e.target.value; self.renderKeepFocus("q-search"); } });
    this.root.addEventListener("error", function (e) { if (e.target.tagName === "IMG" && !e.target.dataset.fallback) { e.target.dataset.fallback = "1"; e.target.src = PLACEHOLDER; } }, true);
    initAI(host).then(function () { self.render(); });
  }
  var A = App.prototype;
  A.url = function (k) { return this.shop + "/products/" + P[k].handle + "?utm_source=mon-rituel&utm_medium=app"; };
  A.cartUrl = function (k, scent) { var v = P[k].variants, id = v.all || v[scent] || v.hinoki || v[Object.keys(v)[0]]; return this.shop + "/cart/" + id + ":1?utm_source=mon-rituel&utm_medium=app"; };
  A.extUrl = function (p) { return p.url || "https://www.google.com/search?tbm=shop&q=" + encodeURIComponent(p.brand + " " + p.name); };
  A.save = function () { save(this.state); };
  A.emit = function (n, d) { try { this.host.dispatchEvent(new CustomEvent("sunsoari:" + n, { detail: d, bubbles: true, composed: true })); } catch (e) { /* ignoré */ } };
  A.renderKeepFocus = function (id) { this.render(); var el = this.root.getElementById ? this.root.getElementById(id) : null; if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); } };

  A.render = function () {
    var v = this.view, html = "<style>" + CSS + "</style><div class='app" + (this.host.hasAttribute("data-fullscreen") ? " full" : "") + "'>";
    if (this.widget === "favoris") { html += "<div class='body paper'>" + this.vCompte() + "</div>"; }
    else if (v === "diag") html += "<div class='body'>" + this.vDiag() + "</div>";
    else {
      html += "<div class='body paper'>" + ({ espace: this.vEspace, compte: this.vCompte, plus: this.vPlus, reveal: this.vReveal, today: this.vToday, produits: this.vProduits, scan: this.vScan, ressources: this.vRessources, assistant: this.vAssistant, peau: this.vPeau }[v] || this.vToday).call(this) + "</div>";
      html += this.nav();
    }
    if (this.detail) html += this.vDetail(this.detail);
    if (this.story) html += this.vStory();
    if (this.sheet && ING[this.sheet]) html += this.vSheet(this.sheet);
    if (this.cam) html += "<div class='camview' role='dialog' aria-label='Scanner un code'><video id='camvideo' playsinline muted autoplay></video><div class='camframe'></div><p>" + esc(this.cam.msg) + "</p><div class='camacts'><label class='btn ghost' for='codephoto2'>Prendre une photo du code</label><input id='codephoto2' type='file' accept='image/*' capture='environment' data-codephoto='1' hidden><button class='btn' data-act='camstop'>Fermer</button></div></div>";
    html += "</div>";
    this.root.innerHTML = html;
    if (this.cam && this.cam.stream) { var cv = this.root.querySelector("#camvideo"); if (cv) { cv.srcObject = this.cam.stream; this.camDetect(cv); } }
    var log = this.root.querySelector && this.root.querySelector(".chatlog"); if (log) log.scrollTop = log.scrollHeight;
  };

  A.nav = function () {
    var v = this.view, items = [["today", "Aujourd'hui", "sun"], ["produits", "Produits", "leaf"], ["scan", "Scan", "dots"], ["ressources", "Ressources", "sprout"], ["assistant", "Assistante", "heart"]];
    return "<nav class='bnav'>" + items.map(function (i) { return "<button data-view='" + i[0] + "' aria-current='" + (v === i[0] || ((v === "reveal" || v === "espace" || v === "compte") && i[0] === "today") || (v === "peau" && i[0] === "scan")) + "'>" + icon(i[2]) + "<span>" + i[1] + "</span></button>"; }).join("") + "</nav>";
  };

  // ---------- Onboarding : le diagnostic ----------
  A.visibleQuestions = function () { var a = this.state.answers; return QUESTIONS.filter(function (q) { return !(q.skipIf && q.skipIf(a)); }); };
  A.progressPct = function () {
    var a = this.state.answers, qs = this.visibleQuestions().filter(function (q) { return !q.type; });
    var n = qs.filter(function (q) { return q.multi ? (a[q.id] || []).length : a[q.id]; }).length;
    return { pct: Math.round(n / qs.length * 100), left: qs.length - n };
  };
  A.vDiag = function () {
    var qs = this.visibleQuestions(); if (this.step >= qs.length) this.step = qs.length - 1;
    var q = qs[this.step], a = this.state.answers, step = this.step;
    var segs = SECTIONS.map(function (name, i) {
      var inSec = qs.filter(function (x) { return x.sec === i; }), done = inSec.filter(function (x) { return qs.indexOf(x) < step; }).length;
      return "<span class='seg'><i style='width:" + (q.sec > i ? 100 : q.sec < i ? 0 : Math.max(6, Math.round(done / inSec.length * 100))) + "%'></i></span>";
    }).join("");
    var html = "<div class='qhead'><button class='back' data-act='prev' aria-label='Retour'" + (step === 0 ? " disabled" : "") + "><svg viewBox='0 0 24 24'><path d='M15 5l-7 7 7 7'/></svg></button><div class='segs'>" + segs + "</div></div><p class='kicker'>" + (q.kicker || SECTIONS[q.sec]) + "</p>";
    if (q.type === "info") return html + this.vInfo(q);
    if (q.type === "text") {
      var dict = this.dictating;
      html += "<div class='q'><h3>" + esc(q.title) + "</h3>" + (q.sub ? "<p class='sub'>" + esc(q.sub) + "</p>" : "") + "<div class='tfields'>" + q.fields.map(function (f) { var v = esc(a[f[0]] || ""); return "<label><span class='flab'>" + esc(f[1]) + (f[2] !== "number" ? "<button type='button' class='micsm" + (dict === f[0] ? " on" : "") + "' data-dictate='" + f[0] + "' aria-label='" + (dict === f[0] ? "Arrêter la dictée" : "Dicter") + "'>" + (dict === f[0] ? "■ Stop" : "🎤 Dicter") + "</button>" : "") + "</span>" + (f[2] === "area" ? "<textarea data-field='" + f[0] + "' rows='3' placeholder='" + esc(f[3]) + "'>" + v + "</textarea>" : "<input data-field='" + f[0] + "' type='" + f[2] + "' value='" + v + "' placeholder='" + esc(f[3]) + "'" + (f[2] === "number" ? " min='10' max='99' inputmode='numeric'" : "") + ">") + "</label>"; }).join("") + "</div>" + (this.dictMsg ? "<p class='why'>" + esc(this.dictMsg) + "</p>" : "") + "<p class='note'>Astuce : le micro 🎤 du clavier de ton téléphone permet aussi de dicter, dans n'importe quel champ.</p></div>";
      return html + "<div class='cta'><button class='btn big' data-act='next'>Continuer</button></div>";
    }
    if (q.type === "photo") return html + this.vPhotoStep(q);
    if (q.type === "capture") return html + this.vCapture(q);
    if (q.type === "voice") return html + this.vVoice(q);
    if (q.type === "fin") return html + this.vFin();
    var val = a[q.id];
    html += "<div class='q'><h3>" + esc(q.title) + "</h3>" + (q.sub ? "<p class='sub'>" + esc(q.sub) + "</p>" : "");
    if (q.link) html += "<a class='ext' href='" + q.link[1] + "' target='_blank' rel='noopener'>" + esc(q.link[0]) + " ↗</a>";
    html += "<div class='opts'>" + q.options.map(function (o) {
      var on = q.multi ? (val || []).indexOf(o[0]) > -1 : val === o[0];
      return "<button class='opt' data-q='" + q.id + "' data-v='" + esc(o[0]) + "' aria-pressed='" + on + "'><span class='ico'>" + icon(o[3]) + "</span><span class='lbl'>" + esc(o[1]) + (o[2] ? "<small>" + esc(o[2]) + "</small>" : "") + "</span><span class='" + (q.multi ? "chk" : "rad") + "'></span></button>";
    }).join("") + "</div></div>";
    var ready = q.multi ? (val || []).length > 0 : !!val;
    if (q.multi || step === qs.length - 1) html += "<div class='cta'><button class='btn big' data-act='next'" + (ready ? "" : " disabled") + ">" + (step === qs.length - 1 ? "Créer ma routine" : "Continuer") + "</button></div>";
    return html + "<p class='note'>Ce diagnostic repose sur ton ressenti. Il ne remplace pas l'avis d'un ou d'une professionnelle de santé.</p>";
  };
  A.skinResult = function (short) {
    var a = this.state.answers, sp = skinProfile(a);
    if (!sp) return "<p class='sub'>Réponds aux questions précédentes pour voir ton résultat.</p>";
    var I = SKIN_INFO[sp.type], label = I.t + (sp.deshy ? ", déshydratée" : "") + (sp.sensible ? " et sensible" : "");
    var W = SKIN_WHY[sp.type];
    if (short) return "<p class='kicker'>" + (a.prenom ? esc(a.prenom) + ", voici ta peau" : "Ton résultat") + "</p><h3>" + esc(label) + "</h3><p>" + esc(I.what) + "</p>" + (sp.type === "grasse" || sp.type === "mixte" ? "<div class='myth'><b>Idée reçue</b><p>« Une peau grasse n'a pas besoin de crème. » <strong>Faux.</strong> Le sébum et l'eau sont deux choses différentes : il faut une texture légère, pas l'absence de crème.</p></div>" : "") + "<p class='note'>Encore quelques questions sur ton corps, tes cheveux et tes envies. Toutes les explications et tes conseils t'attendent ensuite dans ton espace soin.</p>";
    var html = "<p class='kicker'>" + (a.prenom ? esc(a.prenom) + ", voici ta peau" : "Ton résultat") + "</p><h3>" + esc(label) + "</h3><p>" + esc(I.what) + "</p>";
    html += "<div class='whybox'><b>Pourquoi ta peau est comme ça</b><p>" + esc(W.why) + "</p></div>";
    html += "<div class='dodont'><div class='whybox do'><b>Ce qui t'aide</b><ul class='tipl'>" + I.tips.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></div><div class='whybox dont'><b>À éviter</b><ul class='tipl'>" + W.avoid.concat(sp.sensible ? ["Cumuler plusieurs actifs forts le même soir", "Les parfums et l'alcool asséchant"] : []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></div></div>";
    if (a.carnation === "foncee" || a.carnation === "tresfoncee" || a.carnation === "mate") html += "<div class='myth'><b>Peau mate à foncée</b><p>La moindre inflammation (bouton percé, irritation, gommage trop fort) peut laisser une marque brune qui dure des mois. La crème solaire chaque matin et la douceur sont tes meilleures alliées.</p></div>";
    if (a.spfHabit && a.spfHabit !== "tlj") html += "<div class='myth'><b>Ta priorité numéro un</b><p>Une crème solaire tous les matins, toute l'année, même par temps gris : les UVA traversent les nuages et les vitres. C'est le geste qui protège le plus ta peau, quel que soit son type.</p></div>";
    if (sp.type === "grasse" || sp.type === "mixte") html += "<div class='myth'><b>Idée reçue</b><p>« Une peau grasse n'a pas besoin de crème. » <strong>Faux.</strong> Le sébum (le gras) et l'eau sont deux choses différentes. Une peau grasse peut manquer d'eau, et une peau privée d'hydratation tiraille et peut devenir plus inconfortable. La bonne réponse : une texture légère, pas l'absence de crème.</p></div>";
    if (sp.deshy) html += "<div class='whybox'><b>Déshydratée : un état, pas un type</b><p>Ta peau manque d'eau en ce moment, même si elle brille. Signes : tiraillements, teint terne, petites ridules qui s'effacent quand tu hydrates. Eau tiède, nettoyant doux, un sérum à l'acide hyaluronique ou à la glycérine sur peau humide, puis une crème pour retenir l'eau. Ça s'améliore souvent en quelques semaines.</p></div>";
    if (sp.sensible) html += "<div class='whybox'><b>Sensible</b><p>Ta peau réagit vite. Moins de produits, sans parfum, un seul nouveau produit à la fois, testé 48 h sur la mâchoire. Dans tes recommandations, on évite au maximum les parfums, les huiles essentielles et les acides forts.</p></div>";
    var ex = [], sa = a.saisons || [], mv = a.modeVie || [];
    if (sa.indexOf("hiver") > -1) ex.push("L'hiver, passe à une crème un peu plus riche le soir.");
    if (sa.indexOf("ete") > -1) ex.push("L'été, allège : un gel-crème suffit souvent.");
    if (mv.indexOf("soleil") > -1) ex.push("Souvent dehors : remets ta crème solaire toutes les 2 heures, un stick est pratique.");
    if (mv.indexOf("sport") > -1) ex.push("Après le sport : rince ton visage dès que possible, la sueur et le sébum mélangés peuvent favoriser les boutons.");
    if (mv.indexOf("ville") > -1) ex.push("En ville : un vrai nettoyage le soir, avec un démaquillant si tu portes de la crème solaire ou du maquillage.");
    if (mv.indexOf("sommeil") > -1) ex.push("Le manque de sommeil et le stress se voient sur la peau : une routine du soir simple et régulière aide à la garder confortable.");
    if (ex.length) html += "<div class='whybox'><b>Petites astuces pour ton quotidien</b><ul class='tipl'>" + ex.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></div>";
    if ((a.antecedents || []).some(function (x) { return x !== "aucun"; })) html += "<p class='care'>Tu as un antécédent suivi par un médecin : ses conseils passent avant les nôtres. On garde ta routine douce et sans actif irritant.</p>";
    html += "<button class='qchip' data-ask='" + esc("J'ai une " + label.toLowerCase() + ". Comment adapter ma routine ?") + "'>Poser une question à l'assistante sur ma peau</button>";
    var wa = this.host.getAttribute("data-whatsapp");
    if (wa) html += this.sendBox(label);
    if (false) html += "<div class='whybox'><b>Ton rituel personnalisé par Sunsoari</b><p>Envoie ton résultat et 3 photos (face, profil gauche, profil droit, à la lumière du jour, sans maquillage ni filtre) : on te prépare ton espace soin, avec ta routine jour par jour et ton suivi.</p><a class='btn' href='https://wa.me/" + esc(wa.replace(/\D/g, "").replace(/^0/, "33")) + "?text=" + encodeURIComponent("Bonjour Sunsoari, voici mon test de peau : " + label + ". Carnation : " + (a.carnation || "non précisée") + ". Saisons : " + (a.saisons || []).join(", ") + ". Quotidien : " + (a.modeVie || []).join(", ") + ". Crème solaire : " + (a.spfHabit || "non précisé") + ". J'ajoute mes 3 photos.") + "' target='_blank' rel='noopener'>Envoyer sur WhatsApp</a><small class='sub'>Tu choisis toi-même ce que tu envoies. Les photos ne partent jamais automatiquement.</small></div>";
    html += "<details class='srcs'><summary>Sources</summary><ul>" + SKIN_SOURCES.map(function (x) { return "<li><a href='" + x[1] + "' target='_blank' rel='noopener'>" + esc(x[0]) + "</a></li>"; }).join("") + "</ul><small>Résultat indicatif, basé sur tes observations. Il ne remplace pas l'avis d'un ou d'une dermatologue.</small></details>";
    return html;
  };
  // Résumé complet du questionnaire, à envoyer à Sunsoari.
  A.summaryText = function () {
    var a = this.state.answers, sp = skinProfile(a), lab = function (id) { var q = QUESTIONS.filter(function (x) { return x.id === id; })[0], v = a[id]; if (!q || v == null || v === "") return "non répondu"; var f = function (x) { var o = (q.options || []).filter(function (o) { return o[0] === x; })[0]; return o ? o[1] : x; }; return Array.isArray(v) ? v.map(f).join(", ") : f(v); };
    var L = ["QUESTIONNAIRE PEAU SUNSOARI", "Prénom : " + (a.prenom || "non précisé"), "Âge : " + (a.age || "non précisé"), "Rythme de vie : " + (a.rythme || "non précisé"), "",
      "Résultat indicatif : " + (sp ? SKIN_INFO[sp.type].t + (sp.deshy ? ", déshydratée" : "") + (sp.sensible ? ", sensible" : "") : "non calculé"), "",
      "1 h après nettoyage : " + lab("pt_apres"), "Fin de journée : " + lab("pt_soir"), "Pores : " + lab("pt_pores"), "Zones rêches : " + lab("pt_peaux"), "Crème hydratante : " + lab("pt_creme"),
      "Brille et tiraille : " + lab("pt_deshy"), "Réactions aux produits : " + lab("pt_reac"), "Soleil, froid, vacances : " + lab("pt_reac2"), "Carnation : " + lab("carnation"), "",
      "À améliorer : " + lab("concerns"), "Produits visage : " + (a.produitsVisage || "non précisé"), "Produits corps : " + (a.produitsCorps || "non précisé"), "Crème solaire : " + lab("spfHabit"),
      "Saisons : " + lab("saisons"), "Antécédents : " + lab("antecedents"), "En ce moment : " + lab("grossesse"), "Quotidien : " + lab("modeVie"), "Notes : " + (a.notes || "aucune"), "",
      "J'envoie aussi mes 3 photos : face, profil gauche, profil droit."];
    return L.join("\n");
  };
  A.sendBox = function (label) {
    var wa = (this.host.getAttribute("data-whatsapp") || "").replace(/\D/g, "").replace(/^0/, "33"), ig = this.host.getAttribute("data-instagram") || "sunsoari", t = this.summaryText();
    return "<div class='whybox'><b>Ton rituel personnalisé par Sunsoari</b><p>Pour ton rituel complet, avec les bons produits, ta routine jour par jour et ton suivi, envoie tes réponses et 3 photos (face, profil gauche, profil droit, à la lumière du jour, sans maquillage ni filtre).</p><ol class='guide'><li>Touche « Envoyer sur WhatsApp » : tes réponses sont déjà écrites.</li><li>Si le message est vide, reviens ici et touche « Copier mes réponses ».</li><li>Ajoute tes 3 photos dans la conversation, puis envoie.</li></ol><div class='acts'>" + (wa ? "<a class='btn' href='https://wa.me/" + esc(wa) + "?text=" + encodeURIComponent(t) + "' target='_blank' rel='noopener'>Envoyer sur WhatsApp</a>" : "") + "<button class='btn ghost' data-act='copysum'>Copier mes réponses</button></div>" + (this.copyMsg ? "<p class='why'>" + esc(this.copyMsg) + "</p>" : "") + "<p class='note'>Tu préfères Instagram ? Écris-nous sur <a href='https://www.instagram.com/" + esc(ig) + "/' target='_blank' rel='noopener'>@" + esc(ig) + "</a> en collant tes réponses. Ou passe par le <a href='" + esc(this.contact) + "' target='_blank' rel='noopener'>formulaire de contact</a>. Tu choisis ce que tu envoies : rien ne part automatiquement.</p></div>";
  };
  A.vInfo = function (q) {
    var p = this.progressPct(), a = this.state.answers;
    var html = "<div class='info'>";
    if (q.kind === "test") return html + "<h3>Découvrons ton type de peau</h3><p class='sub'>Beaucoup de personnes ne le connaissent pas, ou se trompent : une peau qui brille peut aussi manquer d'eau. Quelques questions sur ce que tu observes au quotidien, et on t'explique comment en prendre soin.</p><p class='alt-t'>Le test du visage nu, pour des réponses justes</p><ol class='guide'><li>Lave ton visage avec un nettoyant doux, sèche en tamponnant.</li><li>N'applique rien : ni crème, ni maquillage.</li><li>Attends une heure sans toucher ton visage.</li><li>Observe-toi à la lumière du jour : où ça brille, où ça tire, tes pores.</li><li>En option, appuie un mouchoir fin sur le front, le nez, le menton et les joues : une trace grasse montre où ta peau produit du sébum.</li></ol><p class='sub'>Tu connais bien ta peau ? Réponds de mémoire, selon ce que tu vis le plus souvent.</p><details class='types'><summary>Les 4 types de peau en bref</summary>" + ["normale", "seche", "mixte", "grasse"].map(function (k) { return "<p><b>" + SKIN_INFO[k].t + "</b> · " + esc(SKIN_WHY[k].why) + "</p>"; }).join("") + "<p>Une peau peut aussi être <b>sensible</b> ou <b>déshydratée</b>, quel que soit son type : on le regarde aussi.</p></details></div><div class='cta'><button class='btn big' data-act='next'>C'est parti</button></div>";
    if (q.kind === "peau") return html + this.skinResult(true) + "</div><div class='cta'><button class='btn big' data-act='next'>Continuer</button></div>";
    if (q.kind === "eau") html += "<h3>Le savais-tu ?</h3><ul class='facts'><li>" + icon("drop") + "<span>En France, l'eau du robinet est potable et très contrôlée.</span></li><li>" + icon("dots") + "<span>Sa teneur en calcaire varie beaucoup d'une région à l'autre.</span></li><li>" + icon("shower") + "<span>Le chlore sert à la désinfecter. Certains filtres de douche sont conçus pour en réduire une partie, selon leurs fabricants.</span></li></ul>" + this.ring(p.pct, true);
    else {
      var chips = [a.peau && TAG_LABEL[a.peau]].concat((a.concerns || []).map(function (c) { return TAG_LABEL[c]; })).filter(Boolean);
      html += this.ring(p.pct) + "<h3 class='center'>Ta routine se précise</h3><p class='sub center'>Encore " + p.left + " questions sur ton corps, tes cheveux et tes envies.</p><div class='chips'>" + chips.map(function (c) { return "<span>" + esc(c) + "</span>"; }).join("") + "</div>";
    }
    return html + "</div><div class='cta'><button class='btn big' data-act='next'>Continuer</button></div>";
  };
  A.ring = function (pct, small) {
    var C = 2 * Math.PI * 52;
    return "<div class='ringwrap" + (small ? " small" : "") + "'><svg class='ring' viewBox='0 0 120 120' aria-hidden='true'><circle cx='60' cy='60' r='52' class='rt'/><circle cx='60' cy='60' r='52' class='rv' stroke-dasharray='" + (C * pct / 100).toFixed(1) + " " + C.toFixed(1) + "' transform='rotate(-90 60 60)'/></svg><div class='ringtxt'><b>" + pct + " %</b><small>de ton profil</small></div></div>";
  };

  // Étape photo du diagnostic : l'IA propose des observations, la cliente valide.
  A.vPhotoStep = function (q) {
    var cfg = PHOTO[q.target], marks = this.state.answers[q.id] || {}, img = this.photos[q.target], self = this;
    var html = "<div class='q'><h3>" + esc(cfg.title) + "</h3><p class='sub'>" + esc(cfg.sub) + (AI.images ? " L'assistante peut lire ta photo et te proposer des observations, que tu valides." : "") + "</p></div>";
    html += this.mirror(q.target, marks, img);
    html += "<div class='photoacts'><label class='btn ghost' for='cam-" + q.target + "'>" + (img ? "Reprendre la photo" : "Prendre ou choisir une photo") + "</label><input id='cam-" + q.target + "' type='file' accept='image/*' capture='" + (q.target === "visage" ? "user" : "environment") + "' data-photo='" + q.target + "' hidden>";
    if (img && AI.images) html += "<button class='btn' data-act='aiphoto' data-target='" + q.target + "' data-pq='" + q.id + "'" + (this.busy ? " disabled" : "") + ">" + (this.busy ? "Lecture en cours…" : "Analyser avec l'assistante") + "</button>";
    html += "</div>";
    if (this.aiMsg) html += "<p class='why'>" + esc(this.aiMsg) + "</p>";
    if (this.zone) html += this.obsPicker(q.target, q.id, marks);
    html += "<p class='note'>Ta photo n'est jamais enregistrée." + (AI.mode !== "none" ? " Si tu demandes l'analyse, elle est envoyée une fois à l'assistante, puis oubliée." : "") + " Les observations sont cosmétiques : ce n'est pas un examen médical.</p>";
    return html + "<div class='cta'><button class='btn big' data-act='next'>" + (Object.keys(marks).length ? "Continuer" : "Passer cette étape") + "</button></div>";
  };
  A.mirror = function (target, marks, img) {
    var cfg = PHOTO[target], self = this;
    var html = "<div class='mirror" + (img ? " has" : "") + "'>" + (img ? "<img src='" + img + "' alt='Ta photo'>" : "<div class='silh'>" + icon(target === "visage" ? "heart" : "curly") + "<span>Pas de photo ? Touche directement les zones.</span></div>");
    cfg.zones.forEach(function (z) { var l = marks[z[0]] || [], n = l.length; html += "<button class='zone" + (self.zone === z[0] ? " on" : "") + (n ? " marked" : "") + "' style='left:" + z[2] + "%;top:" + z[3] + "%' data-zone='" + z[0] + "'>" + esc(z[1]) + (n ? " <span class='dots'>" + l.map(function (o) { return "<i class='sdot' style='background:" + (SIGN_COLOR[o] || "#fff") + "'></i>"; }).join("") + "</span>" : "") + "</button>"; });
    return html + "</div>";
  };
  A.obsPicker = function (target, pq, marks) {
    var cfg = PHOTO[target], self = this, zl = cfg.zones.filter(function (z) { return z[0] === self.zone; })[0];
    return "<div class='obs'><p><b>" + esc(zl[1]) + "</b> : qu'est-ce que tu remarques ?</p><div class='chipset'>" + cfg.obs.map(function (o) { return "<button class='chip' data-obs='" + o[0] + "' data-pq='" + pq + "' aria-pressed='" + ((marks[self.zone] || []).indexOf(o[0]) > -1) + "'>" + esc(o[1]) + "</button>"; }).join("") + "</div></div>";
  };
  A.aiPhoto = function (target, pq) {
    var self = this, cfg = PHOTO[target], file = this.photoFiles && this.photoFiles[target];
    if (!file) return;
    this.busy = true; this.aiMsg = "Lecture de ta photo…"; this.render();
    var prompt = "Voici une photo " + (target === "visage" ? "de visage" : "de cuir chevelu") + " prise par une cliente pour choisir des cosmétiques. Décris uniquement des signes cosmétiques VISIBLES, sans diagnostic médical, sans deviner l'âge, l'origine ou l'identité. " +
      "Zones possibles : " + cfg.zones.map(function (z) { return z[0]; }).join(", ") + ". Signes possibles : " + cfg.obs.map(function (o) { return o[0]; }).join(", ") + ". " +
      "Si la lumière ou la netteté ne permettent pas de juger, dis-le. Si tu vois une lésion inhabituelle, conseille simplement de montrer la zone à un ou une dermatologue. " +
      "Réponds uniquement en JSON : {\"qualite\":\"bonne|moyenne|insuffisante\",\"marks\":{\"zone\":[\"signe\"]},\"message\":\"une phrase en français, tutoiement, bienveillante\"}";
    aiCall(prompt, { images: [file], modelTier: "default" }, true).then(function (r) {
      var marks = {}, okZ = cfg.zones.map(function (z) { return z[0]; }), okO = cfg.obs.map(function (o) { return o[0]; });
      Object.keys((r && r.marks) || {}).forEach(function (z) { if (okZ.indexOf(z) > -1) { var l = (r.marks[z] || []).filter(function (o) { return okO.indexOf(o) > -1; }); if (l.length) marks[z] = l; } });
      self.state.answers[pq] = marks; self.save();
      self.aiMsg = (r && r.message ? r.message + " " : "") + "Vérifie les zones et corrige-les si besoin.";
    }, function (e) { self.aiMsg = AI_ERR[e && e.code] || AI_ERR.upstream_error; }).then(function () { self.busy = false; self.render(); });
  };

  // ---------- « Ta nouvelle routine est prête » ----------
  A.vReveal = function () {
    var a = this.state.answers, R = buildRoutine(a), self = this, tabs = [["matin", "Matin", "sun"], ["soir", "Soir", "moon"], ["hebdo", "Hebdo", "sprout"], ["cheveux", "Cheveux", "wave"], ["douche", "Douche", "shower"]];
    var html = "<figure class='amb short'><img src='" + photo(AMB.reveal) + "' alt='' loading='lazy'></figure><div class='revealhead'><p class='kicker'>Ta nouvelle routine est prête</p><h3>" + esc(this.goalLabel()) + "</h3></div><div class='seg-tabs'>" + tabs.map(function (t) { return "<button data-rtab='" + t[0] + "' aria-pressed='" + (self.rtab === t[0]) + "'>" + icon(t[2]) + t[1] + "</button>"; }).join("") + "</div>";
    html += "<div class='modes'><span>Format</span>" + [["essentielle", "Essentielle"], ["equilibree", "Équilibrée"], ["complete", "Complète"]].map(function (m) { return "<button data-mode='" + m[0] + "' aria-pressed='" + (R.mode === m[0]) + "'>" + m[1] + "</button>"; }).join("") + "</div>";
    if (this.rtab === "matin" || this.rtab === "soir") html += "<p class='sub' style='margin:0 0 12px'>" + R[this.rtab].length + " étapes · " + ({ essentielle: "le strict nécessaire", equilibree: "les bases et un soin ciblé", complete: "la routine complète, façon K-beauty" })[R.mode] + "</p>";
    var list = R[this.rtab];
    if (R.tn && (this.rtab === "matin" || this.rtab === "soir")) html += this.triangle(R);
    if (this.rtab === "douche" && R.reco.why.length) html += "<p class='why big'>" + esc(R.reco.why.join(" ")) + "</p>";
    if (!list.length) html += "<p class='empty'>Rien à ajouter ici pour ton profil : ta routine reste courte, c'est voulu.</p>";
    list.forEach(function (it, i) { html += self.routineCard(byId(it.id), it.step, i + 1, R.reco.scent); });
    if (this.rtab === "douche") html += this.shiftCollection(R.reco) + this.compareBox(R.reco);
    html += "<div class='cta row'><button class='btn ghost' data-act='addroutine'>Tout ajouter à mon étagère</button><button class='btn' data-view='today'>Continuer</button></div>";
    return html;
  };
  // Toute la gamme SHIFT, avec coloris et senteurs.
  // Le triangle anti-taches : protéger, unifier, renouveler.
  var UNIFY = ["arbutine", "thiamidol", "kojique", "reglisse", "tranexamique", "niacinamide", "vitc", "azelaique"], RENEW = ["retinoides", "aha", "bha", "pha", "azelaique"];
  A.triangle = function (R) {
    var all = R.matin.concat(R.soir, R.hebdo, R.cheveux).map(function (x) { return byId(x.id); }).filter(Boolean);
    var find = function (acts, step) { return all.filter(function (p) { return p.zone === "visage" && (step ? p.step === step : ["serum", "exfoliant", "nuit", "tonique", "essence"].indexOf(p.step) > -1 && (p.act || []).some(function (x) { return acts.indexOf(x) > -1; })); })[0]; };
    var c = [["Protéger", "Crème solaire chaque matin", find(null, "spf")], ["Unifier", "Un actif qui freine la mélanine", find(UNIFY)], ["Renouveler", "Rétinoïde ou exfoliant doux", find(RENEW)]];
    var need = R.tn >= 2 ? 3 : 2;
    return "<div class='tri'><b>Ton triangle anti-taches</b><div>" + c.slice(0, need).map(function (x) { return "<p class='" + (x[2] ? "on" : "") + "'><span>" + (x[2] ? "✓" : "·") + "</span><b>" + x[0] + "</b><small>" + esc(x[2] ? x[2].brand + " " + x[2].name : x[1]) + "</small></p>"; }).join("") + "</div><small>" + (R.dermato ? "Une tache très marquée ou qui change se montre d'abord à un ou une dermatologue. En attendant, ta routine reste douce. " : "") + (need === 3 && !c[2][2] && R.enceinte ? "Pendant la grossesse ou l'allaitement, pas de rétinoïde ni d'exfoliant fort : on garde le renouvellement pour plus tard. Demande l'avis de ton médecin ou de ta sage-femme avant tout nouvel actif." : need === 3 && !c[2][2] ? "Ta peau est fragile en ce moment : on garde le renouvellement pour plus tard, idéalement avec l'avis d'un ou une dermatologue." : need === 3 ? "Pour des marques installées, ta routine coche les trois angles. Un produit peut en couvrir deux." : "Pour des marques légères, protéger et unifier suffisent.") + " Attention à ne pas trop exfolier : c'est l'irritation qui crée de nouvelles taches.</small></div>";
  };
  A.shiftCollection = function (r) {
    var self = this, keys = ["shiftAroma", "shiftSoin", "shiftCaps", "pureWater"].filter(function (k) { return r.main !== k && r.refills.indexOf(k) < 0; });
    var html = "<div class='shiftbox'><img class='shiftph' src='" + photo(AMB.shift) + "' alt='Pommeaux SHIFT dans une salle de bain' loading='lazy'><span class='tag'>Collection SHIFT</span><h4>Le rituel douche coréen SHIFT</h4><p>Filtration Pure Water + capsules soin & aromathérapie à la vitamine C, aloe vera, coco, karité et tréhalose." + (r.shiftOk ? "" : " Ses capsules contiennent des huiles essentielles : pour ton profil, on te conseille plutôt Onsha, mais voici la gamme si tu veux la découvrir.") + "</p>";
    html += keys.map(function (k, i) { return self.routineCard(byId("s:" + k), k === "pureWater" || k === "shiftCaps" ? "recharge" : "douche", "S" + (i + 1), r.scent); }).join("");
    return html + "</div>";
  };
  A.goalLabel = function () { var c = (this.state.answers.concerns || []).filter(function (x) { return x !== "aucune"; }); return c.length ? "Objectif : " + c.map(function (x) { return TAG_LABEL[x]; }).join(", ") : "Objectif : une peau confortable"; };
  A.scoreBadge = function (s) { return "<span class='fit " + bandClass(s.total) + "'>" + s.total + " % adapté</span>"; };
  A.routineCard = function (p, step, n, scent) {
    if (!p) return "";
    var a = this.state.answers, s = fitScore(p, a), self = this, alts = p.own ? [] : alternatives(p, a, 4);
    var html = "<article class='rcard'><div class='rtop'><span class='num'>" + n + "</span>" + (p.img ? "<img class='pthumb' src='" + esc(p.img) + "' alt='" + esc(p.name) + "' loading='lazy'>" : "<span class='ptile' aria-hidden='true'>" + esc(p.brand.replace(/[^A-Za-z\u00C0-\u00FF ]/g, "").split(" ").filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join("").toUpperCase()) + "</span>") + "<div class='rinfo'><small>" + esc(STEP_LABEL[step] || (step === "douche" ? "Ton rituel douche" : step === "recharge" ? "Recharge" : step)) + "</small><b>" + esc(p.name) + "</b><span>" + esc(p.brand) + (p.price ? " · " + euro(p.price) : "") + (p.origin ? " · " + esc(p.origin) : "") + "</span><div class='badges'>" + this.scoreBadge(s) + (p.madeIn ? "<span class='made'>Fabriqué " + esc(p.madeIn) + "</span>" : "") + (p.trend ? "<span class='made trend'>Tendance 2026</span>" : "") + (p.rev || []).map(function (r) { return "<span class='made rev'>" + esc(REV_LABEL[r]) + "</span>"; }).join("") + (p.founder ? "<span class='made fnd'>" + esc(p.founder) + "</span>" : "") + "</div></div><button class='heart' data-wish='" + p.id + "' aria-pressed='" + (this.state.wish.indexOf(p.id) > -1) + "' aria-label='Ajouter à mes souhaits'>♡</button></div>";
    html += "<div class='whybox'><b>Pourquoi on l'a choisi</b><p>" + esc(this.whyFor(p, s)) + "</p>" + this.actChips(p.act) + "<div class='qchips'>" + this.questionsFor(p).map(function (q) { return "<button class='qchip' data-ask='" + esc(q) + "' data-pid='" + p.id + "'>" + esc(q) + "</button>"; }).join("") + "</div></div>";
    if (p.own && P[p.key].colors) html += "<p class='alt-t'>Choisis ton coloris</p><div class='chipset'>" + P[p.key].colors.map(function (c) { return "<a class='chip' href='" + self.shop + "/cart/" + c[1] + ":1?utm_source=mon-rituel&utm_medium=app' target='_top' data-add='" + p.id + "'>" + c[0] + "</a>"; }).join("") + "</div>";
    if (p.own && P[p.key].scents) html += "<p class='alt-t'>Choisis ta senteur</p><div class='chipset'>" + P[p.key].scents.map(function (c) { return "<a class='chip' href='" + self.shop + "/cart/" + P[p.key].variants[c[0]] + ":1?utm_source=mon-rituel&utm_medium=app' target='_top' data-add='" + p.id + "' aria-pressed='" + (c[0] === scent) + "'>" + c[1] + "</a>"; }).join("") + "</div>";
    html += "<div class='acts'>" + (p.own ? "<a class='btn' href='" + this.cartUrl(p.key, scent) + "' target='_top' data-add='" + p.id + "'>Ajouter au panier · " + euro(p.price) + "</a>" : "<a class='btn' href='" + esc(this.extUrl(p)) + "' target='_blank' rel='noopener' data-ext='" + p.id + "'>Où l'acheter ↗</a>") + "<button class='btn ghost' data-detail='" + p.id + "'>Détails</button></div>";
    if (alts.length) html += "<p class='alt-t'>Autres options pour toi</p><div class='carousel'>" + alts.map(function (x) { return "<button class='mini' data-detail='" + x.p.id + "'><b>" + esc(x.p.name) + "</b><small>" + esc(x.p.brand) + " · " + esc(x.p.origin || "") + "</small><span class='fit " + bandClass(x.s) + "'>" + x.s + " % adapté</span></button>"; }).join("") + "</div>";
    return html + "</article>";
  };
  A.whyFor = function (p, s) {
    var a = this.state.answers, good = s.notes.filter(function (n) { return n[0] === "good"; }).map(function (n) { return n[1]; });
    var main = p.desc + " ";
    if (good.length) main += "Pour toi : " + good.slice(0, 2).join(" ") + " ";
    var w = s.notes.filter(function (n) { return n[0] === "warn"; });
    if (w.length) main += "À savoir : " + w[0][1];
    if (p.own && p.key.indexOf("shift") === 0) main += " Les capsules contiennent des huiles essentielles, dont le tea tree.";
    return main.trim();
  };
  A.questionsFor = function (p) {
    var q = ["À quelle fréquence l'utiliser ?"];
    if (this.state.answers.peau === "sensible" || (p.act || []).indexOf("teatree") > -1) q.push("Est-ce adapté aux peaux sensibles ?");
    q.push("Pourquoi celui-ci plutôt qu'un autre ?");
    return q;
  };
  A.actChips = function (ids) { return "<div class='acts-ing'>" + (ids || []).filter(function (i) { return ING[i]; }).map(function (i) { return "<button class='ingchip' data-ing='" + i + "'>" + esc(ING[i].n) + "</button>"; }).join("") + "</div>"; };
  A.compareBox = function (r) {
    var col = function (f, on) { return "<div class='cmp" + (on ? " on" : "") + "'><b>" + f.name + (on ? " · pour toi" : "") + "</b><ul>" + f.pts.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul><small>" + esc(f.care) + "</small></div>"; };
    var sh = r.main.indexOf("shift") === 0;
    return "<details class='compare' open><summary>SHIFT ou Onsha : quelle différence ?</summary><div class='cmpgrid'>" + col(SHOWER_FACTS.shift, sh) + col(SHOWER_FACTS.onsha, !sh) + "</div></details>";
  };

  // ---------- Aujourd'hui ----------
  A.vToday = function () {
    var s = this.state, a = s.answers, today = iso(), self = this, R = buildRoutine(a);
    var html = "<div class='todayhead'><h3>Aujourd'hui</h3><span class='hacts'><button class='pluspill' data-view='plus'>Sunsoari+</button><button class='acctbtn' data-view='compte' aria-label='Mon compte et mes favoris'>" + icon("heart") + "</button></span></div>";
    html += "<figure class='amb low'><img src='" + photo(AMB.today) + "' alt='' loading='lazy'><figcaption><small>Ton moment à toi</small><b>" + esc(this.goalLabel()) + "</b></figcaption></figure>";
    if (s.done) html += "<button class='reco-card esp' data-view='espace'><b>Mon espace soin" + (a.prenom ? " · " + esc(a.prenom) : "") + "</b><span>Routine à cocher, planner, évolution, semaine, solaire, produits, diagnostic</span></button>";
    html += "<div class='week'>";
    for (var i = -3; i <= 3; i++) {
      var d = addDays(today, i), k = iso(d), c = s.checks[k] || {}, done = (c.matin || []).length + (c.soir || []).length > 0;
      html += "<span class='day" + (i === 0 ? " now" : "") + "'><small>" + DSHORT[d.getDay()] + "</small><b>" + (done ? "✓" : d.getDate()) + "</b></span>";
    }
    html += "</div>";
    var first = [["diag", "Faire mon diagnostic", true], ["scan", "Scanner un premier produit", s.scans.length > 0], ["peau", "Scanner mon visage", !!s.steps.peau], ["shelf", "Ajouter ma routine à mon étagère", s.shelf.length > 0]];
    html += "<p class='sect'>Premiers pas</p>" + first.map(function (f) { return "<button class='task" + (f[2] ? " done" : "") + "' data-first='" + f[0] + "'><span class='tick'>" + (f[2] ? "✓" : "") + "</span>" + esc(f[1]) + "</button>"; }).join("");
    var start = s.planStart || s.doneAt || Date.now(), wk = introPlan(R), cw = planWeek(start), intro = {};
    wk.forEach(function (w, i) { w.items.forEach(function (it) { intro[it.id] = i + 1; }); });
    html += "<p class='sect'>Mon plan d'introduction</p><div class='intro'><p>Un nouveau produit par semaine : si quelque chose irrite, tu sais tout de suite lequel. Teste chaque nouveauté 48 h sur la mâchoire.</p><ol>" + wk.map(function (w, i) {
      var n = i + 1, st = n < cw ? "past" : n === cw ? "now" : "";
      return "<li class='" + st + "'><span class='wn'>" + (n < cw ? "✓" : "S" + n) + "</span><span><b>" + esc(w.label) + "</b>" + (w.items.length ? "<small>" + w.items.map(function (it) { var p = byId(it.id); return esc(p ? p.brand + " " + p.name : ""); }).join(" · ") + "</small>" : "") + (w.note && n >= cw ? "<em>" + esc(w.note) + "</em>" : "") + "</span></li>";
    }).join("") + "</ol><button class='btn link' data-act='planreset'>Recommencer le plan à partir d'aujourd'hui</button></div>";
    var cal = eveningCalendar(R, cw, wk), dnow = new Date().getDay();
    html += "<p class='sect'>Mes soirs de la semaine</p><div class='evecal'>" + cal.map(function (c) { return "<p class='" + (c.d === dnow ? "now" : "") + "'><b>" + DSHORT[c.d] + "</b><span>" + esc(c.t) + "</span></p>"; }).join("") + "</div>";
    html += "<p class='sect'>Plan du jour</p>";
    [["matin", "Routine du matin", R.matin], ["soir", "Routine du soir", R.soir]].forEach(function (blk) {
      var c = (s.checks[today] || {})[blk[0]] || [];
      html += "<div class='plan'><b>" + blk[1] + "</b>" + (blk[2].length ? blk[2].map(function (it) { var p = byId(it.id), on = c.indexOf(it.step) > -1; var later = (intro[it.id] || 1) > cw; if (later) return "<p class='pstep later'><span class='tick'></span><span>" + esc(STEP_LABEL[it.step] || it.step) + " · <small>à partir de la semaine " + intro[it.id] + "</small></span></p>"; return "<button class='pstep' data-check='" + blk[0] + "|" + it.step + "' aria-pressed='" + on + "'><span class='tick'>" + (on ? "✓" : "") + "</span><span>" + esc(STEP_LABEL[it.step] || it.step) + " · <small>" + esc(p ? p.name : "") + "</small></span></button>"; }).join("") : "<p class='empty'>Un nettoyage doux suffit.</p>") + "</div>";
    });
    html += "<p class='sect'>Journal de peau</p><div class='mood'><p>Comment ta peau se sent-elle aujourd'hui ?</p><div>" + [["1", "Mauvais", "☹"], ["2", "Bof", "🙁"], ["3", "Ça va", "🙂"], ["4", "Bien", "😊"], ["5", "Génial", "😄"]].map(function (m) { return "<button data-mood='" + m[0] + "' aria-pressed='" + (s.journal[today] === m[0]) + "'><span>" + m[2] + "</span><small>" + m[1] + "</small></button>"; }).join("") + "</div></div>";
    var tips = insights(a);
    if (tips.length) html += "<p class='sect'>Mes conseils personnalisés</p><div class='advice'>" + tips.map(function (t) { return "<details><summary>" + esc(t[0]) + "</summary><p>" + esc(t[1]) + "</p></details>"; }).join("") + "</div>";
    html += "<details class='compare'><summary>Ce que tu peux attendre, et quand</summary><div class='delays'>" + [["Semaines 2 à 4", "Une peau plus confortable, moins de réactions"], ["Semaines 6 à 10", "Une petite poussée est possible quand les actifs arrivent : elle doit se calmer"], ["Mois 3 à 4", "Un grain de peau plus régulier"], ["Mois 4 à 6", "Des marques qui s'estompent, avec la protection solaire chaque jour"]].map(function (x) { return "<p><b>" + x[0] + "</b><span>" + x[1] + "</span></p>"; }).join("") + "</div><p class='note'>Repères généraux : chaque peau va à son rythme. Brûlure, rougeur qui dure, démangeaisons, plaques ou peau qui pèle : arrête le dernier produit ajouté et demande conseil à un ou une dermatologue.</p></details>";
    html += this.refillsBox(R.reco);
    html += forYou(a).slice(0, 4).map(function (g) { return self.reccarousel(g); }).join("");
    html += "<button class='reco-card' data-view='reveal'><b>Recommandé</b><span>Ta routine Matin · Soir · Hebdo · Douche</span></button>";
    html += "<p class='sect'>Demander à l'assistante</p><div class='qgrid'>" + ["Quels produits ne jamais mélanger ?", "Qu'est-ce que la niacinamide ?", "Karité ou céramides pour ma peau sèche ?", "SHIFT ou Onsha pour moi ?"].map(function (q) { return "<button class='qchip' data-ask='" + esc(q) + "'>" + esc(q) + "</button>"; }).join("") + "</div>";
    return html;
  };
  A.refillsBox = function (r) {
    var self = this, keys = r.refills.map(function (k) { return k === "filtreSans" ? "filtreThermal" : k; }).filter(function (k) { return REFILLS[k]; });
    if (!keys.length) return "";
    var html = "<p class='sect'>Mes recharges</p>";
    keys.forEach(function (k) {
      var info = REFILLS[k], st = self.state.refills[k] || {}, start = st.start || "", days = +(st.days || info.days);
      html += "<div class='refill'><div class='row'><b>" + esc(info.label) + "</b><small>" + esc(info.hint) + "</small></div><div class='fields'><label>Installée le<input type='date' data-refill='" + k + "' data-f='start' value='" + start + "' max='" + iso() + "'></label><label>Tous les (jours)<input type='number' min='1' max='365' data-refill='" + k + "' data-f='days' value='" + days + "'></label></div>";
      if (start) {
        var next = addDays(start, days), left = Math.ceil((next - new Date()) / 864e5), pct = Math.max(0, Math.min(100, Math.round(100 - left / days * 100)));
        var g = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent("Changer mon " + info.label.toLowerCase() + " · Sunsoari") + "&dates=" + ymd(next) + "/" + ymd(addDays(iso(next), 1)) + "&details=" + encodeURIComponent(self.url(k));
        html += "<div class='bar" + (left < 0 ? " late" : "") + "'><i style='width:" + pct + "%'></i></div><span>" + (left > 1 ? "Dans " + left + " jours, " + frDate(next) : left >= 0 ? "Très bientôt : " + frDate(next) : "En retard de " + -left + " jours") + "</span><div class='acts'><a class='btn ghost' href='" + g + "' target='_blank' rel='noopener'>Google Agenda</a><a class='btn' href='" + self.url(k) + "' target='_blank' rel='noopener'>Racheter</a></div>";
      }
      html += "</div>";
    });
    return html;
  };

  // ---------- Vérifier l'état de ma peau ----------
  var SIGN_COLOR = { brillance: "#c9853f", secheresse: "#7d8f76", rougeurs: "#c0553f", imperfections: "#9b5d9e", taches: "#8a5526", texture: "#2f6f7e" };
  // ---------- Sunsoari+ : abonnement ----------
  // data-checkout-url="https://…" : page de paiement Stripe (reçoit ?plan=mensuel|annuel&method=…).
  var PLANS = { mensuel: { label: "Mensuel", price: "4,90 €", per: "par mois", note: "Sans engagement" }, annuel: { label: "Annuel", price: "39 €", per: "par an", note: "Soit 3,25 € par mois · −33 %" } };
  var PAY = [["applepay", "Apple Pay", "Paiement en un geste sur iPhone, iPad et Mac"], ["carte", "Carte bancaire", "CB, Visa, Mastercard"], ["paypal", "PayPal", "Avec ton compte PayPal"], ["klarna", "Klarna", "Paiement fractionné, avec l'abonnement annuel"]];
  A.vPlus = function () {
    var self = this, plan = this.plan || "annuel", pay = this.pay || "applepay";
    if (pay === "klarna" && plan === "mensuel") pay = "applepay";
    var html = "<figure class='amb short'><img src='" + photo(AMB.plus) + "' alt='' loading='lazy'></figure><div class='plushead'><span class='tag'>Sunsoari+</span><h3>Va plus loin dans ton rituel</h3><p>7 jours d'essai gratuit, puis " + PLANS[plan].price + " " + PLANS[plan].per + ".</p></div>";
    html += "<ul class='perks'>" + ["Scans de produits illimités", "Analyse photo du visage et du cuir chevelu", "Suivi de ton évolution dans le temps", "Assistante beauté illimitée", "Nouveau diagnostic à chaque saison", "Alertes météo peau : UV, humidité, pollution", "Guides et stories premium", "−10 % sur sunsoari.fr, SHIFT compris"].map(function (x) { return "<li>" + icon("heart") + "<span>" + esc(x) + "</span></li>"; }).join("") + "</ul>";
    html += "<div class='plans'>" + Object.keys(PLANS).map(function (k) { var P2 = PLANS[k]; return "<button class='plan2' data-plan='" + k + "' aria-pressed='" + (plan === k) + "'>" + (k === "annuel" ? "<span class='best'>Meilleure offre</span>" : "") + "<b>" + P2.label + "</b><span class='pr'>" + P2.price + " <small>" + P2.per + "</small></span><small>" + P2.note + "</small></button>"; }).join("") + "</div>";
    html += "<p class='alt-t'>Moyen de paiement</p><div class='paylist'>" + PAY.map(function (m) { var off = m[0] === "klarna" && plan === "mensuel"; return "<button class='pay' data-pay='" + m[0] + "' aria-pressed='" + (pay === m[0]) + "'" + (off ? " disabled" : "") + "><b>" + m[1] + "</b><small>" + esc(off ? "Disponible avec l'abonnement annuel" : m[2]) + "</small><span class='rad'></span></button>"; }).join("") + "</div>";
    var co = this.host.getAttribute("data-checkout-url");
    html += co ? "<a class='btn big' href='" + esc(co) + (co.indexOf("?") > -1 ? "&" : "?") + "plan=" + plan + "&method=" + pay + "' target='_top'>Commencer mon essai gratuit</a>" : "<button class='btn big' data-act='plusdemo'>Commencer mon essai gratuit</button>";
    if (this.plusMsg) html += "<p class='why'>" + esc(this.plusMsg) + "</p>";
    html += "<p class='note'>Toujours gratuit : diagnostic, routine, planner, journal de peau et 5 scans par mois.<br>Sans engagement : résiliation en 3 clics depuis ton compte. Rappel 2 jours avant la fin de l'essai. Prix TTC. Droit de rétractation de 14 jours.</p>";
    return html;
  };

  A.vPeau = function () {
    var self = this, all = this.state.answers.photoVisage || {}, f = this.skinFilter || "all", log = this.state.skinLog || [];
    var marks = {}; Object.keys(all).forEach(function (z) { var l = f === "all" ? all[z] : all[z].filter(function (o) { return o === f; }); if (l.length) marks[z] = l; });
    var html = "<div class='q'><h3>Scanner mon visage</h3><p class='sub'>Lumière du jour, visage sans maquillage, cheveux attachés. L'assistante repère des signes visibles, tu valides.</p></div>";
    html += "<div class='chipset'>" + [["all", "Tout"]].concat(PHOTO.visage.obs).map(function (o) { return "<button class='chip' data-sf='" + o[0] + "' aria-pressed='" + (f === o[0]) + "'>" + (o[0] !== "all" ? "<i class='sdot' style='background:" + SIGN_COLOR[o[0]] + "'></i>" : "") + esc(o[1]) + "</button>"; }).join("") + "</div>";
    html += this.mirror("visage", marks, this.photos.visage) + "<div class='photoacts'><label class='btn ghost' for='cam-v2'>" + (this.photos.visage ? "Reprendre la photo" : "Prendre ou choisir une photo") + "</label><input id='cam-v2' type='file' accept='image/*' capture='user' data-photo='visage' hidden>";
    if (this.photos.visage && AI.images) html += "<button class='btn' data-act='aiphoto' data-target='visage' data-pq='photoVisage'" + (this.busy ? " disabled" : "") + ">" + (this.busy ? "Lecture en cours…" : "Analyser avec l'assistante") + "</button>";
    html += "</div>" + (this.aiMsg ? "<p class='why'>" + esc(this.aiMsg) + "</p>" : "") + (this.zone ? this.obsPicker("visage", "photoVisage", all) : "");
    var zones = Object.keys(all);
    if (zones.length) html += "<div class='whybox'><b>Analyse de ta peau</b>" + zones.map(function (z) { var zl = PHOTO.visage.zones.filter(function (x) { return x[0] === z; })[0]; return "<p class='zrow'><span>" + esc(zl ? zl[1] : z) + "</span>" + all[z].map(function (o) { var ol = PHOTO.visage.obs.filter(function (x) { return x[0] === o; })[0]; return "<em style='border-color:" + SIGN_COLOR[o] + "'>" + esc(ol ? ol[1] : o) + "</em>"; }).join("") + "</p>"; }).join("") + "</div>";
    html += "<label class='toggle'><input type='checkbox' data-keepthumb='1'" + (this.state.keepThumb ? " checked" : "") + "> Garder une miniature de ma photo sur mon téléphone pour suivre mon évolution</label>";
    html += "<div class='cta'><button class='btn big' data-act='peaudone'>Enregistrer et mettre à jour ma routine</button></div>";
    if (log.length) {
      html += "<p class='sect'>Mon suivi</p><div class='list'>" + log.slice(0, 12).map(function (e, i) {
        var prev = log[i + 1], st = !prev ? ["Premier scan", "b-mid"] : e.n < prev.n ? ["Moins de signes notés", "b-hi"] : e.n > prev.n ? ["Plus de signes notés", "b-lo"] : ["Pas de changement noté", "b-mid"];
        return "<div class='logrow'>" + (e.thumb ? "<img src='" + e.thumb + "' alt=''>" : "<i class='nothumb'>" + icon("heart") + "</i>") + "<span class='lgt'><b>" + new Date(e.at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }) + "</b><small>Objectif : " + esc(e.goal) + " · " + e.n + " signe" + (e.n > 1 ? "s" : "") + " noté" + (e.n > 1 ? "s" : "") + "</small><em class='fit " + st[1] + "'>" + st[0] + "</em></span><button class='btn link' data-dellog='" + i + "' aria-label='Supprimer ce scan'>×</button></div>";
      }).join("") + "</div><p class='note'>Ce suivi compare tes propres observations d'un scan à l'autre. La lumière et l'angle de la photo changent beaucoup le résultat.</p>";
    }
    return html + "<p class='note'>Les photos ne quittent pas ton téléphone, sauf si tu demandes l'analyse : elle est alors envoyée une fois à l'assistante, puis oubliée. Observations cosmétiques, pas d'examen médical : une tache qui change, saigne ou démange se montre à un ou une dermatologue.</p>";
  };
  A.makeThumb = function () {
    var f = this.photoFiles && this.photoFiles.visage;
    if (!f) return Promise.resolve("");
    return new Promise(function (res) {
      var img = new Image(), url = URL.createObjectURL(f);
      img.onload = function () { var k = 160 / Math.max(img.width, img.height), c = document.createElement("canvas"); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k); c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url); res(c.toDataURL("image/jpeg", 0.7)); };
      img.onerror = function () { res(""); }; img.src = url;
    });
  };

  // ---------- Produits : recherche, trousse, collections ----------
  A.vProduits = function () {
    var s = this.state, self = this, a = s.answers, q = this.query.trim().toLowerCase();
    var html = "<div class='todayhead'><h3>Produits</h3></div><input id='q-search' class='search' placeholder='Rechercher une marque, un produit, un ingrédient' value='" + esc(this.query) + "' autocomplete='off'>";
    if (q) {
      var res = allProducts().filter(function (p) { return (p.brand + " " + p.name + " " + (p.act || []).map(function (x) { return ING[x] ? ING[x].n : ""; }).join(" ") + " " + (p.origin || "")).toLowerCase().indexOf(q) > -1; });
      return html + "<div class='list'>" + (res.length ? res.map(function (p) { return self.rowProduct(p); }).join("") : "<p class='empty'>Aucun produit trouvé. Essaie de le scanner : on lira sa liste d'ingrédients.</p><button class='btn' data-view='scan'>Scanner un produit</button>") + "</div>";
    }
    var tabs = [["routines", "Routines"], ["etagere", "Étagère"], ["souhaits", "Souhaits"], ["scans", "Scans"]];
    html += "<div class='seg-tabs'>" + tabs.map(function (t) { return "<button data-ptab='" + t[0] + "' aria-pressed='" + (self.ptab === t[0]) + "'>" + t[1] + "</button>"; }).join("") + "</div>";
    if (this.ptab === "routines") html += "<button class='reco-card' data-view='reveal'><b>Ma routine Sunsoari</b><span>Créée " + (s.doneAt ? "le " + new Date(s.doneAt).toLocaleDateString("fr-FR") : "après ton diagnostic") + " · Matin, Soir, Hebdo, Douche</span></button><button class='btn link' data-act='restart'>Refaire mon diagnostic</button>";
    else {
      var ids = this.ptab === "etagere" ? s.shelf : this.ptab === "souhaits" ? s.wish : s.scans.map(function (x) { return x.id; });
      if (!ids.length) html += "<p class='empty'>" + { etagere: "Ajoute ici les produits que tu utilises : on vérifie qu'ils vont bien ensemble.", souhaits: "Touche ♡ sur un produit pour le garder ici.", scans: "Aucun scan pour l'instant." }[this.ptab] + "</p><button class='btn ghost' data-view='scan'>Scanner un produit</button>";
      else html += "<div class='list'>" + ids.map(function (id) { var p = byId(id) || (s.scans.filter(function (x) { return x.id === id; })[0] || {}).p; return p ? self.rowProduct(p) : ""; }).join("") + "</div>";
      if (this.ptab === "etagere" && s.shelf.length > 1) html += this.shelfCheck();
    }
    html += "<p class='sect'>Pour toi</p>" + forYou(a).map(function (g) { return self.reccarousel(g); }).join("");
    html += "<p class='sect'>Sélections</p>" + this.collection("Les trésors d'Afrique", "Karité, argan, savon noir : des marques fabriquées sur place.", allProducts().filter(function (p) { return p.madeIn; })) + this.collection("Apaiser à la coréenne", "Centella, heartleaf, céramides : les incontournables des peaux sensibles.", allProducts().filter(function (p) { return (p.act || []).some(function (x) { return ["centella", "heartleaf", "ceramides"].indexOf(x) > -1; }); })) + this.collection("Le rituel douche", "Filtration et capsules de soin, chez Sunsoari.", allProducts().filter(function (p) { return p.own && ["shiftAroma", "shiftSoin", "shiftCaps", "pureWater", "starterHome", "premierHome"].indexOf(p.key) > -1; }));
    return html;
  };
  A.reccarousel = function (g) {
    return "<div class='coll'><b>" + esc(g.title) + "</b><div class='carousel'>" + g.items.map(function (x) { return "<button class='mini' data-detail='" + x.p.id + "'>" + (x.p.madeIn ? "<span class='made'>Fabriqué " + esc(x.p.madeIn) + "</span>" : "") + "<b>" + esc(x.p.name) + "</b><small>" + esc(x.p.brand) + (x.p.price ? " · " + euro(x.p.price) : x.p.origin ? " · " + esc(x.p.origin) : "") + "</small><span class='fit " + bandClass(x.s) + "'>" + x.s + " % adapté</span></button>"; }).join("") + "</div></div>";
  };
  A.rowProduct = function (p) {
    var s = fitScore(p, this.state.answers);
    return "<button class='prow' data-detail='" + p.id + "'><span><b>" + esc(p.name) + "</b><small>" + esc(p.brand) + (p.origin ? " · " + esc(p.origin) : "") + (p.own ? " · Sunsoari" : "") + "</small></span>" + this.scoreBadge(s) + "</button>";
  };
  A.collection = function (t, d, list) {
    var self = this;
    return "<div class='coll'><b>" + esc(t) + "</b><p>" + esc(d) + "</p><div class='carousel'>" + list.slice(0, 6).map(function (p) { var s = fitScore(p, self.state.answers).total; return "<button class='mini' data-detail='" + p.id + "'><b>" + esc(p.name) + "</b><small>" + esc(p.brand) + "</small><span class='fit " + bandClass(s) + "'>" + s + " % adapté</span></button>"; }).join("") + "</div></div>";
  };
  // Vérifie les associations délicates dans l'étagère.
  A.shelfCheck = function () {
    var acts = []; this.state.shelf.forEach(function (id) { var p = byId(id); if (p) acts = acts.concat(p.act); });
    var has2 = function (x) { return acts.indexOf(x) > -1; }, msg = [];
    if (has2("retinoides") && (has2("aha") || has2("bha"))) msg.push("Rétinoïde et acides exfoliants : utilise-les des soirs différents.");
    if (has2("vitc") && (has2("aha") || has2("bha"))) msg.push("Vitamine C et acides : alterne-les pour limiter les picotements.");
    if ((has2("retinoides") || has2("aha") || has2("bha") || has2("vitc")) && !has2("spf")) msg.push("Tu as des actifs qui sensibilisent au soleil : ajoute une protection solaire le matin.");
    return "<div class='whybox'><b>Mes produits vont-ils bien ensemble ?</b><p>" + esc(msg.length ? msg.join(" ") : "Rien à signaler : tes produits peuvent s'utiliser ensemble.") + "</p></div>";
  };

  // ---------- Scan ----------
  A.vScan = function () {
    var r = this.scan, html = "<div class='todayhead'><h3>Scanner un produit</h3></div>";
    if (r && r.result) return html + this.vScanResult(r);
    html += "<p class='sub'>Découvre si un cosmétique te convient : on lit sa liste d'ingrédients et on la compare à ton profil.</p>";
    html += "<button class='scanhero' data-act='camscan'>" + icon("straight") + "<span><b>Scanner un code-barres ou un QR code</b><small>Vise l'emballage avec la caméra</small></span></button>";
    html += "<div class='scanmodes'>";
    html += "<label class='smode' for='scanphoto'>" + icon("dots") + "<b>Photo du produit</b><small>" + (AI.images ? "Face avant et liste d'ingrédients" : "Disponible avec l'assistante") + "</small></label><input id='scanphoto' type='file' accept='image/*' capture='environment' data-scanphoto='1' hidden" + (AI.images ? "" : " disabled") + ">";
    html += "<button class='smode' data-act='scanpaste'>" + icon("leaf") + "<b>Coller les ingrédients</b><small>Copie la liste INCI depuis un site</small></button>";
    html += "<button class='smode' data-act='scanbar'>" + icon("straight") + "<b>Taper le code</b><small>Les chiffres sous le code-barres</small></button></div>";
    if (r && r.mode === "paste") html += "<form class='scanform' data-form='paste'><label for='inci'>Liste d'ingrédients (INCI)</label><textarea id='inci' rows='5' placeholder='Aqua, Glycerin, Niacinamide, …'>" + esc(r.text || "") + "</textarea><label for='pname'>Nom du produit (facultatif)</label><input id='pname' value='" + esc(r.name || "") + "'><button class='btn big'>Analyser</button></form>";
    if (r && r.link) html += "<div class='whybox'><b>QR code lu</b><p>Ce code mène vers <b>" + esc(r.link.host) + "</b>.</p><a class='btn' href='" + esc(r.link.href) + "' target='_blank' rel='noopener'>Ouvrir le lien ↗</a></div>";
    if (r && r.text) html += "<div class='whybox'><b>Code lu</b><p>" + esc(r.text) + "</p></div>";
    if (r && r.mode === "bar") html += "<form class='scanform' data-form='bar'><label for='ean'>Numéro du code-barres</label><input id='ean' inputmode='numeric' placeholder='8809…' value='" + esc(r.ean || "") + "'><button class='btn big'>Rechercher</button></form>";
    if (this.busy) html += "<p class='why'>Lecture en cours…</p>";
    if (r && r.error) html += "<p class='care'>" + esc(r.error) + "</p>";
    var n = this.state.scans.length;
    html += "<p class='note'>" + (n ? n + " produit" + (n > 1 ? "s" : "") + " scanné" + (n > 1 ? "s" : "") + ". " : "") + "Scans illimités et gratuits. Les photos ne sont jamais enregistrées.</p>";
    return html;
  };
  A.vScanResult = function (r) {
    var p = r.result, s = fitScore(p, this.state.answers), self = this, C = 2 * Math.PI * 52;
    var html = "<div class='scanres'><p class='kicker'>" + esc(p.brand || "Produit scanné") + "</p><h3>" + esc(p.name || "Ton produit") + "</h3>";
    html += "<div class='ringwrap'><svg class='ring' viewBox='0 0 120 120'><circle cx='60' cy='60' r='52' class='rt'/><circle cx='60' cy='60' r='52' class='rv " + bandClass(s.total) + "' stroke-dasharray='" + (C * s.total / 100).toFixed(1) + " " + C.toFixed(1) + "' transform='rotate(-90 60 60)'/></svg><div class='ringtxt'><b>" + s.total + " %</b><small>" + band(s.total) + " pour toi</small></div></div>";
    html += "<div class='subscores'>" + [["Tolérance", s.tol], ["Tes objectifs", s.obj], ["Ton type", s.type]].map(function (x) { return "<span><b>" + x[1] + "</b><small>" + x[0] + "</small></span>"; }).join("") + "</div>";
    html += "<div class='scale'>" + ["0-34", "35-49", "50-69", "70-94", "95-100"].map(function (x) { return "<i>" + x + "</i>"; }).join("") + "</div>";
    html += "<div class='whybox'><b>Ce qu'on a trouvé</b>" + (s.notes.length ? "<ul class='notes'>" + s.notes.map(function (n) { return "<li class='" + n[0] + "'>" + esc(n[1]) + "</li>"; }).join("") + "</ul>" : "<p>Aucun ingrédient particulier à signaler pour ton profil.</p>") + this.actChips(p.act) + (p.flags.length ? "<p class='flags'>" + p.flags.map(function (f) { var F = FLAGS.filter(function (x) { return x.k === f; })[0]; return "<span title='" + esc(F.why) + "'>" + esc(F.label) + "</span>"; }).join("") + "</p>" : "") + "</div>";
    if (!p.inci) html += "<p class='care'>On n'a pas pu lire la liste d'ingrédients : le score repose sur peu d'informations. Photographie le dos du produit ou colle sa liste INCI.</p>";
    var alts = allProducts().filter(function (x) { return !x.own && (!p.step || x.step === p.step); }).map(function (x) { return { p: x, s: fitScore(x, self.state.answers).total }; }).filter(function (x) { return x.s > s.total; }).sort(function (x, y) { return y.s - x.s; }).slice(0, 4);
    if (alts.length) html += "<p class='alt-t'>Alternatives mieux adaptées</p><div class='carousel'>" + alts.map(function (x) { return "<button class='mini' data-detail='" + x.p.id + "'><b>" + esc(x.p.name) + "</b><small>" + esc(x.p.brand) + "</small><span class='fit " + bandClass(x.s) + "'>" + x.s + " % adapté</span></button>"; }).join("") + "</div>";
    html += "<div class='acts'><button class='btn' data-act='scanshelf'>Ajouter à mon étagère</button><button class='btn ghost' data-ask='Que penses-tu de " + esc(p.name || "ce produit") + " pour ma peau ?' data-scanctx='1'>Demander à l'assistante</button><button class='btn link' data-act='scannew'>Nouveau scan</button></div>";
    return html + "<p class='note'>Score calculé à partir de tes réponses et des ingrédients repérés. Ce n'est pas une évaluation médicale ni une garantie de tolérance : fais toujours un test sur une petite zone.</p></div>";
  };
  A.finishScan = function (brand, name, inci, step) {
    var parsed = parseInci(inci), id = "x:" + Date.now();
    var p = { id: id, brand: brand || "", name: name || "Produit scanné", zone: /shampo|hair|cheveu/i.test(name + " " + step) ? "cheveux" : /body|corps/i.test(name + " " + step) ? "corps" : "visage", step: step || "", act: parsed.acts, flags: parsed.flags, for: [], inci: !!(inci && inci.length > 20), desc: "" };
    this.scan = { result: p };
    this.state.scans.unshift({ id: id, p: p, at: Date.now() }); this.state.scans = this.state.scans.slice(0, 30); this.save();
    this.emit("scan", { name: p.name, acts: p.act });
  };
  A.scanPhoto = function (file) {
    var self = this; this.busy = true; this.scan = { mode: "photo" }; this.render();
    var prompt = "Tu lis la photo d'un produit cosmétique. Recopie fidèlement ce qui est lisible, n'invente rien. Réponds uniquement en JSON : {\"brand\":\"\",\"name\":\"\",\"step\":\"nettoyant|tonique|serum|hydratant|spf|masque|exfoliant|shampoing|soin|corps|huile|autre\",\"inci\":\"liste d'ingrédients telle qu'imprimée, ou chaîne vide si elle n'est pas visible\"}";
    aiCall(prompt, { images: [file], modelTier: "default" }, true).then(function (r) {
      r = r || {}; self.finishScan(String(r.brand || ""), String(r.name || ""), String(r.inci || ""), String(r.step || ""));
    }, function (e) { self.scan = { error: AI_ERR[e && e.code] || AI_ERR.upstream_error }; }).then(function () { self.busy = false; self.render(); });
  };
  A.camScan = function () {
    var self = this;
    this.scan = null; this.cam = { msg: "Vise le code-barres ou le QR code, bien à plat et éclairé." }; this.render();
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { this.cam.msg = "La caméra n'est pas disponible ici. Prends une photo du code à la place."; return this.render(); }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false }).then(function (stream) {
      if (!self.cam) { stream.getTracks().forEach(function (t) { t.stop(); }); return; }
      self.cam.stream = stream; self.render();
    }, function () { if (self.cam) { self.cam.msg = "Accès à la caméra refusé ou impossible. Prends une photo du code à la place."; self.render(); } });
  };
  A.camDetect = function (video) {
    var self = this, cam = this.cam, det = nativeDetector();
    clearTimeout(cam.t); if (cam.zx) { try { cam.zx.reset(); } catch (e) {} cam.zx = null; }
    if (det) {
      var tick = function () { if (self.cam !== cam || !video.isConnected) return; det.detect(video).then(function (c) { if (c && c.length) self.onCode(c[0].rawValue); else cam.t = setTimeout(tick, 250); }, function () { cam.t = setTimeout(tick, 400); }); };
      return tick();
    }
    loadZX().then(function (ZX) {
      if (self.cam !== cam || !video.isConnected) return;
      cam.zx = new ZX.BrowserMultiFormatReader();
      cam.zx.decodeFromStream(cam.stream, video, function (res) { if (res && self.cam === cam) self.onCode(res.getText()); });
    }, function () { cam.msg = "Lecteur indisponible (connexion). Tape les chiffres du code-barres à la place."; self.render(); });
  };
  A.camStop = function () {
    var cam = this.cam; this.cam = null;
    if (cam) { clearTimeout(cam.t); if (cam.zx) { try { cam.zx.reset(); } catch (e) {} } if (cam.stream) cam.stream.getTracks().forEach(function (t) { t.stop(); }); }
  };
  // Photo d'un code : utile quand la caméra en direct n'est pas autorisée.
  A.codeFromPhoto = function (file) {
    var self = this, url = URL.createObjectURL(file), det = nativeDetector();
    var done = function (txt) { URL.revokeObjectURL(url); if (txt) return self.onCode(txt); self.camStop(); self.scan = { mode: "bar", error: "Code illisible sur la photo. Rapproche-toi, évite les reflets, ou tape les chiffres." }; self.render(); };
    if (det) { var img = new Image(); img.onload = function () { det.detect(img).then(function (c) { done(c && c[0] && c[0].rawValue); }, function () { done(""); }); }; img.onerror = function () { done(""); }; img.src = url; return; }
    loadZX().then(function (ZX) { return new ZX.BrowserMultiFormatReader().decodeFromImageUrl(url).then(function (r) { done(r.getText()); }); }).catch(function () { done(""); });
  };
  A.onCode = function (raw) {
    raw = String(raw || "").trim(); this.camStop();
    if (navigator.vibrate) try { navigator.vibrate(60); } catch (e) {}
    var digits = raw.replace(/\s/g, "");
    if (/^\d{8,14}$/.test(digits)) return this.scanBarcode(digits);
    var m = raw.match(/sunsoari\.fr\/(?:[a-z-]+\/)?products\/([a-z0-9-]+)/i);
    if (m) { var key = Object.keys(P).filter(function (k) { return P[k].handle === m[1].toLowerCase(); })[0]; if (key) { this.scan = null; this.detail = "s:" + key; return this.render(); } }
    var u = null; try { u = /^https?:\/\//i.test(raw) ? new URL(raw) : null; } catch (e) {}
    this.scan = u ? { link: { href: u.href, host: u.hostname } } : { text: raw.slice(0, 300) };
    this.emit("scan", { code: u ? u.hostname : "texte" });
    this.render();
  };
  A.scanBarcode = function (ean) {
    var self = this; this.busy = true; this.render();
    fetch("https://world.openbeautyfacts.org/api/v2/product/" + encodeURIComponent(ean) + ".json?fields=product_name,brands,ingredients_text,categories")
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d || d.status !== 1) throw "nf";
        var pr = d.product; self.finishScan(pr.brands || "", pr.product_name || "", pr.ingredients_text || "", pr.categories || "");
      })
      .catch(function (e) { self.scan = { mode: "bar", ean: ean, error: e === "nf" ? "Produit introuvable dans Open Beauty Facts. Colle sa liste d'ingrédients à la place." : "Recherche impossible ici (connexion bloquée). Colle la liste d'ingrédients à la place." }; })
      .then(function () { self.busy = false; self.render(); });
  };

  // ---------------------------------------------------------------------------
  // PRISE DE VUE : 3 photos (face, profil gauche, profil droit) ou une vidéo
  // ---------------------------------------------------------------------------
  var CAP_SLOTS = [["face", "Face"], ["gauche", "Profil gauche"], ["droit", "Profil droit"]];
  // Miniature JPEG (côté max en px) à partir d'une image ou d'une vidéo déjà prête.
  function snap(src, w, h, max, q) { var k = Math.min(1, max / Math.max(w, h)), c = document.createElement("canvas"); c.width = Math.round(w * k); c.height = Math.round(h * k); c.getContext("2d").drawImage(src, 0, 0, c.width, c.height); return c; }
  function fileThumb(file, max) {
    return new Promise(function (res) { var img = new Image(), url = URL.createObjectURL(file); img.onload = function () { var c = snap(img, img.width, img.height, max || 240); URL.revokeObjectURL(url); res(c.toDataURL("image/jpeg", 0.72)); }; img.onerror = function () { res(""); }; img.src = url; });
  }
  // Extrait 5 images d'une vidéo (face, gauche, droite, haut, bas) pour l'analyse.
  function videoFrames(file, n) {
    return new Promise(function (res, rej) {
      var v = document.createElement("video"), url = URL.createObjectURL(file), out = [], i = 0;
      v.muted = true; v.playsInline = true; v.preload = "auto"; v.src = url;
      var next = function () {
        if (i >= n) { URL.revokeObjectURL(url); return res(out); }
        v.currentTime = Math.max(0.05, v.duration * (i + 0.5) / n);
      };
      v.onloadedmetadata = function () { if (!isFinite(v.duration) || !v.duration) { URL.revokeObjectURL(url); return rej(); } next(); };
      v.onseeked = function () { var c = snap(v, v.videoWidth, v.videoHeight, 1024); c.toBlob(function (b) { out.push({ blob: b, thumb: snap(v, v.videoWidth, v.videoHeight, 240).toDataURL("image/jpeg", 0.72) }); i++; next(); }, "image/jpeg", 0.85); };
      v.onerror = function () { URL.revokeObjectURL(url); rej(); };
    });
  }

  // ---------------------------------------------------------------------------
  // « RACONTE-MOI » : la cliente parle (ou écrit) librement, l'IA remplit ses réponses
  // ---------------------------------------------------------------------------
  var SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  // Dans une page intégrée (iframe), le navigateur peut interdire le micro : on le détecte, puis on bascule sur la dictée du clavier.
  var MIC = { blocked: false };
  try { var pp = document.permissionsPolicy || document.featurePolicy; if (pp && pp.allowsFeature && !pp.allowsFeature("microphone")) MIC.blocked = true; } catch (e) {}
  var MIC_MSG = "Le micro intégré n'est pas autorisé sur cette page. Touche le champ, puis le 🎤 du clavier de ton téléphone : la dictée du clavier marche partout.";
  function micFailed(err) { return ["not-allowed", "service-not-allowed", "audio-capture"].indexOf(err) > -1; }
  A.vVoice = function () {
    var v = this.voice = this.voice || { text: "", rec: false }, a = this.state.answers, filled = this.voiceFilled;
    var html = "<div class='q'><h3>Raconte-moi ta peau, en quelques phrases</h3><p class='sub'>Parle comme à une amie : qui tu es, ton âge, ton rythme de vie, ta routine, ce qui te gêne sur la peau, les cheveux ou le corps, ton budget. On remplit tes réponses pour toi, tu vérifies ensuite.</p></div>";
    html += "<div class='voicebox'><button class='mic" + (v.rec ? " on" : "") + "' data-act='" + (v.rec ? "voicestop" : "voicestart") + "' aria-label='" + (v.rec ? "Arrêter" : "Parler") + "'>" + (v.rec ? "■" : "🎤") + "</button><span>" + (v.rec ? "Je t'écoute\u2026 touche pour arrêter" : SpeechRec && !MIC.blocked ? "Touche le micro et parle" : "Touche la zone de texte, puis le 🎤 de ton clavier") + "</span></div>";
    html += "<textarea id='voicetext' data-voicetext='1' rows='6' placeholder='Ex. : Je m'appelle Awa, j'ai 32 ans, je suis entrepreneure et maman. J'ai la peau mixte, des boutons sur le menton et des marques. Cheveux crépus secs. Je fais une routine le soir seulement. Budget 40 € par mois.'>" + esc(v.text) + "</textarea>";
    html += "<div class='ex'>" + ["Je suis…, j'ai … ans", "Mon métier, mon rythme", "Ma routine aujourd'hui", "Peau, cheveux, corps : ce qui me gêne", "Mon budget"].map(function (x) { return "<span>" + x + "</span>"; }).join("") + "</div>";
    if (this.voiceMsg) html += "<p class='why'>" + esc(this.voiceMsg) + "</p>";
    if (filled && filled.length) html += "<div class='whybox'><b>On a rempli pour toi</b><ul class='tipl'>" + filled.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul><small>Tu pourras tout vérifier et corriger dans les questions suivantes.</small></div>";
    html += "<div class='cta'>" + (v.text.trim().length > 15 && !(filled && filled.length) ? "<button class='btn big' data-act='voicefill'" + (this.busy ? " disabled" : "") + ">" + (this.busy ? "Je lis ton message…" : "Remplir mes réponses") + "</button>" : "") + "<button class='btn " + (filled && filled.length ? "big" : "ghost") + "' data-act='voicego'>" + (filled && filled.length ? "Continuer" : "Je préfère répondre aux questions") + "</button></div>";
    return html + "<p class='note'>Avec la dictée, ta voix est transformée en texte par ton téléphone ou ton navigateur. Rien n'est enregistré : seul le texte sert à remplir tes réponses.</p>";
  };
  // Dictée dans un champ texte du diagnostic.
  A.dictate = function (field) {
    var self = this, a = this.state.answers;
    if (this.dictating === field) { try { this.recog && this.recog.stop(); } catch (e) {} this.dictating = null; return this.render(); }
    if (!SpeechRec || MIC.blocked) { this.dictMsg = MIC.blocked ? MIC_MSG : "La dictée intégrée n'existe pas sur ce navigateur : touche le champ, puis le 🎤 de ton clavier."; this.render(); alertField(this, field); return; }
    try {
      if (this.recog) try { this.recog.stop(); } catch (e) {}
      var rec = this.recog = new SpeechRec(), base = a[field] ? String(a[field]).trim() + " " : "";
      rec.lang = "fr-FR"; rec.continuous = true; rec.interimResults = true;
      rec.onresult = function (e) { var fin = "", tmp = ""; for (var i = 0; i < e.results.length; i++) { if (e.results[i].isFinal) fin += e.results[i][0].transcript; else tmp += e.results[i][0].transcript; } a[field] = (base + fin).slice(0, 600); self.save(); var el = self.root.querySelector("[data-field='" + field + "']"); if (el) el.value = a[field] + (tmp ? " " + tmp : ""); };
      rec.onerror = function (e) { if (micFailed(e.error)) { MIC.blocked = true; self.dictMsg = MIC_MSG; } else if (e.error === "no-speech") self.dictMsg = "Je n'ai rien entendu : touche « Dicter » et parle près du téléphone."; self.dictating = null; self.render(); };
      rec.onend = function () { self.dictating = null; self.render(); };
      rec.start(); this.dictating = field; this.dictMsg = null; this.render();
    } catch (e) { alertField(this, field); }
  };
  // Sans dictée intégrée : on place le curseur dans le champ, le micro du clavier prend le relais.
  function alertField(app, field) { var el = app.root.querySelector("[data-field='" + field + "']"); if (el) { el.focus(); el.placeholder = "Touche le micro de ton clavier pour dicter…"; } }
  // Dernière étape : créer son espace et recevoir sa routine par e-mail.
  A.vFin = function () {
    var a = this.state.answers, logged = this.host.getAttribute("data-customer-name"), f = this.fin = this.fin || { email: a.email || "", ok: false, news: false };
    var html = "<div class='q'><h3>Ton espace soin est prêt" + (a.prenom ? ", " + esc(a.prenom) : "") + "</h3><p class='sub'>Ta routine, ton planner, ton suivi et tes conseils t'attendent. " + (logged ? "Ils sont enregistrés dans ton compte." : "Crée ton compte pour les retrouver sur ton téléphone et ton ordinateur, et reçois ta routine par e-mail.") + "</p></div>";
    if (!logged) {
      html += "<div class='tfields'><label><span>Ton e-mail</span><input type='email' data-finemail='1' value='" + esc(f.email) + "' placeholder='prenom@exemple.fr' autocomplete='email'></label></div>";
      html += "<label class='toggle'><input type='checkbox' data-finok='1'" + (f.ok ? " checked" : "") + "> Je veux recevoir ma routine et mes rappels de soin par e-mail</label>";
      html += "<label class='toggle'><input type='checkbox' data-finnews='1'" + (f.news ? " checked" : "") + "> J'accepte aussi les nouveautés et offres Sunsoari (facultatif)</label>";
    }
    if (this.finMsg) html += "<p class='why'>" + esc(this.finMsg) + "</p>";
    var valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email) && f.ok;
    html += "<div class='cta'>" + (logged ? "<button class='btn big' data-act='finsend'>Ouvrir mon espace soin</button>" : "<button class='btn big' data-act='finsend'" + (valid && !this.busy ? "" : " disabled") + ">" + (this.busy ? "Envoi…" : "Créer mon espace et recevoir ma routine") + "</button><button class='btn link' data-act='finskip'>Voir mon espace sans e-mail</button>") + "</div>";
    return html + "<p class='note'>Ton e-mail sert à t'envoyer ta routine et à créer ton espace. Désinscription en un clic dans chaque e-mail. Tes photos ne sont jamais envoyées par e-mail.</p>";
  };
  A.finishDiag = function () { var s = this.state; s.done = true; s.doneAt = Date.now(); this.saveDay0(); this.save(); this.view = "espace"; this.etab = "routine"; this.emit("result", { answers: s.answers, email: s.answers.email || "" }); this.render(); };
  // Envoi au serveur (data-email-endpoint) : il crée le compte client et envoie l'e-mail de routine.
  A.finSend = function () {
    var self = this, s = this.state, a = s.answers, f = this.fin, ep = this.host.getAttribute("data-email-endpoint"), logged = this.host.getAttribute("data-customer-name");
    if (logged) return this.finishDiag();
    a.email = f.email; s.emailOk = f.ok; s.newsOk = f.news; this.save();
    var R = buildRoutine(a), names = function (l) { return l.map(function (it) { var p = byId(it.id); return p ? { etape: STEP_LABEL[it.step] || it.step, produit: p.brand + " " + p.name } : null; }).filter(Boolean); };
    var payload = { email: f.email, prenom: a.prenom || "", consentement_routine: f.ok, consentement_offres: f.news, resultat: (skinProfile(a) ? SKIN_INFO[skinProfile(a).type].t : ""), routine: { matin: names(R.matin), soir: names(R.soir), hebdo: names(R.hebdo), cheveux: names(R.cheveux) }, resume: this.summaryText() };
    if (!ep) { this.finMsg = "Démo : sur l'application en ligne, tu recevras ta routine à " + f.email + " et ton compte sera créé."; this.render(); var me = this; setTimeout(function () { me.finishDiag(); }, 1200); return; }
    this.busy = true; this.render();
    fetch(ep, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).then(function (r) { if (!r.ok) throw 0; self.finMsg = null; self.state.emailSent = Date.now(); self.save(); self.busy = false; self.finishDiag(); }, function () { self.busy = false; self.finMsg = "L'envoi n'a pas abouti. Ton espace est quand même prêt : réessaie plus tard depuis Mon compte."; self.render(); setTimeout(function () { self.finishDiag(); }, 1800); });
  };
  A.voiceStart = function () {
    var self = this, v = this.voice;
    if (!SpeechRec || MIC.blocked) { this.voiceMsg = MIC.blocked ? MIC_MSG : "La dictée directe n'est pas disponible ici : touche la zone de texte, puis le micro de ton clavier."; this.render(); var ta0 = this.root.querySelector("#voicetext"); if (ta0) ta0.focus(); return; }
    try {
      var rec = this.recog = new SpeechRec(), base = v.text ? v.text.trim() + " " : "";
      rec.lang = "fr-FR"; rec.continuous = true; rec.interimResults = true;
      rec.onresult = function (e) { var fin = "", tmp = ""; for (var i = 0; i < e.results.length; i++) { if (e.results[i].isFinal) fin += e.results[i][0].transcript; else tmp += e.results[i][0].transcript; } v.text = (base + fin).slice(0, 3000); var ta = self.root.querySelector("#voicetext"); if (ta) ta.value = v.text + (tmp ? " " + tmp : ""); };
      rec.onerror = function (e) { v.rec = false; if (micFailed(e.error)) MIC.blocked = true; self.voiceMsg = micFailed(e.error) ? MIC_MSG : e.error === "no-speech" ? "Je n'ai rien entendu : touche le micro et parle près du téléphone." : "La dictée s'est arrêtée. Tu peux reprendre ou écrire."; self.render(); };
      rec.onend = function () { v.rec = false; self.render(); };
      rec.start(); v.rec = true; this.voiceMsg = null; this.render();
    } catch (e) { this.voiceMsg = "La dictée n'est pas disponible ici : utilise le micro de ton clavier."; this.render(); }
  };
  // Valeurs autorisées par question, pour cadrer l'IA et le repli sans IA.
  A.voiceSchema = function () {
    return QUESTIONS.filter(function (q) { return q.options && !q.type; }).map(function (q) { return q.id + (q.multi ? " (liste)" : "") + " : " + q.options.map(function (o) { return o[0] + "=" + o[1]; }).join(" | "); }).join("\n");
  };
  A.applyVoice = function (r) {
    var a = this.state.answers, filled = [], ok = {};
    QUESTIONS.forEach(function (q) { if (q.options && !q.type) ok[q.id] = q; });
    Object.keys((r && r.answers) || {}).forEach(function (id) {
      var q = ok[id], v = r.answers[id]; if (!q || v == null) return;
      var codes = q.options.map(function (o) { return o[0]; });
      if (q.multi) { var l = (Array.isArray(v) ? v : [v]).filter(function (x) { return codes.indexOf(x) > -1; }).slice(0, q.max || 9); if (l.length) { a[id] = l; filled.push(q.title.replace(/ ?[?\u2026]$/, "") + " : " + l.map(function (x) { return q.options[codes.indexOf(x)][1]; }).join(", ")); } }
      else if (codes.indexOf(v) > -1) { a[id] = v; filled.push(q.title.replace(/ ?[?\u2026]$/, "") + " : " + q.options[codes.indexOf(v)][1]); }
    });
    ["prenom", "age", "rythme", "produitsVisage", "produitsCorps", "notes"].forEach(function (k) { var v = r && r.fields && r.fields[k]; if (v) { a[k] = String(v).slice(0, 600); filled.push({ prenom: "Prénom", age: "Âge", rythme: "Rythme de vie", produitsVisage: "Produits visage", produitsCorps: "Produits corps", notes: "Notes" }[k] + " : " + a[k]); } });
    var sp = skinProfile(a); if (sp) a.peau = sp.peau;
    this.voiceFilled = filled; this.save();
  };
  // Repli sans IA : quelques repères simples dans le texte.
  function voiceLocal(t) {
    var low = " " + t.toLowerCase() + " ", r = { answers: {}, fields: {} }, m;
    if ((m = t.match(/(\d{2})\s*ans/))) r.fields.age = m[1];
    if ((m = t.match(/je m'appelle\s+([A-Za-z\u00C0-\u017F-]+)/i))) r.fields.prenom = m[1];
    if (/\b(une femme|maman|enceinte|je suis entrepreneure)\b/.test(low)) r.answers.genre = "femme"; if (/\b(un homme|papa)\b/.test(low)) r.answers.genre = "homme";
    if (/enceinte|allaite/.test(low)) r.answers.grossesse = "oui"; if (/ménopause|menopause/.test(low)) r.answers.grossesse = "menopause";
    var c = []; [["tach", "taches"], ["bouton", "imperfections"], ["acné", "imperfections"], ["points noirs", "pointsnoirs"], ["marque", "marques"], ["ride", "rides"], ["rougeur", "rougeurs"], ["cerne", "cernes"], ["terne", "teint"], ["brill", "brillance"], ["sèche", "secheresse"], ["tiraill", "secheresse"]].forEach(function (k) { if (low.indexOf(k[0]) > -1 && c.indexOf(k[1]) < 0) c.push(k[1]); }); if (c.length) r.answers.concerns = c.slice(0, 5);
    [["crépu", "crepus"], ["frisé", "crepus"], ["bouclé", "boucles"], ["ondulé", "ondules"], ["raide", "raides"], ["lisse", "raides"]].some(function (k) { if (low.indexOf(k[0]) > -1) { r.answers.texture = k[1]; return true; } });
    if (/matin et (le )?soir/.test(low)) r.answers.routine = "deux"; else if (/le soir seulement|seulement le soir/.test(low)) r.answers.routine = "soir"; else if (/pas de routine|aucune routine/.test(low)) r.answers.routine = "aucune";
    if ((m = low.match(/(\d{2,3})\s*(€|euros)/))) { var b = +m[1]; r.answers.budgetSoin = b < 30 ? "b30" : b <= 60 ? "b60" : b <= 100 ? "b100" : "b100p"; }
    if ((m = t.match(/je suis\s+([a-z\u00E0-\u00FF -]{4,40}?)(?:[,.]|\s+et\s|$)/i)) && !/femme|homme/.test(m[1])) r.fields.rythme = m[1].trim();
    return r;
  }
  A.voiceFill = function () {
    var self = this, t = (this.voice.text || "").trim(); if (t.length < 10) return;
    if (this.recog) try { this.recog.stop(); } catch (e) {}
    if (AI.mode === "none") { this.applyVoice(voiceLocal(t)); this.voiceMsg = this.voiceFilled.length ? null : "Je n'ai pas trouvé de réponse claire : passe aux questions."; return this.render(); }
    this.busy = true; this.render();
    var prompt = "Une cliente se décrit pour un diagnostic beauté. Remplis uniquement ce qui est dit clairement, n'invente rien. Utilise UNIQUEMENT les codes autorisés ci-dessous.\n" + this.voiceSchema() +
      "\nChamps libres : prenom, age (nombre), rythme (métier, mode de vie), produitsVisage, produitsCorps, notes (allergies, objectifs, autres infos utiles).\nRéponds uniquement en JSON : {\"answers\":{\"id\":\"code\" ou [\"code\"]},\"fields\":{\"prenom\":\"\"}}\n\nTexte de la cliente :\n" + t.slice(0, 3000);
    aiCall(prompt, { modelTier: "default" }, true).then(function (r) { self.applyVoice(r); if (!self.voiceFilled.length) self.applyVoice(voiceLocal(t)); }, function () { self.applyVoice(voiceLocal(t)); }).then(function () { self.busy = false; self.render(); });
  };
  A.vCapture = function (q) {
    var self = this, c = this.cap = this.cap || { mode: "photos", files: {}, thumbs: {}, frames: [] }, s = this.state, cfg0 = PHOTO.visage;
    var html = "<div class='q'><h3>Montre-nous ta peau</h3><p class='sub'>Pour un espace soin vraiment adapté, à la lumière du jour (face à une fenêtre), visage nu : sans maquillage, sans filtre, cheveux attachés.</p></div>";
    html += "<div class='modes'>" + [["photos", "3 photos"], ["video", "Une vidéo"]].map(function (m) { return "<button data-capmode='" + m[0] + "' aria-pressed='" + (c.mode === m[0]) + "'>" + m[1] + "</button>"; }).join("") + "</div>";
    if (c.mode === "photos") {
      html += "<div class='capgrid'>" + CAP_SLOTS.map(function (sl) { var t = c.thumbs[sl[0]]; return "<label class='capslot" + (t ? " has" : "") + "' for='cap-" + sl[0] + "'>" + (t ? "<img src='" + t + "' alt='" + sl[1] + "'>" : "<span class='capico'>" + (sl[0] === "face" ? "◉" : sl[0] === "gauche" ? "◐" : "◑") + "</span>") + "<b>" + sl[1] + "</b><input id='cap-" + sl[0] + "' type='file' accept='image/*' capture='user' data-capslot='" + sl[0] + "' hidden></label>"; }).join("") + "</div>";
      html += "<p class='note'>Face : regarde l'objectif. Profils : tourne la tête pour montrer toute la joue, de l'oreille au nez.</p>";
    } else {
      html += "<ol class='guide'><li>Filme-toi en selfie, téléphone à bout de bras, environ 10 secondes.</li><li>Commence de face, puis tourne lentement la tête à gauche, à droite, lève le menton, puis baisse-le.</li><li>Garde la même lumière tout du long.</li></ol>";
      html += "<label class='btn ghost' for='cap-video'>" + (c.frames.length ? "Refaire la vidéo" : "Filmer ou choisir une vidéo") + "</label><input id='cap-video' type='file' accept='video/*' capture='user' data-capvideo='1' hidden>";
      if (c.frames.length) html += "<div class='capframes'>" + c.frames.map(function (f) { return "<img src='" + f.thumb + "' alt=''>"; }).join("") + "</div><p class='note'>On a extrait " + c.frames.length + " images de ta vidéo pour l'analyse. La vidéo elle-même n'est pas conservée.</p>";
    }
    if (this.capMsg) html += "<p class='why'>" + esc(this.capMsg) + "</p>";
    var ready = c.mode === "photos" ? Object.keys(c.files).length > 0 : c.frames.length > 0;
    html += "<label class='toggle'><input type='checkbox' data-keepcap='1'" + (s.keepCap ? " checked" : "") + "> Garder des miniatures de mes photos sur ce téléphone pour suivre mon évolution</label>";
    if (ready && AI.images) html += "<button class='btn big' data-act='capanalyse'" + (this.busy ? " disabled" : "") + ">" + (this.busy ? "Analyse en cours…" : "Analyser ma peau") + "</button>";
    else if (ready) {
      // Sans IA ici : la cliente regarde ses images et coche ce qu'elle voit. Son diagnostic en tient compte.
      var mine = (s.answers.photoVisage || {}).vu || [];
      html += "<div class='whybox'><b>Regarde tes images : que vois-tu ?</b><p class='sub'>L'analyse automatique n'est pas disponible sur cette page. Coche ce que tu remarques, ta routine en tiendra compte.</p><div class='chipset'>" + cfg0.obs.map(function (o) { return "<button class='chip' data-capobs='" + o[0] + "' aria-pressed='" + (mine.indexOf(o[0]) > -1) + "'>" + esc(o[1]) + "</button>"; }).join("") + "</div></div>";
    }
    if (s.analysis && s.analysis.resume) html += "<div class='whybox'><b>Ce que l'assistante observe</b><p>" + esc(s.analysis.resume) + "</p>" + (s.analysis.points && s.analysis.points.length ? "<ul class='tipl'>" + s.analysis.points.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : "") + (s.analysis.dermato ? "<p><b>À montrer à un ou une dermatologue :</b> " + esc(s.analysis.dermato) + "</p>" : "") + "</div>";
    html += "<p class='note'>Tes images ne sont envoyées que si tu demandes l'analyse : une seule fois, à l'assistante, puis oubliées. Observations cosmétiques, pas un examen médical.</p>";
    return html + "<div class='cta'><button class='btn big' data-act='next'>" + (s.analysis || ((s.answers.photoVisage || {}).vu || []).length ? "Continuer" : "Passer cette étape") + "</button></div>";
  };
  A.capAnalyse = function () {
    var self = this, c = this.cap, s = this.state, cfg = PHOTO.visage;
    var imgs = c.mode === "photos" ? CAP_SLOTS.map(function (sl) { return c.files[sl[0]]; }).filter(Boolean) : c.frames.map(function (f) { return f.blob; });
    if (!imgs.length) return;
    this.busy = true; this.capMsg = "Analyse de " + imgs.length + " image" + (imgs.length > 1 ? "s" : "") + "…"; this.render();
    var prompt = "Voici " + imgs.length + " images du visage d'une cliente (face, profils" + (c.mode === "video" ? ", haut et bas, extraites d'une vidéo" : "") + "), prises pour choisir des cosmétiques. Décris uniquement des signes cosmétiques VISIBLES, sans diagnostic médical, sans deviner l'âge, l'origine ou l'identité. " +
      "Zones : " + cfg.zones.map(function (z) { return z[0]; }).join(", ") + ". Signes : " + cfg.obs.map(function (o) { return o[0]; }).join(", ") + ". " +
      "Si la lumière ou la netteté ne permettent pas de juger, dis-le. Si tu vois une lésion inhabituelle (tache qui paraît irrégulière, plaie), conseille simplement de la montrer à un ou une dermatologue, sans nommer de maladie. " +
      "Réponds uniquement en JSON : {\"qualite\":\"bonne|moyenne|insuffisante\",\"marks\":{\"zone\":[\"signe\"]},\"resume\":\"3 phrases maximum en français, tutoiement, bienveillantes et concrètes\",\"points\":[\"observation courte\"],\"dermato\":\"phrase ou chaîne vide\"}";
    aiCall(prompt, { images: imgs, modelTier: "default" }, true).then(function (r) {
      r = r || {};
      var marks = {}, okZ = cfg.zones.map(function (z) { return z[0]; }), okO = cfg.obs.map(function (o) { return o[0]; });
      Object.keys(r.marks || {}).forEach(function (z) { if (okZ.indexOf(z) > -1) { var l = (r.marks[z] || []).filter(function (o) { return okO.indexOf(o) > -1; }); if (l.length) marks[z] = l; } });
      s.answers.photoVisage = marks;
      s.analysis = { at: Date.now(), qualite: String(r.qualite || ""), resume: String(r.resume || "").slice(0, 600), points: (r.points || []).slice(0, 6).map(String), dermato: String(r.dermato || "").slice(0, 300) };
      self.capMsg = r.qualite === "insuffisante" ? "La lumière ou la netteté ne suffisent pas : refais les photos face à une fenêtre." : null;
      self.saveDay0(); self.save();
    }, function (e) { self.capMsg = AI_ERR[e && e.code] || AI_ERR.upstream_error; }).then(function () { self.busy = false; self.render(); });
  };
  // Photos du jour 0 et des étapes d'évolution : miniatures locales, seulement avec l'accord de la cliente.
  A.saveDay0 = function () {
    var s = this.state, c = this.cap; if (!s.keepCap || !c) return;
    var th = c.mode === "photos" ? CAP_SLOTS.map(function (sl) { return c.thumbs[sl[0]] || ""; }) : c.frames.slice(0, 3).map(function (f) { return f.thumb; });
    s.evo = s.evo || [];
    if (!s.evo.some(function (e) { return e.day0; })) s.evo.push({ day0: true, at: Date.now(), photos: th, feel: "", tags: [], note: "Point de départ" });
  };

  // ---------------------------------------------------------------------------
  // MON ESPACE SOIN : livré automatiquement après le diagnostic
  // ---------------------------------------------------------------------------
  var ESP_TABS = [["routine", "Ma routine"], ["planner", "Mon planner"], ["evolution", "Mon évolution"], ["semaine", "Ma semaine"], ["soleil", "Protection solaire"], ["reco", "Recommandations"], ["cheveux", "Cheveux"], ["produits", "Mes produits"], ["diagnostic", "Diagnostic"], ["astuces", "Astuces"]];
  var SLOTS4 = [["matin", "Matin"], ["jour", "SPF"], ["soir", "Soir"], ["corps", "Corps"]];
  var FEELS = ["Très bien", "Bien", "Moyen", "Difficile"], EVO_TAGS = ["Moins de boutons", "Moins de marques", "Plus confortable", "Moins de brillance", "Teint plus uniforme", "Irritation", "Nouveaux boutons", "Peau sèche"];
  A.vEspace = function () {
    var self = this, s = this.state, a = s.answers, sp = skinProfile(a), tab = this.etab || "routine";
    var chips = [a.age ? a.age + " ans" : "", sp ? SKIN_INFO[sp.type].t + (sp.sensible ? ", sensible" : "") : "", (a.concerns || []).filter(function (c) { return c !== "aucune"; }).slice(0, 3).map(function (c) { return TAG_LABEL[c] || c; }).join(" · ")].filter(Boolean);
    var html = "<div class='esphead'><p class='kicker'>Ton espace soin · Diagnostic du " + new Date(s.doneAt || Date.now()).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) + "</p><h3>Le rituel " + (a.prenom ? "de " + esc(a.prenom) : "de ta peau") + "</h3><div class='chips'>" + chips.map(function (c) { return "<span>" + esc(c) + "</span>"; }).join("") + "</div></div>";
    html += "<div class='etabs' role='tablist'>" + ESP_TABS.map(function (t) { return "<button role='tab' data-etab='" + t[0] + "' aria-selected='" + (tab === t[0]) + "'>" + t[1] + "</button>"; }).join("") + "</div>";
    return html + ({ routine: this.eRoutine, planner: this.ePlanner, evolution: this.eEvolution, semaine: this.eSemaine, soleil: this.eSoleil, reco: this.eReco, cheveux: this.eCheveux, produits: this.eProduits, diagnostic: this.eDiagnostic, astuces: this.eAstuces }[tab] || this.eRoutine).call(this);
  };
  A.eRoutine = function () {
    var self = this, s = this.state, a = s.answers, R = buildRoutine(a), m = this.emode || "matin", today = iso();
    var start = s.planStart || s.doneAt || Date.now(), wk = introPlan(R), cw = planWeek(start), intro = {};
    wk.forEach(function (w, i) { w.items.forEach(function (it) { intro[it.id] = i + 1; }); });
    var cal = eveningCalendar(R, cw, wk), tonight = cal.filter(function (c) { return c.d === new Date().getDay(); })[0];
    var steps = m === "matin" ? R.matin : m === "soir" ? R.soir : m === "corps" ? R.hebdo.filter(function (x) { var p = byId(x.id); return p && p.zone === "corps"; }).concat(R.douche.slice(0, 1)) : m === "cheveux" ? R.cheveux : [];
    var ctx = { matin: "Le matin ne change jamais : nettoyer, hydrater, protéger.", jour: "Dans la journée, la crème solaire se renouvelle : toutes les 2 heures dehors, et après le sport.", soir: "Ce soir : " + (tonight ? tonight.t : "réparation") + ".", corps: "Après la douche, sur peau encore légèrement humide.", cheveux: "Les jours de lavage. Le masque, une fois par semaine. Le soin du cuir chevelu, selon le produit." }[m];
    var html = "<div class='modes'>" + [["matin", "Matin"], ["jour", "Journée · SPF"], ["soir", "Soir"], ["corps", "Corps"], ["cheveux", "Cheveux"]].map(function (x) { return "<button data-emode='" + x[0] + "' aria-pressed='" + (m === x[0]) + "'>" + x[1] + "</button>"; }).join("") + "</div><p class='why'>" + esc(ctx) + "</p>";
    var done = ((s.checks[today] || {})[m] || []);
    if (m === "jour") steps = [{ step: "retouche", id: (R.matin.filter(function (x) { return x.step === "spf"; })[0] || {}).id }, { step: "sport", id: null }];
    html += "<div class='plan'>" + steps.map(function (it, i) {
      var p = it.id ? byId(it.id) : null, key = it.step + (it.id || i), on = done.indexOf(key) > -1, later = it.id && (intro[it.id] || 1) > cw;
      var label = { retouche: "Retouche de crème solaire, midi", sport: "Après le sport : rincer le visage, puis retoucher" }[it.step] || STEP_LABEL[it.step] || (it.step === "douche" ? "Rituel douche" : it.step);
      if (later) return "<p class='pstep later'><span class='tick'></span><span>" + esc(label) + " · <small>à partir de la semaine " + intro[it.id] + "</small></span></p>";
      return "<button class='pstep' data-check='" + m + "|" + esc(key) + "' aria-pressed='" + on + "'><span class='tick'>" + (on ? "✓" : "") + "</span><span>" + esc(label) + (p ? " · <small>" + esc(p.brand + " " + p.name) + "</small>" : "") + "</span></button>";
    }).join("") + "</div>";
    var pl = ((s.planner || {})[today] || {})[m];
    html += "<div class='markbar'><span>Routine " + ({ matin: "du matin", jour: "SPF", soir: "du soir", corps: "corps", cheveux: "cheveux" })[m] + " faite aujourd'hui ?</span><div class='yn'><button data-pmark='" + today + "|" + m + "|oui' aria-pressed='" + (pl === "oui") + "'>Oui</button><button data-pmark='" + today + "|" + m + "|non' aria-pressed='" + (pl === "non") + "'>Non</button></div></div>";
    return html + "<p class='note'>Tu commences ? Ajoute les produits un par un, dans l'ordre de l'onglet « Ma semaine ». Tant qu'un produit n'est pas encore introduit, saute son étape.</p>";
  };
  A.ePlanner = function () {
    var s = this.state, pl = s.planner = s.planner || {}, self = this, base = this.pmonth || iso().slice(0, 7), y = +base.slice(0, 4), mo = +base.slice(5, 7) - 1;
    var first = new Date(y, mo, 1), days = new Date(y, mo + 1, 0).getDate(), off = (first.getDay() + 6) % 7, today = iso();
    var last30 = 0, yes30 = 0, streak = 0;
    for (var i = 0; i < 30; i++) { var k = iso(addDays(today, -i)), d = pl[k] || {}, vals = SLOTS4.map(function (x) { return d[x[0]]; }).filter(Boolean); if (vals.length) { last30++; if (vals.indexOf("non") < 0) yes30++; } }
    for (var j = 0; j < 365; j++) { var dd = pl[iso(addDays(today, -j))] || {}; if (dd.matin === "oui" || dd.soir === "oui") streak++; else if (j > 0) break; }
    var html = "<p class='sub'>Chaque jour, note si tu as suivi ta routine : oui ou non, sans culpabiliser. C'est ce qui permet de comprendre l'évolution de ta peau.</p>";
    html += "<div class='stats'><div><b>" + streak + "</b><small>jours d'affilée</small></div><div><b>" + last30 + "</b><small>jours notés sur 30</small></div><div><b>" + (last30 ? Math.round(yes30 / last30 * 100) : 0) + " %</b><small>jours complets</small></div></div>";
    html += "<div class='calh'><button data-pmonth='" + iso(new Date(y, mo - 1, 15)).slice(0, 7) + "' aria-label='Mois précédent'>‹</button><b>" + first.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }) + "</b><button data-pmonth='" + iso(new Date(y, mo + 1, 15)).slice(0, 7) + "' aria-label='Mois suivant'>›</button></div><div class='pcal'>" + ["L", "M", "M", "J", "V", "S", "D"].map(function (x) { return "<i class='wd'>" + x + "</i>"; }).join("");
    for (var b = 0; b < off; b++) html += "<i></i>";
    for (var n = 1; n <= days; n++) { var key = base + "-" + (n < 10 ? "0" : "") + n, dv = pl[key] || {}, fut = key > today; html += "<button class='pcell" + (key === today ? " today" : "") + (this.pday === key ? " sel" : "") + "' data-pday='" + key + "'" + (fut ? " disabled" : "") + "><span>" + n + "</span><span class='segs4'>" + SLOTS4.map(function (x) { return "<i class='" + (dv[x[0]] || "") + "'></i>"; }).join("") + "</span></button>"; }
    html += "</div><p class='legend'><i class='sw oui'></i>Oui <i class='sw non'></i>Non <i class='sw'></i>Pas noté · dans chaque jour : matin, SPF, soir, corps</p>";
    var sel = this.pday || today, sv = pl[sel] || {};
    html += "<div class='acct'><b>" + new Date(sel + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }) + "</b>" + SLOTS4.map(function (x) { return "<div class='markbar'><span>" + x[1] + "</span><div class='yn'><button data-pmark='" + sel + "|" + x[0] + "|oui' aria-pressed='" + (sv[x[0]] === "oui") + "'>Oui</button><button data-pmark='" + sel + "|" + x[0] + "|non' aria-pressed='" + (sv[x[0]] === "non") + "'>Non</button></div></div>"; }).join("") + "</div>";
    return html;
  };
  A.eEvolution = function () {
    var s = this.state, self = this, evo = s.evo = s.evo || [], d = this.evoDraft = this.evoDraft || { date: iso(), photos: ["", "", ""], feel: "", tags: [], note: "" };
    var html = "<p class='sub'>Ajoute tes photos et ton ressenti toutes les 2 semaines, au même endroit, à la même lumière, sans filtre ni maquillage.</p>";
    html += "<div class='acct'><b>Nouvelle étape</b><label class='tfields'><span>Date</span><input type='date' data-evo='date' value='" + d.date + "' max='" + iso() + "'></label><div class='capgrid'>" + CAP_SLOTS.map(function (sl, i) { return "<label class='capslot" + (d.photos[i] ? " has" : "") + "' for='evo-" + i + "'>" + (d.photos[i] ? "<img src='" + d.photos[i] + "' alt='" + sl[1] + "'>" : "<span class='capico'>+</span>") + "<b>" + sl[1] + "</b><input id='evo-" + i + "' type='file' accept='image/*' capture='user' data-evophoto='" + i + "' hidden></label>"; }).join("") + "</div>";
    html += "<p class='alt-t'>Comment va ta peau ?</p><div class='chipset'>" + FEELS.map(function (f) { return "<button class='chip' data-evofeel='" + f + "' aria-pressed='" + (d.feel === f) + "'>" + f + "</button>"; }).join("") + "</div>";
    html += "<p class='alt-t'>Ce que tu remarques</p><div class='chipset'>" + EVO_TAGS.map(function (f) { return "<button class='chip' data-evotag='" + f + "' aria-pressed='" + (d.tags.indexOf(f) > -1) + "'>" + f + "</button>"; }).join("") + "</div>";
    html += "<label class='tfields'><span>Ton ressenti</span><textarea data-evo='note' rows='3' maxlength='800' placeholder='Ex. : moins de petits boutons sur le front, la crème solaire ne picote pas…'>" + esc(d.note) + "</textarea></label><button class='btn big' data-act='evosave'>Enregistrer cette étape</button><small>Les photos restent sur ce téléphone, en miniature.</small></div>";
    var withPh = evo.filter(function (e) { return e.photos && e.photos[0]; });
    if (withPh.length > 1) html += "<p class='alt-t'>Avant · maintenant</p><div class='pair'><figure><img src='" + withPh[0].photos[0] + "' alt=''><figcaption>" + new Date(withPh[0].at).toLocaleDateString("fr-FR") + "</figcaption></figure><figure><img src='" + withPh[withPh.length - 1].photos[0] + "' alt=''><figcaption>" + new Date(withPh[withPh.length - 1].at).toLocaleDateString("fr-FR") + "</figcaption></figure></div>";
    html += "<p class='sect left'>Ton parcours</p>" + (evo.length ? evo.slice().reverse().map(function (e) { var i = evo.indexOf(e), wkn = Math.max(0, Math.round((e.at - (s.doneAt || e.at)) / (7 * 864e5))); return "<div class='entry" + (e.day0 ? " zero" : "") + "'><small>" + (e.day0 ? "Jour 0" : "Semaine " + wkn) + " · " + new Date(e.at).toLocaleDateString("fr-FR") + (e.feel ? " · " + esc(e.feel) : "") + "</small>" + (e.photos && e.photos.some(Boolean) ? "<div class='ph3'>" + e.photos.map(function (p, k) { return p ? "<img src='" + p + "' alt='" + CAP_SLOTS[k][1] + "'>" : "<i></i>"; }).join("") + "</div>" : "") + (e.tags && e.tags.length ? "<p class='chips'>" + e.tags.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</p>" : "") + (e.note ? "<p>" + esc(e.note) + "</p>" : "") + "<button class='btn link' data-evodel='" + i + "'>Supprimer</button></div>"; }).join("") : "<p class='empty'>Ta première étape apparaîtra ici.</p>");
    return html;
  };
  A.eSemaine = function () {
    var s = this.state, R = buildRoutine(s.answers), start = s.planStart || s.doneAt || Date.now(), wk = introPlan(R), cw = planWeek(start), cal = eveningCalendar(R, cw, wk), dnow = new Date().getDay();
    var html = "<p class='sub'>Le matin ne change jamais. Le soir, un seul actif à la fois pour ne pas irriter ta peau.</p><div class='evecal'>" + cal.map(function (c) { return "<p class='" + (c.d === dnow ? "now" : "") + "'><b>" + DSHORT[c.d] + "</b><span>" + esc(c.t) + "</span></p>"; }).join("") + "</div>";
    html += "<p class='sect left'>Dans quel ordre commencer</p><div class='intro'><p>Un produit par semaine. Si quelque chose irrite, tu sais tout de suite lequel. Teste chaque nouveauté 48 h sur la mâchoire.</p><ol>" + wk.map(function (w, i) { var n = i + 1, st = n < cw ? "past" : n === cw ? "now" : ""; return "<li class='" + st + "'><span class='wn'>" + (n < cw ? "✓" : "S" + n) + "</span><span><b>" + esc(w.label) + "</b>" + (w.items.length ? "<small>" + w.items.map(function (it) { var p = byId(it.id); return esc(p ? p.brand + " " + p.name : ""); }).join(" · ") + "</small>" : "") + (w.note ? "<em>" + esc(w.note) + "</em>" : "") + "</span></li>"; }).join("") + "</ol></div>";
    return html;
  };
  A.eSoleil = function () {
    var R = buildRoutine(this.state.answers), spf = R.matin.filter(function (x) { return x.step === "spf"; }).map(function (x) { return byId(x.id); }).filter(Boolean);
    var day = [["7 h 30", "Matin", "Dernière étape de la routine, 15 minutes avant de sortir. Deux longueurs de doigt."], ["12 h 30", "Midi", "Retouche, au stick par exemple, si tu sors ou si tu es près d'une fenêtre."], ["+ 0 h", "Après le sport", "Tamponne la sueur, puis retouche."], ["21 h", "Soir", "Démaquillant pour bien tout retirer, puis nettoyant."]];
    var rules = [["Choisir", "SPF 50 ou 50+, large spectre", "En Europe, cherche le logo UVA entouré d'un cercle. Une texture sans trace blanche, que tu as envie de mettre."], ["Quantité", "Deux longueurs de doigt", "Une ligne de produit sur l'index et une sur le majeur, pour le visage et le cou. On en met presque toujours trop peu."], ["Où", "Les zones oubliées", "Oreilles, ligne des cheveux, nuque, contour de la bouche, paupières (sans entrer dans l'œil), dessus des mains."], ["Quand", "Tous les jours", "Même en hiver, par temps gris ou en télétravail près d'une fenêtre : les UVA traversent les nuages et les vitres."], ["Retouche", "Toutes les 2 h dehors", "Et après le sport, la baignade ou un coup de serviette."], ["Corps", "Lait SPF 50+", "Bras, décolleté, jambes dès qu'ils sont exposés."], ["Si ça picote", "Change de formule", "Arrête et essaie une autre texture. Teste 48 h sur la mâchoire."], ["En plus", "Ombre et chapeau", "Entre 12 h et 16 h l'été : ombre, chapeau, lunettes. Aucune crème ne protège à 100 %."]];
    var html = "<p class='sub'>Sur toutes les carnations, c'est le soin qui protège le plus. Sans protection solaire quotidienne, les marques foncent et durent, quels que soient tes sérums.</p>";
    html += "<p class='sect left'>Une journée type</p><div class='slots'>" + day.map(function (d) { return "<div><b>" + d[0] + "</b><small>" + d[1] + "</small><p>" + d[2] + "</p></div>"; }).join("") + "</div>";
    html += "<p class='sect left'>Les règles</p><div class='slots rules'>" + rules.map(function (r) { return "<div><small>" + r[0] + "</small><b>" + r[1] + "</b><p>" + r[2] + "</p></div>"; }).join("") + "</div>";
    if (spf.length) html += "<p class='sect left'>Ta crème solaire</p><div class='list'>" + spf.map(this.rowProduct, this).join("") + "</div>";
    return html;
  };
  A.eReco = function () {
    var self = this, a = this.state.answers;
    return "<button class='reco-card' data-view='reveal'><b>Ma routine produit par produit</b><span>Pourquoi chaque produit, score de compatibilité, autres options</span></button>" + forYou(a).map(function (g) { return self.reccarousel(g); }).join("") + "<p class='note'>Prix indicatifs, ils varient selon les boutiques. Vérifie la liste d'ingrédients sur le produit acheté, et achète chez un revendeur officiel.</p>";
  };
  // « Mes produits » : ce que devient chaque produit que la cliente possède déjà.
  A.eProduits = function () {
    var self = this, a = this.state.answers, R = buildRoutine(a), inR = R.matin.concat(R.soir, R.hebdo, R.cheveux).map(function (x) { return x.id; }), tags = tagsOf(a);
    var raw = String(a.produitsVisage || "") + "\n" + String(a.produitsCorps || ""), items = raw.split(/[\n,;]+| et /).map(function (x) { return x.trim(); }).filter(function (x) { return x.length > 2; }).slice(0, 15);
    if (!items.length) return "<p class='empty'>Indique tes produits actuels dans ton diagnostic (étape « Ta routine actuelle ») : on te dira lesquels garder, finir ou mettre en pause.</p><button class='btn' data-act='editactuels'>Ajouter mes produits</button>";
    var all = allProducts().filter(function (p) { return !p.own; });
    var html = "<p class='sub'>Ce que devient chaque produit que tu as déjà. Rien ne se jette : finis ce qui te convient avant d'acheter.</p><div class='list'>";
    items.forEach(function (txt) {
      var low = txt.toLowerCase(), m = all.filter(function (p) { return low.indexOf(p.brand.toLowerCase().split(" ")[0]) > -1 && p.name.toLowerCase().split(/\s+/).some(function (w) { return w.length > 3 && low.indexOf(w) > -1; }); })[0];
      var pill, why;
      if (!m) { pill = ["adapt", "À vérifier"]; why = "Scanne sa liste d'ingrédients dans l'onglet Scan pour savoir s'il te convient."; }
      else {
        var bad = (m.avoid || []).some(function (x) { return tags.indexOf(x) > -1; }), same = inR.filter(function (id) { var p = byId(id); return p && p.step === m.step && p.zone === m.zone; })[0];
        if (inR.indexOf(m.id) > -1) { pill = ["keep", "Garder"]; why = "Il fait partie de ta routine."; }
        else if (bad) { pill = ["pause", "Mettre en pause"]; why = "Il ne convient pas à ton profil en ce moment (" + (m.avoid || []).filter(function (x) { return tags.indexOf(x) > -1; }).map(function (x) { return TAG_LABEL[x] || x; }).join(", ") + ")."; }
        else if (same) { pill = ["adapt", "Finir puis remplacer"]; why = "Termine-le, puis passe à " + byId(same).brand + " " + byId(same).name + ". Ne les utilise pas ensemble."; }
        else { pill = ["keep", "Garder"]; why = "Il peut compléter ta routine. Introduis-le comme un nouveau produit."; }
      }
      html += "<div class='mrow'><span><b>" + esc(txt) + "</b><small>" + esc(why) + "</small></span><em class='pill " + pill[0] + "'>" + pill[1] + "</em></div>";
    });
    return html + "</div>";
  };
  A.eDiagnostic = function () {
    var s = this.state, a = s.answers, an = s.analysis, d0 = (s.evo || []).filter(function (e) { return e.day0; })[0];
    var html = "<p class='sub'>Analyse à partir de tes réponses" + (an ? " et de tes photos" : "") + ". C'est un diagnostic cosmétique, pas un avis médical.</p>";
    if (d0 && d0.photos.some(Boolean)) html += "<p class='sect left'>Tes photos du jour 0</p><div class='ph3'>" + d0.photos.map(function (p, k) { return p ? "<img src='" + p + "' alt='" + CAP_SLOTS[k][1] + "'>" : "<i></i>"; }).join("") + "</div>";
    if (an && an.resume) html += "<div class='whybox'><b>Ce que nous avons observé</b><p>" + esc(an.resume) + "</p>" + (an.points.length ? "<ul class='tipl'>" + an.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" : "") + "</div>";
    if (an && an.dermato) html += "<p class='care'>" + esc(an.dermato) + "</p>";
    html += this.skinResult();
    html += "<p class='sect left'>Délais réalistes</p><div class='delays'>" + [["Semaines 2 à 4", "Peau plus confortable, moins de réactions"], ["Semaines 6 à 10", "Petite poussée possible quand les actifs arrivent : elle doit se calmer"], ["Mois 3 à 4", "Grain de peau plus régulier"], ["Mois 4 à 6", "Marques qui s'estompent, avec la crème solaire chaque jour"]].map(function (x) { return "<p><b>" + x[0] + "</b><span>" + x[1] + "</span></p>"; }).join("") + "</div>";
    html += "<p class='care'>Quand arrêter un produit : brûlure, rougeur qui dure, démangeaisons, plaques ou peau qui pèle. Arrête le dernier produit ajouté et parles-en à un ou une dermatologue.</p>";
    return html + "<button class='btn ghost' data-first='diag'>Refaire mon diagnostic</button>";
  };
  // ---------------------------------------------------------------------------
  // CHEVEUX ET CUIR CHEVELU : routine, orientation, compléments
  // ---------------------------------------------------------------------------
  // Orientation selon les signes cochés : jamais un diagnostic, toujours la bonne personne à voir.
  function scalpGuide(a) {
    var t = tagsOf(a), sg = a.cuirSignes || [], dg = a.cuirDiag || [], out = [];
    if (t.indexOf("cuirDS") > -1) out.push(["Squames grasses et rougeurs", dg.indexOf("dsDiag") > -1 ? "Avec une dermatite séborrhéique, les poussées vont et viennent : le stress, le froid et la fatigue les réveillent souvent. Garde les shampoings traitants prescrits ou conseillés en pharmacie pour les poussées, et un shampoing doux entre deux." : "Ces signes sont souvent associés à la dermatite séborrhéique, une affection fréquente et bénigne qui va et vient. Seul un ou une médecin peut le confirmer. En pharmacie, il existe des shampoings « DS » et des shampoings traitants : demande conseil à ton pharmacien.", "Shampoing adapté 2 à 3 fois par semaine en le laissant poser quelques minutes, pas d'huile ni de beurre sur le cuir chevelu pendant une poussée, pas d'huiles essentielles."]);
    if (t.indexOf("cuirPso") > -1) out.push(["Plaques et squames épaisses", dg.indexOf("psoDiag") > -1 ? "Le psoriasis du cuir chevelu se traite : garde ton suivi médical, les soins cosmétiques viennent en complément." : "Des plaques épaisses bien délimitées, avec des squames blanches ou argentées qui dépassent parfois la lisière, méritent l'avis d'un ou une médecin ou dermatologue : ces signes peuvent avoir plusieurs causes, dont le psoriasis, qui se traite.", "Ne gratte pas et n'arrache pas les squames. Évite les gommages, les huiles essentielles et l'eau très chaude. Les shampoings kératoréducteurs de pharmacie aident à décoller les squames en douceur."]);
    if (t.indexOf("tempes") > -1 || (t.indexOf("tension") > -1 && (a.texture === "crepus" || a.texture === "boucles"))) out.push(["Tempes et lisière", "Les coiffures qui tirent longtemps au même endroit (tresses serrées, tissages, perruques collées, queues de cheval serrées, défrisages répétés) peuvent faire reculer la lisière : c'est l'alopécie de traction. Prise tôt, elle s'améliore souvent si on supprime la tension. Installée depuis longtemps, elle peut devenir définitive.", "Desserre et alterne les coiffures, évite les rajouts lourds, les élastiques serrés et la colle sur la lisière, et garde des jours « cheveux libres ». Si une tresse fait mal ou fait des petits boutons, elle est trop serrée. Si ta lisière ne repousse pas, consulte un ou une dermatologue."]);
    if (t.indexOf("chute") > -1 || dg.indexOf("androDiag") > -1) out.push(["Chute de cheveux", "On perd normalement des cheveux chaque jour. Une chute soudaine, importante ou qui dure plus de 3 mois mérite un avis médical : un manque de fer ou de vitamine D, la thyroïde, l'après-grossesse, un choc ou un stress peuvent en être la cause." + (dg.indexOf("androDiag") > -1 ? " Pour l'alopécie androgénétique, les traitements qui ont fait leurs preuves sont des médicaments : parles-en à ton ou ta médecin." : ""), "Les soins du cuir chevelu accompagnent, ils ne remplacent pas un bilan. Masse ton cuir chevelu sans frotter, démêle doucement, des pointes vers les racines."]);
    if (sg.indexOf("zones") > -1 || dg.indexOf("peladeDiag") > -1) out.push(["Zone sans cheveux", "Une zone ronde, lisse et sans cheveux doit être montrée rapidement à un ou une médecin.", "En attendant, évite tout produit irritant à cet endroit."]);
    if (sg.indexOf("boutonsCuir") > -1) out.push(["Boutons ou croûtes", "Des boutons, des croûtes ou une douleur sur le cuir chevelu doivent être montrés à un ou une médecin, surtout s'ils durent ou s'étendent.", "Évite de gratter et de couvrir avec des perruques ou des bonnets serrés en attendant."]);
    return out;
  }
  // Compléments alimentaires et plantes : prudence d'abord.
  var SUPP = [
    { g: "pharmacie", n: "Forcapil", b: "Arkopharma", d: "Gélules cheveux et ongles en pharmacie : levure de bière, vitamines B et acides aminés soufrés (selon l'étiquette)." },
    { g: "pharmacie", n: "Phytophanère", b: "Phyto", d: "Capsules cheveux et ongles en pharmacie : vitamines, minéraux et acides gras." },
    { g: "pharmacie", n: "Anacaps Reactiv", b: "Ducray", d: "Capsules de pharmacie présentées pour les chutes passagères." },
    { g: "Japon", n: "Biotine ou collagène DHC", b: "DHC", d: "Marque japonaise de compléments très connue. Souvent vendue en import : vérifie l'étiquetage en français et la conformité européenne avant d'acheter." },
    { g: "Corée", n: "Vital Beautie", b: "Amorepacific", d: "Gamme coréenne de compléments beauté. Même prudence : achète uniquement des produits étiquetés pour la France." },
    { g: "plante", n: "Ortie, prêle, levure de bière", b: "Pharmacie, herboristerie", d: "Plantes et levure traditionnellement utilisées pour les cheveux et les ongles. Les preuves sont limitées." },
    { g: "Afrique", n: "Moringa", b: "Afrique, Inde", d: "Feuille riche en nutriments, consommée en poudre. Intéressante dans l'alimentation, sans preuve d'effet direct sur la pousse." },
    { g: "Afrique et Asie", n: "Fenugrec", b: "Afrique du Nord, Inde", d: "Graine utilisée traditionnellement pour les cheveux. Les études sont rares : déconseillé pendant la grossesse sans avis médical." }
  ];
  var SUPP_RULES = [
    "Un complément aide surtout s'il y a un manque. Avant d'en prendre, fais un bilan sanguin avec ton ou ta médecin (fer et ferritine, vitamine D, zinc…) : un manque se corrige mieux avec le bon traitement.",
    "La biotine peut fausser certains examens sanguins (thyroïde, cœur) : préviens le laboratoire si tu en prends.",
    "Grossesse, allaitement, traitement en cours ou problème de thyroïde : demande l'avis de ton ou ta médecin ou pharmacien avant tout complément.",
    "Ne cumule pas plusieurs compléments qui contiennent les mêmes vitamines.",
    "La pousse est lente : compte au moins 3 mois avant de juger un résultat."
  ];
  var HAIR_SOURCES = [
    ["DermNet : l'alopécie de traction", "https://dermnetnz.org/topics/traction-alopecia"],
    ["British Association of Dermatologists : l'alopécie de traction", "https://www.skinhealthinfo.org.uk/condition/traction-alopecia"],
    ["British Association of Dermatologists : la dermatite séborrhéique (PDF)", "https://www.skinhealthinfo.org.uk/wp-content/uploads/2018/11/Seborrhoeic-dermatitis-PIL-Jan-2023.pdf"]
  ];
  A.eCheveux = function () {
    var self = this, a = this.state.answers, R = buildRoutine(a), wash = { l1: "presque tous les jours", l2: "2 à 3 fois par semaine", l3: "1 fois par semaine", l4: "moins d'une fois par semaine" }[a.lavage] || "selon ton rythme";
    var html = "<p class='sub'>Ta routine " + esc(TAG_LABEL[a.texture] || "cheveux") + ", du cuir chevelu aux pointes. Lavage " + esc(wash) + ".</p>";
    html += "<div class='list'>" + R.cheveux.map(function (it, i) { return self.routineCard(byId(it.id), it.step, i + 1); }).join("") + "</div>";
    var g = scalpGuide(a);
    if (g.length) html += "<p class='sect left'>Ton cuir chevelu</p><div class='advice'>" + g.map(function (x) { return "<details open><summary>" + esc(x[0]) + "</summary><p>" + esc(x[1]) + "</p><p><b>Au quotidien :</b> " + esc(x[2]) + "</p></details>"; }).join("") + "</div>";
    html += "<p class='sect left'>Compléments alimentaires et plantes</p><div class='whybox'><b>Avant tout</b><ul class='tipl'>" + SUPP_RULES.map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("") + "</ul></div>";
    html += "<div class='acct'><ul class='tipl'>" + SUPP.filter(function (x) { return !(a.grossesse === "oui" && x.n === "Fenugrec"); }).map(function (x) { return "<li><b>" + esc(x.n) + "</b> <small>(" + esc(x.g === "pharmacie" ? "pharmacie" : x.g === "plante" ? "plantes" : x.g) + " · " + esc(x.b) + ")</small> : " + esc(x.d) + "</li>"; }).join("") + "</ul></div>";
    html += "<p class='note'>Ces repères ne remplacent pas un avis médical. Sunsoari ne vend pas de compléments alimentaires pour l'instant.</p>";
    html += "<details class='compare'><summary>Sources</summary><ul class='tipl'>" + HAIR_SOURCES.map(function (s) { return "<li><a href='" + s[1] + "' target='_blank' rel='noopener'>" + esc(s[0]) + "</a></li>"; }).join("") + "</ul></details>";
    return html;
  };
  A.eAstuces = function () {
    var a = this.state.answers, tips = [["Un nouveau produit à la fois", "Une semaine d'écart entre deux nouveautés, testées 48 h sur la mâchoire."], ["Ne perce pas tes boutons", "C'est la première cause des marques, surtout sur peau mate à foncée. Pose un patch la nuit à la place."], ["Ligne des cheveux", "Le gel et les huiles sur les cheveux, pas sur la peau du front. Le soir, insiste avec le démaquillant sur cette zone."], ["Après le sport", "Rince ton visage dès que possible et retouche ta crème solaire si tu ressors."], ["Taie et téléphone", "Taie d'oreiller changée une à deux fois par semaine, écran nettoyé souvent."], ["En vacances", "Garde ta routine habituelle, aucun produit nouveau avant le départ."], ["Ta douche", "Eau tiède, douche courte. Un filtre de douche est un geste de confort : il ne traite ni l'acné ni les marques."], ["Alimentation", "Certaines études relient sucres rapides et produits laitiers à l'acné chez certaines personnes. Observe, sans régime strict. Pas de compléments sans avis médical."]];
    var html = "<div class='slots rules'>" + tips.map(function (t) { return "<div><b>" + t[0] + "</b><p>" + t[1] + "</p></div>"; }).join("") + "</div>";
    var ins = insights(a);
    if (ins.length) html += "<p class='sect left'>Pour toi</p><div class='advice'>" + ins.map(function (t) { return "<details><summary>" + esc(t[0]) + "</summary><p>" + esc(t[1]) + "</p></details>"; }).join("") + "</div>";
    return html;
  };

  // ---------- Contenus Sunsoari (articles, vidéos, posts) et favoris ----------
  // Liste extensible : window.SUNSOARI_CONTENT = [{ id, type: "video"|"post"|"article", title, url, img, src }]
  A.contentItems = function () {
    var items = [];
    STORIES.forEach(function (st, i) { items.push({ id: "story:" + i, type: "article", title: st.title, sub: st.rub, open: "data-story='" + i + "'", img: st.img ? photo(st.img) : "" }); });
    Object.keys(TUTOS).forEach(function (k) { items.push({ id: "tuto:" + k, type: "video", title: TUTOS[k].title, sub: "Tutoriel", open: "data-tuto='" + k + "'" }); });
    GUIDES.forEach(function (g, i) { items.push({ id: "guide:" + i, type: "article", title: g.title, sub: g.tag, open: "data-guide='" + i + "'" }); });
    (window.SUNSOARI_CONTENT || []).forEach(function (c) { if (c && c.id && c.url) items.push({ id: "ext:" + c.id, type: c.type || "post", title: c.title || "", sub: c.src || "", url: c.url, img: c.img || "" }); });
    return items;
  };
  A.favBtn = function (id) { var on = this.state.favs.indexOf(id) > -1; return "<button class='favbtn' data-fav='" + esc(id) + "' aria-pressed='" + on + "' aria-label='" + (on ? "Retirer de mes favoris" : "Ajouter à mes favoris") + "'>" + (on ? "♥" : "♡") + "</button>"; };
  A.contentRow = function (c) {
    var go = c.url ? "<a class='crow-main' href='" + esc(c.url) + "' target='_blank' rel='noopener'>" : "<button class='crow-main' " + c.open + ">";
    return "<div class='crow'>" + go + (c.img ? "<img src='" + esc(c.img) + "' alt=''>" : "<i class='cico'>" + icon(c.type === "video" ? "sun" : c.type === "post" ? "heart" : "leaf") + "</i>") + "<span><small>" + esc({ video: "Vidéo", post: "Post", article: "Article" }[c.type] + (c.sub ? " · " + c.sub : "")) + "</small><b>" + esc(c.title) + "</b></span>" + (c.url ? "</a>" : "</button>") + this.favBtn(c.id) + "</div>";
  };
  // ---------- Mon compte ----------
  A.vCompte = function () {
    var s = this.state, self = this, name = this.host.getAttribute("data-customer-name"), a = s.answers;
    var html = this.widget ? "" : "<div class='todayhead'><h3>Mon compte</h3></div>";
    if (!this.widget) {
      if (name) html += "<div class='acct'><b>Bonjour " + esc(name) + "</b><p>Ton diagnostic, ta routine et tes favoris sont liés à ton compte Sunsoari.</p><div class='acts'><a class='btn ghost' href='" + esc(this.shop) + "/account' target='_top'>Mes commandes</a><a class='btn link' href='" + esc(this.shop) + "/account/logout' target='_top'>Me déconnecter</a></div></div>";
      else html += "<div class='acct'><b>Connecte-toi</b><p>Pour retrouver ton diagnostic, ta routine, ton suivi et tes favoris sur ton téléphone et ton ordinateur.</p><div class='acts'><a class='btn' href='" + esc(this.host.getAttribute("data-login-url") || this.shop + "/account/login") + "' target='_top'>Me connecter</a><a class='btn ghost' href='" + esc(this.host.getAttribute("data-register-url") || this.shop + "/account/register") + "' target='_top'>Créer mon compte</a></div><small>Sans compte, tout reste enregistré sur cet appareil.</small></div>";
      if (s.done && !name && !s.emailSent && !s.answers.email) html += "<button class='reco-card' data-act='finopen'><b>Reçois ta routine par e-mail</b><span>Et crée ton espace pour le retrouver partout</span></button>";
      if (s.done) html += "<button class='reco-card' data-view='reveal'><b>" + (a.prenom ? esc(a.prenom) + ", ta routine" : "Ma routine") + "</b><span>Diagnostic du " + new Date(s.doneAt || Date.now()).toLocaleDateString("fr-FR") + "</span></button>";
    }
    var tab = this.ftab || "produits", tabs = [["produits", "Produits"], ["article", "Articles"], ["video", "Vidéos"], ["post", "Posts"]];
    html += "<p class='sect left'>Mes favoris</p><div class='seg-tabs'>" + tabs.map(function (t) { return "<button data-ftab='" + t[0] + "' aria-pressed='" + (tab === t[0]) + "'>" + t[1] + "</button>"; }).join("") + "</div>";
    if (tab === "produits") {
      var list = s.wish.map(byId).filter(Boolean);
      if (!list.length) html += "<p class='empty'>Touche ♡ sur un produit pour le retrouver ici.</p>";
      else {
        html += "<div class='list'>" + list.map(function (p) { return self.rowProduct(p); }).join("") + "</div>";
        if (list.some(function (p) { return p.own; })) html += "<button class='btn big' data-act='addallcart'>Ajouter mes produits Sunsoari au panier</button>";
      }
    } else {
      var items = this.contentItems().filter(function (c) { return c.type === tab && s.favs.indexOf(c.id) > -1; });
      html += items.length ? "<div class='clist'>" + items.map(function (c) { return self.contentRow(c); }).join("") + "</div>" : "<p class='empty'>Touche ♡ sur " + ({ article: "un article ou un guide", video: "une vidéo ou un tutoriel", post: "un post" })[tab] + " pour le garder ici.</p>";
    }
    return html;
  };

  // ---------- Ressources ----------
  A.vRessources = function () {
    var self = this, tabs = [["guides", "Guides"], ["ingredients", "Ingrédients"], ["tendances", "Tendances"]];
    var html = "<div class='todayhead'><h3>Ressources</h3></div><div class='seg-tabs'>" + tabs.map(function (t) { return "<button data-rstab='" + t[0] + "' aria-pressed='" + (self.rsTab === t[0]) + "'>" + t[1] + "</button>"; }).join("") + "</div>";
    if (this.rsTab === "ingredients") return html + this.vIngredients();
    if (this.rsTab === "tendances") return html + this.vTrends();
    if (this.guide) return html + this.vGuide();
    ["Sunsoari", "Mythe ou vérité", "Académie"].forEach(function (rub) {
      html += "<p class='sect left'>" + esc(rub) + "</p><div class='carousel stories'>" + STORIES.map(function (st, i) { return st.rub === rub ? "<button class='storycard " + st.tone + (st.img ? " ph" : "") + "' data-story='" + i + "'" + (st.img ? " style=\"background-image:linear-gradient(180deg,rgba(251,248,243,0) 35%,rgba(251,248,243,.92) 78%),url('" + photo(st.img) + "')\"" : "") + "><span class='tag'>" + (rub === "Mythe ou vérité" ? "Mythe ou vérité" : rub === "Académie" ? "Académie" : "Sunsoari") + " · " + st.slides.length + " écrans</span><b>" + esc(st.title) + "</b></button>" : ""; }).join("") + "</div>";
    });
    html += "<p class='sect left'>Tutoriels</p><div class='carousel stories'>" + Object.keys(TUTOS).map(function (k) { return "<button class='storycard water' data-tuto='" + k + "'><span class='tag'>Tutoriel · " + TUTOS[k].slides.length + " étapes</span><b>" + esc(TUTOS[k].title) + "</b></button>"; }).join("") + "</div><p class='sect left'>Guides</p>";
    var feed = this.contentItems();
    html += "<p class='sect left'>À garder en favoris</p><div class='clist'>" + feed.filter(function (c) { return c.type !== "article" || c.id.indexOf("story:") === 0; }).slice(0, 14).map(function (c) { return self.contentRow(c); }).join("") + "</div>";
    html += "<div class='guides'>" + GUIDES.map(function (g, i) { return "<button class='guide' data-guide='" + i + "'><span class='tag'>" + esc(g.tag) + "</span><b>" + esc(g.title) + "</b><small>" + esc(g.sub) + "</small></button>"; }).join("") + "</div>";
    return html + "<p class='note'>Tous les guides Sunsoari sont gratuits.</p>";
  };
  A.vStory = function () {
    var st = this.story, data = st.tuto ? { title: TUTOS[st.tuto].title, tone: "water", slides: TUTOS[st.tuto].slides } : STORIES[st.i], sl = data.slides[st.s];
    var lab = { mythe: "Mythe", verite: "Vérité", astuce: "Astuce", etape: "Étape" }[sl.k] || "";
    var html = "<div class='storyview " + data.tone + "' role='dialog' aria-label='" + esc(data.title) + "'><div class='sbar'>" + data.slides.map(function (x, i) { return "<i class='" + (i < st.s ? "done" : i === st.s ? "now" : "") + "'></i>"; }).join("") + "</div>";
    html += "<div class='shead'><span>" + esc(data.title) + "</span>" + this.favBtn(st.tuto ? "tuto:" + st.tuto : "story:" + st.i) + "<button class='x light' data-act='closestory' aria-label='Fermer'>×</button></div>";
    html += "<div class='sbody'>" + (lab ? "<span class='slab " + sl.k + "'>" + lab + "</span>" : "") + "<h3>" + esc(sl.t) + "</h3>" + (sl.d ? "<p>" + esc(sl.d) + "</p>" : "") + "</div>";
    html += "<button class='snav prev' data-act='storyprev' aria-label='Écran précédent'></button><button class='snav next' data-act='storynext' aria-label='Écran suivant'></button>";
    html += "<p class='shint'>" + (st.s < data.slides.length - 1 ? "Touche à droite pour continuer" : "Touche pour terminer") + "</p></div>";
    return html;
  };
  A.vGuide = function () {
    var g = GUIDES[this.guide.i];
    return "<button class='btn link' data-guide='close'>← Tous les guides</button>" + this.favBtn("guide:" + this.guide.i) + "<div class='guideview'><span class='tag'>" + esc(g.tag) + "</span><h3>" + esc(g.title) + "</h3>" + g.days.map(function (d) { return "<div class='gday'><b>" + esc(d[0]) + "</b><p>" + esc(d[1]) + "</p></div>"; }).join("") + "</div>";
  };
  A.vIngredients = function () {
    var self = this;
    return "<div class='inglist'>" + Object.keys(ING).map(function (k) { var i = ING[k]; return "<button class='ingrow' data-ing='" + k + "'><span><b>" + esc(i.n) + "</b><small>" + esc(i.f) + " · " + esc(i.reg) + "</small></span></button>"; }).join("") + "</div>";
  };
  A.vTrends = function () {
    var self = this;
    return "<div class='grid2'>" + TRENDS.map(function (t) { return "<div class='trend-card'><span class='tag'>" + esc(t.reg) + "</span><p class='pt'>" + esc(t.t) + "</p><p class='pp'>" + esc(t.d) + "</p><p class='why'>Notre avis : " + esc(t.avis) + "</p>" + (t.act.length ? self.actChips(t.act) : "") + "</div>"; }).join("") + "</div><p class='note'>Sources : " + TREND_SOURCES.map(function (s) { return "<a href='" + s[1] + "' target='_blank' rel='noopener'>" + esc(s[0]) + "</a>"; }).join(" · ") + "</p>";
  };

  // ---------- Assistante ----------
  A.vAssistant = function () {
    var html = "<div class='todayhead'><h3>Assistante</h3>" + (AI.mode === "none" ? "<span class='goal'>Réponses de base</span>" : "") + "</div><div class='chatlog'>";
    if (!this.chat.length) html += "<div class='bubble bot'>Coucou ! Je connais ton profil et le catalogue Sunsoari. Pose-moi une question sur ta routine, un ingrédient ou un produit.</div>";
    this.chat.forEach(function (m) { html += "<div class='bubble " + (m.role === "user" ? "me" : "bot") + "'>" + esc(m.content) + "</div>"; });
    if (this.busy) html += "<div class='bubble bot typing'>" + esc(this.typing || "L'assistante écrit…") + "</div>";
    html += "</div><div class='qgrid'>" + ["Comment introduire un nouvel actif ?", "Ma routine convient-elle à l'été ?", "Quels sont les signes d'une barrière cutanée fragilisée ?"].map(function (q) { return "<button class='qchip' data-ask='" + esc(q) + "'>" + esc(q) + "</button>"; }).join("") + "</div>";
    html += "<form class='chatform' data-form='chat'><input id='chatin' placeholder='Pose ta question…' autocomplete='off'" + (this.busy ? " disabled" : "") + "><button class='btn' aria-label='Envoyer'" + (this.busy ? " disabled" : "") + ">↑</button></form>";
    return html + "<p class='note'>Conseils cosmétiques généraux, pas d'avis médical.</p>";
  };
  A.profileText = function () {
    var a = this.state.answers, t = tagsOf(a).map(function (x) { return TAG_LABEL[x]; }).filter(Boolean);
    var R = buildRoutine(a), names = ["matin", "soir", "hebdo", "cheveux", "douche"].map(function (k) { return k + " : " + R[k].map(function (it) { var p = byId(it.id); return p ? p.brand + " " + p.name : ""; }).join(", "); }).join(" | ");
    var cat = allProducts().map(function (p) { return p.brand + " " + p.name + " [" + (p.act || []).map(function (x) { return ING[x] ? ING[x].n : x; }).join(", ") + "]" + (p.own ? " (vendu par Sunsoari)" : ""); }).join("; ");
    var sp = skinProfile(a);
    return "Profil de la cliente : " + (a.genre ? "genre " + a.genre + ", " : "") + (a.age ? a.age + " ans, " : "") + (a.rythme ? "rythme : " + a.rythme + ", " : "") + (a.budgetSoin ? "budget mensuel " + a.budgetSoin + ", " : "") + (t.join(", ") || "non renseigné") + (sp ? ". Test de peau : " + SKIN_INFO[sp.type].t + (sp.deshy ? ", déshydratée" : "") + (sp.sensible ? ", sensible" : "") + ". Saisons : " + (a.saisons || []).join(", ") + ". Quotidien : " + (a.modeVie || []).join(", ") + ". Antécédents : " + (a.antecedents || []).join(", ") : ". Type de peau inconnu : aide-la à le découvrir") + ". Eau : " + (a.eau || "?") + ". Sa routine : " + names + ". Catalogue : " + cat + ".";
  };
  A.ask = function (question, pid) {
    var self = this, p = pid ? byId(pid) || (this.scan && this.scan.result) : null;
    this.view = "assistant"; this.detail = null;
    this.chat.push({ role: "user", content: question }); this.busy = true; this.typing = null; this.render();
    var ctx = p ? " (à propos de " + (p.brand + " " + p.name).trim() + ", ingrédients repérés : " + (p.act || []).map(function (x) { return ING[x] ? ING[x].n : x; }).join(", ") + ")" : "";
    if (AI.mode === "none") {
      setTimeout(function () { self.chat.push({ role: "assistant", content: self.localAnswer(question, p) }); self.busy = false; self.render(); }, 300);
      return;
    }
    var turns = [{ role: "user", content: RULES + "\n\n" + this.profileText() }].concat(this.chat.slice(-8));
    turns[turns.length - 1] = { role: "user", content: question + ctx };
    aiCall(turns, { cache: false, modelTier: "default", onText: function (u) { self.typing = u.text; var el = self.root.querySelector(".typing"); if (el) el.textContent = u.text; } }, false)
      .then(function (text) { self.chat.push({ role: "assistant", content: text }); }, function (e) { self.chat.push({ role: "assistant", content: (e && e.text) || self.localAnswer(question, p) + (e && e.code === "not_granted" ? "" : " (" + (AI_ERR[e && e.code] || AI_ERR.upstream_error) + ")") }); })
      .then(function () { self.busy = false; self.typing = null; self.render(); });
  };
  // Réponses sans IA : on s'appuie sur les données de l'application.
  A.localAnswer = function (q, p) {
    var lq = q.toLowerCase(), a = this.state.answers;
    if (p && lq.indexOf("fréquence") > -1) return STEP_FREQ[p.step] || "Suis les indications de l'emballage et commence doucement.";
    if (p && lq.indexOf("sensible") > -1) { var s = fitScore(p, a); return s.tol >= 80 ? "Pour ton profil, rien de particulier n'est signalé dans ses ingrédients. Fais quand même un test sur une petite zone." : "Prudence : " + s.notes.filter(function (n) { return n[0] === "warn"; }).map(function (n) { return n[1]; }).join(" "); }
    if (p && lq.indexOf("plutôt") > -1) { var alt = alternatives(p, a, 1)[0]; return this.whyFor(p, fitScore(p, a)) + (alt ? " L'option suivante pour toi serait " + alt.p.brand + " " + alt.p.name + " (" + alt.s + " %)." : ""); }
    var hit = Object.keys(ING).filter(function (k) { return lq.indexOf(ING[k].n.toLowerCase().split(" ")[0]) > -1; })[0];
    if (hit) return ING[hit].n + " : " + ING[hit].what + " " + ING[hit].use + " À savoir : " + ING[hit].care;
    if (lq.indexOf("mélanger") > -1) return "Évite de superposer le même soir rétinoïdes et acides exfoliants (AHA, BHA), ou vitamine C et acides si ta peau picote. Alterne les soirs, et protection solaire chaque matin.";
    if (lq.indexOf("shift") > -1) return "SHIFT associe filtration et capsules d'aromathérapie aux actifs hydratants : idéal pour un rituel sensoriel. Ses capsules contiennent des huiles essentielles ; si ta peau y réagit ou si tu préfères sans senteur, Onsha propose une version sans senteur.";
    return "Je réponds au mieux avec les infos de l'application. Pour une réponse plus complète, l'assistante IA doit être activée sur le site.";
  };

  // ---------- Fiche produit et fiche ingrédient ----------
  A.vDetail = function (id) {
    var p = byId(id) || ((this.state.scans.filter(function (x) { return x.id === id; })[0] || {}).p);
    if (!p) return "";
    var s = fitScore(p, this.state.answers), R = recommend(this.state.answers);
    var html = "<div class='sheetbg' data-act='closedetail'></div><div class='sheet' role='dialog' aria-label='" + esc(p.name) + "'><button class='x' data-act='closedetail' aria-label='Fermer'>×</button><span class='tag'>" + esc(p.brand) + (p.origin ? " · " + esc(p.origin) : "") + "</span><h3>" + esc(p.name) + "</h3>" + this.scoreBadge(s);
    html += "<div class='subscores'>" + [["Tolérance", s.tol], ["Tes objectifs", s.obj], ["Ton type", s.type]].map(function (x) { return "<span><b>" + x[1] + "</b><small>" + x[0] + "</small></span>"; }).join("") + "</div>";
    html += "<p>" + esc(this.whyFor(p, s)) + "</p>" + this.actChips(p.act);
    if (p.founder) html += "<p class='revnote'><span class='made fnd'>" + esc(p.founder) + "</span></p>";
    if ((p.rev || []).length) html += "<p class='revnote'>" + p.rev.map(function (r) { return "<span class='made rev'>" + esc(REV_LABEL[r]) + "</span>"; }).join("") + "<small>Repère de réputation publique, pas un avis vérifié Sunsoari. Les avis de nos clientes, par type de peau et carnation, arrivent bientôt.</small></p>";
    if (p.step && STEP_FREQ[p.step]) html += "<p class='care'><b>Comment l'utiliser :</b> " + esc(STEP_FREQ[p.step]) + "</p>";
    var tk = TUTOS[p.step] ? p.step : p.step === "douche" ? "douche" : p.step === "nettoyant" ? "demaquillant" : null;
    if (tk) html += "<button class='btn ghost' data-tuto='" + tk + "'>▶ Tutoriel : " + esc(TUTOS[tk].title) + "</button>";
    html += "<div class='acts'>" + (p.own ? "<a class='btn' href='" + this.cartUrl(p.key, R.scent) + "' target='_top' data-add='" + p.id + "'>Ajouter au panier · " + euro(p.price) + "</a>" : p.id.indexOf("x:") ? "<a class='btn' href='" + esc(this.extUrl(p)) + "' target='_blank' rel='noopener' data-ext='" + p.id + "'>Où l'acheter ↗</a>" : "") + "<button class='btn ghost' data-shelf='" + p.id + "'>" + (this.state.shelf.indexOf(p.id) > -1 ? "Sur mon étagère ✓" : "Ajouter à mon étagère") + "</button><button class='btn ghost' data-wish='" + p.id + "'>" + (this.state.wish.indexOf(p.id) > -1 ? "♥ Dans mes souhaits" : "♡ Souhaits") + "</button></div>";
    html += "<div class='qchips'>" + this.questionsFor(p).map(function (q) { return "<button class='qchip' data-ask='" + esc(q) + "' data-pid='" + p.id + "'>" + esc(q) + "</button>"; }).join("") + "</div>";
    if (!p.own && p.id.indexOf("x:")) html += "<p class='note'>Marque non vendue par Sunsoari et non partenaire. Vérifie la liste d'ingrédients sur l'emballage : les formules varient selon les pays.</p>";
    return html + "</div>";
  };
  A.vSheet = function (k) {
    var i = ING[k], prods = allProducts().filter(function (p) { return (p.act || []).indexOf(k) > -1; });
    return "<div class='sheetbg' data-act='closesheet'></div><div class='sheet top' role='dialog' aria-label='" + esc(i.n) + "'><button class='x' data-act='closesheet' aria-label='Fermer'>×</button><span class='tag'>" + esc(i.f) + " · " + esc(i.reg) + "</span><h3>" + esc(i.n) + "</h3><p><b>C'est quoi ?</b> " + esc(i.what) + "</p><p><b>À quoi ça sert ?</b> " + esc(i.use) + "</p><p class='care'><b>À savoir :</b> " + esc(i.care) + "</p>" + (prods.length ? "<p><b>Dans :</b> " + prods.map(function (p) { return esc(p.brand + " " + p.name); }).join(" · ") + "</p>" : "") + "<button class='qchip' data-ask='" + esc("Est-ce que " + i.n + " convient à ma peau ?") + "'>Est-ce que ça convient à ma peau ?</button></div>";
  };

  // ---------- Interactions ----------
  A.onClick = function (e) {
    var t = e.target.closest ? e.target.closest("button,a,label") : null;
    if (!t) return;
    var d = t.dataset, s = this.state, self = this;
    if (d.act === "closesheet") { this.sheet = null; return this.render(); }
    if (d.act === "closedetail") { this.detail = null; return this.render(); }
    if (d.ask) { this.sheet = null; return this.ask(d.ask, d.pid || (d.scanctx ? (this.scan && this.scan.result && this.scan.result.id) : null)); }
    if (d.ing) { this.sheet = d.ing; return this.render(); }
    if (d.detail) { this.detail = d.detail; return this.render(); }
    if (d.view && this.cam) this.camStop();
    if (d.view) { this.view = d.view; this.detail = null; this.zone = null; this.aiMsg = null; if (d.view === "scan" && this.scan && this.scan.result) this.scan = null; return this.render(); }
    if (d.plan) { this.plan = d.plan; this.plusMsg = null; return this.render(); }
    if (d.pay) { this.pay = d.pay; this.plusMsg = null; return this.render(); }
    if (d.act === "plusdemo") { this.plusMsg = "Démo : le paiement sera actif sur la version en ligne (" + (PAY.filter(function (m) { return m[0] === (self.pay || "applepay"); })[0] || PAY[0])[1] + ", " + PLANS[this.plan || "annuel"].label.toLowerCase() + ")."; return this.render(); }
    if (d.mode) { s.answers.format = d.mode; this.save(); return this.render(); }
    if (d.rtab) { this.rtab = d.rtab; return this.render(); }
    if (d.ptab) { this.ptab = d.ptab; return this.render(); }
    if (d.rstab) { this.rsTab = d.rstab; this.guide = null; return this.render(); }
    if (d.story) { this.story = { i: +d.story, s: 0 }; return this.render(); }
    if (d.tuto) { this.detail = null; this.story = { tuto: d.tuto, s: 0 }; return this.render(); }
    if (d.act === "closestory") { this.story = null; return this.render(); }
    if (d.act === "storyprev") { this.story.s = Math.max(0, this.story.s - 1); return this.render(); }
    if (d.act === "storynext") { var len = this.story.tuto ? TUTOS[this.story.tuto].slides.length : STORIES[this.story.i].slides.length; if (this.story.s < len - 1) this.story.s++; else this.story = null; return this.render(); }
    if (d.guide) { this.guide = d.guide === "close" ? null : { i: +d.guide }; return this.render(); }
    if (d.wish) { var w = s.wish.indexOf(d.wish); if (w > -1) s.wish.splice(w, 1); else s.wish.push(d.wish); this.save(); return this.render(); }
    if (d.shelf) { var h = s.shelf.indexOf(d.shelf); if (h > -1) s.shelf.splice(h, 1); else s.shelf.push(d.shelf); this.save(); return this.render(); }
    if (d.mood) { s.journal[iso()] = d.mood; this.save(); if (d.mood <= "2") this.chat.push({ role: "assistant", content: "Ta peau traverse un jour difficile. Garde une routine douce : nettoyant doux, hydratant, protection solaire, et pas de nouvel actif aujourd'hui. Si l'inconfort dure, parles-en à un ou une dermatologue." }); return this.render(); }
    if (d.check) { var parts = d.check.split("|"), day = s.checks[iso()] = s.checks[iso()] || {}, l = day[parts[0]] = day[parts[0]] || [], j = l.indexOf(parts[1]); if (j > -1) l.splice(j, 1); else l.push(parts[1]); this.save(); return this.render(); }
    if (d.first) { if (d.first === "diag") { this.view = "diag"; this.step = 0; } else if (d.first === "shelf") { this.view = "reveal"; } else this.view = d.first; return this.render(); }
    if (d.zone) { this.zone = this.zone === d.zone ? null : d.zone; return this.render(); }
    if (d.obs) { var m = s.answers[d.pq] || {}, li = (m[this.zone] || []).slice(), k = li.indexOf(d.obs); if (k > -1) li.splice(k, 1); else li.push(d.obs); if (li.length) m[this.zone] = li; else delete m[this.zone]; s.answers[d.pq] = m; this.save(); return this.render(); }
    if (d.q) {
      var q = QUESTIONS.filter(function (x) { return x.id === d.q; })[0];
      if (q.multi) {
        var cur = (s.answers[q.id] || []).slice(), i = cur.indexOf(d.v);
        if (i > -1) cur.splice(i, 1); else if (q.none && d.v === q.none) cur = [d.v]; else { cur = cur.filter(function (v) { return v !== q.none; }); if (q.max && cur.length >= q.max) cur.shift(); cur.push(d.v); }
        s.answers[q.id] = cur;
        var sp2 = skinProfile(s.answers); if (sp2) s.answers.peau = sp2.peau;
        this.save(); return this.render();
      }
      s.answers[q.id] = d.v;
      var sp = skinProfile(s.answers); if (sp) s.answers.peau = sp.peau;
      this.save(); this.render();
      if (this.step < this.visibleQuestions().length - 1) { clearTimeout(this.adv); this.adv = setTimeout(function () { self.step++; self.zone = null; self.aiMsg = null; self.render(); }, 260); }
      return;
    }
    if (d.act === "prev") { this.step = Math.max(0, this.step - 1); this.zone = null; this.aiMsg = null; return this.render(); }
    if (d.act === "next") { this.dictMsg = null;
      if (this.step < this.visibleQuestions().length - 1) { this.step++; this.zone = null; this.aiMsg = null; }
      else { s.done = true; s.doneAt = Date.now(); this.saveDay0(); this.save(); this.view = "espace"; this.etab = "routine"; this.emit("result", { answers: s.answers }); }
      return this.render();
    }
    if (d.act === "aiphoto") return this.aiPhoto(d.target, d.pq);
    if (d.act === "peaudone") {
      var marksNow = s.answers.photoVisage || {}, n = Object.keys(marksNow).reduce(function (t, z) { return t + marksNow[z].length; }, 0);
      (s.keepThumb ? this.makeThumb() : Promise.resolve("")).then(function (thumb) {
        s.skinLog = [{ at: Date.now(), marks: marksNow, n: n, goal: self.goalLabel().replace("Objectif : ", ""), thumb: thumb }].concat(s.skinLog || []).slice(0, 24);
        s.steps.peau = true; self.save(); self.zone = null; self.aiMsg = null; self.render();
      });
      return;
    }
    if (d.sf) { this.skinFilter = d.sf; return this.render(); }
    if (d.dellog) { s.skinLog.splice(+d.dellog, 1); this.save(); return this.render(); }
    if (d.act === "addroutine") { var R = buildRoutine(s.answers); ["matin", "soir", "hebdo", "cheveux"].forEach(function (k) { R[k].forEach(function (it) { if (s.shelf.indexOf(it.id) < 0) s.shelf.push(it.id); }); }); this.save(); t.textContent = "Ajoutée ✓"; return; }
    if (d.act === "planreset") { s.planStart = Date.now(); this.save(); return this.render(); }
    if (d.act === "restart") { s.answers = {}; s.done = false; this.save(); this.step = 0; this.view = "diag"; return this.render(); }
    if (d.act === "scanpaste") { this.scan = { mode: "paste" }; return this.render(); }
    if (d.act === "scanbar") { this.scan = { mode: "bar" }; return this.render(); }
    if (d.act === "camscan") return this.camScan();
    if (d.act === "voicestart") return this.voiceStart();
    if (d.act === "finsend") return this.finSend();
    if (d.act === "finskip") return this.finishDiag();
    if (d.act === "finopen") { var qf = this.visibleQuestions(); this.view = "diag"; this.step = qf.length - 1; return this.render(); }
    if (d.dictate) { e.preventDefault(); return this.dictate(d.dictate); }
    if (d.act === "voicestop") { if (this.recog) try { this.recog.stop(); } catch (e) {} this.voice.rec = false; return this.render(); }
    if (d.act === "voicefill") return this.voiceFill();
    if (d.act === "voicego") { if (this.recog) try { this.recog.stop(); } catch (e) {} var qs3 = this.visibleQuestions(), a3 = s.answers, k3 = 1; for (; k3 < qs3.length; k3++) { var q3 = qs3[k3]; if (q3.type || !(q3.multi ? (a3[q3.id] || []).length : a3[q3.id])) break; } this.step = this.voiceFilled && this.voiceFilled.length ? k3 : 1; return this.render(); }
    if (d.capmode) { this.cap.mode = d.capmode; this.capMsg = null; return this.render(); }
    if (d.act === "capanalyse") return this.capAnalyse();
    if (d.capobs) { var pv = s.answers.photoVisage = s.answers.photoVisage || {}, vu = pv.vu = pv.vu || [], ix = vu.indexOf(d.capobs); if (ix > -1) vu.splice(ix, 1); else vu.push(d.capobs); this.save(); return this.render(); }
    if (d.etab) { this.etab = d.etab; return this.render(); }
    if (d.emode) { this.emode = d.emode; return this.render(); }
    if (d.pmark) { var pp = d.pmark.split("|"), pl = s.planner = s.planner || {}, dy = pl[pp[0]] = pl[pp[0]] || {}; dy[pp[1]] = dy[pp[1]] === pp[2] ? undefined : pp[2]; this.save(); return this.render(); }
    if (d.pmonth) { this.pmonth = d.pmonth; return this.render(); }
    if (d.pday) { this.pday = d.pday; return this.render(); }
    if (d.evofeel) { this.evoDraft.feel = this.evoDraft.feel === d.evofeel ? "" : d.evofeel; return this.render(); }
    if (d.evotag) { var tg = this.evoDraft.tags, ti = tg.indexOf(d.evotag); if (ti > -1) tg.splice(ti, 1); else tg.push(d.evotag); return this.render(); }
    if (d.act === "evosave") { var dr = this.evoDraft; s.evo = s.evo || []; s.evo.push({ at: new Date(dr.date + "T12:00:00").getTime(), photos: dr.photos.slice(), feel: dr.feel, tags: dr.tags.slice(), note: dr.note }); s.evo.sort(function (x, y) { return x.at - y.at; }); s.evo = s.evo.slice(-24); this.evoDraft = null; this.save(); return this.render(); }
    if (d.evodel) { s.evo.splice(+d.evodel, 1); this.save(); return this.render(); }
    if (d.act === "editactuels") { var qs2 = this.visibleQuestions(), ix = qs2.map(function (q) { return q.id; }).indexOf("actuels"); this.view = "diag"; this.step = Math.max(0, ix); return this.render(); }
    if (d.act === "copysum") { var txt = this.summaryText(), self2 = this; var ok = function () { self2.copyMsg = "Réponses copiées. Colle-les dans ton message à Sunsoari."; self2.render(); }; try { navigator.clipboard.writeText(txt).then(ok, function () { self2.copyMsg = "Copie impossible ici : ouvre WhatsApp, tes réponses y sont déjà."; self2.render(); }); } catch (e) { this.copyMsg = "Copie impossible ici."; this.render(); } return; }
    if (d.fav) { var f = s.favs.indexOf(d.fav); if (f > -1) s.favs.splice(f, 1); else s.favs.push(d.fav); this.save(); return this.render(); }
    if (d.ftab) { this.ftab = d.ftab; return this.render(); }
    if (d.act === "addallcart") { var ids = s.wish.map(byId).filter(function (p) { return p && p.own; }).map(function (p) { var v = P[p.key].variants; return (v.all || v[Object.keys(v)[0]]) + ":1"; }); if (ids.length) window.open(this.shop + "/cart/" + ids.join(",") + "?utm_source=mon-rituel&utm_medium=app", "_top"); return; }
    if (d.act === "camstop") { this.camStop(); return this.render(); }
    if (d.act === "scannew") { this.scan = null; return this.render(); }
    if (d.act === "scanshelf") { var sid = this.scan.result.id; if (s.shelf.indexOf(sid) < 0) s.shelf.push(sid); this.save(); t.textContent = "Sur mon étagère ✓"; return; }
    if (d.ext) { this.emit("external_click", { product: d.ext }); return; }
    if (d.add) {
      this.emit("add_to_cart", { product: d.add });
      if (window.Shopify && window.Shopify.shop && location.origin === this.shop) {
        e.preventDefault();
        var href = t.getAttribute("href"), vid = +href.split("/cart/")[1].split(":")[0];
        fetch("/cart/add.js", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: [{ id: vid, quantity: 1 }] }) })
          .then(function (r) { if (!r.ok) throw r; t.textContent = "Ajouté ✓"; document.dispatchEvent(new CustomEvent("cart:refresh")); })
          .catch(function () { location.href = href; });
      }
    }
  };
  A.onChange = function (e) {
    var d = e.target.dataset, f = e.target.files && e.target.files[0];
    if (d.photo && f) { if (this.photos[d.photo]) URL.revokeObjectURL(this.photos[d.photo]); this.photos[d.photo] = URL.createObjectURL(f); this.photoFiles = this.photoFiles || {}; this.photoFiles[d.photo] = f; this.aiMsg = null; return this.render(); }
    if (d.scanphoto && f) return this.scanPhoto(f);
    var self3 = this;
    if (d.capslot && f) { this.cap.files[d.capslot] = f; this.capMsg = null; fileThumb(f, 240).then(function (t) { self3.cap.thumbs[d.capslot] = t; self3.render(); }); return; }
    if (d.capvideo && f) { this.capMsg = "Préparation de ta vidéo…"; this.render(); videoFrames(f, 5).then(function (fr) { self3.cap.frames = fr; self3.capMsg = null; self3.render(); }, function () { self3.capMsg = "Impossible de lire cette vidéo ici. Essaie les 3 photos."; self3.render(); }); return; }
    if (d.finok) { this.fin.ok = e.target.checked; return this.render(); }
    if (d.finnews) { this.fin.news = e.target.checked; return; }
    if (d.keepcap) { this.state.keepCap = e.target.checked; if (this.state.keepCap && this.state.analysis) this.saveDay0(); this.save(); return; }
    if (d.evophoto && f) { fileThumb(f, 240).then(function (t) { self3.evoDraft.photos[+d.evophoto] = t; self3.render(); }); return; }
    if (d.codephoto && f) { if (this.cam) { this.cam.msg = "Lecture de la photo…"; } return this.codeFromPhoto(f); }
    if (d.keepthumb) { this.state.keepThumb = e.target.checked; this.save(); return; }
    if (d.refill) { var st = this.state.refills[d.refill] || {}; st[d.f] = e.target.value; this.state.refills[d.refill] = st; this.save(); this.render(); }
  };
  A.onSubmit = function (e) {
    var form = e.target.dataset.form, $ = function (id) { var el = e.target.querySelector("#" + id); return el ? el.value.trim() : ""; };
    if (form === "chat") { var v = $("chatin"); if (v) this.ask(v); return; }
    if (form === "paste") { var txt = $("inci"); if (txt.length < 10) { this.scan = { mode: "paste", text: txt, error: "Colle la liste complète des ingrédients (INCI)." }; return this.render(); } this.finishScan("", $("pname"), txt, ""); return this.render(); }
    if (form === "bar") { var ean = $("ean").replace(/\D/g, ""); if (ean.length < 8) { this.scan = { mode: "bar", ean: ean, error: "Le code-barres compte 8 à 13 chiffres." }; return this.render(); } return this.scanBarcode(ean); }
  };

  function loadFonts() {
    if (document.getElementById("sunsoari-rituel-fonts")) return;
    var l = document.createElement("link"); l.id = "sunsoari-rituel-fonts"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Figtree:wght@400;600&family=Instrument+Serif&display=swap";
    document.head.appendChild(l);
  }
  function init() {
    loadFonts();
    var hosts = document.querySelectorAll("#sunsoari-rituel, [data-sunsoari-rituel]");
    for (var i = 0; i < hosts.length; i++) if (!hosts[i].__sunsoari) hosts[i].__sunsoari = new App(hosts[i]);
  }
  window.SunsoariRituel = { init: init, recommend: recommend, routinePlan: routinePlan, fitScore: fitScore, parseInci: parseInci, catalog: P, otherBrands: EXT, ingredients: ING };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
