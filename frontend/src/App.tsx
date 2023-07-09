import { useCallback, useContext, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeRoute from './routes/HomeRoute';
import Footer from './components/Shared/Footer';
import RegisterRoute from './routes/RegisterRoute';
import DashboardRoute from './routes/DashboardRoute';
import RequireAuth from './components/Guard/RequireAuth';
import RequireGuest from './components/Guard/RequireGuest';
import { Client } from './util/client';
import { UserContext } from './context/user';
import { IUserContext } from './interfaces';
import { retreiveTokens } from './util';
import { useEffectOnce } from './hooks/UseEffectOnce';

function App() {
  const { updateUser, stowTokens } = useContext(UserContext) as IUserContext;
  const storeUser = useCallback(async () => {
    Client.syncUser(retreiveTokens()?.token)
      .then((res) => {
        updateUser(res.data.user);
        stowTokens(retreiveTokens());
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  }, []);

  useEffectOnce(() => {
    storeUser();
  });

  return (
    <Box className="App">
      <Router>
        <Box minH="100vh">
          <Routes>
            <Route
              index
              element={
                <RequireGuest>
                  <HomeRoute />
                </RequireGuest>
              }
            />
            <Route
              path="/register"
              element={
                <RequireGuest>
                  <RegisterRoute />
                </RequireGuest>
              }
            />
            <Route
              path="/:name/dashboard"
              element={
                <RequireAuth>
                  <DashboardRoute />
                </RequireAuth>
              }
            />
          </Routes>
        </Box>
      </Router>
      <Footer />
    </Box>
  );
}

export default App;
