// Content taken from "Layer_and_Broiler_Combined.pdf"
// Answer block types: text | list | table (cols + rows; first cell of each row is the card title)

const vaccCols = ['Age', 'Disease', 'Vaccine', 'Route'];

export const LAYER = [
  {
    q: 'What is the vaccination schedule for commercial layer?',
    a: [
      {
        type: 'table',
        cols: vaccCols,
        rows: [
          ['Day 1 (Hatchery)', "Marek's", 'HVT', 'S/C neck'],
          ['Day 5', 'IB + ND', 'BIL/120, Ranivax initial', 'Eye drop / drinking water'],
          ['Day 12', 'IBD', 'IBD-L / Gumbo-L / GM-97 / Gumbo-Med (Intermediate plus)', 'Eye drop / drinking water'],
          ['Day 17', 'IB + ND', 'Same as Day 5', 'Eye drop / drinking water'],
          ['Day 22', 'IBD', 'Same as Day 12', 'Eye drop / drinking water'],
          ['Day 25', 'ND', 'ND killed (half dose); normal dose 0.5 mL', 'S/C neck'],
          ['Day 35 (35 to 40)', 'Fowl pox', 'FPV (pink tablet, mix with 3 mL diluent)', 'Wing-web by bifurcated needle'],
          ['Day 55', 'IC', 'IC vaccine', 'S/C neck'],
          ['Day 65', 'ND', 'ND-killed', 'S/C neck'],
          ['Day 75', 'F. Cholera', 'FCV', 'IM or S/C (according to company)'],
          ['Day 105', 'IC', 'ICV', 'S/C neck'],
          ['Day 120', 'IB + ND + EDS', 'Vaccine name not clear in source', 'S/C'],
          ['Day 130–135', 'FC', 'FCV', 'S/C or I/M'],
        ],
      },
      { type: 'text', text: 'In the field, ND-killed is given every 5–6 months.' },
    ],
  },
  {
    q: 'What is the vaccination schedule for layer breeder?',
    a: [
      { type: 'text', text: 'IBD + IB + ND + EDS (given at day 120) → for maternal antibody, so that chicks get antibody.' },
      { type: 'text', text: 'The source has margin notes about breeder / bursa / Gumboro vaccine timing (in Bengali, partly unclear).' },
      { type: 'text', text: 'In the field, ND-killed is given every 5–6 months.' },
    ],
  },
  {
    q: 'What is the vaccination schedule for AI (Avian Influenza)?',
    a: [
      {
        type: 'table',
        cols: ['Age', 'Disease', 'Vaccine', 'Route'],
        rows: [
          ['Day 10', 'H5 (1/2 dose)', 'AIV', 'S/C'],
          ['Day 15', 'H9 (1/2 dose)', 'AIV', 'S/C'],
          ['Day 40', 'H5', 'AIV', 'S/C'],
          ['Day 50', 'H9', 'AIV', 'S/C'],
          ['Day 100', 'H5', 'AIV', 'S/C'],
          ['Day 110', 'H9', 'AIV', 'S/C'],
        ],
      },
    ],
  },
  {
    q: 'When should I deworm the flock?',
    a: [
      {
        type: 'list',
        items: [
          'Day 45 to 50 → Deworming',
          'Day 90 to 100 → Deworming',
          'Day 150 → Deworming',
          'Cage system: every 3 to 4 months',
        ],
      },
    ],
  },
  {
    q: 'What should I know about brooder, litter and lighting equipment?',
    a: [
      {
        type: 'list',
        items: [
          'Rice husk (ধানের তুষ) litter for the first 10–12 days; for layer, keep rice husk later as well.',
          'Wood dust / sawdust (কাঠের গুঁড়া): dust causes respiratory problems (সর্দি).',
          "Farmers' technique: spread sawdust over normal litter.",
          'Note: when space is increased after brooder stage, coryza-like respiratory signs appear – sawdust is responsible.',
          'Layer: 6 bulb LED (5 watt) per 1000 birds.',
          'Layer: 25 feeders & drinkers per 1000 birds.',
        ],
      },
    ],
  },
  {
    q: 'What is the medication schedule (original vs antibiotic-free)?',
    a: [
      {
        type: 'table',
        cols: ['Day', 'Original (Synthetic)', 'Revised (Antibiotic-Free)'],
        rows: [
          ['১ম দিন (Day 1)', 'Gluco-C 2 g/L', 'Jaggery (গুড়) 2% (20 g/L) + Probiotic (Bacillus subtilis / Lactobacillus, label dose)'],
          ['২-৫ দিন (Day 2–5)', 'Renamox/Moxacil + multivitamin + Gluco-C 5 g/L', 'Probiotic + Acidifier (pH 4.5-5.5) + Phytogenic blend (oregano/thymol-carvacrol, label dose) + Moringa (সজিনা পাতা) in feed, max 0.5%'],
          ['৯-১২ দিন (Day 9–12)', 'VitaZinc + Renasol AD3E', 'Organic zinc (zinc-methionine, in feed) + Renasol AD3E + β-glucan / MOS'],
          ['১৬-১৯ দিন (Day 16–19)', 'Anticoccidial + Aminomin', 'Artemisia annua or garlic (রসুন) 0.5% in feed + Probiotic + Aminomin 2 mL/L. Amprolium only for symptoms or high-risk litter'],
          ['২০-২২ দিন (Day 20–22)', 'Metaphos/Cataphos + Suncal D + Aminomin', 'Metaphos/Cataphos 1 mL/4 L + Suncal D 1 g/L + Aminomin + Tulsi (তুলসী) 0.1-0.5%'],
          ['২২ দিন → sale (Broiler, Sonali); ২২-৪৫ দিন (Layer)', 'Day: VitaZinc + Aminomin. Night: Renasol AD3E + Livoplex', 'Day: Probiotic + Amla (আমলকী) 0.5% in feed + Aminomin 2 mL/L. Night: Vit AD3E + কালমেঘ 0.25-0.5% + ভুঁই আমলা 0.5% + হলুদ 0.1% (in feed)'],
        ],
      },
    ],
  },
  {
    q: 'What is the weekly medicine routine from 45 days until egg laying?',
    a: [
      {
        type: 'table',
        cols: ['Day', 'Medicine'],
        rows: [
          ['Saturday, Sunday', 'Vita Zinc 1 mL/L + Aminomin 2 mL/L'],
          ['Monday, Tuesday', 'ES AD3E 1 mL/4 L + Suncal D 1 gm/L'],
          ['Wednesday, Thursday', 'E-sel 1 mL/4 L + Superliv 2 mL/L'],
          ['Friday', 'Ligovit 1 gm/4 L'],
        ],
      },
    ],
  },
  {
    q: 'What is the lighting schedule?',
    a: [
      {
        type: 'table',
        cols: ['Age', 'Light'],
        rows: [
          ['1–30 days', '24 hour light'],
          ['31–60 days', 'Gradually reduce → 13 hours (6 AM to 7 PM – daylight)'],
          ['When egg laying starts', '16 hours'],
        ],
      },
    ],
  },
  {
    q: 'Biosecurity: how do I isolate the layer farm?',
    a: [
      {
        type: 'list',
        items: [
          'Fence the farm with a single main gate; keep at least 500 m from other poultry farms and live bird markets.',
          'Use netting on sheds to keep out wild birds and rodents; no ducks or backyard birds nearby.',
          'Rear pullets away from the laying flock; avoid mixing ages and sources where possible.',
          'Keep a separate area for egg storage, away from the manure and dead bird disposal area.',
        ],
      },
    ],
  },
  {
    q: 'Biosecurity: how do I control traffic?',
    a: [
      {
        type: 'list',
        items: [
          'Wheel dip at the gate and foot dip at each shed entrance (change daily).',
          'Limit visitors: hand wash, farm clothing and boots, visitor register.',
          'Separate boots and clothing for each shed; visit young flocks first, older flocks last.',
          'Use only new or disinfected egg trays and crates; never share them with other farms or traders.',
        ],
      },
    ],
  },
  {
    q: 'Biosecurity: what sanitation is needed?',
    a: [
      {
        type: 'list',
        items: [
          'Between flocks: remove manure, dry clean, wash, disinfect and dry; keep sheds empty for at least 14 days.',
          'Remove manure regularly, keep it dry and away from the sheds to control flies and ammonia.',
          'Collect eggs often, discard cracked or dirty eggs, and clean drinker lines regularly to reduce biofilm.',
          'Remove dead birds daily and bury or incinerate them; control rodents and store feed dry to prevent mold.',
        ],
      },
    ],
  },
];

