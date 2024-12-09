import React from 'react';
import DebugTokens from './components/debugTokens';

import { Box, Grid, Typography, Paper, Button } from '@mui/material';

const sampleSentences = [
  "പ്രഥമചരിത്രസ്യ",
  "ശിവം ശിവകരം ശാന്തം",
  "ഓം നമ ശിവായ",
  "ഓം ഖഡ്ഗം ചക്രഗദേഷുചാപപരിഘാഞ്ഛൂലം ഭുശുണ്ഡീം ശിരഃ",
  "ശംഖം സംദധതീം കരൈസ്ത്രിനയനാം സർവാങ്ഗഭൂഷാവൃതാം", 
  "നീലാശ്മദ്യുതിമാസ്യപാദദശാകാം സേവേ മഹാകാളികാം", 
  "യാമസ്തൗത്സ്വപിതേ ഹരൗ കമലജോ ഹന്തും മധും കൈടഭം"
];

const TransliterateSample = () => {
  const selectedInputLanguage = 'malayalam';
  const selectedOutputLanguage = 'english';
  return (
    <div>
      <Grid container spacing={1} sx={{ mt: 10, mb: 10, display: 'display' }}>
        {sampleSentences.map((sentence, index) => (
          <Grid item xs={12} sm={6} md={6} key={index} sx={{ pl: index % 2 === 0 ? 0 : undefined }}>
            <DebugTokens sentence={sentence} inputLanguage={selectedInputLanguage} outputLanguage={selectedOutputLanguage}  />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TransliterateSample;