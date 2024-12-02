import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

// Get the root DOM node
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found. Make sure you have a <div id="root"></div> in your index.html.');
}

// Create a root using the new API
const root = createRoot(container);

// Render the app
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);