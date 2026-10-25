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
    { id: "daenggi", brand: "Daeng Gi Meo Ri", name: "Ki Gold Energizing Shampoo", origin: "Corée", zone: "cuir", step: "shampoing", act: ["ginseng"], for: ["cuirOk", "cuirGras", "fins"], avoid: [], desc: "Shampoing coréen aux extraits de plantes de la pharmacopée traditionnelle." }
  ];

  var STEP_LABEL = { essence: "Essence", nuit: "Masque de nuit", masquev: "Masque visage", demaquillant: "Démaquillage", nettoyant: "Nettoyant", tonique: "Tonique", serum: "Sérum", exfoliant: "Exfoliant (1 à 2 fois par semaine)", yeux: "Contour des yeux", hydratant: "Hydratant", spf: "Protection solaire", corps: "Soin du corps", huile: "Huile", shampoing: "Shampoing", soin: "Soin cheveux sans rinçage", masque: "Masque cheveux" };

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
    { id: "lieu", sec: 0, title: "Où prends-tu ta douche le plus souvent ?", sub: "On te propose le bon format : à installer chez toi ou à emporter.",
      options: [["maison", "Chez moi", "Ma douche de tous les jours", "home"], ["voyage", "Souvent en déplacement", "Hôtel, location, salle de sport", "plane"], ["deux", "Les deux", "Chez moi et en voyage", "both"]] },
    { id: "flexible", sec: 0, title: "Ta douche a-t-elle une douchette reliée à un flexible ?", sub: "C'est là que se vissent nos pommeaux et nos coques.",
      options: [["oui", "Oui", "Un tuyau souple et une douchette", "shower"], ["non", "Non", "Seulement une douche de tête fixe", "no"], ["nsp", "Je ne sais pas", "On t'aide à vérifier", "ask"]] },
    { id: "eau", sec: 0, title: "Comment est l'eau chez toi ?", sub: "Indice : des traces blanches sur la robinetterie signalent souvent une eau calcaire.",
      link: ["Voir la qualité de l'eau de ta commune", "https://www.eaupotable.sante.gouv.fr/"],
      options: [["douce", "Plutôt douce", "Peu de traces blanches", "drop"], ["moyenne", "Moyenne", "Un peu de calcaire", "drops"], ["calcaire", "Calcaire", "Traces blanches fréquentes", "dots"], ["nsp", "Je ne sais pas", "", "ask"]] },
    { id: "infoEau", sec: 0, type: "info", kind: "eau" },

    { id: "photoVisage", sec: 1, type: "photo", target: "visage" },
    { id: "peau", sec: 1, title: "Après la douche, ta peau du visage est plutôt…", sub: "Ton ressenti suffit. Ce n'est pas un diagnostic médical.",
      options: [["seche", "Sèche, elle tiraille", "", "dry"], ["sensible", "Sensible, vite inconfortable", "", "flame"], ["mixte", "Mixte à grasse", "", "drops"], ["normale", "Confortable", "", "heart"]] },
    { id: "concerns", sec: 1, title: "Qu'aimerais-tu améliorer en priorité ?", sub: "Jusqu'à 3 choix. On adapte tes conseils et tes produits.", multi: true, max: 3, none: "aucune",
      options: [["secheresse", "Sécheresse, tiraillements", "", "dry"], ["imperfections", "Imperfections", "", "dots"], ["rougeurs", "Rougeurs, sensibilité", "", "flame"], ["teint", "Teint terne", "", "halfsun"], ["texture", "Grain de peau irrégulier", "", "wave"], ["taches", "Taches, teint inégal", "", "spots"], ["rides", "Ridules, fermeté", "", "sprout"], ["aucune", "Rien de particulier", "", "none"]] },
    { id: "tachesNiveau", sec: 1, title: "Comment décrirais-tu tes taches aujourd'hui ?", sub: "Ton ressenti suffit. Ça nous aide à doser ta routine.", skipIf: function (a) { return !has(a, "concerns", "taches"); },
      options: [["t1", "Légères ou récentes", "Quelques marques après des boutons", "halfsun"], ["t2", "Visibles depuis plusieurs mois", "", "spots"], ["t3", "Marquées, anciennes ou étendues", "", "dots"], ["t4", "Très marquées, ou une tache qui change", "Un avis médical d'abord", "ask"]] },
    { id: "reactions", sec: 1, title: "Ta peau a-t-elle déjà mal réagi à…", sub: "Plusieurs choix possibles. Ça nous aide à écarter certains produits.", multi: true, none: "rien",
      options: [["reactifHE", "Parfums ou huiles essentielles", "", "flower"], ["acides", "Acides exfoliants", "", "wave"], ["ruche", "Produits de la ruche", "Miel, propolis", "leaf"], ["rien", "Rien de particulier", "", "none"]] },
    { id: "valeurs", sec: 1, title: "Évites-tu certains ingrédients par conviction ?", sub: "", multi: true, none: "aucun",
      options: [["vegan", "Ingrédients d'origine animale", "Je préfère le vegan", "leaf"], ["aucun", "Non, pas particulièrement", "", "none"]] },
    { id: "grossesse", sec: 1, title: "Es-tu enceinte ou allaitante en ce moment ?", sub: "Certains actifs sont déconseillés dans ce cas. Ta réponse reste sur ton téléphone.",
      options: [["oui", "Oui", "", "heart"], ["non", "Non", "", "none"], ["nsp", "Je préfère ne pas répondre", "", "ask"]] },
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
    { id: "lavage", sec: 3, title: "À quelle fréquence laves-tu tes cheveux ?", sub: "",
      options: [["l1", "Tous les jours ou presque", "", "shower"], ["l2", "2 à 3 fois par semaine", "", "drops"], ["l3", "1 fois par semaine", "", "drop"], ["l4", "Moins souvent", "", "sprout"]] },

    { id: "envies", sec: 4, title: "Qu'est-ce qui compte pour toi sous la douche ?", sub: "Plusieurs choix possibles.", multi: true,
      options: [["senteur", "Une douche parfumée", "Une senteur qui détend, façon aromathérapie", "flower"], ["chlore", "Moins de chlore", "Selon les informations du fabricant", "drop"], ["soin", "Une eau qui prend soin de moi", "Capsules aux actifs hydratants", "halfsun"], ["soir", "Me détendre le soir", "Ralentir et souffler après la journée", "moon"], ["jet", "Un jet plus doux", "", "shower"], ["sansparfum", "Sans parfum", "Je préfère une douche sans senteur", "none"]] },
    { id: "senteur", sec: 4, title: "Quelle senteur t'attire ?", sub: "Tu pourras en changer à chaque recharge.", skipIf: function (a) { return has(a, "envies", "sansparfum"); },
      options: [["hinoki", "Hinoki", "Bois clair · Onsha et SHIFT Hinoki Spring", "tree"], ["fleur", "Floral", "Fleur de Prunier (Onsha) · Cherry Blossom (SHIFT)", "flower"], ["patchouli", "Patchouli & Rose", "Capsules SHIFT · chaud, enveloppant", "flower"], ["fruite", "Fruité", "Capsules SHIFT · énergie", "sun"], ["decouverte", "Découverte", "SHIFT · 6 senteurs à tester", "sprout"], ["ocean", "Océan", "Onsha · frais, iodé", "wave"], ["pin", "Forêt de Pin", "Onsha · vert, résineux", "leaf"], ["sans", "Sans senteur", "Onsha", "none"]] },
    { id: "origines", sec: 4, title: "Quelles marques aimerais-tu découvrir ?", sub: "On en tient compte pour te proposer d'autres marques que Sunsoari.", multi: true, none: "toutes",
      options: [["Corée", "K-beauty", "Corée", "sprout"], ["Japon", "J-beauty", "Japon", "flower"], ["Afrique", "Marques africaines", "Karité, argan, savon noir…", "sun"], ["toutes", "Un peu de tout", "", "heart"]] },
    { id: "format", sec: 4, title: "Quelle routine te ressemble ?", sub: "Tu pourras changer à tout moment depuis ta routine.",
      options: [["essentielle", "L'essentiel", "3 ou 4 gestes, le strict nécessaire", "sprout"], ["complete", "La routine complète", "Toutes les étapes, façon K-beauty", "sunmoon"], ["equilibree", "Entre les deux", "Les bases et un soin ciblé", "halfsun"]] },
    { id: "budget", sec: 4, title: "Quel budget pour démarrer ton rituel douche ?", sub: "Tu pourras compléter ton rituel plus tard.",
      options: [["petit", "Moins de 30 €", "", "coin"], ["moyen", "30 à 70 €", "", "coin"], ["grand", "Plus de 70 €", "", "coin"]] }
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
  function tagsOf(a) {
    var t = [a.peau, a.corps, a.texture, a.cheveux, a.routine, a.lieu].filter(Boolean);
    ["concerns", "reactions", "valeurs", "corpsEnvies", "cuir", "envies"].forEach(function (k) { t = t.concat(a[k] || []); });
    ["photoVisage", "photoCuir"].forEach(function (k) {
      var z = a[k] || {};
      Object.keys(z).forEach(function (zone) { t = t.concat(z[zone]); });
    });
    if (t.indexOf("brillance") > -1) t.push("mixte");
    if (a.grossesse === "oui") t.push("enceinte");
    return t;
  }

  var TAG_LABEL = { seche: "peau sèche", sensible: "peau sensible", mixte: "peau mixte à grasse", normale: "peau confortable", secheresse: "sécheresse", imperfections: "imperfections", rougeurs: "rougeurs", teint: "teint terne", texture: "grain de peau", taches: "taches", rides: "ridules", corpsSec: "corps sec", corpsTresSec: "corps très sec", corpsSensible: "corps sensible", corpsOk: "corps confortable", corpsMarques: "grain du corps", raides: "cheveux raides", ondules: "cheveux ondulés", boucles: "cheveux bouclés", crepus: "cheveux crépus", secs: "longueurs sèches", colores: "cheveux colorés", fins: "cheveux fins", cuirGras: "racines grasses", cuirSec: "cuir chevelu sec", cuirPellicules: "pellicules", cuirSensible: "cuir chevelu sensible", cuirOk: "cuir chevelu sans souci", deux: "routine matin et soir", soir: "routine du soir", brillance: "brillance (photo)", enceinte: "grossesse ou allaitement", reactifHE: "réaction aux huiles essentielles", acides: "réaction aux acides", ruche: "réaction aux produits de la ruche", vegan: "choix vegan" };

  // ---------------------------------------------------------------------------
  // MOTEUR · produits d'autres marques, avec « pourquoi » et « plutôt que »
  // ---------------------------------------------------------------------------
  function scoreExt(p, tags, a) {
    var excl = p.avoid.filter(function (x) { return tags.indexOf(x) > -1; });
    if (tags.indexOf("acides") > -1 && p.act.some(function (x) { return ["aha", "bha", "pha"].indexOf(x) > -1; })) excl.push("acides");
    var match = p.for.filter(function (x) { return tags.indexOf(x) > -1; });
    var origins = a.origines || [];
    var bonus = origins.length && origins.indexOf("toutes") < 0 && (origins.indexOf(p.origin) > -1 || (origins.indexOf("Afrique") > -1 && ["Mali", "Ghana", "Nigeria", "Maroc", "Sénégal"].indexOf(p.origin) > -1)) ? 1.5 : 0;
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
    baobab: ["secs", "corpsSec"], camelia: ["secs"], aloe: ["secheresse"], ginseng: ["teint", "rides"], arbutine: ["taches", "teint"], thiamidol: ["taches"], kojique: ["taches"], reglisse: ["taches", "rougeurs"], romarin: ["cuirGras"], teatree: ["imperfections"]
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
    ["adansonia", "baobab"], ["moringa", "moringa"], ["camellia japonica", "camelia"], ["rosmarinus", "romarin"], ["melaleuca", "teatree"],
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

  var STEP_FREQ = { essence: "Après le tonique, quelques gouttes pressées avec les paumes.", nuit: "Le soir en dernière étape, 2 à 3 fois par semaine.", masquev: "1 à 2 fois par semaine, 15 à 20 minutes.", demaquillant: "Chaque soir, sur peau sèche, puis rince.", nettoyant: "Matin et/ou soir, en massant 30 secondes.", tonique: "Après le nettoyage, matin et soir.", serum: "Quelques gouttes après le tonique.", exfoliant: "1 à 2 fois par semaine, le soir, jamais le même soir qu'un rétinoïde.", yeux: "Le soir, une petite quantité en tapotant.", hydratant: "Matin et soir, en dernière étape avant la protection solaire.", spf: "Chaque matin, en quantité généreuse, à renouveler en cas d'exposition.", corps: "Après la douche, sur peau encore humide.", huile: "Quelques gouttes sur les longueurs ou la peau.", shampoing: "Selon ta fréquence de lavage, en massant le cuir chevelu.", soin: "Sur cheveux humides, sans rincer.", masque: "1 fois par semaine, 10 à 20 minutes." };
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
    "Quand tu cites un produit, choisis uniquement dans le catalogue fourni et dis pourquoi en citant ses ingrédients. Si tu ne sais pas, dis-le.";

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
    return own.concat(EXT.map(function (p) { return { id: "e:" + p.id, brand: p.brand, name: p.name, zone: p.zone, step: p.step, act: p.act, flags: p.act.indexOf("teatree") > -1 ? ["allergenes"] : [], for: p.for, avoid: p.avoid, needs: p.needs, night: p.night, origin: p.origin, madeIn: p.madeIn, trend: p.trend, desc: p.desc, url: p.url, affiliate: p.affiliate }; }));
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
      var orig = origins.length && origins.indexOf("toutes") < 0 && (origins.indexOf(p.origin) > -1 || (origins.indexOf("Afrique") > -1 && ["Mali", "Ghana", "Nigeria", "Maroc", "Sénégal"].indexOf(p.origin) > -1)) ? 6 : 0;
      if (opts.morning && p.night) bad = true;
      if (p.needs && !p.needs.some(function (x) { return tags.indexOf(x) > -1; })) bad = true;
      return { p: p, bad: bad, score: fitScore(p, a).total + match * 4 + pref * 8 + orig + (p.madeIn ? 2 : 0) };
    }).filter(function (x) { return !x.bad; }).sort(function (x, y) { return y.score - x.score; });
    return list.length ? list[0].p : null;
  }

  function buildRoutine(a) {
    var r = recommend(a), mode = a.format || "equilibree", used = [];
    var concerns = (a.concerns || []).filter(function (c) { return c !== "aucune"; });
    var add = function (arr, zone, step, opts) { opts = opts || {}; opts.exclude = used; var p = pickFor(zone, step, a, opts); if (p) { used.push(p.id); arr.push({ step: step, id: p.id }); } };
    var morningActs = ["vitc", "niacinamide", "tranexamique", "centella", "hyaluronique"], nightActs = ["retinoides", "pdrn", "ceramides", "mucine", "panthenol", "niacinamide", "hyaluronique"];
    // Taches : on dose selon l'intensité. Niveau 1 = unifier ; dès le niveau 2, triangle complet (protéger, unifier, renouveler).
    var tn = concerns.indexOf("taches") > -1 ? ({ t1: 1, t2: 2, t3: 3, t4: 2 })[a.tachesNiveau] || 1 : 0;
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
      if (mode === "complete" || concerns.indexOf("rides") > -1) add(soir, "visage", "yeux");
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
    add(hebdo, "cheveux", "masque"); if (mode !== "essentielle") { add(hebdo, "cheveux", "shampoing"); add(hebdo, "cheveux", "soin"); }
    if ((a.cuir || []).some(function (c) { return c !== "cuirOk"; })) add(hebdo, "cuir", "shampoing");
    add(hebdo, "corps", "corps"); if (mode === "complete") add(hebdo, "corps", "huile");
    return { matin: matin, soir: soir, hebdo: hebdo, mode: mode, tn: tn, fragile: fragile, enceinte: a.grossesse === "oui", dermato: a.tachesNiveau === "t4",
      douche: [{ step: "douche", id: "s:" + r.main }].concat(r.refills.map(function (k) { return { step: "recharge", id: "s:" + k }; })), reco: r };
  }

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
    ["shelf", "wish", "scans"].forEach(function (k) { if (!s[k]) s[k] = []; });
    this.view = s.done ? "today" : "diag"; this.step = 0; this.photos = {}; this.zone = null;
    this.rtab = "matin"; this.ptab = "routines"; this.rsTab = "guides"; this.chat = []; this.busy = false;
    this.sheet = null; this.detail = null; this.scan = null; this.skin = null; this.query = "";
    var self = this;
    this.render();
    this.root.addEventListener("click", function (e) { self.onClick(e); });
    this.root.addEventListener("change", function (e) { self.onChange(e); });
    this.root.addEventListener("submit", function (e) { e.preventDefault(); self.onSubmit(e); });
    this.root.addEventListener("input", function (e) { if (e.target.id === "q-search") { self.query = e.target.value; self.renderKeepFocus("q-search"); } });
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
    if (v === "diag") html += "<div class='body'>" + this.vDiag() + "</div>";
    else {
      html += "<div class='body paper'>" + ({ plus: this.vPlus, reveal: this.vReveal, today: this.vToday, produits: this.vProduits, scan: this.vScan, ressources: this.vRessources, assistant: this.vAssistant, peau: this.vPeau }[v] || this.vToday).call(this) + "</div>";
      html += this.nav();
    }
    if (this.detail) html += this.vDetail(this.detail);
    if (this.story) html += this.vStory();
    if (this.sheet && ING[this.sheet]) html += this.vSheet(this.sheet);
    html += "</div>";
    this.root.innerHTML = html;
    var log = this.root.querySelector && this.root.querySelector(".chatlog"); if (log) log.scrollTop = log.scrollHeight;
  };

  A.nav = function () {
    var v = this.view, items = [["today", "Aujourd'hui", "sun"], ["produits", "Produits", "leaf"], ["scan", "Scan", "dots"], ["ressources", "Ressources", "sprout"], ["assistant", "Assistante", "heart"]];
    return "<nav class='bnav'>" + items.map(function (i) { return "<button data-view='" + i[0] + "' aria-current='" + (v === i[0] || (v === "reveal" && i[0] === "today") || (v === "peau" && i[0] === "scan")) + "'>" + icon(i[2]) + "<span>" + i[1] + "</span></button>"; }).join("") + "</nav>";
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
    var html = "<div class='qhead'><button class='back' data-act='prev' aria-label='Retour'" + (step === 0 ? " disabled" : "") + "><svg viewBox='0 0 24 24'><path d='M15 5l-7 7 7 7'/></svg></button><div class='segs'>" + segs + "</div></div><p class='kicker'>" + SECTIONS[q.sec] + "</p>";
    if (q.type === "info") return html + this.vInfo(q);
    if (q.type === "photo") return html + this.vPhotoStep(q);
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
  A.vInfo = function (q) {
    var p = this.progressPct(), a = this.state.answers;
    var html = "<div class='info'>";
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
    var a = this.state.answers, R = buildRoutine(a), self = this, tabs = [["matin", "Matin", "sun"], ["soir", "Soir", "moon"], ["hebdo", "Hebdo", "sprout"], ["douche", "Douche", "shower"]];
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
    var all = R.matin.concat(R.soir, R.hebdo).map(function (x) { return byId(x.id); }).filter(Boolean);
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
    var html = "<article class='rcard'><div class='rtop'><span class='num'>" + n + "</span>" + (p.img ? "<img class='pthumb' src='" + esc(p.img) + "' alt='" + esc(p.name) + "' loading='lazy'>" : "<span class='ptile' aria-hidden='true'>" + esc(p.brand.replace(/[^A-Za-zÀ-ÿ ]/g, "").split(" ").filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join("").toUpperCase()) + "</span>") + "<div class='rinfo'><small>" + esc(STEP_LABEL[step] || (step === "douche" ? "Ton rituel douche" : step === "recharge" ? "Recharge" : step)) + "</small><b>" + esc(p.name) + "</b><span>" + esc(p.brand) + (p.price ? " · " + euro(p.price) : "") + (p.origin ? " · " + esc(p.origin) : "") + "</span><div class='badges'>" + this.scoreBadge(s) + (p.madeIn ? "<span class='made'>Fabriqué " + esc(p.madeIn) + "</span>" : "") + (p.trend ? "<span class='made trend'>Tendance 2026</span>" : "") + "</div></div><button class='heart' data-wish='" + p.id + "' aria-pressed='" + (this.state.wish.indexOf(p.id) > -1) + "' aria-label='Ajouter à mes souhaits'>♡</button></div>";
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
    var html = "<div class='todayhead'><h3>Aujourd'hui</h3><button class='pluspill' data-view='plus'>Sunsoari+</button></div>";
    html += "<figure class='amb low'><img src='" + photo(AMB.today) + "' alt='' loading='lazy'><figcaption><small>Ton moment à toi</small><b>" + esc(this.goalLabel()) + "</b></figcaption></figure>";
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
    html += "<div class='scanmodes'>";
    html += "<label class='smode' for='scanphoto'>" + icon("dots") + "<b>Photo du produit</b><small>" + (AI.images ? "Face avant et liste d'ingrédients" : "Disponible avec l'assistante") + "</small></label><input id='scanphoto' type='file' accept='image/*' capture='environment' data-scanphoto='1' hidden" + (AI.images ? "" : " disabled") + ">";
    html += "<button class='smode' data-act='scanpaste'>" + icon("leaf") + "<b>Coller les ingrédients</b><small>Copie la liste INCI depuis un site</small></button>";
    html += "<button class='smode' data-act='scanbar'>" + icon("straight") + "<b>Code-barres</b><small>Base ouverte Open Beauty Facts</small></button></div>";
    if (r && r.mode === "paste") html += "<form class='scanform' data-form='paste'><label for='inci'>Liste d'ingrédients (INCI)</label><textarea id='inci' rows='5' placeholder='Aqua, Glycerin, Niacinamide, …'>" + esc(r.text || "") + "</textarea><label for='pname'>Nom du produit (facultatif)</label><input id='pname' value='" + esc(r.name || "") + "'><button class='btn big'>Analyser</button></form>";
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
    html += "<div class='guides'>" + GUIDES.map(function (g, i) { return "<button class='guide' data-guide='" + i + "'><span class='tag'>" + esc(g.tag) + "</span><b>" + esc(g.title) + "</b><small>" + esc(g.sub) + "</small></button>"; }).join("") + "</div>";
    return html + "<p class='note'>Tous les guides Sunsoari sont gratuits.</p>";
  };
  A.vStory = function () {
    var st = this.story, data = st.tuto ? { title: TUTOS[st.tuto].title, tone: "water", slides: TUTOS[st.tuto].slides } : STORIES[st.i], sl = data.slides[st.s];
    var lab = { mythe: "Mythe", verite: "Vérité", astuce: "Astuce", etape: "Étape" }[sl.k] || "";
    var html = "<div class='storyview " + data.tone + "' role='dialog' aria-label='" + esc(data.title) + "'><div class='sbar'>" + data.slides.map(function (x, i) { return "<i class='" + (i < st.s ? "done" : i === st.s ? "now" : "") + "'></i>"; }).join("") + "</div>";
    html += "<div class='shead'><span>" + esc(data.title) + "</span><button class='x light' data-act='closestory' aria-label='Fermer'>×</button></div>";
    html += "<div class='sbody'>" + (lab ? "<span class='slab " + sl.k + "'>" + lab + "</span>" : "") + "<h3>" + esc(sl.t) + "</h3>" + (sl.d ? "<p>" + esc(sl.d) + "</p>" : "") + "</div>";
    html += "<button class='snav prev' data-act='storyprev' aria-label='Écran précédent'></button><button class='snav next' data-act='storynext' aria-label='Écran suivant'></button>";
    html += "<p class='shint'>" + (st.s < data.slides.length - 1 ? "Touche à droite pour continuer" : "Touche pour terminer") + "</p></div>";
    return html;
  };
  A.vGuide = function () {
    var g = GUIDES[this.guide.i];
    return "<button class='btn link' data-guide='close'>← Tous les guides</button><div class='guideview'><span class='tag'>" + esc(g.tag) + "</span><h3>" + esc(g.title) + "</h3>" + g.days.map(function (d) { return "<div class='gday'><b>" + esc(d[0]) + "</b><p>" + esc(d[1]) + "</p></div>"; }).join("") + "</div>";
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
    var R = buildRoutine(a), names = ["matin", "soir", "hebdo", "douche"].map(function (k) { return k + " : " + R[k].map(function (it) { var p = byId(it.id); return p ? p.brand + " " + p.name : ""; }).join(", "); }).join(" | ");
    var cat = allProducts().map(function (p) { return p.brand + " " + p.name + " [" + (p.act || []).map(function (x) { return ING[x] ? ING[x].n : x; }).join(", ") + "]" + (p.own ? " (vendu par Sunsoari)" : ""); }).join("; ");
    return "Profil de la cliente : " + (t.join(", ") || "non renseigné") + ". Eau : " + (a.eau || "?") + ". Sa routine : " + names + ". Catalogue : " + cat + ".";
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
        s.answers[q.id] = cur; this.save(); return this.render();
      }
      s.answers[q.id] = d.v; this.save(); this.render();
      if (this.step < this.visibleQuestions().length - 1) { clearTimeout(this.adv); this.adv = setTimeout(function () { self.step++; self.zone = null; self.aiMsg = null; self.render(); }, 260); }
      return;
    }
    if (d.act === "prev") { this.step = Math.max(0, this.step - 1); this.zone = null; this.aiMsg = null; return this.render(); }
    if (d.act === "next") {
      if (this.step < this.visibleQuestions().length - 1) { this.step++; this.zone = null; this.aiMsg = null; }
      else { s.done = true; s.doneAt = Date.now(); this.save(); this.view = "reveal"; this.rtab = "matin"; this.emit("result", { answers: s.answers }); }
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
    if (d.act === "addroutine") { var R = buildRoutine(s.answers); ["matin", "soir", "hebdo"].forEach(function (k) { R[k].forEach(function (it) { if (s.shelf.indexOf(it.id) < 0) s.shelf.push(it.id); }); }); this.save(); t.textContent = "Ajoutée ✓"; return; }
    if (d.act === "planreset") { s.planStart = Date.now(); this.save(); return this.render(); }
    if (d.act === "restart") { s.answers = {}; s.done = false; this.save(); this.step = 0; this.view = "diag"; return this.render(); }
    if (d.act === "scanpaste") { this.scan = { mode: "paste" }; return this.render(); }
    if (d.act === "scanbar") { this.scan = { mode: "bar" }; return this.render(); }
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
