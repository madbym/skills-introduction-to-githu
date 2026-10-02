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


# HD photo (>= 990 px) for "Comment ça marche": the supplier GIFs are only 450-550 px high.
STEP_PHOTO = {
    "product.pack-3-sediments-pure-wat.json": "2SedimentFilter-02.webp",
    "product.kit-decouverte-home.json": "onsha-set-decouverte-home-2842111.jpg",
    "product.box-rituel-douche-complet.json": "shift-coffret-douche-aromatherapie-3669659.png",
    "product.coffret-home.json": "coffret-home-8881318.jpg",
    "product.coffret-mini.json": "coffret-mini-9416210.jpg",
    "product.filtre-vitamine.json": "onsha-filtre-thermal-vitamine-7252132.jpg",
    "product.coque-de-diffusion.json": "Copie_de_Copie_de_Hot_Spring_Filter___Shower_Head_03.jpg",
    "product.capsule-vitaminee-2.json": "capsule-vitaminee-5066640.jpg",
    "product.rituel-decouverte.json": "onsha-set-decouverte-nomade-6470897.jpg",
    "product.pommeau-de-douche-filtran-2.json": "pommeau-de-douche-filtrant-a-vitamine-c-9174486.jpg",
    "product.douchette-filtrante.json": "onsha-douchette-filtrante-8605939.jpg",
    "product.pack-6-capsules-vitaminee.json": "7VitaminCapsule-04-2.jpg",
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
        if fname in STEP_PHOTO and "comment_ca_marche" in t["sections"]:
            im = find(t["sections"]["comment_ca_marche"], by_type("image"))
            im["settings"]["image"] = "shopify://shop_images/" + STEP_PHOTO[fname]
        save(f"templates/{fname}", t)
    # keep only the files the products actually use
    for name in set(LIVE_NAMES.values()):
        p = os.path.join(OUT, "templates", f"product.{name}.json")
        if f"product.{name}.json" not in LIVE_NAMES and os.path.exists(p):
            os.remove(p)


# On 1 Oct (evening) the products were switched to "ss-*" template names.
# The pages are saved under those names only: an unused template is previewed
# in the editor with a random product, which mixes Onsha and SHIFT content.
SS_NAMES = {
    "product.ss-onsha-pommeau.json": "product.json",
    "product.ss-onsha-douchette.json": "product.douchette-filtrante.json",
    "product.ss-onsha-sediment.json": "product.filtre-sediment-recharge.json",
    "product.ss-onsha-coque.json": "product.coque-de-diffusion.json",
    "product.ss-onsha-capsule-nomade.json": "product.capsule-vitaminee-2.json",
    "product.ss-onsha-filtre-home.json": "product.filtre-vitamine.json",
    "product.ss-onsha-filtre-neutre.json": "product.filtre-thermal-sans-senteur.json",
    "product.ss-onsha-coffret-nomade.json": "product.coffret-mini.json",
    "product.ss-onsha-coffret-home.json": "product.coffret-home.json",
    "product.ss-onsha-set-home.json": "product.kit-decouverte-home.json",
    "product.ss-onsha-set-nomade.json": "product.rituel-decouverte.json",
    "product.ss-onsha-housse.json": "product.product.json",
    "product.ss-sullab-robinet.json": "product.filtre-a-robinet-faucet.json",
    "product.ss-shift-coffret-soin.json": "product.pommeau-de-douche-filtran-2.json",
    "product.ss-shift-pack3.json": "product.pack-3-sediments-pure-wat.json",
    "product.ss-shift-pack6.json": "product.pack-6-capsules-vitaminee.json",
    "product.ss-shift-coffret-aroma.json": "product.box-rituel-douche-complet.json",
}


def copy_ss_names():
    import shutil
    d = os.path.join(OUT, "templates")
    for new, src in SS_NAMES.items():
        shutil.copyfile(os.path.join(d, src), os.path.join(d, new))
        if src != "product.json":
            os.remove(os.path.join(d, src))


def neutral_default():
    """product.json = page for any product without its own template (e.g. Starter Home):
    title, real description, price, buy button, delivery; no product-specific text."""
    path = os.path.join(OUT, "templates", "product.json")
    t = json.load(open(path, encoding="utf-8"))
    main = t["sections"]["main"]
    drop = {"group_VW4Hi3", "group_pills", "cross_sell_QcpW8C"}
    main["block_order"] = [k for k in main["block_order"] if k not in drop]
    for k in drop:
        main["blocks"].pop(k, None)
    main["blocks"]["text_yQdqF8"]["settings"]["text"] = "{{ product.description }}"
    main["blocks"]["text_yQdqF8"]["settings"]["paragraph_font_size"] = "medium"
    acc = main["blocks"]["accordions_KKUaHK"]
    acc["block_order"] = [k for k in acc["block_order"] if acc["blocks"][k]["settings"].get("heading") == "Livraison & retours"]
    acc["blocks"] = {k: acc["blocks"][k] for k in acc["block_order"]}
    keep = ["main", "decouvre_aussi"]
    t["sections"] = {k: t["sections"][k] for k in keep}
    t["order"] = keep
    save("templates/product.json", t)


NO_QTY_BREAKS = {
    # combo "filtre + pack 3 sédiments" is not a separate product: no real discount possible
    "product.filtre-a-robinet-faucet.json",
    # pack variants (2 / 4 filtres) are already discounted: avoid a double discount
    "product.filtre-thermal-sans-senteur.json",
}


def drop_quantity_breaks(t):
    from product_parts import set_quantity_breaks
    set_quantity_breaks(t["sections"]["main"], None, None)


def restore_header():
    """Header edited by Fanta on 1 Oct (21:39) is the reference; only fix images + 80 € text."""
    src = os.path.join(os.path.dirname(OUT), "concurrent", "header-group.user-2026-10-01.json")
    raw = open(src, encoding="utf-8").read()
    head, h = raw[: raw.index("*/") + 2], json.loads(raw[raw.index("*/") + 2 :])
    fix = {
        "coffret-mini-2893257.png": "coffret-mini-9416210.jpg",
        "260310-SHIFT_Felt_Black_Launch_Cover_Website-03.jpg": "pommeau-de-douche-filtrant-a-vitamine-c-9174486.jpg",
        "58caeeca-881a-4295-8f44-f33ab4429be8_111e670a-9bc7-427e-a141-70f9d159766f.png": "Copie_de_Copie_de_Hot_Spring_Filter___Shower_Head_03.jpg",
    }

    def walk_(o):
        if isinstance(o, dict):
            for k, v in o.items():
                if isinstance(v, str) and v.startswith("shopify://shop_images/") and v.split("/")[-1] in fix:
                    o[k] = "shopify://shop_images/" + fix[v.split("/")[-1]]
                elif isinstance(v, str) and "Livraison offerte dès 100" in v:
                    o[k] = "<p>Livraison offerte dès 80 € en France métropolitaine</p>"
                else:
                    walk_(v)
        elif isinstance(o, list):
            for x in o:
                walk_(x)

    walk_(h)
    with open(os.path.join(OUT, "sections", "header-group.json"), "w", encoding="utf-8") as f:
        f.write(head + "\n" + json.dumps(h, ensure_ascii=False, indent=2))


def check_images():
    """Clear any image that does not exist in Files or is too small for a large slot."""
    import glob, re
    files = json.load(open(os.path.join(os.path.dirname(__file__), "shop_files.json")))
    report = []
    for path in glob.glob(os.path.join(OUT, "**", "*.json"), recursive=True):
        raw = open(path, encoding="utf-8").read()
        head = raw[: raw.index("*/") + 2] + "\n" if raw.startswith("/*") else ""
        data = json.loads(raw[len(head):] if head else raw)

        def walk(node):
            if isinstance(node, dict):
                for k, v in list(node.items()):
                    if isinstance(v, str) and v.startswith("shopify://shop_images/"):
                        name = v.split("/")[-1]
                        if name.endswith(".svg") or name.startswith("Nouveau_projet"):
                            continue
                        size = files.get(name)
                        if not size:
                            node[k] = ""
                            report.append(("absente", name, os.path.basename(path)))
                        elif k == "image" and node.get("card_height") and min(size[:2]) < 900:
                            node[k] = ""
                            report.append(("trop petite", name, os.path.basename(path)))
                    else:
                        walk(v)
            elif isinstance(node, list):
                for x in node:
                    walk(x)

        walk(data)
        with open(path, "w", encoding="utf-8") as f:
            f.write(head + json.dumps(data, ensure_ascii=False, indent=2))
    return report


if __name__ == "__main__":
    import pages, settings

    build()
    pages.build_v2()
    settings.build()
    restore_header()
    for fname in NO_QTY_BREAKS:
        path = os.path.join(OUT, "templates", fname)
        t = json.load(open(path, encoding="utf-8"))
        drop_quantity_breaks(t)
        save(f"templates/{fname}", t)
    copy_ss_names()
    neutral_default()
    for r in check_images():
        print("image retirée :", *r)
    print("\n".join(sorted(LIVE_NAMES)))
