import malayalamEnglishMapping from '../mappings/malayalam/ml_en.js';
import malayalamSanskritMapping from '../mappings/malayalam/ml_sa.js';
import malayalamHindiMapping from '../mappings/malayalam/ml_hi.js';
import malayalamTamilMapping from '../mappings/malayalam/ml_tn.js';

import sanskritEnglishMapping from '../mappings/sanskrit/sa_en.js';
import sanskritMalayalamMapping from '../mappings/sanskrit/sa_ml.js';
import sanskritHindiMapping from '../mappings/sanskrit/sa_hi.js';
import sanskritTamilMapping from '../mappings/sanskrit/sa_tn.js';

import hindiMalayalamMapping from '../mappings/hindi/hi_ml.js';
import hindiEnglishMapping from '../mappings/hindi/hi_en.js';
import hindiSanskritMapping from '../mappings/hindi/hi_sa.js';
import hindiTamilMapping from '../mappings/hindi/hi_tn.js';

import tamilEnglishMapping from '../mappings/tamil/tn_en.js';
import tamilMalayalamMapping from '../mappings/tamil/tn_ml.js';
import tamilSanskritMapping from '../mappings/tamil/tn_sa.js';
import tamilHindiMapping from '../mappings/tamil/tn_hi.js';

// Mapping languages to their respective mappings
const languageMappings = {
  malayalam: {
    english: malayalamEnglishMapping,
    sanskrit: malayalamSanskritMapping,
    hindi: malayalamHindiMapping,
    tamil: malayalamTamilMapping,
  },
  sanskrit: {
    english: sanskritEnglishMapping,
    malayalam: sanskritMalayalamMapping,
    hindi: sanskritHindiMapping,
    tamil: sanskritTamilMapping,
  },
  hindi: {
    english: hindiEnglishMapping,
    sanskrit: hindiSanskritMapping,
    malayalam: hindiMalayalamMapping,
    tamil: hindiTamilMapping,
  },
  tamil: {
    english: tamilEnglishMapping,
    sanskrit: tamilSanskritMapping,
    hindi: tamilHindiMapping,
    malayalam: tamilMalayalamMapping,
  },
};

/**
 * Function to return the correct mapping based on input and output language
 * @param {string} inputLanguage - The source language (e.g., 'malayalam', 'sanskrit', 'hindi', 'tamil')
 * @param {string} outputLanguage - The target language (e.g., 'english', 'sanskrit', 'hindi', 'tamil')
 * @returns {object} - The mapping object for the specified language pair
 */
export default function languageMapping(inputLanguage, outputLanguage) {
    if (!languageMappings[inputLanguage]) {
        throw new Error(`Input language "${inputLanguage}" not supported.`);
    }
    const mapping = languageMappings[inputLanguage][outputLanguage];
    if (!mapping) {
        throw new Error(`Mapping for "${inputLanguage}" => "${outputLanguage}" not found.`);
    }
    return mapping;
};