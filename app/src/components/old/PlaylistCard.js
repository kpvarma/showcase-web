import React, { useRef, useEffect, useState } from 'react';
import { Card, Typography, Box, Stack, Divider, Chip, Icon } from '@mui/material';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';

const PlaylistCard = ({ data }) => {
  // Destructure the data object to extract name, group, and tags
  const { name, description, group, tags } = data;

  // Calculate the number of items
  const noOfItems = tags.length;

  // State to track whether title spans multiple lines
  const [isMultiline, setIsMultiline] = useState(false);
  // Ref to access the title element
  const titleRef = useRef();

  // Effect to check if title spans multiple lines
  useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement.scrollHeight > titleElement.clientHeight) {
      setIsMultiline(true);
    } else {
      setIsMultiline(false);
    }
  }, [name]);

  return (
    <Card variant="outlined" sx={{ maxWidth: 360 }}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography
            ref={titleRef}
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: isMultiline ? 2 : 1,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'grey' }}>
            <Typography gutterBottom variant="h6" component="div" sx={{ marginLeft: 1, flexGrow: 1 }}>
              {noOfItems}
            </Typography>
            <FolderCopyIcon />
          </Box>
        </Stack>
        <Typography color="text.secondary" variant="body2">{description}</Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={1}>
          {tags.map((tagName, index) => (
            <Chip key={index} label={tagName} color1="primary" size="small" />
          ))}
        </Stack>
      </Box>
    </Card>
  );
};

export default PlaylistCard;
