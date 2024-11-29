import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from './components/Header';
import Footer from './components/Footer';

export default function MainLayout(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline />
      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        {props.children} {/* Renders the children */}
      </Container>
      <Footer />
    </AppTheme>
  );
}