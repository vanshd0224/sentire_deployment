"""Portrait crops of the campaign scenes, four per fragrance, for the
home hero's dive through the notes.

usage: python scripts/hero-scenes.py <drive_dir> <out_dir>
"""
import sys
from pathlib import Path

from PIL import Image, ImageOps

SRC, OUT = Path(sys.argv[1]), Path(sys.argv[2])
OUT.mkdir(parents=True, exist_ok=True)

SCENES = {
    "mirai": ["mirai/Image 4.jpg", "mirai/Image 3.jpg", "mirai/image5.png", "mirai/mirai.png"],
    "herrlich": ["herrlich/image9.png", "herrlich/image1.png", "herrlich/image.png", "herrlich/2.png"],
    "white-oud": ["whiteoud/5.png", "whiteoud/2.png", "whiteoud/4.png", "whiteoud/7.png"],
    "seductive": ["seductive/4.png", "seductive/5.png", "seductive/image1.png", "seductive/image3.png"],
    "0809": ["0809/0809 AI 3.png", "0809/0809 ai 4.png", "0809/0809 ai 5.png", "0809/0809 AI 2.png"],
}

for key, files in SCENES.items():
    for i, rel in enumerate(files, 1):
        im = Image.open(SRC / rel).convert("RGB")
        im = ImageOps.fit(im, (480, 600), Image.LANCZOS, centering=(0.5, 0.45))
        out = OUT / f"{key}-scene-{i}.webp"
        im.save(out, "WEBP", quality=76, method=6)
        print(out.name, f"{out.stat().st_size // 1024} KB")
