"""Home page, collection pages, brand pages, header and footer."""
import copy

from images import LIFESTYLE, ONSHA_SCENTS, PRODUCT, SHIFT_POMMEAU_COLORS
from lib import (
    by_name,
    by_type,
    children,
    clone,
    find,
    find_all,
    img,
    load,
    repeat,
    save,
    set_image,
    set_text,
    texts,
    uid,
)

MENU_HANDLE = "menu-sunsoari"
MOBILE_MENU_HANDLE = "menu-sunsoari"
INDEX = load("templates/index.json")
HEADER = load("sections/header-group.json")
IMAGE_CARD = find(HEADER["sections"]["header"], by_type("image-card"))


def button(block, label, link):
    block["settings"].update(label=label, link=link)


def image_card(image, title, link, subtitle=None):
    b = copy.deepcopy(IMAGE_CARD)
    b["settings"].update(
        image=img(image),
        card_link=link,
        card_height="medium",
        card_height_mobile="medium",
        color_scheme="scheme-83622e65-c031-4b6f-b557-1bf8a292650e",
        image_filter_opacity=20,
        image_filter_color="#032B59",
    )
    t = texts(b)[0]
    html = f"<h3>{title}</h3>" + (f"<p>{subtitle}</p>" if subtitle else "")
    set_text(t, html)
    return b


def put(container, blocks):
    container["blocks"], container["block_order"] = {}, []
    for b in blocks:
        k = uid(b["type"].strip("_").replace("-", "_"))
        container["blocks"][k] = b
        container["block_order"].append(k)


# --------------------------------------------------------------------------
# Home
# --------------------------------------------------------------------------

