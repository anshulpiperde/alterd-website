export type FAQEntry = {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
  keywords?: string[];
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export const faqs: FAQEntry[] = [
  {
    id: slugify('What is Alterd?'),
    question: 'What is Alterd?',
    answer:
      'Alterd is a contemporary women’s fashion brand rooted in the concept of the alter ego. We create prêt wear that is conscious, customisable, and designed for every version of the modern woman.',
    tags: ['about', 'brand'],
    keywords: ['alter ego', 'womens fashion', 'pret wear', 'conscious', 'customisable']
  },
  {
    id: slugify('What does the name Alterd mean?'),
    question: 'What does the name Alterd mean?',
    answer:
      '“Alterd” comes from the word alter — a transformation, a shift, another self. Our clothing celebrates duality: elegance with an edge, softness with strength.',
    tags: ['about', 'brand'],
    keywords: ['meaning', 'name', 'duality', 'transformation', 'another self']
  },
  {
    id: slugify('What type of clothing does Alterd offer?'),
    question: 'What type of clothing does Alterd offer?',
    answer:
      'Alterd offers prêt wear across categories — formal, occasion, vacation, and play — designed to shift effortlessly between moods, roles, and lifestyles.',
    tags: ['products', 'collections'],
    keywords: ['categories', 'formal', 'occasion', 'vacation', 'play', 'pret wear']
  },
  {
    id: slugify('Are your pieces customisable?'),
    question: 'Are your pieces customisable?',
    answer:
      'Yes. Many of our silhouettes include customisable details — adjustable fits, interchangeable elements, or versatile styling options — so each piece feels truly yours.',
    tags: ['products', 'customisation'],
    keywords: ['custom', 'adjustable', 'interchangeable', 'versatile', 'fit']
  },
  {
    id: slugify('Do you launch collections seasonally?'),
    question: 'Do you launch collections seasonally?',
    answer:
      'Instead of rigid seasons, Alterd releases curated edits that reflect moods, stories, and personalities — always with timeless wearability.',
    tags: ['collections'],
    keywords: ['seasons', 'edits', 'drops', 'timeless']
  },
  {
    id: slugify('What makes Alterd “conscious”?'),
    question: 'What makes Alterd “conscious”?',
    answer:
      'We are committed to mindful production, considered design, and fabrics chosen with responsibility. Our aim is to balance style with sustainability.',
    tags: ['sustainability'],
    keywords: ['sustainable', 'mindful', 'responsible fabrics', 'ethical']
  },
  {
    id: slugify('Where are your garments made?'),
    question: 'Where are your garments made?',
    answer:
      'Every Alterd piece is crafted with care in India, blending local craftsmanship with contemporary global design.',
    tags: ['craft', 'production'],
    keywords: ['made in india', 'craftsmanship', 'manufacturing']
  },
  {
    id: slugify('Do you ship pan-India?'),
    question: 'Do you ship pan-India?',
    answer: 'Yes, we currently ship across India. (International shipping will be introduced soon.)',
    tags: ['shipping'],
    keywords: ['delivery', 'pan india', 'international shipping']
  },
  {
    id: slugify('How long will my order take?'),
    question: 'How long will my order take?',
    answer:
      'Standard ready-to-wear orders are delivered in 5–7 working days. Customisable pieces may take 10–14 working days.',
    tags: ['shipping', 'orders'],
    keywords: ['delivery time', 'turnaround', 'lead time', 'tat']
  },
  {
    id: slugify('What is your return/exchange policy?'),
    question: 'What is your return/exchange policy?',
    answer:
      'We accept exchanges on standard sizes within 7 days of delivery. Customised/altered pieces are final sale.',
    tags: ['returns', 'exchanges', 'policy'],
    keywords: ['return', 'exchange', 'refund', 'final sale', 'customised']
  },
  {
    id: slugify('How can I contact Alterd?'),
    question: 'How can I contact Alterd?',
    answer:
      'You can reach us via Instagram DM. For urgent queries, WhatsApp support is available.',
    tags: ['support', 'contact'],
    keywords: ['instagram', 'dm', 'whatsapp', 'support', 'contact']
  }
];

// Lightweight client-side search without external deps
function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function uniqueTokens(text: string) {
  return Array.from(new Set(normalize(text).split(' ').filter(w => w.length > 1)));
}

export type SearchResult = { entry: FAQEntry; score: number };

export function searchFAQ(query: string, limit = 3): SearchResult[] {
  const q = query.trim();
  if (!q) return [];

  const qNorm = normalize(q);
  const qTokens = uniqueTokens(q);

  const results: SearchResult[] = faqs.map((entry) => {
    const questionNorm = normalize(entry.question);
    const answerNorm = normalize(entry.answer);
    const meta = normalize([...(entry.tags || []), ...(entry.keywords || [])].join(' '));

    let score = 0;

    if (questionNorm.includes(qNorm)) score += 5;
    if (answerNorm.includes(qNorm)) score += 2;

    for (const t of qTokens) {
      if (questionNorm.includes(t)) score += 1.5;
      if (meta.includes(t)) score += 1.2;
      if (answerNorm.includes(t)) score += 0.6;
    }

    return { entry, score };
  });

  return results
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
