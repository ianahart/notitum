import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme/theme.ts';
import UserContextProvider from './context/user.tsx';
import WorkspaceContextProvider from './context/workspace.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <UserContextProvider>
        <WorkspaceContextProvider>
          <App />
        </WorkspaceContextProvider>
      </UserContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
