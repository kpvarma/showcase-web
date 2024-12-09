// components/MdxButton.js
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const MdxButton = ({ text, url, target }) => (
  <a href={url} target={target} rel="noopener noreferrer">
    <Button variant="contained" color="secondary" style={{ padding: '10px 20px' }}>
      {text}
    </Button>
  </a>
);

// Prop types for better validation
MdxButton.propTypes = {
  url: PropTypes.string.isRequired, // URL is mandatory
  text: PropTypes.string, // Text for the button
  target: PropTypes.string, // Target attribute (e.g., '_self' or '_blank')
};

// Default props if not provided
MdxButton.defaultProps = {
  text: 'Click Here',
  target: '_self', // Default to same-page navigation
};


export default MdxButton;