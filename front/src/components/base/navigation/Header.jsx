import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import routes from 'router/routes';
import { resetUser } from 'store';

const Header = () => {
  const showDesignSystem = ['development', 'staging'].includes(process.env.NODE_ENV);
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    // TODO: Remove this and insert API call
    await new Promise((res) => setTimeout(res, 500));
    dispatch(resetUser());
    navigate(routes.login.path, { replace: true });
  };

  return (
    <header className="header">
      <nav className="navbar" role="navigation">
        <div className="navbar-brand">
          <NavLink className="navbar-item" to={routes.home.path}>
            <img className="w-auto h-6" src={process.env.PUBLIC_URL + '/logo192.png'} />
          </NavLink>
        </div>
        {/* Remove is-active is-shadowless classes to hide navbar-menu on mobile, or toggle is-active to show it */}
        <div className="navbar-menu is-active is-shadowless">
          {showDesignSystem && (
            <NavLink className="navbar-item" to={routes.designSystem.path}>
              DesignSystem
            </NavLink>
          )}

          {!user?.token && (
            <NavLink className="navbar-item" to={routes.login.path}>
              {t('auth:login.button')}
            </NavLink>
          )}

          {user?.token && (
            <a className="navbar-item" role="button" onClick={logoutUser}>
              {t('auth:logout.button')}
            </a>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
