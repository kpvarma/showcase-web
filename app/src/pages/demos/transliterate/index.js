import React, { useState, useRef } from 'react';

// UI Imports
import { Link } from 'react-router-dom';
import { Box, Grid, Typography, Paper, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

// Utility Imports
import { transliterate } from './utils/transliterate';
import DebugTokens from './components/debugTokens';
import DebugTokensViewer from './components/debugTokensViewer';

// Data
const languages = [
  { value: 'english', label: 'English (Diacritical Marks)' },
  { value: 'malayalam', label: 'Malayalam' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'sanskrit', label: 'Sanskrit' },
  { value: 'tamil', label: 'Tamil' },
];

const Transliterate = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedInputLanguage, setSelectedInputLanguage] = useState('malayalam');
  const [selectedOutputLanguage, setSelectedOutputLanguage] = useState('english');
  const maxCharacters = 1000; // Maximum characters allowed

  // Scroll to DebugTokensViewer when the button is clicked
  const handleScrollToDebugTokens = () => {
    const element = document.getElementById('debug-tokens-viewer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTransliterate = () => {
    setOutputText(transliterate(inputText, selectedInputLanguage, selectedOutputLanguage));
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
        <Typography variant="h2" sx={{ color: "text.primary", mb: 2 }}>
          Transliterate Text in &nbsp;
          <Typography component="span" variant="h2" color="primary.main" sx={{ fontWeight: "inherit", p: "0px !important" }}>
            Indian Languages
          </Typography>
        </Typography>
        <Typography color="text.primary" variant="body1" sx={{ textAlign: 'center', maxWidth: '70%' }}>
          This tool allows you to transliterate text from one Indian language to another or to English with diacritical marks. 
          Simply type or paste the text in the input box, select the input and output languages, and click on <strong>Transliterate</strong>.
        </Typography>
        <Typography color="text.primary" variant="body1" sx={{ textAlign: 'center', mb: 0, maxWidth: '70%' }}>
          If you’d prefer to upload a document for transliteration, you can use the <Link to="/demos/transliterate_document">document transliteration tool</Link>.
        </Typography>
        <Grid container spacing={4} sx={{ maxWidth: '100%', justifyContent: 'center', }} >
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
              <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Enter Input Text Below
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: { xs: 'flex-start', sm: 'center' },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: { xs: 'center', sm: 'left' }, }}>
                  Select Input Language
                </Typography>
                <Box
                  component="select"
                  value={selectedInputLanguage}
                  onChange={(e) => setSelectedInputLanguage(e.target.value)}
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
                  alignSelf: 'flex-end',
                }}
              >
                Transliterate
              </Button>
            </Paper>
          </Grid>

          {/* Output Section */}
          <Grid item xs={12} md={6} sx={{ pl: {xs: '0px !important', md: '16px !important'} }}>
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
              <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Transliteration Output
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: { xs: 'flex-center', sm: 'center' },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: { xs: 'center', sm: 'left' }, }}>
                  Select Output Language
                </Typography>
                <Box
                  component="select"
                  value={selectedOutputLanguage}
                  onChange={(e) => setSelectedOutputLanguage(e.target.value)}
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
                <Button startIcon={<ContentCopyIcon />} onClick={handleCopy} disabled={!outputText} color="secondary" variant="text.secondary">
                  Copy
                </Button>
              </Box>
              <Box
                sx={{
                  minHeight: '250px',
                  maxHeight: '500px',
                  overflowY: 'auto',
                  // padding: 2,
                  // border: '1px solid',
                  // borderColor: 'divider',
                  // borderRadius: 1,
                  backgroundColor: 'primary',
                  color: 'text.primary',
                  whiteSpace: 'pre-wrap',
                }}
              >
                <textarea
                  placeholder="The transliterated text will appear here..."
                  value={outputText}
                  readOnly
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
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                click the button below to view each character tokens and its corresponding transliteration.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                endIcon={<KeyboardDoubleArrowDownIcon />}
                onClick={handleScrollToDebugTokens}
                sx={{
                  width: { xs: '100%', sm: 'fit-content' },
                  alignSelf: 'flex-end',
                }}
              >
                Debug Tokens
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Typography id="debug-tokens-viewer" color="text.secondary" variant="h4" sx={{ textAlign: 'center', mb: 4, mt: {xs:6} }}>
        Translation and Tokens Viewer
      </Typography>
      <DebugTokensViewer inputText={inputText} inputLanguage={selectedInputLanguage} outputLanguage={selectedOutputLanguage} />
      
    </div>
  );
};

export default Transliterate;