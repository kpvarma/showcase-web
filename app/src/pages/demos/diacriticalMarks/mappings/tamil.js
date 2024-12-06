const tamilMapping = {
    vowels: {
      'அ': 'a', 'ஆ': 'ā', 'இ': 'i', 'ஈ': 'ī',
      'உ': 'u', 'ஊ': 'ū', 'எ': 'e', 'ஏ': 'ē',
      'ஐ': 'ai', 'ஒ': 'o', 'ஓ': 'ō', 'ஔ': 'au',
    },
    consonants: {
      'க': 'k', 'ங': 'ṅ', 
      'ச': 'c', 'ஞ': 'ñ', 
      'ட': 'ṭ', 'ண': 'ṇ', 
      'த': 't', 'ந': 'n', 
      'ப': 'p', 'ம': 'm',
      'ய': 'y', 'ர': 'r', 'ல': 'l', 
      'வ': 'v', 'ழ': 'ḻ', 'ள': 'ḷ',
      'ஸ': 's', 'ஷ': 'ṣ', 'ஹ': 'h',
      'ஜ': 'j', 'க்ஷ': 'kṣ',
    },
    joiners: {
      '்': '' // Virama (pulli) to suppress inherent vowel
    },
    modifiers: {
      'ா': 'ā', 'ி': 'i', 'ீ': 'ī', 
      'ு': 'u', 'ூ': 'ū', 
      'ெ': 'e', 'ே': 'ē', 'ை': 'ai',
      'ொ': 'o', 'ோ': 'ō', 'ௌ': 'au',
    },
    modifiers_two: {
      'ஂ': 'ṁ', 'ஃ': 'ḥ' // Anusvara and Visarga
    },
    numerals: {
      '௦': '0', '௧': '1', '௨': '2', '௩': '3',
      '௪': '4', '௫': '5', '௬': '6', '௭': '7',
      '௮': '8', '௯': '9',
    },
    punctuation: {
      '।': '|', '॥': '||', ' ': ' ',
    },
  };
  
  export default tamilMapping;