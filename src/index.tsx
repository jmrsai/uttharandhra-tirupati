
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App'; // Adjusted path
import '../index.css'; // Main stylesheet

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
