"""Refonte « Sunsoari – Copie conversion (à valider) » : fiches produits.

- Le bouton « Ajouter au panier » remonte juste après la description
  (variantes, offres par quantité et produits indispensables / compléments au-dessus).
- Chaque fiche affiche ses produits indispensables ou complémentaires (cases à cocher, jamais pré-cochées).
- Images des senteurs Onsha et des collections SHIFT corrigées.
- Modèles manquants créés : coque Nomade, Starter Home, Premier Rituel (Home).

Les originaux (téléchargés du thème) sont dans original/, le résultat dans theme/.
"""
import copy
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "original", "templates")
OUT = os.path.join(HERE, "theme", "templates")

# Blocs placés au-dessus du bouton, dans cet ordre.
TOP = ["ss_badge", "title", "ss_pills", "price", "description", "variant_picker", "ss_offers"]
# Blocs placés sous le bouton, dans cet ordre (les autres suivent dans leur ordre d'origine).
BELOW = ["ss_checks", "ss_facts", "ss_upsell", "ss_systems", "reassurance"]

IMG = "shopify://shop_images/"
SCENT_FILTER = {  # images des variantes du Filtre Thermal (Home)
    "Hinoki": "onsha-filtre-thermal-vitamine-5679506.jpg",
    "Océan": "onsha-filtre-thermal-vitamine-7252132.jpg",
    "Forêt de Pin": "onsha-filtre-thermal-vitamine-8292746.jpg",
    "Fleur de Prunier": "onsha-filtre-vitamine-9910937.jpg",
}
SCENT_CAPSULE = {  # capsules thermales Nomade
    "Hinoki": "onsha-capsule-thermale-vitaminee-5877420.jpg",
    "Océan": "onsha-capsule-thermale-vitaminee-2207031.jpg",
    "Forêt de Pin": "onsha-capsule-thermale-vitaminee-4674867.jpg",
    "Fleur de Prunier": "capsule-vitaminee-3625758.jpg",
}
SHIFT_COLLECTIONS = {  # d'après les flèches de Fanta sur la capture
    "Fruité": "shift-6-capsules-aromatherapie-vitamine-c-2851269.png",
    "Découverte": "shift-6-capsules-aromatherapie-vitamine-c-1086856.jpg",
    "Patchouli & Rose": "shift-6-capsules-aromatherapie-vitamine-c-1755093.png",
    "Cherry Blossom": "shift-6-capsules-aromatherapie-vitamine-c-3834627.jpg",
    "Hinoki Spring": "shift-6-capsules-aromatherapie-vitamine-c-4851165.png",
}

FILTRE = "filtre-vitamine-showerfilter-sunsoari"
NEUTRE = "onsha-filtre-thermal-vitamine-sans-senteur"
COQUE = "coque-de-diffusion"
COQUE_NOMADE = "coque-de-diffusion-nomade"
POMMEAU = "pommeau-de-douche-filtrant"
DOUCHETTE = "douchette-filtrante"
CAPSULE = "capsule-vitaminee-shower-filter-sunsoari"
SEDIMENT = "filtre-sediment-recharge"
PACK6 = "pack-6-capsules-vitaminees-shift-sunsoari"
PACK3 = "pack-3-sediments-pure-water"


def esc(s):
    return s.replace('"', "&quot;")


def addon(handle, kind, note, title="", variant=""):
    return {
        "type": "custom_liquid",
        "settings": {
            "custom_liquid": (
                f"{{% render 'ss-addon', addon: all_products['{handle}'], variant_title: \"{esc(variant)}\", "
                f"kind: '{kind}', title: \"{esc(title)}\", note: \"{esc(note)}\", section_id: section.id %}}"
            )
        },
    }


