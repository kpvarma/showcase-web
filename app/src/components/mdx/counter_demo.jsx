// components/MdxCounterDemo.js
import React, { useState } from 'react';
import { Button, Box, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MdxCounterDemo = () => {
  // State for the counter and increment/decrement value
  const [counter, setCounter] = useState(0);
  const [step, setStep] = useState(1);

  // Access the current theme
  const theme = useTheme();

  // Handlers for button actions
  const handleReset = () => setCounter(0);
  const handleIncrement = () => setCounter((prev) => Math.min(prev + step, 1000));
  const handleDecrement = () => setCounter((prev) => Math.max(prev - step, 0));

  // Handler for step input change
  const handleStepChange = (event) => {
    const value = Math.max(1, Math.min(10, Number(event.target.value))); // Ensure value is between 1 and 10
    setStep(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        padding: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '8px',
        maxWidth: '300px',
        margin: '0 auto',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
      }}
    >
      {/* Display the current counter */}
      <Typography
        component="div"
        variant="h4"
        sx={{
          fontWeight: 'bold',
          marginBottom: 2,
          color: "text.primary",
        }}
      >
        Counter: {counter}
      </Typography>

      {/* Input for step value */}
      <TextField
        label="Step"
        type="number"
        inputProps={{ min: 1, max: 10 }}
        value={step}
        onChange={handleStepChange}
        // sx={{
        //   minWidth: '100px',
        //   '& .MuiInputBase-input': {
        //     color: "text.primary",
        //   },
        //   '& .MuiInputLabel-root': {
        //     color: "text.primary",
        //   },
        // }}
      />

      {/* Buttons for counter actions */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="outlined" color="secondary" size="small" onClick={handleReset} >
          Reset
        </Button>
        <Button variant="contained" color="primary" size="small" onClick={handleIncrement}>
          +
        </Button>
        <Button variant="contained" color="primary" size="small" onClick={handleDecrement} >
          -
        </Button>
      </Box>
    </Box>
  );
};

export default MdxCounterDemo;