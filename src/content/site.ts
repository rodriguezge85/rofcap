export const site = {
  name: 'Ring of Fire Capital Ventures',
  legalName: 'Ring of Fire Capital Ventures Limited',
  shortName: 'ROFCAP',
  url: 'https://www.rofcap.com/',
  email: 'info@rofcap.com',
  description:
    'Ring of Fire Capital Ventures (ROFCAP) is a Hong Kong-domiciled private investment firm and venture platform connecting capital, operators and ideas across Asia-Pacific and the Americas.',
  linkedin: 'https://www.linkedin.com/company/rofcap/',
  address: {
    line: '22F Tai Yau Building, 181 Johnston Road, Wan Chai, Hong Kong SAR',
    street: '22F Tai Yau Building, 181 Johnston Road',
    locality: 'Wan Chai',
    region: 'Hong Kong SAR',
    country: 'HK',
  },
  nav: [
    { label: 'About', href: '/about/', key: 'about' },
    { label: 'Framework', href: '/about/#framework', key: 'framework' },
    { label: 'OBSIDIAN', href: '/obsidian/', key: 'obsidian' },
    { label: 'Contact', href: '#contact', key: 'contact' },
  ],
  notice: {
    lead: 'Not a Solicitation.',
    body: "This material describes ROFCAP's firm and proprietary investment process for informational purposes only. It is not a solicitation, not investment advice, and not an offering of any product or service. ROFCAP is not licensed by the Hong Kong Securities and Futures Commission. OBSIDIAN is commentary, not investment research or advice.",
  },
} as const;

export const home = {
  eyebrow: 'Hong Kong · Asia-Pacific & the Americas',
  title: 'Seizing Seismic Opportunities.',
  tagline: 'connecting capital, operators and ideas across the Asia-Pacific and Americas corridors',
  lead: 'Ring of Fire Capital Ventures is a Hong Kong-domiciled private investment firm and venture platform. We invest our own capital, structure strategic deals, and partner with the businesses we believe in.',
  body: 'Our name reflects both our geographic footprint and our philosophy: navigating dynamic markets along the Pacific Ring of Fire, where capital, technology and demographic change converge. We are grounded in institutional trading experience, and we treat risk and liquidity as primary inputs.',
  services: [
    { title: 'Principal investments', text: 'Proprietary capital deployed through dedicated structures into late-stage frontier technology and digital financial services.' },
    { title: 'Transaction & business advisory', text: 'Structuring strategic acquisitions and partnerships for operating-company partners, including digital infrastructure and energy across Southeast Asia.' },
    { title: 'Family-office advisory', text: 'Supporting single family offices on the operational and governance architecture of their platforms across the APAC–Americas corridor.' },
  ],
  ring: {
    lead: "A horseshoe of converging tectonic plates around the Pacific — from the Andes to Alaska, Japan, the Philippines, Indonesia and New Zealand. It holds most of the planet's active volcanoes and nearly all of its strongest earthquakes. It is also home to some of the youngest populations and fastest-growing economies on earth.",
    stats: [
      { value: '40,000 km', label: 'of convergent coastline' },
      { value: '~75%', label: "of the world's active volcanoes" },
      { value: '~90%', label: "of the world's earthquakes" },
    ],
    body: 'The same convergence shapes the economies along it: dense cities, mobile-first consumers, rapid digitisation in finance, infrastructure and energy, and a corridor of capital that runs from Hong Kong and Singapore to Tokyo, Sydney, San Francisco and São Paulo. We work where those plates meet.',
  },
};

