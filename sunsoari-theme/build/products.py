"""Build one dedicated product template per Sunsoari product.

Existing templates (already written from the product sheets) are kept and
completed with images and the short intro of each sheet. Missing templates are
created from the closest existing one, with the content of the matching sheet.
"""
from images import (
    LIFESTYLE,
    ONSHA_CAPSULE_BY_SCENT,
    ONSHA_FILTER_BY_SCENT,
    ONSHA_HOWTO,
    ONSHA_SCENTS,
    PRODUCT,
    SHIFT_COLLECTIONS,
    SHIFT_STEPS,
)
from lib import by_type, clone, find, load, save, set_text
from product_parts import (
    set_badge,
    set_cards_group,
    set_cross_sell,
    set_faq,
    set_highlights,
    set_images_in_order,
    set_intro,
    set_main_accordions,
    set_quantity_breaks,
    set_reasons,
    set_slider,
    set_steps,
    set_tabs,
    set_title,
    set_toggle,
)

PHOTO = 100  # image width (%) for photos inside cards
SCENTS = ["Hinoki", "Océan", "Pin", "Fleur de Prunier"]
SCENT_TEXT = {
    "Hinoki": ("Hinoki · Calme absolu", "Cyprès, bois chaud, musc doux. Pour les soirs de détente."),
    "Océan": ("Océan · Fraîcheur marine", "Embruns marins, sel minéral, végétal aquatique. Pour les matins."),
    "Pin": ("Pin · Énergie des forêts", "Pin frais, résine, terre humide. Pour bien démarrer la journée."),
    "Fleur de Prunier": ("Fleur de Prunier · Douceur florale", "Fleur de prunier, poudré doux, bois blanc. Pour un moment tout en douceur."),
}
SHIPPING = (
    "Livraison & retours",
    "<p>Ta commande est préparée avec soin et expédiée en livraison suivie partout en France métropolitaine. "
    "Les délais et frais exacts s'affichent au moment du paiement.</p><p>Retour possible sous 14 jours, produit non ouvert, "
    "non utilisé, complet et dans son emballage d'origine, pour des raisons d'hygiène. Tous les détails sont dans notre politique de retours.</p>",
)
FAQ_SHIPPING = [
    ("Quels sont les délais de livraison ?", "Ta commande est préparée avec soin et expédiée en livraison suivie partout en France métropolitaine. Les délais et frais exacts s'affichent au moment du paiement."),
    ("Puis-je retourner le produit ?", "Oui, sous 14 jours, à condition que le produit soit non ouvert, non utilisé, complet et dans son emballage d'origine, pour des raisons d'hygiène. Tous les détails sont dans notre politique de retours."),
]

# Short intro shown under the product title (from each sheet).
INTRO = {
    "pommeau-filtrant": "Cette pomme filtrante au design transparent délivre un jet fin et uniforme, pour une douche plus douce au quotidien.",
    "douchette-filtrante": "Cette douchette compacte au filtre intégré transforme n'importe quelle douche en rituel filtrant, chez toi, à l'hôtel, partout.",
    "capsule-nomade": "Le cœur de ton rituel Nomade : une capsule inspirée des sources thermales coréennes, qui se change en quelques secondes.",
    "filtre-thermal-home": "Le cœur de ton rituel Home : un filtre 2-en-1, sédiments et soin, inspiré des sources thermales coréennes.",
    "filtre-thermal-sans-senteur": "La même composition que nos filtres thermaux Home, sans senteur ajoutée : pour un rituel thermal tout en neutralité.",
    "set-decouverte-home": "La coque de diffusion et 4 filtres thermaux, un de chaque senteur : tout pour débuter ton rituel Home.",
    "starter-home": "Le pommeau filtrant, la coque de diffusion Home et un filtre thermal dans la senteur de ton choix : la façon la plus simple de commencer.",
    "premier-rituel-home": "La coque de diffusion Home et un filtre thermal dans la senteur de ton choix : garde ton pommeau, découvre le rituel.",
    "coque-diffusion-nomade": "La coque compacte qui accueille tes capsules thermales et se fixe sur ta douchette : la pièce du rituel Nomade.",
    "coque-diffusion-home": "La coque grand format qui accueille tes filtres thermaux et relie ton flexible à ton pommeau : la pièce centrale du rituel Home.",
    "housse-douchette": "La housse en silicone qui protège ta douchette Onsha et en fait un objet à ton image, à personnaliser, à collectionner, à offrir.",
    "filtre-sediment-douchette": "La recharge essentielle de ta douchette Onsha : une filtration mécanique qui retient les sédiments et impuretés visibles de l'eau.",
    "filtre-robinet": "Le filtre qui retient les sédiments et impuretés visibles de l'eau, directement au robinet de ton lavabo. Sans outil, sans plombier.",
    "pack-sediments-robinet": "La recharge triple de ton Filtre Robinet Lavabo : 6 à 9 mois de filtration d'avance.",
    "coffret-soin-shift": "Pommeau filtrant, capsule Tea Tree & Lavender et filtre Pure Water : le rituel SHIFT complet, prêt à installer.",
    "pack-6-capsules-shift": "Six capsules de soin et d'aromathérapie SHIFT, chacune une expérience sensorielle à découvrir.",
    "pack-3-filtres-shift": "La recharge triple de ton pommeau SHIFT : 6 à 9 mois de filtration d'avance.",
    "coffret-aromatherapie-shift": "Pommeau, flexible 2 m, 3 filtres Pure Water et 6 capsules : le système SHIFT complet, prêt à installer.",
    "coffret-home": "Pommeau, flexible 2 m, coque de diffusion et 4 filtres thermaux : le rituel Home complet et durable.",
    "coffret-nomade": "Douchette, housse personnalisable, coque nomade et 4 capsules thermales : le rituel thermal qui te suit partout.",
    "set-decouverte-nomade": "La coque nomade et 4 capsules thermales avec leurs disques sédiment : tout pour débuter ton rituel Nomade.",
}


