import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const series = ['volcanic-framework', 'risk', 'discipline', 'digital-infrastructure', 'corridor'] as const;

const obsidian = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/obsidian' }),
  schema: z.object({
    title: z.string().min(1),
    standfirst: z.string().min(1),
    series: z.enum(series),
    // published: article page is live. placeholder: page is live but marked draft text and noindexed.
    // announced: listed on the index without a link until the piece exists.
    status: z.enum(['published', 'placeholder', 'announced']).default('announced'),
    // draft: excluded everywhere in production builds.
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    order: z.number().int(),
    date: z.coerce.date().optional(),
    minutes: z.number().int().positive().optional(),
    author: z.string().optional(),
    // Approved frames only; extend as the design-system photographs are added to src/assets/photography.
    image: z.enum(['eruption-night']).default('eruption-night'),
  }),
});

export const collections = { obsidian };
