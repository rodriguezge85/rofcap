// Runs against ./dist (npm run build first). Covers TEST_PLAN T-01..T-06, T-09, T-12, T-15..T-17 for every page.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import axe from 'axe-core';
import { site, home, about, framework } from '../src/content/site.ts';
import { obsidian } from '../src/content/obsidian.ts';

// Front matter of every article, parsed without Astro (flat key: value pairs only).
const articles = readdirSync('src/content/obsidian').filter((f) => f.endsWith('.md')).map((f) => {
  const [, fm, ...body] = readFileSync(`src/content/obsidian/${f}`, 'utf8').split('---');
  const data = Object.fromEntries(fm.trim().split('\n').map((l) => { const i = l.indexOf(':'); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, '')]; }));
  return { id: f.replace(/\.md$/, ''), data, body: body.join('---') };
});
const live = articles.filter((a) => a.data.status !== 'announced' && a.data.draft !== 'true');

const pages = { '/': 'dist/index.html', '/about/': 'dist/about/index.html', '/obsidian/': 'dist/obsidian/index.html' };
for (const a of readdirSync('src/content/obsidian').filter((f) => f.endsWith('.md'))) {
  const id = a.replace(/\.md$/, '');
  if (existsSync(`dist/obsidian/${id}/index.html`)) pages[`/obsidian/${id}/`] = `dist/obsidian/${id}/index.html`;
}
const load = (path) => {
  const html = readFileSync(pages[path], 'utf8');
  const dom = new JSDOM(html, { runScripts: 'outside-only' });
  return { html, dom, doc: dom.window.document };
};
const text = (el) => el.textContent.replace(/\s+/g, ' ').trim();
const css = () => readdirSync('dist/_astro').filter((f) => f.endsWith('.css')).map((f) => readFileSync(`dist/_astro/${f}`, 'utf8')).join('');

test('T-01 home hero copy matches the design', () => {
  const { doc } = load('/');
  assert.equal(text(doc.querySelector('h1')), home.title);
  assert.equal(text(doc.querySelector('.eyebrow')), home.eyebrow);
  assert.equal(text(doc.querySelector('.hero-sub')), home.tagline);
});

test('T-02 home body copy: who we are, ring of fire stats, services', () => {
  const { doc } = load('/');
  const body = text(doc.body);
  for (const t of [home.lead, home.body, home.ring.lead, home.ring.body, ...home.services.map((s) => s.text)]) assert.ok(body.includes(t), t.slice(0, 40));
  for (const s of home.ring.stats) assert.ok(body.includes(s.value) && body.includes(s.label), s.value);
});

test('T-02b framework: seven stages, caldera, four disciplines on home and about', () => {
  for (const path of ['/', '/about/']) {
    const { doc } = load(path);
    const body = text(doc.body);
    assert.equal(doc.querySelectorAll('.stage-cards li, .stage-rows li').length, 7, path);
    for (const s of framework.stages) assert.ok(body.includes(s.name), `${path} ${s.name}`);
    assert.equal(doc.querySelectorAll('.disciplines li').length, 4, path);
    assert.ok(body.includes(path === '/' ? framework.caldera.homeText : framework.caldera.aboutText), path);
  }
});

test('T-02c about copy matches', () => {
  const { doc } = load('/about/');
  const body = text(doc.body);
  assert.equal(text(doc.querySelector('h1')), about.title);
  assert.equal(text(doc.querySelector('.doc-subtitle')), about.subtitle);
  for (const p of about.ring) assert.ok(body.includes(p), p.slice(0, 40));
  for (const s of [...about.services, ...about.sectors]) assert.ok(body.includes(s.text), s.title);
});

test('T-02d obsidian index lists all pieces with series filter', () => {
  const { doc } = load('/obsidian/');
  assert.equal(text(doc.querySelector('h1')), 'OBSIDIAN');
  const shown = articles.filter((a) => a.data.draft !== 'true');
  assert.equal(doc.querySelectorAll('.feed .piece').length, shown.length);
  for (const a of shown) assert.ok(text(doc.body).includes(a.data.title), a.data.title);
  // only pieces with an article page are linked
  for (const a of shown) {
    const link = [...doc.querySelectorAll('.feed .piece h3 a')].find((l) => text(l) === a.data.title);
    assert.equal(Boolean(link), a.data.status !== 'announced', a.data.title);
  }
  assert.equal(doc.querySelectorAll('[data-filter]').length, obsidian.series.length + 1);
  assert.equal(doc.querySelectorAll('.feed .featured').length, 1);
});