def S(t, key):
    return t["sections"][key]


def intro(t, name):
    main = S(t, "main")
    body = [b for b in main["block_order"] if main["blocks"][b]["type"] == "text"][1]
    set_text(main["blocks"][body], f"<p>{INTRO[name]}</p>")


def scent_slides(images):
    return [(*SCENT_TEXT[s], images[s]) for s in SCENTS]


# --------------------------------------------------------------------------
# 1. Existing templates: add images + intro
# --------------------------------------------------------------------------

def patch_existing():
    out = {}

    t = load("templates/product.pommeau-filtrant.json")
    set_images_in_order(S(t, "la_technologie_onsha"), PRODUCT["pommeau"][1:5], PHOTO)
    set_images_in_order(S(t, "comment_ca_marche"), [PRODUCT["pommeau"][0]], 80)
    out["pommeau-filtrant"] = t

    t = load("templates/product.capsule-nomade.json")
    set_images_in_order(S(t, "nos_diff_rentes_senteurs"), [ONSHA_SCENTS[s] for s in SCENTS], PHOTO)
    set_images_in_order(S(t, "comment_ca_marche"), [ONSHA_HOWTO["capsule"]], 80)
    out["capsule-nomade"] = t

    t = load("templates/product.coque-diffusion-home.json")
    set_images_in_order(S(t, "la_technologie_onsha"), PRODUCT["coque"] + [ONSHA_FILTER_BY_SCENT["Hinoki"]], PHOTO)
    set_images_in_order(S(t, "comment_ca_marche"), [ONSHA_HOWTO["coque"]], 80)
    out["coque-diffusion-home"] = t

    t = load("templates/product.filtre-robinet.json")
    set_images_in_order(S(t, "la_base_du_rituel_skinca"), PRODUCT["robinet"][1:4], PHOTO)
    set_images_in_order(S(t, "comment_ca_marche"), [PRODUCT["robinet"][4]], 80)
    out["filtre-robinet"] = t

    t = load("templates/product.filtre-sediment-douchette.json")
    set_images_in_order(S(t, "comment_ca_marche"), [PRODUCT["sediment_douchette"][1]], 80)
    out["filtre-sediment-douchette"] = t

    t = load("templates/product.filtre-thermal-home.json")
    set_images_in_order(S(t, "nos_diff_rentes_senteurs"), [ONSHA_SCENTS[s] for s in SCENTS], PHOTO)
    set_images_in_order(S(t, "comment_ca_marche"), [ONSHA_HOWTO["installer_recharge"]], 80)
    out["filtre-thermal-home"] = t

    t = load("templates/product.filtre-thermal-sans-senteur.json")
    set_images_in_order(S(t, "comment_ca_marche"), [ONSHA_HOWTO["installer_recharge"]], 80)
    out["filtre-thermal-sans-senteur"] = t

    t = load("templates/product.housse-douchette.json")
    set_images_in_order(S(t, "le_style_onsha"), PRODUCT["housse"][4:8], PHOTO)
    set_images_in_order(S(t, "comment_ca_marche"), [PRODUCT["housse"][1]], 80)
    out["housse-douchette"] = t

    t = load("templates/product.pack-3-filtres-shift.json")
    set_images_in_order(S(t, "comment_ca_marche"), [SHIFT_STEPS["filter_1"]], 80)
    out["pack-3-filtres-shift"] = t

    t = load("templates/product.pack-6-capsules-shift.json")
    set_images_in_order(S(t, "notes_olfactives_par_col"), list(SHIFT_COLLECTIONS.values()), PHOTO)
    set_images_in_order(S(t, "ingr_dients_cl_s"), [None, None, SHIFT_STEPS["tea_tree"]], PHOTO)
    set_images_in_order(S(t, "comment_ca_marche"), [SHIFT_STEPS["capsule_1"]], 80)
    out["pack-6-capsules-shift"] = t

    t = load("templates/product.pack-sediments-robinet.json")
    set_images_in_order(S(t, "comment_ca_marche"), [PRODUCT["robinet"][2]], 80)
    out["pack-sediments-robinet"] = t

    t = load("templates/product.set-decouverte-home.json")
    set_images_in_order(S(t, "dans_ton_coffret"), [PRODUCT["coque"][0], PRODUCT["filtre_home"][0]], PHOTO)
    set_images_in_order(S(t, "tes_senteurs"), [ONSHA_SCENTS[s] for s in SCENTS], PHOTO)
    set_images_in_order(S(t, "comment_ca_marche"), [ONSHA_HOWTO["installer_recharge"]], 80)
    out["set-decouverte-home"] = t

    t = load("templates/product.coffret-soin-shift.json")
    set_images_in_order(S(t, "dans_ton_coffret"), [PRODUCT["shift_coffret_soin"][0], SHIFT_STEPS["tea_tree"], PRODUCT["shift_filtres"][0]], PHOTO)
    set_images_in_order(S(t, "ingr_dients_cl_s"), [SHIFT_STEPS["tea_tree"]], PHOTO)
    set_images_in_order(S(t, "comment_ca_marche"), [SHIFT_STEPS["hose_1"]], 80)
    out["coffret-soin-shift"] = t
    return out


