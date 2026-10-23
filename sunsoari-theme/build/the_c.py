"""THE C (K-beauty, CNR Cosmetics, Jeonju): product templates, brand collection
and the THE C block of the "Nos marques" page.

Same structure as the live "ss-" product templates (Sunsoari V6 theme):
badge, title, rating, price, short description, variants, buy buttons,
complements, key facts, reassurance, accordions, then steps, cards,
brand story, reviews and FAQ.

Run: python3 the_c.py  -> writes into ../theme/templates/
"""
import json
import os

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "theme", "templates")

BRAND_URL = "shopify://collections/the-c"
BRAND_STORY = (
    "<p>THE C est née pour Chloé. Après la naissance de son enfant, sa peau a changé, et avec elle sa confiance. "
    "Son mari, maquilleur professionnel, a voulu l'aider à se retrouver : des soins simples, essentiels et efficaces, "
    "pensés pour la vraie vie.</p><p>Une histoire de famille et de retour à soi, née à Jeonju, en Corée. "
    "C'est aussi pour ça qu'on l'a choisie.</p>"
)
INCI_NOTE = "<p><em>Cette liste peut évoluer : se référer à l'emballage du produit acheté.</em></p>"
PRECAUTIONS = (
    "<p>Usage externe. Éviter le contact avec les yeux ; en cas de contact, rincer abondamment à l'eau claire. "
    "En cas de réaction inhabituelle, cesser l'utilisation et consulter un médecin. Conserver à l'abri du soleil et de la chaleur.</p>"
)
FAQ_SENSITIVE = (
    "Et si j'ai la peau sensible ?",
    "<p>Si ta peau est très réactive, fais un test sur une petite zone avant la première utilisation. "
    "En cas de doute, demande conseil à un professionnel de santé.</p>",
)

SERUM_INCI = (
    "Water (Aqua), Glycerin, Propanediol, Trehalose, Niacinamide, 1,2-Hexanediol, Panthenol, Cudrania Tricuspidata Bark Extract, "
    "Butylene Glycol, Caprylic/Capric Triglyceride, Ammonium Acryloyldimethyltaurate/VP Copolymer, "
    "Sodium Acrylate/Sodium Acryloyldimethyl Taurate Copolymer, Polyisobutene, Sodium Hyaluronate, Allantoin, "
    "Lactobacillus Ferment Lysate, Xanthan Gum, Ethylhexylglycerin, Adenosine, Disodium EDTA, Polyglyceryl-10 Stearate, "
    "Caprylyl/Capryl Glucoside, Sorbitan Oleate, Simmondsia Chinensis (Jojoba) Seed Oil, Hydrogenated Lecithin, "
    "Lactobacillus/Soybean Ferment Extract, Lactobacillus/Rice Ferment Filtrate, Lactobacillus/Ginseng Root Ferment Filtrate, "
    "Saccharomyces/Coix Lacryma-Jobi Ma-Yuen Seed Ferment Filtrate, Saccharomyces/Potato Extract Ferment Filtrate, "
    "Ceramide AP, Ceramide NP, Ceramide NS, Ceramide EOP."
)
MASK_INCI = (
    "Water, Chamaecyparis Obtusa Water, Butylene Glycol, Glycerin, 1,2-Hexanediol, Niacinamide, Sodium Hyaluronate, "
    "Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer, Xanthan Gum, Allantoin, PEG-60 Hydrogenated Castor Oil, "
    "Polyglutamic Acid, Adenosine, Disodium EDTA, Schizandra Chinensis Fruit Extract, Punica Granatum Fruit Extract, "
    "Citrus Paradisi (Grapefruit) Fruit Extract, Solanum Lycopersicum (Tomato) Fruit Extract, Saccharomyces Ferment Filtrate, "
    "Saccharomyces/Rice Ferment Filtrate, Ziziphus Jujuba Fruit Extract, Zingiber Officinale (Ginger) Root Extract, "
    "Cinnamomum Cassia Bark Extract, Aloe Barbadensis Leaf Extract, Cucumis Melo (Melon) Fruit Extract, "
    "Calendula Officinalis Flower Extract, Aspergillus/Camellia Sinensis Leaf Ferment Extract Filtrate, Salix Alba (Willow) Bark Extract."
)
SUNSTICK_INCI = (
    "Dibutyl Adipate, Synthetic Wax, Silica, Vinyl Dimethicone/Methicone Silsesquioxane Crosspolymer, Cetyl Ethylhexanoate, "
    "Diethylhexyl Carbonate, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Butyloctyl Salicylate, Ethylhexyl Triazone, "
    "Polysilicone-15, C12-15 Alkyl Benzoate, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Microcrystalline Wax, Cetyl Alcohol, "
    "1,2-Hexanediol, Caprylic/Capric Glycerides, Water, Butylene Glycol, Galactomyces Ferment Filtrate, Rice Ferment Filtrate (Sake), "
    "Glycerin, Zingiber Officinale (Ginger) Root Extract, Mentha Piperita (Peppermint) Leaf Extract, Dipropylene Glycol, "
    "Leuconostoc/Radish Root Ferment Filtrate, Diospyros Kaki Fruit Extract, Oryza Sativa (Rice) Extract, "
    "Artemisia Princeps Leaf Extract, Origanum Vulgare Leaf Extract, Chamaecyparis Obtusa Leaf Extract, "
    "Salix Alba (Willow) Bark Extract, Lactobacillus/Soybean Ferment Extract, Portulaca Oleracea Extract, "
    "Cinnamomum Cassia Bark Extract, Scutellaria Baicalensis Root Extract, Hydrogenated Lecithin, Phytosterols, Ceramide NP."
)
CLEANSER_INCI = (
    "Water, Lauryl Hydroxysultaine, Glycerin, Disodium Cocoamphodiacetate, Sodium Methyl Cocoyl Taurate, Sodium Chloride, "
    "1,2-Hexanediol, Citric Acid, Coco-Glucoside, Hexylene Glycol, Citrus Aurantium Dulcis (Orange) Peel Oil, Butylene Glycol, "
    "Sodium Phytate, Rice Ferment Filtrate (Sake), Galactomyces Ferment Filtrate, Citrus Aurantium Dulcis (Orange) Flower Oil, "
    "Thymus Mastichina Flower Oil, Glycyrrhiza Uralensis (Licorice) Root Extract, Citrus Unshiu Peel Extract, "
    "Ziziphus Jujuba Fruit Extract, Zingiber Officinale (Ginger) Root Extract, Cinnamomum Cassia Bark Extract, "
    "Angelica Gigas Root Extract, Pueraria Lobata Root Extract, Ascorbic Acid, Limonene."
)


