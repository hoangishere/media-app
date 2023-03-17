import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { provider } from 'react-redux';
import { store } from './store';
import App from './App';

const el = document.getElementById('root');
const root = createRoot(el);

root.render(
  <provider >
    <App />
  </provider>
);