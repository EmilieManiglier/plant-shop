import clsx from 'clsx';
import { useMemo } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  AuthPage,
  Footer,
  Header,
  HomePage,
  NotFoundPage,
  ProductAddPage,
  ProductContextProvider,
  ProductShowPage,
  ProductsPage
} from 'components';
import { useCurrentUser } from 'hooks';
import { PrivateRoute, routes } from 'router';

const App = () => {
  const { isLoggedIn } = useCurrentUser();
  const location = useLocation();

  const containerClass = useMemo(() => location.pathname.split('/')?.[1] ?? '', [location.pathname]);

  const authRoutes = [
    { path: routes.login.path, type: 'login' },
    { path: routes.signUp.path, type: 'signUp' },
    { path: routes.forgotPassword.path, type: 'forgotPassword' },
    { path: routes.resetPassword.path, type: 'resetPassword' }
  ];

  return (
    <div className={clsx('app', containerClass)}>
      {isLoggedIn && <Header />}

      <main className="main">
        <Routes>
          <Route
            index
            path={routes.default.path}
            element={isLoggedIn ? <Navigate to={routes.home.path} /> : <Navigate to={routes.login.path} />}
          />

          {!isLoggedIn &&
            authRoutes.map((route, index) => (
              <Route key={`route-${route.path}-${index}`} path={route.path} element={<AuthPage type={route.type} />} />
            ))}

          <Route
            exact
            path={routes.home.path}
            element={
              <PrivateRoute>
                <ProductContextProvider>
                  <HomePage />
                </ProductContextProvider>
              </PrivateRoute>
            }
          />

          <Route
            exact
            path={routes.products.path}
            element={
              <PrivateRoute>
                <ProductContextProvider>
                  <ProductsPage />
                </ProductContextProvider>
              </PrivateRoute>
            }
          />

          <Route
            exact
            path={routes.productAdd.path}
            element={
              <PrivateRoute>
                <ProductAddPage />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path={routes.productShow.path}
            element={
              <PrivateRoute>
                <ProductShowPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
    </div>
  );
};

export default App;