def esc(s):
    return s.replace("'", "&#x27;")


def facts(rows):
    cells = "".join(f"<div><b>{esc(k)}</b>{esc(v)}</div>" for k, v in rows)
    return f'<div class="ss-pdp-facts">{cells}</div>'


def complements(items, title, note):
    """items: list of (handle, forced variant title or '', why)."""
    raw = ";".join(f"{h}|{v}|{w}" for h, v, w in items)
    return "{% render 'ss-complements', items: \"" + raw + "\", title: \"" + title + "\", note: \"" + note + "\" %}"


def blocks(items, kind="item"):
    out, order = {}, []
    for i, it in enumerate(items, 1):
        k = f"b{i}"
        if kind == "step":
            out[k] = {"type": "step", "settings": {"text": it}}
        else:
            title, text, tag = (list(it) + [""])[:3]
            out[k] = {"type": "item", "settings": {
                "title": title, "text": text if text.startswith("<") else f"<p>{text}</p>",
                "tag": tag, "link_label": "", "show_price": True}}
        order.append(k)
    return out, order


def story(layout, eyebrow, heading, items, kind="item", background="white", text="", columns=3, **extra):
    b, order = blocks(items, kind)
    settings = {
        "layout": layout, "background": background, "align": "center", "eyebrow": eyebrow, "heading": heading,
        "text": text, "columns": columns, "columns_mobile": "1", "ratio": "1/1", "open_first": layout == "faq",
    }
    settings.update(extra)
    return {"type": "ss-story", "blocks": b, "block_order": order, "settings": settings}


