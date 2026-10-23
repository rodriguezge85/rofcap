"""Render public/og-card.png (1200x630) from the self-hosted Raleway files.

Uses the placeholder mark geometry; re-run after the approved mark replaces it.
Usage: python3 scripts/og-card.py
"""
import struct, zlib, io, os
from PIL import Image, ImageDraw, ImageFont

FONTS = 'node_modules/@fontsource/raleway/files/raleway-latin-{}.woff'


def woff_to_ttf(path):
    d = open(path, 'rb').read()
    _, flavor, _, n = struct.unpack('>4s4sIH', d[:14])
    tables = []
    for i in range(n):
        tag, off, clen, olen, csum = struct.unpack('>4sIIII', d[44 + 20 * i:64 + 20 * i])
        blob = d[off:off + clen]
        tables.append((tag, csum, zlib.decompress(blob) if clen != olen else blob))
    out = struct.pack('>4sHHHH', flavor, n, 0, 0, 0)
    pos = 12 + 16 * n
    body = b''
    for tag, csum, blob in sorted(tables):
        out += struct.pack('>4sIII', tag, csum, pos + len(body), len(blob))
        body += blob + b'\0' * (-len(blob) % 4)
    return io.BytesIO(out + body)


def font(name, size):
    return ImageFont.truetype(woff_to_ttf(FONTS.format(name)), size)


def tracked(draw, xy, text, f, fill, spacing):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=f, fill=fill)
        x += draw.textlength(ch, font=f) + spacing


W, H = 1200, 630
img = Image.new('RGB', (W, H), '#000000')
d = ImageDraw.Draw(img)

# placeholder mark on a solid field (never on a photograph)
cx, cy, r = 130, 120, 44
d.ellipse((cx - r, cy - r, cx + r, cy + r), outline='#FFFFFF', width=6)
d.polygon([(cx - 28, cy + 18), (cx, cy - 24), (cx + 28, cy + 18)], fill='#FFFFFF')
tracked(d, (200, 88), 'ROFCAP', font('800-normal', 40), '#FFFFFF', 5)
d.text((200, 140), 'Ring of Fire Capital Ventures Limited', font=font('500-normal', 22), fill='#CBD7E6')

d.text((80, 270), 'Seizing Seismic', font=font('800-normal', 84), fill='#FFFFFF')
d.text((80, 365), 'Opportunities', font=font('800-normal', 84), fill='#FFFFFF')
d.text((80, 500), 'Connecting Capital, Operators and Ideas', font=font('600-italic', 32), fill='#E2553C')
d.text((80, 545), 'across Asia Pacific & the Americas', font=font('600-italic', 32), fill='#E2553C')

os.makedirs('public', exist_ok=True)
img.save('public/og-card.png', optimize=True)
print('wrote public/og-card.png')
