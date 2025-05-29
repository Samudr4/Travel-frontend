import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { PackageProvider } from './contexts/PackageContext';
import { WishlistProvider } from './contexts/WishlistContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <PackageProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </PackageProvider>
    </AuthProvider>
  </React.StrictMode>
); 