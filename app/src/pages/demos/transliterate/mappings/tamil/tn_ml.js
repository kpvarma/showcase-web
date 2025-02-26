const tamilMalayalamMapping = {
  vowels: {
    'அ': 'അ', 'ஆ': 'ആ', 'இ': 'ഇ', 'ஈ': 'ഈ',
    'உ': 'ഉ', 'ஊ': 'ഊ', 'எ': 'എ', 'ஏ': 'ഏ',
    'ஐ': 'ഐ', 'ஒ': 'ഒ', 'ஓ': 'ഓ', 'ஔ': 'ഔ',
  },
  consonants: {
    'க': 'ക', 'ங': 'ങ', 
    'ச': 'ച', 'ஞ': 'ഞ', 
    'ட': 'ട', 'ண': 'ണ', 
    'த': 'ത', 'ந': 'ന', 
    'ப': 'പ', 'ம': 'മ',
    'ய': 'യ', 'ர': 'ര', 'ல': 'ല', 
    'வ': 'വ', 'ழ': 'ഴ', 'ள': 'ള',
    'ஸ': 'സ', 'ஷ': 'ഷ', 'ஹ': 'ഹ',
    'ஜ': 'ജ', 'க்ஷ': 'ക്ഷ',
  },
  joiners: {
    '்': '്', // Virama (Chandrakkala)
  },
  modifiers: {
    'ா': 'ാ', 'ி': 'ി', 'ீ': 'ീ', 
    'ு': 'ു', 'ூ': 'ൂ', 
    'ெ': 'െ', 'ே': 'േ', 'ை': 'ൈ',
    'ொ': 'ൊ', 'ோ': 'ോ', 'ௌ': 'ൌ',
  },
  modifiers_two: {
    'ஂ': 'ം', 'ஃ': 'ഃ', // Anusvara and Visarga
  },
  chillu: {
    // No direct chillu constructs
  },
  numerals: {
    '௦': '൦', '௧': '൧', '௨': '൨', '௩': '൩',
    '௪': '൪', '௫': '൫', '௬': '൬', '௭': '൭',
    '௮': '൮', '௯': '൯',
  },
  punctuation: {
    '।': '।', '॥': '॥', ' ': ' ',
  },
};

export default tamilMalayalamMapping;