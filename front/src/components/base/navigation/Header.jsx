import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Cart, Icon, Logo, UserDropdown } from 'components';
import { useSafeState } from 'hooks';
import { routes } from 'router';

import 'assets/styles/components/_header.scss';

const links = ['home', 'products'];

const Header = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [showCart, setShowCart] = useSafeState(false);

  return (
    <>
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
                  <button type="button" onClick={() => setShowCart(true)}>
                    <Icon name="bag-shopping" className="text-white" />
                    <span className="sr-only">{t('buttons.seeCart')}</span>
                  </button>
                </li>

                <li>
                  <UserDropdown />
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      {showCart && <div className="fixed inset-0 bg-black/50 z-20" onClick={() => setShowCart(false)} />}
      <Cart className={clsx(showCart && 'open')} onClose={() => setShowCart(false)} />
    </>
  );
};

export default Header;
