import React from "react";

import {
  Box,
  Typography,
  Button,
  Container,
  Link as MuiLink,
  Stack,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

// Graphics
import aboutMeImage from "../../assets/images/programmers-desk-mirror.jpg";

const HireMeSection = () => {
  const theme = useTheme(); // Access theme for responsive behavior
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if it's mobile view

  return (
    <Box 
      sx={{ 
        width: "100%", 
        position: "relative", 
        py: 8, 
        // backgroundImage: `url(${aboutMeImage})`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
        // backgroundColor: "rgba(255, 255, 255, 0.9)"
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          display: "none",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay for darkening background
          zIndex: 1,
        }}
      />
      <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",}}
      >
        <Typography variant="h1" sx={{ color: "text.primary", mb: 4, maxWidth: "80%" }}>
          Ready to&nbsp;
          <Typography component="span" variant="h1" color="primary.main" sx={{ fontWeight: "inherit" }}>
            Work Together?
          </Typography>
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, maxWidth: "80%" }}>
          Let's create something amazing together! Click the button below to learn more about me and my work or to hire me.
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ maxWidth: "600px", justifyContent: "center" }}
        >
          <Button variant="outlined" color="text.secondary" size="large" sx={{ whiteSpace: "nowrap" }} component={Link} to="/aboutme">
            Read more About Me
          </Button>
          <Button variant="contained" color="secondary" size="large" sx={{ whiteSpace: "nowrap" }} component={Link} to="/hireme">
            Hire Me
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default HireMeSection;