# --------------------------------------------------------------------------
# 2. New templates
# --------------------------------------------------------------------------

def douchette():
    """FICHE-02 · Onsha · Douchette Filtrante (from the pommeau template)."""
    t = clone(load("templates/product.pommeau-filtrant.json"))
    m = S(t, "main")
    set_badge(m, "FORMAT NOMADE")
    set_highlights(m, ["Tout-en-un", "Format compact", "Installation sans outil"])
    set_toggle(m, "N'oublie pas l'indispensable", "Le filtre sédiment qui entretient ta douchette.", ["filtre-sediment-recharge"])
    set_cross_sell(m, ["coffret-mini"], "Le rituel Nomade complet", "Douchette, housse, coque nomade et 4 capsules thermales réunies.")
    set_main_accordions(m, [
        ("Caractéristiques & matériaux", "<p>ABS, polycarbonate (PC), polypropylène (PP), inox (SS). Matériaux conformes FDA selon le fabricant. Compatible avec tous les flexibles de douche standard. Bouchon anti-écoulement intégré. À associer aux recharges compatibles Onsha pour prolonger le rituel.</p><p>Usage domestique uniquement. L'eau de la douche n'est pas destinée à la consommation. Ne pas forcer le vissage.</p>"),
        SHIPPING,
    ])
    tech = S(t, "la_technologie_onsha")
    tech["name"] = "La technologie Onsha"
    set_intro(tech, "Une douchette pensée en Corée pour celles qui ne veulent aucune contrainte : tout est intégré dans un seul objet, léger et prêt à te suivre partout.")
    set_slider(tech, [
        ("Filtre intégré au corps", "Le filtre sédiment se loge directement dans la douchette.", PRODUCT["douchette"][1]),
        ("Bouchon anti-écoulement", "Coupe l'eau à la douchette pendant que tu te savonnes.", PRODUCT["douchette"][2]),
        ("Format compact", "Léger, il glisse dans une trousse ou une valise.", PRODUCT["douchette"][3]),
        ("Compatible rituel Nomade", "Avec la coque nomade et les capsules thermales.", PRODUCT["douchette"][4]),
    ], PHOTO)
    set_steps(S(t, "comment_ca_marche"), [
        "<strong>Dévisse</strong> ton pommeau ou ta douchette actuelle.",
        "<strong>Visse</strong> la douchette Onsha sur le flexible, à la main, sans forcer, chez toi comme à l'hôtel.",
        "<strong>Insère</strong> le filtre sédiment dans le compartiment dédié.",
        "<strong>Fais couler l'eau</strong> quelques secondes : ton rituel peut commencer, où que tu sois.",
    ], image=ONSHA_HOWTO["douchette"], image_width=80,
        advice="Le bouchon anti-écoulement te permet de couper l'eau directement à la douchette pendant que tu te savonnes : un geste simple pour éviter le gaspillage. Pour un rituel sensoriel en déplacement, découvre le Coffret Nomade et ses capsules thermales.")
    set_faq(S(t, "faq"), [
        ("Quelle différence entre la douchette et le pommeau Onsha ?", "Le pommeau est pensé pour rester installé chez toi, avec la coque de diffusion Home. La douchette est le format tout-en-un : filtre intégré, plus compacte, idéale en déplacement ou pour un rituel plus simple à la maison."),
        ("Est-ce que je peux l'installer moi-même ?", "Oui ! Elle se visse à la main sur tout flexible standard, en quelques secondes, sans outil, chez toi comme à l'hôtel ou en location."),
        ("Le filtre est-il inclus dans la boîte ?", "La douchette est livrée prête à l'emploi. Les filtres sédiment de recharge sont disponibles sur Sunsoari."),
        ("Quand remplacer le filtre sédiment ?", "Trois signes : le débit diminue, le filtre change de couleur, ou l'eau te semble moins agréable. Il suffit alors d'insérer une recharge, en quelques secondes, sans outil."),
        *FAQ_SHIPPING,
    ])
    return t


def _onsha_box(base_badge, highlights, toggle, cross, accordions, coffret_items, senteurs_images, steps, step_image, faq, advice=None):
    t = clone(load("templates/product.set-decouverte-home.json"))
    m = S(t, "main")
    set_badge(m, base_badge)
    set_highlights(m, highlights)
    set_toggle(m, *toggle) if toggle else set_toggle(m, handles=None)
    set_cross_sell(m, *cross) if cross else set_cross_sell(m, None)
    set_main_accordions(m, accordions)
    set_cards_group(S(t, "dans_ton_coffret"), coffret_items, PHOTO)
    set_slider(S(t, "tes_senteurs"), scent_slides(senteurs_images), PHOTO)
    set_steps(S(t, "comment_ca_marche"), steps, image=step_image, image_width=80)
    set_faq(S(t, "faq"), faq)
    return t


SCENTS_ACCORDION = (
    "Découvre tes 4 senteurs",
    "<p><strong>Hinoki (calme absolu) :</strong> cyprès, bois chaud, musc doux. Idéale le soir.</p>"
    "<p><strong>Océan (fraîcheur marine) :</strong> embruns marins, sel minéral, végétal aquatique. Parfaite le matin.</p>"
    "<p><strong>Pin (énergie des forêts) :</strong> pin frais, résine, terre humide. Tonique dès le réveil.</p>"
    "<p><strong>Fleur de Prunier (douceur florale) :</strong> fleur de prunier, poudré doux, bois blanc. Apaisante et délicate.</p>",
)


