import React from "react";
import { Box, Grid, Typography, Paper, Button, Stack } from "@mui/material";

export default function ThreeBoxContent({ sections }) {
  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 2, md: 8 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {sections.map((section, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                textAlign: "center",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                minHeight: "45vh"
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                {section.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.8, color: "text.secondary", mb: 4 }}
                dangerouslySetInnerHTML={{ __html: section.description }}
              />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ maxWidth: {xs: "600px", sm: "100%"}, justifyContent: "center" }} >
                {Array.isArray(section.button) ? (
                    section.button.map((btn, btnIndex) => (
                      <Button
                        key={btnIndex}
                        variant={btn.variant}
                        color={btn.color}
                        size={btn.large}
                        sx={{ whiteSpace: "nowrap" }}
                        href={btn.link}
                      >
                        {btn.text}
                      </Button>
                    ))
                ) : (
                  <Button
                    variant={section.button.variant}
                    color={section.button.color}
                    size={section.button.large}
                    sx={{ whiteSpace: "nowrap" }}
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