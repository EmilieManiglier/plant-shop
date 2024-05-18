import clsx from 'clsx';
import { bool, object, string } from 'prop-types';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Icon } from 'components';

import 'assets/styles/components/_form-input.scss';

const FormInput = ({
  name,
  label,
  rules,
  className = '',
  placeholder = '',
  type = 'text',
  length = '',
  required = false,
  disabled = false,
  readOnly = false,
  autoComplete = 'off',
  icon = ''
}) => {
  const { t } = useTranslation();
  const { errors, register } = useFormContext();
  const error = errors?.[name]?.message || errors?.[name]?.type;
  const errorMessage = error ? t(`form:${error}`) : '';

  return (
    <label className={clsx(className, { invalid: errorMessage, disabled: disabled || readOnly })} aria-live="polite">
      <span className="label">{label}</span>

      <div className={clsx('input-container', { 'has-icon': icon })}>
        {icon.length > 0 && <Icon name={icon} className="input-icon" />}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className="input"
          required={required}
          readOnly={readOnly}
          disabled={disabled}
          autoComplete={autoComplete}
          {...(register && register(name, rules))}
        />
      </div>
      {errorMessage && (
        <p className="error-message" role="alert">
          {t(`${errorMessage}`, { length, field: t(`form:${name}`) })}
        </p>
      )}
    </label>
  );
};

FormInput.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  rules: object,
  type: string,
  placeholder: string,
  className: string,
  length: string,
  required: bool,
  disabled: bool,
  readOnly: bool,
  autoComplete: string,
  icon: string
};

export default FormInput;
