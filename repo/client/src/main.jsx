import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

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
