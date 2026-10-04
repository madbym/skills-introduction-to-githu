"""Nettoyage des pages du thème « Copie conversion » : accueil, collections, pages, liste des collections.

- Supprime le contenu de démonstration du thème (anglais, « Black Friday », « Ceramide »…).
- Les pages d'aide (livraison, retours…) n'affichent plus que leur propre texte.
- « Pommeau » devient « pomme de douche » ; images introuvables remplacées.
"""
import json
import os
import re

from build import rename_pomme

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "original")
OUT = os.path.join(HERE, "theme")
IMG = "shopify://shop_images/"

MISSING = {  # images référencées par le thème mais absentes de Contenu > Fichiers
    "Copie_de_Hot_spring_Filter_Mini_set_01.jpg": "coffret-mini-2893257.png",
    "Capsule_dans_une_coque__06.jpg": "capsule-vitaminee-1173264.jpg",
    "CopiedeTravelShowerheadFilter_01.jpg": "onsha-filtre-sediment-recharge-9248658.jpg",
    "CopiedeIMG_4278.jpg": None,  # None : on laisse l'image propre à la collection
}
TEXT = [
    ("Pommeaux filtrants, recharges thermales", "Pommes de douche filtrantes, recharges thermales"),
    ("Pommeaux filtrantes", "Pommes de douche"),
    ("Pommeaux filtrants", "Pommes de douche"),
    ("pommeaux filtrants", "Pommes de douche"),
    ("Recharge filtrantes", "Recharges filtrantes"),
    ("Kit & coffrets", "Kits & coffrets"),
    ("le pommeau retient les sédiments", "la pomme de douche retient les sédiments"),
    ("dans un pommeau au jet fin", "dans une pomme de douche au jet fin"),
    ("Les pommeaux et douchettes se vissent", "Les pommes de douche et douchettes se vissent"),
    ("associe un pommeau ou une douchette filtrante", "associe une pomme de douche ou une douchette filtrante"),
    ("Un pommeau disponible en", "Une pomme de douche disponible en"),
]


def load(rel):
    s = open(os.path.join(SRC, rel), encoding="utf-8").read()
    if s.lstrip().startswith("/*"):
        s = s[s.index("*/") + 2:]
    return json.loads(s)


def save(rel, t):
    p = os.path.join(OUT, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "w", encoding="utf-8") as f:
        json.dump(t, f, ensure_ascii=False, indent=2)
        f.write("\n")


def fix_images(node):
    if isinstance(node, dict):
        for k in list(node):
            v = node[k]
            if isinstance(v, str) and v.startswith(IMG) and v[len(IMG):] in MISSING:
                new = MISSING[v[len(IMG):]]
                if new:
                    node[k] = IMG + new
                else:
                    del node[k]
            else:
                fix_images(v)
    elif isinstance(node, list):
        for v in node:
            fix_images(v)


def fix_text(t):
    s = json.dumps(t, ensure_ascii=False)
    for old, new in TEXT:
        s = s.replace(old, new)
    return rename_pomme(json.loads(s))


def keep_only(t, keys):
    t["sections"] = {k: v for k, v in t["sections"].items() if k in keys}
    t["order"] = [k for k in t["order"] if k in keys]
    for v in t["sections"].values():
        v.pop("disabled", None)
    return t


def main():
    for rel in ["templates/index.json", "templates/collection.json", "templates/collection.onsha.json",
                "templates/collection.shift.json", "templates/collection.onsha-douchette-nomade.json",
                "templates/page.marques.json"]:
        t = load(rel)
        fix_images(t)
        save(rel, fix_text(t))
    # pages d'aide (livraison, retours, garantie, FAQ, précautions) et « Notre univers » : leur texte seulement
    save("templates/page.json", keep_only(load("templates/page.json"), ["main"]))
    # /collections : la liste des collections Sunsoari, sans le contenu de démonstration
    lc = keep_only(load("templates/list-collections.json"), ["breadcrumbs_Eqt34R", "main"])
    lc["sections"]["main"]["settings"].update(title="Nos collections", heading_size="h1", columns_desktop=4,
                                              columns_mobile="2", padding_top=40, padding_bottom=60)
    save("templates/list-collections.json", lc)

    left = []
    for root, _, files in os.walk(os.path.join(OUT, "templates")):
        for f in files:
            s = open(os.path.join(root, f), encoding="utf-8").read()
            left += [(f, m) for m in re.findall(r"[^\"<>]{0,30}[Pp]ommeau[^\"<>]{0,30}", s) if "pommeau-de-douche" not in m]
            left += [(f, m) for m in MISSING if m in s]
    for x in left:
        print("reste :", x)


if __name__ == "__main__":
    main()