# Produits indispensables (I) et compléments (C) affichés au-dessus du bouton, par modèle.
HOME_FILTERS = [
    (FILTRE, "indispensable", "Le filtre thermal qui se glisse dans la coque. Senteur au choix.", ""),
    (NEUTRE, "choix", "Tu préfères sans parfum ? La même base de soin, sans senteur ajoutée.", "1 filtre"),
]
ADDONS = {
    "ss-onsha-pommeau": ("Pour le rituel thermal, ajoute :", [
        (COQUE, "indispensable", "La coque Home se visse entre ton flexible et le pommeau, et maintient le filtre.", "Grand format"),
        *HOME_FILTERS,
    ]),
    "ss-onsha-coque": ("Ta coque a besoin de son filtre :", [
        *HOME_FILTERS,
        (POMMEAU, "complement", "La pomme de douche filtrante qui se visse sur ta coque.", ""),
    ]),
    "ss-onsha-filtre-home": ("Pas encore équipée ? Ajoute :", [
        (COQUE, "indispensable", "La coque Home qui accueille et maintient ton filtre. À acheter une seule fois.", "Grand format"),
        (POMMEAU, "complement", "La pomme de douche filtrante qui se visse sur la coque.", ""),
    ]),
    "ss-onsha-filtre-neutre": ("Pas encore équipée ? Ajoute :", [
        (COQUE, "indispensable", "La coque Home qui accueille et maintient ton filtre. À acheter une seule fois.", "Grand format"),
        (POMMEAU, "complement", "La pomme de douche filtrante qui se visse sur la coque.", ""),
    ]),
    "ss-onsha-capsule-nomade": ("Pas encore équipée ? Ajoute :", [
        (COQUE_NOMADE, "indispensable", "La coque Nomade qui accueille ta capsule. À acheter une seule fois.", ""),
        (DOUCHETTE, "complement", "La douchette filtrante sur laquelle se fixe la coque.", ""),
    ]),
    "ss-onsha-coque-nomade": ("Ta coque a besoin de sa capsule :", [
        (CAPSULE, "indispensable", "La capsule thermale qui se glisse dans la coque. Senteur au choix.", ""),
        (DOUCHETTE, "complement", "La douchette filtrante sur laquelle se fixe la coque.", ""),
    ]),
    "ss-onsha-douchette": ("Complète ta douchette :", [
        (SEDIMENT, "complement", "La recharge qui entretient ta douchette, à changer toutes les 4 à 6 semaines.", ""),
        (COQUE_NOMADE, "complement", "Pour le rituel thermal Nomade : la coque qui accueille les capsules.", ""),
    ]),
    "ss-onsha-sediment": ("", [
        (DOUCHETTE, "indispensable", "Pas encore la douchette ? Filtre inclus, installation sans outil.", ""),
    ]),
    "ss-onsha-housse": ("", [
        (DOUCHETTE, "indispensable", "Pas encore la douchette sur laquelle s'adapte ta housse ?", ""),
    ]),
    "ss-onsha-set-home": ("Ton set a besoin d'un pommeau :", [
        (POMMEAU, "indispensable", "La pomme de douche filtrante qui se visse sur la coque. À ajouter si tu ne l'as pas encore.", ""),
    ]),
    "ss-onsha-set-nomade": ("Ton set a besoin d'une douchette :", [
        (DOUCHETTE, "indispensable", "La douchette filtrante sur laquelle se fixe la coque. À ajouter si tu ne l'as pas encore.", ""),
    ]),
    "ss-onsha-coffret-home": ("Prends de l'avance sur tes recharges :", [
        (FILTRE, "complement", "Un filtre thermal en plus, senteur au choix.", ""),
        (NEUTRE, "choix", "Ou la version sans senteur.", "1 filtre"),
    ]),
    "ss-onsha-coffret-nomade": ("Prends de l'avance sur tes recharges :", [
        (CAPSULE, "complement", "Une capsule thermale en plus, senteur au choix.", ""),
    ]),
    "ss-onsha-starter-home": ("Prends de l'avance sur tes recharges :", [
        (FILTRE, "complement", "Un filtre thermal en plus, senteur au choix.", ""),
        (NEUTRE, "choix", "Ou la version sans senteur.", "1 filtre"),
    ]),
    "ss-onsha-premier-rituel": ("Pour utiliser ton rituel, il te faut aussi :", [
        (POMMEAU, "indispensable", "La pomme de douche filtrante qui se visse sur la coque. À ajouter si tu ne l'as pas encore.", ""),
    ]),
    "ss-shift-coffret-soin": ("Prends de l'avance sur tes recharges :", [
        (PACK6, "complement", "6 capsules soin et aromathérapie, collection au choix.", ""),
        (PACK3, "complement", "3 filtres Pure Water pour ton pommeau SHIFT.", ""),
    ]),
    "ss-shift-coffret-aroma": ("Prends de l'avance sur tes recharges :", [
        (PACK6, "complement", "6 capsules soin et aromathérapie, collection au choix.", ""),
    ]),
    "ss-shift-pack3": ("", [
        (PACK6, "complement", "Les capsules soin et aromathérapie qui travaillent avec ton filtre.", ""),
    ]),
    "ss-shift-pack6": ("", [
        (PACK3, "complement", "Les filtres Pure Water qui travaillent avec tes capsules.", ""),
    ]),
    # ss-sullab-robinet : on garde l'addon existant (lot de 3 sédiments)
}


