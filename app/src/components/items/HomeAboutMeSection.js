import React from "react";

// UI Imports
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Graphics
import image1 from '../../assets/images/machine-learning.png';
import image2 from '../../assets/images/data-science.png';
import image3 from '../../assets/images/devops.png';
import image4 from '../../assets/images/data-analysis.png';

const HomeAboutMeSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        flexDirection: isMobile ? "column-reverse" : "row",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Collage Section */}
      <Box
        sx={{
          minHeight: isMobile ? "60vh" : "40vh",
          width: "100%",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          mt: isMobile ? 4 : 0,
          mb: isMobile ? 4 : 0,
          
        }}
      >
        {/* Image Frame 1 - Big */}
        <Box
          component="img"
          src={image1}
          alt="Collage Image 1"
          sx={{
            backgroundColor: "#fff",
            width: "60%",
            height: "auto",
            position: "absolute",
            top: isMobile ? 4 : 4,
            left: isMobile ? "10%" : "0%",
            transform: "rotate(-5deg)",
            zIndex: 2,
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        />
        {/* Image Frame 2 - Medium */}
        <Box
          component="img"
          src={image2}
          alt="Collage Image 2"
          sx={{
            backgroundColor: "#dfdfdf",
            width: "55%",
            height: "auto",
            position: "absolute",
            top: isMobile ? 125 : 4,
            right: isMobile ? "0%" : "5%",
            transform: "rotate(30deg)",
            zIndex: 2,
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        />
        {/* Image Frame 3 - Small */}
        <Box
          component="img"
          src={image3}
          alt="Collage Image 3"
          sx={{
            backgroundColor: "#fff",
            width: "55%",
            height: "auto",
            position: "absolute",
            bottom: isMobile ? 115 : 2,
            left: isMobile ? "10%" : "10%",
            transform: "rotate(0deg)",
            zIndex: 1,
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        />
        {/* Image Frame 4 - Small */}
        <Box
          component="img"
          src={image4}
          alt="Collage Image 4"
          sx={{
            backgroundColor: "#fff",
            width: "40%",
            height: "auto",
            position: "absolute",
            bottom: isMobile ? 0 : 4,
            right: isMobile ? "0%" : "0%",
            transform: "rotate(20deg)",
            zIndex: 2,
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        />
      </Box>

      {/* Text Content */}
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
    </Box>
  );
};

export default HomeAboutMeSection;