import React, { useState } from 'react';
import { Button, Typography } from "@mui/material";

const ToggleButton = ({ label }) => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <Button variant="outlined" color="secondary" size="large" onClick={() => setIsOn(!isOn)}>
        {isOn ? 'Turn Off' : 'Turn On'}
      </Button>
      <p>{label}: {isOn ? 'ON' : 'OFF'}</p>
      <Typography
        component="div"
        variant="text"
        sx={{
          fontWeight: 'bold',
          marginBottom: 2,
          color: "secondary",
        }}
      >
        {label}: {isOn ? 'ON' : 'OFF'}
      </Typography>
    </div>
  );
};

export default ToggleButton;