def coffret_home():
    """FICHE-15 · Onsha · Coffret Douche Thermal Coréen (Home)."""
    return _onsha_box(
        "LE RITUEL COMPLET ET DURABLE",
        ["Pommeau + flexible + coque + 4 filtres", "3 à 4 mois de rituel inclus", "Installation sans outil"],
        ("Pense à tes recharges", "Les filtres thermaux vitaminés, dans ta senteur préférée.", ["filtre-vitamine-showerfilter-sunsoari"]),
        None,
        [
            ("Composition & principes actifs", "<p><strong>Pommeau filtrant :</strong> polycarbonate (PC), polypropylène (PP), inox (SS), billes filtrantes intégrées.</p><p><strong>Coque de diffusion Home :</strong> polypropylène (PP) et silicone, sans BPA, conformes FDA selon le fabricant.</p><p><strong>Filtres thermaux vitaminés :</strong> eau thermale soufrée extraite à 808 m dans le granit coréen, lyophilisée et concentrée 4 fois, vitamine C, acide hyaluronique, glycérine, MSM et senteur inspirée des régions thermales coréennes. La liste complète des ingrédients (INCI) figure sur chaque emballage.</p><p>Usage externe uniquement. Tenir hors de portée des enfants. En cas de sensibilité connue aux parfums, consulte la liste INCI avant utilisation.</p>"),
            ("Durée & entretien", "<p><strong>Filtres :</strong> environ 3 à 4 semaines chacun, soit 3 à 4 mois de rituel avec les 4 filtres inclus, selon ta fréquence de douche.</p><p><strong>Entretien :</strong> rince régulièrement la coque de diffusion. Le pommeau et le flexible ne demandent pas d'entretien particulier.</p>"),
            SCENTS_ACCORDION,
            SHIPPING,
        ],
        [
            ("Pommeau Filtrant Onsha ×1", "La base du rituel", PRODUCT["pommeau"][0]),
            ("Flexible 2 m ×1", "Pour installer tout le système", PRODUCT["coffret_home"][1]),
            ("Coque de diffusion Home ×1", "Accueille les filtres", PRODUCT["coque"][0]),
            ("Filtres thermaux ×4", "Hinoki, Océan, Pin, Fleur de Prunier", PRODUCT["filtre_home"][0]),
        ],
        ONSHA_SCENTS,
        [
            "<strong>Raccorde</strong> le flexible à ta douche, à la main, sans outil.",
            "<strong>Ouvre</strong> la coque de diffusion et <strong>insère</strong> un filtre, dans la senteur de ton choix.",
            "<strong>Visse</strong> la coque sur le flexible, puis le pommeau sur la coque.",
            "<strong>Ouvre l'eau</strong> : ton rituel thermal commence.",
        ],
        ONSHA_HOWTO["installer_recharge"],
        [
            ("Puis-je garder mon flexible actuel ?", "Oui, si tu préfères. Le coffret inclut un flexible neuf, mais le système se visse aussi sur ton flexible standard."),
            ("Combien de temps durent les filtres ?", "Environ 3 à 4 semaines chacun selon ta fréquence de douche, soit 3 à 4 mois avec les 4 filtres inclus. Quand le débit baisse ou que la senteur s'estompe, c'est le moment de changer."),
            ("Puis-je commander juste les recharges ensuite ?", "Oui. Les Filtres Thermaux Vitaminés (Home) sont disponibles à l'unité ou en pack, dans chacune des quatre senteurs, ainsi qu'en version sans senteur."),
            ("Les 4 senteurs sont-elles incluses ?", "Oui : Hinoki, Océan, Pin et Fleur de Prunier, une de chaque pour explorer."),
            ("Peut-on l'utiliser en location ?", "Oui ! Le système se monte et se démonte sans outil : en partant, tu emportes ton rituel avec toi."),
            *FAQ_SHIPPING,
        ],
    )


