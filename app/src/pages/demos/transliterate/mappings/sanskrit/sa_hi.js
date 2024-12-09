const sanskritHindiMapping = {
  vowels: {
    'अ': 'अ', 'आ': 'आ', 'इ': 'इ', 'ई': 'ई',
    'उ': 'उ', 'ऊ': 'ऊ', 'ऋ': 'ऋ', 'ॠ': 'ॠ',
    'ऌ': 'ऌ', 'ॡ': 'ॡ', 'ए': 'ए', 'ऐ': 'ऐ',
    'ओ': 'ओ', 'औ': 'औ',
  },
  consonants: {
    'क': 'क', 'ख': 'ख', 'ग': 'ग', 'घ': 'घ', 'ङ': 'ङ',
    'च': 'च', 'छ': 'छ', 'ज': 'ज', 'झ': 'झ', 'ञ': 'ञ',
    'ट': 'ट', 'ठ': 'ठ', 'ड': 'ड', 'ढ': 'ढ', 'ण': 'ण',
    'त': 'त', 'थ': 'थ', 'द': 'द', 'ध': 'ध', 'न': 'न',
    'प': 'प', 'फ': 'फ', 'ब': 'ब', 'भ': 'भ', 'म': 'म',
    'य': 'य', 'र': 'र', 'ल': 'ल', 'व': 'व',
    'श': 'श', 'ष': 'ष', 'स': 'स', 'ह': 'ह',
    'ळ': 'ळ', // Retroflex lateral consonant
    'ऴ': '--', // Placeholder as 'ऴ' is not used in Hindi
    'क्ष': 'क्ष', // Compound consonant
    'त्र': 'त्र', // Compound consonant
    'ज्ञ': 'ज्ञ', // Compound consonant
    'ऽ': 'ऽ', // Avagraha
    'ॐ': 'ॐ', // Sacred Om symbol
  },
  joiners: {
    '्': '्', // Virama
  },
  modifiers: {
    'ा': 'ा', 'ि': 'ि', 'ी': 'ी', 'ु': 'ु', 'ू': 'ू',
    'ृ': 'ृ', 'ॄ': 'ॄ', 'े': 'े', 'ै': 'ै', 'ो': 'ो', 'ौ': 'ौ',
  },
  modifiers_two: {
    'ं': 'ं', 'ः': 'ः',
    'ँ': 'ँ', // Chandrabindu
    '॑': '॑', // Udatta (Vedic intonation)
    '॒': '॒', // Anudatta (Vedic intonation)
  },
  chillu: {
    // No exact chillu constructs in Hindi
  },
  numerals: {
    '०': '०', '१': '१', '२': '२', '३': '३',
    '४': '४', '५': '५', '६': '६', '७': '७',
    '८': '८', '९': '९',
  },
  punctuation: {
    '।': '।', '॥': '॥', ' ': ' ',
  },
};

export default sanskritHindiMapping;