import React, { useState } from "react";
import { Box, Typography, Chip } from "@mui/material";

// Asset Imports
import imageLibrary from '../../../components/utils/image_library';

const ProjectCover = ({project}) => {
    const default_image = "https://via.placeholder.com/800x400.png?text=Interactive+MDX";
    return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 300,
        overflow: "hidden",
        borderRadius: "8px",
        marginBottom: 3,
        boxShadow: 3,
      }}
    >
        {/* Cover Image */}
        <img
            src={imageLibrary.getProjectImage(project.cover_image || default_image)}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: project.draft ? "grayscale(80%)" : "none" }}
        />  {/* Apply grayscale for drafts */}
      
      {/* Dark overlay zIndex: 1 */}
      <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)" }}></Box> 
        
      {/* Title Overlay */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0, // Align to the bottom
          left: 0,
          width: "100%",
          padding: 3,
          color: "#fff",
          textAlign: "center", // Center align the title text
          zIndex: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            textAlign: "left",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)", // Text shadow for better readability
          }}
        >
          {project.title}
        </Typography>

        {/* Published and Modified Dates */}
        <Box sx={{ marginTop: 2, textAlign: "left", }}>
          {project.date && (
            <Typography variant="caption" sx={{ display: "block" }}>
              Published:{" "}
              {new Date(project.date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
            </Typography>
          )}
          {project.last_modified && (
            <Typography variant="caption" sx={{ display: "block", textAlign: "left", }}>
              Last Modified:{" "}
              {new Date(project.last_modified).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
            </Typography>
          )}
        </Box>

      </Box>
    </Box>
  );
};

export default ProjectCover;