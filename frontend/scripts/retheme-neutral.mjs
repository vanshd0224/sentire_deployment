// Second palette pass: drops the warm brown-blacks, beige creams and the
// terracotta accent for the Discovery Set case's own palette — neutral black,
// clean off-white, studio grey, and an olive/chartreuse accent.
// Usage: node scripts/retheme-neutral.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("src");

const HEX = {
  // accent: terracotta -> deep olive (text/fills on light), light -> chartreuse print
  "#a4492e": "#5f6516",
  "#8a3b24": "#4a4f10",
  "#d9a08a": "#cdd43f",
  "#efd8cc": "#eef0c9",
  // brown-blacks -> neutral blacks
  "#151412": "#111111",
  "#1c1b18": "#161616",
  "#121110": "#0e0e0e",
  "#1c1917": "#161616",
  "#0d0a08": "#0c0c0c",
  "#0a0705": "#0a0a0a",
  "#14110d": "#111111",
  "#21150f": "#161616",
  "#1c1814": "#161616",
  "#140e0a": "#111111",
  "#2c2724": "#2a2a2a",
  // brownish greys -> neutral greys
  "#57534c": "#555555",
  "#57534e": "#555555",
  "#8c877e": "#8a8a8a",
  "#78716c": "#767676",
  "#a8a29e": "#a3a3a3",
  "#49414a": "#4a4a4a",
  // beige creams -> neutral off-whites
  "#f4f2ee": "#f2f2f0",
  "#f7f5f2": "#f7f7f5",
  "#eeebe5": "#e9e9e6",
  "#e9e6e0": "#e6e6e3",
  "#e6e3dd": "#e2e2df",
  "#dedad3": "#dadad6",
  "#eae7e1": "#e8e8e5",
  "#faf5ee": "#f5f5f3",
  "#f5ede2": "#efefec",
  "#f4ece1": "#efefec",
  "#e5dccd": "#dedede",
  "#e2d8c9": "#dcdcdc",
  "#f0e8dc": "#ececea",
  "#e6dcce": "#dedede",
  "#f3ece0": "#eeeeec",
  "#e8dec8": "#e5e5e2",
  "#fefdfb": "#fbfbfa",
  "#fdfbf8": "#fbfbfa",
  "#faf7f7": "#f5f5f3",
  "#f5e3cd": "#f2f2f0",
  "#846124": "#4a4f10",
  "#966127": "#4a4f10",
  "#ba8844": "#5f6516",
};

const RGBA = [
  [/rgba\(\s*164\s*,\s*73\s*,\s*46\s*,/g, "rgba(95, 101, 22,"],
  [/rgba\(\s*138\s*,\s*59\s*,\s*36\s*,/g, "rgba(74, 79, 16,"],
  [/rgba\(\s*28\s*,\s*27\s*,\s*24\s*,/g, "rgba(22, 22, 22,"],
  [/rgba\(\s*21\s*,\s*20\s*,\s*18\s*,/g, "rgba(17, 17, 17,"],
  [/rgba\(\s*244\s*,\s*242\s*,\s*238\s*,/g, "rgba(242, 242, 240,"],
  [/rgba\(\s*7\s*,\s*5\s*,\s*3\s*,/g, "rgba(8, 8, 8,"],
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
console.log(`retheme-neutral: updated ${changed} files`);
