import malayalamMapping from '../mappings/malayalam';
import hindiMapping from '../mappings/hindi';
import sanskritMapping from '../mappings/sanskrit';
import tamilMapping from '../mappings/tamil';

import { letterTokenizer, transliterateToken } from './letterTokenizer';

const languageMappings = {
  malayalam: malayalamMapping,
  hindi: hindiMapping,
  sanskrit: sanskritMapping,
  tamil: tamilMapping,
};

export const transliterate = (input, language) => {
  const mapping = languageMappings[language];

  if (!mapping) {
    console.warn(`No mapping found for language: ${language}`);
    return input; // Fallback: Return the original text
  }

  try {
    // Step 1: Tokenize the input
    const tokenizedLetters = letterTokenizer(input, language);
    console.log('tokenizedLetters:', tokenizedLetters);

    // Step 2: Transliterate tokens using the mapping
    const transliteratedTokens = transliterateToken(tokenizedLetters, language);
    console.log('transliteratedTokens:', transliteratedTokens);

    // Step 3: Join the transliterated tokens to form the final string
    return transliteratedTokens.join('');
  } catch (error) {
    console.error('Error during transliteration:', error);
    return input; // Return the original input in case of an error
  }
};