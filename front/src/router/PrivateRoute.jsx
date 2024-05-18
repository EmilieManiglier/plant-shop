import { array, node } from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';

import { useCurrentUser } from 'hooks';
import { routes } from 'router';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn } = useCurrentUser();

  if (!isLoggedIn) return <Navigate to={routes.login.path} state={{ from: location }} replace />;
  return children;
};

PrivateRoute.propTypes = {
  authorize: array,
  children: node
};

export default PrivateRoute;
