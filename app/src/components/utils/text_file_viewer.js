import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const TextFileViewer = ({ file }) => {
  const [fileContent, setFileContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFileContent = async () => {
      if (!file) {
        setFileContent('');
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(file);
        const content = await response.text();
        setFileContent(content);
      } catch (error) {
        console.error('Error fetching file content:', error);
        setFileContent('Failed to load file content.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFileContent();
  }, [file]);

  return (
    <Box
      sx={{
        width: '100%',
        // maxWidth: 800,
        mx: 'auto',
        mt: 4,
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        backgroundColor: '#f9f9f9',
        minHeight: '300px',
        maxHeight: '80vh',
        overflowY: 'auto',
        whiteSpace: 'pre-wrap',
        fontFamily: 'monospace',
        wordBreak: 'break-word',
        textAlign: 'left',
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          {fileContent || 'No content to display.'}
        </Typography>
      )}
    </Box>
  );
};

export default TextFileViewer;