def home():
    t = clone(INDEX)
    sec = t["sections"]

    # 1 · Hero + "Home ou Nomade ?" cards + reassurance marquee
    hero = sec["custom_section_H6XpXt"]
    top, cards, *_ = children(hero)
    tx = find_all(top, by_type("text"))
    set_text(tx[0], "<h1>Ton rituel beauté commence sous la douche</h1>")
    set_text(tx[1], "<p>Filtres de douche, recharges et capsules sensorielles venus de Corée, choisis avec exigence. "
                    "Une douche plus douce, des senteurs qui apaisent : une première étape simple pour prendre soin de toi.</p>")
    button(find(top, by_type("button")), "Découvrir nos rituels", "shopify://collections/filtre-de-douche")
    set_image(find(top, by_type("image")), LIFESTYLE["onsha_hot_spring"])

    home_card, nomade_card, marquee_group = children(cards)
    for card, (title, body, badges, image, link) in (
        (home_card, ("Rituel Home", "Le pommeau filtrant, sa coque de diffusion et les filtres thermaux : le rituel qui reste installé chez toi.",
                     ["Pommeau + coque + filtres", "3 à 4 semaines par filtre"], PRODUCT["coffret_home"][0], "shopify://products/coffret-home-onsha-sullab-sunsoari")),
        (nomade_card, ("Rituel Nomade", "La douchette tout-en-un et ses capsules thermales : ton rituel te suit partout, à l'hôtel comme en voyage.",
                       ["Douchette + capsules", "Format compact"], PRODUCT["coffret_nomade"][0], "shopify://products/coffret-mini")),
    ):
        card["settings"]["card_link"] = link
        ct = find_all(card, by_type("text"))
        set_text(ct[0], f"<h2>{title}</h2>")
        set_text(ct[1], f"<p>{body}</p>")
        for bdg, text in zip(find_all(card, by_type("_badge")), badges):
            bdg["settings"]["text"] = text
        set_image(find(card, by_type("image")), image)
    for it, text in zip(find_all(marquee_group, by_type("icon-with-text")), [
        "<p>FILTRES DE DOUCHE CORÉENS</p>", "<p>INSTALLATION SANS OUTIL</p>", "<p>LIVRAISON SUIVIE EN FRANCE</p>",
    ]):
        set_text(it, text)

    # 2 · Nos marques (image cards, Kylie / PERS style)
    brands = copy.deepcopy(sec["custom_section_KAQ8dw"])
    brands["settings"].update(layout_flex_direction_desktop="column", padding_top=40, padding_bottom=40)
    title = copy.deepcopy(find(sec["custom_section_qetdex"], by_type("text")))
    set_text(title, "<h2>Nos marques</h2>")
    grid = copy.deepcopy(children(cards)[0])
    grid["settings"].update(wrap_in_card=False, card_link="", layout_type="grid", layout_grid_columns_desktop=3,
                            layout_grid_columns_mobile=1, padding_horizontal=0, padding_vertical=0,
                            padding_horizontal_mobile=0, padding_vertical_mobile=0, layout_gap_desktop=16)
    put(grid, [
        image_card(LIFESTYLE["onsha_wide"], "Onsha", "shopify://collections/onsha", "Le rituel thermal coréen · Home & Nomade"),
        image_card(LIFESTYLE["shift_cover"], "SHIFT", "shopify://collections/shift", "Pommeaux colorés & aromathérapie"),
        image_card(PRODUCT["robinet"][0], "Sullab", "shopify://collections/sullab", "La filtration au robinet"),
    ])
    put(brands, [title, grid])
    brands["name"] = "Nos marques"

    # 3 · Best-sellers slider
    best = sec["collection_featured_9fdFHq"]
    best["settings"].update(collection="kit-de-douche", color_scheme="scheme-3")
    set_text(find(best, by_type("text")), "<h2>Les coffrets pour commencer</h2>")
    button(find(best, by_type("button")), "Voir tous les rituels", "shopify://collections/filtre-de-douche")

    # 4 · L'eau, première étape (education, cautious wording)
    edu = sec["custom_section_iHWWPc"]
    left, right = children(edu)
    find(left, by_type("_badge"))["settings"]["text"] = "Le rituel Sunsoari"
    set_text(texts(left)[0], "<h2>Et si ta routine commençait par l'eau ?</h2>")
    points = [g for g in children(left) if g["type"] == "group"]
    for g, (h, p) in zip(points, [
        ("Un filtre, directement sur ta douche", "Pommeau, douchette ou robinet : les filtres retiennent une partie des sédiments et impuretés de l'eau avant qu'elle n'arrive sur ta peau et tes cheveux."),
        ("Un moment sensoriel", "Capsules et filtres thermaux diffusent une senteur inspirée des sources thermales coréennes. Tu choisis ton humeur : calme, fraîcheur, énergie ou douceur."),
    ]):
        tt = find_all(g, by_type("text"))
        set_text(tt[0], f"<p><strong>{h}</strong></p>")
        set_text(tt[1], f"<p>{p}</p>")
    button(find(left, by_type("button")), "Comprendre les filtres", "shopify://collections/filtre-de-douche")
    imgs = find_all(right, by_type("image"))
    for b, name in zip(imgs, [LIFESTYLE["onsha_kit"], ONSHA_SCENTS["Hinoki"], ONSHA_SCENTS["Océan"], ONSHA_SCENTS["Fleur de Prunier"]]):
        set_image(b, name)

    # 5 · Recharges slider (copy of best-sellers)
    refills = copy.deepcopy(best)
    refills["settings"].update(collection="recharge-filtre", color_scheme="")
    set_text(find(refills, by_type("text")), "<h2>Tes recharges, au bon format</h2>")
    button(find(refills, by_type("button")), "Toutes les recharges", "shopify://collections/recharge-filtre")

    # 6 · Notre histoire
    story = sec["custom_section_KAQ8dw"]
    set_image(find(story, by_type("image")), PRODUCT["set_home"][0])
    st = find_all(story, by_type("text"))
    set_text(st[0], "<h2>Sūnsoari, une maison solaire</h2>")
    set_text(st[1], "<p><strong>Sun</strong> pour la lumière et la chaleur, <strong>So</strong>, « maison » en bambara, "
                    "et <strong>Soari</strong>, le prénom d'un petit garçon. Sūnsoari est née de deux sœurs et d'une histoire de famille, "
                    "de transmission et de joie.</p><p>Nous sélectionnons des rituels de soin inspirés d'Afrique et d'Asie, avec une exigence simple : "
                    "des produits que nous aimons, qui tiennent leurs promesses et que nous expliquons honnêtement.</p>")
    button(find(story, by_type("button")), "Notre univers", "shopify://pages/a-propos")

    # 7 · Newsletter
    nl = sec["custom_section_qetdex"]
    nt = find_all(nl, by_type("text"))
    set_text(nt[0], "<h2>Rejoins la maison Sūnsoari</h2>")
    set_text(nt[1], "<p>Conseils rituels, nouveautés et coulisses de la marque, sans spam.</p>")

    t["sections"]["nos_marques"] = brands
    t["sections"]["recharges"] = refills
    t["order"] = ["custom_section_H6XpXt", "nos_marques", "collection_featured_9fdFHq", "custom_section_iHWWPc",
                  "recharges", "custom_section_KAQ8dw", "custom_section_qetdex"]
    save("templates/index.json", t)


