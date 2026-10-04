"""Fusion : thème en ligne « Images et vidéos » (main/) + corrections de la refonte conversion.

Résultat dans merged/ : fichiers à envoyer dans une copie du thème en ligne.
"""
import copy
import json
import os
import re

from build import SCENT_CAPSULE, SHIFT_COLLECTIONS, rename_pomme
from clean_site import MISSING, TEXT, fix_images, keep_only

HERE = os.path.dirname(os.path.abspath(__file__))
MAIN = os.path.join(HERE, "main")
THEME = os.path.join(HERE, "theme")
OUT = os.path.join(HERE, "merged")
IMG = "shopify://shop_images/"

POMME_MAIN = [  # tournures propres au thème en ligne
    ("Le pommeau est vendu seul", "La pomme de douche est vendue seule"),
    ("Le pommeau est vendu séparément", "La pomme de douche est vendue séparément"),
    ("il te faut aussi le pommeau filtrant Onsha", "il te faut aussi la pomme de douche filtrante Onsha"),
    ("Elle relie ton flexible au pommeau", "Elle relie ton flexible à la pomme de douche"),
    ("vissée au pommeau filtrant", "vissée à la pomme de douche filtrante"),
    ("Pommeau, capsule et filtre pour commencer", "Pomme de douche, capsule et filtre pour commencer"),
    ("dans le pommeau filtrant SHIFT", "dans la pomme de douche filtrante SHIFT"),
    ("uniquement dans le pommeau filtrant SHIFT", "uniquement dans la pomme de douche filtrante SHIFT"),
]


def load(path):
    s = open(path, encoding="utf-8").read()
    if s.lstrip().startswith("/*"):
        s = s[s.index("*/") + 2:]
    return json.loads(s)


def save(rel, data):
    p = os.path.join(OUT, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "w", encoding="utf-8") as f:
        if isinstance(data, str):
            f.write(data)
        else:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write("\n")


def text(t):
    s = json.dumps(t, ensure_ascii=False)
    for old, new in POMME_MAIN + TEXT:
        s = s.replace(old, new)
    return rename_pomme(json.loads(s))


def complements(m, items, title, note):
    m["blocks"]["ss_complements"]["settings"]["custom_liquid"] = (
        "{% render 'ss-complements', items: \"" + items + "\", title: \"" + title + "\", note: \"" + note + "\" %}"
    )


def product(name):
    t = load(os.path.join(MAIN, "templates", f"product.{name}.json"))
    m = t["sections"]["main"]
    fix_images(t)
    if name == "ss-shift-pack6":
        for b in t["sections"]["ss_cards"]["blocks"].values():
            b["settings"]["image"] = IMG + SHIFT_COLLECTIONS[b["settings"]["title"]]
    sc = t["sections"].get("ss_scents")
    if sc and name == "ss-onsha-capsule-nomade":
        for b in sc["blocks"].values():
            if not b["settings"].get("image") and b["settings"].get("title") in SCENT_CAPSULE:
                b["settings"]["image"] = IMG + SCENT_CAPSULE[b["settings"]["title"]]
    if name == "ss-onsha-filtre-neutre":  # une seule variante « 1 filtre » : offres 1 / 2 / 4
        home = load(os.path.join(MAIN, "templates", "product.ss-onsha-filtre-home.json"))
        m["blocks"]["ss_offers"] = copy.deepcopy(home["sections"]["main"]["blocks"]["ss_offers"])
        m["block_order"].insert(m["block_order"].index("variant_picker") + 1, "ss_offers")
    if name == "ss-onsha-set-home":  # la coque se visse aussi sur une pomme de douche standard
        complements(m, "pommeau-de-douche-filtrant||Le jet fin du rituel Home", "Envie du jet fin Onsha ?",
                    "Ton set contient la coque et 4 filtres. La coque se visse sur la plupart des pommes de douche à raccord standard, ou sur la pomme de douche filtrante Onsha :")
    return text(t)