def product_template(p):
    main_blocks = {
        "ss_badge": {"type": "custom_liquid", "settings": {"custom_liquid": f'<span class="ss-pdp-badge">{p["badge"]}</span>'}},
        "title": {"type": "title", "settings": {"heading_size": "h1"}},
        "ss_rating": {"type": "custom_liquid", "settings": {"custom_liquid": "{% render 'ss-rating', product: product %}"}},
        "price": {"type": "price", "settings": {}},
        "description": {"type": "description", "settings": {}},
        "variant_picker": {"type": "variant_picker", "settings": {
            "picker_type": "button", "swatch_type": "shopify_swatch", "swatch_style": "circle", "swatch_size": 32,
            "button_style": "normal", "size_title": "Size", "size_chart_from_page": ""}},
        "buy_buttons": {"type": "buy_buttons", "settings": {
            "show_quantity_selector": True, "show_dynamic_checkout": False, "show_gift_card_recipient": False}},
        "ss_complements": {"type": "custom_liquid", "settings": {"custom_liquid": complements(*p["complements"])}},
        "ss_facts": {"type": "custom_liquid", "settings": {"custom_liquid": facts(p["facts"])}},
        "reassurance": {"type": "icon-with-text", "settings": {
            "layout": "vertical", "title_font": "body", "title_size": "text-base",
            "icon_1": "check", "heading_1": "<strong>Sélection Sunsoari</strong> : marques choisies avec exigence",
            "icon_2": "truck", "heading_2": "<strong>Livraison suivie</strong> en France métropolitaine",
            "icon_3": "check", "heading_3": "<strong>Paiement sécurisé</strong> : CB, Apple Pay, PayPal"}},
        "sticky_atc": {"type": "sticky-atc-bar", "settings": {
            "visibility": "all", "style": "minimalist", "container": "full", "show_atc_button": True,
            "show_dynamic_checkout_buttons": False, "show_quantity": True}},
    }
    order = ["ss_badge", "title", "ss_rating", "price", "description", "variant_picker", "buy_buttons",
             "ss_complements", "ss_facts", "reassurance"]
    for i, (heading, content) in enumerate(p["accordions"], 1):
        k = f"acc_{i}"
        main_blocks[k] = {"type": "collapsible_tab", "settings": {
            "heading": heading, "heading_size": "h4", "icon": "none", "content": content, "page": "",
            "default_open": False, "show_below_product_media": False}}
        order.append(k)
    order.append("sticky_atc")

    sections = {
        "breadcrumbs": {"type": "breadcrumbs", "settings": {
            "container": "fixed", "text_alignment": "start", "padding_top": 16, "padding_bottom": 20}},
        "main": {"type": "main-product", "blocks": main_blocks, "block_order": order,
                 "custom_css": ["@media (min-width: 1280px) {.product {padding-inline: 5rem; }}"],
                 "settings": {
                     "color_scheme": "scheme-1", "use_color_scheme_in_container": False, "enable_sticky_info": True,
                     "media_size": "large", "gallery_layout": "vertical-carousel", "mobile_thumbnails": "show",
                     "show_image_border": False, "enable_image_zoom": True, "enable_video_looping": True,
                     "padding_top": 0, "padding_bottom": 40}},
        "ss_why": story("cards", "Pourquoi on l'aime", p["why_heading"], p["why"], background="cream"),
        "ss_steps": story("steps", "Mode d'emploi", p["steps_heading"], p["steps"], kind="step",
                          tip_title="Les conseils de l'équipe", tip_text=p.get("tip", "")),
        "ss_cards": story("scroll", "Ingrédients clés", p["ingredients_heading"], p["ingredients"],
                          text="<p>La liste INCI complète est dans l'onglet Composition, plus haut.</p>",
                          columns=min(4, len(p["ingredients"]))),
        "ss_brand": story("cards", "La marque", "THE C, née pour Chloé", [], background="sand",
                          text=BRAND_STORY, button_label="Découvrir THE C", button_link=BRAND_URL),
        "ss_reviews": {"type": "ss-reviews", "settings": {"heading": "Avis clientes", "open": False}},
        "ss_faq": story("faq", "On répond à tes questions", "Questions fréquentes", p["faq"]),
    }
    return {"sections": sections,
            "order": ["breadcrumbs", "main", "ss_why", "ss_steps", "ss_cards", "ss_brand", "ss_reviews", "ss_faq"]}


