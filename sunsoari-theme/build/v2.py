"""V2: make every product page show up in the FullStack preview.

Products already point to template names coming from the live theme
(Ceramide). The FullStack templates are therefore saved under those exact
names, so the preview shows the Sunsoari pages without touching the live site.
"""
import json
import os

from lib import OUT, by_type, children, find, load, save, set_text, uid
from product_parts import set_tabs
import products

# FullStack file name  ->  generated template (see products.py)
LIVE_NAMES = {
    "product.json": "pommeau-filtrant",  # pommeau has no dedicated template
    "product.douchette-filtrante.json": "douchette-filtrante",
    "product.filtre-sediment-recharge.json": "filtre-sediment-douchette",
    "product.coque-de-diffusion.json": "coque-diffusion-home",
    "product.capsule-vitaminee-2.json": "capsule-nomade",
    "product.filtre-vitamine.json": "filtre-thermal-home",
    "product.coffret-mini.json": "coffret-nomade",
    "product.coffret-home.json": "coffret-home",
    "product.kit-decouverte-home.json": "set-decouverte-home",
    "product.rituel-decouverte.json": "set-decouverte-nomade",
    "product.product.json": "housse-douchette",
    "product.filtre-a-robinet-faucet.json": "filtre-robinet",
    "product.pommeau-de-douche-filtran-2.json": "coffret-soin-shift",
    "product.pack-3-sediments-pure-wat.json": "pack-3-filtres-shift",
    "product.pack-6-capsules-vitaminee.json": "pack-6-capsules-shift",
    "product.box-rituel-douche-complet.json": "coffret-aromatherapie-shift",
}

# "Dans votre coffret": real product photos (Kylie trio style), next to the buy button.
BOX = {
    "coffret-home": [
        ("pommeau-de-douche-filtrant", "Pommeau filtrant ×1"),
        ("coque-de-diffusion", "Coque de diffusion ×1"),
        ("filtre-vitamine-showerfilter-sunsoari", "Filtres thermaux ×4"),
    ],
    "coffret-nomade": [
        ("douchette-filtrante", "Douchette filtrante ×1"),
        ("product-onsha-coque-douchette-filtrante", "Housse ×1"),
        ("coque-de-diffusion", "Coque nomade ×1"),
        ("capsule-vitaminee-shower-filter-sunsoari", "Capsules thermales ×4"),
    ],
    "set-decouverte-home": [
        ("coque-de-diffusion", "Coque de diffusion ×1"),
        ("filtre-vitamine-showerfilter-sunsoari", "Filtres thermaux ×4"),
    ],
    "set-decouverte-nomade": [
        ("coque-de-diffusion", "Coque nomade ×1"),
        ("capsule-vitaminee-shower-filter-sunsoari", "Capsules + disques ×4"),
    ],
    "coffret-soin-shift": [
        ("pack-6-capsules-vitaminees-shift-sunsoari", "Capsule Tea Tree & Lavender ×1"),
        ("pack-3-sediments-pure-water", "Filtre Pure Water ×1"),
    ],
    "coffret-aromatherapie-shift": [
        ("pack-3-sediments-pure-water", "Filtres Pure Water ×3"),
        ("pack-6-capsules-vitaminees-shift-sunsoari", "Capsules aromathérapie ×6"),
    ],
}


def mini_card(handle, title):
    return {
        "type": "product-mini-card",
        "settings": {
            "color_scheme": "scheme-8c66df20-7d2d-48fc-9064-92a4351ecaa7",
            "display_mode": "column",
            "product": handle,
            "link_to_product": True,
            "show_image": True,
            "show_price": False,
            "image_width": 80,
            "title": title,
        },
    }


def add_box(t, items):
    main = t["sections"]["main"]
    block = {
        "type": "this-pack-contains",
        "name": "Dans votre coffret",
        "settings": {
            "title": "Dans votre coffret",
            "description": "<p>Tout ce que tu reçois, en un coup d'œil.</p>",
            "margin_top": 0,
            "margin_bottom": 10,
        },
        "blocks": {},
        "block_order": [],
    }
    for handle, title in items:
        k = uid("product_mini_card")
        block["blocks"][k] = mini_card(handle, title)
        block["block_order"].append(k)
    k = uid("this_pack_contains")
    main["blocks"][k] = block
    sep = next(key for key in main["block_order"] if main["blocks"][key]["type"] == "separator")
    main["block_order"].insert(main["block_order"].index(sep), k)
    # the large "Dans ton coffret" section would repeat the same information
    t["sections"].pop("dans_ton_coffret", None)
    if "dans_ton_coffret" in t["order"]:
        t["order"].remove("dans_ton_coffret")


def build():
    products.build()
    for fname, name in LIVE_NAMES.items():
        with open(os.path.join(OUT, "templates", f"product.{name}.json"), encoding="utf-8") as f:
            t = json.load(f)
        if name in BOX:
            add_box(t, BOX[name])
        videos = t["sections"].get("videos_pratiques")
        if videos:
            videos.pop("disabled", None)
            tabs = find(videos, by_type("tabs"))
            n = len(children(tabs))
            names = ["Découvrez votre coffret", "Installez votre produit", "Remplacez votre recharge"]
            set_tabs(videos, names[-n:] if name not in BOX else names[:n])
            set_text(find(videos, by_type("text")), "<h2>Les gestes en vidéo</h2>")
        save(f"templates/{fname}", t)
    # keep only the files the products actually use
    for name in set(LIVE_NAMES.values()):
        p = os.path.join(OUT, "templates", f"product.{name}.json")
        if f"product.{name}.json" not in LIVE_NAMES and os.path.exists(p):
            os.remove(p)


if __name__ == "__main__":
    import pages, settings

    build()
    pages.build_v2()
    settings.build()
    print("\n".join(sorted(LIVE_NAMES)))
