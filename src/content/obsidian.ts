export const obsidian = {
  tagline: 'Sharp insights, hard conviction.',
  byline: 'An insights channel from Ring of Fire Capital Ventures',
  channelTitle: 'Commentary from the Ring of Fire',
  channelText: "A thesis in the first sentence, evidence in the body, a stated conviction at the end. Written in the firm's own vocabulary; no portfolio names, no deal specifics.",
  series: [
    { slug: 'volcanic-framework', label: 'Volcanic Framework' },
    { slug: 'risk', label: 'Risk' },
    { slug: 'discipline', label: 'Discipline' },
    { slug: 'digital-infrastructure', label: 'Digital infrastructure' },
    { slug: 'corridor', label: 'Corridor' },
  ],
} as const;

export const seriesLabel = (slug: string) => obsidian.series.find((s) => s.slug === slug)?.label ?? slug;
