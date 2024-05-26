import React from 'react';
import ReactDOM from 'react-dom/client';
import { DeviceThemeProvider, SSRProvider } from '@salutejs/plasma-ui';
import './index.css';
import GlobalStyle from './GlobalStyles';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <DeviceThemeProvider>
            <SSRProvider>
                <GlobalStyle />
                <App />
            </SSRProvider>
        </DeviceThemeProvider>
    </React.StrictMode>
);