test('T-03 legal entity, address, email and notice on every page', () => {
  for (const path of Object.keys(pages)) {
    const { doc } = load(path);
    const foot = text(doc.querySelector('footer'));
    for (const t of [site.legalName, site.address.line, site.email, site.notice.lead, site.notice.body]) assert.ok(foot.includes(t), `${path}: ${t.slice(0, 30)}`);
    assert.ok(doc.querySelector(`a[href="mailto:${site.email}"]`), path);
    assert.ok(doc.querySelector('#contact'), path);
  }
});

test('T-04 external links are safe and point to LinkedIn', () => {
  for (const path of Object.keys(pages)) {
    for (const a of load(path).doc.querySelectorAll('a[href^="http"]')) {
      assert.equal(a.href, site.linkedin);
      assert.equal(a.target, '_blank');
      assert.match(a.rel, /noopener/);
      assert.match(a.rel, /noreferrer/);
    }
  }
});

test('internal links resolve to built pages or anchors', () => {
  for (const path of Object.keys(pages)) {
    const { doc } = load(path);
    for (const a of doc.querySelectorAll('a[href^="/"], a[href^="#"]')) {
      const [base, hash] = a.getAttribute('href').split('#');
      const target = base === '' ? path : base.split('?')[0];
      assert.ok(pages[target], `${path} -> ${a.getAttribute('href')}`);
      if (hash) assert.ok(load(target).doc.getElementById(hash), `${path} -> #${hash} missing on ${target}`);
    }
  }
});

test('T-06 no third-party requests or fonts; scripts are same-origin only', () => {
  for (const path of Object.keys(pages)) {
    const { html, doc } = load(path);
    assert.doesNotMatch(html, /fonts\.(googleapis|gstatic)\.com/);
    for (const s of doc.querySelectorAll('script[src]')) assert.ok(s.getAttribute('src').startsWith('/'), s.src);
  }
  assert.doesNotMatch(css(), /https?:\/\//);
});

test('T-09 structure: one h1, landmarks, skip link, lang, nav current', () => {
  for (const path of Object.keys(pages)) {
    const { doc } = load(path);
    assert.equal(doc.querySelectorAll('h1').length, 1, path);
    for (const sel of ['header', 'nav[aria-label="Primary"]', 'main#main', 'footer']) assert.ok(doc.querySelector(sel), `${path} ${sel}`);
    assert.ok(doc.querySelector('a.skip[href="#main"]'));
    assert.equal(doc.documentElement.lang, 'en-GB');
  }
  assert.equal(text(load('/about/').doc.querySelector('[aria-current="page"]')), 'About');
  assert.equal(text(load('/obsidian/').doc.querySelector('[aria-current="page"]')), 'OBSIDIAN');
});

test('T-12 images are decorative or have alt text', () => {
  for (const path of Object.keys(pages)) for (const img of load(path).doc.querySelectorAll('img')) assert.ok(img.hasAttribute('alt'));
});

for (const path of Object.keys(pages)) {
  test(`axe: no violations on ${path} (colour contrast is covered by check:contrast)`, async () => {
    const { dom, doc } = load(path);
    dom.window.eval(axe.source);
    const results = await dom.window.axe.run(doc, { rules: { 'color-contrast': { enabled: false } } });
    const found = results.violations.map((v) => `${v.id}: ${v.nodes.length}`);
    assert.equal(found.length, 0, found.join('; '));
  });
}

test('T-15 metadata and structured data per page', () => {
  for (const path of Object.keys(pages)) {
    const { doc } = load(path);
    const meta = (s) => doc.querySelector(s)?.getAttribute('content') ?? doc.querySelector(s)?.getAttribute('href');
    const desc = meta('meta[name="description"]');
    assert.ok(desc && desc.length > 40 && desc.length <= 300, path);
    assert.equal(meta('link[rel="canonical"]'), new URL(path, site.url).href);
    assert.equal(meta('meta[property="og:site_name"]'), site.name);
    assert.equal(meta('meta[name="twitter:card"]'), 'summary_large_image');
    const ld = JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent);
    assert.equal(ld.legalName, site.legalName);
    assert.deepEqual(ld.sameAs, [site.linkedin]);
  }
  assert.equal(load('/').doc.title, site.name);
  for (const f of ['og-card.png', 'favicon.png', 'apple-touch-icon.png', 'rofcap-mark.png', 'rofcap-mark-96.png']) assert.ok(existsSync(`dist/${f}`), f);
});

