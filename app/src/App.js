import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import MainLayout from './layouts/MainLayout'; 

import Home from './pages/Home'; 
import ProjectIndex from './pages/projects/index'; 
import ProjectShow from './pages/projects/show';

import ArticleIndex from './pages/articles/index'; 
import ArticleShow from './pages/articles/show';

import AboutMe from './pages/AboutMe'; 
import HireMe from './pages/HireMe'; 
import TestPage from './pages/TestPage.js';

import ScrollToTop from './components/elements/scroll-to-top.js';

// import './stylesheets/layout.css';

const theme = createTheme({
  // Customize your theme here, e.g.:
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline /> {/* Reset CSS styles */}
    <ScrollToTop/>
    <Routes>
      {/* Home Route */}
      <Route path="/" element={
          <MainLayout>
            <Home/>
          </MainLayout>
        }
      />

      {/* Projects Route */}
      <Route path="/projects" element={
          <MainLayout>
            <ProjectIndex />
          </MainLayout>
        }
      />
      <Route path="/projects/:slug" element={
          <MainLayout>
            <ProjectShow />
          </MainLayout>
        }
      />
      
      {/* Articles Route */}
      <Route path="/articles" element={
          <MainLayout>
            <ArticleIndex />
          </MainLayout>
        }
      />
      <Route path="/articles/:slug" element={
          <MainLayout>
            <ArticleShow />
          </MainLayout>
        }
      />

      {/* AboutMe Route */}
      <Route path="/aboutme" element={
          <MainLayout>
            <AboutMe />
          </MainLayout>
        }
      />
      {/* HireMe Route */}
      <Route path="/hireme" element={
          <MainLayout>
            <HireMe />
          </MainLayout>
        }
      />
      {/* TestPage Route */}
      <Route path="/testpage" element={
            <MainLayout>
              <TestPage />
            </MainLayout>
          }
        />
    </Routes>
  </ThemeProvider>
);

export default App;