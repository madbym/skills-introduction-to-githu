"""Helpers to read, edit and write FullStack theme JSON templates."""
import copy
import json
import os
import random
import string

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REMOTE = os.path.join(ROOT, "remote")
OUT = os.path.join(ROOT, "theme")


def img(name):
    """Theme setting value for an image stored in Shopify > Contenu > Fichiers."""
    return f"shopify://shop_images/{name}"


def load(rel):
    s = open(os.path.join(REMOTE, rel), encoding="utf-8").read()
    if s.lstrip().startswith("/*"):
        s = s[s.index("*/") + 2 :]
    return json.loads(s)


def save(rel, data):
    path = os.path.join(OUT, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    return path


_rng = random.Random(42)


def uid(prefix):
    return prefix + "_" + "".join(_rng.choice(string.ascii_letters + string.digits) for _ in range(6))


def children(node):
    return [node["blocks"][k] for k in node.get("block_order", list(node.get("blocks", {})))]


def walk(node):
    """Yield every block below a section/block (depth first, in display order)."""
    for child in children(node):
        yield child
        yield from walk(child)


def find(node, pred):
    for b in walk(node):
        if pred(b):
            return b
    return None


def find_all(node, pred):
    return [b for b in walk(node) if pred(b)]


def by_type(t):
    return lambda b: b.get("type") == t


def by_name(n):
    return lambda b: b.get("name") == n


def texts(node):
    return [b for b in children(node) if b["type"] == "text"]


def set_text(block, html):
    block.setdefault("settings", {})["text"] = html


def set_image(block, name, width=None):
    s = block.setdefault("settings", {})
    s["image"] = img(name)
    if width:
        s["image_width_desktop"] = width
        s["image_width_mobile"] = width


def repeat(container, items, fill):
    """Replace the children of `container` with len(items) copies of its first child.

    `fill(block, item)` customises each copy.
    """
    proto = children(container)[0]
    container["blocks"] = {}
    container["block_order"] = []
    for item in items:
        b = copy.deepcopy(proto)
        _reid(b)
        fill(b, item)
        k = uid(b["type"].strip("_").replace("-", "_"))
        container["blocks"][k] = b
        container["block_order"].append(k)


def _reid(block):
    if "blocks" not in block:
        return
    new, order = {}, []
    for k in block.get("block_order", list(block["blocks"])):
        child = block["blocks"][k]
        _reid(child)
        nk = k if k in ("title", "product-card") or child.get("static") else uid(child["type"].strip("_").replace("-", "_"))
        new[nk] = child
        order.append(nk)
    block["blocks"], block["block_order"] = new, order


def fill_card(image_width=None):
    """Fill a card/slide made of [image, title text, body text]."""

    def f(b, item):
        title, body, image = item[0], item[1], item[2] if len(item) > 2 else None
        imgs = [c for c in children(b) if c["type"] == "image"]
        tx = texts(b)
        if imgs:
            if image:
                set_image(imgs[0], image, image_width)
        set_text(tx[0], f"<p><strong>{title}</strong></p>")
        if len(tx) > 1:
            set_text(tx[1], f"<p>{body}</p>")
        b["name"] = strip_tags(title)[:50]

    return f


def fill_step(b, item):
    n, body = item
    tx = texts(b)
    set_text(tx[0], f"<p><strong>Étape {n}</strong></p>")
    set_text(tx[1], f"<p>{body}</p>")
    b["name"] = f"Étape {n}"


def fill_accordion(b, item):
    heading, html = item
    b["settings"]["heading"] = heading
    set_text(texts(b)[0], html if html.startswith("<") else f"<p>{html}</p>")


def strip_tags(s):
    import re

    return re.sub(r"<[^>]+>", "", s)


def section_title(section, html):
    t = texts(section)[0] if texts(section) else find(section, by_type("text"))
    set_text(t, html)


def clone(template):
    return copy.deepcopy(template)
