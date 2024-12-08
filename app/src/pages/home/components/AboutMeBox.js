import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const AboutMeBox = () => {
  return (
    <Box
      sx={{
        flex: 1,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "16px",
          padding: "32px",
          maxWidth: "400px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: "#666", marginBottom: "8px" }}
        >
          About Me
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: "16px", color: "#000" }}
        >
          Crafting Innovation Through Code.
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#444", marginBottom: "24px", lineHeight: "1.6" }}
        >
          Transforming ideas into scalable, maintainable solutions through
          creative problem-solving and engineering excellence.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          About me!
        </Button>
      </Box>
    </Box>
  );
};

export default AboutMeBox;