PRODUCTS = {
    "ss-thec-one-cream": {
        "badge": "Format nomade · Ligne 104",
        "facts": [("Pour qui", "Tous types de peau, y compris sensibles"), ("Format", "Nomade 7 ml, idéal pour découvrir"),
                  ("Moment", "Matin et soir, après le sérum")],
        "complements": ([("serum-tout-en-un-104-multi-boosting-serum-the-c", "", "À appliquer juste avant la crème")],
                        "Le duo de la ligne 104", "Applique le sérum juste avant la crème pour compléter ta routine."),
        "accordions": [
            ("Composition (INCI)", "<p>Liste INCI en cours de vérification : elle figure sur l'emballage du produit.</p>"),
            ("Précautions", PRECAUTIONS),
        ],
        "why_heading": "Un seul geste, trois besoins",
        "why": [
            ("Tout-en-un", "Hydratation, confort et éclat réunis dans un seul soin."),
            ("Évaluée par la marque", "Selon les tests cliniques de THE C, amélioration de l'apparence des rides et de l'éclat après 2 et 4 semaines."),
            ("Format nomade", "7 ml pour tester la texture avant d'adopter, ou pour l'emporter partout."),
        ],
        "steps_heading": "Ta routine en 3 gestes",
        "steps": [
            "<strong>Matin et soir</strong>, sur peau propre, après ton sérum.",
            "<strong>Prélève</strong> une noisette de crème.",
            "<strong>Applique</strong> sur le visage et le cou en mouvements doux, jusqu'à absorption.",
        ],
        "tip": "<p>Le matin, termine toujours par ta protection solaire.</p>",
        "ingredients_heading": "Ce que contient ta crème",
        "ingredients": [
            ("Cudrania tricuspidata", "Ingrédient signature de la ligne 104, issu d'un arbre fruitier d'Asie de l'Est.", "Signature"),
            ("Ginseng", "Emblème du soin coréen.", "Tradition coréenne"),
            ("Karité & jojoba", "Nourrissent et assouplissent la peau.", "Nourrissant"),
            ("Bêta-glucane", "Hydrate et apporte du confort.", "Hydratant"),
        ],
        "faq": [
            ("Puis-je l'utiliser seule ?", "C'est un soin complet en une étape. Tu peux aussi l'associer au sérum 104 Multi Boosting Serum."),
            ("À quoi sert le format Nomade ?", "À découvrir la crème ou à l'emporter partout avec toi : voyage, sac de sport, week-end."),
            FAQ_SENSITIVE,
        ],
    },
    "ss-thec-serum": {
        "badge": "Le soin tout-en-un",
        "facts": [("Pour qui", "Tous types de peau, y compris sensibles et mixtes"), ("Texture", "Fluide léger, vite absorbé"),
                  ("Flacon", "Airless rechargeable, ou format nomade 10 ml")],
        "complements": ([("recharge-serum-104-multi-boosting-serum-the-c", "", "Garde ton flacon, recharge la formule"),
                         ("creme-tout-en-un-104-one-cream-the-c", "", "À appliquer juste après le sérum")],
                        "Pense à la suite", "La recharge pour plus tard, et la crème de la même ligne."),
        "accordions": [("Composition (INCI)", f"<p>{SERUM_INCI}</p>{INCI_NOTE}"), ("Précautions", PRECAUTIONS)],
        "why_heading": "Léger, mais complet",
        "why": [
            ("Flacon airless", "Un piston pousse la formule en limitant l'exposition à l'air : utilisation hygiénique et dosage précis."),
            ("Apaisant au quotidien", "Selon les tests cliniques de la marque, effet apaisant observé dans les 24 heures."),
            ("Rechargeable", "Garde ton flacon et rachète uniquement la recharge 50 ml."),
        ],
        "steps_heading": "Ta routine en 3 gestes",
        "steps": [
            "<strong>Matin et soir</strong>, sur peau propre.",
            "<strong>Prélève</strong> 1 à 2 pompes de sérum.",
            "<strong>Tapote</strong> délicatement sur le visage jusqu'à absorption, puis applique ta crème.",
        ],
        "tip": "<p>Le matin, termine toujours ta routine par une protection solaire.</p>",
        "ingredients_heading": "Ce que contient ton sérum",
        "ingredients": [
            ("Cudrania tricuspidata", "Ingrédient signature de la ligne 104.", "Signature"),
            ("Niacinamide & adénosine", "Deux actifs phares du soin coréen.", "Éclat"),
            ("Ferments de ginseng et de riz", "Inspirés du savoir-faire coréen de la fermentation.", "Fermentation"),
            ("Céramides & acide hyaluronique", "Soutiennent le confort et l'hydratation de la peau.", "Hydratant"),
        ],
        "faq": [
            ("Pour quel type de peau ?", "Toutes les peaux, y compris sensibles. Sa texture légère plaît particulièrement aux peaux mixtes."),
            ("Comment utiliser la recharge ?", "Une fois ton flacon vide, rince-le, laisse-le sécher puis verse la recharge à l'intérieur."),
            ("À quoi sert le format Nomade ?", "À découvrir le sérum ou à l'emporter en voyage."),
        ],
    },
    "ss-thec-recharge": {
        "badge": "Garde ton flacon",
        "facts": [("Compatibilité", "Flacon airless 104 Multi Boosting Serum 50 ml"), ("Contenance", "50 ml"),
                  ("Formule", "Identique au flacon")],
        "complements": ([("serum-tout-en-un-104-multi-boosting-serum-the-c", "Flacon 50 ml", "Le flacon airless à garder")],
                        "La recharge est vendue seule", "Elle se verse dans le flacon airless du sérum. Pas encore équipée ?"),
        "accordions": [("Composition (INCI)", f"<p>Identique au 104 Multi Boosting Serum : {SERUM_INCI}</p>{INCI_NOTE}"),
                       ("Précautions", PRECAUTIONS + "<p>Manipuler avec des mains propres.</p>")],
        "why_heading": "Le même sérum, moins d'emballage",
        "why": [
            ("Même formule", "Le sérum tout-en-un, sans compromis."),
            ("Moins d'emballage", "Tu réutilises ton flacon au lieu d'en racheter un."),
            ("Un prix plus doux", "27,90 € au lieu de 37,90 € pour le flacon."),
        ],
        "steps_heading": "Recharge ton flacon",
        "steps": [
            "<strong>Vide</strong> complètement ton flacon, rince-le à l'eau claire et laisse-le bien sécher.",
            "<strong>Verse</strong> la recharge dans le flacon avec des mains propres, puis referme la pompe.",
            "<strong>Actionne</strong> la pompe quelques fois jusqu'à ce que le sérum sorte.",
        ],
        "ingredients_heading": "Ce que contient ta recharge",
        "ingredients": [
            ("Cudrania tricuspidata", "Ingrédient signature de la ligne 104.", "Signature"),
            ("Niacinamide & adénosine", "Deux actifs phares du soin coréen.", "Éclat"),
            ("Céramides & acide hyaluronique", "Soutiennent le confort et l'hydratation de la peau.", "Hydratant"),
        ],
        "faq": [
            ("Est-ce la même formule que le flacon ?", "Oui, c'est exactement le même sérum."),
            ("Avec quel flacon l'utiliser ?", "Avec le flacon airless 104 Multi Boosting Serum 50 ml."),
        ],
    },
    "ss-thec-moju-mask": {
        "badge": "Ton rendez-vous éclat",
        "facts": [("Contenu", "Boîte de 5 masques en tissu microfibre"), ("Temps de pose", "15 à 20 minutes"),
                  ("Fréquence", "1 à 3 fois par semaine")],
        "complements": ([("creme-tout-en-un-104-one-cream-the-c", "", "Après le masque, pour prolonger le confort")],
                        "Après ton masque", "Applique ta crème pour terminer ton moment soin."),
        "accordions": [("Composition (INCI)", f"<p>{MASK_INCI}</p>{INCI_NOTE}"),
                       ("Précautions", "<p>Usage externe, masque à usage unique. Éviter le contour des yeux et ne pas appliquer sur une peau lésée. "
                                       "En cas de réaction inhabituelle, retirer le masque et consulter un médecin. Conserver à l'abri du soleil et de la chaleur.</p>")],
        "why_heading": "Un vrai moment pour souffler",
        "why": [
            ("Éclat du teint", "La niacinamide et les ferments de riz contribuent à un teint d'apparence plus lumineuse."),
            ("Recette du Moju", "Riz fermenté, jujube, gingembre et cannelle, inspirés de la boisson traditionnelle de Jeonju."),
            ("Tissu microfibre", "Ultra-fin, il épouse le visage et diffuse l'essence uniformément."),
        ],
        "steps_heading": "Ton masque en 3 gestes",
        "steps": [
            "<strong>Déplie</strong> le masque et pose-le sur ta peau propre et sèche.",
            "<strong>Laisse poser</strong> 15 à 20 minutes, le temps de souffler.",
            "<strong>Retire</strong> le masque et fais pénétrer l'essence restante en tapotant. Pas besoin de rincer.",
        ],
        "ingredients_heading": "Ce que contient ton masque",
        "ingredients": [
            ("Ferments de riz", "Cœur de la ligne Moju.", "Fermentation"),
            ("Jujube, gingembre & cannelle", "Les ingrédients traditionnels du Moju de Jeonju.", "Tradition"),
            ("Niacinamide & adénosine", "Deux actifs phares du soin coréen.", "Éclat"),
            ("Eau de hinoki", "Eau florale de cyprès japonais, pour une sensation de fraîcheur.", "Fraîcheur"),
        ],
        "faq": [
            ("Combien de masques dans la boîte ?", "5 masques, de quoi en faire un rendez-vous chaque semaine pendant plus d'un mois."),
            ("Combien de fois par semaine ?", "1 à 3 fois par semaine, selon les besoins de ta peau."),
            FAQ_SENSITIVE,
        ],
    },
    "ss-thec-sunstick": {
        "badge": "Protection du quotidien",
        "facts": [("Protection", "SPF 50+"), ("Fini", "Mat, effet base de maquillage"), ("Format", "Stick 20 g, nomade")],
        "complements": ([("nettoyant-mousse-sensitive-moju-c-cleanser-the-c", "", "Pour retirer ta protection le soir")],
                        "Le soir", "Retire ta protection solaire avec une mousse douce."),
        "accordions": [("Composition (INCI)", f"<p>{SUNSTICK_INCI}</p>{INCI_NOTE}"),
                       ("Précautions", "<p>Ne pas rester longtemps au soleil, même avec une protection solaire. Réappliquer fréquemment pour maintenir la protection. "
                                       "Ne pas exposer les bébés et les jeunes enfants directement au soleil. Éviter le contact avec les yeux. "
                                       "En cas de réaction inhabituelle, cesser l'utilisation et consulter un médecin. Conserver à l'abri de la chaleur.</p>")],
        "why_heading": "La protection qui se glisse dans ton sac",
        "why": [
            ("Sans PEG", "Formulé sans émulsifiants PEG, enrichi en ferments et extraits botaniques."),
            ("Fini mat", "Fini doux et effet flouteur, idéal sous le maquillage."),
            ("Sans te salir les doigts", "Le stick se réapplique facilement dans la journée."),
        ],
        "steps_heading": "Ta protection en 3 gestes",
        "steps": [
            "<strong>Le matin</strong>, en dernière étape de ta routine, avant l'exposition au soleil.",
            "<strong>Applique</strong> généreusement sur le visage, en plusieurs passages sur chaque zone.",
            "<strong>Réapplique</strong> souvent, surtout après avoir transpiré, nagé ou t'être essuyée.",
        ],
        "ingredients_heading": "Ce que contient ton stick",
        "ingredients": [
            ("Ferments de riz & galactomyces", "Ingrédients signatures de la ligne Moju.", "Fermentation"),
            ("Gingembre & cannelle", "Ingrédients traditionnels du Moju de Jeonju.", "Tradition"),
            ("Céramide NP", "Soutient le confort de la peau.", "Confort"),
        ],
        "faq": [
            ("Peut-on l'utiliser sous le maquillage ?", "Oui, son fini mat en fait une base de maquillage. Laisse-le poser une minute avant ton teint."),
            ("Comment le retirer le soir ?", "Avec un nettoyant doux comme le Sensitive Moju C Cleanser."),
            FAQ_SENSITIVE,
        ],
    },
    "ss-thec-cleanser": {
        "badge": "Spécial peaux sensibles",
        "facts": [("Pour qui", "Peaux sensibles et tous types de peau"), ("Texture", "Micro-mousse prête à l'emploi"),
                  ("Format", "Flacon pompe 150 ml")],
        "complements": ([("serum-tout-en-un-104-multi-boosting-serum-the-c", "", "Ta peau est propre et prête")],
                        "La suite de ta routine", "Enchaîne avec le sérum tout-en-un de la ligne 104."),
        "accordions": [("Composition (INCI)", f"<p>{CLEANSER_INCI}</p>{INCI_NOTE}"),
                       ("Précautions", PRECAUTIONS + "<p>Contient des huiles essentielles et du limonène.</p>")],
        "why_heading": "Doux, mais efficace",
        "why": [
            ("Nettoyage doux", "Ses micro-bulles fines éliminent les impuretés du quotidien en respectant la peau."),
            ("Prête à l'emploi", "La pompe délivre directement une mousse fine."),
            ("Tradition et formulation moderne", "Inspiré du Moju de Jeonju et de ses ingrédients botaniques."),
        ],
        "steps_heading": "Ton nettoyage en 3 gestes",
        "steps": [
            "<strong>Mouille</strong> ton visage, matin et soir.",
            "<strong>Masse</strong> 2 à 3 pompes de mousse en mouvements circulaires, en évitant le contour des yeux.",
            "<strong>Rince</strong> à l'eau tiède et sèche en tamponnant.",
        ],
        "ingredients_heading": "Ce que contient ton nettoyant",
        "ingredients": [
            ("Ferments de riz & galactomyces", "Cœur de la ligne Moju.", "Fermentation"),
            ("Vitamine C", "Acide ascorbique, présent dans la formule.", "Vitaminé"),
            ("Jujube, gingembre & cannelle", "Les ingrédients traditionnels du Moju de Jeonju.", "Tradition"),
            ("Huiles essentielles d'orange", "Écorce et fleur d'orange pour une note fraîche.", "Senteur"),
        ],
        "faq": [
            ("Démaquille-t-il ?", "Il retire les impuretés du quotidien. Pour un maquillage longue tenue, commence par un démaquillant."),
            ("Faut-il le faire mousser ?", "Non, la pompe délivre directement une mousse fine, prête à l'emploi."),
            FAQ_SENSITIVE,
        ],
    },
}

