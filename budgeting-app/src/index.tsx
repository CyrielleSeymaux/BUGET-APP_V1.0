/**
 * Point d'entrée de l'application
 * Initialise React et rend le composant App dans l'élément DOM avec l'id 'root'
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}