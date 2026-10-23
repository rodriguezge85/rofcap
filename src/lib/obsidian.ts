import { getCollection, type CollectionEntry } from 'astro:content';

export type Entry = CollectionEntry<'obsidian'>;

export interface Piece {
  id: string;
  title: string;
  standfirst: string;
  series: string;
  featured: boolean;
  placeholder: boolean;
  minutes?: number;
  author?: string;
  date?: Date;
  href?: string;
  entry: Entry;
}

export const articlePath = (id: string) => `/obsidian/${id}/`;

/** All pieces in display order; drafts are dropped from production builds. */
export async function getPieces(): Promise<Piece[]> {
  const entries = await getCollection('obsidian', ({ data }) => import.meta.env.DEV || !data.draft);
  return entries
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => ({
      id: entry.id,
      title: entry.data.title,
      standfirst: entry.data.standfirst,
      series: entry.data.series,
      featured: entry.data.featured,
      placeholder: entry.data.status === 'placeholder',
      minutes: entry.data.minutes,
      author: entry.data.author,
      date: entry.data.date,
      href: entry.data.status === 'announced' ? undefined : articlePath(entry.id),
      entry,
    }));
}

export const formatDate = (d?: Date) =>
  d ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }) : undefined;

export const metaLine = (p: Pick<Piece, 'date' | 'minutes' | 'author'>) =>
  [formatDate(p.date), p.minutes ? `${p.minutes} min read` : undefined, p.author].filter(Boolean).join(' · ');
