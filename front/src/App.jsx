import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthPage, Footer, Header, HomePage, NotFoundPage } from 'components';
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
            path={routes.default.path}
            element={user.isLoggedIn ? <Navigate to={routes.home.path} /> : <Navigate to={routes.login.path} />}
          />

          {!user.isLoggedIn &&
            authRoutes.map((route, index) => (
              <Route key={`route-${route.path}-${index}`} path={route.path} element={<AuthPage type={route.type} />} />
            ))}

          <Route
            exact
            path={routes.home.path}
            element={
              <PrivateRoute authorize={routes.home.authorize}>
                <HomePage />
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
