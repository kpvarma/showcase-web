import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Grid, Typography, Stack } from "@mui/material";

export default function SlideViewer({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Box sx={{ width: "100%", display: "flex", maxHeight: "60vh" }}>
      {/* Thumbnails on the Left */}
      <Box
        sx={{
          display: {xs: "none", sm: "block"},
          width: "20%",
          overflowY: "auto",
          borderRight: "1px solid #ddd",
          padding: 1,
          "&::-webkit-scrollbar": { width: "5px" },
        }}
      >
        <Stack spacing={1}>
          {images.map((img, index) => (
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
                style={{ width: "100%", height: "80px", objectFit: "cover" }}
              />
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Main Slide on the Right */}
      <Box sx={{ flex: 1, padding: 2 }}>
        <Carousel
          index={currentIndex}
          autoPlay={false}
          navButtonsAlwaysVisible
          onChange={(now) => setCurrentIndex(now)}
          animation="slide"
          indicators={false}
        >
          {images.map((img, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                // height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={img}
                alt={`Slide ${index}`}
                style={{ width: "100%", objectFit: "contain" }}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}