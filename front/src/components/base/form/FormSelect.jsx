import clsx from 'clsx';
import { has, isArray, isPlainObject, some } from 'lodash';
import { arrayOf, bool, func, node, number, oneOfType, shape, string } from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ReactSelect, { components } from 'react-select';

import { Icon } from 'components';

const MenuPortal = ({ size, children, ...props }) => (
  <components.MenuPortal className={clsx('select__menu-portal', size)} {...props}>
    <div data-cy="selectMenuPortal">{children}</div>
  </components.MenuPortal>
);

const FormSelect = ({
  options,
  name,
  id = '',
  onChange,
  placeholder = '',
  disabled = false,
  isMulti = false,
  className = '',
  iconName = '',
  size = 'default',
  noOptionKey = 'form:select.empty'
}) => {
  const { t } = useTranslation();
  const { getValues } = useFormContext();

  const onSelectOption = (option) => {
    let formattedOption = option;
    // currentValue must contain the keys `value` and `label` to be compatible with react-select
    const isValueValid = (value) => has(value, 'value') && has(value, 'label');

    if (isArray(formattedOption) && some(formattedOption, (opt) => !isValueValid(opt))) {
      formattedOption = formattedOption.map((opt) => formatOption(opt));
    } else if (isPlainObject(formattedOption) && !isValueValid(formattedOption)) {
      formattedOption = formatOption(formattedOption);
    }

    onChange(formattedOption);
  };

  const formatOption = (option) => {
    return { ...option, label: option?.label, value: option?.value || option?.id };
  };

  return (
    <div className={clsx('is-relative form-select-container', className, size)}>
      {iconName && <Icon name={iconName} className="select-icon" />}
      <ReactSelect
        name={name}
        isMulti={isMulti}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: () => <Icon name="CaretDownFilled" className="select__indicator mr-2" />,
          MenuPortal: (props) => <MenuPortal {...props} size={size} />
        }}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        menuPortalTarget={document.getElementById('react-select-portal')}
        options={options}
        placeholder={placeholder}
        noOptionsMessage={() => t(noOptionKey)}
        onChange={onSelectOption}
        isDisabled={disabled}
        value={getValues(name)}
        classNamePrefix="select"
        className={clsx('form-select', iconName && 'has-icon')}
        closeMenuOnSelect={!isMulti}
        maxMenuHeight={300}
        id={id}
      />
    </div>
  );
};

MenuPortal.propTypes = {
  children: node,
  size: string
};

FormSelect.propTypes = {
  options: arrayOf(
    shape({
      value: oneOfType([string, number]).isRequired,
      label: string.isRequired
    })
  ).isRequired,
  name: string.isRequired,
  id: string,
  onChange: func.isRequired,
  placeholder: string,
  disabled: bool,
  isMulti: bool,
  className: string,
  size: string,
  iconName: string,
  noOptionKey: string
};

export default FormSelect;
