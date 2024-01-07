import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { Logo, UserDropdown } from 'components';
import routes from 'router/routes';
import { resetUser } from 'store';

import 'assets/styles/components/_header.scss';

const links = ['home', 'products'];

const Header = () => {
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
      <nav className="flex gap-4 justify-between items-center p-4">
        <NavLink to={routes.home.path}>
          <Logo color="white" />
        </NavLink>

        <ul className="flex items-center gap-x-8">
          {!user?.token && (
            <li>
              <NavLink className="navbar-item" to={routes.login.path}>
                {t('auth:login.button')}
              </NavLink>
            </li>
          )}

          {user?.token && (
            <>
              {links.map((link, i) => (
                <li key={`header-link-${i}`}>
                  <NavLink
                    className={({ isActive }) => `navbar-item ${isActive ? 'active' : ''}`}
                    to={routes[link].path}
                  >
                    {t(`navigation.${link}`)}
                  </NavLink>
                </li>
              ))}

              <li>
                <UserDropdown />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