def coffret_nomade():
    """FICHE-16 · Onsha · Coffret Douche Thermal Coréen (Nomade)."""
    return _onsha_box(
        "LE RITUEL THERMAL PORTABLE",
        ["Douchette + housse + coque + 4 capsules", "10 à 15 jours de soin par capsule", "Installation sans outil"],
        ("Pense à tes recharges", "Les capsules thermales nomades, dans ta senteur préférée.", ["capsule-vitaminee-shower-filter-sunsoari"]),
        None,
        [
            ("Composition & principes actifs", "<p><strong>Douchette filtrante :</strong> ABS, polycarbonate (PC), polypropylène (PP), inox (SS).</p><p><strong>Housse :</strong> silicone souple, sans BPA.</p><p><strong>Capsules thermales :</strong> eau thermale soufrée extraite à 808 m dans le granit coréen, lyophilisée et concentrée 4 fois, vitamine C, acide hyaluronique, glycérine, MSM et senteur inspirée des régions thermales coréennes. Chaque capsule est livrée avec son disque sédiment. La liste complète des ingrédients (INCI) figure sur chaque emballage.</p><p>Usage externe uniquement. Tenir hors de portée des enfants. En cas de sensibilité connue aux parfums, consulte la liste INCI avant utilisation.</p>"),
            ("Durée & entretien", "<p><strong>Capsules :</strong> environ 10 à 15 jours chacune selon ta fréquence de douche. Change le disque sédiment en même temps que la capsule.</p><p><strong>Housse :</strong> lavable à l'eau tiède, clips interchangeables.</p><p><strong>Entretien :</strong> rince régulièrement la coque nomade.</p>"),
            SCENTS_ACCORDION,
            SHIPPING,
        ],
        [
            ("Douchette Filtrante Onsha ×1", "Le système portable", PRODUCT["douchette"][0]),
            ("Housse personnalisable ×1", "Protège ta douchette", PRODUCT["housse"][0]),
            ("Coque de diffusion Nomade ×1", "Accueille les capsules", PRODUCT["coffret_nomade"][1]),
            ("Capsules thermales ×4", "Hinoki, Océan, Pin, Fleur de Prunier", PRODUCT["capsule"][0]),
        ],
        ONSHA_SCENTS,
        [
            "<strong>Ouvre</strong> la coque nomade et <strong>insère</strong> une capsule avec son disque sédiment.",
            "<strong>Ferme</strong> la coque et fixe-la sur la douchette.",
            "<strong>Visse</strong> le tout sur ton flexible de douche standard, sans outil.",
            "<strong>Ouvre l'eau</strong> : ton rituel commence, à la maison comme en voyage.",
        ],
        ONSHA_HOWTO["coffret_nomade"],
        [
            ("Combien de temps dure chaque capsule ?", "Environ 10 à 15 jours selon ta fréquence de douche. Quand la capsule est vide et transparente, remplace-la avec son disque sédiment."),
            ("Puis-je commander juste les recharges ensuite ?", "Oui. Les Capsules Thermales Coréennes (Nomade) sont disponibles à l'unité ou en pack, dans chacune des quatre senteurs."),
            ("Les 4 senteurs sont-elles incluses ?", "Oui : Hinoki, Océan, Pin et Fleur de Prunier, une de chaque pour explorer."),
            ("Puis-je changer la couleur de ma housse ?", "Oui : la Housse Personnalisable existe en plusieurs coloris, avec des clips interchangeables."),
            ("Peut-on l'utiliser en voyage ou en résidence secondaire ?", "Oui, c'est tout l'esprit du Nomade : tu ranges le coffret, tu le sors n'importe où et tu l'installes en quelques secondes."),
            *FAQ_SHIPPING,
        ],
    )


def set_nomade():
    """FICHE-17 · Onsha · Set Découverte Nomade."""
    t = _onsha_box(
        "DÉBUTE TON RITUEL NOMADE",
        ["Coque nomade + 4 capsules", "Les 4 senteurs coréennes", "Prix plus doux qu'à l'unité"],
        ("Passe au rituel Nomade complet", "La douchette filtrante sur laquelle se fixe ta coque.", ["douchette-filtrante"]),
        None,
        [
            ("Contenu du set", "<p><strong>1 coque de diffusion (Nomade) :</strong> la pièce compacte qui accueille tes capsules et leurs disques sédiment.</p><p><strong>4 capsules thermales coréennes (Nomade) :</strong> une de chaque senteur, Hinoki, Océan, Pin et Fleur de Prunier.</p><p><strong>4 disques sédiment :</strong> un par capsule, dans le même sachet. Ils se changent ensemble.</p><p>À associer avec la Douchette Filtrante Onsha pour le système Nomade complet.</p>"),
            ("Composition & sécurité", "<p><strong>Coque (Nomade) :</strong> polypropylène (PP) et silicone, sans BPA.</p><p><strong>Capsules thermales :</strong> eau thermale soufrée lyophilisée concentrée 4 fois, vitamine C, acide hyaluronique, glycérine, senteur inspirée des régions thermales coréennes. La liste complète des ingrédients (INCI) figure sur chaque emballage.</p><p><strong>Disques sédiment :</strong> filtration mécanique multicouche des sédiments et impuretés visibles.</p><p>Usage externe uniquement. Tenir hors de portée des enfants. En cas de sensibilité connue aux parfums, consulte la liste INCI avant utilisation.</p>"),
            SCENTS_ACCORDION,
            SHIPPING,
        ],
        [
            ("Coque de diffusion Nomade ×1", "Accueille capsule et disque", PRODUCT["set_nomade"][1]),
            ("Capsules thermales ×4", "Hinoki, Océan, Pin, Fleur de Prunier", PRODUCT["capsule"][0]),
            ("Disques sédiment ×4", "Un par capsule, à changer ensemble", PRODUCT["sediment_douchette"][1]),
        ],
        ONSHA_SCENTS,
        [
            "<strong>Ouvre</strong> la coque nomade.",
            "<strong>Insère</strong> le disque sédiment puis la capsule, dans la senteur de ton choix.",
            "<strong>Referme</strong> et fixe la coque sur ta douchette.",
            "<strong>Ouvre l'eau</strong> : ton rituel commence.",
        ],
        ONSHA_HOWTO["capsule"],
        [
            ("Pourquoi ce set plutôt que chaque pièce seule ?", "Le Set Découverte Nomade regroupe la coque et 4 capsules avec leurs disques à un prix plus doux que l'achat séparé. Parfait pour démarrer et explorer les quatre senteurs."),
            ("Avec quelle douchette l'associer ?", "Avec la Douchette Filtrante Onsha, pour le système Nomade complet. Tu peux aussi choisir le Coffret Douche Thermal Coréen (Nomade), qui réunit tout."),
            ("Combien de temps dure chaque capsule ?", "Environ 10 à 15 jours selon ta fréquence de douche. Avec 4 capsules, tu as 40 à 60 jours de rituel."),
            ("Pourquoi un disque sédiment avec chaque capsule ?", "Capsule et disque fonctionnent ensemble : la capsule apporte le soin et la senteur, le disque retient les sédiments. Ils se remplacent en même temps."),
            *FAQ_SHIPPING,
        ],
    )
    return t


