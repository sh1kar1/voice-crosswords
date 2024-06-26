// index.tsx
// application entry point

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import GlobalStyle from './GlobalStyle';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle/>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
);
