import React, { useState } from "react";

// UI Imports
import { Box, Button, Typography, CircularProgress, IconButton, Paper } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";

// Utitlity Imports
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { convertPdfToImages } from "../utils/PdfToImageConverter"

// Page Component Imports
import MetaTags from "../../../components/layouts/meta_tags";

// Asset Imports
import imageLibrary from "../../../components/utils/image_library";

// Content Import
import { allDemos } from '../../../../.contentlayer/generated/index.mjs';

const ConvertPdfToImagePdf = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [imageBasedPdf, setImageBasedPdf] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploadError, setFileUploadError] = useState("");

  const demo = allDemos.find((demo) => demo.slug === "convert_pdf_to_image_pdf");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file?.type !== "application/pdf") {
      setFileUploadError("Only PDF files are allowed.");
      return;
    }
    setFileUploadError("");
    setUploadedFile(file);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setImageBasedPdf(null);
  };

  const convertToImageBasedPdf = async () => {
    if (!uploadedFile) {
      setFileUploadError("No PDF uploaded.");
      return;
    }

    setIsLoading(true);
    setFileUploadError("");

    try {
      // Reuse the convertPdfToImages utility
      const images = await convertPdfToImages(uploadedFile);

      const pdfDoc = await PDFDocument.create();

      for (const imgUrl of images) {
        const imageBytes = await fetch(imgUrl).then((res) => res.arrayBuffer());
        const embeddedImage = await pdfDoc.embedPng(imageBytes);

        const { width, height } = embeddedImage;

        const page = pdfDoc.addPage([width, height]);
        page.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width,
          height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      setImageBasedPdf(new Blob([pdfBytes], { type: "application/pdf" }));
    } catch (err) {
      console.error("Error converting PDF:", err);
      setFileUploadError("Failed to convert PDF to image-based PDF.");
    }

    setIsLoading(false);
  };

  const downloadPdf = () => {
    if (imageBasedPdf) {
      saveAs(imageBasedPdf, "image-based.pdf");
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
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: 2, pb: 40 }}>
        {/* Header Section */}
        <Typography variant="h2" sx={{ color: "text.primary", mb: 2, textAlign: "center" }}>
            Convert PDF to&nbsp;
            <Typography component="span" variant="h2" color="primary.main" sx={{ fontWeight: "inherit", p: "0px !important" }}>
            Image-Based PDF
            </Typography>
        </Typography>
        <Typography color="text.primary" variant="body1" sx={{ textAlign: "center", maxWidth: "70%" }}>
            Upload a PDF file to generate an image-based PDF where text and images cannot be copied.
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
            {!uploadedFile ? (
                <Button
                variant="contained"
                component="label"
                startIcon={<FileUploadIcon />}
                sx={{ marginBottom: 2 }}
                >
                Upload File
                <input type="file" hidden onChange={handleFileUpload} accept="application/pdf" />
                </Button>
            ) : (
                <Box>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    {uploadedFile.name}
                </Typography>
                <IconButton color="error" onClick={handleRemoveFile}>
                    <DeleteIcon />
                </IconButton>
                </Box>
            )}
            {fileUploadError && (
                <Typography color="error" variant="caption">
                {fileUploadError}
                </Typography>
            )}
            </Paper>

            {/* Right Box: Convert and Download Section */}
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
                Convert and Download
            </Typography>

            {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <CircularProgress />
                <Typography variant="body2" sx={{ marginLeft: 2 }}>
                    Processing PDF...
                </Typography>
                </Box>
            ) : imageBasedPdf ? (
                <Button
                variant="contained"
                color="success"
                startIcon={<DownloadIcon />}
                onClick={downloadPdf}
                >
                Download Image-Based PDF
                </Button>
            ) : (
                <Button
                variant="contained"
                color="primary"
                onClick={convertToImageBasedPdf}
                disabled={!uploadedFile}
                >
                Convert PDF
                </Button>
            )}
            </Paper>
        </Box>
        </Box>
    </div>
  );
};

export default ConvertPdfToImagePdf;