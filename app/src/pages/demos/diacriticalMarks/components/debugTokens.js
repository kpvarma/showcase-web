import React, { useState } from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { letterTokenizer, transliterateToken } from '../utils/letterTokenizer';

const DebugTokens = ({ sentence, showChipsInitialState=false }) => {
  const [showChips, setShowChips] = useState(showChipsInitialState);

  // Tokenize and transliterate the input sentence
  const tokenizedLetters = letterTokenizer(sentence, 'malayalam');
  const transliteratedTokens = transliterateToken(tokenizedLetters, 'malayalam');

  return (
    <Paper
      sx={{
        padding: 2,
        textAlign: 'left',
        borderRadius: 2,
        backgroundColor: 'background.default',
        boxShadow: 1,
        mb: 1,
      }}
    >
      {/* Sentence */}
      <Typography color="secondary" variant="body1" sx={{ fontWeight: 'bold', mb: 1, color: "primary.main" }}>
        {sentence}
      </Typography>

      {/* Transliterated Sentence */}
      <Typography color="secondary" variant="body1" sx={{ mb: 1 }}>
        {transliteratedTokens.join('')}
      </Typography>

      {/* "Show Tokens" Link */}
      <Box sx={{ textAlign: 'right', mb: 2 }}>
        <Typography
          variant="body2"
          component="a"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setShowChips((prev) => !prev);
          }}
          sx={{
            textDecoration: 'underline',
            color: 'primary.main',
            cursor: 'pointer',
          }}
        >
          {showChips ? 'Hide Tokens' : 'Show Tokens'}
        </Typography>
      </Box>

      {/* Toggleable Chips */}
      {showChips && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowX: 'auto', // Enable horizontal scrolling for both rows
            whiteSpace: 'nowrap',
            padding: 1,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          {/* Tokenized Letters and Transliteration Tokens */}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexDirection: 'column', // Ensure each line is on a new row
            }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              {tokenizedLetters.map((token, idx) => (
                <Chip key={idx} label={token} variant="outlined" />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {transliteratedTokens.map((token, idx) => (
                <Chip
                  key={`trans-${idx}`}
                  label={token}
                  variant="outlined"
                  sx={{
                    // backgroundColor: 'primary.main',
                    color: 'white',
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default DebugTokens;