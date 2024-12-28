import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';

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
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true, // Opt-in for startTransition behavior
        v7_relativeSplatPath: true, // Opt-in for relative splat path behavior
        v7_fetcherPersist: true, // Opt-in for fetcher persistence changes
        v7_normalizeFormMethod: true, // Opt-in for formMethod normalization
        v7_partialHydration: true, // Opt-in for partial hydration
        v7_skipActionErrorRevalidation: true, // Opt-in for skipping revalidation on errors
      }}
    />
  </React.StrictMode>
);