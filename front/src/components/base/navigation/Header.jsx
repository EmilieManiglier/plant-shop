import clsx from 'clsx';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

import { Icon, Logo, UserDropdown } from 'components';
import { useCurrentUser, useSafeState } from 'hooks';
import { routes } from 'router';

import 'assets/styles/components/_header.scss';

const links = ['home', 'products'];

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { isLoggedIn, logoutUser, logoutLoading } = useCurrentUser();
  const [menuOpen, setMenuOpen] = useSafeState(false);
  // const [showCart, setShowCart] = useSafeState(false);

  useEffect(() => {
    menuOpen && setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="header">
        <nav className="flex gap-4 justify-between items-center">
          <NavLink to={routes.home.path}>
            <Logo />
          </NavLink>

          <button
            type="button"
            className={clsx('btn-mobile-menu', menuOpen && 'open')}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          <ul className={clsx('menu', menuOpen && 'open')}>
            {!isLoggedIn && (
              <li>
                <NavLink className="navbar-item" to={routes.login.path}>
                  {t('auth:login.button')}
                </NavLink>
              </li>
            )}

            {isLoggedIn && (
              <>
                {links.map((link, i) => (
                  <li key={`header-link-${i}`} className="mb-12 text-center lg:mb-0">
                    <NavLink className={({ isActive }) => `navlink ${isActive ? 'active' : ''}`} to={routes[link].path}>
                      {t(`navigation.${link}`)}
                    </NavLink>
                  </li>
                ))}

                {/* TODO: Add cart icon when API is ready */}
                {/* <li>
                  <button type="button" onClick={() => setShowCart(true)}>
                    <Icon name="bag-shopping" className="text-white" />
                    <span className="sr-only">{t('buttons.seeCart')}</span>
                  </button>
                </li> */}

                <li className="hidden lg:block">
                  <UserDropdown />
                </li>

                <li className="text-center mb-12 lg:hidden">
                  <NavLink to={routes.userInformations.path} className="navlink">
                    {t('navigation.dashboard')}
                  </NavLink>
                </li>

                <li className="flex-center-center lg:hidden">
                  <button
                    type="button"
                    className="navlink text-xl flex-center-center gap-4"
                    onClick={logoutUser}
                    disabled={logoutLoading}
                  >
                    <Icon name="right-from-bracket" className="hidden sm:block" />
                    {t('navigation.logout')}
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      {/* {showCart && <div className="fixed inset-0 bg-black/50 z-20" onClick={() => setShowCart(false)} />}
      <Cart className={clsx(showCart && 'open')} onClose={() => setShowCart(false)} /> */}
    </>
  );
};

export default Header;
