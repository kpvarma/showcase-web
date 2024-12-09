const malayalamToTamilMapping = {
  vowels: {
    'അ': 'அ', 'ആ': 'ஆ', 'ഇ': 'இ', 'ഈ': 'ஈ',
    'ഉ': 'உ', 'ഊ': 'ஊ', 'ഋ': '--', // No direct equivalent
    'ൠ': '--', // No direct equivalent
    'ഌ': '--', // No direct equivalent
    'ൡ': '--', // No direct equivalent
    'എ': 'எ', 'ഏ': 'ஏ', 'ഐ': 'ஐ', 'ഒ': 'ஒ',
    'ഓ': 'ஓ', 'ഔ': 'ஔ',
  },
  consonants: {
    'ക': 'க', 'ഖ': 'க', // Tamil doesn't differentiate aspirated stops
    'ഗ': 'க', 'ഘ': 'க', 'ങ': 'ங',
    'ച': 'ச', 'ഛ': 'ச', // Tamil doesn't differentiate aspirated stops
    'ജ': 'ஜ', 'ഝ': '--', // No direct equivalent
    'ഞ': 'ஞ', 'ട': 'ட', 'ഠ': 'ட',
    'ഡ': 'ட', 'ഢ': 'ட', 'ണ': 'ண',
    'ത': 'த', 'ഥ': 'த', 'ദ': 'த',
    'ധ': 'த', 'ന': 'ந',
    'പ': 'ப', 'ഫ': 'ப', 'ബ': 'ப',
    'ഭ': 'ப', 'മ': 'ம', 'യ': 'ய',
    'ര': 'ர', 'ല': 'ல', 'വ': 'வ',
    'ശ': 'ஷ', 'ഷ': 'ஷ', 'സ': 'ஸ', 'ഹ': 'ஹ',
    'ള': 'ள', 'ഴ': '--', // Placeholder for 'ഴ'
    'റ': 'ற', // Alveolar consonant in Tamil
  },
  joiners: {
    '്': '்', // Virama
  },
  modifiers: {
    '്': '்', 'ാ': 'ா', 'ി': 'ி', 'ീ': 'ீ', 'ു': 'ு', 'ൂ': 'ூ',
    'ൃ': '--', // No direct equivalent
    'ൄ': '--', // No direct equivalent
    'െ': 'ெ', 'േ': 'ே', 'ൈ': 'ை',
    'ൊ': 'ொ', 'ോ': 'ோ', 'ൌ': 'ௌ', 'ൗ': 'ௌ',
  },
  modifiers_two: {
    'ം': 'ம்', // Tamil anusvara
    'ഃ': 'ஃ', // Tamil aytham
  },
  chillu: {
    'ൽ': 'ல்', 'ൾ': 'ள', 'ൺ': 'ண',
    'ൻ': 'ந்', 'ർ': 'ர்', 'ൿ': 'க்',
  },
  numerals: {
    '൦': '௦', '൧': '௧', '൨': '௨', '൩': '௩',
    '൪': '௪', '൫': '௫', '൬': '௬', '൭': '௭',
    '൮': '௮', '൯': '௯',
  },
  punctuation: {
    '।': '।', '൏': '--', // Placeholder for '൏'
    ' ': ' ',
  },
};

export default malayalamToTamilMapping;