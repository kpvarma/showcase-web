import React from 'react';
import { Routes, Route } from 'react-router-dom';

// UI Imports
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

// Layout Imports
import AppTheme from './shared-theme/AppTheme';
import Header from './components/layouts/app_header.js';
import Footer from './components/layouts/app_footer.js';

// Page Imports
import Home from './pages/home/index';
import ProjectIndex from './pages/projects/index';
import ProjectShow from './pages/projects/show';
import ArticleIndex from './pages/articles/index';
import ArticleShow from './pages/articles/show';
import AboutMe from './pages/about_me/index';
import HireMe from './pages/HireMe';
import TestPage from './pages/TestPage';
import ScrollToTop from './components/layouts/scroll-to-top.js';
import RomanizeScriptsWithDiacriticalMarks from './pages/demos/diacriticalMarks/index.js'

const App = () => (
  <AppTheme>
    <CssBaseline enableColorScheme /> {/* Reset CSS and apply light/dark mode */}
    <ScrollToTop /> {/* Ensure the scroll resets on route changes */}
    <Header /> {/* Add the AppBar component */}
    <Container
      maxWidth="lg"
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', mt: 16, gap: 4 }}
    >
      {/* Routes for the application */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectIndex />} />
        <Route path="/projects/:slug" element={<ProjectShow />} />
        <Route path="/articles" element={<ArticleIndex />} />
        <Route path="/articles/:slug" element={<ArticleShow />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/hireme" element={<HireMe />} />
        <Route path="/testpage" element={<TestPage />} />
        
        {/* Demo Routes */}
        <Route path="/demos/romanize_scripts_with_diacritical_marks" element={<RomanizeScriptsWithDiacriticalMarks />} />
      </Routes>
    </Container>
    <Footer /> {/* Add the footer component */}
  </AppTheme>
);

export default App;