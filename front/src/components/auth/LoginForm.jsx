import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput, Logo } from 'components';
import { mailRegex } from 'constants';

import 'assets/styles/components/_login-form.scss';

const LoginForm = () => {
  const { t } = useTranslation();
  const { isValid, isLoading, onSubmit, submitClasses } = useFormContext();

  return (
    <form onSubmit={onSubmit} className="login-form">
      <Logo className="mx-auto w-fit mb-12" />

      <FormInput
        name="email"
        label={t('form:email')}
        type="email"
        rules={{
          required: true,
          pattern: {
            value: mailRegex,
            message: 'emailInvalid'
          }
        }}
        className="mt-6"
        autoComplete="email"
        placeholder={t('form:placeholders.email')}
      />
      <FormInput
        name="password"
        label={t('form:password')}
        type="password"
        rules={{ required: true }}
        className="mt-6"
        autoComplete="current-password"
        placeholder={t('form:placeholders.password')}
      />

      <button type="submit" disabled={!isValid || isLoading} className={clsx('mx-auto', submitClasses)}>
        {t('form:submit')}
      </button>
    </form>
  );
};

export default LoginForm;
