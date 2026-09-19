"""Replace substring attribute selectors ([class*=...]) with plain classes.

Selectors like `[class*="bg-[#111111]"] [class*="text-[#5f6516]"]` land in
the browser's universal rule bucket, so every element is string-scanned on
every style recalculation. On a phone that turned scrolling into 2-3 second
stalls. This moves the same decisions into the markup:

  - accent colour     -> text/border use var(--accent); dark containers get
                         `on-dark`, which switches --accent to the print colour
  - small type floor  -> Tailwind's own `max-sm:text-[12px]` next to 8-11.5px sizes
  - wide tracking     -> the tracking value itself is rewritten
  - bubble radii      -> the radius value itself is rewritten

usage: python scripts/flatten-attr-selectors.py   (from frontend/)
"""
import re
from pathlib import Path

SRC = Path("src")
changed = 0

TRACK = re.compile(r"(?<=[\s\"'`:])tracking-(?:\[0\.(?:18|19|2\d?|3\d?)em\]|widest)(?=[\s\"'`])")
ROUND = re.compile(r"(?<=[\s\"'`:])rounded-(?:2xl|3xl|xl|\[24px\])(?=[\s\"'`])")
SMALL = re.compile(r"(?<=[\s\"'`])text-\[(?:8|8\.5|9|9\.5|10|10\.5|11|11\.5)px\](?=[\s\"'`])")
ACCENT_TEXT = re.compile(r"(?<![\w-])text-\[#5f6516\]")
ACCENT_BORDER = re.compile(r"(?<![\w-])border-\[#5f6516\]")
DARK_BG = re.compile(r"(?<=[\s\"'`])bg-(?:\[#(?:111111|161616|0e0e0e|0c0c0c|0a0a0a)\]|ink|black)(?:/(?:9\d|100))?(?=[\s\"'`])")
CLASS_STRING = re.compile(r"(className=)(\"[^\"]*\"|\{`[^`]*`\})")


def fix_class_string(cls: str) -> str:
    cls = TRACK.sub("tracking-[0.06em]", cls)
    cls = ROUND.sub("rounded-[4px]", cls)
    if SMALL.search(cls) and "max-sm:text-[12px]" not in cls:
        cls = SMALL.sub(lambda m: m.group(0) + " max-sm:text-[12px]", cls, count=1)
    cls = ACCENT_TEXT.sub("text-[color:var(--accent)]", cls)
    cls = ACCENT_BORDER.sub("border-[color:var(--accent)]", cls)
    if DARK_BG.search(cls) and "on-dark" not in cls:
        cls = '"on-dark ' + cls[1:] if cls.startswith('"') else cls.replace("{`", "{`on-dark ", 1)
    return cls


for path in SRC.rglob("*.tsx"):
    text = path.read_text(encoding="utf8")
    new = CLASS_STRING.sub(lambda m: m.group(1) + fix_class_string(m.group(2)), text)
    if new != text:
        path.write_text(new, encoding="utf8")
        changed += 1

# ── stylesheet: drop the attribute-selector rules, add cheap replacements ──
css_path = SRC / "index.css"
css = css_path.read_text(encoding="utf8")


def drop_rules_with(css: str, needle: str) -> str:
    out, pos = [], 0
    for m in re.finditer(r"([^{}]*)\{([^{}]*)\}", css):
        if needle in m.group(1):
            out.append(css[pos : m.start()])
            pos = m.end()
    out.append(css[pos:])
    return "".join(out)


css = drop_rules_with(css, "[class")
# Empty @media shells left behind by removed inner rules
css = re.sub(r"@media[^{]*\{\s*\}", "", css)
css += """

/* ── Accent without attribute selectors ─────────────────────────────────
   Olive on light grounds; any dark container carries `on-dark`, which
   swaps the accent to the case's print colour for everything inside it. */
:root {
  --accent: #5f6516;
}

.on-dark {
  --accent: #cdd43f;
  --color-clay: #cdd43f;
}

.font-mono.uppercase {
  font-family: var(--font-sans);
  font-stretch: 115%;
  font-weight: 600;
  letter-spacing: 0.08em;
}
"""
css_path.write_text(css, encoding="utf8")
print(f"components updated: {changed}; attribute selectors left: {css.count('[class')}")
