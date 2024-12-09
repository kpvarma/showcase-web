const sanskritEnglishMapping = {
  vowels: {
    'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ī',
    'उ': 'u', 'ऊ': 'ū', 'ऋ': 'ṛ', 'ॠ': 'r̄',
    'ऌ': 'lṛ', 'ॡ': 'l̄', 'ए': 'e', 'ऐ': 'ai',
    'ओ': 'o', 'औ': 'au',
  },
  consonants: {
    'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ṅ',
    'च': 'c', 'छ': 'ch', 'ज': 'j', 'झ': 'jh', 'ञ': 'ñ',
    'ट': 'ṭ', 'ठ': 'ṭh', 'ड': 'ḍ', 'ढ': 'ḍh', 'ण': 'ṇ',
    'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
    'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
    'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v',
    'श': 'ś', 'ष': 'ṣ', 'स': 's', 'ह': 'h',
    
    // Special Sanskrit consonants
    'ळ': 'ḷ', // Retroflex lateral consonant
    'ऴ': 'ẓ', // Special Dravidian consonant used in Sanskrit
    'क्ष': 'kṣ', // Compound consonant
    'त्र': 'tr', // Compound consonant
    'ज्ञ': 'jñ', // Compound consonant
    'ऽ': "'", // Avagraha (elided vowels)
    'ॐ': 'ōṁ', // Sacred Om symbol
  },
  joiners: {
    '्': '', // Virama to suppress inherent vowels
  },
  modifiers: {
    'ा': 'ā', 'ि': 'i', 'ी': 'ī', 'ु': 'u', 'ू': 'ū',
    'ृ': 'ṛ', 'ॄ': 'r̄', 'े': 'e', 'ै': 'ai',
    'ो': 'o', 'ौ': 'au',
  },
  modifiers_two: {
    'ं': 'ṁ', 'ः': 'ḥ',
    'ँ': 'ṁ', // Chandrabindu
    '॑': '^', // Udatta (Vedic intonation)
    '॒': '_', // Anudatta (Vedic intonation)
  },
  chillu: {

  },
  numerals: {
    '०': '0', '१': '1', '२': '2', '३': '3',
    '४': '4', '५': '5', '६': '6', '७': '7',
    '८': '8', '९': '9',
  },
  punctuation: {
    '।': '|', '॥': '||', ' ': ' ',
  }
};

export default sanskritEnglishMapping;