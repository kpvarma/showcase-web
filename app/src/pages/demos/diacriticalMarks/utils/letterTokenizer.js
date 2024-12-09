import malayalamMapping from '../mappings/malayalam';
import sanskritMapping from '../mappings/sanskrit';
import hindiMapping from '../mappings/hindi';
import tamilMapping from '../mappings/tamil';

// Mapping languages to their respective mappings
const languageMappings = {
  malayalam: malayalamMapping,
  sanskrit: sanskritMapping,
  hindi: hindiMapping,
  tamil: tamilMapping,
};

// Helper: Dynamically load the mapping for the given language
const getLanguageMapping = (language) => {
  const mapping = languageMappings[language];
  if (!mapping) {
    throw new Error(`Mapping for language "${language}" not found.`);
  }
  return mapping;
};

// Check if a character is a standalone letter
const standAloneLetter = (char, { vowels, consonants, chillu, numerals, punctuation }) => {
  return vowels[char] || consonants[char] || chillu[char] || numerals[char] || punctuation[char];
};

function isSpecialCharacter(char) {
  // Define a set of special characters to check against
  const specialCharacters = ['\n', '\r', '\t', '\b', '\f', '\v'];

  // Check if the character is in the list
  return specialCharacters.includes(char);
}

// Tokenize input into meaningful chunks
const letterTokenizer = (input, language) => {
  const {
    vowels,
    consonants,
    joiners,
    modifiers,
    modifiers_two,
    chillu,
    numerals,
    punctuation,
  } = getLanguageMapping(language);

  
  console.log('Vowels: ' + JSON.stringify(vowels, null, 2));

  const tempStack = [];
  const tokens = [];
  let p = null;

  for (let i = 0; i < input.length; i++) {
    const c = input[i];

    // Push the first character or continue logic
    if (tempStack.length === 0 || joiners[c]) {
      tempStack.push(c);
      p = c;
      continue;
    }

    if (
      isSpecialCharacter(c) || 
      (standAloneLetter(p, { vowels, consonants, chillu, numerals, punctuation }) &&
        standAloneLetter(c, { vowels, consonants, chillu, numerals, punctuation })) ||
      (modifiers[p] && standAloneLetter(c, { vowels, consonants, chillu, numerals, punctuation })) ||
      modifiers_two[c]
    ) {
      const word = tempStack.join('');
      tokens.push(word);
      tempStack.length = 0; // Clear the stack
    }

    tempStack.push(c);
    p = c;
  }

  // Handle remaining characters
  if (tempStack.length > 0) {
    tokens.push(tempStack.join(''));
  }

  return tokens;
};

// Transliterate tokens to Romanized text
const transliterateToken = (tokens, language) => {
  const {
    vowels,
    consonants,
    joiners,
    modifiers,
    modifiers_two,
    chillu,
    numerals,
    punctuation,
  } = getLanguageMapping(language);

  const trans_tokens = [];
  for (let token of tokens) {
    const trans_chars = [];
    for (let char of token) {
      // Check in each mapping
      let trans_char = '';
      if (joiners.hasOwnProperty(char)) {
        trans_char = joiners[char];
      } else {
        trans_char =
          vowels[char] ||
          consonants[char] ||
          modifiers[char] ||
          modifiers_two[char] ||
          chillu[char] ||
          numerals[char] ||
          punctuation[char] ||
          char;
      }
      if (trans_char) {
        trans_chars.push(trans_char);
      }
    }
    if (consonants[token.charAt(token.length - 1)]) {
      trans_tokens.push(trans_chars.join('') + 'a');
    } else {
      trans_tokens.push(trans_chars.join(''));
    }
  }
  return trans_tokens;
};

export { letterTokenizer, transliterateToken };