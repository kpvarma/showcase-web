import React, { useState } from "react";

// UI Imports
import { Box, Button, Typography, List, ListItem, CircularProgress, IconButton, Paper, Divider, Chip } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LinearProgress from '@mui/material/LinearProgress';

// Utility Imports
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ExtractTextFromImages } from "../utils/ExtractTextFromImages";

// Page Component Imports
import MetaTags from "../../../components/layouts/meta_tags";
import ImageOcrViewer from "../utils/ImageOcrViewer";

// Asset Imports
import imageLibrary from "../../../components/utils/image_library";

// Content Import
import { allDemos } from "../../../../.contentlayer/generated/index.mjs";

const OcrImages = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imagesUploadError, setImagesUploadError] = useState("");
  const [processingError, setProcessingError] = useState("");
  const [ocrResults, setOcrResults] = useState([]);
  const [fileProgress, setFileProgress] = useState([]);

  const demo = allDemos.find((demo) => demo.slug === "ocr_images");

  // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleFileUpload = (e) => {
    setIsUploading(true);
    setIsProcessing(false);
    setImagesUploadError("");
  
    const newFiles = Array.from(e.target.files);
  
    const { error, validImages } = processFiles(newFiles);
  
    if (error) {
      setImagesUploadError(error);
      setIsUploading(false);
      return;
    }
  
    const imageDetails = validImages.map((file) => ({
      file,
      name: file.name,
      type: file.type,
      size: (file.size / 1024).toFixed(2) + " KB",
    }));
  
    setUploadedImages((prev) => [...prev, ...imageDetails]);
    setIsUploading(false);
  };

  const handleDrop = (e) => {
    setIsUploading(true);
    setIsProcessing(false);
    setImagesUploadError("");
  
    const newFiles = Array.from(e.dataTransfer.files);
  
    const { error, validImages } = processFiles(newFiles);
  
    if (error) {
      setImagesUploadError(error);
      setIsUploading(false);
      return;
    }
  
    const imageDetails = validImages.map((file) => ({
      file,
      name: file.name,
      type: file.type,
      size: (file.size / 1024).toFixed(2) + " KB",
    }));
  
    setUploadedImages((prev) => [...prev, ...imageDetails]);
    setIsUploading(false);
  };

  const handleRemoveImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setImagesUploadError("")
    setUploadedImages([]);
    setOcrResults([]);
  };
  
  const handleStartOver = () => {
    setIsUploading(false);
    setIsProcessing(false);
    setProcessed(false);
    setUploadedImages([]);
    setImagesUploadError("");
    setProcessingError("");
    setOcrResults([]);
  };

  const processFiles = (files) => {
    const existingFiles = uploadedImages.map((img) => img.file);
  
    // Check for duplicates
    const duplicateFiles = files.filter((newFile) =>
      existingFiles.some(
        (existingFile) =>
          existingFile.name === newFile.name && existingFile.size === newFile.size
      )
    );
  
    if (duplicateFiles.length > 0) {
      return { error: "Duplicate file(s) will be ignored.", validImages: [] };
    }
  
    // Filter valid images
    const validImages = files.filter((file) => file.type.startsWith("image/"));
  
    if (validImages.length < files.length) {
      return { error: "Non image files will be ignored.", validImages };
    }
  
    // Check if total exceeds 10 images
    const totalImages = uploadedImages.length + validImages.length;
    if (totalImages > 10) {
      return { error: "Only 10 images can be uploaded at a time.", validImages: [] };
    }
  
    return { error: "", validImages };
  };

  const processImages = async () => {
    if (uploadedImages.length === 0) {
      setProcessingError("No images to process.");
      return;
    }

    setIsProcessing(true);
    setProcessingError("");

    // Initialize progress for each file
    setFileProgress(Array(uploadedImages.length).fill(0));

    try {
      const files = uploadedImages.map((img) => img.file);

      const results = [];
      for (let i = 0; i < files.length; i++) {
        const result = await ExtractTextFromImages([files[i]], (progress) => {
          setFileProgress((prev) => {
            const updated = [...prev];
            updated[i] = Math.round(progress.progress * 100); // Update progress for the current file
            return updated;
          });
        });
        results.push(...result); // Add result to the final array
      }
      setOcrResults(results);
      setProcessed(true);
    } catch (error) {
      setProcessingError("Failed to process images for OCR." + error);
    }

    setIsProcessing(false);
    setProcessed(true);
  };

  const downloadIndividualTextFile = (fileName, content) => {
    const tempFileName = fileName.replace(/\.[^/.]+$/, ".txt"); // Change extension to .txt
  
    const blob = new Blob([content], { type: "text/plain" }); // Create a Blob with text content
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = tempFileName;
    document.body.appendChild(link); // Append the link to the body (required for some browsers)
    link.click();
    document.body.removeChild(link); // Clean up the DOM
  };

  const downloadResults = async () => {
    const zip = new JSZip();

    ocrResults.forEach(({ name, text }) => {
      zip.file(name, text);
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "ocr-results.zip");
  };

  const stitchAndDownload = () => {
    if (ocrResults.length === 0) {
      console.error("No OCR results available to stitch.");
      return;
    }
  
    // Stitch all text files together with delimiters
    const stitchedContent = ocrResults
      .map(({ name, text }) => `File: ${name}\n${text}\n---------------------------------------------------\n`)
      .join(""); // Combine all content
  
    const blob = new Blob([stitchedContent], { type: "text/plain" }); // Create Blob
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "stitched-ocr-results.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up the DOM
  };

  return (
    <div>
      <MetaTags
        title={demo.title}
        description={demo.summary}
        url={`/demos/${demo.slug}`}
        image={imageLibrary.getDemoImage(demo.cover_image)}
      />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: 2, pb: 40 }}>
        <Typography variant="h2" sx={{ color: "text.primary", mb: 2, textAlign: "center" }}>
          Extract Text from Images&nbsp;
          <Typography component="span" variant="h2" color="primary.main" sx={{ fontWeight: "inherit", p: "0px !important" }}>
            Using OCR
          </Typography>
        </Typography>
        <Typography color="text.primary" variant="body1" sx={{ textAlign: "center", maxWidth: "70%" }}>
          Upload multiple images to extract text and download the results.
        </Typography>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 4, padding: 2, width: "100%" }}>
          {/* Left Box: Upload Section */}
          <Paper
            elevation={2}
            sx={{
              flex: 1,
              padding: 4,
              border: "1px solid #ddd",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              Upload Images
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", p: 2 }}>
              Drag and drop your image files here, or use the upload button to select images from your device. You can add multiple images and extract text from them together.
            </Typography>

            {/* <Divider sx={{mb: 4}}></Divider> */}

            { !processed && (
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
                  handleDrop(e);
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<FileUploadIcon />}
                  sx={{ width: '100%' }}
                >
                  Upload Image Files
                  <input type="file" hidden onChange={handleFileUpload} accept="image/*" multiple />
                </Button>

                {isUploading && (
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
                    <CircularProgress />
                    <Typography variant="body2" sx={{ marginLeft: 2 }}>
                      Uplading ...
                    </Typography>
                  </Box>
                )}
                
                {imagesUploadError && (
                  <Typography color="error" variant="caption">
                    {imagesUploadError}
                  </Typography>
                )}
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
                  Drag and drop your <Chip label='Image Files' color="primary" /> here or click the 'Upload Image Files' button to browse from your computer.
                </Typography>
              </Box>
            )}

            {uploadedImages.length > 0 && (
              <Box
                sx={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  padding: 1,
                  "&::-webkit-scrollbar": { width: "6px" }, // Optional: Customize scrollbar for webkit browsers
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#bbb",
                    borderRadius: "3px",
                  },
                }}
              >
                <List>
                  {uploadedImages.map((img, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton edge="end" onClick={() => handleRemoveImage(index)}>
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <Box>
                        <Typography variant="body2" sx={{ color: "primary.main" }}><strong>{img.name}</strong></Typography>
                        <Typography variant="body2">
                          {img.type}, <strong>{img.size}</strong>
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {!processed && uploadedImages.length > 0 && (
              <Button variant="outlined" color="secondary" onClick={handleClearAll}>
                Clear All
              </Button>
            )}

            {processed && (
              <Button variant="contained" color="primary" onClick={handleStartOver} startIcon={<RestartAltIcon />}>
                Start Over
              </Button>
            )}
          </Paper>

          {/* Right Box: Process Section */}
          <Paper
            elevation={2}
            sx={{
              flex: 1,
              padding: 4,
              border: "1px solid #ddd",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              Extract Text
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", p: 2 }}>
              Once you have uploaded all the images, the "Extract Text" button will be enabled. Click on it to start extracting. 
            </Typography>

            <Divider sx={{mb: 2}}></Divider>

            {isProcessing ? (
              <div>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
                  <CircularProgress />
                  <Typography variant="body2" sx={{ marginLeft: 2 }}>
                    Processing Images...
                  </Typography>
                </Box>
                <Box
                  sx={{
                    maxHeight: "300px", // Limit height to enable scrolling
                    overflowY: "auto", // Allow vertical scrolling
                    padding: 1,
                    "&::-webkit-scrollbar": { width: "6px" }, // Customize scrollbar width
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#bbb", // Customize scrollbar color
                      borderRadius: "3px", // Add rounding to the scrollbar
                    },
                  }}
                >
                  <List>
                    {uploadedImages.map((img, index) => (
                      <ListItem key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", }}>
                        <Typography variant="body2" sx={{ textAlign: "right", fontWeight: "bold", color: "text.secondary", }}> 
                          <strong>Page {index + 1}</strong>
                        </Typography>
                        
                        {/* Progress Bar */}
                        <Box sx={{ flex: 1, margin: "0 16px" }}>
                          <LinearProgress
                            variant="determinate"
                            value={fileProgress[index] || 0}
                            sx={{ height: "8px", borderRadius: "4px" }} // Slightly thicker progress bar with rounded corners
                          />
                        </Box>

                        {/* Percentage Display */}
                        <Typography variant="body2" sx={{ width: "10%", textAlign: "right", fontWeight: "bold", color: "text.primary",}}>
                          <emphasis>{fileProgress[index] || 0}%</emphasis>
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </div>
            ) : (ocrResults.length == 0) ? (
              <Button
                variant="contained"
                color={uploadedImages.length === 0 ? "action" : "secondary"}
                onClick={processImages}
                disabled={uploadedImages.length === 0}
              >
                Extract Text
              </Button>
            ) : (
              <div>
                {processingError && (
                  <Typography color="error" variant="caption">
                    {processingError}
                  </Typography>
                )}
                {ocrResults.length > 0 && (
                  <div>
                    {/* List of Generated Text Files */}
                    <Box
                      sx={{
                        maxHeight: "300px",
                        overflowY: "auto",
                        padding: 1,
                        "&::-webkit-scrollbar": { width: "6px" }, // Optional: Customize scrollbar for webkit browsers
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "#bbb",
                          borderRadius: "3px",
                        },
                      }}
                    >
                      <List>
                        {ocrResults.map((result, index) => {
                          const text = result.text
                          const characterCount = text ? text.length : 0; // Number of characters. Default to 0 if text is undefined
                          const predictedSize = (characterCount + 10) / 1024; // Approx. size in KB (adding metadata overhead)

                          return (
                            <ListItem
                              key={index}
                              secondaryAction={
                                <IconButton
                                  edge="end"
                                  onClick={() => downloadIndividualTextFile(uploadedImages[index].name, text)}
                                >
                                  <DownloadIcon />
                                </IconButton>
                              }
                            >
                              <Box>
                                {/* Temporary Text File Name */}
                                <Typography variant="body2" sx={{ color: "primary.main" }}>
                                  <strong>{uploadedImages[index].name.replace(/\.[^/.]+$/, ".txt")}</strong>
                                </Typography>
                                <Typography variant="body2">
                                  Characters: <strong>{characterCount}</strong>, Size:{" "}
                                  <strong>{predictedSize.toFixed(2)} KB</strong>
                                </Typography>
                              </Box>
                            </ListItem>
                          );
                        })}
                      </List>
                    </Box>

                    {/* Zip & Download All Button */}
                    <Button
                      variant="contained"
                      color="info"
                      startIcon={<DownloadIcon />}
                      onClick={downloadResults}
                      sx={{ mt: 2, color: "#fff" }}
                    >
                      Zip & Download them All
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<DownloadIcon />}
                      onClick={stitchAndDownload}
                      sx={{ ml: 2, mt: 2, color: "#fff" }}
                    >
                      Stitch & Download
                    </Button>
                  </div>
                )}
              </div>
            )}
            
          </Paper>
        </Box>

        {/* Output Preview */}
        <Box sx={{ mt: 4, width: "100%" }}>
          {
            (uploadedImages.length > 0 && ocrResults.length > 0) && (
              <Paper
                elevation={2}
                sx={{
                  flex: 1,
                  padding: 4,
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <ImageOcrViewer images={uploadedImages.map((img) => URL.createObjectURL(img.file))} ocrTexts={ocrResults.map((x) => x.text)} />
              </Paper>
            )
          }
        </Box>
      </Box>
    </div>
  );
};

export default OcrImages;