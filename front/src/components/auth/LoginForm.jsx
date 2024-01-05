import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { FormInput } from 'components';
import { mailRegex } from 'constants';
import { routes } from 'router';

const LoginForm = () => {
  const { t } = useTranslation();
  const { register, errors, isValid, isLoading, onSubmit, submitClasses } = useFormContext();

  return (
    <form onSubmit={onSubmit}>
      <FormInput
        name="email"
        label={t('form:email')}
        type="email"
        register={register}
        rules={{
          required: true,
          pattern: {
            value: mailRegex,
            message: 'emailInvalid'
          }
        }}
        errors={errors}
        className="mt-6 is-block"
        autoComplete="email"
      />
      <FormInput
        name="password"
        label={t('form:password')}
        type="password"
        register={register}
        rules={{ required: true }}
        errors={errors}
        className="mt-6 is-block"
        autoComplete="current-password"
      />

      <Link to={routes.forgotPassword.path} className="my-4 is-block has-text-right">
        {t('auth:forgotPassword.label')}
      </Link>

      <button type="submit" disabled={!isValid || isLoading} className={submitClasses}>
        {t('form:submit')}
      </button>
    </form>
  );
};

export default LoginForm;
