// components/common/Tags.js

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip } from '@mui/material';

function Tags({ tags }) {
  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginTop: 1 }}>
      {tags.map((tag, index) => (
        <Chip key={index} label={tag} color="primary" />
      ))}
    </Box>
  );
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Tags;