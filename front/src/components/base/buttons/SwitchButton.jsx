import clsx from 'clsx';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Icon } from 'components';

const SwitchButton = ({ buttons, onSelect, activeButton = null }) => {
  const { t } = useTranslation();

  return (
    buttons.length && (
      <div className="buttons has-addons">
        {buttons.map((button, i) => (
          <button
            key={`button-${button.name}-${i}`}
            className={clsx('button', {
              'has-icon': button.iconName,
              'is-selected': activeButton === button.name,
              'is-primary': activeButton === button.name && !button.selectedClass,
              [button.selectedClass]: activeButton === button.name && button.selectedClass
            })}
            disabled={button.disabled}
            onClick={() => onSelect(button)}
          >
            {button.iconName && <Icon name={button.iconName} />}
            <span>{t(button.labelKey)}</span>
          </button>
        ))}
      </div>
    )
  );
};

SwitchButton.propTypes = {
  buttons: arrayOf(
    shape({
      name: string.isRequired,
      labelKey: string.isRequired,
      selectedClass: string,
      iconName: string,
      disabled: bool
    })
  ).isRequired,
  onSelect: func.isRequired,
  activeButton: string
};

export default SwitchButton;
