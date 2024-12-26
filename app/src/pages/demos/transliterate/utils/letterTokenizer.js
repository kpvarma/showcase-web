// Mapping languages to their respective mappings
import languageMapping from './languageMapping.js';

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
const letterTokenizer = (input, inputLanguage, outoutLanguage) => {
  const {
    vowels,
    consonants,
    joiners,
    modifiers,
    modifiers_two,
    chillu,
    numerals,
    punctuation,
  } = languageMapping(inputLanguage, outoutLanguage);

  
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
const transliterateToken = (tokens, inputLanguage, outputLanguage) => {
  const {
    vowels,
    consonants,
    joiners,
    modifiers,
    modifiers_two,
    chillu,
    numerals,
    punctuation,
  } = languageMapping(inputLanguage, outputLanguage);

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
      if(outputLanguage == 'english'){
        trans_tokens.push(trans_chars.join('') + 'a');
      } else {
        trans_tokens.push(trans_chars.join(''));
      }
    } else {
      trans_tokens.push(trans_chars.join(''));
    }
  }
  return trans_tokens;
};

export { letterTokenizer, transliterateToken };