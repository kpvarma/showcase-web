import React from "react";

// UI Imports
import { Link } from "react-router-dom";
import { Box, Typography, Button, Grid } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const HomeMainSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "80vh",
        padding: 5,
        boxSizing: "border-box",
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{ maxWidth: "100%", margin: {xs: "0 auto", md: "10% auto 10% auto"} }}
      >
        {/* Left Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            justifyContent: "center",
            textAlign: { xs: "center", md: "left" },
            marginTop: { xs: 10, md: 0 },
            marginBottom: { xs: 10, md: 0 },
          }}
        >
          <Typography variant="h1" sx={{ color: "text.primary", mb: 4, maxWidth: "80%" }}>
            Looking for help with&nbsp;
            <Typography component="span" variant="h1" color="primary.main" sx={{ fontWeight: "inherit" }}>
              Your Work?
            </Typography>
          </Typography>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={0}>
            {/* The Problem */}
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  paddingTop: { xs: 2, md: 0 },
                  paddingBottom: { xs: 2, md: 0 },
                }}
              >
                <HelpOutlineIcon sx={{ fontSize: "48px", color:"text.primary", marginBottom: 1 }} />
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color:"text.primary", marginBottom: 1 }}
                >
                  The Problem
                </Typography>
                <Box
                  sx={{height: '15vh', margin: 2}}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1rem",
                      lineHeight: 1.5,
                      color:"text.primary",
                    }}
                  >
                    Missed deadlines, poor quality, and lack of accountability can derail your
                    projects.
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  color="action"
                  size="large"
                  component={Link}
                  to="/hireme"
                  sx={{ marginTop: 1 }}
                >
                  Discuss with Me
                </Button>
              </Box>
            </Grid>

            {/* The Solution */}
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  paddingTop: { xs: 4, md: 0 },
                  paddingBottom: { xs: 4, md: 0 },
                }}
              >
                <FavoriteBorderIcon
                  sx={{ fontSize: "48px", color:"text.primary", marginBottom: 1 }}
                />
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color:"text.primary", marginBottom: 1 }}
                >
                  The Solution
                </Typography>
                <Box
                  sx={{height: '15vh', margin: 2}}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1rem",
                      lineHeight: 1.5,
                      color:"text.primary"
                    }}
                  >
                    Seamless processes, transparent communication, and a focus on delivering
                    solutions that align with your vision—every time.
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={Link}
                  to="/hireme"
                  sx={{ marginTop: 1}}
                >
                  Hire Me
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeMainSection;