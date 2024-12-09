import React from "react";
import { Box, Grid, Typography, Paper, Button, Stack } from "@mui/material";

export default function ThreeBoxContent({ sections }) {
  return (
    <Box
      sx={{
        py: 8,
        pb: { xs: 4, md: 10 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 6, md: 4 }, // Increased gap for mobile view
      }}
    >
      <Grid 
        container 
        spacing={4} 
        justifyContent="center"
        sx={{
          px: { xs: 2, md: 0 }, // Padding for container on mobile
        }}
      >
        {sections.map((section, index) => (
          <Grid 
            item 
            xs={12} 
            md={4} 
            key={index} 
            sx={{
              px: { xs: 0, md: index === 0 ? 0 : 4 }, // Padding adjustments for desktop
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 }, // Adjust padding for mobile
                textAlign: "center",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                minHeight: { xs: "auto", md: "45vh" }, // Allow dynamic height for mobile
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  marginBottom: { xs: 1.5, md: 2 }, // Adjust margins for mobile
                }}
              >
                {section.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  color: "text.secondary",
                  marginBottom: { xs: 2, md: 4 }, // Adjust margins for mobile
                }}
                dangerouslySetInnerHTML={{ __html: section.description }}
              />
              <Stack
                direction={{ xs: "column", sm: "row" }} // Stack buttons vertically on mobile
                spacing={2}
                sx={{
                  justifyContent: "center", // Center-align buttons
                  alignItems: "center",    // Center-align buttons vertically
                  maxWidth: "100%",
                }}
              >
                {Array.isArray(section.button) ? (
                  section.button.map((btn, btnIndex) => (
                    <Button
                      key={btnIndex}
                      variant={btn.variant}
                      color={btn.color}
                      size={btn.large ? "large" : "medium"}
                      sx={{
                        whiteSpace: "nowrap",
                        width: { xs: "100%", sm: "auto" }, // Buttons take full width on mobile
                      }}
                      href={btn.link}
                    >
                      {btn.text}
                    </Button>
                  ))
                ) : (
                  <Button
                    variant={section.button.variant}
                    color={section.button.color}
                    size={section.button.large ? "large" : "medium"}
                    sx={{
                      whiteSpace: "nowrap",
                      width: { xs: "100%", sm: "auto" }, // Buttons take full width on mobile
                    }}
                    href={section.button.link}
                  >
                    {section.button.text}
                  </Button>
                )}
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}