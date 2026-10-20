"""Génère bilan-visage.html : Bilan Peau Visage, The Beauty Edit by Sunsoari.
Format B5 (176 × 250 mm), 4 pages, marges 15 / 12 / 18 / 18 mm (haut, ext., bas, int.).
Relancer : python3 build_bilan_visage.py
"""
from html import escape

def cb(label, sub=None):
    s = f'<div class="opt"><span class="cb"></span><span>{label}</span></div>'
    if sub:
        s += f'<div class="sub">{sub}</div>'
    return s

def line(items):
    return '<div class="ligne">' + "".join(cb(i) for i in items) + "</div>"

def cols(items, n):
    # Lecture de haut en bas dans chaque colonne.
    per = -(-len(items) // n)
    out = f'<div class="cols c{n}">'
    for i in range(n):
        out += "<div>" + "".join(cb(*x) if isinstance(x, tuple) else cb(x) for x in items[i * per:(i + 1) * per]) + "</div>"
    return out + "</div>"

def bloc(num, titre, extra=""):
    return f'<h2 class="bloc"><span class="num">{num}</span> · {titre}{extra}</h2><div class="sep"></div>'

def cat(t):
    return f'<h3 class="cat">{t}</h3>'

def label(t):
    return f'<p class="label">{t}</p>'

def lignes(n, large=False):
    return "".join(f'<div class="ll{" large" if large else ""}"></div>' for _ in range(n))

def encadre(t):
    return f'<div class="encadre">{t}</div>'

def actifs(items):
    # Une ligne par actif : case + nom + trois symboles à entourer (✓ toléré · ✕ irritation · ? à tester).
    per = -(-len(items) // 3)
    out = '<div class="cols c3">'
    for i in range(3):
        out += "<div>"
        for a in items[i * per:(i + 1) * per]:
            out += f'<div class="actif"><span class="cb"></span><span class="nom">{a}</span><span class="tol"><i>✓</i><i>✕</i><i>?</i></span></div>'
        out += "</div>"
    return out + "</div>"

def page(num, body, footer):
    return f'''<section class="page">
  <header class="head"><p class="h1">Mon Bilan Peau Visage</p><p class="h2">The Beauty Edit by Sunsoari</p></header>
  <div class="contenu">{body}</div>
  <footer class="pied">{footer}<span class="pnum">{num}</span></footer>
</section>'''

suite = lambda n: f'<div class="pied-ligne"></div><p class="suite">— Suite page {n} —</p>'

# PAGE 1 · Blocs 01 à 07
p1 = (
    bloc("01", "Mon âge")
    + '<div class="age"><span>Mon âge :</span><span class="age-l"></span><em>ans</em></div>'
    + bloc("02", "Mon phototype · échelle de Fitzpatrick")
    + cols([
        ("I · Peau très claire", "Brûle toujours · ne bronze presque jamais"),
        ("II · Peau claire", "Brûle facilement · bronze peu"),
        ("III · Peau beige", "Brûle parfois · bronze progressivement"),
        ("IV · Peau mate", "Brûle peu · bronze facilement"),
        ("V · Peau foncée", "Brûle rarement · bronze facilement"),
        ("VI · Peau très foncée", "Brûle très rarement · très pigmentée"),
    ], 2)
    + encadre("Toutes les carnations ont besoin d'une protection solaire")
    + bloc("03", "Mon type de peau")
    + line(["Normale", "Sèche", "Mixte", "Grasse", "Sensible", "Déshydratée", "Réactive"])
    + encadre("Pas sûre de ton type de peau ? Fais le diagnostic gratuit · sunsoari.fr/pages/mon-rituel")
    + bloc("04", "Mon teint")
    + line(["Terne · manque d'éclat", "Lumineux", "Uniforme", "Taches · irrégulier", "Rougeurs"])
    + bloc("05", "Mes préoccupations principales", ' <small>(3 max)</small>')
    + cols(["Taches pigmentaires", "Acné · boutons", "Pores dilatés", "Rides · ridules", "Manque d'éclat",
            "Points noirs", "Marques post-acné", "Excès de sébum", "Fermeté", "Manque d'hydratation",
            "Grain de peau irrégulier", "Rougeurs", "Couperose", "Cernes", "Poches sous les yeux"], 3)
    + bloc("06", "Ma peau selon les saisons")
    + line(["Plus sèche en hiver", "Plus grasse en été", "Réactive au printemps", "Réactive en automne",
            "Réactive aux changements de saison", "Pas de variation notable"])
    + bloc("07", "Mon environnement & mode de vie")
    + cols(["Ville · pollution", "Stress élevé", "Exposition au soleil fréquente",
            "Campagne · air pur", "Sport régulier", "Écrans prolongés",
            "Tabac", "Alimentation variée", "Sommeil court"], 3)
)

# PAGE 2 · Blocs 08 à 11
p2 = (
    bloc("08", "Mes antécédents de peau")
    + line(["Eczéma", "Psoriasis", "Rosacée", "Dermatite", "Hyperpigmentation", "Aucun"])
    + label("Précisions (diagnostic posé par un ou une médecin, traitements…) :") + lignes(2)
    + bloc("09", "Ma santé hormonale & mes traitements")
    + line(["Contraception hormonale", "Grossesse · allaitement", "Ménopause · périménopause", "Traitement médical en cours", "Aucun"])
    + encadre("Enceinte, allaitante ou sous traitement ? Demande conseil à ton ou ta médecin avant un nouvel actif")
    + bloc("10", "Mes allergies & ingrédients à éviter")
    + label("Ingrédients qui m'ont déjà fait réagir :") + lignes(2, True)
    + label("Ingrédients que j'évite par choix :") + lignes(1, True)
    + bloc("11", "Ma routine actuelle")
    + label("Coche les étapes que tu pratiques")
    + cat("Matin") + cols(["Nettoyage", "Tonique · essence", "Sérum", "Contour des yeux",
                           "Hydratant · crème", "Huile", "Protection solaire", "Maquillage"], 2)
    + cat("Soir") + cols(["Démaquillage", "Double nettoyage", "Tonique · essence", "Sérum", "Contour des yeux",
                          "Crème de nuit", "Huile · baume", "Masque de nuit", "Patch boutons"], 2)
    + cat("Chaque semaine") + cols(["Exfoliant · gommage", "Sérum concentré · ampoule", "Masque", "Gua sha · massage"], 2)
)

# PAGE 3 · Blocs 12 à 15
p3 = (
    bloc("12", "Mes compléments alimentaires")
    + cols(["Collagène", "Vitamine C", "Vitamine E", "Zinc", "Oméga-3", "Probiotiques", "Acide hyaluronique", "Aucun"], 4)
    +     bloc("13", "Mes textures préférées · par produit")
    + cat("Nettoyant") + cols(["Gel", "Mousse", "Lait", "Huile · baume", "Eau micellaire"], 2)
    + cat("Sérum") + cols(["Fluide aqueux", "Gel", "Sérum huileux", "Ampoule · émulsion"], 2)
    + cat("Hydratant") + cols(["Gel-crème léger", "Crème légère", "Crème riche", "Baume · lotion"], 2)
    + cat("Huile visage") + cols(["Huile sèche", "Huile nourrissante", "Huile légère", "Je n'utilise pas d'huile"], 2)
    + cat("Masque") + cols(["Crème à rincer", "Argile", "Masque en tissu", "Masque de nuit · peel-off"], 2)
    + bloc("14", "Mon budget beauté mensuel · visage")
    + line(["Moins de 30 €", "30 – 60 €", "60 – 100 €", "100 – 150 €", "Plus de 150 €"])
    + bloc("15", "Mes soins visage en institut ou en cabinet")
    + label("Fréquence")
    + line(["Chaque semaine", "1 fois par mois", "1 fois par trimestre", "De temps en temps", "Jamais"])
    + label("Soins déjà pratiqués")
    + cols(["Soin hydratant", "Soin anti-âge", "Soin éclat", "Soin purifiant", "Peeling",
            "Drainage · massage", "LED", "Mésothérapie (acte médical)", "Laser (acte médical)", "Aucun pour l'instant"], 2)
    + label("Budget par séance")
    + line(["Moins de 50 €", "50 – 100 €", "100 – 200 €", "Plus de 200 €"])
)

# PAGE 4 · Blocs 16 et 17
p4 = (
    bloc("16", "Mon historique des actifs")
    + label("Coche les actifs déjà utilisés, puis entoure ta tolérance")
    + encadre("✓ bien toléré · ✕ irritation ou réaction · ? à tester")
    + cat("Antioxydants & vitamines")
    + actifs(["Vitamine C", "Vitamine E", "Panthénol · B5", "Acide férulique", "Coenzyme Q10", "Caféine", "Thé vert · EGCG", "Glutathion"])
    + cat("Rétinoïdes & fermeté")
    + actifs(["Rétinyl esters", "Rétinol", "Rétinal", "Trétinoïne (sur ordonnance)", "Bakuchiol", "Peptides", "PDRN"])
    + cat("Exfoliants & acides")
    + actifs(["AHA · glycolique", "BHA · salicylique", "PHA · gluconolactone", "Acide lactique", "Acide azélaïque"])
    + cat("Taches & uniformité du teint")
    + actifs(["Alpha-arbutine", "Acide tranexamique", "Acide kojique", "Réglisse", "Niacinamide", "Zinc"])
    + cat("Hydratation & barrière")
    + actifs(["Acide hyaluronique", "Squalane", "Céramides"])
    + cat("Apaisants")
    + actifs(["Centella asiatica", "Madécassoside", "Bisabolol", "Aloe vera", "Propolis", "Mucine d'escargot", "Galactomyces"])
    + label("Autres actifs :") + lignes(1)
    + bloc("17", "Mes objectifs peau")
    + label("Dans 3 mois, j'aimerais que ma peau :") + lignes(3, True)
)
fin = '<div class="citation">Ce bilan est ton point de départ. Reviens le mettre à jour au fil des saisons.</div><div class="pied-ligne"></div>'

CSS = """
@page { size: 176mm 250mm; margin: 0; }
:root { --fond:#F8F8F6; --encre:#1C2028; --gris:#6A7080; --discret:#9A8888; --rose:#EED4D8; --rose-clair:#F6E4E8;
        --sep:#D0B8B4; --ligne:#E0D8D4; --rose-titre:#B88898; --rose-fonce:#7A2838; --pnum:#9A9898; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #E9E6E2; }
body { font-family: 'Nunito', 'Segoe UI', Arial, sans-serif; font-weight: 300; color: var(--encre);
       -webkit-print-color-adjust: exact; print-color-adjust: exact; }
/* Une page = exactement 176 × 250 mm. Marges intégrées ici, pas dans @page. */
.page { width: 176mm; height: 250mm; padding: 15mm 12mm 18mm 18mm; background: var(--fond); position: relative;
        overflow: hidden; margin: 10mm auto; display: flex; flex-direction: column; break-after: page; }
.page:nth-of-type(even) { padding-left: 12mm; padding-right: 18mm; }  /* reliure à droite sur les pages paires */
@media print { html, body { background: var(--fond); } .page { margin: 0; } }
.head { background: var(--rose); border-radius: 4px; padding: 3mm 5mm; height: 14mm; margin-bottom: 5mm; flex: none; }
.h1 { font-family: 'Libre Baskerville', Georgia, serif; font-size: 13pt; line-height: 1.15; }
.h2 { font-size: 8pt; color: var(--rose-fonce); letter-spacing: .04em; margin-top: .8mm; }
.contenu { flex: 1; min-height: 0; }
.bloc { font-family: 'Libre Baskerville', Georgia, serif; font-weight: 400; font-size: 10pt; margin-top: 3mm; line-height: 1.2; }
.contenu > .bloc:first-child { margin-top: 0; }
.bloc small { font-family: 'Nunito', sans-serif; font-size: 7.5pt; color: #9A7080; }
.sep { height: .5px; background: var(--sep); margin: 1.2mm 0 2mm; }
.cat { font-family: 'Libre Baskerville', Georgia, serif; font-style: italic; font-weight: 400; font-size: 8.5pt; color: var(--rose-titre);
       border-bottom: .3px solid var(--rose); padding-bottom: .8mm; margin: 2mm 0 1.5mm; }
.label { font-size: 8pt; color: var(--gris); margin: 1.2mm 0 1mm; }
.opt { display: flex; align-items: center; gap: 1.5mm; font-size: 8pt; line-height: 1.25; }
.cb { width: 3mm; height: 3mm; border: .5pt solid var(--sep); border-radius: .8px; flex: none; }
.sub { font-size: 7pt; font-style: italic; color: var(--discret); padding-left: 4.5mm; margin-top: -.6mm; }
.ligne { display: flex; flex-wrap: wrap; gap: 1.6mm 4mm; margin-bottom: 1mm; }
.cols { display: grid; margin-bottom: 1mm; }
.cols > div { display: flex; flex-direction: column; gap: 1.6mm; }
.c2 { grid-template-columns: 1fr 1fr; column-gap: 5mm; }
.c3 { grid-template-columns: repeat(3, 1fr); column-gap: 3mm; }
.c4 { grid-template-columns: repeat(4, 1fr); column-gap: 2mm; }
.encadre { background: var(--rose-clair); border-radius: 3px; padding: 1.5mm 3mm; text-align: center; font-size: 7.5pt;
           color: var(--rose-fonce); margin: 2mm 0 0; }
.ll { height: .5px; background: var(--ligne); margin-top: 5mm; }
.ll.large { margin-top: 6mm; }
.age { display: flex; align-items: baseline; gap: 2mm; font-size: 8.5pt; }
.age-l { width: 22mm; border-bottom: .5px solid #C8B8B4; }
.age em { font-size: 7.5pt; color: #C0B8B4; }
.actif { display: flex; align-items: center; gap: 1.5mm; font-size: 7.5pt; line-height: 1.2; }
.actif .nom { flex: 1; min-width: 0; }
.tol { display: flex; gap: .8mm; flex: none; }
.tol i { font-style: normal; font-size: 6pt; color: var(--discret); width: 3.4mm; height: 3.4mm; border: .3px solid var(--ligne);
         border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.page:last-of-type .cols > div { gap: 1.2mm; }
.pied { flex: none; position: relative; padding-top: 2mm; }
.pied-ligne { height: .5px; background: var(--rose); }
.suite { font-family: 'Libre Baskerville', Georgia, serif; font-style: italic; font-size: 8pt; color: var(--rose-titre); text-align: center; margin-top: 1.5mm; }
.citation { font-family: 'Libre Baskerville', Georgia, serif; font-style: italic; font-size: 7.5pt; color: var(--rose-fonce);
            background: var(--rose-clair); border-radius: 3px; padding: 1.5mm 3mm; text-align: center; margin-bottom: 2mm; }
.pnum { position: absolute; right: 0; bottom: -10mm; font-size: 7.5pt; color: var(--pnum); }
"""

html = f"""<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8">
<title>Bilan Peau Visage · The Beauty Edit by Sunsoari</title>
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@0;1&family=Nunito:wght@300&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body>
{page(3, p1, suite(4))}
{page(4, p2, suite(5))}
{page(5, p3, suite(6))}
{page(6, p4, fin)}
</body></html>"""

open("bilan-visage.html", "w", encoding="utf-8").write(html)
print("bilan-visage.html généré")
