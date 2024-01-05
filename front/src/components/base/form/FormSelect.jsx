import clsx from 'clsx';
import { uniqBy } from 'lodash';
import { arrayOf, bool, func, number, oneOfType, shape, string } from 'prop-types';
import { Fragment, useCallback, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Icon } from 'components';
import { useClickOutside, useSafeState } from 'hooks';

const FormSelect = ({
  options,
  name,
  onChange,
  defaultOption = '',
  disabled = false,
  isMulti = false,
  className = '',
  iconName = '',
  label = '',
  currentValue = null
}) => {
  const { trigger } = useFormContext();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useSafeState(false);
  const [selected, setSelected] = useSafeState([]);
  const [focusedOptionIndex, setFocusedOptionIndex] = useSafeState(null);
  const selectRef = useRef(null);
  const isSelected = useCallback((option) => selected.find((o) => o.uuid === option.uuid), [selected]);
  useClickOutside(selectRef, () => setIsOpen(false));

  useEffect(() => {
    if (currentValue) setSelected([...currentValue]);
  }, [currentValue]);

  const onSelectOption = (option) => {
    const updatedOptions = isMulti ? uniqBy([...selected, option], 'uuid') : [option];
    updateOptions(updatedOptions);
    !isMulti && setIsOpen(false);
  };

  const handleKeyEvents = (e) => {
    if (!e?.key || !e?.keyCode) return;
    if (!isOpen) setIsOpen((prev) => !prev);

    let index;

    switch (e.key | e.keyCode) {
      case 'ArrowDown' | 40:
        index = focusedOptionIndex !== null ? focusedOptionIndex + 1 : 0;
        setFocusedOptionIndex(index <= options.length - 1 ? index : 0);
        break;
      case 'ArrowUp' | 38:
        index = focusedOptionIndex - 1;
        setFocusedOptionIndex(index >= 0 ? index : options.length - 1);
        break;
      case 'Enter' | 13:
        focusedOptionIndex !== null ? onSelectOption(options[focusedOptionIndex]) : !isOpen && setIsOpen(true);
        break;
      case 'Escape' | 27:
      case 'Tab' | 9:
        setIsOpen(false);
        break;
      default:
        return;
    }
  };

  const handleOpenOptions = (e) => {
    if (!e?.type || disabled) return;
    e.type === 'click' || (e.type === 'focus' && setIsOpen((prev) => !prev));
    e.type === 'keydown' && handleKeyEvents(e);
  };

  const removeOption = (e, option) => {
    e.stopPropagation();
    if (!isMulti || !option) return;

    let updatedOptions = [...selected];
    updatedOptions = updatedOptions.filter((opt) => opt.uuid !== option.uuid);
    updatedOptions = uniqBy(updatedOptions, 'uuid');
    updateOptions(updatedOptions);
  };

  const updateOptions = (updatedOptions) => {
    /* Call useForm() onChange and trigger methods to save selected option(s) and trigger form validation */
    onChange(updatedOptions);
    trigger(name);
    /* Set local value of selected option and close options list */
    setSelected(updatedOptions);
  };

  return (
    <div ref={selectRef} className={clsx('form-select', className, { open: isOpen, disabled })}>
      {label.length > 0 && <span className="label">{label}</span>}
      <div
        tabIndex="0"
        className={clsx('input', isMulti && selected.length > 0 && 'height-fit is-align-items-start')}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={handleOpenOptions}
        onKeyDown={handleOpenOptions}
        onFocus={handleOpenOptions}
      >
        <span className="is-flex-shrink-0 mt-1">{iconName && <Icon name={iconName} classes="w-4 h-4" />}</span>

        <div className={clsx('full-width', !isMulti && 'truncate')}>
          {selected.length === 0 && <span className="ml-2 has-text-text-light">{defaultOption}</span>}
          {selected.length > 0 &&
            selected.map((option) => (
              <Fragment key={`selected-option-${option.uuid}`}>
                {isMulti ? (
                  <button
                    type="button"
                    className="button has-icon tag is-purple is-light m-1"
                    onClick={(e) => removeOption(e, option)}
                  >
                    <span className="mr-1">{option.label}</span>
                    <Icon name="close" />
                  </button>
                ) : (
                  <span className="ml-2">{option.label}</span>
                )}
              </Fragment>
            ))}
        </div>

        <span className="is-flex-shrink-0 ml-auto mt-1">
          <Icon name="angle-down" classes="arrow" />
        </span>
      </div>

      <ul className="options" role="listbox" tabIndex="-1">
        {options.length === 0 && <li className="option">{t('form:select.empty')}</li>}

        {options.length > 0 &&
          options.map((item, index) => (
            <li
              key={item.uuid}
              role="option"
              tabIndex="0"
              aria-selected={isSelected(item)}
              onClick={() => onSelectOption(item)}
              className={clsx('option', {
                selected: isSelected(item),
                active: focusedOptionIndex === index
              })}
            >
              {item.label}
            </li>
          ))}
      </ul>
    </div>
  );
};

FormSelect.propTypes = {
  options: arrayOf(
    shape({
      value: oneOfType([string, number]),
      label: string,
      uuid: string
    })
  ).isRequired,
  name: string.isRequired,
  onChange: func.isRequired,
  trigger: func.isRequired,
  defaultOption: string,
  disabled: bool,
  isMulti: bool,
  className: string,
  iconName: string,
  label: string,
  currentValue: oneOfType([
    arrayOf(
      shape({
        value: oneOfType([string, number]),
        label: string,
        uuid: string
      })
    ),
    string
  ])
};

export default FormSelect;
