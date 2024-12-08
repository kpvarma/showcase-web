import React from 'react';
import { Box } from '@mui/material';

// Graphics
import image1 from '../../../assets/images/machine-learning.png';
import image2 from '../../../assets/images/data-science.png';
import image3 from '../../../assets/images/devops.png';
import image4 from '../../../assets/images/data-analysis.png';

const AboutMeCollage = ({ isMobile }) => {
  return (
    <Box
      sx={{
        minHeight: {xs: "40vh", sm: "40vh"},
        width: "100%",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        mt: {xs: 10, sm: 0},
        mb: {xs: 10, sm: 0},
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
  );
};

export default AboutMeCollage;