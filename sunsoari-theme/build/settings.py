"""Global look: Sunsoari palette (charte graphique V1), Montserrat, rounded corners."""
import os

from lib import REMOTE, load, save

# Charte graphique Sunsoari V1
INDIGO = "#032B59"      # signature: text, titles, buttons (never a large flat area)
ARDOISE = "#7591AA"     # bleu ardoise
BRUME = "#C4D3E4"       # bleu doux clair / bleu brume
SABLE = "#E6DED1"       # crème sablé
COQUILLE = "#EEEBE7"    # blanc coquille
BLANC_CASSE = "#FAF8F5"  # page background, lighter than coquille
WHITE = "#FFFFFF"


def scheme(bg, fg, btn_bg, btn_fg, border, soft, accent=None):
    """All keys used by FullStack colour schemes."""
    accent = accent or fg
    return {
        "background": bg,
        "background_gradient": "",
        "foreground": fg,
        "border": border,
        "stars_icons_color": accent,
        "primary_button_background": btn_bg,
        "primary_button_text": btn_fg,
        "primary_button_border": btn_bg,
        "secondary_button_background": bg,
        "secondary_button_text": fg,
        "secondary_button_border": fg,
        "primary_badge_background": btn_bg,
        "primary_badge_text": btn_fg,
        "primary_badge_border": btn_bg,
        "secondary_badge_background": soft,
        "secondary_badge_text": fg,
        "secondary_badge_border": soft,
        "input_background": WHITE if bg != WHITE else COQUILLE,
        "input_text_color": fg,
        "input_border_color": border,
        "selected_input_background": soft,
        "selected_input_text_color": fg,
        "selected_input_border_color": fg,
        "variant_background_color": WHITE if bg != WHITE else COQUILLE,
        "variant_text_color": fg,
        "variant_border_color": border,
        "selected_variant_background_color": soft,
        "selected_variant_text_color": fg,
        "selected_variant_border_color": fg,
        "tab_background_color": soft,
        "tab_text_color": fg,
        "tab_border_color": soft,
        "selected_tab_background_color": fg,
        "selected_tab_text_color": bg,
        "selected_tab_border_color": fg,
    }


SCHEMES = {
    # 1 · default page: blanc cassé + indigo
    "scheme-1": scheme(BLANC_CASSE, INDIGO, INDIGO, WHITE, BRUME, COQUILLE, ARDOISE),
    # 2 · crème sablé sections
    "scheme-2": scheme(SABLE, INDIGO, INDIGO, WHITE, "#D8CDBB", COQUILLE, ARDOISE),
    # 3 · bleu brume sections
    "scheme-3": scheme(BRUME, INDIGO, INDIGO, WHITE, "#AFC2D8", COQUILLE, INDIGO),
    # sale badges: bleu ardoise
    "scheme-569beabf-ba81-4f8d-8567-f8c2cbc96316": scheme(ARDOISE, WHITE, WHITE, INDIGO, ARDOISE, BRUME, WHITE),
    # cards / offers: blanc coquille
    "scheme-8c66df20-7d2d-48fc-9064-92a4351ecaa7": scheme(COQUILLE, INDIGO, INDIGO, WHITE, "#DCD6CE", WHITE, ARDOISE),
    # dark accent: bleu ardoise with cream text
    "scheme-83622e65-c031-4b6f-b557-1bf8a292650e": scheme(ARDOISE, COQUILLE, COQUILLE, INDIGO, "#8FA7BC", BRUME, COQUILLE),
}


def build():
    data = load("config/settings_data.json")
    cur = data["current"]
    for key, values in SCHEMES.items():
        cur["color_schemes"][key]["settings"].update(values)

    # Montserrat everywhere (reference document), clean sizes for mobile.
    for key in ("type_heading_font", "type_subheading_font", "type_primary_font"):
        cur[key] = "montserrat_n5"
    cur["type_body_font"] = "montserrat_n4"
    cur["font_from"] = "shopify"
    cur.update(
        type_size_h1="56",
        type_size_h2="40",
        type_size_h3="32",
        type_size_h4="24",
        type_size_paragraph="15",
        type_size_paragraph_mobile="14",
        button_primary_font_weight=500,
        # Thin borders + rounded corners (Gisou / Hello Klean)
        general_radius="custom",
        card_border_radius=20,
        button_border_radius=30,
        button_secondary_border_radius=30,
        badge_border_radius=30,
        inputs_border_radius=14,
        container_border_width=1,
        container_borders_thickness=1,
        # Links to the real Sunsoari accounts
        instagram_url="https://www.instagram.com/sunsoari/",
    )
    path = save("config/settings_data.json", data)
    # Shopify only accepts this file with its original header comment.
    raw = open(os.path.join(REMOTE, "config/settings_data.json"), encoding="utf-8").read()
    body = open(path, encoding="utf-8").read()
    open(path, "w", encoding="utf-8").write(raw[: raw.index("*/") + 2] + "\n" + body)


if __name__ == "__main__":
    build()
    print("config/settings_data.json")
