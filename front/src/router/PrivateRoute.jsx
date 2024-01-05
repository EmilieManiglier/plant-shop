import { array, node } from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { routes } from 'router';

/**
 * A wrapping component to grant access to authorized users
 *
 * Note: This component checks if the user is authenticated
 * and if user's role corresponds to the route's authorized roles.
 */
const PrivateRoute = ({ authorize, children }) => {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const isUserAuthorized = authorize.includes(user.role);

  if (!user.isLoggedIn) return <Navigate to={routes.login.path} state={{ from: location }} replace />;
  if (user.isLoggedIn && !isUserAuthorized) return <Navigate to={routes.home.path} />;
  return children;
};

PrivateRoute.propTypes = {
  authorize: array,
  children: node
};

export default PrivateRoute;
