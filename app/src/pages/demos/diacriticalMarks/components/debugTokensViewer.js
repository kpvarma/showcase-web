import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import DebugTokens from '../components/debugTokens'; 

const DebugTokensViewer = ({ inputText }) => {
  // Split the input text into lines
  const items = inputText.split('\n').filter((line) => line.trim() !== '');

  // State to track the selected item
  const [selectedItem, setSelectedItem] = useState(items[0] || '');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        mt: 2,
        mb: 20
      }}
    >
      {/* Left Side: List of Items */}
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          padding: 2,
          overflowY: 'auto',
          maxHeight: '80vh',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Input Sentences
        </Typography>
        <List>
          {items.map((item, index) => (
            <ListItem
              key={index}
              button
              selected={item === selectedItem}
              onClick={() => setSelectedItem(item)}
              sx={{
                backgroundColor: 'white', // Set white background
                mb: 2,
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                  },
                },
              }}
            >
              <ListItemText
                primary={item}
                primaryTypographyProps={{
                  sx: { fontWeight: 'bold', textAlign: 'left' }, // Bold and left-align text
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Right Side: Details */}
      <Paper
        elevation={3}
        sx={{
          flex: 2,
          padding: 2,
          overflowY: 'auto',
          maxHeight: '80vh',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Transliteration and Tokens
        </Typography>
        {selectedItem ? (
          <DebugTokens sentence={selectedItem} showChipsInitialState={true}/>
        ) : (
          <Typography variant="body1" color="text.secondary">
            Enter input above to transliterate and view the tokens here.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default DebugTokensViewer;