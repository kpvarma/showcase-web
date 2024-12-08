import React from 'react';

// UI Imports
import { Box } from '@mui/material';

// Page Component Imports
import MainSection from './components/MainSection';
import AboutMeCollage from './components/AboutMeCollage';
import AboutMeBox from './components/AboutMeBox';
// import ProjectHighlights from '../components/items/ProjectHighlights';
// import ArticleHighlights from '../components/items/ArticleHighlights';

import Features from './components/Features';

const Home = () => (
  <div>
    <main className="main-content" sx={{padding: 0}}>

      {/* Main Section which shows "Looking for help with your work?" */}
      <MainSection/>

      {/* Features */}
      <Features/>

      {/* About Me Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "80vh",
          display: "flex",
          flexDirection: {xs: "column-reverse", sm: "row"},
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AboutMeCollage/>
        <AboutMeBox />
      </Box>

      {/* Showing first 3 Projects */}
      {/* <ProjectHighlights /> */}

      {/* Showing first 3 articles */}
      {/* <ArticleHighlights /> */}
      
    </main>
  </div>
);

export default Home;
