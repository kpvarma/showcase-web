const sanskritMalayalamMapping = {
  vowels: {
    'अ': 'അ', 'आ': 'ആ', 'इ': 'ഇ', 'ई': 'ഈ',
    'उ': 'ഉ', 'ऊ': 'ഊ', 'ऋ': 'ഋ', 'ॠ': 'ൠ',
    'ऌ': 'ഌ', 'ॡ': 'ൡ', 'ए': 'എ', 'ऐ': 'ഐ',
    'ओ': 'ഒ', 'औ': 'ഔ',
  },
  consonants: {
    'क': 'ക', 'ख': 'ഖ', 'ग': 'ഗ', 'घ': 'ഘ', 'ङ': 'ങ',
    'च': 'ച', 'छ': 'ഛ', 'ज': 'ജ', 'झ': 'ഝ', 'ञ': 'ഞ',
    'ट': 'ട', 'ठ': 'ഠ', 'ड': 'ഡ', 'ढ': 'ഢ', 'ण': 'ണ',
    'त': 'ത', 'थ': 'ഥ', 'द': 'ദ', 'ध': 'ധ', 'न': 'ന',
    'प': 'പ', 'फ': 'ഫ', 'ब': 'ബ', 'भ': 'ഭ', 'म': 'മ',
    'य': 'യ', 'र': 'ര', 'ल': 'ല', 'व': 'വ',
    'श': 'ശ', 'ष': 'ഷ', 'स': 'സ', 'ह': 'ഹ',
    'ळ': 'ള', // Retroflex lateral consonant
    'ऴ': 'ഴ', // Special Dravidian consonant
    'क्ष': 'ക്ഷ', // Compound consonant
    'त्र': 'ത്ര', // Compound consonant
    'ज्ञ': 'ജ്ഞ', // Compound consonant
    'ऽ': '--', // Placeholder for Avagraha
    'ॐ': 'ഓം', // Sacred Om symbol
  },
  joiners: {
    '्': '്', // Virama
  },
  modifiers: {
    'ा': 'ാ', 'ि': 'ി', 'ी': 'ീ', 'ु': 'ു', 'ू': 'ൂ',
    'ृ': 'ൃ', 'ॄ': 'ൄ', 'े': 'േ', 'ै': 'ൈ',
    'ो': 'ോ', 'ौ': 'ൌ',
  },
  modifiers_two: {
    'ं': 'ം', 'ः': 'ഃ',
    'ँ': 'ം', // Chandrabindu
    '॑': '--', // Placeholder for Udatta
    '॒': '--', // Placeholder for Anudatta
  },
  chillu: {
    // Malayalam doesn't have exact chillu-like constructs in Sanskrit
  },
  numerals: {
    '०': '൦', '१': '൧', '२': '൨', '३': '൩',
    '४': '൪', '५': '൫', '६': '൬', '७': '൭',
    '८': '൮', '९': '൯',
  },
  punctuation: {
    '।': '।', '॥': '॥', ' ': ' ',
  },
};

export default sanskritMalayalamMapping;