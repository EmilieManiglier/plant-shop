import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { Accordion, AccordionContent, AccordionProvider, AccordionTitle, Icon } from 'components';
import { routes } from 'router';

import 'assets/styles/pages/_user-dashboard-page.scss';

const UserDashboardPage = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const menuLinks = [
    { label: t('auth:user.profileTitle'), icon: 'user', value: routes.userInformations.path },
    { label: t('auth:user.contactTitle'), icon: 'address-book', value: routes.userContact.path },
    { label: t('auth:user.favoriteTitle'), icon: 'heart', value: routes.userFavorites.path }
  ];

  const activeLink = useMemo(() => {
    return menuLinks.find(({ value }) => location.pathname === value)?.label ?? menuLinks[0].label;
  }, [location.pathname]);

  return (
    <div className="main-container">
      <div className="dashboard-container">
        <div className="menu-container">
          {/* Mobile dropdown menu */}
          <AccordionProvider>
            <Accordion itemIndex={0} className="lg:hidden">
              <AccordionTitle icon={{ name: 'angle-down', class: 'accordion-arrow' }}>
                <div className="flex items-center gap-6">{activeLink}</div>
              </AccordionTitle>

              <AccordionContent>
                <>
                  {menuLinks.map(({ label, icon, value }) => (
                    <NavLink
                      key={`profile-link-${label}`}
                      to={value}
                      className={({ isActive }) => `dashboard-link ${isActive && 'active'}`}
                    >
                      <div className="flex items-center gap-4">
                        <Icon name={icon} />
                        <span>{label}</span>
                      </div>
                    </NavLink>
                  ))}
                </>
              </AccordionContent>
            </Accordion>
          </AccordionProvider>

          {/* Desktop menu: left column */}
          <div className="hidden lg:block">
            {menuLinks.map(({ label, icon, value }) => (
              <NavLink
                key={`profile-link-${label}`}
                to={value}
                className={({ isActive }) => `dashboard-link ${isActive && 'active'}`}
              >
                <div className="flex items-center gap-2">
                  <Icon name={icon} />
                  <span>{label}</span>
                </div>

                <Icon name="angle-right" />
              </NavLink>
            ))}
          </div>
        </div>

        <div className="p-4 pb-12 bg-white rounded-2xl lg:px-10 lg:col-span-8 2xl:col-span-7">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