def load(name):
    s = open(os.path.join(SRC, f"product.{name}.json"), encoding="utf-8").read()
    if s.lstrip().startswith("/*"):
        s = s[s.index("*/") + 2:]
    return json.loads(s)


def set_addons(main, name):
    if name not in ADDONS:
        return
    header, items = ADDONS[name]
    for k in [k for k in main["block_order"] if k.startswith("ss_addon")]:
        main["block_order"].remove(k)
        del main["blocks"][k]
    for i, (handle, kind, note, variant) in enumerate(items, 1):
        k = f"ss_addon_{i}"
        main["blocks"][k] = addon(handle, kind, note, header if i == 1 else "", variant)
        main["block_order"].append(k)


def reorder(main):
    order = main["block_order"]
    top = [k for k in TOP if k in order]
    addons = [k for k in order if k.startswith("ss_addon")]
    below = [k for k in BELOW if k in order]
    rest = [k for k in order if k not in top + addons + below + ["buy_buttons", "sticky_atc"]]
    new = top + addons + ["buy_buttons"] + below + rest + (["sticky_atc"] if "sticky_atc" in order else [])
    assert sorted(new) == sorted(order), (new, order)
    main["block_order"] = new


def set_scent_images(t, images):
    for sk in ("ss_scents",):
        sec = t["sections"].get(sk)
        if not sec:
            continue
        for b in sec["blocks"].values():
            title = b["settings"].get("title")
            if title in images:
                b["settings"]["image"] = IMG + images[title]
    box = t["sections"].get("ss_box")
    if box:  # set découverte Home : un filtre par senteur
        for b in box["blocks"].values():
            title = b["settings"].get("title", "")
            for scent, file in images.items():
                if title == f"Filtre {scent}":
                    b["settings"]["image"] = IMG + file


def replace_text(t, old, new):
    s = json.dumps(t, ensure_ascii=False)
    assert old in s, old
    return json.loads(s.replace(old, new))


def custom(main, key, html):
    main["blocks"][key]["settings"]["custom_liquid"] = html


