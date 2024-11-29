import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import './stylesheets/card.css';
import './stylesheets/footer.css';
import './stylesheets/layout.css';

// Get the root DOM node
const container = document.getElementById('root');

// Create a root using the new API
const root = createRoot(container);

// Render the app
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);