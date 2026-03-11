import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { theme } from './theme.ts'
import App from './pages/App.tsx'
import { MantineProvider } from '@mantine/core';
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
)
