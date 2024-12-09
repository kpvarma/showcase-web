import { letterTokenizer, transliterateToken } from './letterTokenizer';

// Mapping languages to their respective mappings
import languageMapping from './languageMapping';

export const transliterate = (input, inputLanguage, outputLanguage) => {

  // console.log("inputLanguage: ", inputLanguage)
  // console.log("outputLanguage: ", outputLanguage)
  const mapping = languageMapping(inputLanguage, outputLanguage);

  if (!mapping) {
    console.warn(`No mapping found for language: ${inputLanguage}`);
    return input; // Fallback: Return the original text
  }

  try {
    // Step 1: Tokenize the input
    const tokenizedLetters = letterTokenizer(input, inputLanguage, outputLanguage);
    // console.log('tokenizedLetters:', tokenizedLetters);

    // Step 2: Transliterate tokens using the mapping
    const transliteratedTokens = transliterateToken(tokenizedLetters, inputLanguage, outputLanguage);
    // console.log('transliteratedTokens:', transliteratedTokens);

    // Step 3: Join the transliterated tokens to form the final string
    return transliteratedTokens.join('');
  } catch (error) {
    console.error('Error during transliteration:', error);
    return input; // Return the original input in case of an error
  }
};