import React from 'react';
import './../stylesheets/card.css';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const LinkCard = ({ title, description, type }) => (
  <Card variant="outlined" sx={{ maxWidth: 360 }}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">{title}</Typography>
          <Typography gutterBottom variant="h6" component="div">{type}</Typography>
        </Stack>
        <Typography color="text.secondary" variant="body2">{description}</Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography gutterBottom variant="body2">
          Select type
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip color="primary" label="Soft" size="small" />
          <Chip label="Medium" size="small" />
          <Chip label="Hard" size="small" />
        </Stack>
      </Box>
    </Card>
  // <div className="card">
  //   <div className="card-header">
  //     {title} <span className="card-type">{type}</span>
  //   </div>
  //   <div className="card-content">{description}</div>
  //   {/* Add interactive elements here */}
  // </div>
);

export default LinkCard;
