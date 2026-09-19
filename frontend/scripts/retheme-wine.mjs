// Accent pass: the olive/chartreuse accent gives way to the SENTIRE logo's
// own wine (#630a1a). Deep wine carries the accent on light grounds; a blush
// from the same family replaces it on black, where wine would disappear.
// Usage: node scripts/retheme-wine.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("src");

const HEX = {
  "#5f6516": "#6b1422", // accent on light
  "#4a4f10": "#4f0e19", // accent, pressed/dark
  "#cdd43f": "#e7bcc3", // accent on dark (was the case print colour)
  "#eef0c9": "#f4e6e8", // accent tint
};

const RGBA = [
  [/rgba\(\s*95\s*,\s*101\s*,\s*22\s*,/g, "rgba(107, 20, 34,"],
  [/rgba\(\s*74\s*,\s*79\s*,\s*16\s*,/g, "rgba(79, 14, 25,"],
  [/rgba\(\s*205\s*,\s*212\s*,\s*63\s*,/g, "rgba(231, 188, 195,"],
];

const hexRe = new RegExp(Object.keys(HEX).join("|"), "gi");
let changed = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(tsx?|css)$/.test(entry.name)) {
      const src = fs.readFileSync(p, "utf8");
      let out = src.replace(hexRe, (m) => HEX[m.toLowerCase()] ?? m);
      for (const [re, rep] of RGBA) out = out.replace(re, rep);
      if (out !== src) {
        fs.writeFileSync(p, out);
        changed++;
      }
    }
  }
}

walk(ROOT);
console.log(`retheme-wine: updated ${changed} files`);
