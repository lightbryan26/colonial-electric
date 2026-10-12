# usage: python3 blind.py <imgA> <imgB> <out.png>  -> side-by-side, labelled only "A" and "B", same width
import sys
from PIL import Image, ImageDraw, ImageFont
a,b,out=sys.argv[1:4]; W=1200
def fit(p):
    im=Image.open(p).convert('RGB'); h=int(im.height*W/im.width); return im.resize((W,h))
A,B=fit(a),fit(b)
# match aspect: crop the taller-relative image from the top to the other's height
if A.height>B.height*1.15: A=A.crop((0,0,W,B.height))
elif B.height>A.height*1.15: B=B.crop((0,0,W,A.height)); H=max(A.height,B.height)+80
c=Image.new('RGB',(W*2+60,H),(128,128,128)); d=ImageDraw.Draw(c)
try: f=ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc',56)
except: f=ImageFont.load_default()
d.text((20,10),'A',fill=(0,0,0),font=f); d.text((W+80,10),'B',fill=(0,0,0),font=f)
c.paste(A,(20,80)); c.paste(B,(W+40,80)); c.save(out); print(out, c.size)