def build_coque_nomade():
    t = copy.deepcopy(load("ss-onsha-coque"))
    m = t["sections"]["main"]
    custom(m, "ss_badge", '<span class="ss-pdp-badge">La pièce centrale du rituel Nomade</span>')
    custom(m, "ss_pills", '<div class="ss-pdp-pills"><span>Format Nomade (Mini)</span><span>Durable</span><span>Installation sans outil</span></div>')
    custom(m, "ss_facts", '<div class="ss-pdp-facts"><div><b>Rôle</b>Accueille ta capsule thermale et se fixe sur la douchette Onsha</div><div><b>Compatibilité</b>Capsules thermales Nomade et douchette filtrante Onsha</div><div><b>Durée d&#x27;utilisation</b>Durable : seules les capsules se remplacent</div></div>')
    custom(m, "ss_systems", "{% render 'ss-systems', current: 'coque-de-diffusion-nomade' %}")
    m["blocks"]["acc_1"]["settings"]["content"] = (
        "<p>Polypropylène (PP) et silicone, sans BPA selon le fabricant.</p>"
        "<p><strong>Attention :</strong> la coque Nomade accueille les capsules thermales Nomade. "
        "Les filtres Home se glissent dans la coque Home (Grand format) : les deux formats ne sont pas interchangeables.</p>"
        "<p>Usage domestique uniquement. Ne pas forcer le vissage.</p>"
    )
    vis = t["sections"]["ss_visuals"]["blocks"]
    vis["b1"]["settings"].update(title="La coque Nomade", image=IMG + "onsha-coque-de-diffusion-nomade-5948203.jpg")
    vis["b2"]["settings"].update(title="La capsule se glisse dans la coque", image=IMG + "Copie_de_IMG_2101.gif")
    t["sections"]["ss_visuals"]["settings"]["heading"] = "Le rituel Nomade en images"
    st = t["sections"]["ss_steps"]
    st["blocks"]["b1"]["settings"]["text"] = "<strong>Ouvre</strong> la coque Nomade."
    st["blocks"]["b2"]["settings"]["text"] = "<strong>Insère</strong> ta capsule thermale avec son disque sédiment."
    st["blocks"]["b3"]["settings"]["text"] = "<strong>Referme</strong> et fixe la coque sur ta douchette Onsha."
    st["blocks"]["b4"]["settings"]["text"] = "<strong>Fais couler l'eau</strong> : ton rituel commence, chez toi comme en voyage."
    st["settings"]["tip_text"] = "<p>Tu pars de zéro ? Le coffret Nomade réunit la douchette, la housse, la coque et 4 capsules.</p>"
    faq = t["sections"]["ss_faq"]["blocks"]
    faq["b1"]["settings"].update(title="Ai-je besoin de cette coque si j'ai le coffret Nomade ?", text="<p>Non, le coffret Nomade et le set découverte Nomade incluent déjà la coque. Celle-ci s'adresse à celles qui ont déjà la douchette, ou qui veulent une pièce de rechange.</p>")
    faq["b2"]["settings"].update(title="Puis-je y mettre un filtre Home ?", text="<p>Non. La coque Nomade accueille les capsules thermales Nomade. Les filtres Home vont dans la coque Home (Grand format).</p>")
    rel = t["sections"]["ss_related"]["blocks"]
    rel["b1"]["settings"].update(product=CAPSULE, text="<p>La capsule thermale, 4 senteurs.</p>")
    rel["b2"]["settings"].update(product=DOUCHETTE, text="<p>La douchette qui accueille la coque.</p>")
    rel["b3"]["settings"].update(product="coffret-mini", text="<p>Le rituel Nomade complet.</p>")
    return t


BUNDLE_FAQ_SHIPPING = ["b6", "b7"]


