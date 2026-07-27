import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const MaybeGoogle = ({ children }) =>
  GOOGLE_ID
    ? <GoogleOAuthProvider clientId={GOOGLE_ID}>{children}</GoogleOAuthProvider>
    : children;
import { Toaster } from 'react-hot-toast';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
    <MaybeGoogle>
      <HelmetProvider>
        <BrowserRouter>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: '#111126', color: '#e2e8f0', border: '1px solid #1e1e3a' },
            }}
          />
        </BrowserRouter>
      </HelmetProvider>
    </MaybeGoogle>
    </ThemeProvider>
  </React.StrictMode>
);
