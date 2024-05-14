import { array, node } from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { routes } from 'router';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const user = useSelector((state) => state.user);

  if (!user.isLoggedIn) return <Navigate to={routes.login.path} state={{ from: location }} replace />;
  return children;
};

PrivateRoute.propTypes = {
  authorize: array,
  children: node
};

export default PrivateRoute;
