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
      desc: "Nettoyant visage moussant, à utiliser matin et soir.", for: ["seche", "sensible", "normale", "rougeurs"], url: "", affiliate: false },
    { brand: "Hada Labo", name: "Gokujyun Lotion", origin: "Japon", cat: "Visage",
      desc: "Lotion hydratante à l'acide hyaluronique, à appliquer après le nettoyage.", for: ["seche", "normale", "mixte", "secheresse"], url: "", affiliate: false },
    { brand: "COSRX", name: "Advanced Snail 96 Mucin Power Essence", origin: "Corée", cat: "Visage",
      desc: "Essence à la mucine d'escargot, texture fluide.", for: ["mixte", "normale", "texture"], url: "", affiliate: false },
    { brand: "Beauty of Joseon", name: "Relief Sun Rice + Probiotics SPF 50+", origin: "Corée", cat: "Visage",
      desc: "Crème solaire visage au riz, finition légère.", for: ["taches", "teint", "seche", "sensible", "mixte", "normale"], url: "", affiliate: false },
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
    var keys = [a.peau, a.texture, a.cheveux].concat(a.concerns || []), picked = [], cats = {};
    var cs = a.concerns || [];
    var sorted = EXT.slice().sort(function (x, y) {
      var hx = x.for.some(function (k) { return cs.indexOf(k) > -1; }) ? 0 : 1, hy = y.for.some(function (k) { return cs.indexOf(k) > -1; }) ? 0 : 1;
      return hx - hy;
    });
    sorted.forEach(function (p) {
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
  // Icônes au trait (style Lovi), dessinées en SVG 24×24.
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

  var SECTIONS = ["Ta douche", "Ta peau", "Tes cheveux", "Tes envies"];

  // Une entrée par écran. type "info" = écran intermédiaire (comme Lovi), sans question.
  var QUESTIONS = [
    { id: "lieu", sec: 0, title: "Où vas-tu surtout prendre soin de toi ?", sub: "On adapte le format à ta salle de bain.",
      options: [["maison", "À la maison", "Ma douche de tous les jours", "home"], ["voyage", "Souvent en déplacement", "Hôtel, location, salle de sport", "plane"], ["deux", "Les deux", "Un rituel à la maison et un qui me suit", "both"]] },
    { id: "flexible", sec: 0, title: "Ta douche a-t-elle un flexible avec une douchette à main ?", sub: "C'est ce qui permet de visser nos pommeaux et coques de diffusion.",
      options: [["oui", "Oui", "Un tuyau souple et une douchette", "shower"], ["non", "Non", "Seulement une douche de tête fixe", "no"], ["nsp", "Je ne sais pas", "On t'aide à vérifier", "ask"]] },
    { id: "eau", sec: 0, title: "Comment est l'eau chez toi ?", sub: "Indice : des traces blanches sur la robinetterie signalent souvent une eau calcaire.",
      link: ["Voir la qualité de l'eau de ta commune", "https://www.eaupotable.sante.gouv.fr/"],
      options: [["douce", "Plutôt douce", "Peu de traces blanches", "drop"], ["moyenne", "Moyenne", "Un peu de calcaire", "drops"], ["calcaire", "Calcaire", "Traces blanches fréquentes", "dots"], ["nsp", "Je ne sais pas", "", "ask"]] },
    { id: "infoEau", sec: 0, type: "info", kind: "eau" },
    { id: "peau", sec: 1, title: "Après la douche, ta peau est plutôt…", sub: "Ton ressenti suffit. Ce n'est pas un diagnostic médical.",
      options: [["seche", "Sèche, elle tiraille", "", "dry"], ["sensible", "Sensible, vite inconfortable", "", "flame"], ["mixte", "Mixte à grasse", "", "drops"], ["normale", "Confortable", "", "heart"]] },
    { id: "concerns", sec: 1, title: "Qu'aimerais-tu chouchouter en priorité ?", sub: "Plusieurs choix possibles. On adapte tes conseils.", multi: true, none: "aucune",
      options: [["secheresse", "Sécheresse, tiraillements", "", "dry"], ["imperfections", "Imperfections", "", "dots"], ["rougeurs", "Rougeurs, sensibilité", "", "flame"], ["teint", "Teint terne", "", "halfsun"], ["texture", "Grain de peau irrégulier", "", "wave"], ["taches", "Taches, teint inégal", "", "spots"], ["aucune", "Rien de particulier", "", "none"]] },
    { id: "routine", sec: 1, title: "As-tu une routine de soin au quotidien ?", sub: "",
      options: [["deux", "Oui, matin et soir", "", "sunmoon"], ["matin", "Seulement le matin", "", "sun"], ["soir", "Seulement le soir", "", "moon"], ["aucune", "Pas encore", "On commence simple", "sprout"]] },
    { id: "infoProfil", sec: 1, type: "info", kind: "profil" },
    { id: "texture", sec: 2, title: "Ta texture de cheveux ?", sub: "",
      options: [["raides", "Raides", "", "straight"], ["ondules", "Ondulés", "", "wavy"], ["boucles", "Bouclés", "", "curly"], ["crepus", "Frisés à crépus", "", "coily"]] },
    { id: "cheveux", sec: 2, title: "Et leur état en ce moment ?", sub: "",
      options: [["secs", "Secs ou ternes", "", "dry"], ["colores", "Colorés ou décolorés", "", "color"], ["fins", "Fins, vite plats", "", "thin"], ["ok", "Plutôt contente", "", "heart"]] },
    { id: "envies", sec: 3, title: "Qu'attends-tu de ta douche ?", sub: "Plusieurs choix possibles.", multi: true,
      options: [["senteur", "Un moment senteur", "Une douche qui sent bon", "flower"], ["chlore", "Moins de chlore", "Selon la fiche du fabricant", "drop"], ["soir", "Un rituel du soir", "Ralentir, se poser", "moon"], ["jet", "Un jet plus doux", "Un jet plus fin", "shower"], ["sansparfum", "Rien de parfumé", "Je préfère sans senteur", "none"]] },
    { id: "senteur", sec: 3, title: "Quelle senteur t'attire ?", sub: "Tu pourras en changer à chaque recharge.", skipIf: function (a) { return (a.envies || []).indexOf("sansparfum") > -1; },
      options: [["hinoki", "Hinoki", "Bois clair, apaisant", "tree"], ["ocean", "Océan", "Frais, iodé", "wave"], ["pin", "Forêt de Pin", "Vert, résineux", "leaf"], ["fleur", "Fleur de Prunier", "Floral, doux", "flower"], ["sans", "Sans senteur", "", "none"]] },
    { id: "budget", sec: 3, title: "Pour commencer, ton budget ?", sub: "Tu pourras compléter ton rituel plus tard.",
      options: [["petit", "Moins de 30 €", "", "coin"], ["moyen", "30 à 60 €", "", "coin"], ["grand", "Plus de 60 €", "", "coin"]] }
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
      main = a.budget === "petit" ? "setNomade" : "coffretNomade";
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

    var C = {
      secheresse: "Sécheresse : une eau tiède, une douche courte et un soin hydratant appliqué sur peau encore légèrement humide font partie des gestes souvent conseillés.",
      imperfections: "Imperfections : nettoie en douceur sans frotter, évite de toucher ou percer les boutons et change souvent ta taie d'oreiller. Si elles persistent, un ou une dermatologue peut t'accompagner.",
      rougeurs: "Rougeurs : privilégie l'eau tiède et des produits sans parfum. Des rougeurs qui durent méritent l'avis d'un ou d'une dermatologue.",
      teint: "Teint terne : sommeil, hydratation et protection solaire font partie des bases les plus souvent citées.",
      texture: "Grain de peau : évite les gommages trop fréquents ou trop abrasifs. Un nettoyage doux et régulier reste une bonne base.",
      taches: "Taches : la protection solaire quotidienne, toute l'année et sur toutes les carnations, est le geste le plus souvent conseillé. Un ou une dermatologue peut t'orienter."
    };
    var cs = (a.concerns || []).filter(function (k) { return C[k]; }).slice(0, 3);
    if (cs.length) out.splice(2, 0, ["Tes priorités", cs.map(function (k) { return C[k]; }).join(" ")]);
    if (a.routine === "aucune") out.push(["Ta routine", "Pas de routine pour l'instant ? Commence par deux gestes seulement : un nettoyage doux le soir et une protection solaire le matin. La régularité compte plus que le nombre de produits."]);

    if (a.flexible === "non") out.push(["Ta douche", "Sans flexible, nos pommeaux et coques ne se fixent pas directement. Écris-nous avec une photo de ta douche : on vérifie la compatibilité avec toi avant tout achat."]);
    if (a.flexible === "nsp") out.push(["Ta douche", "Regarde si ta douchette est reliée au mur par un tuyau souple. Si oui, nos produits se vissent sur le raccord standard. Un doute ? Envoie-nous une photo."]);
    return out;
  }

  function weeklyRitual(a) {
    var g = [["douche", "Douche tiède et courte", [0, 1, 2, 3, 4, 5, 6]]];
    if (a.peau === "seche" || a.peau === "sensible") g.push(["hydrate", "Soin corps après la douche", [0, 1, 2, 3, 4, 5, 6]]);
    else g.push(["hydrate", "Soin corps après la douche", [0, 2, 4, 6]]);
    if (a.routine === "matin" || a.routine === "aucune") g.push(["soirv", "Routine visage du soir", [0, 1, 2, 3, 4, 5, 6]]);
    if (a.routine === "soir" || a.routine === "aucune") g.push(["matinv", "Protection solaire le matin", [0, 1, 2, 3, 4, 5, 6]]);
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
    "@media (prefers-reduced-motion:reduce){*{transition:none!important}}",
    ".opt:active{transform:scale(.99)}"
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
    html = html.replace("<div class='body'>", "<div class='body" + (this.tab === "diag" ? "" : " paper") + "'>");
    html += this.tab === "diag" ? this.renderDiag() : this.tab === "reco" ? this.renderReco() : this.renderPlan();
    html += "</div><div class='foot'><span>Tes réponses restent dans ton navigateur. Aucune donnée n'est envoyée.</span><a href='" + esc(this.contact) + "' target='_blank' rel='noopener'>Une question ? Écris-nous</a></div></div>";
    this.root.innerHTML = html;
  };

  Widget.prototype.progressPct = function () {
    var qs = this.visibleQuestions().filter(function (q) { return q.type !== "info"; }), a = this.state.answers;
    var n = qs.filter(function (q) { return q.multi ? (a[q.id] || []).length : a[q.id]; }).length;
    return { pct: Math.round((n / qs.length) * 100), left: qs.length - n };
  };

  Widget.prototype.renderDiag = function () {
    var qs = this.visibleQuestions();
    if (this.step >= qs.length) this.step = qs.length - 1;
    var q = qs[this.step], a = this.state.answers, step = this.step;

    // Barre de progression en segments, un par grande étape.
    var segs = SECTIONS.map(function (name, i) {
      var inSec = qs.filter(function (x) { return x.sec === i; });
      var done = inSec.filter(function (x) { return qs.indexOf(x) < step; }).length;
      var w = q.sec > i ? 100 : q.sec < i ? 0 : Math.max(6, Math.round((done / inSec.length) * 100));
      return "<span class='seg' title='" + name + "'><i style='width:" + w + "%'></i></span>";
    }).join("");
    var html = "<div class='qhead'><button class='back' data-act='prev' aria-label='Question précédente'" + (step === 0 ? " disabled" : "") + "><svg viewBox='0 0 24 24'><path d='M15 5l-7 7 7 7'/></svg></button><div class='segs'>" + segs + "</div></div>";
    html += "<p class='kicker'>" + SECTIONS[q.sec] + "</p>";

    if (q.type === "info") return html + this.renderInfo(q);

    var val = a[q.id];
    html += "<div class='q'><h3>" + esc(q.title) + "</h3>" + (q.sub ? "<p class='sub'>" + esc(q.sub) + "</p>" : "");
    if (q.link) html += "<a class='ext' href='" + q.link[1] + "' target='_blank' rel='noopener'>" + esc(q.link[0]) + " ↗</a>";
    html += "<div class='opts' role='" + (q.multi ? "group" : "radiogroup") + "'>";
    for (var i = 0; i < q.options.length; i++) {
      var o = q.options[i];
      var on = q.multi ? (val || []).indexOf(o[0]) > -1 : val === o[0];
      html += "<button class='opt' data-q='" + q.id + "' data-v='" + o[0] + "' aria-pressed='" + on + "'><span class='ico'>" + icon(o[3]) + "</span><span class='lbl'>" + esc(o[1]) + (o[2] ? "<small>" + esc(o[2]) + "</small>" : "") + "</span><span class='" + (q.multi ? "chk" : "rad") + "'></span></button>";
    }
    html += "</div></div>";
    var ready = q.multi ? (val || []).length > 0 : !!val;
    if (q.multi || step === qs.length - 1) html += "<div class='cta'><button class='btn big' data-act='next'" + (ready ? "" : " disabled") + ">" + (step === qs.length - 1 ? "Découvrir mon rituel" : "Continuer") + "</button></div>";
    html += "<p class='note'>Ce diagnostic repose sur ton ressenti. Il ne remplace pas l'avis d'un ou d'une professionnelle de santé.</p>";
    return html;
  };

  // Écrans intermédiaires : on informe et on montre où en est le profil (chiffre réel, pas une promesse).
  Widget.prototype.renderInfo = function (q) {
    var p = this.progressPct(), a = this.state.answers;
    var C = 2 * Math.PI * 52, ring = "<svg class='ring' viewBox='0 0 120 120' aria-hidden='true'><circle cx='60' cy='60' r='52' class='rt'/><circle cx='60' cy='60' r='52' class='rv' stroke-dasharray='" + (C * p.pct / 100).toFixed(1) + " " + C.toFixed(1) + "' transform='rotate(-90 60 60)'/></svg><div class='ringtxt'><b>" + p.pct + " %</b><small>de ton profil</small></div>";
    var html = "<div class='info'>";
    if (q.kind === "eau") {
      html += "<h3>Le savais-tu ?</h3><ul class='facts'>" +
        "<li>" + icon("drop") + "<span>En France, l'eau du robinet est potable et très contrôlée.</span></li>" +
        "<li>" + icon("dots") + "<span>Sa teneur en calcaire varie beaucoup d'une région à l'autre.</span></li>" +
        "<li>" + icon("shower") + "<span>Le chlore sert à la désinfecter : il est normal d'en trouver un peu. Certains filtres de douche sont conçus pour en réduire une partie, selon leurs fabricants.</span></li></ul>";
      html += "<div class='ringwrap small'>" + ring + "</div><p class='sub center'>Passons à ta peau.</p>";
    } else {
      var labels = { seche: "Peau sèche", sensible: "Peau sensible", mixte: "Peau mixte à grasse", normale: "Peau confortable", calcaire: "Eau calcaire", douce: "Eau douce", moyenne: "Eau moyenne", voyage: "Nomade", maison: "Rituel maison", deux: "Maison et voyage" };
      var chips = [a.lieu, a.eau, a.peau].map(function (k) { return labels[k]; }).filter(Boolean);
      html += "<div class='ringwrap'>" + ring + "</div><h3 class='center'>Ton rituel se précise</h3><p class='sub center'>On connaît ta douche et ta peau. Encore " + p.left + " questions sur tes cheveux et tes envies pour qu'il te ressemble vraiment.</p>";
      html += "<div class='chips'>" + chips.map(function (c) { return "<span>" + esc(c) + "</span>"; }).join("") + "</div>";
    }
    html += "</div><div class='cta'><button class='btn big' data-act='next'>" + (q.kind === "eau" ? "Continuer" : "Affiner mon rituel") + "</button></div>";
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
        if (i > -1) cur.splice(i, 1);
        else if (q.none && d.v === q.none) cur = [d.v];
        else { cur.push(d.v); if (q.none) cur = cur.filter(function (v) { return v !== q.none; }); }
        s.answers[q.id] = cur; save(s); this.render(); return;
      }
      s.answers[q.id] = d.v; save(s);
      this.render();
      var self = this, qs = this.visibleQuestions();
      if (this.step < qs.length - 1) {
        clearTimeout(this.adv);
        this.adv = setTimeout(function () { self.step++; self.render(); }, 260);
      }
      return;
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