# --------------------------------------------------------------------------
# Collections
# --------------------------------------------------------------------------

COLLECTION = load("templates/collection.json")


def collection(banner_image=None, title=None, text=None, extra=None):
    """Collection page: banner, product grid, optional brand story.

    The fake testimonials of the demo are removed (no invented reviews).
    """
    t = clone(COLLECTION)
    s = t["sections"]
    banner_key = "image_banner_eJfHLF"
    banner = s[banner_key]
    b = find(banner, by_type("_image-banner"))
    if banner_image:
        b["settings"]["image"] = img(banner_image)
    else:
        b["settings"]["image"] = img(LIFESTYLE["onsha_hot_spring"])
    tx = find_all(banner, by_type("text"))
    set_text(tx[0], f"<h1>{title}</h1>" if title else "<h1>{{ closest.collection.title }}</h1>")
    set_text(tx[1], f"<p>{text}</p>" if text else "{{ closest.collection.description }}")
    stars = find(banner, by_type("rating-stars"))
    if stars:
        stars["disabled"] = True
    order = [banner_key, "main"]
    del s["custom_section_qtkFC9"]  # demo before/after with invented testimonials
    del s["custom_section_9YFVEQ"]
    if extra:
        for key, section in extra:
            s[key] = section
            order.append(key)
    t["order"] = order
    return t


def brand_story(title, paragraphs, image, button_label, link):
    story = clone(INDEX["sections"]["custom_section_KAQ8dw"])
    set_image(find(story, by_type("image")), image)
    st = find_all(story, by_type("text"))
    set_text(st[0], f"<h2>{title}</h2>")
    set_text(st[1], "".join(f"<p>{p}</p>" for p in paragraphs))
    button(find(story, by_type("button")), button_label, link)
    return story


def collections():
    save("templates/collection.json", collection())

    save("templates/collection.onsha.json", collection(
        LIFESTYLE["onsha_hot_spring"], "Onsha",
        "Le rituel thermal coréen, à la maison ou en voyage.",
        [("histoire_onsha", brand_story(
            "Deux systèmes, un même rituel",
            [
                "Onsha s'inspire des sources thermales coréennes. Ses filtres et capsules associent une eau thermale soufrée, "
                "lyophilisée et concentrée, à des actifs de soin et à quatre senteurs : Hinoki, Océan, Pin et Fleur de Prunier.",
                "<strong>Home</strong> : le pommeau filtrant, la coque de diffusion et les filtres thermaux, pour un rituel installé chez toi.",
                "<strong>Nomade</strong> : la douchette tout-en-un et les capsules compactes, pour un rituel qui te suit partout.",
                "Les recharges Home et Nomade ne sont pas interchangeables : vérifie ton système avant de commander.",
            ],
            PRODUCT["set_home"][1], "Voir les coffrets", "shopify://collections/kit-de-douche"))],
    ))

    save("templates/collection.shift.json", collection(
        LIFESTYLE["shift_product"], "SHIFT",
        "Des pommeaux filtrants colorés, des filtres Pure Water et des capsules d'aromathérapie.",
        [("histoire_shift", brand_story(
            "Filtrer, puis parfumer",
            [
                "Le pommeau SHIFT accueille deux éléments qui travaillent ensemble : le filtre Pure Water, qui retient les sédiments "
                "et impuretés visibles, et la capsule de soin & aromathérapie, qui diffuse sa senteur dans l'eau de ta douche.",
                "Le filtre se change environ tous les 2 à 3 mois, la capsule quand elle est vide. Les recharges SHIFT sont compatibles "
                "uniquement avec le pommeau SHIFT.",
            ],
            SHIFT_POMMEAU_COLORS["Blanc"], "Découvrir le coffret complet", "shopify://products/shift-coffret-douche-aromatherapie"))],
    ))

    save("templates/collection.sullab.json", collection(
        PRODUCT["robinet"][0], "Sullab",
        "La filtration au robinet du lavabo, sans outil ni plombier.",
        [("histoire_sullab", brand_story(
            "La base de ton rituel visage",
            [
                "Le filtre robinet Sullab se fixe sur la plupart des robinets standard grâce aux adaptateurs fournis. "
                "Il retient les sédiments et impuretés visibles de l'eau que tu utilises pour te laver le visage, les mains ou te rincer.",
                "La coque se garde longtemps : seul le sédiment se remplace, tous les 2 à 3 mois selon ton eau. "
                "L'eau filtrée n'est pas destinée à la consommation.",
            ],
            PRODUCT["robinet"][2], "Voir le filtre robinet", "shopify://products/filtre-a-robinet-faucet-sullab-sunsoari"))],
    ))


