import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import { transliterate } from './utils/transliterate';
import DebugTokens from './components/debugTokens';
import DebugTokensViewer from './components/debugTokensViewer';


const languages = [
  { value: 'malayalam', label: 'Malayalam' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'sanskrit', label: 'Sanskrit' },
  { value: 'tamil', label: 'Tamil' },
];

const sampleSentences = [
  "പ്രഥമചരിത്രസ്യ",
  "ശിവം ശിവകരം ശാന്തം",
  "ഓം നമ ശിവായ",
  "ഓം ഖഡ്ഗം ചക്രഗദേഷുചാപപരിഘാഞ്ഛൂലം ഭുശുണ്ഡീം ശിരഃ",
  "ശംഖം സംദധതീം കരൈസ്ത്രിനയനാം സർവാങ്ഗഭൂഷാവൃതാം", 
  "നീലാശ്മദ്യുതിമാസ്യപാദദശാകാം സേവേ മഹാകാളികാം", 
  "യാമസ്തൗത്സ്വപിതേ ഹരൗ കമലജോ ഹന്തും മധും കൈടഭം"

];

const RomanizeScriptsWithDiacriticalMarks = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('malayalam');
  const maxCharacters = 500; // Maximum characters allowed

  const handleTransliterate = () => {
    setOutputText(transliterate(inputText, selectedLanguage));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          padding: { xs: 0, sm: 0 },
          minHeight: '90vh',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
          Romanize Scripts With Diacritical Marks
        </Typography>
        <Grid
          container
          spacing={4}
          sx={{
            maxWidth: '100%',
            justifyContent: 'center',
          }}
        >
          {/* Input Section */}
          <Grid item xs={12} md={6} sx={{ pl: '0px !important' }}>
            <Paper
              elevation={1}
              sx={{
                padding: { xs: 3, sm: 4 },
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                height: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: { xs: 'flex-start', sm: 'center' },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Input Text
                </Typography>
                <Box
                  component="select"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  sx={{
                    padding: 1,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    fontSize: '1rem',
                    mt: { xs: 2, sm: 0 },
                  }}
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </Box>
              </Box>
              <textarea
                placeholder="Enter text here..."
                value={inputText}
                onChange={(e) =>
                  e.target.value.length <= maxCharacters && setInputText(e.target.value)
                }
                style={{
                  width: '100%',
                  minHeight: '250px',
                  maxHeight: '500px',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  resize: 'vertical',
                }}
              />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {inputText.length}/{maxCharacters} characters
              </Typography>
              <Button
                variant="contained"
                endIcon={<ChevronRightRoundedIcon />}
                onClick={handleTransliterate}
                sx={{
                  width: { xs: '100%', sm: 'fit-content' },
                  alignSelf: 'flex-start',
                }}
              >
                Transliterate
              </Button>
            </Paper>
          </Grid>

          {/* Output Section */}
          <Grid item xs={12} md={6} sx={{ pl: {xs: '0px !important', md: '16px !important'} }}>
            <Paper
              elevation={3}
              sx={{
                padding: { xs: 3, sm: 4 },
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                height: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: { xs: 'flex-start', sm: 'center' },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Transliteration Output
                </Typography>
                <Button
                  startIcon={<ContentCopyIcon />}
                  onClick={handleCopy}
                  disabled={!outputText}
                  sx={{
                    mt: { xs: 2, sm: 0 },
                    alignSelf: 'flex-end',
                    backgroundColor: 'action.hover',
                    ':hover': { backgroundColor: 'action.selected' },
                  }}
                >
                  Copy
                </Button>
              </Box>
              <Box
                sx={{
                  minHeight: '250px',
                  maxHeight: '500px',
                  overflowY: 'auto',
                  padding: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  backgroundColor: '#fff',
                  color: 'text.primary',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {outputText || 'The transliterated text will appear here...'}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, mt: {xs:6} }}>
        Translation and Tokens Viewer
      </Typography>
      <DebugTokensViewer inputText={inputText} />

      <Grid container spacing={1} sx={{ mt: 10, mb: 10, display: 'none' }}>
        {sampleSentences.map((sentence, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            key={index}
            sx={{
              pl: index % 2 === 0 ? 0 : undefined, // Remove padding-left for the leftmost grid items
            }}
          >
            <DebugTokens sentence={sentence} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RomanizeScriptsWithDiacriticalMarks;