export const framework = {
  heading: 'Convergence — time and pressure.',
  homeParagraphs: [
    'The Ring of Fire forms where tectonic plates converge, and volcanic activity follows when built-up pressure finds its moment to release. Business value events follow a similar logic. Internal pressure accumulates as a company builds its product, team and competitive position, while external timing is set by the market cycle, capital flows and regulation. A value event needs both to align.',
    'We look for where pressure is building before the market does, and we judge when it is likely to release. Every business sits at an identifiable stage of its lifecycle, and that stage determines the risk it carries, the return it can offer and how a partnership should be structured.',
  ],
  aboutParagraphs: [
    'Our investment process rests on a single proprietary lens. Every business sits at an identifiable stage of its lifecycle, and that stage determines the risk it carries, the return it can offer and how a partnership should be structured. The framework fuses four established disciplines into one staged view: competitive moat analysis, intrinsic value and price discipline, market-cycle and risk judgment, and founder and origination quality.',
    'Volcanic activity follows when built-up pressure finds its moment to release. Business value events follow a similar logic. Internal pressure accumulates as a company builds its product, team and competitive position, while external timing is set by the market cycle, capital flows and regulation. A value event needs both to align. We look for where pressure is building before the market does, and we judge when it is likely to release.',
  ],
  stages: [
    { n: '0', name: 'Dormancy', card: 'Value overlooked, misunderstood or not yet priced. We look here before the market does.', row: 'Value overlooked, misunderstood, or not yet priced; we look here before the market does.' },
    { n: '1', name: 'Magma Accumulation', card: 'The founding moment. Team, capital and core idea take form; the originating advantage is built, or it is not.', row: 'The founding moment; team, capital and core idea take form, and the originating advantage is built or it is not.' },
    { n: '2', name: 'Pre-Eruptive Unrest', card: 'Activity becomes visible. Execution risk is real, the signal is building, timing remains uncertain.', row: 'Activity becomes visible; execution risk is real, the signal is building, timing remains uncertain.' },
    { n: '3', name: 'Eruption', card: 'Breakthrough. Rapid growth; competitive advantages crystallise; the business establishes its position.', row: 'Breakthrough; rapid growth, competitive advantages crystallise, the business establishes its position.' },
    { n: '4', name: 'Lava Flow', card: 'The landscape reshapes. The industry restructures, cash flow stabilises, liquidity options widen.', row: 'The landscape reshapes; the industry restructures, cash flow stabilises, liquidity options widen.' },
    { n: '5', name: 'Cooling', card: 'Maturity. Growth moderates; advantages are defended rather than built; discipline shifts to value and durability.', row: 'Maturity; growth moderates, advantages are defended rather than built, discipline shifts to value and durability.' },
    { n: '6', name: 'Dormancy or Extinction', card: 'Renewal or decline. A new cycle begins, or the advantage erodes toward exit.', row: 'Renewal or decline; a new cycle begins, or the advantage erodes toward exit.' },
  ],
  caldera: {
    title: 'Caldera — the cross-cutting risk state',
    aboutTitle: 'The cross-cutting risk state',
    homeText: 'A caldera is a catastrophic collapse, and it can strike at any stage — through over-leverage, an eroded advantage, a founder breakdown, or a regulatory event that traps liquidity and forecloses an exit. We stress-test every position against it, because guarding against the caldera matters as much as capturing the eruption.',
    aboutText: 'A caldera is a catastrophic collapse, and it can strike at any stage through over-leverage, an eroded advantage, a founder breakdown, or a regulatory event that traps liquidity and forecloses an exit. We stress-test every position against it, because guarding against the caldera matters as much as capturing the eruption.',
  },
  disciplines: [
    { lead: 'Competitive structure.', text: 'What specific advantage protects cash flow, and is there a barrier preventing it from being competed away?' },
    { lead: 'Value and price.', text: 'What is the business worth on its own economics, and does the entry leave a margin of safety?' },
    { lead: 'Cycle and risk.', text: 'Where is the market in its own cycle, and are we rewarded or penalised for the timing?' },
    { lead: 'Founder and origination.', text: 'Was the founding insight genuinely contrarian, and is the team positioned to execute it?' },
  ],
};

export const about = {
  title: 'About the firm',
  subtitle: 'where the plates meet, pressure builds before it shows',
  ring: [
    'The Pacific Ring of Fire is a horseshoe of convergent plate boundaries some 40,000 kilometres long — from the Andes up the American cordillera to Alaska, across the Aleutians to Kamchatka, down through Japan, the Philippines and Indonesia to New Zealand.',
    'Where one plate is driven beneath another, rock melts, pressure accumulates, and mountains are built. The belt holds roughly three-quarters of the planet\'s active volcanoes and produces the great majority of its earthquakes. It is the most geologically dynamic region on earth, and it has been so for a very long time.',
    "It is also where the next century's growth is concentrated. The economies along the ring are young by median age, urbanising fast, and leaping directly to mobile and digital infrastructure in finance, healthcare, logistics and energy. Emerging markets on the Asian side are now connected by capital, talent and policy to the developed markets on the American side. The corridor between them — Hong Kong and Singapore to Tokyo and Sydney, San Francisco to Mexico City and São Paulo — is where we work.",
    'Our name is a description of our footprint and a statement of method. The same forces that build mountains build companies: pressure accumulates out of sight, and value releases when internal readiness meets external timing.',
  ],
  services: [
    { title: 'Principal investments', text: 'Proprietary capital deployed through dedicated structures into late-stage frontier technology and digital financial services. Co-investment access curated for aligned institutional and family-office partners.' },
    { title: 'Transaction & business advisory', text: 'Structuring strategic acquisitions and partnerships for operating-company partners, including digital infrastructure and energy mandates across Southeast Asia.' },
    { title: 'Family-office operational advisory', text: 'Supporting single family offices on the operational and governance architecture of their platforms across the APAC–Americas corridor.' },
  ],
  sectors: [
    { title: 'Frontier technology', text: 'Late-stage positions via dedicated structures.' },
    { title: 'Digital financial services', text: 'Next-generation banking and payments platforms.' },
    { title: 'Digital infrastructure & energy', text: 'Data centres and the power that feeds them, including behind-the-meter solutions.' },
  ],
};