def coffret_aromatherapie_shift():
    """FICHE-14 · SHIFT · Coffret Douche & Aromathérapie (from the SHIFT soin template)."""
    t = clone(load("templates/product.coffret-soin-shift.json"))
    m = S(t, "main")
    set_badge(m, "LE SYSTÈME SHIFT COMPLET")
    set_highlights(m, ["Pommeau + flexible 2 m + 3 filtres + 6 capsules", "Soin, filtration et senteurs inclus", "Prêt à installer"])
    set_cross_sell(m, ["pack-6-capsules-vitaminees-shift-sunsoari"], "Tes prochaines capsules", "5 collections de senteurs à découvrir.")
    set_main_accordions(m, [
        ("Ce qu'il y a dans le coffret", "<p>1 pommeau de douche filtrant SHIFT, le système réutilisable.</p><p>1 flexible silicone 2 m.</p><p>3 filtres Pure Water, pour 6 à 9 mois de filtration.</p><p>6 capsules de soin & aromathérapie : 2 Tea Tree & Lavender, 2 Basil & Grass, 2 Ginger & Bergamote.</p>"),
        ("Actifs & INCI", "<p>Chaque capsule associe une senteur à base d'huiles essentielles à des actifs hydratants : glycérine et acide hyaluronique.</p><p><strong>Tea Tree & Lavender :</strong> huiles essentielles de tea tree et de lavande. <strong>Basil & Grass :</strong> huile essentielle de basilic et notes d'herbes fraîches. <strong>Ginger & Bergamote :</strong> huiles essentielles de gingembre et de bergamote.</p><p>La liste complète des ingrédients (INCI) et des allergènes figure sur l'emballage.</p>"),
        ("Filtration & entretien", "<p>Le filtre Pure Water et la capsule travaillent ensemble : l'eau est d'abord filtrée, puis enrichie. Le filtre se change environ tous les 2 à 3 mois selon ton eau ; la capsule quand elle est vide.</p><p>Usage externe et domestique uniquement. En cas de sensibilité connue aux parfums ou aux huiles essentielles, consulte la liste INCI avant utilisation. Ne force pas le vissage.</p>"),
        SHIPPING,
    ])
    set_title(S(t, "dans_ton_coffret"), "<h2>Les 4 éléments de ton coffret</h2>")
    set_cards_group(S(t, "dans_ton_coffret"), [
        ("Pommeau de douche filtrant ×1", "La base réutilisable", PRODUCT["shift_coffret_aroma"][0]),
        ("Flexible silicone 2 m ×1", "Se raccorde sur ta douche", SHIFT_STEPS["flexible"]),
        ("Filtres Pure Water ×3", "6 à 9 mois de filtration", PRODUCT["shift_filtres"][2]),
        ("Capsules soin & aromathérapie ×6", "3 senteurs, 2 de chaque", PRODUCT["shift_capsules"][0]),
    ], PHOTO)
    ing = S(t, "ingr_dients_cl_s")
    set_title(ing, "<h2>Les 3 senteurs du coffret</h2>")
    set_slider(ing, [
        ("Tea Tree & Lavender", "Apaisant et frais. Parfait pour les douches du soir.", SHIFT_STEPS["tea_tree"]),
        ("Basil & Grass", "Herbacé et vivifiant. Idéal pour bien commencer la journée.", None),
        ("Ginger & Bergamote", "Tonifiant et solaire. Pour les douches qui réveillent.", None),
    ], PHOTO)
    set_steps(S(t, "comment_ca_marche"), [
        "<strong>Raccorde</strong> le flexible à ta douche, sans outil ni plombier.",
        "<strong>Visse</strong> le pommeau SHIFT à l'autre bout du flexible.",
        "<strong>Insère</strong> un filtre Pure Water dans le compartiment du pommeau.",
        "<strong>Glisse</strong> une capsule de soin dans le second compartiment et ouvre l'eau.",
    ], image=SHIFT_STEPS["how_to_gif"], image_width=80)
    set_reasons(S(t, "pourquoi"), [
        ("Dès le premier jour", "Tout est dans la boîte : tu raccordes et c'est prêt."),
        ("3 mois de capsules", "6 capsules pour explorer trois senteurs au fil de tes envies."),
        ("6 à 9 mois de filtres", "3 filtres Pure Water d'avance, sans interruption."),
        ("Un système qui dure", "Seules les capsules et les filtres se remplacent."),
    ])
    set_faq(S(t, "faq"), [
        ("Le coffret contient-il tout pour commencer ?", "Oui ! Flexible, pommeau, filtres et capsules : tu raccordes et c'est prêt."),
        ("Combien de temps durent filtres et capsules ?", "Filtres : environ 2 à 3 mois chacun, soit 6 à 9 mois pour les 3. Capsules : selon ta fréquence de douche, tu vois le niveau baisser et tu la remplaces quand elle est vide."),
        ("Est-ce compatible avec ma douche ?", "Le système se raccorde sur les installations de douche standard, à la main, sans outil ni plombier."),
        ("Puis-je changer de senteur selon mon humeur ?", "Oui, c'est tout l'intérêt : avec 6 capsules tu as trois senteurs. Tu peux aussi commander des packs de capsules pour découvrir d'autres collections SHIFT."),
        ("Les senteurs conviennent-elles aux peaux sensibles ?", "Les capsules s'utilisent diffusées dans l'eau de la douche et contiennent des huiles essentielles. En cas de sensibilité connue, consulte la liste INCI avant utilisation."),
        *FAQ_SHIPPING,
    ])
    return t


