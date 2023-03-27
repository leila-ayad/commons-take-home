import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FontStyles } from './fontStyles';

ReactDOM.render(
  <React.StrictMode>
    <FontStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
