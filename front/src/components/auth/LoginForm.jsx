import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { FormInput, Logo } from 'components';
import { mailRegex } from 'constants';
import { routes } from 'router';

const LoginForm = () => {
  const { t } = useTranslation();
  const { isLoading, onSubmit, submitClasses } = useFormContext();

  return (
    <>
      <form onSubmit={onSubmit}>
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
          icon="envelope"
        />
        <FormInput
          name="password"
          label={t('form:password')}
          type="password"
          rules={{ required: true }}
          className="mt-6"
          autoComplete="current-password"
          placeholder={t('form:placeholders.password')}
          icon="lock"
        />

        <button type="submit" disabled={isLoading} className={clsx(submitClasses)}>
          {t('form:submit')}
        </button>
      </form>

      <div className="flex items-center gap-1 flex-wrap mt-6">
        <span>{t('auth:login.signUp')}</span>
        <Link to={routes.signUp.path} className="font-bold simple-link">
          {t('auth:login.signUpCta')}
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
