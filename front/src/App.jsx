import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AdminPage, AuthPage, Footer, Header, NotFoundPage, UserPage } from 'components';
import { roles } from 'constants';
import { PrivateRoute, routes } from 'router';

const App = () => {
  const user = useSelector((state) => state.user);

  const authRoutes = [
    { path: routes.login.path, type: 'login' },
    { path: routes.forgotPassword.path, type: 'forgotPassword' },
    { path: routes.resetPassword.path, type: 'resetPassword' }
  ];

  return (
    <div className="app">
      {user.isLoggedIn && <Header />}

      <main className="main">
        <Routes>
          <Route
            index
            path={routes.home.path}
            element={
              user.isLoggedIn ? (
                <Navigate to={routes[`${user.role === roles?.admin ? 'adminPage' : 'userPage'}`].path} />
              ) : (
                <Navigate to={routes.login.path} />
              )
            }
          />

          {!user.isLoggedIn &&
            authRoutes.map((route, index) => (
              <Route key={`route-${route.path}-${index}`} path={route.path} element={<AuthPage type={route.type} />} />
            ))}

          <Route
            exact
            path={routes.adminPage.path}
            element={
              <PrivateRoute authorize={routes.adminPage.authorize}>
                <AdminPage />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path={routes.userPage.path}
            element={
              <PrivateRoute authorize={routes.userPage.authorize}>
                <UserPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
