export const TIERS = [
  { label: "Nano Influencer", range: "1K – 10K followers" },
  { label: "Micro Influencer", range: "10K – 100K followers" },
  { label: "Macro Influencer", range: "100K – 500K followers" },
  { label: "Mega Influencer", range: "500K+ followers" },
];

export const CATEGORY_GROUPS = [
  {
    title: "Main Categories",
    categories: [
      "Fashion Influencer", "Lifestyle Influencer", "Food Influencer",
      "Travel Influencer", "Fitness Influencer", "Beauty Influencer",
      "Tech Influencer", "Finance Influencer", "Parenting Influencer", "Education Creator",
    ],
  },
  {
    title: "Content Creator Categories",
    categories: [
      "Best Reel Creator", "Best Video Creator", "Best Storytelling Creator",
      "Short Form Content Creator", "YouTube Creator",
    ],
  },
  {
    title: "Entertainment Categories",
    categories: [
      "Comedy Creator", "Dance Creator", "Music Influencer", "Entertainment Influencer",
    ],
  },
  {
    title: "Professional Creator Categories",
    categories: [
      "Entrepreneur Influencer", "Startup Influencer", "Marketing Influencer", "LinkedIn Creator",
    ],
  },
];

export const SPECIAL_AWARDS = [
  "Rising Influencer of the Year",
  "Influencer Couple of the Year",
  "Social Impact Influencer",
  "Viral Creator of the Year",
  "Digital Creator of the Year",
  "Influencer of the Year",
  "Audience Choice Award",
];

export const ALL_CATEGORIES = CATEGORY_GROUPS.flatMap(g => g.categories);

export const SERVICE_TYPES = [
  "Photography", "Videography", "Makeup Artist",
  "Fashion Brand", "Food Brand", "Event Partner",
];

export const SPONSORSHIP_TYPES = [
  "Title Sponsor", "Gold Sponsor", "Category Sponsor", "Supporting Sponsor",
];
