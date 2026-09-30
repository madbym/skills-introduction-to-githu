"""Editing helpers specific to the Sunsoari product templates."""
import copy

from lib import (
    by_name,
    by_type,
    children,
    find,
    find_all,
    fill_accordion,
    fill_card,
    fill_step,
    load,
    repeat,
    set_image,
    set_text,
    texts,
    uid,
)

POMMEAU = load("templates/product.pommeau-filtrant.json")
CAPSULE = load("templates/product.capsule-nomade.json")


def _form(main):
    return find(main, by_type("_product-form"))


def _remove(parent, block):
    for k, v in list(parent["blocks"].items()):
        if v is block:
            del parent["blocks"][k]
            parent["block_order"].remove(k)


def _insert(parent, block, after_type=None, before_type=None):
    k = uid(block["type"].strip("_").replace("-", "_"))
    parent["blocks"][k] = block
    order = parent["block_order"]
    pos = len(order)
    for i, key in enumerate(order):
        t = parent["blocks"][key]["type"]
        if after_type and t == after_type:
            pos = i + 1
        if before_type and t == before_type:
            pos = i
            break
    order.insert(pos, k)


def set_badge(main, text):
    find(main, by_type("_badge"))["settings"]["text"] = text


def set_highlights(main, items):
    group = find(main, by_name("Points forts"))
    for block, text in zip(children(group), items):
        set_text(block, f"<p>{text}</p>")


def set_toggle(main, title=None, description=None, handles=None):
    """Checkbox add-on right above the add to cart button (Paalm style)."""
    form = _form(main)
    block = find(form, by_type("_toggle-cross-sell"))
    if handles is None:
        if block:
            _remove(form, block)
        return
    if not block:
        block = copy.deepcopy(find(_form(POMMEAU["sections"]["main"]), by_type("_toggle-cross-sell")))
        _insert(form, block)
    block["settings"].update(title=title, description=f"<p>{description}</p>", product_list=handles)


def set_quantity_breaks(main, label, items, unit="article", unit_plural="articles"):
    """items: list of (quantity, discount_percent or 0, badge text or '')."""
    form = _form(main)
    block = find(form, by_type("_quantity-breaks"))
    if items is None:
        if block:
            _remove(form, block)
        return
    if not block:
        block = copy.deepcopy(find(_form(CAPSULE["sections"]["main"]), by_type("_quantity-breaks")))
        _insert(form, block, after_type="_product-variant-picker")
    block["settings"]["label"] = label

    def fill(b, item):
        qty, pct, badge = item
        s = b["settings"]
        s["quantity"] = qty
        s["discount_type"] = "percentage" if pct else "none"
        s["discount_percentage"] = pct or 0
        s["badge"] = badge
        s["product_small_title"] = unit
        s["product_small_title_plural"] = unit_plural
        b["name"] = f"{qty} {unit if qty == 1 else unit_plural}"

    repeat(block, items, fill)


def set_cross_sell(main, handles=None, title=None, description=None):
    """Illustrated offer card placed under the buy button."""
    block = find(main, by_type("cross-sell"))
    if handles is None:
        if block:
            _remove(main, block)
        return
    if not block:
        block = copy.deepcopy(find(POMMEAU["sections"]["main"], by_type("cross-sell")))
        _insert(main, block, before_type="delivery-estimation")
    block["settings"].update(products=handles, title=title, description=f"<p>{description}</p>")


def set_main_accordions(main, items):
    acc = find(main, by_type("accordions"))
    repeat(acc, items, fill_accordion)


def set_slider(section, items, image_width=None):
    slider = find(section, by_type("slider"))
    repeat(slider, items, fill_card(image_width))


def set_cards_group(section, items, image_width=None):
    """'Dans ton coffret' style grid of cards: items (title ×qty, text, image)."""
    group = find(section, by_name("Éléments"))

    def fill(b, item):
        title, body, image = item
        imgs = [c for c in children(b) if c["type"] == "image"]
        tx = texts(b)
        if imgs and image:
            set_image(imgs[0], image, image_width)
        set_text(tx[0], f"<p><strong>{title}</strong></p>")
        set_text(tx[1], f"<p>{body}</p>")
        b["name"] = title.split("<")[0][:50]

    repeat(group, items, fill)


def set_steps(section, steps, image=None, image_width=None, advice=None):
    tl = find(section, by_type("timeline"))
    repeat(tl, list(enumerate(steps, 1)), fill_step)
    if image:
        set_image(find(section, by_type("image")), image, image_width)
    if advice is not None:
        # advice paragraph sits after the timeline, in the same column group
        col = next(g for g in find_all(section, by_type("group")) if any(c["type"] == "timeline" for c in children(g)))
        adv = [b for b in children(col) if b["type"] == "text"]
        if adv:
            set_text(adv[0], f"<p><strong>Le conseil Sunsoari</strong></p><p>{advice}</p>")


def set_reasons(section, items):
    """'Pourquoi ce coffret ?' text cards: items (title, text)."""
    group = [g for g in children(section) if g["type"] == "group"][0]

    def fill(b, item):
        set_text(texts(b)[0], f"<p><strong>{item[0]}</strong></p><p>{item[1]}</p>")
        b["name"] = item[0][:50]

    repeat(group, items, fill)


def set_faq(section, items):
    acc = find(section, by_type("accordions"))
    repeat(acc, items, fill_accordion)


def set_title(section, html):
    set_text(texts(section)[0], html)


def set_intro(section, html):
    tx = texts(section)
    if len(tx) > 1:
        set_text(tx[1], f"<p>{html}</p>")


def set_images_in_order(section, names, width=None):
    blocks = find_all(section, by_type("image"))
    for b, name in zip(blocks, names):
        if name:
            set_image(b, name, width)


def set_tabs(section, names):
    tabs = find(section, by_type("tabs"))
    for tab, name in zip(children(tabs), names):
        tab["settings"]["tab_name"] = name
        tab["name"] = name
        v = find(tab, by_type("video"))
        if v:
            v["settings"]["alt"] = name
