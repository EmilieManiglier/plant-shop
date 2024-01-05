import { bool, object, shape, string } from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

const FormToggle = ({
  name,
  labeli18nKey,
  rules = {},
  className = '',
  required = false,
  disabled = false,
  readOnly = false,
  link = null
}) => {
  const { t } = useTranslation();
  const { errors, register } = useFormContext();
  const error = errors?.[name]?.message || errors?.[name]?.type;
  const errorMessage = error ? t(`form:${error}`) : '';

  return (
    <label className={`toggle ${className}`} aria-live="polite">
      <input
        name={name}
        type="checkbox"
        className="mr-2"
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        {...(register && register(name, rules))}
      />
      <span className="toggle-slider"></span>

      <p className="ml-2">
        <Trans i18nKey={labeli18nKey}>
          {link && (
            <a href={link.url} target={link.target}>
              {t(link.labelKey)}
            </a>
          )}
        </Trans>
      </p>

      {errorMessage && (
        <p className="error-message w-full" role="alert">
          {t(`${errorMessage}`, { length, field: t(`form:${name}`) })}
        </p>
      )}
    </label>
  );
};

FormToggle.propTypes = {
  labeli18nKey: string.isRequired,
  name: string.isRequired,
  rules: object,
  className: string,
  required: bool,
  disabled: bool,
  readOnly: bool,
  link: shape({ url: string, labelKey: string, target: string })
};

export default FormToggle;
