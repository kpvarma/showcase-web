import React, { useState } from "react";
import { Box, Button, CircularProgress, Typography, Paper } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DownloadIcon from "@mui/icons-material/Download";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import SlideViewer from "../../../components/items/SlideViewer";
import { convertPdfToImages } from "./utils/PdfToImageConverter";

const PdfToImageConverter = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileError, setFileError] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    validateAndProcessFile(file);
  };

  const validateAndProcessFile = async (file) => {
    if (!file) return;

    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (fileExtension !== "pdf") {
      setFileError("Only PDF files are allowed.");
      setUploadedFileName("");
      return;
    }

    setFileError("");
    setUploadedFileName(file.name);
    setUploadedFile(file);
    await processFile(file);
  };

  const processFile = async (file) => {
    setIsLoading(true);
    try {
      const images = await convertPdfToImages(file);
      setImages(images);
    } catch (error) {
      setFileError(`Failed to process the PDF file. ${error}`);
    }
    setIsLoading(false);
  };

  const handleDownloadZip = async () => {
    const zip = new JSZip();
    images.forEach((img, index) => {
      const base64Data = img.replace(/^data:image\/\w+;base64,/, "");
      zip.file(`page-${index + 1}.png`, base64Data, { base64: true });
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `${uploadedFileName || "images"}.zip`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: 2, pb: 40 }}>
      <Typography variant="h2" sx={{ color: "text.primary", mb: 2, textAlign: "center" }}>
        Transform PDFs into&nbsp;
        <Typography component="span" variant="h2" color="primary.main" sx={{ fontWeight: "inherit", p: "0px !important" }}>
          High-Quality Images
        </Typography>
      </Typography>

      <Typography color="text.primary" variant="body1" sx={{ textAlign: "center", maxWidth: "70%" }}>
        Quickly convert PDF files into individual high-resolution images for presentations, documentation, or sharing. 
        Upload your PDF, or drag and drop it into the tool, and view the results in an interactive slider.
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
          <Button
            variant="contained"
            component="label"
            startIcon={<FileUploadIcon />}
            sx={{ marginBottom: 2 }}
          >
            Upload or Drag File Here
            <input type="file" hidden onChange={handleFileUpload} accept=".pdf" />
          </Button>

          {fileError && (
            <Typography color="error" variant="caption">
              <br></br>{fileError}
            </Typography>
          )}

          {uploadedFileName && (
            <Typography variant="caption" sx={{ color: "text.secondary", marginTop: 1 }}>
              <br></br>Uploaded: {uploadedFileName}
            </Typography>
          )}

          {!uploadedFile && !isLoading && (
            <Typography variant="body2" sx={{ color: "text.secondary", marginTop: 2 }}>
              Drag and drop a PDF file here, or click to upload. Only PDF files are supported.
            </Typography>
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
            Download Images
          </Typography>

          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <CircularProgress />
              <Typography variant="body2" sx={{ marginLeft: 2 }}>
                Processing PDF...
              </Typography>
            </Box>
          ) : images.length > 0 ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadZip}
            >
              Download as ZIP
            </Button>
          ) : (
            <Typography variant="body2" sx={{ color: "text.secondary", marginTop: 2 }}>
              No images available for download. Upload a PDF to get started.
            </Typography>
          )}
        </Paper>
      </Box>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 4, padding: 2, width: "100%" }}>
        <Paper
            elevation={1}
            sx={{
              flex: 1,
              padding: 2,
              // border: "1px solid #ddd",
              // borderRadius: 2,
              textAlign: "center",
              width: "100%",
              height: "80vh",
            }}
          >
          {isLoading ? (
            <CircularProgress />
          ) : (
            images.length > 0 && (
              <SlideViewer images={images} />
            )
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default PdfToImageConverter;