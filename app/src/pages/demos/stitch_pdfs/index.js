import React, { useState } from "react";

// UI Imports
import { Box, Button, CircularProgress, Typography, Paper, List, ListItem, ListItemText, IconButton, Divider } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";

// Utility Imports
import { stitchPDFs } from "./utils/stitchPDFs";
import { convertPdfToImages } from "../utils/PdfToImageConverter";
import { extractFileMetaData } from "../utils/ExtractFileMetaData";
import { DisplayMetaData } from "../components/DisplayFileMetaData";
import SlideViewer from "../../../components/items/SlideViewer";

// Page Component Imports
import MetaTags from "../../../components/layouts/meta_tags";

// Asset Imports
import imageLibrary from "../../../components/utils/image_library";

// Content Import
import { allDemos } from "../../../../.contentlayer/generated/index.mjs";

export default function StitchPDFs() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadFileError, setUploadFileError] = useState("");
  const [stitchFileError, setStitchFileError] = useState("");
  const [stitchedPdf, setStitchedPdf] = useState(null);
  const [images, setImages] = useState([]);
  const [fileMetaData, setFileMetaData] = useState(null);
  
  let demo = allDemos.find((demo) => demo.slug === "stitch_pdfs");

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    const duplicateFiles = newFiles.filter((file) =>
      files.some((existingFile) => existingFile.name === file.name && existingFile.size === file.size)
    );
  
    if (duplicateFiles.length > 0) {
      setUploadFileError("Duplicate files found.");
      return;
    }
  
    const validFiles = newFiles.filter((file) => file.type === "application/pdf");
    if (validFiles.length < newFiles.length) {
      setUploadFileError("Only PDF files are allowed.");
    } else {
      setUploadFileError("");
    }
  
    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const handleFileRemove = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleClearFiles = () => {
    setFiles([]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileUpload({ target: { files: droppedFiles } });
  };

  const handleMoveUp = (index) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
      return newFiles;
    });
  };
  
  const handleMoveDown = (index) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
      return newFiles;
    });
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleStitchPdfs = async () => {
    if (files.length === 0) {
      setUploadFileError("No files to stitch.");
      return;
    }

    setIsLoading(true);
    setStitchFileError("");

    try {
      const pdfBlob = await stitchPDFs(files);
      setStitchedPdf(pdfBlob);

      const pdfFile = new File([pdfBlob], "stitched.pdf", { type: "application/pdf" });
      
      if(pdfFile) {
        const metadata = await extractFileMetaData(pdfFile);
        setFileMetaData(metadata); // Store metadata in state

        try {
          const images = await convertPdfToImages(pdfFile);
          setImages(images);
        } catch (error) {
          setStitchFileError(`Failed to preview the PDF file. ${error}. (Couldnt convert PDF to images)`);
        }
      }

      // Calculate x = 1 + (files.length / 3)
      const x = 1 + files.length / 3;
      
      // Wait for x seconds
      await sleep(x * 1000);
    } catch (error) {
      setStitchFileError(`Failed to stitch the PDF files. ${error}`);
    }

    setIsLoading(false);
  };

  const handleDownloadPdf = () => {
    if (stitchedPdf) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(stitchedPdf);
      link.download = "stitched.pdf";
      link.click();
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
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: 2, pb: 4 }}>
        <Typography variant="h2" sx={{ color: "text.primary", mb: 0, textAlign: "center" }}>
          Stitch &nbsp;
          <Typography component="span" variant="h2" color="primary.main" sx={{ fontWeight: "inherit", p: "0px !important" }}>
          Multiple PDFs
          </Typography>
          &nbsp; Into One
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", p: 2 }}>
          Combine multiple PDF files into a single document effortlessly. Upload your files, stitch them together, and download the result with just a few clicks.
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
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Upload PDFs
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", p: 2 }}>
              Drag and drop your PDF files here, or use the upload button to select files from your device. You can add multiple files and manage your list before stitching them together.
            </Typography>
            <Divider/>

            <Button
              variant="contained"
              component="label"
              startIcon={<FileUploadIcon />}
              sx={{ m: 2 }}
            >
              Upload or Drag Files Here
              <input type="file" hidden onChange={handleFileUpload} accept=".pdf" multiple />
            </Button>

            {uploadFileError && (
              <div>
                <br></br>
                <Typography color="error" variant="caption">
                  {uploadFileError}
                </Typography>
              </div>
            )}

            {files.length > 0 && (
              <List>
                {files.map((file, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <Box sx={{ display: "flex", gap: 1 }}>
                        {/* Move Up Button */}
                        {index > 0 && (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleMoveUp(index)}
                          >
                            ↑
                          </Button>
                        )}
              
                        {/* Move Down Button */}
                        {index < files.length - 1 && (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleMoveDown(index)}
                          >
                            ↓
                          </Button>
                        )}
              
                        {/* Remove Button */}
                        <IconButton edge="end" onClick={() => handleFileRemove(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText primary={file.name} />
                  </ListItem>
                ))}
              </List>
            )}

            {files.length > 0 && (
              <Button variant="outlined" color="secondary" startIcon={<ClearIcon />} onClick={handleClearFiles}>
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
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Stitch PDFs
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", p: 2 }}>
              Once you have uploaded all the files you want to combine, the "Start Stitching" button will be enabled. Click on it to merge the uploaded files into a single PDF. 
            </Typography>
            <Divider/>
            
            {stitchFileError && (
              <div>
                <br></br>
                <Typography color="error" variant="caption">
                  {stitchFileError}
                </Typography>
              </div>
            )}

            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
                <CircularProgress />
                <Typography variant="body2" sx={{ marginLeft: 2 }}>
                  Stitching PDFs...
                </Typography>
              </Box>
            ) : (stitchedPdf && !stitchFileError) ? (
              <Box>
                <Typography variant="body2" sx={{ color: "text.secondary", m: 2 }}>
                  Your file is ready!
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownloadPdf}
                >
                  Download Stitched PDF
                </Button>
                {fileMetaData && (
                  <DisplayMetaData fileMetaData={fileMetaData}></DisplayMetaData>
                )}
              </Box>
            ) : (
              <Box>
                {files.length > 1 ? (
                  <div>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleStitchPdfs}
                      sx={{ m: 2 }}
                    >
                      Start Stitching
                    </Button>
                    <Typography variant="body2" sx={{ color: "text.secondary", marginTop: 2 }}>
                      Click the "Start Stitching" button once you’ve finished uploading all the documents.
                    </Typography>
                  </div>
                ) : (
                  <Typography variant="body2" sx={{ color: "text.secondary", marginTop: 2 }}>
                    Upload files and click "Start Stitching" to combine them. The processed file will be available for download once the stitching is complete.
                  </Typography>
                )}
              </Box>
            )}
          </Paper>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 4, padding: 2, width: "100%", pb: 40 }}>
        <Paper
            elevation={1}
            sx={{
              flex: 1,
              padding: 2,
              // border: "1px solid #ddd",
              // borderRadius: 2,
              textAlign: "center",
              width: "100%",
              height: "90vh",
            }}
          >
          {isLoading ? (
            <CircularProgress sx={{m: 40}} />
          ) : (
            images.length > 0 && (
              <SlideViewer images={images} />
            )
          )}
        </Paper>
      </Box>
    </div>
  );
}