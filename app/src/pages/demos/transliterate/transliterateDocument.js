import React, { useState, useRef } from 'react';

// UI Imports
import { Link } from 'react-router-dom';
import { Box, Grid, Typography, Paper, Button, CircularProgress, Chip } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/Download';

// Utility Imports
import { transliterate } from './utils/transliterate';

// Page Component Imports
import TextFileViewer from '../../../components/utils/text_file_viewer';

// Data
const languages = [
  { value: 'english', label: 'English (Diacritical Marks)' },
  { value: 'malayalam', label: 'Malayalam' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'sanskrit', label: 'Sanskrit' },
  { value: 'tamil', label: 'Tamil' },
];

const DisplayMetadata = ({ fileMetadata }) => {
  return (
    <Box
      sx={{
        width: '100%',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1, // Space between rows
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 'bold', flexShrink: 0 }}>
          Name:
        </Typography>
        <Typography variant="body2">{fileMetadata.name}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 'bold', flexShrink: 0 }}>
          Size:
        </Typography>
        <Typography variant="body2">{fileMetadata.size}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 'bold', flexShrink: 0 }}>
          Type:
        </Typography>
        <Typography variant="body2">{fileMetadata.type}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 'bold', flexShrink: 0 }}>
          Created At:
        </Typography>
        <Typography variant="body2">{fileMetadata.createdAt}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 'bold', flexShrink: 0 }}>
          Number of Pages:
        </Typography>
        <Typography variant="body2">{fileMetadata.pages}</Typography>
      </Box>
    </Box>
  );
};