def bundle(name):
    """Starter Home et Premier Rituel (Home), sur le modèle du coffret Home du thème en ligne."""
    t = load(os.path.join(MAIN, "templates", "product.ss-onsha-coffret-home.json"))
    mine = load(os.path.join(THEME, "templates", f"product.{name}.json"))
    m = t["sections"]["main"]
    for k in ("ss_badge", "ss_facts"):
        m["blocks"][k] = copy.deepcopy(mine["sections"]["main"]["blocks"][k])
    m["blocks"]["acc_2"]["settings"]["content"] = mine["sections"]["main"]["blocks"]["acc_2"]["settings"]["content"]
    if name == "ss-onsha-starter-home":
        complements(m, "filtre-vitamine-showerfilter-sunsoari||4 senteurs thermales au choix;onsha-filtre-thermal-vitamine-sans-senteur|1 filtre|La version sans parfum ajouté",
                    "Pour la suite de ton rituel", "Ton Starter contient 1 filtre. Les recharges sont vendues séparément, quand ton filtre est terminé.")
    else:
        complements(m, "pommeau-de-douche-filtrant||Le jet fin du rituel Home;filtre-vitamine-showerfilter-sunsoari||Un filtre d'avance, 4 senteurs au choix",
                    "Envie du jet fin Onsha ?", "La coque se visse sur ta pomme de douche actuelle (raccord standard). Tu peux aussi l'associer à la pomme de douche filtrante Onsha :")
    for sk in ("ss_box", "ss_faq"):
        t["sections"][sk] = copy.deepcopy(mine["sections"][sk])
    t["order"] = [k for k in t["order"] if k in t["sections"]]
    return text(t)


def main():
    import shutil
    shutil.rmtree(OUT, ignore_errors=True)
    for f in sorted(os.listdir(os.path.join(MAIN, "templates"))):
        if f.startswith("product.ss-"):
            save(f"templates/{f}", product(f[len("product."):-len(".json")]))
    save("templates/product.ss-onsha-starter-home.json", bundle("ss-onsha-starter-home"))
    save("templates/product.ss-onsha-premier-rituel.json", bundle("ss-onsha-premier-rituel"))
    # pages et collections : identiques à la version de départ dans le thème en ligne → versions nettoyées
    for rel in ["templates/page.json", "templates/list-collections.json", "templates/collection.json",
                "templates/collection.onsha.json", "templates/collection.shift.json",
                "templates/collection.onsha-douchette-nomade.json"]:
        save(rel, load(os.path.join(THEME, rel)))
    for rel in ["templates/index.json", "templates/page.marques.json"]:
        t = load(os.path.join(MAIN, rel))
        fix_images(t)
        save(rel, text(t))
    # fil d'Ariane pour Google
    bc = open(os.path.join(MAIN, "sections/breadcrumbs.liquid"), encoding="utf-8").read()
    mine = open(os.path.join(THEME, "sections/breadcrumbs.liquid"), encoding="utf-8").read()
    block = mine[mine.index("        {%- comment -%} Fil d'Ariane"):mine.index("        </script>\n") + len("        </script>\n")]
    anchor = '        <span class="breadcrumbs--last text-subtext">{{ product.title }}</span>\n'
    assert anchor in bc
    save("sections/breadcrumbs.liquid", bc.replace(anchor, anchor + block, 1))
    save("snippets/ss-systems.liquid", open(os.path.join(THEME, "snippets/ss-systems.liquid"), encoding="utf-8").read())

    for root, _, files in os.walk(OUT):
        for f in files:
            s = open(os.path.join(root, f), encoding="utf-8").read()
            for x in re.findall(r"[^\"<>]{0,40}[Pp]ommeau[^\"<>]{0,30}", s):
                if "pommeau-de-douche" not in x:
                    print("reste :", f, x)
            for x in list(MISSING) + ["Hinoki.jpg", "Ocean.jpg", "Pin.jpg"]:
                if "shop_images/" + x in s:
                    print("image manquante :", f, x)


if __name__ == "__main__":
    main()