def build_bundle(name):
    """Starter Home et Premier Rituel (Home) : produits groupés (Shopify Bundles)."""
    t = copy.deepcopy(load("ss-onsha-coffret-home"))
    m = t["sections"]["main"]
    box = t["sections"]["ss_box"]
    if name == "ss-onsha-starter-home":
        custom(m, "ss_badge", '<span class="ss-pdp-badge">Pour bien commencer</span>')
        custom(m, "ss_pills", '<div class="ss-pdp-pills"><span>Pommeau + coque + 1 filtre</span><span>Senteur au choix</span><span>Installation sans outil</span></div>')
        custom(m, "ss_facts", '<div class="ss-pdp-facts"><div><b>Contenu</b>Pommeau filtrant Onsha, coque de diffusion Home (Grand format) et 1 filtre thermal vitaminé</div><div><b>Senteur</b>Hinoki, Océan, Forêt de Pin, Fleur de Prunier ou sans senteur</div><div><b>Durée du filtre</b>3 à 4 semaines selon ta fréquence de douche</div></div>')
        items = [
            ("Pommeau filtrant Onsha", "×1", "onsha-pommeau-de-douche-filtrant-5452678.png"),
            ("Coque de diffusion Home", "×1", "onsha-coque-de-diffusion-4878009.jpg"),
            ("Filtre thermal vitaminé", "×1, senteur au choix", "onsha-filtre-vitamine-9910937.jpg"),
        ]
    else:
        custom(m, "ss_badge", '<span class="ss-pdp-badge">Ton premier rituel thermal</span>')
        custom(m, "ss_pills", '<div class="ss-pdp-pills"><span>Coque + 1 filtre</span><span>Senteur au choix</span><span>Pour ton pommeau Onsha</span></div>')
        custom(m, "ss_facts", '<div class="ss-pdp-facts"><div><b>Contenu</b>Coque de diffusion Home (Grand format) et 1 filtre thermal vitaminé</div><div><b>À savoir</b>Le pommeau filtrant Onsha n&#x27;est pas inclus : ajoute-le si tu ne l&#x27;as pas encore</div><div><b>Durée du filtre</b>3 à 4 semaines selon ta fréquence de douche</div></div>')
        items = [
            ("Coque de diffusion Home", "×1", "onsha-coque-de-diffusion-4878009.jpg"),
            ("Filtre thermal vitaminé", "×1, senteur au choix", "onsha-filtre-vitamine-9910937.jpg"),
        ]
    # bloc « Ce que tu reçois »
    proto = copy.deepcopy(next(iter(box["blocks"].values())))
    box["blocks"], box["block_order"] = {}, []
    for i, (title, tag, image) in enumerate(items, 1):
        b = copy.deepcopy(proto)
        b["settings"].update(title=title, tag=tag, text="", image=IMG + image)
        box["blocks"][f"b{i}"] = b
        box["block_order"].append(f"b{i}")
    m["blocks"]["acc_2"]["settings"]["content"] = "<p>Le filtre dure environ 3 à 4 semaines selon ta fréquence de douche. Rince régulièrement la coque de diffusion. Le pommeau et la coque se gardent : seuls les filtres se remplacent.</p>"
    t["sections"]["ss_scents"]["settings"].update(eyebrow="Choisis ta senteur", heading="Quatre senteurs thermales, ou sans senteur")
    # coches sous le bouton : texte neutre
    custom(m, "ss_checks", '<ul class="ss-checks"><li><span><strong>Tout est prêt</strong> : tu visses, tu insères le filtre, c&#x27;est parti</span></li><li><span><strong>Senteur au choix</strong>, ou sans senteur</span></li><li><span><strong>Recharges disponibles</strong> à l&#x27;unité ou par lot</span></li></ul>')
    # FAQ : on garde livraison / retours + quelques questions génériques
    faq = t["sections"]["ss_faq"]
    keep = {k: v for k, v in faq["blocks"].items() if "livraison" in v["settings"]["title"].lower() or "retourner" in v["settings"]["title"].lower()}
    faq["blocks"] = {
        "q1": {"type": "item", "settings": {"title": "Que se passe-t-il quand le filtre est terminé ?", "text": "<p>Le filtre se change environ toutes les 3 à 4 semaines, selon ta fréquence de douche. Les filtres thermaux vitaminés sont disponibles à l'unité ou par lot, dans les 4 senteurs ou sans senteur.</p>", "tag": "", "link_label": "", "show_price": True}},
        "q2": {"type": "item", "settings": {"title": "Puis-je garder mon flexible actuel ?", "text": "<p>Oui, le système se visse sur un flexible de douche standard, à la main, sans outil.</p>", "tag": "", "link_label": "", "show_price": True}},
        "q3": {"type": "item", "settings": {"title": "Quelle différence avec le coffret Home ?", "text": "<p>Le coffret Home réunit tout le système avec 4 filtres (un de chaque senteur) et un flexible. Cette formule est plus légère pour commencer avec une seule senteur.</p>", "tag": "", "link_label": "", "show_price": True}},
        **keep,
    }
    faq["block_order"] = list(faq["blocks"])
    rel = t["sections"]["ss_related"]["blocks"]
    first = next(iter(rel))
    rel[first]["settings"]["product"] = "coffret-home-onsha-sullab-sunsoari"
    rel[first]["settings"]["text"] = "<p>Le système Home complet, 4 filtres inclus.</p>"
    return t