export const BROILER = [
  {
    q: 'Command 1: What is the vaccination schedule?',
    a: [
      {
        type: 'table',
        cols: vaccCols,
        rows: [
          ['Day 1 (Hatchery)', "Marek's", 'HVT', 'S/C neck'],
          ['Day 5', 'IB + ND', 'BIL/120, Ranivax initial', 'Eye drop / drinking water'],
          ['Day 12', 'IBD', 'IBD-L / Gumbo-L / GM-97 / Gumbo-Med (Intermediate plus)', 'Eye drop / drinking water'],
          ['Day 17', 'IB + ND', 'Same as Day 5', 'Eye drop / drinking water'],
          ['Day 22', 'IBD', 'Same as Day 12', 'Eye drop / drinking water'],
          ['Day 25', 'ND', 'ND killed (half dose); normal dose 0.5 mL (see margin note about broiler in source)', 'S/C neck'],
        ],
      },
    ],
  },
  {
    q: 'Command 2: What should I know about brooding?',
    a: [
      {
        type: 'list',
        items: [
          'Rice husk (ধানের তুষ) litter; keep rice husk later as well.',
          'Wood dust or sawdust (কাঠের গুঁড়া): dust causes respiratory problems (সর্দি).',
          "Farmers' technique: spread sawdust over normal litter.",
          'Note: when space is increased after brooder stage, coryza-like respiratory signs appear – sawdust is responsible.',
          'Layer: 6 bulb LED (5 watt) per 1000 birds.',
          'Layer: 25 feeders & drinkers per 1000 birds.',
        ],
      },
    ],
  },
  {
    q: 'Command 3: How do I isolate the broiler farm?',
    a: [
      {
        type: 'list',
        items: [
          'Fence the farm and keep a single main gate.',
          'Locate at least 500 m from other poultry farms and live bird markets.',
          'Use netting on sheds to keep out wild birds and rodents.',
          'All-in all-out: one batch per farm.',
        ],
      },
    ],
  },
  {
    q: 'Command 3: How do I control traffic?',
    a: [
      {
        type: 'list',
        items: [
          'Wheel dip at the gate and foot dip at each shed entrance (change daily).',
          'Limit visitors: hand wash, farm clothing and boots, visitor register.',
          'Separate boots and clothing for each shed.',
          'No outside crates or trays on the farm; if unavoidable, wash and disinfect first.',
        ],
      },
    ],
  },
  {
    q: 'Command 3: What sanitation is needed?',
    a: [
      {
        type: 'list',
        items: [
          'Before each batch: remove old litter, dry clean, wash, disinfect and dry; keep sheds empty for at least 14 days.',
          'Flush drinker lines regularly (acidifier or chlorine) to reduce biofilm.',
          'Keep litter dry, fix leaks and maintain good ventilation.',
          'Remove dead birds daily and bury or incinerate them; control rodents and store feed in a dry place.',
        ],
      },
    ],
  },
  {
    q: 'Command 4: What is the antibiotic-free medication protocol?',
    a: [
      {
        type: 'table',
        cols: ['Day', 'Original (Synthetic)', 'Revised (Antibiotic-Free)'],
        rows: [
          ['১ম দিন (Day 1)', 'Gluco-C (2 g/L) (Pulv. Maxcool vet, Pulv Summer cool)', 'Jaggery (গুড়) 2% (20 g/L) + Probiotic (Bacillus subtilis / Lactobacillus, label dose)'],
          ['২-৫ দিন (Day 2–5)', 'Renamox/Moxacil + multivitamin + Gluco-C 5 g/L', 'Probiotic + Acidifier (pH 4.5-5.5) + Phytogenic blend (oregano/thymol-carvacrol, label dose) + Moringa (সজিনা পাতা) in feed, max 0.5%'],
          ['৯-১২ দিন (Day 9–12)', 'VitaZinc + Renasol AD3E', 'Organic zinc (zinc-methionine, in feed) + Renasol AD3E + β-glucan / MOS'],
          ['১৬-১৯ দিন (Day 16–19)', 'Anticoccidial + Aminomin', 'Artemisia annua or garlic (রসুন) 0.5% in feed + Probiotic + Aminomin 2 mL/L. Amprolium only for symptoms or high-risk litter'],
          ['২০-২২ দিন (Day 20–22)', 'Metaphos/Cataphos + Suncal D + Aminomin', 'Metaphos/Cataphos 1 mL/4 L + Suncal D 1 g/L + Aminomin + Tulsi (তুলসী) 0.1-0.5%'],
          ['২২ দিন → sale (Broiler, Sonali)', 'Day: VitaZinc + Aminomin. Night: Renasol AD3E + Livoplex', 'Day: Probiotic + Amla (আমলকী) 0.5% in feed + Aminomin 2 mL/L. Night: Vit AD3E + কালমেঘ 0.25-0.5% + ভুঁই আমলা 0.5% + হলুদ 0.1% (in feed)'],
        ],
      },
    ],
  },
  {
    q: 'Command 5: What do I do in an emergency?',
    a: [{ type: 'text', text: 'Consult with a veterinarian.' }],
  },
];
