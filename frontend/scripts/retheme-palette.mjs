// One-off codemod: swaps the legacy gold/cream palette for the editorial palette.
// Usage: node scripts/retheme-palette.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("src");

const HEX = {
  // golds -> clay accent
  "#c89b5a": "#a4492e", "#d4af37": "#a4492e", "#c89a46": "#a4492e", "#be8f42": "#a4492e",
  "#b8863b": "#8a3b24", "#a97f43": "#8a3b24", "#b9863e": "#8a3b24", "#b88a48": "#8a3b24",
  "#e5c158": "#d9a08a", "#e2c48e": "#d9a08a", "#f7e7c4": "#efd8cc", "#c89b5a33": "#a4492e33",
  // brown-blacks -> ink
  "#0b0907": "#151412", "#14110d": "#151412", "#19140f": "#1c1b18", "#18130f": "#1c1b18",
  "#0d0906": "#151412", "#120e0a": "#151412", "#0a0705": "#121110", "#16120e": "#151412",
  "#120e0b": "#151412", "#1a120a": "#1c1b18", "#18130d": "#1c1b18", "#1e1e1e": "#1c1b18",
  // yellow creams -> paper
  "#f8f5f1": "#f4f2ee", "#faf8f5": "#f4f2ee", "#faf6f0": "#f4f2ee", "#fbf9f5": "#f4f2ee",
  "#fcf9f4": "#f7f5f2", "#f5f0e8": "#eeebe5", "#fdfbf7": "#f7f5f2", "#fcfbf9": "#f7f5f2",
  "#f6f2ec": "#eeebe5", "#faf7f2": "#f4f2ee", "#f4efe8": "#eeebe5", "#fcfaf7": "#f7f5f2",
  "#f8f4ec": "#f4f2ee", "#faf6ee": "#f4f2ee", "#f8f1de": "#eeebe5", "#fbf8f3": "#f4f2ee",
  "#f2ece2": "#e9e6e0", "#ece7de": "#e6e3dd", "#e5dfd5": "#dedad3",
};

const RGBA = [
  [/rgba\(\s*200\s*,\s*155\s*,\s*90\s*,/g, "rgba(164, 73, 46,"],
  [/rgba\(\s*212\s*,\s*175\s*,\s*55\s*,/g, "rgba(164, 73, 46,"],
  [/rgba\(\s*190\s*,\s*143\s*,\s*66\s*,/g, "rgba(138, 59, 36,"],
  [/rgba\(\s*201\s*,\s*158\s*,\s*80\s*,/g, "rgba(164, 73, 46,"],
  [/rgba\(\s*169\s*,\s*127\s*,\s*67\s*,/g, "rgba(138, 59, 36,"],
  [/rgba\(\s*184\s*,\s*134\s*,\s*59\s*,/g, "rgba(138, 59, 36,"],
  [/rgba\(\s*248\s*,\s*240\s*,\s*220\s*,/g, "rgba(244, 242, 238,"],
  [/rgba\(\s*25\s*,\s*20\s*,\s*15\s*,/g, "rgba(28, 27, 24,"],
  [/rgba\(\s*11\s*,\s*9\s*,\s*7\s*,/g, "rgba(21, 20, 18,"],
  [/rgba\(\s*10\s*,\s*7\s*,\s*5\s*,/g, "rgba(21, 20, 18,"],
];

const hexRe = new RegExp(Object.keys(HEX).map((h) => h.replace("#", "#")).join("|"), "gi");

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(tsx?|css)$/.test(entry.name)) rewrite(p);
  }
}

let changed = 0;
function rewrite(file) {
  const src = fs.readFileSync(file, "utf8");
  let out = src.replace(hexRe, (m) => HEX[m.toLowerCase()] ?? m);
  for (const [re, rep] of RGBA) out = out.replace(re, rep);
  if (out !== src) {
    fs.writeFileSync(file, out);
    changed++;
  }
}

walk(ROOT);
console.log(`retheme: updated ${changed} files`);