# Product handle -> template suffix
ASSIGN = {
    "creme-tout-en-un-104-one-cream-the-c": "ss-thec-one-cream",
    "serum-tout-en-un-104-multi-boosting-serum-the-c": "ss-thec-serum",
    "recharge-serum-104-multi-boosting-serum-the-c": "ss-thec-recharge",
    "masque-tissu-eclat-moju-mask-pack-the-c": "ss-thec-moju-mask",
    "stick-solaire-spf50-non-stick-sunstick-the-c": "ss-thec-sunstick",
    "nettoyant-mousse-sensitive-moju-c-cleanser-the-c": "ss-thec-cleanser",
}


def collection_template():
    """Brand page, same layout as collection.shift.json."""
    return {
        "sections": {
            "breadcrumbs": {"type": "breadcrumbs", "settings": {
                "container": "fixed", "text_alignment": "start", "padding_top": 16, "padding_bottom": 20}},
            "banner": {
                "type": "main-collection-banner",
                "blocks": {"collection_info": {"type": "collection_info", "settings": {
                    "heading_size": "h1", "heading_tag": "h1", "show_description": True, "padding_top": 56, "padding_bottom": 56}}},
                "block_order": ["collection_info"],
                "custom_css": [".collection-hero__description {max-width: 40rem;}"],
                "settings": {
                    "container": "fixed", "color_scheme": "scheme-6", "text_alignment": "left", "show_collection_image": True,
                    "image_overlay_opacity": 0, "image_position": "right", "image_height": "extra-small", "enable_parallax": False,
                    "parallax_direction": "vertical", "image_height_mobile": "auto", "padding_top": 100, "padding_bottom": 0}},
            "ss_lines": story("cards", "Deux lignes", "La ligne 104 et la ligne Moju", [
                ("Ligne 104", "Des soins tout-en-un autour de l'extrait de Cudrania tricuspidata : un sérum et une crème pour une routine simplifiée.", "Tout-en-un"),
                ("Ligne Moju", "Inspirée du Moju, boisson fermentée traditionnelle de Jeonju : riz fermenté, jujube, gingembre et cannelle.", "Fermentation"),
                ("Pensé pour la vraie vie", "Des gestes simples, des formats rechargeables ou nomades, pour une routine qui s'adapte à ton quotidien.", "Simplicité"),
            ], background="cream"),
            "product-grid": {"type": "main-collection-product-grid", "custom_css": [], "settings": {
                "container": "fixed", "color_scheme": "scheme-1", "products_per_page": 20, "columns_desktop": 4,
                "column_gap": "2xs", "row_gap": "inherit", "pagination": "number", "enable_filtering": True,
                "enable_color_swatch": True, "filter_type": "vertical",
                "expand_filter_groups": "Availability, Price, Color, Size, Category, Product Type",
                "enable_sorting": True, "enable_layout_switching": True, "columns_mobile": "2",
                "padding_top": 28, "padding_bottom": 0, "show_section_divider": True, "divider_width": "fixed"}},
            "rich_text": {
                "type": "rich-text",
                "blocks": {
                    "heading": {"type": "heading", "settings": {
                        "heading": "À propos de THE C", "highlight_style": "none", "highlight_font_style": "italic",
                        "highlight_style_color": "", "highlight_text_color": "", "heading_size": "h3"}},
                    "text": {"type": "text", "settings": {
                        "text": "<h3>Née pour Chloé, à Jeonju</h3>" + BRAND_STORY.replace(
                            "C'est aussi pour ça qu'on l'a choisie.",
                            "Chez Sunsoari, on l'a choisie pour cette histoire de transmission, pour ses formules simples "
                            "et pour son lien avec le savoir-faire coréen de la fermentation.") +
                            "<p>THE C est conçue par CNR Cosmetics, à Jeonju, en Corée du Sud.</p>",
                        "text_size": "text-base", "text_line_limit": "5-lines",
                        "button_style": "btn--underline", "button_icon": "none"}},
                },
                "block_order": ["heading", "text"],
                "custom_css": [],
                "settings": {"container": "fixed", "color_scheme": "scheme-10", "use_color_scheme_in_container": True,
                             "content_spacing": "standard", "content_alignment": "left", "padding_top": 60,
                             "padding_bottom": 0, "show_section_divider": False, "divider_width": "fixed"}},
        },
        "order": ["breadcrumbs", "banner", "ss_lines", "product-grid", "rich_text"],
    }


