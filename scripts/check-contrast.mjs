import { readFileSync } from 'node:fs';

const { color } = JSON.parse(readFileSync('design/tokens.json', 'utf8'));

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(color[a]), lum(color[b])].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// [foreground, background, minimum ratio]
const pairs = [
  ['ink', 'bg', 4.5], ['ink', 'card', 4.5], ['strong', 'card', 4.5], ['muted', 'card', 4.5],
  ['muted', 'bg', 4.5], ['navy', 'card', 4.5], ['navy', 'bg', 4.5], ['navy-700', 'card', 4.5],
  ['white', 'obsidian', 4.5], ['lava', 'obsidian', 3], ['on-dark-body', 'navy-900', 4.5],
  ['on-dark-muted', 'navy-900', 4.5], ['lava-700', 'lava-50', 4.5],
];

let failed = false;
for (const [fg, bg, min] of pairs) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed = true;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${fg} on ${bg}: ${r.toFixed(2)}:1 (min ${min})`);
}
process.exit(failed ? 1 : 0);
