"""Extract Shopify theme file bodies from Claude session transcripts (JSONL)."""
import json, os, sys, glob
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "original")
def scan(obj, found):
    if isinstance(obj, dict):
        if "filename" in obj and isinstance(obj.get("body"), dict) and "content" in obj["body"]:
            found[obj["filename"]] = obj["body"]["content"]
        for v in obj.values(): scan(v, found)
    elif isinstance(obj, list):
        for v in obj: scan(v, found)
    elif isinstance(obj, str) and '"filename"' in obj and '"content"' in obj:
        try: scan(json.loads(obj), found)
        except Exception: pass
found = {}
for p in sys.argv[1:]:
    for line in open(p, encoding="utf-8"):
        try: scan(json.loads(line), found)
        except Exception: pass
for fn, c in found.items():
    path = os.path.join(OUT, fn); os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, "w", encoding="utf-8").write(c); print(fn, len(c))
