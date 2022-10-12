import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { AppState } from './context/AppState';
import { MsalProvider } from '@azure/msal-react';
import msalInstance from './config/config';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <AppState>
        <App />
      </AppState>
    </MsalProvider>
  </React.StrictMode>
);

reportWebVitals();