# --------------------------------------------------------------------------
# Header & footer
# --------------------------------------------------------------------------

def header():
    h = clone(HEADER)
    sec = h["sections"]
    bar = sec["announcement_bar_r8QCCw"]
    for ann, text in zip(find_all(bar, by_type("text")), [
        "<p>Livraison suivie partout en France métropolitaine</p>",
        "<p>Nouveau : le filtre thermal sans senteur</p>",
    ]):
        set_text(ann, text)
    hd = sec["header"]
    hd["settings"].update(menu=MENU_HANDLE, menu_mobile=MOBILE_MENU_HANDLE)
    diag = find(hd, by_type("button"))
    if diag:
        diag["disabled"] = True  # "Diagnostic" demo button: no diagnostic page yet
    mega = find(hd, by_type("_header-megamenu"))
    mega["settings"]["title"] = "Rituels de douche"
    cf = find(mega, by_type("collection-featured"))
    if cf:
        cf["settings"]["collection"] = "kit-de-douche"
    group = find(mega, by_type("_header-megamenu-group"))
    put(group, [
        image_card(PRODUCT["coffret_home"][0], "Rituel Home", "shopify://collections/onsha"),
        image_card(PRODUCT["coffret_nomade"][0], "Rituel Nomade", "shopify://collections/onsha"),
        image_card(LIFESTYLE["shift_cover"], "SHIFT", "shopify://collections/shift"),
    ])
    save("sections/header-group.json", h)


def footer():
    f = load("sections/footer-group.json")
    reassurance = f["sections"]["custom_section_VHtWr9"]
    for group, (h, p) in zip([g for g in children(reassurance) if g["type"] == "group"], [
        ("Livraison suivie", "Partout en France métropolitaine. Délais et frais affichés au paiement."),
        ("Paiement sécurisé", "Carte bancaire, Apple Pay, PayPal."),
        ("Sélection Sunsoari", "Des produits coréens choisis avec exigence et expliqués honnêtement."),
    ]):
        tx = find_all(group, by_type("text"))
        set_text(tx[0], f"<p>{h}</p>")
        set_text(tx[1], f"<p>{p}</p>")
    ft = f["sections"]["footer"]
    set_text(ft["blocks"]["group_y4aNMX"]["blocks"]["text_hzJHEn"],
             "<p>Sūnsoari, concept-store de rituels beauté et bien-être inspirés d'Afrique et d'Asie. Une maison solaire, née d'une histoire de famille.</p>")
    nl = ft["blocks"]["group_y4aNMX"]["blocks"]["group_QRmXKh"]["blocks"]
    set_text(nl["text_iFg3yL"], "<p><strong>Rejoins la maison Sūnsoari</strong></p>")
    set_text(nl["text_nyWTNJ"], "<p>Conseils rituels, nouveautés et coulisses de la marque.</p>")
    menus = ft["blocks"]["group_3hzfDy"]["blocks"]
    for key, (title, handle) in zip(["menu_8E33CJ", "menu_9nbUnb", "menu_k47Fye"], [
        ("Boutique", MENU_HANDLE), ("Informations", "footer"), ("Suis-nous", "r-seaux-sociaux"),
    ]):
        menus[key]["settings"].update(title=f"<h3>{title}</h3>", menu=handle)
    save("sections/footer-group.json", f)


