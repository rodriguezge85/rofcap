// Runs against ./dist (npm run build first). Covers TEST_PLAN T-01..T-04, T-06, T-09, T-12, T-15, T-16, T-17.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import axe from 'axe-core';
import { site } from '../src/content/site.ts';

const html = readFileSync('dist/index.html', 'utf8');
const dom = new JSDOM(html, { runScripts: 'outside-only' });
const doc = dom.window.document;
const text = (el) => el.textContent.replace(/\s+/g, ' ').trim();
const plain = (s) => s.replaceAll('**', '');

test('T-01 hero copy matches the copy deck', () => {
  assert.equal(text(doc.querySelector('h1')), site.hero.title);
  assert.equal(text(doc.querySelector('.hero-sub')), site.hero.subtitle);
});

test('T-02 firm statement paragraphs and bold runs match', () => {
  const paras = [...doc.querySelectorAll('.statement p')];
  assert.equal(paras.length, 4);
  paras.forEach((p, i) => {
    assert.equal(text(p), plain(site.statement[i]));
    const bold = [...site.statement[i].matchAll(/\*\*(.+?)\*\*/g)].map((m) => m[1]);
    assert.deepEqual([...p.querySelectorAll('strong')].map(text), bold);
  });
});

test('T-03 legal entity and address present', () => {
  const body = text(doc.body);
  assert.ok(body.includes('Ring of Fire Capital Ventures Limited'));
  assert.ok(body.includes('22nd Floor, Tai Yau Building'));
  assert.ok(body.includes('181 Johnston Road'));
  assert.ok(body.includes('Wan Chai, Hong Kong SAR'));
  assert.ok(body.includes('Not a Solicitation'));
});

test('T-04 external links are safe and point to LinkedIn', () => {
  const ext = [...doc.querySelectorAll('a[href^="http"]')];
  assert.ok(ext.length >= 2);
  for (const a of ext) {
    assert.equal(a.href, 'https://www.linkedin.com/company/rofcap/');
    assert.equal(a.target, '_blank');
    assert.match(a.rel, /noopener/);
    assert.match(a.rel, /noreferrer/);
  }
});

test('T-06 no third-party requests or fonts', () => {
  assert.doesNotMatch(html, /fonts\.(googleapis|gstatic)\.com/);
  const css = readdirSync('dist/_astro').filter((f) => f.endsWith('.css')).map((f) => readFileSync(`dist/_astro/${f}`, 'utf8')).join('');
  assert.doesNotMatch(css, /https?:\/\//);
  assert.equal(doc.querySelectorAll('script[src]').length, 0);
});

test('T-09 structure: one h1, landmarks, skip link target, lang', () => {
  assert.equal(doc.querySelectorAll('h1').length, 1);
  for (const sel of ['header', 'main#main', 'footer']) assert.ok(doc.querySelector(sel), sel);
  assert.ok(doc.querySelector('a.skip[href="#main"]'));
  assert.equal(doc.documentElement.lang, 'en-GB');
});

test('T-12 images are decorative or have alt text', () => {
  for (const img of doc.querySelectorAll('img')) assert.ok(img.hasAttribute('alt'));
});

test('axe: no violations (structure rules; colour contrast is covered by check:contrast)', async () => {
  dom.window.eval(axe.source);
  const results = await dom.window.axe.run(doc, { rules: { 'color-contrast': { enabled: false } } });
  const found = results.violations.map((v) => `${v.id}: ${v.nodes.length}`);
  assert.equal(found.length, 0, found.join('; '));
});

test('T-15 metadata and structured data', () => {
  const meta = (s) => doc.querySelector(s)?.getAttribute('content') ?? doc.querySelector(s)?.getAttribute('href');
  assert.equal(doc.title, site.name);
  assert.equal(meta('meta[name="description"]'), site.description);
  assert.ok(site.description.length <= 160);
  assert.equal(meta('link[rel="canonical"]'), site.url);
  assert.equal(meta('meta[property="og:site_name"]'), site.name);
  assert.equal(meta('meta[name="twitter:card"]'), 'summary_large_image');
  const ld = JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent);
  assert.equal(ld['@type'], 'Organization');
  assert.equal(ld.legalName, site.legalName);
  assert.deepEqual(ld.sameAs, [site.linkedin]);
  // every locally referenced og/icon asset exists
  for (const f of ['og-card.png', 'favicon.png', 'apple-touch-icon.png', 'rofcap-mark.png', 'rofcap-mark-96.png']) {
    assert.ok(existsSync(`dist/${f}`), f);
  }
});

test('T-16 robots, sitemap and 404', () => {
  assert.match(readFileSync('dist/robots.txt', 'utf8'), /Sitemap: https:\/\/www\.rofcap\.com\/sitemap-index\.xml/);
  assert.match(readFileSync('dist/sitemap-0.xml', 'utf8'), /<loc>https:\/\/www\.rofcap\.com\/<\/loc>/);
  assert.doesNotMatch(readFileSync('dist/sitemap-0.xml', 'utf8'), /404/);
  assert.match(readFileSync('dist/404.html', 'utf8'), /noindex/);
});

test('T-17 security headers file', () => {
  const h = readFileSync('dist/_headers', 'utf8');
  for (const k of ['Content-Security-Policy', 'X-Content-Type-Options: nosniff', 'Referrer-Policy', 'Strict-Transport-Security', 'Permissions-Policy']) {
    assert.ok(h.includes(k), k);
  }
  assert.match(h, /frame-ancestors 'none'/);
});

test('T-05 brand: lava is used for one visible element only', () => {
  const css = readdirSync('dist/_astro').filter((f) => f.endsWith('.css')).map((f) => readFileSync(`dist/_astro/${f}`, 'utf8')).join('');
  const uses = css.match(/var\(--color-lava\)/g) ?? [];
  assert.equal(uses.length, 1);
  const rule = css.match(/([^{}]+)\{[^{}]*var\(--color-lava\)[^{}]*\}/);
  assert.match(rule[1], /\.hero-sub/); // the one lava element is the hero sub-headline
});
