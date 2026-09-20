"""Cut the studio bottle shots out of their white background.

The shots are on white with a soft floor reflection. A plain white key would
also eat the clear glass, so:
  - everything connected to the image border and near-white is background:
    it's converted colour-to-alpha (white -> transparent), which keeps the
    soft shadow and reflection as a faint, correctly coloured wash;
  - inside the bottle, clear glass (near-white) gets the same treatment so it
    reads as glass over any backdrop, while label, liquid and chrome
    (anything darker) stay fully opaque.

usage: python scripts/cutout-bottles.py <src_dir> <out_dir>
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

SRC, OUT = Path(sys.argv[1]), Path(sys.argv[2])
OUT.mkdir(parents=True, exist_ok=True)

# fragrance -> (label side, PC side)
SHOTS = {
    "white-oud": ("whiteoud/WHITE OUD 1.jpg", "whiteoud/WHITE OUD 4.jpg"),
    "0809": ("0809/0809 5.jpg", "0809/0809 4.jpg"),
    "seductive": ("seductive/SEDUCTIVE 6.jpg", "seductive/SEDUCTIVE 5.jpg"),
    "herrlich": ("herrlich/HERRLICH 1.jpg", "herrlich/HERRLICH 6.jpg"),
    "mirai": ("mirai/MIRAI 5.jpg", "mirai/MIRAI 3.jpg"),
}
HEIGHTS = {"xl": 1400, "lg": 900, "sm": 560}


def cut(path: Path) -> Image.Image:
    im = Image.open(path).convert("RGB")
    a = np.asarray(im).astype(np.float32) / 255.0
    # lift the paper: the studio white sits around 0.96-0.98
    a = np.clip(a / 0.965, 0, 1)
    lo = a.min(axis=2)

    near_white = lo >= 0.985
    lab, _ = ndimage.label(near_white)
    border = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
    outside = np.isin(lab, border[border > 0])

    # colour-to-alpha against white
    alpha = 1.0 - lo
    safe = np.maximum(alpha, 1e-4)[..., None]
    rgb = 1.0 - (1.0 - a) / safe

    # solid parts of the bottle stay solid
    solid = (~outside) & (lo < 0.9)
    solid = ndimage.binary_opening(solid, iterations=1)
    # the chrome cap is solid all through, highlights included: find the
    # bottle's silhouette and keep its top quarter (cap and collar) opaque
    inside = ndimage.binary_fill_holes(~outside)
    rows = np.where(inside.any(axis=1))[0]
    top, bottom = rows.min(), rows.max()
    cap_end = top + int(0.27 * (bottom - top))
    cap = inside.copy()
    cap[cap_end:] = False
    solid |= cap
    alpha = np.where(solid, 1.0, alpha)
    rgb = np.where(solid[..., None], a, rgb)

    # soften the floor wash so it doesn't read as a box
    alpha = np.where(outside, alpha * 0.85, alpha)

    out = np.dstack([np.clip(rgb, 0, 1), np.clip(alpha, 0, 1)])
    img = Image.fromarray((out * 255).astype(np.uint8), "RGBA")

    # crop to the bottle (+ its reflection), with a margin
    ys, xs = np.where(alpha > 0.06)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    m = int(0.04 * (y1 - y0))
    return img.crop((max(0, x0 - m), max(0, y0 - m), min(img.width, x1 + m), min(img.height, y1 + m)))


for key, (front, back) in SHOTS.items():
    for side, rel in (("front", front), ("back", back)):
        img = cut(SRC / rel)
        for tag, h in HEIGHTS.items():
            w = round(img.width * h / img.height)
            out = OUT / f"{key}-{side}-{tag}.webp"
            img.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=80, method=6)
            print(out.name, (w, h), f"{out.stat().st_size // 1024} KB")