const TransliterateDocument = () => {
  const [selectedInputLanguage, setSelectedInputLanguage] = useState('malayalam');
  const [selectedOutputLanguage, setSelectedOutputLanguage] = useState('english');
  const [languageSelectionError, setLanguageSelectionError] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [outputFile, setOutputFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileError, setFileError] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [fileMetadata, setFileMetadata] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleFileDrop = (file) => {
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const validateAndProcessFile = (file) => {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'txt' && fileExtension !== 'rtf') {
      setFileError('Only .txt and .rtf files are allowed.');
      return;
    }

    if (selectedInputLanguage == selectedOutputLanguage) {
      setLanguageSelectionError('Both input and output language cannot be same.');
      return;
    } else {
      setLanguageSelectionError('');
    }

    setFileError('');
    setUploadedFile(file);
    setUploadedFileName(file.name);
    extractFileMetadata(file);
    parseAndTransliterateFile(file);
  };

  const extractFileMetadata = async (file) => {
    const metadata = {};
  
    // Validate file type
    const allowedTypes = ['text/plain', 'application/rtf'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Unsupported file type. Please upload a .txt or .rtf file.');
    }
  
    metadata.name = file.name;
    metadata.size = (file.size / 1024).toFixed(2) + ' KB';
    metadata.type = file.type;
    metadata.createdAt = file.lastModified
      ? new Date(file.lastModified).toLocaleString()
      : 'Unknown';
  
    const fileReader = new FileReader();
  
    // Handle .txt files
    if (file.type === 'text/plain') {
      fileReader.onload = (e) => {
        const content = e.target.result;
  
        // Calculate line and word count
        const lines = content.split(/\r?\n/);
        metadata.lines = lines.length;
        metadata.words = content.split(/\s+/).filter(Boolean).length;
  
        setFileMetadata(metadata); // Store metadata in state
        // console.log(metadata);
      };
      fileReader.readAsText(file);
    }
  
    // Handle .rtf files (basic parsing example)
    if (file.type === 'application/rtf') {
      fileReader.onload = (e) => {
        const content = e.target.result;
  
        // RTF parsing can be extended; here we count lines and words in raw content
        const textContent = content.replace(/\\[a-zA-Z]+\d? ?/g, '').replace(/[\{\}]/g, ''); // Remove RTF tags
        const lines = textContent.split(/\r?\n/);
        metadata.lines = lines.length;
        metadata.words = textContent.split(/\s+/).filter(Boolean).length;
  
        setFileMetadata(metadata); // Store metadata in state
        // console.log(metadata);
      };
      fileReader.readAsText(file);
    }
  };

  const parseAndTransliterateFile = async (file) => {
    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = async (e) => {
      const fileContent = e.target.result;
      const lines = fileContent.split('\n');
      const outputLines = lines.map((line) =>
        transliterate(line, selectedInputLanguage, selectedOutputLanguage)
      );

      // console.log("selectedInputLanguage: ", selectedInputLanguage)
      // console.log("selectedOutputLanguage: ", selectedOutputLanguage)
      // console.log("outputLines: ", outputLines)

      const outputContent = outputLines.join('\n');
      const outputBlob = new Blob([outputContent], { type: 'text/plain' });
      const outputUrl = URL.createObjectURL(outputBlob);
      setOutputFile(outputUrl);
      setIsLoading(false);
    };

    reader.readAsText(file);
  };

  const handleLanguageChange = (type, value) => {
    if (type === 'input') {
      setSelectedInputLanguage(value);
    } else if (type === 'output') {
      setSelectedOutputLanguage(value);
    }

    // console.log(languageSelectionError);

    if (selectedInputLanguage == selectedOutputLanguage) {
      setLanguageSelectionError('Both input and output language cannot be same.');
      return;
    } else {
      setLanguageSelectionError('');
    }

    if (uploadedFile) {
      parseAndTransliterateFile(uploadedFile);
    }
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
          Transliterate Document in &nbsp;
          <Typography component="span" variant="h2" color="primary.main" sx={{ fontWeight: "inherit", p: "0px !important" }}>
            Indian Languages
          </Typography>
        </Typography>
        <Typography color="text.primary" variant="body1" sx={{ textAlign: 'center', maxWidth: '70%' }}>
          This tool allows you to transliterate text from one Indian language to another or to English with diacritical marks. 
          Simply type or paste the text in the input box, select the input and output languages, and click on <strong>Transliterate</strong>.
        </Typography>
        <Typography color="text.primary" variant="body1" sx={{ textAlign: 'center', mb: 0, maxWidth: '70%' }}>
          If you’d prefer to paste text for transliteration, you can use the <Link to="/demos/transliterate">text transliteration tool</Link>.
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
                  onChange={(e) => handleLanguageChange('input', e.target.value)}
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
              
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: 'divider',
                  borderRadius: 2,
                  padding: 2,
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9',
                  '&:hover': {
                    backgroundColor: '#f3f3f3',
                  },
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleFileDrop(e.dataTransfer.files[0]);
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<FileUploadIcon />}
                  sx={{ width: '100%' }}
                >
                  Upload or Drag File Here
                  <input type="file" hidden onChange={handleFileUpload} accept=".txt, .rtf" />
                </Button>
                {fileError && (
                  <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                    {fileError}
                  </Typography>
                )}
                {uploadedFileName && (
                  <Typography variant="body1" sx={{ color: 'text.secondary', mt: 4 }}>
                    Uploaded: {uploadedFileName}
                  </Typography>
                )}
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
                  Drag and drop a <Chip label='.txt' color="primary" /> or <Chip label='.rtf' color="primary" /> file here or click to upload.
                </Typography>
              </Box>

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
                  onChange={(e) => handleLanguageChange('output', e.target.value)}
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
                {fileMetadata && (
                  <DisplayMetadata fileMetadata={fileMetadata}></DisplayMetadata>
                )}

                {/* {selectedInputLanguage && (
                  <Typography color="success" variant="caption" sx={{ p: 2 }}>
                    {selectedInputLanguage}
                  </Typography>
                )}

                {selectedOutputLanguage && (
                  <Typography color="success" variant="caption" sx={{ p: 2, textAlign: 'center' }}>
                    {selectedOutputLanguage}
                  </Typography>
                )} */}

                
                {languageSelectionError && (
                  <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                    {languageSelectionError}
                  </Typography>
                )}
                {isLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                  </Box>
                ) : outputFile ? (
                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<DownloadIcon />}
                      href={outputFile}
                      download={`transliterated_${uploadedFileName}`}
                    >
                      Download Output File
                    </Button>
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                    The transliterated file will be available for download here after processing.
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Preview Text File */}
        {outputFile && (
          <Grid container spacing={0} sx={{ maxWidth: '100%', justifyContent: 'center', mb: 20}} >
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
                <TextFileViewer file={outputFile} />
              </Paper>
            </Grid>
          </Grid>
        )}

      </Box>

      

    </div>
  );
};

export default TransliterateDocument;