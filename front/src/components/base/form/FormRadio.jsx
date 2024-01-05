import { bool, object, string } from 'prop-types';
import { useFormContext } from 'react-hook-form';

const FormRadio = ({
  name,
  label,
  value,
  rules = {},
  className = '',
  required = false,
  disabled = false,
  readOnly = false
}) => {
  const { register } = useFormContext();

  return (
    <label className={`radio ${className}`}>
      <input
        name={name}
        type="radio"
        value={value}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        {...(register && register(name, rules))}
      />
      <span className="ml-1">{label}</span>
    </label>
  );
};

FormRadio.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  value: string.isRequired,
  rules: object,
  className: string,
  required: bool,
  disabled: bool,
  readOnly: bool
};

export default FormRadio;
