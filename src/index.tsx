import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { LightTheme, DarkTheme } from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={DarkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