def build():
    home()
    collections()
    header()
    footer()


if __name__ == "__main__":
    build()
    print("index, collections, header")


# --------------------------------------------------------------------------
# V2 additions: pack builder page, cart drawer, free shipping (80 €, real discount)
# --------------------------------------------------------------------------

def builder_page():
    t = {
        "sections": {
            "rituel": {
                "type": "sunsoari-rituel-builder",
                "blocks": {
                    "cat_systemes": {"type": "category", "settings": {
                        "label": "1 · Mon système", "collection": "douchette",
                        "note": "Home : pommeau + coque + filtres. Nomade : douchette + capsules. Les recharges Home et Nomade ne sont pas interchangeables."}},
                    "cat_recharges": {"type": "category", "settings": {
                        "label": "2 · Mes recharges", "collection": "recharge-filtre",
                        "note": "Choisis les recharges de ton système : filtres thermaux pour Home, capsules pour Nomade, Pure Water et capsules pour SHIFT."}},
                    "cat_capsules": {"type": "category", "settings": {
                        "label": "3 · Mes senteurs", "collection": "capsule-vitamine", "note": ""}},
                    "cat_accessoires": {"type": "category", "settings": {
                        "label": "4 · Mes accessoires", "collection": "accessoires", "note": ""}},
                },
                "block_order": ["cat_systemes", "cat_recharges", "cat_capsules", "cat_accessoires"],
                "settings": {},
            }
        },
        "order": ["rituel"],
    }
    save("templates/page.composez-votre-rituel.json", t)


def cart_drawer():
    c = load("sections/cart-drawer-group.json")
    d = c["sections"]["cart-drawer"]
    xs = d["blocks"]["cart_footer_resume_blocks"]["blocks"]["cross_sells_DkGxFb"]["settings"]
    xs.update(products=[
        "filtre-vitamine-showerfilter-sunsoari",
        "capsule-vitaminee-shower-filter-sunsoari",
        "filtre-sediment-recharge",
        "pack-6-capsules-vitaminees-shift-sunsoari",
    ])
    bar = d["blocks"]["cart_header_blocks"]["blocks"]["cart_progress_bar_dtN84U"]["settings"]
    bar.update(step1_text="Plus que # pour la livraison offerte", step1_value=80,
               step_completed_text="Ta livraison est offerte")
    save("sections/cart-drawer-group.json", c)


def shipping_texts():
    """Free shipping from 80 € exists (automatic discount « Expédition gratuite fr /eu »)."""
    import json as _json, os as _os
    from lib import OUT as _OUT
    hp = _os.path.join(_OUT, "sections/header-group.json")
    h = _json.load(open(hp, encoding="utf-8"))
    texts_ = find_all(h["sections"]["announcement_bar_r8QCCw"], by_type("text"))
    set_text(texts_[0], "<p>Livraison offerte dès 80 € d'achat</p>")
    save("sections/header-group.json", h)
    fp = _os.path.join(_OUT, "sections/footer-group.json")
    f = _json.load(open(fp, encoding="utf-8"))
    g = [x for x in children(f["sections"]["custom_section_VHtWr9"]) if x["type"] == "group"][0]
    tx = find_all(g, by_type("text"))
    set_text(tx[0], "<p>Livraison offerte dès 80 €</p>")
    set_text(tx[1], "<p>Livraison suivie en France métropolitaine. Délais et frais affichés au paiement.</p>")
    save("sections/footer-group.json", f)


def build_v2():
    build()
    builder_page()
    cart_drawer()
    shipping_texts()
