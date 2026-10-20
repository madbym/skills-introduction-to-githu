/*!
 * Mon Rituel Sunsoari · version 2
 * Diagnostic visage, corps, cheveux et douche · mode photo local · catalogue Asie et Afrique ·
 * bibliothèque d'ingrédients · tendances · planner.
 * Un seul fichier, sans dépendance, isolé dans un Shadow DOM :
 *   <div id="sunsoari-rituel" data-shop="https://sunsoari.fr"></div>
 *   <script src="sunsoari-beaute.js" defer></script>
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
      variants: { all: 54532797301069 }, variantNote: "4 coloris au choix sur la fiche produit", act: ["vitc", "aloe", "karite", "teatree"]
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
      variants: { hinoki: 54487730520397, fleur: 54487735533901, ocean: 54487733174605, pin: 54487733174605 },
      scentLabel: function (s) { return "Collection : " + ({ hinoki: "Hinoki Spring", fleur: "Cherry Blossom" }[s] || "Découverte"); }
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
    // Visage · protection solaire
    { id: "bojsun", brand: "Beauty of Joseon", name: "Relief Sun Rice + Probiotics SPF 50+", origin: "Corée", zone: "visage", step: "spf", act: ["spf", "riz"], for: ["taches", "teint", "seche", "normale", "mixte", "sensible"], avoid: [], desc: "Crème solaire visage au riz, finition légère." },
    { id: "biore", brand: "Bioré", name: "UV Aqua Rich Watery Essence SPF 50+", origin: "Japon", zone: "visage", step: "spf", act: ["spf", "hyaluronique"], for: ["mixte", "imperfections", "taches", "normale"], avoid: [], desc: "Solaire très fluide, texture gel." },
    // Corps
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

  var STEP_LABEL = { demaquillant: "Démaquillage", nettoyant: "Nettoyant", tonique: "Tonique", serum: "Sérum", exfoliant: "Exfoliant (1 à 2 fois par semaine)", yeux: "Contour des yeux", hydratant: "Hydratant", spf: "Protection solaire", corps: "Soin du corps", huile: "Huile", shampoing: "Shampoing", soin: "Soin sans rinçage", masque: "Masque" };

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
    shift: { name: "SHIFT", pts: ["Filtre à sédiments Pure Water, puis capsule de soin", "Capsules : vitamine C, aloe vera, huile de coco, karité, tréhalose et huiles essentielles", "Aromathérapie : Tea Tree & Lavender, Basil & Grass, Ginger & Bergamote, Hinoki Spring…", "Coffret complet avec flexible silicone 2 m, 4 coloris"], care: "Les capsules contiennent des huiles essentielles, dont le tea tree." },
    onsha: { name: "Onsha", pts: ["Pommeau au jet fin (197 micro-trous)", "Filtre thermal vitaminé 2-en-1 (sédiments + capsule thermale)", "5 senteurs dont une version sans senteur", "Formats Home et Nomade (voyage)"], care: "Version sans senteur disponible pour les peaux qui réagissent aux parfums." }
  };

  var SECTIONS = ["Ta douche", "Ton visage", "Ton corps", "Tes cheveux", "Tes envies"];

  var QUESTIONS = [
    { id: "lieu", sec: 0, title: "Où vas-tu surtout prendre soin de toi ?", sub: "On adapte le format à ta salle de bain.",
      options: [["maison", "À la maison", "Ma douche de tous les jours", "home"], ["voyage", "Souvent en déplacement", "Hôtel, location, salle de sport", "plane"], ["deux", "Les deux", "Un rituel à la maison et un qui me suit", "both"]] },
    { id: "flexible", sec: 0, title: "Ta douche a-t-elle un flexible avec une douchette à main ?", sub: "C'est ce qui permet de visser nos pommeaux et coques de diffusion.",
      options: [["oui", "Oui", "Un tuyau souple et une douchette", "shower"], ["non", "Non", "Seulement une douche de tête fixe", "no"], ["nsp", "Je ne sais pas", "On t'aide à vérifier", "ask"]] },
    { id: "eau", sec: 0, title: "Comment est l'eau chez toi ?", sub: "Indice : des traces blanches sur la robinetterie signalent souvent une eau calcaire.",
      link: ["Voir la qualité de l'eau de ta commune", "https://www.eaupotable.sante.gouv.fr/"],
      options: [["douce", "Plutôt douce", "Peu de traces blanches", "drop"], ["moyenne", "Moyenne", "Un peu de calcaire", "drops"], ["calcaire", "Calcaire", "Traces blanches fréquentes", "dots"], ["nsp", "Je ne sais pas", "", "ask"]] },
    { id: "infoEau", sec: 0, type: "info", kind: "eau" },

    { id: "photoVisage", sec: 1, type: "photo", target: "visage" },
    { id: "peau", sec: 1, title: "Après la douche, ta peau du visage est plutôt…", sub: "Ton ressenti suffit. Ce n'est pas un diagnostic médical.",
      options: [["seche", "Sèche, elle tiraille", "", "dry"], ["sensible", "Sensible, vite inconfortable", "", "flame"], ["mixte", "Mixte à grasse", "", "drops"], ["normale", "Confortable", "", "heart"]] },
    { id: "concerns", sec: 1, title: "Qu'aimerais-tu chouchouter en priorité ?", sub: "Jusqu'à 3 choix. On adapte tes conseils et tes produits.", multi: true, max: 3, none: "aucune",
      options: [["secheresse", "Sécheresse, tiraillements", "", "dry"], ["imperfections", "Imperfections", "", "dots"], ["rougeurs", "Rougeurs, sensibilité", "", "flame"], ["teint", "Teint terne", "", "halfsun"], ["texture", "Grain de peau irrégulier", "", "wave"], ["taches", "Taches, teint inégal", "", "spots"], ["rides", "Ridules, fermeté", "", "sprout"], ["aucune", "Rien de particulier", "", "none"]] },
    { id: "reactions", sec: 1, title: "Ta peau a-t-elle déjà mal réagi à…", sub: "Plusieurs choix possibles. Ça nous aide à écarter certains produits.", multi: true, none: "rien",
      options: [["reactifHE", "Parfums ou huiles essentielles", "", "flower"], ["acides", "Acides exfoliants", "", "wave"], ["ruche", "Produits de la ruche", "Miel, propolis", "leaf"], ["rien", "Rien de particulier", "", "none"]] },
    { id: "valeurs", sec: 1, title: "Tu évites certains ingrédients par choix ?", sub: "", multi: true, none: "aucun",
      options: [["vegan", "Ingrédients d'origine animale", "Je préfère le vegan", "leaf"], ["aucun", "Non, pas particulièrement", "", "none"]] },
    { id: "grossesse", sec: 1, title: "Es-tu enceinte ou allaitante en ce moment ?", sub: "Certains actifs sont déconseillés dans ce cas. Ta réponse reste sur ton téléphone.",
      options: [["oui", "Oui", "", "heart"], ["non", "Non", "", "none"], ["nsp", "Je préfère ne pas répondre", "", "ask"]] },
    { id: "routine", sec: 1, title: "As-tu une routine visage au quotidien ?", sub: "",
      options: [["deux", "Oui, matin et soir", "", "sunmoon"], ["matin", "Seulement le matin", "", "sun"], ["soir", "Seulement le soir", "", "moon"], ["aucune", "Pas encore", "On commence simple", "sprout"]] },
    { id: "infoProfil", sec: 1, type: "info", kind: "profil" },

    { id: "corps", sec: 2, title: "Et la peau de ton corps ?", sub: "",
      options: [["corpsOk", "Confortable", "", "heart"], ["corpsSec", "Sèche après la douche", "", "dry"], ["corpsTresSec", "Très sèche, rugueuse par endroits", "Coudes, genoux, jambes", "wave"], ["corpsSensible", "Sensible, elle réagit vite", "", "flame"]] },
    { id: "corpsEnvies", sec: 2, title: "Pour ton corps, tu aimerais…", sub: "Plusieurs choix possibles.", multi: true, none: "corpsRien",
      options: [["corpsNourrir", "Une peau plus nourrie", "", "drop"], ["corpsMarques", "Un grain plus uniforme", "Marques, petites rugosités", "spots"], ["corpsSenteur", "Un moment sensoriel", "", "flower"], ["corpsRien", "Rien de particulier", "", "none"]] },

    { id: "photoCuir", sec: 3, type: "photo", target: "cuir" },
    { id: "texture", sec: 3, title: "Ta texture de cheveux ?", sub: "",
      options: [["raides", "Raides", "", "straight"], ["ondules", "Ondulés", "", "wavy"], ["boucles", "Bouclés", "", "curly"], ["crepus", "Frisés à crépus", "", "coily"]] },
    { id: "cheveux", sec: 3, title: "Et leurs longueurs en ce moment ?", sub: "",
      options: [["secs", "Sèches ou cassantes", "", "dry"], ["colores", "Colorées ou décolorées", "", "color"], ["fins", "Fines, vite plates", "", "thin"], ["ok", "En forme", "", "heart"]] },
    { id: "cuir", sec: 3, title: "Ton cuir chevelu est plutôt…", sub: "Plusieurs choix possibles.", multi: true, none: "cuirOk",
      options: [["cuirGras", "Il regraisse vite", "", "drops"], ["cuirSec", "Il tiraille, il est sec", "", "dry"], ["cuirPellicules", "Pellicules", "", "dots"], ["cuirSensible", "Sensible, il démange", "", "flame"], ["cuirOk", "Sans souci", "", "heart"]] },
    { id: "lavage", sec: 3, title: "Tu laves tes cheveux…", sub: "",
      options: [["l1", "Tous les jours ou presque", "", "shower"], ["l2", "2 à 3 fois par semaine", "", "drops"], ["l3", "1 fois par semaine", "", "drop"], ["l4", "Moins souvent", "", "sprout"]] },

    { id: "envies", sec: 4, title: "Qu'attends-tu de ta douche ?", sub: "Plusieurs choix possibles.", multi: true,
      options: [["senteur", "Un moment senteur", "Aromathérapie, rituel", "flower"], ["chlore", "Moins de chlore", "Selon la fiche du fabricant", "drop"], ["soin", "Une eau « soin »", "Capsules aux actifs hydratants", "halfsun"], ["soir", "Un rituel du soir", "Ralentir, se poser", "moon"], ["jet", "Un jet plus doux", "", "shower"], ["sansparfum", "Rien de parfumé", "Je préfère sans senteur", "none"]] },
    { id: "senteur", sec: 4, title: "Quelle senteur t'attire ?", sub: "Tu pourras en changer à chaque recharge.", skipIf: function (a) { return has(a, "envies", "sansparfum"); },
      options: [["hinoki", "Hinoki", "Bois clair, apaisant", "tree"], ["ocean", "Océan", "Frais, iodé", "wave"], ["pin", "Forêt de Pin", "Vert, résineux", "leaf"], ["fleur", "Fleur de Prunier", "Floral, doux", "flower"], ["sans", "Sans senteur", "", "none"]] },
    { id: "origines", sec: 4, title: "Quelles beautés du monde t'attirent ?", sub: "Pour orienter les autres marques qu'on te propose.", multi: true, none: "toutes",
      options: [["Corée", "K-beauty", "Corée", "sprout"], ["Japon", "J-beauty", "Japon", "flower"], ["Afrique", "Marques africaines", "Karité, argan, savon noir…", "sun"], ["toutes", "Un peu de tout", "", "heart"]] },
    { id: "budget", sec: 4, title: "Pour ta douche, ton budget de départ ?", sub: "Tu pourras compléter ton rituel plus tard.",
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
    } else if (shiftOk && a.budget !== "petit") {
      main = a.budget === "grand" ? "shiftAroma" : "shiftSoin";
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
      taches: "Taches : la protection solaire quotidienne, toute l'année et sur toutes les carnations, est le geste le plus conseillé.",
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

  // ---------------------------------------------------------------------------
  // Stockage (navigateur de la cliente uniquement, aucune donnée envoyée).
  // Les photos ne sont jamais enregistrées : seules les zones cochées le sont.
  // ---------------------------------------------------------------------------
  var KEY = "sunsoari-beaute-v2";
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(state) { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* stockage indisponible */ } }

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function euro(n) { return n.toFixed(2).replace(".", ",") + " €"; }
  function today() { return new Date().toISOString().slice(0, 10); }
  function addDays(iso, n) { var d = new Date(iso + "T12:00:00"); d.setDate(d.getDate() + n); return d; }
  function frDate(d) { return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }); }
  function ymd(d) { return d.toISOString().slice(0, 10).replace(/-/g, ""); }
  var AFRICA = ["Mali", "Ghana", "Nigeria", "Maroc", "Sénégal"];

  function Widget(host) {
    this.host = host;
    this.shop = (host.getAttribute("data-shop") || "https://sunsoari.fr").replace(/\/$/, "");
    this.contact = host.getAttribute("data-contact") || this.shop + "/pages/contact";
    this.root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
    this.state = load();
    ["answers", "refills", "week"].forEach(function (k) { if (!this.state[k]) this.state[k] = {}; }, this);
    this.tab = this.state.done ? "reco" : "diag";
    this.step = 0; this.photos = {}; this.zone = null; this.sheet = null; this.ingFilter = "Tous"; this.trendFilter = "Tous";
    this.render();
    var self = this;
    this.root.addEventListener("click", function (e) { self.onClick(e); });
    this.root.addEventListener("change", function (e) { self.onChange(e); });
    this.root.addEventListener("error", function (e) {
      if (e.target.tagName === "IMG" && !e.target.dataset.fallback) { e.target.dataset.fallback = "1"; e.target.src = PLACEHOLDER; }
    }, true);
  }

  Widget.prototype.visibleQuestions = function () {
    var a = this.state.answers;
    return QUESTIONS.filter(function (q) { return !(q.skipIf && q.skipIf(a)); });
  };
  Widget.prototype.url = function (key) { return this.shop + "/products/" + P[key].handle + "?utm_source=mon-rituel&utm_medium=widget"; };
  Widget.prototype.variantFor = function (key, scent) { var v = P[key].variants; return v.all || v[scent] || v.hinoki || v[Object.keys(v)[0]]; };
  Widget.prototype.cartUrl = function (id) { return this.shop + "/cart/" + id + ":1?utm_source=mon-rituel&utm_medium=widget"; };
  function extUrl(p) { return p.url || "https://www.google.com/search?tbm=shop&q=" + encodeURIComponent(p.brand + " " + p.name); }

  Widget.prototype.render = function () {
    var done = !!this.state.done, self = this;
    var tabs = [["diag", "Diagnostic"], ["reco", "Mon rituel"], ["ing", "Ingrédients"], ["tend", "Tendances"], ["plan", "Planner"]];
    var html = "<style>" + CSS + "</style><div class='wrap'><div class='top'><div class='brand'><h2>Mon Rituel</h2><span>par Sunsoari</span></div><div class='tabs' role='tablist'>";
    tabs.forEach(function (t) {
      var locked = !done && (t[0] === "reco" || t[0] === "plan");
      html += "<button class='tab' role='tab' data-tab='" + t[0] + "' aria-selected='" + (self.tab === t[0]) + "'" + (locked ? " disabled" : "") + ">" + t[1] + "</button>";
    });
    html += "</div></div><div class='body" + (this.tab === "diag" ? "" : " paper") + "'>";
    html += { diag: this.renderDiag, reco: this.renderReco, ing: this.renderIng, tend: this.renderTrends, plan: this.renderPlan }[this.tab].call(this);
    html += "</div><div class='foot'><span>Tes réponses et tes photos restent sur ton appareil. Rien n'est envoyé.</span><a href='" + esc(this.contact) + "' target='_blank' rel='noopener'>Une question ? Écris-nous</a></div>";
    if (this.sheet && ING[this.sheet]) html += this.renderSheet(this.sheet);
    html += "</div>";
    this.root.innerHTML = html;
  };

  // ---------- Diagnostic ----------
  Widget.prototype.progressPct = function () {
    var a = this.state.answers;
    var qs = this.visibleQuestions().filter(function (q) { return !q.type; });
    var n = qs.filter(function (q) { return q.multi ? (a[q.id] || []).length : a[q.id]; }).length;
    return { pct: Math.round((n / qs.length) * 100), left: qs.length - n };
  };

  Widget.prototype.renderDiag = function () {
    var qs = this.visibleQuestions();
    if (this.step >= qs.length) this.step = qs.length - 1;
    var q = qs[this.step], a = this.state.answers, step = this.step;
    var segs = SECTIONS.map(function (name, i) {
      var inSec = qs.filter(function (x) { return x.sec === i; });
      var done = inSec.filter(function (x) { return qs.indexOf(x) < step; }).length;
      var w = q.sec > i ? 100 : q.sec < i ? 0 : Math.max(6, Math.round((done / inSec.length) * 100));
      return "<span class='seg' title='" + name + "'><i style='width:" + w + "%'></i></span>";
    }).join("");
    var html = "<div class='qhead'><button class='back' data-act='prev' aria-label='Question précédente'" + (step === 0 ? " disabled" : "") + "><svg viewBox='0 0 24 24'><path d='M15 5l-7 7 7 7'/></svg></button><div class='segs'>" + segs + "</div></div>";
    html += "<p class='kicker'>" + SECTIONS[q.sec] + "</p>";
    if (q.type === "info") return html + this.renderInfo(q);
    if (q.type === "photo") return html + this.renderPhoto(q);

    var val = a[q.id];
    html += "<div class='q'><h3>" + esc(q.title) + "</h3>" + (q.sub ? "<p class='sub'>" + esc(q.sub) + "</p>" : "");
    if (q.link) html += "<a class='ext' href='" + q.link[1] + "' target='_blank' rel='noopener'>" + esc(q.link[0]) + " ↗</a>";
    html += "<div class='opts' role='" + (q.multi ? "group" : "radiogroup") + "'>";
    q.options.forEach(function (o) {
      var on = q.multi ? (val || []).indexOf(o[0]) > -1 : val === o[0];
      html += "<button class='opt' data-q='" + q.id + "' data-v='" + esc(o[0]) + "' aria-pressed='" + on + "'><span class='ico'>" + icon(o[3]) + "</span><span class='lbl'>" + esc(o[1]) + (o[2] ? "<small>" + esc(o[2]) + "</small>" : "") + "</span><span class='" + (q.multi ? "chk" : "rad") + "'></span></button>";
    });
    html += "</div></div>";
    var ready = q.multi ? (val || []).length > 0 : !!val;
    if (q.multi || step === qs.length - 1) html += "<div class='cta'><button class='btn big' data-act='next'" + (ready ? "" : " disabled") + ">" + (step === qs.length - 1 ? "Découvrir mon rituel" : "Continuer") + "</button></div>";
    html += "<p class='note'>Ce diagnostic repose sur ton ressenti. Il ne remplace pas l'avis d'un ou d'une professionnelle de santé.</p>";
    return html;
  };

  // Écran photo : la photo reste en mémoire le temps de l'écran. La cliente marque elle-même ce qu'elle voit.
  Widget.prototype.renderPhoto = function (q) {
    var cfg = PHOTO[q.target], marks = this.state.answers[q.id] || {}, img = this.photos[q.target], self = this;
    var html = "<div class='q'><h3>" + esc(cfg.title) + "</h3><p class='sub'>" + esc(cfg.sub) + "</p></div>";
    html += "<div class='mirror" + (img ? " has" : "") + "'>" + (img ? "<img src='" + img + "' alt='Ta photo'>" : "<div class='silh " + q.target + "'>" + icon(q.target === "visage" ? "heart" : "curly") + "<span>Pas de photo ? Touche directement les zones.</span></div>");
    cfg.zones.forEach(function (z) {
      var n = (marks[z[0]] || []).length;
      html += "<button class='zone" + (self.zone === z[0] ? " on" : "") + (n ? " marked" : "") + "' style='left:" + z[2] + "%;top:" + z[3] + "%' data-zone='" + z[0] + "'>" + esc(z[1]) + (n ? " · " + n : "") + "</button>";
    });
    html += "</div>";
    html += "<div class='photoacts'><label class='btn ghost' for='cam-" + q.target + "'>" + (img ? "Reprendre la photo" : "Prendre ou choisir une photo") + "</label><input id='cam-" + q.target + "' type='file' accept='image/*' capture='" + (q.target === "visage" ? "user" : "environment") + "' data-photo='" + q.target + "' hidden></div>";
    if (this.zone) {
      var zl = cfg.zones.filter(function (z) { return z[0] === self.zone; })[0];
      html += "<div class='obs'><p><b>" + esc(zl[1]) + "</b> : qu'est-ce que tu remarques ?</p><div class='chipset'>";
      cfg.obs.forEach(function (o) {
        var on = (marks[self.zone] || []).indexOf(o[0]) > -1;
        html += "<button class='chip' data-obs='" + o[0] + "' data-pq='" + q.id + "' aria-pressed='" + on + "'>" + esc(o[1]) + "</button>";
      });
      html += "</div></div>";
    }
    html += "<p class='note'>Ta photo reste sur ton appareil : elle n'est ni envoyée ni enregistrée. Ce que tu observes complète ton diagnostic, ce n'est pas une analyse médicale.</p>";
    html += "<div class='cta'><button class='btn big' data-act='next'>" + (Object.keys(marks).length ? "Continuer" : "Passer cette étape") + "</button></div>";
    return html;
  };

  Widget.prototype.renderInfo = function (q) {
    var p = this.progressPct(), a = this.state.answers;
    var C = 2 * Math.PI * 52, ring = "<svg class='ring' viewBox='0 0 120 120' aria-hidden='true'><circle cx='60' cy='60' r='52' class='rt'/><circle cx='60' cy='60' r='52' class='rv' stroke-dasharray='" + (C * p.pct / 100).toFixed(1) + " " + C.toFixed(1) + "' transform='rotate(-90 60 60)'/></svg><div class='ringtxt'><b>" + p.pct + " %</b><small>de ton profil</small></div>";
    var html = "<div class='info'>";
    if (q.kind === "eau") {
      html += "<h3>Le savais-tu ?</h3><ul class='facts'>" +
        "<li>" + icon("drop") + "<span>En France, l'eau du robinet est potable et très contrôlée.</span></li>" +
        "<li>" + icon("dots") + "<span>Sa teneur en calcaire varie beaucoup d'une région à l'autre.</span></li>" +
        "<li>" + icon("shower") + "<span>Le chlore sert à la désinfecter : il est normal d'en trouver un peu. Certains filtres de douche sont conçus pour en réduire une partie, selon leurs fabricants.</span></li></ul>";
      html += "<div class='ringwrap small'>" + ring + "</div><p class='sub center'>Passons à ton visage.</p>";
    } else {
      var labels = { seche: "Peau sèche", sensible: "Peau sensible", mixte: "Peau mixte à grasse", normale: "Peau confortable", calcaire: "Eau calcaire", douce: "Eau douce", moyenne: "Eau moyenne", voyage: "Nomade", maison: "Rituel maison", deux: "Maison et voyage" };
      var chips = [a.lieu, a.eau, a.peau].map(function (k) { return labels[k]; }).filter(Boolean).concat((a.concerns || []).filter(function (c) { return c !== "aucune"; }).map(function (c) { return TAG_LABEL[c]; }));
      html += "<div class='ringwrap'>" + ring + "</div><h3 class='center'>Ton rituel se précise</h3><p class='sub center'>On connaît ta douche et ton visage. Encore " + p.left + " questions sur ton corps, tes cheveux et tes envies.</p>";
      html += "<div class='chips'>" + chips.map(function (c) { return "<span>" + esc(c) + "</span>"; }).join("") + "</div>";
    }
    html += "</div><div class='cta'><button class='btn big' data-act='next'>" + (q.kind === "eau" ? "Continuer" : "Affiner mon rituel") + "</button></div>";
    return html;
  };

  // ---------- Mon rituel ----------
  Widget.prototype.actChips = function (ids) {
    return "<div class='acts-ing'>" + ids.filter(function (i) { return ING[i]; }).map(function (i) { return "<button class='ingchip' data-ing='" + i + "'>" + esc(ING[i].n) + "</button>"; }).join("") + "</div>";
  };

  Widget.prototype.productCard = function (key, scent, big, label) {
    var p = P[key], vid = this.variantFor(key, scent);
    var scentTxt = p.variants.all ? (p.variantNote || "") : (p.scentLabel ? p.scentLabel(scent) : "Senteur : " + SCENT_LABEL[p.variants[scent] ? scent : "hinoki"]);
    var acts = "<div class='acts'><a class='btn' href='" + this.cartUrl(vid) + "' target='_top' data-add='" + vid + "'>Ajouter au panier</a><a class='btn ghost' href='" + this.url(key) + "' target='_blank' rel='noopener'>Voir</a></div>";
    var chips = p.act ? this.actChips(p.act) : "";
    if (big) return "<div class='hero'><img src='" + p.img + "' alt='" + esc(p.title) + "' loading='lazy'><div><span class='tag'>" + esc(label || "Ton point de départ") + "</span><p class='pt'>" + esc(p.title) + "</p><span class='price'>" + euro(p.price) + "</span>" + (scentTxt ? " · <small>" + esc(scentTxt) + "</small>" : "") + "<p class='pp'>" + esc(p.pitch) + "</p>" + chips + acts + "</div></div>";
    return "<div class='card'><img src='" + p.img + "' alt='" + esc(p.title) + "' loading='lazy'><p class='pt' style='font-size:15px'>" + esc(p.title) + "</p><span class='price'>" + euro(p.price) + "</span><p class='pp' style='margin:0'>" + esc(p.pitch) + "</p>" + chips + acts + "</div>";
  };

  Widget.prototype.extCard = function (sel, step) {
    var p = sel.best.p, initials = p.brand.split(" ").map(function (w) { return w[0]; }).join("").slice(0, 3);
    var html = "<div class='card ext-card'><div class='mono'><span>" + esc(initials) + "</span><small>" + esc(p.origin) + " · " + esc(STEP_LABEL[step] || step) + "</small></div>";
    if (p.madeIn) html += "<span class='made'>Fabriqué " + esc(p.madeIn) + "</span>";
    if (p.trend) html += "<span class='made trend'>Tendance 2026</span>";
    html += "<p class='pt' style='font-size:15px;margin:0'>" + esc(p.name) + "</p><small style='color:var(--muted)'>" + esc(p.brand) + "</small><p class='pp' style='margin:0'>" + esc(p.desc) + "</p>";
    html += "<p class='why'>" + esc(whyText(sel.best)) + "</p>" + this.actChips(p.act);
    var vs = versusText(sel);
    if (vs) html += "<p class='vs'>" + esc(vs) + "</p>";
    html += "<div class='acts'><a class='btn ghost' href='" + esc(extUrl(p)) + "' target='_blank' rel='noopener" + (p.affiliate ? " sponsored" : "") + "' data-ext='" + p.id + "'>Où l'acheter ↗</a></div>";
    if (p.affiliate) html += "<small class='disc'>Lien affilié : Sunsoari peut toucher une commission.</small>";
    return html + "</div>";
  };

  Widget.prototype.renderReco = function () {
    var a = this.state.answers, r = recommend(a), ins = insights(a), plan = routinePlan(a), self = this;
    var html = "<div class='q'><h3>Ton rituel Sunsoari</h3><p class='sub'>Visage, corps, cheveux et douche, d'après tes réponses. Touche un ingrédient pour comprendre son rôle.</p></div>";
    html += "<div class='grid2'>" + ins.map(function (x) { return "<div class='ins'><b>" + esc(x[0]) + "</b><p>" + esc(x[1]) + "</p></div>"; }).join("") + "</div>";

    // Douche
    html += "<h4>Ta douche</h4>";
    if (r.why.length) html += "<p class='why big'>" + esc(r.why.join(" ")) + "</p>";
    html += this.productCard(r.main, r.scent, true, r.main.indexOf("shift") === 0 ? "Notre coup de cœur pour toi" : "Ton point de départ");
    html += this.renderCompare(r);
    html += "<h4>D'autres options pour ta douche</h4><div class='cards'>" + r.alts.concat(r.extras).map(function (k) { return self.productCard(k, r.scent); }).join("") + "</div>";
    html += "<h4>Tes recharges, à prévoir</h4><div class='cards'>" + r.refills.map(function (k) { return self.productCard(k, r.scent); }).join("") + "</div>";

    // Routine soins
    html += "<h4>Ta routine soins, étape par étape</h4><p class='sub' style='margin:-6px 0 12px;color:var(--muted)'>Des marques de Corée, du Japon et d'Afrique, non vendues sur Sunsoari. Pour chaque produit : pourquoi lui, et pourquoi pas un autre.</p>";
    plan.forEach(function (g) {
      html += "<h5>" + esc(g.group) + "</h5><div class='cards'>" + g.items.map(function (it) { return self.extCard(it.r, it.step); }).join("") + "</div>";
    });
    html += "<p class='note'>Ces marques ne sont pas partenaires de Sunsoari. Les formules peuvent varier selon les pays : vérifie la liste d'ingrédients sur l'emballage et fais un test sur une petite zone avant un nouveau soin.</p>";
    html += "<div class='nav'><button class='btn link' data-act='restart'>Refaire le diagnostic</button><button class='btn' data-tab='plan'>Organiser mon planner →</button></div>";
    html += "<p class='note'>Un filtre de douche n'est ni un soin ni un dispositif médical. Les effets décrits sont ceux annoncés par les fabricants, et le ressenti varie d'une personne à l'autre.</p>";
    return html;
  };

  Widget.prototype.renderCompare = function (r) {
    var s = SHOWER_FACTS.shift, o = SHOWER_FACTS.onsha;
    var col = function (f, on) { return "<div class='cmp" + (on ? " on" : "") + "'><b>" + f.name + (on ? " · pour toi" : "") + "</b><ul>" + f.pts.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul><small>" + esc(f.care) + "</small></div>"; };
    var shiftMain = r.main.indexOf("shift") === 0;
    return "<details class='compare'" + (shiftMain ? " open" : "") + "><summary>SHIFT ou Onsha : quelle différence ?</summary><div class='cmpgrid'>" + col(s, shiftMain) + col(o, !shiftMain) + "</div></details>";
  };

  // ---------- Ingrédients ----------
  Widget.prototype.renderIng = function () {
    var self = this, fams = ["Tous", "Afrique", "Corée", "Japon"];
    var html = "<div class='q'><h3>Comprendre les ingrédients</h3><p class='sub'>Ce qu'ils sont, à quoi ils servent en cosmétique et les précautions à connaître.</p></div><div class='chipset'>";
    fams.forEach(function (f) { html += "<button class='chip' data-ingf='" + f + "' aria-pressed='" + (self.ingFilter === f) + "'>" + f + "</button>"; });
    html += "</div><div class='inglist'>";
    Object.keys(ING).forEach(function (k) {
      var i = ING[k];
      if (self.ingFilter !== "Tous" && i.reg.indexOf(self.ingFilter === "Afrique" ? "Afrique" : self.ingFilter) < 0 && !(self.ingFilter === "Afrique" && ["Maroc", "Tchad"].indexOf(i.reg) > -1)) return;
      var used = EXT.filter(function (p) { return p.act.indexOf(k) > -1; }).length + Object.keys(P).filter(function (pk) { return (P[pk].act || []).indexOf(k) > -1; }).length;
      html += "<button class='ingrow' data-ing='" + k + "'><span><b>" + esc(i.n) + "</b><small>" + esc(i.f) + " · " + esc(i.reg) + "</small></span><em>" + (used ? used + " produit" + (used > 1 ? "s" : "") : "") + "</em></button>";
    });
    return html + "</div><p class='note'>Ces fiches résument l'usage cosmétique courant de chaque ingrédient. Elles ne remplacent pas l'avis d'un ou d'une dermatologue ou d'un pharmacien.</p>";
  };

  Widget.prototype.renderSheet = function (k) {
    var i = ING[k], self = this, a = this.state.answers;
    var prods = EXT.filter(function (p) { return p.act.indexOf(k) > -1; });
    var own = Object.keys(P).filter(function (pk) { return (P[pk].act || []).indexOf(k) > -1; });
    var html = "<div class='sheetbg' data-act='closesheet'></div><div class='sheet' role='dialog' aria-label='" + esc(i.n) + "'><button class='x' data-act='closesheet' aria-label='Fermer'>×</button>";
    html += "<span class='tag'>" + esc(i.f) + " · " + esc(i.reg) + "</span><h3>" + esc(i.n) + "</h3>";
    html += "<p><b>C'est quoi ?</b> " + esc(i.what) + "</p><p><b>À quoi ça sert ?</b> " + esc(i.use) + "</p><p class='care'><b>À savoir :</b> " + esc(i.care) + "</p>";
    if (own.length) html += "<p><b>Chez Sunsoari :</b> " + own.map(function (pk) { return "<a href='" + self.url(pk) + "' target='_blank' rel='noopener'>" + esc(P[pk].title) + "</a>"; }).join(", ") + "</p>";
    if (prods.length) html += "<p><b>On le trouve dans :</b> " + prods.map(function (p) { return esc(p.brand + " " + p.name); }).join(" · ") + "</p>";
    if (a.grossesse === "oui" && ["retinoides", "teatree", "bha", "aha"].indexOf(k) > -1) html += "<p class='care'>Tu as indiqué être enceinte ou allaitante : demande conseil à ton ou ta médecin avant d'utiliser cet ingrédient.</p>";
    return html + "</div>";
  };

  // ---------- Tendances ----------
  Widget.prototype.renderTrends = function () {
    var self = this;
    var html = "<div class='q'><h3>Tendances beauté 2026</h3><p class='sub'>Ce qui se passe en France, en Asie et en Afrique, avec notre avis honnête.</p></div><div class='chipset'>";
    ["Tous", "France", "Asie", "Afrique"].forEach(function (f) { html += "<button class='chip' data-tf='" + f + "' aria-pressed='" + (self.trendFilter === f) + "'>" + f + "</button>"; });
    html += "</div><div class='grid2'>";
    TRENDS.filter(function (t) { return self.trendFilter === "Tous" || t.reg === self.trendFilter; }).forEach(function (t) {
      html += "<div class='trend-card'><span class='tag'>" + esc(t.reg) + "</span><p class='pt'>" + esc(t.t) + "</p><p class='pp'>" + esc(t.d) + "</p><p class='why'>Notre avis : " + esc(t.avis) + "</p>" + (t.act.length ? self.actChips(t.act) : "") + "</div>";
    });
    html += "</div><p class='note'>Sources : " + TREND_SOURCES.map(function (s) { return "<a href='" + s[1] + "' target='_blank' rel='noopener'>" + esc(s[0]) + "</a>"; }).join(" · ") + ". Les tendances évoluent vite : on met cette page à jour chaque saison.</p>";
    return html;
  };

  // ---------- Planner ----------
  Widget.prototype.renderPlan = function () {
    var a = this.state.answers, r = recommend(a), self = this;
    var keys = r.refills.map(function (k) { return k === "filtreSans" ? "filtreThermal" : k; }).filter(function (k) { return REFILLS[k]; });
    var html = "<div class='q'><h3>Mon planner</h3><p class='sub'>Tes recharges et ta semaine de soin, au même endroit.</p></div>";
    html += "<h4 style='margin-top:8px'>Mes recharges</h4><div class='grid2'>";
    keys.forEach(function (k) {
      var info = REFILLS[k], st = self.state.refills[k] || {}, start = st.start || "", days = st.days || info.days;
      html += "<div class='refill'><div class='row'><b>" + esc(info.label) + "</b><small style='color:var(--muted)'>" + esc(info.hint) + "</small></div>";
      html += "<div class='fields'><label for='rs-" + k + "'>Installée le<input type='date' id='rs-" + k + "' data-refill='" + k + "' data-f='start' value='" + start + "' max='" + today() + "'></label>";
      html += "<label for='rd-" + k + "'>À changer tous les (jours)<input type='number' min='1' max='365' id='rd-" + k + "' data-refill='" + k + "' data-f='days' value='" + days + "'></label></div>";
      if (start) {
        var next = addDays(start, +days), left = Math.ceil((next - new Date()) / 864e5);
        var pct = Math.max(0, Math.min(100, Math.round(100 - (left / days) * 100)));
        var txt = left > 1 ? "Prochaine recharge dans " + left + " jours, " + frDate(next) : left >= 0 ? "À changer très bientôt : " + frDate(next) : "À changer depuis " + (-left) + " jours";
        var gcal = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent("Changer mon " + info.label.toLowerCase() + " · Sunsoari") + "&dates=" + ymd(next) + "/" + ymd(addDays(next.toISOString().slice(0, 10), 1)) + "&details=" + encodeURIComponent("Recharge : " + self.url(k));
        html += "<div class='bar" + (left < 0 ? " late" : "") + "'><i style='width:" + pct + "%'></i></div><span>" + esc(txt) + "</span>";
        html += "<div class='acts'><a class='btn ghost' href='" + gcal + "' target='_blank' rel='noopener'>Google Agenda</a><button class='btn ghost' data-ics='" + k + "'>Fichier calendrier</button><a class='btn' href='" + self.url(k) + "' target='_blank' rel='noopener'>Racheter</a></div>";
      } else html += "<span class='pp' style='margin:0'>Indique la date d'installation pour calculer ta prochaine recharge.</span>";
      html += "</div>";
    });
    html += "</div>";
    var g = weeklyRitual(a), wk = this.state.week;
    html += "<h4>Ma semaine soin</h4><p class='sub' style='margin-top:-6px;color:var(--muted)'>Coche ce que tu as fait. Les cases suggérées ont un contour vert.</p><div class='week'><table><thead><tr><th>Geste</th>" + DAYS.map(function (d) { return "<th>" + d + "</th>"; }).join("") + "</tr></thead><tbody>";
    g.forEach(function (row) {
      html += "<tr><td>" + esc(row[1]) + "</td>";
      for (var d = 0; d < 7; d++) {
        var id = row[0] + "-" + d, on = !!wk[id], sug = row[2].indexOf(d) > -1;
        html += "<td><button class='dot' data-week='" + id + "' aria-pressed='" + on + "' aria-label='" + esc(row[1]) + ", " + DAYS[d] + "' style='" + (sug && !on ? "border-color:var(--sage)" : "") + "'>" + (on ? "✓" : "") + "</button></td>";
      }
      html += "</tr>";
    });
    html += "</tbody></table></div><div class='nav'><button class='btn link' data-act='resetweek'>Nouvelle semaine</button><button class='btn ghost' data-tab='reco'>← Mon rituel</button></div>";
    return html;
  };

  Widget.prototype.downloadIcs = function (k) {
    var info = REFILLS[k], st = this.state.refills[k];
    if (!st || !st.start) return;
    var next = addDays(st.start, +(st.days || info.days));
    var ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Sunsoari//Mon Rituel//FR", "BEGIN:VEVENT", "UID:" + k + "-" + ymd(next) + "@sunsoari", "DTSTAMP:" + ymd(new Date()) + "T000000Z",
      "DTSTART;VALUE=DATE:" + ymd(next), "SUMMARY:Changer mon " + info.label.toLowerCase() + " · Sunsoari", "DESCRIPTION:Recharge : " + this.url(k),
      "BEGIN:VALARM", "TRIGGER:-PT12H", "ACTION:DISPLAY", "DESCRIPTION:Recharge Sunsoari", "END:VALARM", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    var el = document.createElement("a");
    el.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    el.download = "recharge-sunsoari.ics";
    document.body.appendChild(el); el.click(); el.remove();
  };

  Widget.prototype.emit = function (name, detail) {
    try { this.host.dispatchEvent(new CustomEvent("sunsoari:" + name, { detail: detail, bubbles: true, composed: true })); } catch (e) { /* ancien navigateur */ }
  };

  // ---------- Interactions ----------
  Widget.prototype.onClick = function (e) {
    var t = e.target.closest ? e.target.closest("button,a,label") : null;
    if (!t) return;
    var d = t.dataset, s = this.state, self = this;

    if (d.act === "closesheet") { this.sheet = null; this.render(); return; }
    if (d.ing) { this.sheet = d.ing; this.render(); return; }
    if (d.tab && !t.disabled) { this.tab = d.tab; this.sheet = null; this.render(); return; }
    if (d.ingf) { this.ingFilter = d.ingf; this.render(); return; }
    if (d.tf) { this.trendFilter = d.tf; this.render(); return; }
    if (d.zone) { this.zone = this.zone === d.zone ? null : d.zone; this.render(); return; }
    if (d.obs) {
      var marks = s.answers[d.pq] || {}, list = (marks[this.zone] || []).slice(), j = list.indexOf(d.obs);
      if (j > -1) list.splice(j, 1); else list.push(d.obs);
      if (list.length) marks[this.zone] = list; else delete marks[this.zone];
      s.answers[d.pq] = marks; save(s); this.render(); return;
    }
    if (d.q) {
      var q = QUESTIONS.filter(function (x) { return x.id === d.q; })[0];
      if (q.multi) {
        var cur = (s.answers[q.id] || []).slice(), i = cur.indexOf(d.v);
        if (i > -1) cur.splice(i, 1);
        else if (q.none && d.v === q.none) cur = [d.v];
        else {
          cur = cur.filter(function (v) { return v !== q.none; });
          if (q.max && cur.length >= q.max) cur.shift();
          cur.push(d.v);
        }
        s.answers[q.id] = cur; save(s); this.render(); return;
      }
      s.answers[q.id] = d.v; save(s); this.render();
      if (this.step < this.visibleQuestions().length - 1) {
        clearTimeout(this.adv);
        this.adv = setTimeout(function () { self.step++; self.zone = null; self.render(); }, 260);
      }
      return;
    }
    if (d.act === "prev") { this.step = Math.max(0, this.step - 1); this.zone = null; this.render(); return; }
    if (d.act === "next") {
      if (this.step < this.visibleQuestions().length - 1) { this.step++; this.zone = null; }
      else { s.done = true; save(s); this.tab = "reco"; this.emit("result", { answers: s.answers, reco: recommend(s.answers) }); }
      this.render(); return;
    }
    if (d.act === "restart") { s.answers = {}; s.done = false; save(s); this.step = 0; this.photos = {}; this.tab = "diag"; this.render(); return; }
    if (d.act === "resetweek") { s.week = {}; save(s); this.render(); return; }
    if (d.week) { s.week[d.week] = !s.week[d.week]; save(s); this.render(); return; }
    if (d.ics) { this.downloadIcs(d.ics); return; }
    if (d.ext) { this.emit("external_click", { product: d.ext }); return; }
    if (d.add) {
      this.emit("add_to_cart", { variantId: +d.add });
      if (window.Shopify && window.Shopify.shop && location.origin === this.shop) {
        e.preventDefault();
        fetch("/cart/add.js", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: [{ id: +d.add, quantity: 1 }] }) })
          .then(function (r) { if (!r.ok) throw r; t.textContent = "Ajouté ✓"; document.dispatchEvent(new CustomEvent("cart:refresh")); })
          .catch(function () { location.href = self.cartUrl(d.add); });
      }
    }
  };

  Widget.prototype.onChange = function (e) {
    var d = e.target.dataset, self = this;
    if (d.photo) {
      var f = e.target.files && e.target.files[0];
      if (!f) return;
      if (this.photos[d.photo]) URL.revokeObjectURL(this.photos[d.photo]);
      this.photos[d.photo] = URL.createObjectURL(f); // en mémoire uniquement
      this.render(); return;
    }
    if (!d.refill) return;
    var st = this.state.refills[d.refill] || {};
    st[d.f] = e.target.value;
    this.state.refills[d.refill] = st; save(this.state); this.render();
  };

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

  window.SunsoariRituel = { init: init, recommend: recommend, routinePlan: routinePlan, insights: insights, catalog: P, otherBrands: EXT, ingredients: ING };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
