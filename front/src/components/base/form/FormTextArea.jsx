import clsx from 'clsx';
import { bool, object, string } from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const FormTextArea = ({
  label,
  name,
  rules = {},
  placeholder = '',
  className = '',
  resizable = true,
  required = false,
  readOnly = false,
  disabled = false
}) => {
  const { t } = useTranslation();
  const { errors, register } = useFormContext();
  const error = errors?.[name]?.message || errors?.[name]?.type;
  const errorMessage = error ? t(`form:${error}`) : '';

  return (
    <label className={clsx(className, { invalid: errorMessage, disabled: disabled || readOnly })} aria-live="polite">
      <span className="label">{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        className={`input ${!resizable ? 'has-fixed-size' : ''}`}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        {...(register && register(name, rules))}
      ></textarea>
      {errorMessage && (
        <p className="error-message" role="alert">
          {t(`${errorMessage}`, { length, field: t(`form:${name}`) })}
        </p>
      )}
    </label>
  );
};

FormTextArea.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  rules: object,
  placeholder: string,
  className: string,
  resizable: bool,
  required: bool,
  readOnly: bool,
  disabled: bool
};

export default FormTextArea;
