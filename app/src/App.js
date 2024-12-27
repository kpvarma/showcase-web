import React from 'react';
import { Outlet } from 'react-router-dom';

// UI Imports
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

// Layout Imports
import AppTheme from './shared-theme/AppTheme';
import Header from './components/layouts/app_header.js';
import Footer from './components/layouts/app_footer.js';
import ScrollToTop from './components/layouts/scroll-to-top.js';

const App = ({ children }) => (
  <AppTheme>
    <CssBaseline enableColorScheme /> {/* Reset CSS and apply light/dark mode */}
    <ScrollToTop /> {/* Ensure the scroll resets on route changes */}
    <Header /> {/* Add the AppBar component */}
    <Container
      maxWidth="lg"
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', mt: 16, gap: 4 }}
    >
      {children || <Outlet />} {/* Render children or nested routes */}
    </Container>
    <Footer /> {/* Add the footer component */}
  </AppTheme>
);

export default App;