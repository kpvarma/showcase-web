import React from "react";

import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

const HireMeSection = () => {
  const theme = useTheme(); // Access theme for responsive behavior
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if it's mobile view

  return (
    <Box 
      sx={{ 
        width: "100%", 
        // height: "80vh", 
        position: "relative", 
        // py: 8, 
        // paddingTop: 2,
        marginTop: 8,
        // backgroundImage: `url(${aboutMeImage})`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
        // backgroundColor: "rgba(255, 255, 255, 0.9)"
      }}
    >
      <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingBottom: 6}}
      >
        <Typography variant="h1" sx={{ color: "text.primary", mb: 4, maxWidth: "80%" }}>
          Ready to&nbsp;
          <Typography component="span" variant="h1" color="primary.main" sx={{ fontWeight: "inherit" }}>
            Work Together?
          </Typography>
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, maxWidth: "80%" }}>
          I’m open to exciting job opportunities where I can contribute, learn, and grow. 
          <br></br>
          If you have a role that aligns with my skills and experience, don’t hesitate to get in touch!
          <br></br>
          Let's create something amazing together! Click the button below to learn more about me and my work or to hire me.
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ maxWidth: {xs: "600px", sm: "100%"}, justifyContent: "center" }}
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