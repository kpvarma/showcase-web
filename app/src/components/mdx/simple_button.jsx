// components/mdx/simple_button.js
import React from 'react';
import { Button, Typography } from "@mui/material";

const SimpleButton = ({ label, onClick }) => (
  <Button  variant="outlined" color="secondary" size="large" onClick={onClick}>
    {label}
  </Button>
);

export default SimpleButton;