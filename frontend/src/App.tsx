import { useCallback, useContext } from 'react';
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
import Navbar from './components/Shared/Navbar';
import AccountRoute from './routes/AccountRoute';
import SettingsRoute from './routes/SettingsRoute';
import WithAxios from './hooks/WithAxios';
import ForgotPasswordRoute from './routes/ForgotPasswordRoute';
import ResetPasswordRoute from './routes/ResetPasswordRoute';
import WorkspaceRoute from './routes/WorkspaceRoute';
import ProfileRoute from './routes/ProfileRoute';
import Profile from './components/Account/Profile';
import Email from './components/Account/Email';
import ProfileAndVisiblity from './components/Settings/ProfileAndVisibility';
import Activity from './components/Settings/Activity';
import Cards from './components/Settings/Cards';

function App() {
  const { updateUser, stowTokens, user } = useContext(UserContext) as IUserContext;
  const storeUser = useCallback(async () => {
    Client.syncUser(retreiveTokens()?.token)
      .then((res) => {
        updateUser(res.data);
        stowTokens(retreiveTokens());
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  }, []);

  useEffectOnce(() => {
    if (retreiveTokens()?.token) {
      storeUser();
    }
  });

  return (
    <Box className="App">
      <Router>
        {user.loggedIn && <Navbar />}
        <Box minH="100vh">
          <WithAxios>
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
                path="/forgot-password"
                element={
                  <RequireGuest>
                    <ForgotPasswordRoute />
                  </RequireGuest>
                }
              />
              <Route
                path="/reset-password"
                element={
                  <RequireGuest>
                    <ResetPasswordRoute />
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
                path="/:name/profiles/:profileId"
                element={
                  <RequireAuth>
                    <ProfileRoute />
                  </RequireAuth>
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
              <Route
                path="/:name/account"
                element={
                  <RequireAuth>
                    <AccountRoute />
                  </RequireAuth>
                }
              >
                <Route
                  path="profile"
                  element={
                    <RequireAuth>
                      <Profile />
                    </RequireAuth>
                  }
                />
                <Route
                  path="email"
                  element={
                    <RequireAuth>
                      <Email />
                    </RequireAuth>
                  }
                />
              </Route>
              <Route
                path="/:name/:title"
                element={
                  <RequireAuth>
                    <WorkspaceRoute />
                  </RequireAuth>
                }
              />

              <Route
                path="/:name/settings"
                element={
                  <RequireAuth>
                    <SettingsRoute />
                  </RequireAuth>
                }
              >
                <Route
                  path="profile-visibility"
                  element={
                    <RequireAuth>
                      <ProfileAndVisiblity />
                    </RequireAuth>
                  }
                />

                <Route
                  path="activity"
                  element={
                    <RequireAuth>
                      <Activity />
                    </RequireAuth>
                  }
                />

                <Route
                  path="cards"
                  element={
                    <RequireAuth>
                      <Cards />
                    </RequireAuth>
                  }
                />
              </Route>
            </Routes>
          </WithAxios>
        </Box>
      </Router>
      <Footer />
    </Box>
  );
}

export default App;
