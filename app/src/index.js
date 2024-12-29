import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { hydrateRoot } from 'react-dom/client';


// Get the root DOM node
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found. Make sure you have a <div id="root"></div> in your index.html.');
}

// Create a root using the new API
// const root = createRoot(container);

// Render the app
console.log('Starting React hydration');
hydrateRoot(
  container,
  <React.StrictMode>
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      }}
    />
  </React.StrictMode>
);
console.log('React hydration complete');