def coque_nomade(home):
    """Coque de diffusion Nomade (Mini format), split from the Home coque on 2 Oct."""
    t = clone(home)
    m = t["sections"]["main"]
    set_badge(m, "LA PIÈCE DU RITUEL NOMADE")
    set_highlights(m, ["Format Nomade (Mini)", "Durable", "Installation sans outil"])
    set_toggle(m, "La capsule qui va dans ta coque", "Senteur au choix, environ 10 à 15 jours de rituel.",
               ["capsule-vitaminee-shower-filter-sunsoari"])
    set_cross_sell(m, ["coffret-mini"], "Tu pars de zéro ?", "Douchette, housse, coque nomade et 4 capsules réunies.")
    set_main_accordions(m, [
        ("Caractéristiques & matériaux",
         "<p>Polypropylène (PP) et silicone, sans BPA, selon le fabricant.</p><p>Conçue pour accueillir les capsules thermales "
         "Onsha format Mini (Nomade) avec leur disque sédiment, et se fixer sur la Douchette Filtrante Onsha.</p>"
         "<p>Attention : les filtres thermaux format Home ne s'insèrent pas dans cette coque. Usage domestique uniquement. "
         "Ne pas forcer le vissage.</p>"),
        SHIPPING,
    ])
    tech = S(t, "la_technologie_onsha")
    set_title(tech, "<h2>La technologie Onsha</h2>")
    set_intro(tech, "Une pièce compacte, pensée en Corée pour accueillir ta capsule et l'emporter partout.")
    set_slider(tech, [
        ("Format compact", "Pensée pour la douchette Nomade.", PRODUCT["coque_nomade"][0]),
        ("Matériaux durables", "PP et silicone, sans BPA.", PRODUCT["douchette"][1]),
        ("Format Mini", "Pour les capsules thermales Nomade.", ONSHA_CAPSULE_BY_SCENT["Hinoki"]),
        ("Le lien du système", "Entre ta douchette et ta capsule.", PRODUCT["set_nomade"][0]),
    ], PHOTO)
    set_steps(S(t, "comment_ca_marche"), [
        "<strong>Ouvre</strong> la coque nomade.",
        "<strong>Insère</strong> le disque sédiment puis la capsule, dans la senteur de ton choix.",
        "<strong>Referme</strong> la coque et fixe-la sur ta douchette, sans outil.",
        "<strong>Ouvre l'eau</strong> : ton rituel commence.",
    ], ONSHA_HOWTO["capsule"], 80,
        "Tu pars de zéro ? Le Coffret Douche Thermal Coréen (Nomade) réunit la douchette, la housse, la coque et 4 capsules "
        "à un prix plus doux que les pièces séparées. Cette coque seule est parfaite si tu as déjà la douchette, ou comme pièce de rechange.")
    set_faq(S(t, "faq"), [
        ("Ai-je besoin de cette coque si j'ai le coffret Nomade ?", "Non : le Coffret Nomade et le Set Découverte Nomade incluent déjà la coque. Celle-ci s'adresse à celles qui ont déjà la douchette, ou qui veulent une pièce de rechange."),
        ("Quelles recharges s'insèrent dans cette coque ?", "Les capsules thermales Onsha format Mini (Nomade), avec leur disque sédiment. Les filtres thermaux Home sont trop grands pour cette coque."),
        ("Dois-je la remplacer régulièrement ?", "Non, la coque est conçue pour durer. Seules les capsules et leurs disques se remplacent, environ tous les 10 à 15 jours."),
        ("Est-ce que je peux l'installer moi-même ?", "Oui ! Elle se fixe à la main, en quelques secondes, sans outil ni plombier."),
        *FAQ_SHIPPING,
    ])
    return t


SCENT_CHOICE = (
    "Choisis ta senteur",
    SCENTS_ACCORDION[1] + "<p><strong>Sans senteur :</strong> le même filtre thermal vitaminé, sans parfum ajouté. "
    "Idéal si tu préfères éviter les senteurs.</p>",
)
COMPOSITION_FILTER = (
    "<p><strong>Filtre thermal vitaminé (Home) :</strong> eau thermale soufrée lyophilisée concentrée, vitamine C, "
    "acide hyaluronique, glycérine, senteur au choix ou sans senteur. La liste complète des ingrédients (INCI) figure sur l'emballage.</p>"
    "<p>Usage externe uniquement. Tenir hors de portée des enfants. En cas de sensibilité connue aux parfums, "
    "consulte la liste INCI ou choisis la version sans senteur.</p>"
)


