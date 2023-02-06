import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import App from './App';
import { theme, Normalize, BaseStyles } from './styles';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ThemeProvider theme={theme}>
    <Normalize />
    <BaseStyles />
    <App />
  </ThemeProvider>
);
