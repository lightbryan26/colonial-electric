# usage: python3 blind_full.py <imgA> <imgB> <out.jpg> [width=900]
# Whole-page side-by-side, labelled only "A" and "B". Both scaled to the same width; the shorter one is padded
# (never cropped) so the critic sees each page's full length.
import sys
from PIL import Image, ImageDraw, ImageFont
a, b, out = sys.argv[1:4]; W = int(sys.argv[4]) if len(sys.argv) > 4 else 900
def fit(p):
    im = Image.open(p).convert('RGB'); return im.resize((W, int(im.height * W / im.width)))
A, B = fit(a), fit(b)
H = max(A.height, B.height) + 80
c = Image.new('RGB', (W * 2 + 60, H), (128, 128, 128)); d = ImageDraw.Draw(c)
f = None
for fp in ('/System/Library/Fonts/Helvetica.ttc', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'):
    try: f = ImageFont.truetype(fp, 56); break
    except Exception: pass
if f is None: f = ImageFont.load_default(size=56)
d.text((20, 10), 'A', fill=(0, 0, 0), font=f); d.text((W + 80, 10), 'B', fill=(0, 0, 0), font=f)
c.paste(A, (20, 80)); c.paste(B, (W + 40, 80)); c.save(out, quality=85); print(out, c.size)
