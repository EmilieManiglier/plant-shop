import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { FormInput, Logo } from 'components';
import { mailRegex } from 'constants';
import { routes } from 'router';

const SignUpForm = () => {
  const { t } = useTranslation();
  const { isValid, isLoading, onSubmit, submitClasses } = useFormContext();

  return (
    <>
      <form onSubmit={onSubmit}>
        <Logo className="mx-auto w-fit mb-12" />

        <div className="flex-center-between gap-4 mt-6">
          <FormInput
            name="lastname"
            label={t('form:lastname')}
            className="w-1/2"
            placeholder={t('form:placeholders.lastname')}
            icon="user"
          />
          <FormInput
            name="firstname"
            label={t('form:firstname')}
            className="w-1/2"
            placeholder={t('form:placeholders.firstname')}
            icon="user"
          />
        </div>

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

        <button type="submit" disabled={!isValid || isLoading} className={clsx(submitClasses)}>
          {t('form:submit')}
        </button>
      </form>

      <div className="flex items-center gap-1 flex-wrap mt-6">
        <span>{t('auth:signUp.login')}</span>
        <Link to={routes.login.path} className="font-bold simple-link">
          {t('auth:signUp.loginCta')}
        </Link>
      </div>
    </>
  );
};

export default SignUpForm;
