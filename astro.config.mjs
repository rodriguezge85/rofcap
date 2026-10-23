import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Keep placeholder and draft articles out of the sitemap (TEST_PLAN T-31).
const articleDir = 'src/content/obsidian';
const hidden = readdirSync(articleDir)
  .filter((f) => f.endsWith('.md'))
  .filter((f) => /^(status:\s*placeholder|draft:\s*true)\s*$/m.test(readFileSync(`${articleDir}/${f}`, 'utf8').split('---')[1]))
  .map((f) => `/obsidian/${f.replace(/\.md$/, '')}/`);

export default defineConfig({
  site: 'https://www.rofcap.com',
  output: 'static',
  integrations: [sitemap({ filter: (page) => !hidden.some((h) => page.endsWith(h)) })],
});
