import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Select,
  MenuItem,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import SearchIcon from "@mui/icons-material/Search";

// Utility function to create safe object URLs
const createSafeObjectURL = (fileOrBlob) => {
  if (fileOrBlob instanceof Blob || fileOrBlob instanceof File) {
    return URL.createObjectURL(fileOrBlob); // Create URL for Blob/File
  } else if (typeof fileOrBlob === "string") {
    return fileOrBlob; // Assume it's already a valid URL
  } else {
    console.error("Invalid image format for createObjectURL:", fileOrBlob);
    return ""; // Return an empty string for invalid inputs
  }
};

export default function ImageOcrViewer({ images, ocrTexts }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [fontSize, setFontSize] = useState(14);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedText, setHighlightedText] = useState("");

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handleSearch = () => {
    setHighlightedText(searchTerm);
  };

  const renderHighlightedText = (text) => {
    if (!highlightedText) return text;
    const parts = text.split(new RegExp(`(${highlightedText})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlightedText.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Map images to safe URLs
  const imageUrls = images.map(createSafeObjectURL);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        width: "100%",
        maxHeight: "90vh",
      }}
    >
      {/* Thumbnails (or Dropdown on Mobile) */}
      <Box
        sx={{
          width: { xs: "100%", sm: "10%" },
          maxHeight: { sm: "80vh" },
          overflowY: { sm: "auto" },
          borderRight: { sm: "1px solid #ddd" },
          padding: 1,
          "&::-webkit-scrollbar": { width: "5px" },
        }}
      >
        {imageUrls.length > 0 ? (
          <Stack spacing={1} display={{ xs: "none", sm: "flex" }}>
            {imageUrls.map((img, index) => (
              <Box
                key={index}
                onClick={() => handleThumbnailClick(index)}
                sx={{
                  cursor: "pointer",
                  border:
                    index === currentIndex ? "2px solid #1976d2" : "2px solid transparent",
                  borderRadius: "5px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index}`}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              </Box>
            ))}
          </Stack>
        ) : (
          <Select
            value={currentIndex}
            onChange={(e) => setCurrentIndex(e.target.value)}
            fullWidth
            displayEmpty
          >
            {images.map((_, index) => (
              <MenuItem key={index} value={index}>
                Image {index + 1}
              </MenuItem>
            ))}
          </Select>
        )}
      </Box>

      {/* Image Preview */}
      <Box
        sx={{
          width: { xs: "100%", sm: "45%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: `${zoomLevel * 100}%`,
            maxHeight: "80vh",
            overflow: "hidden",
          }}
        >
          <img
            src={imageUrls[currentIndex]}
            alt={`Preview ${currentIndex}`}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              maxHeight: "80vh",
            }}
          />
        </Box>
      </Box>

      {/* OCR Text Preview */}
      <Box
        sx={{
          flex: 1,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            placeholder="Search text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Box>
        <Paper
          elevation={1}
          sx={{
            flex: 1,
            padding: 2,
            overflowY: "auto",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            wordBreak: "break-word",
            fontSize: `${fontSize}px`,
          }}
        >
          <Typography variant="body2" sx={{ color: "text.primary", textAlign: "left" }}>
            {ocrTexts[currentIndex] ? renderHighlightedText(ocrTexts[currentIndex]) : "No content to display."}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}