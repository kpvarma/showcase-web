import React from "react";
import { Box, Typography } from "@mui/material";

/**
 * DisplayMetaData Component
 * Displays metadata of a file in a structured layout.
 *
 * @param {Object} fileMetaData - The metadata of the file.
 * @returns {JSX.Element}
 */

export const DisplayMetaData = ({ fileMetaData }) => {
    return (
      <Box
        sx={{
          width: '100%',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1, // Space between rows
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold', flexShrink: 0 }}>
            Name:
          </Typography>
          <Typography variant="body2">{'asd'}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold', flexShrink: 0 }}>
            Size:
          </Typography>
          <Typography variant="body2">{fileMetaData.size}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold', flexShrink: 0 }}>
            Type:
          </Typography>
          <Typography variant="body2">{fileMetaData.type}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold', flexShrink: 0 }}>
            Created At:
          </Typography>
          <Typography variant="body2">{fileMetaData.createdAt}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold', flexShrink: 0 }}>
            Number of Pages:
          </Typography>
          <Typography variant="body2">{fileMetaData.pages}</Typography>
        </Box>
      </Box>
    );
  };