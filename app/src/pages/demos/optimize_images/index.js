import React, { useState } from "react";

// UI Imports
import { Box, Button, Typography, List, ListItem, CircularProgress, IconButton, Paper, Divider } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import LinearProgress from '@mui/material/LinearProgress';

// Utility Imports
import JSZip from "jszip";
import { saveAs } from "file-saver";
import imageCompression from "browser-image-compression";

// Page Component Imports
import MetaTags from "../../../components/layouts/meta_tags";

// Asset Imports
import imageLibrary from "../../../components/utils/image_library";

// Content Import
import { allDemos } from "../../../../.contentlayer/generated/index.mjs";

const OptimizeAndZipImages = () => {
  const [images, setImages] = useState([]);
  const [optimizedImages, setOptimizedImages] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [imagesUploadError, setImagesUploadError] = useState("");
  const [processingError, setProcessingError] = useState("");

  const [compressionDetails, setCompressionDetails] = useState([]);
  const [totalOriginalSize, setTotalOriginalSize] = useState(0);
  const [totalOptimizedSize, setTotalOptimizedSize] = useState(0);

  const demo = allDemos.find((demo) => demo.slug === "stitch_pdfs");

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    const validImages = newFiles.filter((file) => file.type.startsWith("image/"));

    if (validImages.length < newFiles.length) {
      setImagesUploadError("Some files were not images and were ignored.");
    } else {
      setImagesUploadError("");
    }

    const imageDetails = validImages.map((file) => ({
      file,
      name: file.name,
      type: file.type,
      size: (file.size / 1024).toFixed(2),
    }));

    setImages((prevImages) => [...prevImages, ...imageDetails]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileUpload({ target: { files: droppedFiles } });
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setImages([]);
    setOptimizedImages([]);
    setIsLoading(false);
    setImagesUploadError(null);
    setProcessingError(null);
    setOptimizedImages([]);
    setCompressionDetails([]);
    setTotalOriginalSize(0);
    setTotalOptimizedSize(0);
  };

  const optimizeImages = async () => {
    if (images.length === 0) {
      setProcessingError("No images to optimize.");
      return;
    }
  
    setIsLoading(true);
    setImagesUploadError("");
  
    try {
      const options = {
        maxSizeMB: 1, // Maximum size in MB
        maxWidthOrHeight: 1024, // Resize to max width/height
        useWebWorker: true,
      };
  
      const compressionDetails = []; // Initialize an array to store compression details
      let totalOriginalSize = 0;
      let totalOptimizedSize = 0;
  
      const optimizedImages = await Promise.all(
        images.map(async ({ file }) => {
          const compressedFile = await imageCompression(file, options);
  
          // Calculate sizes
          const originalSizeKB = Number((file.size / 1024).toFixed(2)); // Ensure it's a number
          const compressedSizeKB = Number((compressedFile.size / 1024).toFixed(2)); // Ensure it's a number
          const savedSizeKB = Number((originalSizeKB - compressedSizeKB).toFixed(2)); // Ensure it's a number
          const savedSizePercent = Number(((savedSizeKB / originalSizeKB) * 100).toFixed(2)); // Ensure it's a number

          console.log("originalSizeKB: ", originalSizeKB)
          console.log("compressedSizeKB: ", compressedSizeKB)
          console.log("savedSizeKB: ", savedSizeKB)
          console.log("savedSizePercent: ", savedSizePercent)
  
          // Update totals
          totalOriginalSize += originalSizeKB;
          totalOptimizedSize += compressedSizeKB;
  
          // Append compression details to the array
          compressionDetails.push({
            name: file.name,
            type: file.type,
            originalSize: originalSizeKB,
            compressedSize: compressedSizeKB,
            savedSize: savedSizeKB,
            savedSizePercent,
          });
  
          return {
            original: {
              name: file.name,
              type: file.type,
              size: originalSizeKB,
            },
            optimized: {
              file: compressedFile,
              name: file.name,
              type: compressedFile.type || file.type,
              size: compressedSizeKB,
            },
          };
        })
      );
  
      // Store detailed size summary
      setCompressionDetails(compressionDetails);
      setTotalOriginalSize(totalOriginalSize);
      setTotalOptimizedSize(totalOptimizedSize);
      
      // Set optimized images for downloading
      setOptimizedImages(optimizedImages);

    } catch (err) {
      setProcessingError("Failed to optimize images.");
    }
  
    setIsLoading(false);
  };

  const downloadZip = async () => {
    const zip = new JSZip();

    optimizedImages.forEach(({ optimized }, index) => {
      zip.file(`optimized-${optimized.name}`, optimized.file, { base64: true });
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "optimized-images.zip");
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
        {/* Header Section */}
        <Typography variant="h2" sx={{ color: "text.primary", mb: 2, textAlign: "center" }}>
          <Typography component="span" variant="h2" color="primary.main" sx={{ fontWeight: "inherit", p: "0px !important" }}>
          Optimize Images
          </Typography>
          &nbsp; for Hosting
        </Typography>
        <Typography color="text.primary" variant="body1" sx={{ textAlign: "center", maxWidth: "70%" }}>
          Upload multiple images, compress them for web hosting, and download the optimized images as a zip file.
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
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              Upload Images
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", p: 2 }}>
              Drag and drop your image files here, or use the upload button to select images from your device. You can add multiple images and optimze them together.
            </Typography>
            <Divider/>

            <Button
              variant="contained"
              component="label"
              startIcon={<FileUploadIcon />}
              sx={{ m: 2 }}
            >
              Upload or Drag Files Here
              <input type="file" hidden onChange={handleFileUpload} accept="image/*" multiple />
            </Button>

            {imagesUploadError && (
              <Typography color="error" variant="caption">
                {imagesUploadError}
              </Typography>
            )}

            {images.length > 0 && (
              <Box
                sx={{
                  maxHeight: 300, // Set the max height of the container
                  overflow: "auto", // Enable scrolling when content overflows
                  border: "1px solid #ddd", // Optional: Add a border for better visibility
                  padding: 1, // Optional: Add some padding
                }}
              >
                <List>
                  {images.map((image, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton edge="end" onClick={() => handleRemoveImage(index)}>
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <Box>
                        <Typography variant="body2"><strong>{image.name}</strong></Typography>
                        <Typography variant="body2" sx={{ color: "secondary.main" }}>
                          {image.type}, <strong>{image.size}</strong>
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {images.length > 0 && (
              <Button variant="outlined" color="secondary" onClick={handleClearAll} sx={{m: 2}}>
                Clear All
              </Button>
            )}
          </Paper>

          {/* Right Box: Download Section */}
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
              Optimize them all
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", p: 2 }}>
              Once you have uploaded all the images you want to optimize, the "Start Optimizing" button will be enabled. Click on it to zip the optimized files and download. 
            </Typography>
            <Divider/>

            {processingError && (
              <div>
                <br></br>
                <Typography color="error" variant="caption">
                  {processingError}
                </Typography>
              </div>
            )}

            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <CircularProgress />
                <Typography variant="body2" sx={{ marginLeft: 2 }}>
                  Optimizing Images...
                </Typography>
              </Box>
            ) : optimizedImages.length > 0 ? (
              <Box>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<DownloadIcon />}
                  onClick={downloadZip}
                  sx={{m: 2}}
                >
                  Download the Optimized Images
                </Button>

                {compressionDetails && compressionDetails.length > 0 && (
                  <List
                    sx={{
                      maxHeight: 300, // Set the max height in pixels or any preferred unit
                      overflow: "auto", // Enable scrolling when content overflows
                      border: "1px solid #ddd", // Optional: Add a border for better visibility
                      padding: 1, // Optional: Add some padding
                    }}
                  >
                    {compressionDetails.map((details, index) => (
                      <ListItem key={index}>
                        <Box>
                          <Typography variant="body2"><strong>{details.name}</strong></Typography>
                          <Typography variant="body2" sx={{ color: "secondary.main" }}>
                            {details.type}, Saved <strong>{details.savedSize} KB</strong> ({details.savedSizePercent}%), {details.originalSize} KB → {details.compressedSize} KB
                          </Typography>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                )}

                <Box sx={{ mt: 2, p: 2 }}>
                  <Typography variant="body2" sx={{ color: "darkgreen", mb: 2 }}>
                    Total Size Reduced: <strong>{(totalOriginalSize - totalOptimizedSize).toFixed(2) || 0} KB</strong> (<strong>{((totalOriginalSize - totalOptimizedSize)/totalOptimizedSize * 100).toFixed(2)}%</strong>)
                    <br />
                    ({totalOriginalSize.toFixed(2)} KB → {totalOptimizedSize.toFixed(2)} KB)
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Box sx={{ width: "100%", mr: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={((totalOriginalSize - totalOptimizedSize)/totalOriginalSize * 100).toFixed(2)}
                        sx={{ height: 10, borderRadius: 5 }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ minWidth: 40 }}>
                      {((totalOriginalSize - totalOptimizedSize)/totalOriginalSize * 100).toFixed(2)}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={optimizeImages}
                sx={{m: 2}}
                // disabled={images.length === 0}
              >
                Start Optimizing
              </Button>
            )}
          </Paper>
        </Box>
      </Box>
    </div>
  );
};

export default OptimizeAndZipImages;