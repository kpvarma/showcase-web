const sanskritTamilMapping = {
  vowels: {
    'अ': 'அ', 'आ': 'ஆ', 'इ': 'இ', 'ई': 'ஈ',
    'उ': 'உ', 'ऊ': 'ஊ', 'ऋ': '--', // No direct equivalent
    'ॠ': '--', // No direct equivalent
    'ऌ': '--', // No direct equivalent
    'ॡ': '--', // No direct equivalent
    'ए': 'எ', 'ऐ': 'ஐ', 'ओ': 'ஒ', 'औ': 'ஔ',
  },
  consonants: {
    'क': 'க', 'ख': 'க', 'ग': 'க', 'घ': 'க', 'ङ': 'ங',
    'च': 'ச', 'छ': 'ச', 'ज': 'ஜ', 'झ': '--', // No direct equivalent
    'ञ': 'ஞ', 'ट': 'ட', 'ठ': 'ட', 'ड': 'ட', 'ढ': 'ட',
    'ण': 'ண', 'त': 'த', 'थ': 'த', 'द': 'த', 'ध': 'த',
    'न': 'ந', 'प': 'ப', 'फ': 'ப', 'ब': 'ப', 'भ': 'ப',
    'म': 'ம', 'य': 'ய', 'र': 'ர', 'ल': 'ல', 'व': 'வ',
    'श': 'ஷ', 'ष': 'ஷ', 'स': 'ஸ', 'ह': 'ஹ',
    'ळ': 'ள', // Retroflex lateral consonant
    'ऴ': 'ழ', // Tamil alveolar consonant
    'क्ष': 'க்ஷ', // Compound consonant
    'त्र': 'த்ர', // Compound consonant
    'ज्ञ': 'ஜ்ஞ', // Compound consonant
    'ऽ': '--', // Placeholder for Avagraha
    'ॐ': 'ஓம்', // Sacred Om symbol
  },
  joiners: {
    '्': '்', // Virama
  },
  modifiers: {
    'ा': 'ா', 'ि': 'ி', 'ी': 'ீ', 'ु': 'ு', 'ू': 'ூ',
    'ृ': '--', // No direct equivalent
    'ॄ': '--', // No direct equivalent
    'े': 'ே', 'ै': 'ை', 'ो': 'ோ', 'ौ': 'ௌ',
  },
  modifiers_two: {
    'ं': 'ம்', 'ः': 'ஃ', // Tamil Ayutha Ezhuthu
    'ँ': 'ம்', // Chandrabindu
    '॑': '--', // Udatta (Vedic intonation)
    '॒': '--', // Anudatta (Vedic intonation)
  },
  chillu: {
    // No exact chillu constructs in Tamil
  },
  numerals: {
    '०': '௦', '१': '௧', '२': '௨', '३': '௩',
    '४': '௪', '५': '௫', '६': '௬', '७': '௭',
    '८': '௮', '९': '௯',
  },
  punctuation: {
    '।': '।', '॥': '॥', ' ': ' ',
  },
};

export default sanskritTamilMapping;