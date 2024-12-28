import React, { useState } from 'react';
import axios from 'axios';

// UI Imports
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

// Content Import
import { allDemos } from '../../../../.contentlayer/generated/index.mjs';

// Page Component Imports
import MetaTags from '../../../components/layouts/meta_tags'

// Asset Imports
import imageLibrary from '../../../components/utils/image_library';

// API Endpoint (replace with your actual API endpoint)
const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/image-captioning/test`;

const ImageCaptioning = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState('');
  const [fileDetails, setFileDetails] = useState({});
  const [caption, setCaption] = useState('');
  const [relatedImages, setRelatedImages] = useState([]);
  const [error, setError] = useState('');

  let demo = allDemos.find((demo) => demo.slug === 'image_captioning_accessibility');

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    validateAndSetFile(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file) => {
    if (!file) {
      setError('No file selected.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed.');
      return;
    }
    setSelectedFile(file);
    setPreviewSrc(URL.createObjectURL(file));
    setFileDetails({ name: file.name, size: (file.size / 1024).toFixed(2) + ' KB', type: file.type });
    setCaption('');
    setRelatedImages([]);
    setError('');
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Please upload an image before submitting.');
      return;
    }

    setError('');
    setCaption('Fetching caption...');
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      console.log("API_ENDPOINT: ", API_ENDPOINT);
      console.log("formData: ", formData);

      const response = await axios.post(API_ENDPOINT, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log("response: ", response);
      console.log("response.data: ", response.data);
      console.log("response.data.caption: ", response.data.caption);

      setCaption(response.data.caption || 'No caption received.');
      setRelatedImages(response.data.relatedImages || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process the image.');
    }
  };

  return (
    <div>
      <MetaTags
        title={demo.title}
        description={demo.summary}
        url={`/demos/${demo.slug}`}
        image={imageLibrary.getDemoImage(demo.cover_image)}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: 4, minHeight: '90vh' }}>
        <Typography variant="h2" sx={{ color: "text.primary", mb: 2 }}>
          Image Captioning for the &nbsp;
          <Typography component="span" variant="h2" color="primary.main" sx={{ fontWeight: "inherit", p: "0px !important" }}>
          Visually Impaird
          </Typography>
        </Typography>
        <Typography color="text.primary" variant="body1" sx={{ textAlign: 'center', maxWidth: '70%' }}>
            Upload an image to generate a caption using AI. The caption will provide a description of the content in the image.
        </Typography>

        <Grid container spacing={4} sx={{ maxWidth: '100%', justifyContent: 'center' }}>
          {/* Left Box: Upload Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Upload Image
              </Typography>
              <Box
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                sx={{
                  border: '2px dashed #ccc',
                  borderRadius: 2,
                  padding: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                {/* <Typography variant="body2">Drag & Drop Image Here</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  or
                </Typography> */}
                <Button variant="contained" component="label" startIcon={<UploadFileIcon />}>
                  Upload or Drag File Here
                  <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                </Button>
              </Box>
              {selectedFile &&
                <div>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body2"><strong>Name:</strong> {fileDetails.name}</Typography>
                    <Typography variant="body2"><strong>Size:</strong> {fileDetails.size}</Typography>
                    <Typography variant="body2"><strong>Type:</strong> {fileDetails.type}</Typography>
                  </Box>
                </div>
              }
              {previewSrc && (
                <Box
                  component="img"
                  src={previewSrc}
                  alt="Uploaded Preview"
                  sx={{
                    width: '100%',
                    maxHeight: '300px',
                    objectFit: 'contain',
                    borderRadius: 2,
                    border: '1px solid #ccc',
                  }}
                />
              )}
            </Paper>
          </Grid>

          {/* Right Box: Preview and Details */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Image Preview & Caption
              </Typography>
              { selectedFile && 
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Generate Caption
                </Button>
              }
              {error && (
                <Typography variant="body2" sx={{ color: 'error.main', textAlign: 'center' }}>
                  {error}
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Caption and Related Images */}
        {caption && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Caption:
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
              {caption}
            </Typography>

            {relatedImages.length > 0 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Related Images:
                </Typography>
                <Grid container spacing={2}>
                  {relatedImages.map((image, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <Box
                        component="img"
                        src={image.url}
                        alt={image.caption}
                        sx={{ width: '100%', borderRadius: 2, boxShadow: 1 }}
                      />
                      <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
                        {image.caption}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default ImageCaptioning;