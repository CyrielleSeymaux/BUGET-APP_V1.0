/**
 * Point d'entrée de l'application
 * Initialise React et rend le composant App dans l'élément DOM avec l'id 'root'
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);