def marques_section():
    """THE C block for page.marques.json (same type as the Onsha/SHIFT/Sullab blocks)."""
    points = [
        "Soins <strong>tout-en-un</strong> pour une routine simplifiée",
        "Flacon <strong>rechargeable</strong> et formats <strong>nomades</strong>",
        "Ingrédients issus de la <strong>fermentation coréenne</strong>",
    ]
    return {
        "type": "ss-image-text",
        "blocks": {f"b{i}": {"type": "point", "settings": {"text": t}} for i, t in enumerate(points, 1)},
        "block_order": [f"b{i}" for i in range(1, len(points) + 1)],
        "settings": {
            "background": "sand", "image_position": "right", "ratio": "4/5",
            "eyebrow": "Corée du Sud · Soin visage", "heading": "THE C",
            "text": "<p>THE C est née à Jeonju pour Chloé, qui a voulu retrouver une routine simple après la naissance de son enfant. "
                    "La marque propose des soins tout-en-un et des soins inspirés du Moju, boisson fermentée traditionnelle de Jeonju.</p>",
            "button_label": "Découvrir THE C", "button_link": BRAND_URL,
        },
    }


def marques_page():
    """page.marques.json with THE C added after Sullab and the texts updated."""
    from lib import load

    t = load("templates/page.marques.json")
    sec = t["sections"]
    sec["ss_intro"]["settings"]["text"] = (
        "<p>Chaque marque présente sur Sunsoari a été testée, comparée et choisie pour son sérieux, la qualité de ses produits "
        "et la clarté de ses informations. Nous avons commencé par l'eau, avec trois marques coréennes spécialistes de la douche "
        "et du lavabo, et nous ouvrons aujourd'hui la sélection au soin visage avec THE C.</p>"
    )
    first = sec["ss_next"]["blocks"]["b1"]["settings"]
    first["title"] = "J-beauty, C-beauty"
    first["text"] = "<p>D'autres soins visage, corps et cheveux choisis pour leur sérieux et leur sensorialité.</p>"
    sec["ss_the_c"] = marques_section()
    order = t["order"]
    order.insert(order.index("ss_sullab") + 1, "ss_the_c")
    return t


def write(name, data):
    os.makedirs(OUT, exist_ok=True)
    path = os.path.join(OUT, name)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    return path


def build():
    files = []
    for suffix, p in PRODUCTS.items():
        files.append(write(f"product.{suffix}.json", product_template(p)))
    files.append(write("collection.the-c.json", collection_template()))
    files.append(write("page.marques.json", marques_page()))
    return files


if __name__ == "__main__":
    for f in build():
        print(os.path.relpath(f, os.path.dirname(OUT)))