test('T-16 robots, sitemap and 404', () => {
  assert.match(readFileSync('dist/robots.txt', 'utf8'), /Sitemap: https:\/\/www\.rofcap\.com\/sitemap-index\.xml/);
  const map = readFileSync('dist/sitemap-0.xml', 'utf8');
  for (const p of ['/', '/about/', '/obsidian/']) assert.ok(map.includes(`<loc>${new URL(p, site.url).href}</loc>`), p);
  assert.doesNotMatch(map, /404/);
  assert.match(readFileSync('dist/404.html', 'utf8'), /noindex/);
});

test('T-17 security headers file', () => {
  const h = readFileSync('dist/_headers', 'utf8');
  for (const k of ['Content-Security-Policy', 'X-Content-Type-Options: nosniff', 'Referrer-Policy', 'Strict-Transport-Security', 'Permissions-Policy']) assert.ok(h.includes(k), k);
  assert.match(h, /frame-ancestors 'none'/);
});

test('T-05 brand: lava is never a text colour on light grounds except the display subtitle', () => {
  const textUses = [...css().matchAll(/([^{}]+)\{[^{}]*[{;]?color:var\(--color-lava\)[^{}]*\}/g)].map((m) => m[1].trim());
  assert.deepEqual(textUses.filter((s) => !/doc-subtitle/.test(s)), []);
});

test('collection: every article has a valid schema and the featured piece exists once', () => {
  const series = obsidian.series.map((x) => x.slug);
  const orders = new Set();
  for (const a of articles) {
    for (const k of ['title', 'standfirst', 'series', 'order']) assert.ok(a.data[k], `${a.id}.${k}`);
    assert.ok(series.includes(a.data.series), `${a.id} series`);
    assert.ok(['published', 'placeholder', 'announced'].includes(a.data.status ?? 'announced'), `${a.id} status`);
    assert.ok(!orders.has(a.data.order), `${a.id} duplicate order`);
    orders.add(a.data.order);
  }
  assert.equal(articles.filter((a) => a.data.featured === 'true').length, 1);
});

test('T-31 announced and draft pieces have no page; live pieces do', () => {
  for (const a of articles) {
    const has = existsSync(`dist/obsidian/${a.id}/index.html`);
    assert.equal(has, live.includes(a), a.id);
  }
});

test('article template: header, draft marking, disclaimer, noindex, sitemap', () => {
  const placeholders = live.filter((a) => a.data.status === 'placeholder');
  assert.ok(placeholders.length >= 1);
  for (const a of live) {
    const path = `/obsidian/${a.id}/`;
    const { doc } = load(path);
    assert.equal(text(doc.querySelector('h1')), a.data.title);
    assert.ok(text(doc.querySelector('.article-head')).includes(a.data.standfirst));
    assert.ok(doc.querySelector('.article-body'));
    // FR-23: closes with the standard disclaimer and the commentary line
    const end = text(doc.querySelector('.article-end'));
    assert.ok(end.includes(site.notice.body) && end.includes('OBSIDIAN is commentary, not investment research or advice.'));
    const map = readFileSync('dist/sitemap-0.xml', 'utf8');
    if (a.data.status === 'placeholder') {
      assert.ok(doc.querySelector('.draft-chip'), 'visible draft chip');
      assert.match(text(doc.querySelector('.article-body')), /DRAFT — PLACEHOLDER TEXT/);
      assert.ok(doc.querySelector('meta[name="robots"][content="noindex"]'), 'noindex');
      assert.ok(!map.includes(path), 'not in sitemap');
    } else {
      assert.ok(map.includes(path), 'published pieces are in the sitemap');
    }
  }
});
