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
import { convertPdfToImages } from "../utils/PdfToImageConverter";
import { extractFileMetaData } from "../utils/ExtractFileMetaData";
import { DisplayMetaData } from "../components/DisplayFileMetaData";

// Page Component Imports
import MetaTags from "../../../components/layouts/meta_tags";
import ImageOcrViewer from "../utils/ImageOcrViewer";

// Asset Imports
import imageLibrary from "../../../components/utils/image_library";

// Content Import
import { allDemos } from "../../../../.contentlayer/generated/index.mjs";

const OcrImagePDF = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [uploadedPdf, setUploadedPdf] = useState([]);
  const [pdfDetails, setPdfDetails] = useState(null);
  const [pdfImages, setPdfImages] = useState([]);
  const [pdfUploadError, setPdfUploadError] = useState("");
  const [processingError, setProcessingError] = useState("");
  const [ocrResults, setOcrResults] = useState([]);
  const [fileProgress, setFileProgress] = useState([]);

  const demo = allDemos.find((demo) => demo.slug === "ocr_images");

  // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const processPdfFile = async (file) => {
    if (!file) {
      setPdfUploadError("No file provided.");
      setIsUploading(false);
      return;
    }
  
    // Validate file type
    if (file.type !== "application/pdf") {
      setPdfUploadError("Only PDF files are allowed.");
      setIsUploading(false);
      return;
    }
  
    // Read the file and process it
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      try {
        const pdfImages = await convertPdfToImages(file);
        if (pdfImages.length > 10) {
          setPdfUploadError("The PDF must not have more than 10 pages.");
          setIsUploading(false);
          return;
        }
  
        setUploadedPdf(file);
        setPdfDetails({
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2) + " MB",
          pages: pdfImages.length,
        });
  
        const imageDetails = pdfImages.map((image) => ({
          file: image,
          name: image.name,
          type: image.type,
          size: (image.size / 1024).toFixed(2) + " KB",
        }));
  
        setPdfImages((prev) => [...prev, ...imageDetails]);
      } catch (error) {
        setPdfUploadError("Failed to process the PDF. Ensure it's image-based. " + error.message);
      }
      setIsUploading(false);
    };
  
    fileReader.onerror = () => {
      setPdfUploadError("Error reading the PDF file.");
      setIsUploading(false);
    };
  
    fileReader.readAsArrayBuffer(file);
  };

  const handleFileUpload = (e) => {
    setIsUploading(true);
    setPdfUploadError("");
    const file = e.target.files[0];
    processPdfFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUploading(true);
    setPdfUploadError("");
    const file = e.dataTransfer.files[0];
    processPdfFile(file);
  };

  const handleStartOver = () => {
    setIsUploading(false);
    setIsProcessing(false);
    setProcessed(false);
    setUploadedPdf(null);
    setPdfImages([]);
    setPdfUploadError("");
    setProcessingError("");
    setOcrResults([]);
  };

  const processPdf = async () => {
    if (!uploadedPdf || pdfImages.length === 0) {
      setProcessingError("No valid PDF to process.");
      return;
    }

    console.log("pdfImages.length:", pdfImages.length);
    if(uploadedPdf){
      console.log("uploadedPdf is present");
    }

    setProcessed(false)
    setIsProcessing(true);
    setProcessingError("");

    // Initialize progress for each file
    setFileProgress(Array(pdfImages.length).fill(0));
  
    try {
      const files = pdfImages.map((img) => img.file);
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
      console.log("Failed to extract text from PDF." + error);
      setProcessingError("Failed to extract text from PDF." + error);
    }

    setIsProcessing(false);
  };

  const downloadResults = async () => {
    const zip = new JSZip();
    ocrResults.forEach(({ name, text }, index) => {
      zip.file(`Page-${index + 1}.txt`, text);
    });
    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `${uploadedPdf.name.replace(".pdf", "")}-ocr-results.zip`);
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
        Extract Text from Image-Based PDFs &nbsp;
          <Typography component="span" variant="h2" color="primary.main" sx={{ fontWeight: "inherit", p: "0px !important" }}>
            Using OCR
          </Typography>
        </Typography>
        <Typography color="text.primary" variant="body1" sx={{ textAlign: "center", maxWidth: "70%" }}>
          Upload a PDF, extract text from image-based pages using OCR, and download the results."
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
              Upload PDF
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", p: 2 }}>
              Upload a PDF file with fewer than 100 pages. The tool will extract text from image-based pages.
            </Typography>

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
                  Upload PDF File
                  <input type="file" hidden onChange={handleFileUpload} accept="application/pdf" />
                </Button>

                {isUploading && (
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
                    <CircularProgress />
                    <Typography variant="body2" sx={{ marginLeft: 2 }}>
                      Uplading ...
                    </Typography>
                  </Box>
                )}
                
                {pdfUploadError && (
                  <Typography color="error" variant="caption">
                    {pdfUploadError}
                  </Typography>
                )}
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
                  Drag and drop your <Chip label='PDF File' color="primary" /> here or click the 'Upload PDF File' button to browse from your computer.
                </Typography>
              </Box>
            )}

            {uploadedPdf && pdfDetails && (
              <Box
                sx={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  padding: 1,
                  "&::-webkit-scrollbar": { width: "6px" },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#bbb",
                    borderRadius: "3px",
                  },
                }}
              >
                <List>
                  <ListItem
                    key={pdfDetails.name}
                    secondaryAction={
                      <IconButton edge="end" onClick={handleStartOver}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <Box>
                      <Typography variant="body2" sx={{ color: "primary.main" }}>
                        <strong>{pdfDetails.name}</strong>
                      </Typography>
                      <Typography variant="body2">
                        Size: <strong>{pdfDetails.size}</strong>, Pages: <strong>{pdfDetails.pages}</strong>
                      </Typography>
                    </Box>
                  </ListItem>
                </List>
              </Box>
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
              Once you have uploaded the PDF file, the "Extract Text" button will be enabled. Click on it to start extracting. 
            </Typography>

            <Divider sx={{mb: 2}}></Divider>

            {isProcessing ? (
              <div>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
                  <CircularProgress />
                  <Typography variant="body2" sx={{ marginLeft: 2 }}>
                    Processing PDF...
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
                    {pdfImages.map((img, index) => (
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
              <div>
                <Button
                  variant="contained"
                  color={pdfImages.length == 0 ? "action" : "secondary"}
                  onClick={processPdf}
                  disabled={pdfImages.length == 0}
                >
                  Extract Text
                </Button>
                {processingError && (
                  <div>
                    <br></br>
                    <Typography color="error" variant="caption" sx={{mt: 2}}>
                      {processingError}
                    </Typography>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {ocrResults.length > 0 && (
                  <div>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<DownloadIcon />}
                      onClick={downloadResults}
                      sx={{ ml: 2, mt: 2, color: "#fff" }}
                    >
                      Download Results in a Text File
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
            (pdfImages.length > 0 && ocrResults.length > 0) && (
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
                {/* <ImageOcrViewer images={pdfImages.map((img) => URL.createObjectURL(img.file))} ocrTexts={ocrResults.map((x) => x.text)} /> */}
                {/* <ImageOcrViewer 
                  images={pdfImages.map((img) => {
                    if (img.file instanceof Blob || img.file instanceof File) {
                      return URL.createObjectURL(img.file);
                    } else {
                      console.error("Invalid file for createObjectURL:", img.file);
                      return null; // Return null for invalid items
                    }
                  })} 
                  ocrTexts={ocrResults.map((x) => x.text)} 
                /> */}
                <ImageOcrViewer
                  images={pdfImages.map((img) => img.file)} // Pass File or Blob objects
                  ocrTexts={ocrResults.map((x) => x.text)} // Extracted OCR texts
                />
              </Paper>
            )
          }
        </Box>
      </Box>
    </div>
  );
};

export default OcrImagePDF;