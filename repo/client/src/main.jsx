import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { captureAttribution } from './lib/attribution';
import './fonts.css';
import './index.css';

// First-touch campaign capture - runs once per visit, before any form can
// post. Session-scoped, no cookies, nothing personal.
captureAttribution();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#FFFDF9',
              color: '#1F1A12',
              border: '1px solid #DDD8CF',
              fontWeight: 500,
            },
          }}
        />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