def _single_filter_kit(home, badge, highlights, cross, contents, composition, steps, faq, advice):
    """Starter Home / Premier Rituel: one filter, scent chosen as a variant."""
    t = clone(home)
    m = t["sections"]["main"]
    set_badge(m, badge)
    set_highlights(m, highlights)
    set_toggle(m, "Ajoute des filtres de rechange", "Pour continuer ton rituel le mois suivant.",
               ["filtre-vitamine-showerfilter-sunsoari"])
    set_cross_sell(m, *cross)
    set_main_accordions(m, [("Contenu", contents), ("Composition & sécurité", composition), SCENT_CHOICE, SHIPPING])
    set_title(S(t, "tes_senteurs"), "<h2>Choisis ta senteur</h2>")
    set_steps(S(t, "comment_ca_marche"), steps, ONSHA_HOWTO["installer_recharge"], 80, advice)
    set_faq(S(t, "faq"), faq + FAQ_SHIPPING)
    return t


def starter_home(home):
    return _single_filter_kit(
        home, "POUR COMMENCER",
        ["Pommeau + coque + 1 filtre", "5 senteurs au choix", "Installation sans outil"],
        (["coffret-home-onsha-sullab-sunsoari"], "Le rituel complet", "Pommeau, flexible, coque et 4 filtres réunis."),
        "<p><strong>1 pommeau de douche filtrant Onsha</strong></p><p><strong>1 coque de diffusion Home</strong>, qui accueille le filtre</p>"
        "<p><strong>1 filtre thermal vitaminé (Home)</strong>, dans la senteur de ton choix ou sans senteur</p><p>Joint d'étanchéité fourni.</p>",
        "<p><strong>Pommeau et coque :</strong> polycarbonate (PC), polypropylène (PP), silicone et inox, sans BPA, selon le fabricant.</p>" + COMPOSITION_FILTER,
        [
            "<strong>Dévisse</strong> ton pommeau actuel.",
            "<strong>Fixe</strong> la coque de diffusion sur ton flexible, avec le joint fourni.",
            "<strong>Insère</strong> le filtre thermal dans la coque.",
            "<strong>Visse</strong> le pommeau Onsha sur la coque et ouvre l'eau.",
        ],
        [
            ("Quelle différence avec le Coffret Douche Thermal Coréen (Home) ?", "Le Starter Home contient 1 filtre pour découvrir le rituel. Le Coffret ajoute un flexible de 2 m et 4 filtres, soit 3 à 4 mois de rituel."),
            ("Combien de temps dure le filtre ?", "Environ 3 à 4 semaines selon ta fréquence de douche. Ensuite, il te suffit de remplacer le filtre."),
            ("Est-ce compatible avec ma douche ?", "Oui, avec les flexibles à raccord standard. L'installation se fait à la main, sans outil. Un joint est fourni."),
        ],
        "Tu as déjà ton pommeau et tu veux juste découvrir les senteurs ? Le Premier Rituel (Home) réunit la coque et un filtre, sans pommeau.",
    )


def premier_rituel(home):
    return _single_filter_kit(
        home, "PETIT BUDGET, GRAND RITUEL",
        ["Coque + 1 filtre", "Garde ton pommeau", "5 senteurs au choix"],
        (["onsha-starter-home"], "Envie du pommeau Onsha ?", "Le Starter Home ajoute le pommeau filtrant au jet fin."),
        "<p><strong>1 coque de diffusion Home</strong>, qui se visse entre ton flexible et ton pommeau</p>"
        "<p><strong>1 filtre thermal vitaminé (Home)</strong>, dans la senteur de ton choix ou sans senteur</p><p>Joint d'étanchéité fourni.</p>",
        "<p><strong>Coque :</strong> polypropylène (PP) et silicone, sans BPA, selon le fabricant.</p>" + COMPOSITION_FILTER,
        [
            "<strong>Dévisse</strong> ton pommeau de douche actuel.",
            "<strong>Fixe</strong> la coque de diffusion sur ton flexible, avec le joint fourni.",
            "<strong>Insère</strong> le filtre thermal dans la coque.",
            "<strong>Revisse</strong> ton pommeau sur la coque et ouvre l'eau.",
        ],
        [
            ("Ai-je besoin d'un pommeau Onsha ?", "Non : la coque se visse entre ton flexible et la plupart des pommeaux à raccord standard. Un joint est fourni pour une bonne étanchéité."),
            ("Combien de temps dure le filtre ?", "Environ 3 à 4 semaines selon ta fréquence de douche. Ensuite, il te suffit de remplacer le filtre."),
            ("Et si je veux passer au rituel complet ?", "Ta coque reste la même : ajoute simplement le pommeau filtrant Onsha, ou choisis le Starter Home."),
        ],
        "C'est la façon la plus douce de découvrir les senteurs Onsha : tu gardes ton pommeau, tu ajoutes le rituel.",
    )


def build():
    templates = patch_existing()
    templates["starter-home"] = starter_home(templates["set-decouverte-home"])
    templates["premier-rituel-home"] = premier_rituel(templates["set-decouverte-home"])
    templates["coque-diffusion-nomade"] = coque_nomade(templates["coque-diffusion-home"])
    templates["douchette-filtrante"] = douchette()
    templates["coffret-home"] = coffret_home()
    templates["coffret-nomade"] = coffret_nomade()
    templates["set-decouverte-nomade"] = set_nomade()
    templates["coffret-aromatherapie-shift"] = coffret_aromatherapie_shift()
    for name, t in templates.items():
        intro(t, name)
        save(f"templates/product.{name}.json", t)
    return sorted(templates)


if __name__ == "__main__":
    for n in build():
        print("product." + n)