def build():
    names = [f[len("product."):-len(".json")] for f in os.listdir(SRC) if f.startswith("product.ss-")]
    names = [n for n in names if n != "ss-onsha-coque-nomade"]  # celui-ci vient du thème principal : on le recrée
    templates = {n: load(n) for n in names}
    templates["ss-onsha-coque-nomade"] = build_coque_nomade()
    templates["ss-onsha-starter-home"] = build_bundle("ss-onsha-starter-home")
    templates["ss-onsha-premier-rituel"] = build_bundle("ss-onsha-premier-rituel")

    for name, t in templates.items():
        if name in ("ss-onsha-filtre-home", "ss-onsha-coffret-home", "ss-onsha-set-home", "ss-onsha-starter-home", "ss-onsha-premier-rituel"):
            set_scent_images(t, SCENT_FILTER)
        if name in ("ss-onsha-capsule-nomade", "ss-onsha-coffret-nomade", "ss-onsha-set-nomade"):
            set_scent_images(t, SCENT_CAPSULE)
        if name == "ss-shift-pack6":
            for b in t["sections"]["ss_cards"]["blocks"].values():
                b["settings"]["image"] = IMG + SHIFT_COLLECTIONS[b["settings"]["title"]]
        if name == "ss-onsha-coque":  # la coque Home n'existe plus qu'en Grand format
            m = t["sections"]["main"]
            custom(m, "ss_pills", '<div class="ss-pdp-pills"><span>Format Home (Grand format)</span><span>Durable</span><span>Installation sans outil</span></div>')
            custom(m, "ss_facts", '<div class="ss-pdp-facts"><div><b>Rôle</b>Accueille ton filtre thermal et relie ton flexible à ton pommeau</div><div><b>Compatibilité</b>Filtres thermaux vitaminés Home (avec ou sans senteur) et pommeau filtrant Onsha</div><div><b>Format Nomade</b>Pour les capsules et la douchette, choisis la coque de diffusion Nomade</div></div>')
            faq = t["sections"]["ss_faq"]["blocks"]
            faq["b2"]["settings"]["text"] = "<p>Cette coque Home (Grand format) accueille les filtres thermaux vitaminés Home. Si tu utilises les capsules thermales et la douchette, choisis la coque de diffusion Nomade.</p>"
            rel = t["sections"]["ss_related"]["blocks"]
            rel["b2"]["settings"].update(product=NEUTRE, text="<p>Le même soin, sans senteur.</p>")
        if name == "ss-onsha-filtre-neutre":  # une seule variante « 1 filtre » : la remise se fait au panier
            m = t["sections"]["main"]
            m["blocks"]["ss_offers"] = copy.deepcopy(load("ss-onsha-filtre-home")["sections"]["main"]["blocks"]["ss_offers"])
            m["block_order"].insert(m["block_order"].index("variant_picker") + 1, "ss_offers")
        set_addons(t["sections"]["main"], name)
        reorder(t["sections"]["main"])

    os.makedirs(OUT, exist_ok=True)
    for name, t in sorted(templates.items()):
        with open(os.path.join(OUT, f"product.{name}.json"), "w", encoding="utf-8") as f:
            json.dump(t, f, ensure_ascii=False, indent=2)
            f.write("\n")
        print(name, " > ".join(t["sections"]["main"]["block_order"]))


