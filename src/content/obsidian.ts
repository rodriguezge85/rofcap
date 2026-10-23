export interface Piece {
  series: string;
  title: string;
  standfirst: string;
  featured?: boolean;
  minutes?: number;
  author?: string;
  date?: string;
  href?: string;
}

// `date` and `href` stay unset until a piece is published (the design shows [DATE] placeholders).
const pieces: Piece[] = [
    { series: 'volcanic-framework', featured: true, title: 'Where pressure builds before the market notices', standfirst: 'The signals that precede a value event are visible to instrumented observers long before they are priced. What we watch, and why the consensus arrives late.', minutes: 6, author: 'Gerardo Rodriguez' },
    { series: 'risk', title: 'The caldera problem', standfirst: 'Collapse is preceded by measurable pressure drops. Guarding against it matters as much as catching the eruption.', minutes: 5 },
    { series: 'discipline', title: 'Liquidity is a first-class dimension', standfirst: "Plan the exit at entry. Size for the worst liquidity state. Why a trading desk's habits belong in a private-markets book.", minutes: 4 },
    { series: 'digital-infrastructure', title: 'Compute follows power', standfirst: 'In Southeast Asia the binding constraint on data centres is not land or fibre. It is dedicated, dispatchable power — and who controls it.' },
    { series: 'corridor', title: 'Two sides of one ocean', standfirst: 'Why the Asia-Pacific and Americas corridors are converging, and what that means for where capital, operators and ideas move next.' },
    { series: 'volcanic-framework', title: 'The founding moment is not one stage among seven', standfirst: 'Magma Accumulation sets what kind of eruption is possible at all. Reading the origin, even when entering late.' },
  ];

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
  pieces,
} as const;

export const seriesLabel = (slug: string) => obsidian.series.find((s) => s.slug === slug)?.label ?? slug;
