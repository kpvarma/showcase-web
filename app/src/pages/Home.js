import React from 'react';

// Page Component Imports
import MainSection from '../components/items/HomeMainSection';
import AboutMeSection from '../components/items/HomeAboutMeSection';

// import ProjectHighlights from '../components/items/ProjectHighlights';
// import ArticleHighlights from '../components/items/ArticleHighlights';

import Features from '../components/items/HomeFeatures';

const Home = () => (
  <div>
    <main className="main-content" sx={{padding: 0}}>

      {/* Main Section which shows "Looking for help with your work?" */}
      <MainSection/>

      {/* Features */}
      <Features/>

      {/* About Me Section */}
      <AboutMeSection/>

      {/* Showing first 3 Projects */}
      {/* <ProjectHighlights /> */}

      {/* Showing first 3 articles */}
      {/* <ArticleHighlights /> */}
      
    </main>
  </div>
);

export default Home;
