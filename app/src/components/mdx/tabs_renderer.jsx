// components/TabsRenderer.js
import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

export const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
};

const TabsRenderer = ({ tabs }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="tabs example">
        {tabs.map((tab, idx) => (
          <Tab key={idx} label={tab.label} />
        ))}
      </Tabs>
      {tabs.map((tab, idx) => (
        <TabPanel key={idx} value={value} index={idx}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};

export default TabsRenderer;