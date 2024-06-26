import clsx from 'clsx';
import { bool, node, shape, string } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ReactSelect, { components } from 'react-select';

import { Icon } from 'components';
import { useCurrentUser } from 'hooks';
import { routes } from 'router';

import 'assets/styles/components/_user-dropdown.scss';

const MenuPortal = ({ children, ...props }) => (
  <components.MenuPortal className={clsx('select__menu-portal')} {...props}>
    {children}
  </components.MenuPortal>
);

const MenuOption = (props) => {
  const { t } = useTranslation();

  return (
    <components.Option {...props}>
      <button
        type="button"
        className="hover:bg-gray-900 hover:text-white text-left w-full h-full px-4 py-2"
        disabled={props.data?.disabled}
      >
        {props.data?.icon && <Icon name={props.data.icon} />}
        <span className="whitespace-nowrap">{t(`navigation.${props.data.label}`)}</span>
      </button>
    </components.Option>
  );
};

const userOptions = [{ label: 'dashboard' }, { label: 'logout' }];

const UserDropdown = () => {
  const navigate = useNavigate();
  const { logoutUser } = useCurrentUser();

  const handleAction = (option) => {
    if (option.label === 'dashboard') navigate(routes.userInformations.path);
    if (option.label === 'logout') logoutUser();
  };

  return (
    <ReactSelect
      unstyled
      isSearchable={false}
      classNamePrefix="select-user"
      menuPlacement="auto"
      menuPosition="fixed"
      options={userOptions}
      className="user-dropdown"
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: () => <Icon name="user" className="select-user__indicator" />,
        MenuPortal: (props) => <MenuPortal {...props} />,
        Placeholder: () => null,
        SingleValue: () => null,
        Option: (props) => <MenuOption {...props} />
      }}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      menuPortalTarget={document.getElementById('react-select-portal')}
      onChange={handleAction}
    />
  );
};

MenuPortal.propTypes = {
  children: node,
  size: string
};

MenuOption.propTypes = {
  data: shape({
    icon: string,
    label: string,
    value: string,
    disabled: bool
  })
};

export default UserDropdown;