if __name__ == "__main__":
    build()


# --------------------------------------------------------------------------
# Onsha : le « pommeau filtrant » s'appelle désormais « pomme de douche » (féminin)
# --------------------------------------------------------------------------
POMME = [
    ("Un pommeau pensé comme la base du rituel", "Une pomme de douche pensée comme la base du rituel"),
    ("Le pommeau ne se remplace pas : installé une fois, il est là", "La pomme de douche ne se remplace pas : installée une fois, elle est là"),
    ("Le pommeau filtre-t-il l'eau tout seul ?", "La pomme de douche filtre-t-elle l'eau toute seule ?"),
    ("Le pommeau filtrant Onsha n&#x27;est pas inclus : ajoute-le", "La pomme de douche filtrante Onsha n&#x27;est pas incluse : ajoute-la"),
    ("Le pommeau reste installé chez toi", "La pomme de douche reste installée chez toi"),
    ("Le pommeau est pensé pour rester installé", "La pomme de douche est pensée pour rester installée"),
    ("Le pommeau et la coque se gardent", "La pomme de douche et la coque se gardent"),
    ("Pommeau vendu séparément", "Pomme de douche vendue séparément"),
    ("Avec quel pommeau l'associer", "Avec quelle pomme de douche l'associer"),
    ("Au pommeau filtrant Onsha", "À la pomme de douche filtrante Onsha"),
    ("Avec le pommeau filtrant Onsha", "Avec la pomme de douche filtrante Onsha"),
    ("associée au pommeau filtrant Onsha", "associée à la pomme de douche filtrante Onsha"),
    ("associé au pommeau filtrant Onsha", "associé à la pomme de douche filtrante Onsha"),
    ("Pour ton pommeau Onsha", "Pour ta pomme de douche Onsha"),
    ("ton pommeau de douche actuel", "ta pomme de douche actuelle"),
    ("ta pomme de douche actuelle", "ta pomme de douche actuelle"),
    ("d'un pommeau", "d'une pomme de douche"),
    ("Pommeau filtrant Onsha", "Pomme de douche filtrante Onsha"),
    ("pommeau filtrant Onsha", "pomme de douche filtrante Onsha"),
    ("Pommeau filtrant", "Pomme de douche filtrante"),
    ("pommeau filtrant", "pomme de douche filtrante"),
    ("Pommeau +", "Pomme de douche +"),
    ("le pommeau Onsha", "la pomme de douche Onsha"),
    ("au pommeau", "à la pomme de douche"),
    ("le pommeau", "la pomme de douche"),
    ("Le pommeau", "La pomme de douche"),
    ("ton pommeau", "ta pomme de douche"),
    ("à ton pommeau", "à ta pomme de douche"),
    ("<p>Oui. Il se visse à la main", "<p>Oui. Elle se visse à la main"),
    ("associe-le à la coque de diffusion", "associe-la à la coque de diffusion"),
    ("<p>Conçu en Corée pour un jet précis", "<p>Conçue en Corée pour un jet précis"),
]


def rename_pomme(t):
    s = json.dumps(t, ensure_ascii=False)
    for old, new in POMME:
        s = s.replace(old, new)
    return json.loads(s)


def finish():
    import re
    for f in sorted(os.listdir(OUT)):
        if not f.startswith("product.ss-onsha-"):
            continue
        p = os.path.join(OUT, f)
        t = rename_pomme(json.load(open(p, encoding="utf-8")))
        with open(p, "w", encoding="utf-8") as fh:
            json.dump(t, fh, ensure_ascii=False, indent=2)
            fh.write("\n")
        left = [m for m in re.findall(r"[^\"<>]{0,40}[Pp]ommeau[^\"<>]{0,30}", json.dumps(t, ensure_ascii=False))
                if "pommeau-de-douche-filtrant" not in m]
        for m in left:
            print("reste :", f, m)


if __name__ == "__main__":
    finish()
